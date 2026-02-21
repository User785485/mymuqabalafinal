// ═══════════════════════════════════════════════════════════
//  MY MUQABALA — Edge Function: generate-stream-token-client
//  Generates a Stream Chat JWT token for clients authenticated
//  via telephone + access_code (no Supabase Auth JWT).
//  Called anonymously from the client dashboard chat bubble.
// ═══════════════════════════════════════════════════════════

import { StreamChat } from "https://esm.sh/stream-chat@8.40.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  getCorsHeaders,
  errorResponse,
  jsonResponse,
  RateLimiter,
  getClientIp,
  isValidPhone,
} from "../_shared/cors.ts";

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

    // ── Fetch client name for Stream user profile ──
    const { data: profile } = await supabase
      .from("profiles")
      .select("prenom")
      .eq("id", clientUuid)
      .single();

    const clientName = profile?.prenom || "Client";

    // ── Generate Stream Chat token ──
    const streamApiKey = Deno.env.get("STREAM_API_KEY");
    const streamSecret = Deno.env.get("STREAM_SECRET");

    if (!streamApiKey || !streamSecret) {
      return errorResponse(
        "Stream Chat credentials not configured",
        500,
        CORS_HEADERS
      );
    }

    const serverClient = StreamChat.getInstance(streamApiKey, streamSecret);

    // Upsert user in Stream so they exist before connecting
    await serverClient.upsertUsers([
      { id: clientUuid, name: clientName, role: "user" },
    ]);

    const streamToken = serverClient.createToken(clientUuid);

    return jsonResponse(
      { stream_token: streamToken, user_id: clientUuid },
      200,
      CORS_HEADERS
    );
  } catch (err) {
    return errorResponse("Internal server error", 500, CORS_HEADERS, err);
  }
});
