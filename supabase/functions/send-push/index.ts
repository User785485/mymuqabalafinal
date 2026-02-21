// ═══════════════════════════════════════════════════════════
//  MY MUQABALA — Edge Function: send-push
//  Sends push notifications via Firebase Cloud Messaging (FCM).
//  Used for NON-CHAT notifications: events, documents, forms,
//  reminders. Chat notifications are handled by Stream Chat.
//
//  Accepts { user_id, title, body, data? }
//  Looks up all active device_tokens for the user and sends
//  FCM messages to each one. Deactivates tokens that fail
//  permanently (unregistered devices).
// ═══════════════════════════════════════════════════════════

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, errorResponse, jsonResponse, isValidUUID, isValidLength, RateLimiter, getClientIp } from "../_shared/cors.ts";

const limiter = new RateLimiter(30, 60_000);

// Firebase Admin SDK types for FCM
interface FirebaseServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

/**
 * Create a JWT for Google OAuth2 service account authentication.
 * This replaces the need for the full firebase-admin SDK which
 * has compatibility issues in Deno/Edge Functions environments.
 */
async function createGoogleJwt(serviceAccount: FirebaseServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccount.client_email,
    sub: serviceAccount.client_email,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
    scope: "https://www.googleapis.com/auth/firebase.messaging",
  };

  const encoder = new TextEncoder();

  const headerB64 = btoa(JSON.stringify(header))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const payloadB64 = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const signingInput = `${headerB64}.${payloadB64}`;

  // Import the private key for signing
  const pemContents = serviceAccount.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\n/g, "");

  const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    encoder.encode(signingInput)
  );

  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return `${signingInput}.${signatureB64}`;
}

/**
 * Exchange a self-signed JWT for a Google OAuth2 access token.
 */
async function getAccessToken(serviceAccount: FirebaseServiceAccount): Promise<string> {
  const jwt = await createGoogleJwt(serviceAccount);

  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });

  if (!resp.ok) {
    const errorBody = await resp.text();
    throw new Error(`Failed to get access token: ${resp.status} ${errorBody}`);
  }

  const tokenData = await resp.json();
  return tokenData.access_token;
}

/**
 * Send an FCM v1 HTTP message using the access token.
 */
async function sendFcmMessage(
  accessToken: string,
  projectId: string,
  deviceToken: string,
  title: string,
  body: string,
  data?: Record<string, string>
): Promise<{ success: boolean; error?: string; unregistered?: boolean }> {
  const message: Record<string, unknown> = {
    message: {
      token: deviceToken,
      notification: { title, body },
      android: {
        priority: "high",
        notification: { click_action: "FLUTTER_NOTIFICATION_CLICK" },
      },
      apns: {
        payload: {
          aps: { alert: { title, body }, sound: "default", "mutable-content": 1 },
        },
      },
      ...(data && Object.keys(data).length > 0 ? { data } : {}),
    },
  };

  const resp = await fetch(
    `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }
  );

  if (resp.ok) {
    return { success: true };
  }

  const errorBody = await resp.json().catch(() => ({ error: { message: resp.statusText } }));
  const errorMessage = errorBody?.error?.message || "Unknown FCM error";

  // Check if the token is unregistered (device no longer valid)
  const isUnregistered =
    errorBody?.error?.details?.some(
      (d: Record<string, string>) => d.errorCode === "UNREGISTERED"
    ) || errorMessage.includes("not a valid FCM registration token");

  return { success: false, error: errorMessage, unregistered: isUnregistered };
}

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

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const jwt = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(jwt);

    if (authError || !user) {
      return errorResponse("Invalid or expired token", 401, CORS_HEADERS);
    }

    // ── Parse request body ──
    const body = await req.json().catch(() => ({}));
    const { user_id, title, body: notifBody, data: notifData } = body;

    if (!user_id || typeof user_id !== "string") {
      return errorResponse("user_id is required", 400, CORS_HEADERS);
    }

    if (!isValidUUID(user_id)) {
      return errorResponse("user_id must be a valid UUID", 400, CORS_HEADERS);
    }

    if (!title || typeof title !== "string") {
      return errorResponse("title is required", 400, CORS_HEADERS);
    }

    if (!isValidLength(title, 1, 255)) {
      return errorResponse("title must be between 1 and 255 characters", 400, CORS_HEADERS);
    }

    if (!notifBody || typeof notifBody !== "string") {
      return errorResponse("body is required", 400, CORS_HEADERS);
    }

    if (!isValidLength(notifBody, 1, 4096)) {
      return errorResponse("body must be between 1 and 4096 characters", 400, CORS_HEADERS);
    }

    // Validate optional data object
    if (notifData && typeof notifData === "object") {
      const dataKeys = Object.keys(notifData);
      if (dataKeys.length > 10) {
        return errorResponse("data object cannot have more than 10 keys", 400, CORS_HEADERS);
      }
      for (const val of Object.values(notifData)) {
        if (String(val).length > 256) {
          return errorResponse("data values must be 256 characters or less", 400, CORS_HEADERS);
        }
      }
    }

    // ── Read Firebase service account from env ──
    const serviceAccountJson = Deno.env.get("FIREBASE_SERVICE_ACCOUNT");
    if (!serviceAccountJson) {
      return errorResponse("FIREBASE_SERVICE_ACCOUNT not configured", 500, CORS_HEADERS);
    }

    let serviceAccount: FirebaseServiceAccount;
    try {
      serviceAccount = JSON.parse(serviceAccountJson);
    } catch {
      return errorResponse("Invalid FIREBASE_SERVICE_ACCOUNT configuration", 500, CORS_HEADERS);
    }

    // ── Fetch active device tokens for the target user ──
    const { data: tokens, error: tokensError } = await supabaseAdmin
      .from("device_tokens")
      .select("id, token, platform")
      .eq("user_id", user_id)
      .eq("is_active", true);

    if (tokensError) {
      return errorResponse("Failed to fetch device tokens", 500, CORS_HEADERS);
    }

    if (!tokens || tokens.length === 0) {
      return jsonResponse(
        { sent_count: 0, failed_count: 0, message: "No active device tokens found" },
        200,
        CORS_HEADERS
      );
    }

    // ── Get FCM access token ──
    const accessToken = await getAccessToken(serviceAccount);

    // ── Send FCM messages to all active tokens ──
    // Convert data values to strings as required by FCM
    const stringData: Record<string, string> = {};
    if (notifData && typeof notifData === "object") {
      for (const [key, value] of Object.entries(notifData)) {
        stringData[key] = String(value);
      }
    }

    let sentCount = 0;
    let failedCount = 0;
    const tokensToDeactivate: string[] = [];

    const results = await Promise.allSettled(
      tokens.map((t) =>
        sendFcmMessage(accessToken, serviceAccount.project_id, t.token, title, notifBody, stringData)
      )
    );

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.status === "fulfilled" && result.value.success) {
        sentCount++;
      } else {
        failedCount++;
        // Deactivate unregistered tokens
        const value = result.status === "fulfilled" ? result.value : null;
        if (value?.unregistered) {
          tokensToDeactivate.push(tokens[i].id);
        }
      }
    }

    // ── Deactivate invalid tokens ──
    if (tokensToDeactivate.length > 0) {
      await supabaseAdmin
        .from("device_tokens")
        .update({ is_active: false })
        .in("id", tokensToDeactivate);
    }

    return jsonResponse(
      {
        sent_count: sentCount,
        failed_count: failedCount,
        tokens_deactivated: tokensToDeactivate.length,
      },
      200,
      CORS_HEADERS
    );
  } catch (err) {
    return errorResponse("Internal server error", 500, CORS_HEADERS, err);
  }
});
