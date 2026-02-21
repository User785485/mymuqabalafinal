// ═══════════════════════════════════════════════════════════
//  MY MUQABALA — Edge Function: generate-livekit-token
//  Generates a LiveKit access token for audio rooms (Blink Dates,
//  Phase 2/3 calls). TTL is 660 seconds (11 minutes — 10-min
//  blink date + 1-min buffer). Grants publish, subscribe, and
//  data publish permissions.
// ═══════════════════════════════════════════════════════════

import { AccessToken } from "https://esm.sh/livekit-server-sdk@2.6.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, errorResponse, jsonResponse, isValidLength, RateLimiter, getClientIp } from "../_shared/cors.ts";

const limiter = new RateLimiter(20, 60_000);

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

    const userId = user.id;

    // ── Parse request body ──
    const body = await req.json().catch(() => ({}));
    const { room_name } = body;

    if (!room_name || typeof room_name !== "string") {
      return errorResponse("room_name is required in request body", 400, CORS_HEADERS);
    }

    // Validate room_name length and format
    if (!isValidLength(room_name, 1, 255)) {
      return errorResponse("room_name must be between 1 and 255 characters", 400, CORS_HEADERS);
    }

    if (!/^[a-zA-Z0-9_\-]+$/.test(room_name)) {
      return errorResponse("room_name must contain only alphanumeric characters, underscores, or hyphens", 400, CORS_HEADERS);
    }

    // ── Validate user is a participant in the blink date ──
    const blinkDateMatch = room_name.match(/^blink-date-(.+)-round-(\d+)$/);
    if (blinkDateMatch) {
      const matchId = blinkDateMatch[1];
      const { data: matchRow, error: matchError } = await supabase
        .from("matches")
        .select("user_1_id, user_2_id")
        .eq("id", matchId)
        .maybeSingle();

      if (matchError || !matchRow) {
        return errorResponse("Match not found", 404, CORS_HEADERS);
      }

      if (matchRow.user_1_id !== userId && matchRow.user_2_id !== userId) {
        return errorResponse("Not a participant", 403, CORS_HEADERS);
      }
    }

    // ── Read LiveKit credentials ──
    const livekitApiKey = Deno.env.get("LIVEKIT_API_KEY");
    const livekitApiSecret = Deno.env.get("LIVEKIT_API_SECRET");
    const livekitWsUrl = Deno.env.get("LIVEKIT_WS_URL");

    if (!livekitApiKey || !livekitApiSecret || !livekitWsUrl) {
      return errorResponse("LiveKit credentials not configured", 500, CORS_HEADERS);
    }

    // ── Generate LiveKit access token ──
    // TTL = 660 seconds (11 minutes: 10-min blink date + 1-min buffer)
    const accessToken = new AccessToken(livekitApiKey, livekitApiSecret, {
      identity: userId,
      ttl: 660,
    });

    accessToken.addGrant({
      room: room_name,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    const token = await accessToken.toJwt();

    return jsonResponse({ token, ws_url: livekitWsUrl }, 200, CORS_HEADERS);
  } catch (err) {
    return errorResponse("Internal server error", 500, CORS_HEADERS, err);
  }
});
