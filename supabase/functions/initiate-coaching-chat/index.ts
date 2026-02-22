// ═══════════════════════════════════════════════════════════
//  MY MUQABALA — Edge Function: initiate-coaching-chat
//  Allows any authenticated user to initiate a coaching
//  conversation. Uses Stream Chat REST API directly
//  (no npm SDK — Deno compatible).
//
//  POST {} (empty body — user determined from JWT)
//  Returns { channel_id, coach_name }
// ═══════════════════════════════════════════════════════════

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, errorResponse, jsonResponse, RateLimiter, getClientIp } from "../_shared/cors.ts";

const limiter = new RateLimiter(5, 60_000);

// ── Stream Chat JWT (server token) ──
async function createServerToken(secret: string): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = { server: true };

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );

  function base64url(data: Uint8Array | string): string {
    const bytes = typeof data === "string" ? enc.encode(data) : data;
    let b64 = btoa(String.fromCharCode(...bytes));
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  const headerB64 = base64url(JSON.stringify(header));
  const payloadB64 = base64url(JSON.stringify(payload));
  const sigInput = enc.encode(`${headerB64}.${payloadB64}`);
  const sigBytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, sigInput));
  return `${headerB64}.${payloadB64}.${base64url(sigBytes)}`;
}

// ── Stream Chat REST API helper ──
async function streamApi(
  apiKey: string,
  serverToken: string,
  method: string,
  path: string,
  body?: Record<string, unknown>,
): Promise<{ ok: boolean; status: number; data: unknown }> {
  const url = `https://chat.stream-io-api.com/${path}?api_key=${apiKey}`;
  const resp = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": serverToken,
      "stream-auth-type": "jwt",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await resp.json();
  return { ok: resp.ok, status: resp.status, data };
}

Deno.serve(async (req: Request) => {
  const CORS_HEADERS = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return errorResponse("Method not allowed", 405, CORS_HEADERS);
  }

  if (!limiter.check(getClientIp(req))) {
    return errorResponse("Trop de requêtes, réessayez dans une minute", 429, CORS_HEADERS);
  }

  try {
    // ── Verify Supabase JWT ──
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

    // ── Get caller's profile ──
    const { data: callerProfile } = await supabase
      .from("profiles")
      .select("prenom, nom")
      .eq("id", userId)
      .single();

    const callerName = callerProfile?.prenom || "Client";

    // ── Find a coach or admin ──
    const { data: coachProfile, error: coachError } = await supabase
      .from("profiles")
      .select("id, prenom, nom")
      .in("role", ["coach", "admin"])
      .limit(1)
      .maybeSingle();

    if (coachError || !coachProfile) {
      console.error("No coach/admin found:", coachError);
      return errorResponse("Aucun coach disponible pour le moment", 404, CORS_HEADERS);
    }

    const coachId = coachProfile.id as string;
    const coachName = (coachProfile.prenom as string) || "Coach";

    // ── Stream Chat setup ──
    const streamApiKey = Deno.env.get("STREAM_API_KEY");
    const streamSecret = Deno.env.get("STREAM_SECRET");

    if (!streamApiKey || !streamSecret) {
      return errorResponse("Stream Chat credentials not configured", 500, CORS_HEADERS);
    }

    const serverToken = await createServerToken(streamSecret);

    // ── Upsert both users in Stream Chat ──
    const upsertResp = await streamApi(streamApiKey, serverToken, "POST", "users", {
      users: {
        [userId]: { id: userId, name: callerName, role: "user" },
        [coachId]: { id: coachId, name: coachName, role: "admin" },
      },
    });

    if (!upsertResp.ok) {
      console.error("Stream upsertUsers failed:", upsertResp.status, upsertResp.data);
      return errorResponse("Erreur lors de la configuration du chat", 500, CORS_HEADERS);
    }

    console.log(`Upserted users: ${userId} (${callerName}), ${coachId} (${coachName})`);

    // ── Create the coaching channel ──
    const channelId = `coaching-${userId}`;
    const channelResp = await streamApi(
      streamApiKey, serverToken, "POST",
      `channels/messaging/${channelId}/query`,
      {
        data: {
          name: `Coaching - ${callerName}`,
          members: [userId, coachId],
          created_by_id: userId,
        },
        messages: { limit: 0 },
      },
    );

    if (!channelResp.ok) {
      console.error("Stream createChannel failed:", channelResp.status, channelResp.data);
      return errorResponse("Erreur lors de la création du canal", 500, CORS_HEADERS);
    }

    console.log(`Created channel ${channelId}`);

    // ── Send welcome message ──
    const msgResp = await streamApi(
      streamApiKey, serverToken, "POST",
      `channels/messaging/${channelId}/message`,
      {
        message: {
          text: "Assalamou alaykoum, je souhaite échanger avec mon coach.",
          user_id: userId,
        },
      },
    );

    if (!msgResp.ok) {
      console.warn("Welcome message failed (non-critical):", msgResp.data);
    }

    return jsonResponse(
      { channel_id: channelId, coach_name: coachName },
      200,
      CORS_HEADERS,
    );
  } catch (err) {
    console.error("initiate-coaching-chat error:", err);
    return errorResponse("Internal server error", 500, CORS_HEADERS, err);
  }
});
