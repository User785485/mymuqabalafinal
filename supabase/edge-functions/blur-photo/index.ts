// ═══════════════════════════════════════════════════════════
//  MY MUQABALA — Edge Function: blur-photo
//  Creates a blurred version of a user's photo using sharp.
//  The blurred photo is used throughout the app to preserve
//  anonymity during Phase 1 (Matching). Photo nette is only
//  revealed progressively during later phases.
//
//  Accepts { user_id, photo_path } where photo_path is a path
//  in the Supabase Storage "photos" bucket.
//  Applies Gaussian blur (sigma ~15) and uploads the result
//  as "{user_id}/photo_floue.jpg".
// ═══════════════════════════════════════════════════════════

import sharp from "https://esm.sh/sharp@0.33.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, errorResponse, jsonResponse, isValidUUID, RateLimiter, getClientIp } from "../_shared/cors.ts";

/** Maximum allowed photo size: 5 MB */
const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

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
    // Normalize and validate the photo_path:
    // 1. Must start with the user_id prefix (users can only access their own photos)
    // 2. Must not contain path traversal sequences
    // 3. Must have an allowed image extension
    const normalizedPath = photo_path.replace(/\\/g, "/");

    if (normalizedPath.includes("..") || normalizedPath.includes("//")) {
      return errorResponse("Invalid photo path", 400, CORS_HEADERS);
    }

    if (!normalizedPath.startsWith(`${user_id}/`)) {
      // Allow coaches/admins to blur any user's photo — but the path must still
      // start with the TARGET user_id, not a different user's folder
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

      // Even for coaches, the path must start with the target user_id
      if (!normalizedPath.startsWith(`${user_id}/`)) {
        return errorResponse("photo_path must be within the user's storage folder", 400, CORS_HEADERS);
      }
    } else {
      // Path starts with user_id — verify authorization
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

    // ── Download original photo from storage ──
    const { data: fileData, error: downloadError } = await supabaseAdmin.storage
      .from("photos")
      .download(normalizedPath);

    if (downloadError || !fileData) {
      return errorResponse("Failed to download photo", 404, CORS_HEADERS);
    }

    // ── Validate file size ──
    const arrayBuffer = await fileData.arrayBuffer();
    if (arrayBuffer.byteLength > MAX_PHOTO_SIZE) {
      return errorResponse(
        `Photo too large. Maximum size: ${MAX_PHOTO_SIZE / 1024 / 1024}MB`,
        413,
        CORS_HEADERS
      );
    }

    // ── Apply Gaussian blur ──
    const inputBuffer = new Uint8Array(arrayBuffer);

    const blurredBuffer = await sharp(inputBuffer)
      .blur(15)           // Gaussian blur with sigma ~15
      .jpeg({ quality: 80 })
      .toBuffer();

    // ── Upload blurred version to storage ──
    const blurredPath = `${user_id}/photo_floue.jpg`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("photos")
      .upload(blurredPath, blurredBuffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      return errorResponse("Failed to upload blurred photo", 500, CORS_HEADERS);
    }

    // ── Get public URL ──
    const { data: publicUrlData } = supabaseAdmin.storage
      .from("photos")
      .getPublicUrl(blurredPath);

    const blurredUrl = publicUrlData.publicUrl;

    // ── Update profile with blurred photo URL ──
    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ photo_floue_url: blurredUrl })
      .eq("id", user_id);

    if (updateError) {
      // Photo was blurred and uploaded successfully, but profile update failed
      // Return partial success with the URL so it's not lost
      return jsonResponse(
        {
          error: "Photo blurred and uploaded but failed to update profile",
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
