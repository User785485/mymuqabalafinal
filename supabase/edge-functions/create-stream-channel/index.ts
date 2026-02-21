// ═══════════════════════════════════════════════════════════
//  MY MUQABALA — Edge Function: create-stream-channel
//  Creates a Stream Chat channel for match messaging or
//  coach-participant coaching. The coach (Mahram numerique)
//  always has "admin" role on every channel.
//
//  Two channel types:
//  - "messaging": match chat — channel ID = "match_{match_id}"
//    Members: [user_1_id, user_2_id, coach_id]
//  - "coaching": participant <-> coach — channel ID = "coaching_{user_id}"
//    Members: [user_id, coach_id]
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

    // ── Verify caller is coach or admin ──
    const { data: callerProfile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !callerProfile) {
      return errorResponse("Profile not found", 404, CORS_HEADERS);
    }

    if (!["coach", "admin"].includes(callerProfile.role)) {
      return errorResponse("Only coaches/admins can create channels", 403, CORS_HEADERS);
    }

    // ── Parse request body ──
    const body = await req.json().catch(() => ({}));
    const { type, match_id, user_id, coach_id } = body;

    if (!type || !["messaging", "coaching"].includes(type)) {
      return errorResponse("type must be 'messaging' or 'coaching'", 400, CORS_HEADERS);
    }

    // ── Read Stream Chat credentials ──
    const streamApiKey = Deno.env.get("STREAM_API_KEY");
    const streamSecret = Deno.env.get("STREAM_SECRET");

    if (!streamApiKey || !streamSecret) {
      return errorResponse("Stream Chat credentials not configured", 500, CORS_HEADERS);
    }

    const serverClient = StreamChat.getInstance(streamApiKey, streamSecret);

    let channelId: string;
    let members: Array<{ user_id: string; role?: string }>;

    if (type === "messaging") {
      // ── Match chat channel ──
      if (!match_id || typeof match_id !== "string") {
        return errorResponse("match_id is required for messaging channels", 400, CORS_HEADERS);
      }

      if (!isValidUUID(match_id)) {
        return errorResponse("match_id must be a valid UUID", 400, CORS_HEADERS);
      }

      // Fetch match details to get user_1_id and user_2_id
      const { data: match, error: matchError } = await supabase
        .from("matches")
        .select("user_1_id, user_2_id")
        .eq("id", match_id)
        .single();

      if (matchError || !match) {
        return errorResponse("Match not found", 404, CORS_HEADERS);
      }

      const effectiveCoachId = coach_id || user.id;
      channelId = `match_${match_id}`;
      members = [
        { user_id: match.user_1_id },
        { user_id: match.user_2_id },
        { user_id: effectiveCoachId, role: "admin" },
      ];

    } else {
      // ── Coaching channel (participant <-> coach) ──
      if (!user_id || typeof user_id !== "string") {
        return errorResponse("user_id is required for coaching channels", 400, CORS_HEADERS);
      }

      if (!isValidUUID(user_id)) {
        return errorResponse("user_id must be a valid UUID", 400, CORS_HEADERS);
      }

      const effectiveCoachId = coach_id || user.id;
      channelId = `coaching_${user_id}`;
      members = [
        { user_id: user_id },
        { user_id: effectiveCoachId, role: "admin" },
      ];
    }

    // ── Ensure users exist in Stream Chat ──
    // Batch query all profiles instead of N+1
    const memberIds = members.map((m) => m.user_id);
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, prenom, nom, photo_floue_url")
      .in("id", memberIds);

    const profileMap = new Map(
      (profiles || []).map((p) => [p.id, p])
    );

    // Upsert all member users so Stream Chat recognizes them
    for (const member of members) {
      const profile = profileMap.get(member.user_id);
      const displayName = profile
        ? `${profile.prenom}${profile.nom ? ` ${profile.nom.charAt(0)}.` : ""}`
        : member.user_id;

      await serverClient.upsertUser({
        id: member.user_id,
        name: displayName,
        image: profile?.photo_floue_url || undefined,
      });
    }

    // ── Create or get the channel ──
    const channel = serverClient.channel(type, channelId, {
      created_by_id: user.id,
    });

    await channel.create();

    // Add members with their roles
    await channel.addMembers(memberIds);

    // Set coach as channel moderator/admin
    const coachMembers = members.filter((m) => m.role === "admin");
    for (const coachMember of coachMembers) {
      await channel.addModerators([coachMember.user_id]);
    }

    // Query channel data to return
    const channelData = await channel.query({});

    return jsonResponse(
      {
        channel_id: channelId,
        channel_type: type,
        members: memberIds,
        channel: channelData.channel,
      },
      200,
      CORS_HEADERS
    );
  } catch (err) {
    return errorResponse("Internal server error", 500, CORS_HEADERS, err);
  }
});
