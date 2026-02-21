// ═══════════════════════════════════════════════════════════
//  MY MUQABALA — Edge Function: launch-event
//  Admin-only: sets event status to 'en_cours' and sends
//  push notifications to all confirmed participants.
// ═══════════════════════════════════════════════════════════

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, errorResponse, jsonResponse, isValidUUID, RateLimiter, getClientIp } from "../_shared/cors.ts";

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

  // ── Rate Limiting ──
  if (!limiter.check(getClientIp(req))) {
    return errorResponse("Trop de requêtes, réessayez dans une minute", 429, CORS_HEADERS);
  }

  try {
    // ── Verify Supabase Auth JWT ──
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return errorResponse("Missing Authorization header", 401, CORS_HEADERS);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const jwt = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);

    if (authError || !user) {
      return errorResponse("Invalid or expired token", 401, CORS_HEADERS);
    }

    // ── Verify caller is admin ──
    const { data: callerProfile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !callerProfile) {
      return errorResponse("Profile not found", 404, CORS_HEADERS);
    }

    if (!["coach", "admin"].includes(callerProfile.role)) {
      return errorResponse("Only admins can launch events", 403, CORS_HEADERS);
    }

    // ── Parse request body ──
    const body = await req.json().catch(() => ({}));
    const { event_id } = body;

    if (!event_id || !isValidUUID(event_id)) {
      return errorResponse("event_id (valid UUID) is required", 400, CORS_HEADERS);
    }

    // ── Update event status to en_cours ──
    const { error: updateError } = await supabase
      .from("events")
      .update({ statut: "en_cours" })
      .eq("id", event_id);

    if (updateError) {
      return errorResponse("Failed to update event status", 500, CORS_HEADERS);
    }

    // ── Get all confirmed participants ──
    const { data: participants, error: partError } = await supabase
      .from("event_participants")
      .select("user_id")
      .eq("event_id", event_id)
      .eq("statut", "confirme");

    if (partError) {
      return errorResponse("Failed to load participants", 500, CORS_HEADERS);
    }

    const userIds = (participants || []).map((p) => p.user_id);
    let pushSent = 0;

    // ── Send push to each participant ──
    for (const userId of userIds) {
      try {
        await supabase.functions.invoke("send-push", {
          body: {
            user_id: userId,
            title: "Votre événement commence !",
            body: "Rejoignez votre premier blink date maintenant.",
            data: {
              route: `/events/${event_id}`,
              type: "event_launch",
            },
          },
        });
        pushSent++;
      } catch (_pushErr) {
        // Best effort — continue with other participants
      }
    }

    // ── Also insert in-app notifications ──
    const notifRows = userIds.map((uid) => ({
      user_id: uid,
      type: "event_launch",
      titre: "Événement en cours",
      corps: "Votre événement commence ! Rejoignez votre premier blink date.",
      data: { route: `/events/${event_id}`, type: "event_launch" },
    }));

    if (notifRows.length > 0) {
      await supabase.from("notifications").insert(notifRows);
    }

    return jsonResponse(
      {
        success: true,
        event_id,
        participants_count: userIds.length,
        push_sent: pushSent,
      },
      200,
      CORS_HEADERS
    );
  } catch (err) {
    return errorResponse("Internal server error", 500, CORS_HEADERS, err);
  }
});
