// ═══════════════════════════════════════════════════════════
//  MY MUQABALA — Edge Function: blur-photo
//  Creates a blurred version of a user's photo using
//  Supabase Image Transformations (no sharp dependency).
//
//  Instead of downloading → processing → re-uploading,
//  we compute the transformation URL and store it directly
//  in profiles.photo_floue_url.
// ═══════════════════════════════════════════════════════════

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, errorResponse, jsonResponse, isValidUUID, RateLimiter, getClientIp } from "../_shared/cors.ts";

/** Allowed image extensions */
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

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
    const { user_id, photo_path } = body;

    if (!user_id || typeof user_id !== "string") {
      return errorResponse("user_id is required", 400, CORS_HEADERS);
    }

    if (!isValidUUID(user_id)) {
      return errorResponse("user_id must be a valid UUID", 400, CORS_HEADERS);
    }

    if (!photo_path || typeof photo_path !== "string") {
      return errorResponse("photo_path is required", 400, CORS_HEADERS);
    }

    // ── PATH TRAVERSAL PROTECTION ──
    const normalizedPath = photo_path.replace(/\\/g, "/");

    if (normalizedPath.includes("..") || normalizedPath.includes("//")) {
      return errorResponse("Invalid photo path", 400, CORS_HEADERS);
    }

    // Verify authorization: own photo or coach/admin
    if (user.id !== user_id) {
      const { data: callerProfile } = await supabaseAdmin
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!callerProfile || !["coach", "admin"].includes(callerProfile.role)) {
        return errorResponse("You can only blur your own photo unless you are a coach/admin", 403, CORS_HEADERS);
      }
    }

    // Path must start with user_id prefix
    if (!normalizedPath.startsWith(`${user_id}/`)) {
      return errorResponse("photo_path must be within the user's storage folder", 400, CORS_HEADERS);
    }

    // Validate file extension
    const ext = normalizedPath.substring(normalizedPath.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return errorResponse(
        `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(", ")}`,
        400,
        CORS_HEADERS
      );
    }

    // ── Verify the source file exists ──
    const { error: downloadError } = await supabaseAdmin.storage
      .from("photos")
      .download(normalizedPath);

    if (downloadError) {
      return errorResponse("Photo not found in storage", 404, CORS_HEADERS);
    }

    // ── Compute blurred URL via Image Transformations ──
    // Supabase Image Transformations render endpoint:
    // {supabaseUrl}/storage/v1/render/image/public/{bucket}/{path}?blur=50&quality=80
    const blurredUrl = `${supabaseUrl}/storage/v1/render/image/public/photos/${normalizedPath}?blur=50&quality=80`;

    // ── Update profile with blurred photo URL ──
    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ photo_floue_url: blurredUrl })
      .eq("id", user_id);

    if (updateError) {
      return jsonResponse(
        {
          error: "Failed to update profile with blurred URL",
          blurred_url: blurredUrl,
        },
        207,
        CORS_HEADERS
      );
    }

    return jsonResponse({ blurred_url: blurredUrl }, 200, CORS_HEADERS);
  } catch (err) {
    return errorResponse("Internal server error", 500, CORS_HEADERS, err);
  }
});
