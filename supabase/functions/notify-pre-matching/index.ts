// ================================================================
//  MY MUQABALA — Edge Function: notify-pre-matching
//  After pre-matching: registers participants, creates in-app
//  notifications, and sends push notifications via FCM.
//
//  Accepts { event_id }
//  1. Calls register_pre_matching_participants(event_id) RPC
//  2. Queries all unique users from matches for this event
//  3. Inserts a notification row per user in the notifications table
//  4. Sends a push notification per user via the send-push function
// ================================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  getCorsHeaders,
  errorResponse,
  jsonResponse,
  isValidUUID,
  RateLimiter,
  getClientIp,
} from "../_shared/cors.ts";

const limiter = new RateLimiter(10, 60_000);

Deno.serve(async (req: Request) => {
  const CORS_HEADERS = getCorsHeaders(req);

  // ── Preflight ──
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return errorResponse("Method not allowed", 405, CORS_HEADERS);
  }

  // ── Rate limit ──
  if (!limiter.check(getClientIp(req))) {
    return errorResponse(
      "Trop de requ\u00eates, r\u00e9essayez dans une minute",
      429,
      CORS_HEADERS,
    );
  }

  try {
    // ── Auth: verify caller is coach/admin ──
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return errorResponse("Missing Authorization header", 401, CORS_HEADERS);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const jwt = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(jwt);

    if (authError || !user) {
      return errorResponse("Invalid or expired token", 401, CORS_HEADERS);
    }

    // Check role
    const { data: callerProfile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !callerProfile) {
      return errorResponse("Profile not found", 404, CORS_HEADERS);
    }

    if (!["coach", "admin"].includes(callerProfile.role)) {
      return errorResponse(
        "Seuls les coachs/admins peuvent notifier les participants",
        403,
        CORS_HEADERS,
      );
    }

    // ── Parse input ──
    const body = await req.json().catch(() => ({}));
    const { event_id } = body;

    if (!event_id || !isValidUUID(event_id)) {
      return errorResponse("event_id (UUID) is required", 400, CORS_HEADERS);
    }

    // ── Verify event exists and is type 'matching' ──
    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .select("id, titre, date_evenement, type")
      .eq("id", event_id)
      .single();

    if (eventError || !eventData) {
      return errorResponse(
        "\u00c9v\u00e9nement non trouv\u00e9",
        404,
        CORS_HEADERS,
      );
    }

    if (eventData.type !== "matching") {
      return errorResponse(
        "Cet \u00e9v\u00e9nement n'est pas de type matching",
        400,
        CORS_HEADERS,
      );
    }

    // ── Step 1: Register participants from pre-matching results ──
    const { data: registerResult, error: registerError } = await supabase.rpc(
      "register_pre_matching_participants",
      { p_event_id: event_id },
    );

    if (registerError) {
      console.error("register_pre_matching_participants error:", registerError);
      return errorResponse(
        "Erreur lors de l'inscription des participants",
        500,
        CORS_HEADERS,
        registerError,
      );
    }

    // ── Step 2: Get all unique users who have matches for this event ──
    const { data: matchedUsers, error: matchError } = await supabase
      .from("event_participants")
      .select("user_id")
      .eq("event_id", event_id)
      .eq("statut", "inscrit")
      .eq("role_evenement", "participant");

    if (matchError) {
      return errorResponse(
        "Erreur lors de la r\u00e9cup\u00e9ration des participants",
        500,
        CORS_HEADERS,
        matchError,
      );
    }

    if (!matchedUsers || matchedUsers.length === 0) {
      return jsonResponse(
        {
          success: true,
          notified_count: 0,
          message: "Aucun participant \u00e0 notifier",
        },
        200,
        CORS_HEADERS,
      );
    }

    // ── Step 3: Count matches per user for personalized message ──
    const userIds = matchedUsers.map(
      (u: { user_id: string }) => u.user_id,
    );

    // ── Step 4: Create in-app notifications + send push ──
    const eventDate = new Date(eventData.date_evenement).toLocaleDateString(
      "fr-FR",
      { day: "numeric", month: "long", year: "numeric" },
    );

    let notifiedCount = 0;
    let pushSentCount = 0;
    let pushFailedCount = 0;

    for (const userId of userIds) {
      // Insert in-app notification
      const { error: notifError } = await supabase
        .from("notifications")
        .insert({
          user_id: userId,
          type: "match_proposee",
          titre: "Compatibilit\u00e9s disponibles !",
          corps:
            `Des compatibilit\u00e9s ont \u00e9t\u00e9 trouv\u00e9es pour vous. Confirmez votre pr\u00e9sence \u00e0 l'\u00e9v\u00e9nement "${eventData.titre}" du ${eventDate}.`,
          data: {
            event_id: event_id,
            route_path: `/events/${event_id}`,
          },
          is_read: false,
        });

      if (notifError) {
        console.error(
          `Notification insert error for user ${userId}:`,
          notifError,
        );
        continue;
      }

      notifiedCount++;

      // Send push notification (fire and forget, don't block on failure)
      try {
        const pushResponse = await fetch(
          `${supabaseUrl}/functions/v1/send-push`,
          {
            method: "POST",
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userId,
              title: "Compatibilit\u00e9s disponibles !",
              body:
                `Confirmez votre pr\u00e9sence \u00e0 "${eventData.titre}" du ${eventDate}.`,
              data: {
                type: "match_proposee",
                event_id: event_id,
              },
            }),
          },
        );

        if (pushResponse.ok) {
          const pushResult = await pushResponse.json();
          pushSentCount += pushResult.sent_count || 0;
          pushFailedCount += pushResult.failed_count || 0;
        }
      } catch (pushErr) {
        console.error(`Push error for user ${userId}:`, pushErr);
        pushFailedCount++;
      }
    }

    return jsonResponse(
      {
        success: true,
        participants_registered: registerResult?.participants_registered || 0,
        notified_count: notifiedCount,
        push_sent: pushSentCount,
        push_failed: pushFailedCount,
        event_id: event_id,
        event_titre: eventData.titre,
      },
      200,
      CORS_HEADERS,
    );
  } catch (err) {
    return errorResponse("Internal server error", 500, CORS_HEADERS, err);
  }
});
