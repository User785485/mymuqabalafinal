// ═══════════════════════════════════════════════════════════
//  MY MUQABALA — Shared CORS & Security Utilities
//  Used by all Edge Functions for consistent security headers.
//
//  Configure allowed origins via Supabase secrets:
//    supabase secrets set ALLOWED_ORIGINS="https://my-muqabala.fr,https://www.my-muqabala.fr"
// ═══════════════════════════════════════════════════════════

/** Default allowed origins (production + local dev) */
const DEFAULT_ALLOWED_ORIGINS = [
  "https://my-muqabala.fr",
  "https://www.my-muqabala.fr",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

/**
 * Build CORS headers based on the request origin.
 * Returns the origin header only if it matches the whitelist.
 * Mobile apps (no Origin header) are always allowed.
 */
export function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") || "";

  // Parse allowed origins from env or use defaults
  const envOrigins = Deno.env.get("ALLOWED_ORIGINS");
  const allowedOrigins = envOrigins
    ? envOrigins.split(",").map((o) => o.trim())
    : DEFAULT_ALLOWED_ORIGINS;

  // If no origin (mobile/server requests), allow
  // If origin matches whitelist, reflect it
  // Otherwise, return the first allowed origin (browser will block the mismatch)
  let corsOrigin: string;
  if (!origin) {
    corsOrigin = allowedOrigins[0];
  } else if (allowedOrigins.includes(origin)) {
    corsOrigin = origin;
  } else {
    corsOrigin = allowedOrigins[0];
  }

  return {
    "Access-Control-Allow-Origin": corsOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
}

/**
 * Create a JSON error response without exposing internal details.
 * Always logs the full error server-side for debugging.
 */
export function errorResponse(
  message: string,
  status: number,
  corsHeaders: Record<string, string>,
  internalError?: unknown
): Response {
  if (internalError) {
    console.error(`[Edge Function Error] ${message}:`, internalError);
  }
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/**
 * Create a JSON success response.
 */
export function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  corsHeaders: Record<string, string>
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// ── Rate Limiting ──

/**
 * Simple in-memory sliding window rate limiter.
 * Works within a single Deno Deploy isolate.
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private windowMs: number;
  private maxRequests: number;
  private cleanupCounter = 0;

  constructor(maxRequests = 30, windowMs = 60_000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  check(identifier: string): boolean {
    const now = Date.now();
    const timestamps = this.requests.get(identifier) || [];
    const valid = timestamps.filter((t) => now - t < this.windowMs);

    if (valid.length >= this.maxRequests) {
      this.requests.set(identifier, valid);
      return false;
    }

    valid.push(now);
    this.requests.set(identifier, valid);

    // Periodic cleanup every 100 checks
    if (++this.cleanupCounter >= 100) {
      this.cleanupCounter = 0;
      for (const [key, ts] of this.requests.entries()) {
        const kept = ts.filter((t) => now - t < this.windowMs);
        if (kept.length === 0) this.requests.delete(key);
        else this.requests.set(key, kept);
      }
    }

    return true;
  }
}

/** Extract client IP from proxy headers. */
export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

// ── Input Validation Helpers ──

const PHONE_REGEX = /^\+?[0-9\s\-()]{7,20}$/;
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isValidPhone(phone: string): boolean {
  return PHONE_REGEX.test(phone.trim());
}

export function isValidUUID(id: string): boolean {
  return UUID_REGEX.test(id.trim());
}

export function isValidLength(
  str: string,
  min: number,
  max: number
): boolean {
  const len = str.trim().length;
  return len >= min && len <= max;
}
