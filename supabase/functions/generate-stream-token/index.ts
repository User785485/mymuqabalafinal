// ═══════════════════════════════════════════════════════════
//  MY MUQABALA — Edge Function: generate-stream-token
//  Generates a Stream Chat JWT token for authenticated users.
//  The token allows the Flutter client to connect to Stream Chat
//  with the user's Supabase user_id as their Stream identity.
// ═══════════════════════════════════════════════════════════

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, errorResponse, jsonResponse, RateLimiter, getClientIp } from "../_shared/cors.ts";

// ── Manual JWT generation for Stream Chat ──
// (stream-chat npm package's createToken uses jsonwebtoken which has issues in Deno)
async function createStreamToken(userId: string, secret: string): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = { user_id: userId };

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
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

const limiter = new RateLimiter(30, 60_000);

Deno.serve(async (req: Request) => {
  const CORS_HEADERS = getCorsHeaders(req);

  // ── Preflight ──
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  // ── POST only ──
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

    // Extract the JWT from "Bearer <token>"
    const jwt = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);

    if (authError || !user) {
      return errorResponse("Invalid or expired token", 401, CORS_HEADERS);
    }

    const userId = user.id;

    // ── Generate Stream Chat token ──
    const streamSecret = Deno.env.get("STREAM_SECRET");

    if (!streamSecret) {
      return errorResponse("Stream Chat credentials not configured", 500, CORS_HEADERS);
    }

    const streamToken = await createStreamToken(userId, streamSecret);

    return jsonResponse({ stream_token: streamToken }, 200, CORS_HEADERS);
  } catch (err) {
    return errorResponse("Internal server error", 500, CORS_HEADERS, err);
  }
});
