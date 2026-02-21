// ═══════════════════════════════════════════════════════════
//  MY MUQABALA — Edge Function: create-event-channels
//  Admin-only: creates Stream Chat channels for all confirmed
//  matches (termine_positif) after event resolution.
//  Channel ID pattern: match_{match_id}
// ═══════════════════════════════════════════════════════════

import { StreamChat } from "https://esm.sh/stream-chat@8.40.0";
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
      return errorResponse("Only admins can create event channels", 403, CORS_HEADERS);
    }

    // ── Parse request body ──
    const body = await req.json().catch(() => ({}));
    const { event_id } = body;

    if (!event_id || !isValidUUID(event_id)) {
      return errorResponse("event_id (valid UUID) is required", 400, CORS_HEADERS);
    }

    // ── Read Stream Chat credentials ──
    const streamApiKey = Deno.env.get("STREAM_API_KEY");
    const streamSecret = Deno.env.get("STREAM_SECRET");

    if (!streamApiKey || !streamSecret) {
      return errorResponse("Stream Chat credentials not configured", 500, CORS_HEADERS);
    }

    const serverClient = StreamChat.getInstance(streamApiKey, streamSecret);

    // ── Get all confirmed matches ──
    const { data: matches, error: matchError } = await supabase
      .from("matches")
      .select("id, user_1_id, user_2_id")
      .eq("event_id", event_id)
      .eq("statut", "termine_positif");

    if (matchError) {
      return errorResponse("Failed to load matches", 500, CORS_HEADERS);
    }

    if (!matches || matches.length === 0) {
      return jsonResponse(
        { success: true, channels_created: 0, message: "No confirmed matches" },
        200,
        CORS_HEADERS
      );
    }

    // ── Batch-load profiles for all involved users ──
    const allUserIds = new Set<string>();
    for (const match of matches) {
      allUserIds.add(match.user_1_id);
      allUserIds.add(match.user_2_id);
    }
    allUserIds.add(user.id); // coach/admin

    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, prenom, nom, photo_floue_url")
      .in("id", Array.from(allUserIds));

    const profileMap = new Map(
      (profiles || []).map((p) => [p.id, p])
    );

    // ── Upsert all users in Stream Chat ──
    for (const uid of allUserIds) {
      const profile = profileMap.get(uid);
      const displayName = profile
        ? `${profile.prenom}${profile.nom ? ` ${profile.nom.charAt(0)}.` : ""}`
        : uid;

      await serverClient.upsertUser({
        id: uid,
        name: displayName,
        image: profile?.photo_floue_url || undefined,
      });
    }

    // ── Create channels for each confirmed match ──
    let channelsCreated = 0;
    const channelIds: string[] = [];

    for (const match of matches) {
      const channelId = `match_${match.id}`;
      const memberIds = [match.user_1_id, match.user_2_id, user.id];

      try {
        const channel = serverClient.channel("messaging", channelId, {
          created_by_id: user.id,
        });

        await channel.create();
        await channel.addMembers(memberIds);
        await channel.addModerators([user.id]);

        channelsCreated++;
        channelIds.push(channelId);
      } catch (channelErr) {
        // Log but continue — some channels may already exist
        console.error(`Failed to create channel ${channelId}:`, channelErr);
      }
    }

    return jsonResponse(
      {
        success: true,
        channels_created: channelsCreated,
        channel_ids: channelIds,
      },
      200,
      CORS_HEADERS
    );
  } catch (err) {
    return errorResponse("Internal server error", 500, CORS_HEADERS, err);
  }
});
