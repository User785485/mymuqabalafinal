// ═══════════════════════════════════════════════════════════
//  MY MUQABALA — Edge Function: generate-stream-token-client
//  Generates a Stream Chat JWT token for clients authenticated
//  via telephone + access_code (no Supabase Auth JWT).
//  Called anonymously from the client dashboard chat bubble.
// ═══════════════════════════════════════════════════════════

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  getCorsHeaders,
  errorResponse,
  jsonResponse,
  RateLimiter,
  getClientIp,
  isValidPhone,
} from "../_shared/cors.ts";

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

// Stricter rate limit — anonymous-facing endpoint
const limiter = new RateLimiter(10, 60_000);

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
    return errorResponse(
      "Trop de requêtes, réessayez dans une minute",
      429,
      CORS_HEADERS
    );
  }

  try {
    const body = await req.json();
    const { telephone, access_code } = body;

    // ── Input validation ──
    if (!telephone || typeof telephone !== "string") {
      return errorResponse("Numéro de téléphone requis", 400, CORS_HEADERS);
    }
    if (!isValidPhone(telephone)) {
      return errorResponse("Format de téléphone invalide", 400, CORS_HEADERS);
    }
    if (!access_code || typeof access_code !== "string" || !access_code.trim()) {
      return errorResponse("Code d'accès requis", 400, CORS_HEADERS);
    }

    // ── Verify client credentials via RPC ──
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: clientUuid, error: rpcError } = await supabase.rpc(
      "verify_client_access",
      { p_telephone: telephone.trim(), p_code: access_code.trim() }
    );

    if (rpcError || !clientUuid) {
      return errorResponse(
        "Identifiants invalides",
        401,
        CORS_HEADERS,
        rpcError
      );
    }

    // ── Fetch client name (try profiles first, then clients) ──
    let clientName = "Client";
    const { data: profile } = await supabase
      .from("profiles")
      .select("prenom")
      .eq("id", clientUuid)
      .single();
    if (profile?.prenom) {
      clientName = profile.prenom;
    } else {
      const { data: legacyClient } = await supabase
        .from("clients")
        .select("prenom")
        .eq("id", clientUuid)
        .single();
      if (legacyClient?.prenom) clientName = legacyClient.prenom;
    }

    // ── Generate Stream Chat token ──
    const streamSecret = Deno.env.get("STREAM_SECRET");

    if (!streamSecret) {
      return errorResponse(
        "Stream Chat credentials not configured",
        500,
        CORS_HEADERS
      );
    }

    const streamToken = await createStreamToken(clientUuid, streamSecret);

    return jsonResponse(
      { stream_token: streamToken, user_id: clientUuid, user_name: clientName },
      200,
      CORS_HEADERS
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return errorResponse("Error: " + msg, 500, CORS_HEADERS, err);
  }
});
