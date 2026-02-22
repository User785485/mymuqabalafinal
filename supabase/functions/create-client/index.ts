// ═══════════════════════════════════════════════════════════
//  MY MUQABALA — Edge Function: create-client
//  Allows the coach/admin to create a new client with a
//  generated secure password. Creates a Supabase Auth user
//  (email-based with password, email derived from phone number),
//  a profiles entry with role='participant' and
//  statut_parcours='inscription'.
//  Returns the generated password so the admin can share it.
// ═══════════════════════════════════════════════════════════

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, errorResponse, jsonResponse, isValidPhone, isValidLength, RateLimiter, getClientIp } from "../_shared/cors.ts";

const limiter = new RateLimiter(10, 60_000);

/**
 * Generate a cryptographically secure 12-character password.
 * - Uppercase letters (excluding I, O to avoid confusion)
 * - Lowercase letters (excluding l)
 * - Digits (excluding 0, 1)
 * - Special characters (!@#$%&*?)
 * - Guaranteed at least 1 from each category
 * - Shuffled with Fisher-Yates
 */
function generateSecurePassword(): string {
  const uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // no I, O
  const lowercase = "abcdefghijkmnopqrstuvwxyz"; // no l
  const digits = "23456789"; // no 0, 1
  const special = "!@#$%&*?";

  const allChars = uppercase + lowercase + digits + special;
  const PASSWORD_LENGTH = 12;

  // Cryptographic random helper
  function randomIndex(max: number): number {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] % max;
  }

  // Guarantee at least one from each category
  const chars: string[] = [
    uppercase[randomIndex(uppercase.length)],
    lowercase[randomIndex(lowercase.length)],
    digits[randomIndex(digits.length)],
    special[randomIndex(special.length)],
  ];

  // Fill the rest from the full pool
  for (let i = chars.length; i < PASSWORD_LENGTH; i++) {
    chars.push(allChars[randomIndex(allChars.length)]);
  }

  // Fisher-Yates shuffle
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}

/**
 * Generate a random 6-character uppercase alphanumeric code.
 * Used for client_code (login identifier) and access_code (password).
 */
function generateCode6(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I, O, 0, 1
  const arr = new Uint8Array(6);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => chars[b % chars.length]).join("");
}

/**
 * Convert a phone number to a fake email address for Supabase Auth.
 * Strips all non-digit characters except leading +.
 * Example: +33 6 10 00 00 00 → 33610000000@mymuqabala.app
 */
function phoneToEmail(phone: string): string {
  const cleaned = phone.replace(/[^\d]/g, "");
  return cleaned + "@mymuqabala.app";
}

Deno.serve(async (req: Request) => {
  const CORS_HEADERS = getCorsHeaders(req);

  // ── Preflight ──
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return errorResponse("Méthode non autorisée", 405, CORS_HEADERS);
  }

  // ── Rate Limiting ──
  if (!limiter.check(getClientIp(req))) {
    return errorResponse("Trop de requêtes, réessayez dans une minute", 429, CORS_HEADERS);
  }

  try {
    // ── Verify Supabase Auth JWT ──
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return errorResponse("En-tête Authorization manquant", 401, CORS_HEADERS);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Service-role client for admin operations
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Verify caller identity from JWT
    const jwt = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: authError,
    } = await supabaseAdmin.auth.getUser(jwt);

    if (authError || !user) {
      return errorResponse("Jeton invalide ou expiré", 401, CORS_HEADERS);
    }

    // ── Verify caller is coach or admin ──
    const { data: callerProfile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !callerProfile) {
      return errorResponse("Profil de l'appelant introuvable", 404, CORS_HEADERS);
    }

    if (!["coach", "admin"].includes(callerProfile.role)) {
      return errorResponse("Seuls les coachs et admins peuvent créer des clients", 403, CORS_HEADERS);
    }

    // ── Parse and validate request body ──
    const body = await req.json().catch(() => ({}));
    const { telephone, prenom, nom, email, genre } = body;

    if (!telephone || typeof telephone !== "string") {
      return errorResponse("Le téléphone est obligatoire", 400, CORS_HEADERS);
    }

    if (!isValidPhone(telephone)) {
      return errorResponse("Format de téléphone invalide (attendu: +33612345678)", 400, CORS_HEADERS);
    }

    if (!prenom || typeof prenom !== "string") {
      return errorResponse("Le prénom est obligatoire", 400, CORS_HEADERS);
    }

    if (!isValidLength(prenom, 2, 100)) {
      return errorResponse("Le prénom doit contenir entre 2 et 100 caractères", 400, CORS_HEADERS);
    }

    if (nom && typeof nom === "string" && !isValidLength(nom, 1, 100)) {
      return errorResponse("Le nom doit contenir 100 caractères maximum", 400, CORS_HEADERS);
    }

    if (!genre || !["homme", "femme"].includes(genre)) {
      return errorResponse("Le genre est obligatoire (homme ou femme)", 400, CORS_HEADERS);
    }

    // ── Generate secure password ──
    const generatedPassword = generateSecurePassword();

    // ── Create Supabase Auth user with email (derived from phone) + password ──
    const fakeEmail = phoneToEmail(telephone);
    const { data: authUser, error: createUserError } =
      await supabaseAdmin.auth.admin.createUser({
        email: fakeEmail,
        password: generatedPassword,
        email_confirm: true,
        user_metadata: { role: "participant", prenom },
      });

    if (createUserError) {
      if (createUserError.message?.includes("already been registered")) {
        return errorResponse(
          "Un utilisateur avec ce numéro de téléphone existe déjà",
          409,
          CORS_HEADERS
        );
      }

      return errorResponse("Impossible de créer l'utilisateur", 500, CORS_HEADERS, createUserError);
    }

    const newUserId = authUser.user.id;

    // ── Create profiles entry ──
    // NOTE: Password is NOT stored in the database for security.
    // It is only returned in the response for the admin to share.
    const clientCode = generateCode6();
    const accessCode = generateCode6();

    const { error: profileInsertError } = await supabaseAdmin
      .from("profiles")
      .insert({
        id: newUserId,
        prenom,
        nom: nom || null,
        telephone,
        email: email || null,
        genre,
        date_naissance: "2000-01-01", // placeholder
        ville: "Non renseignée", // placeholder
        role: "participant",
        statut_parcours: "inscription",
        client_code: clientCode,
        access_code: accessCode,
      });

    if (profileInsertError) {
      // Rollback: delete the auth user we just created
      await supabaseAdmin.auth.admin.deleteUser(newUserId);
      return errorResponse("Impossible de créer le profil", 500, CORS_HEADERS, profileInsertError);
    }

    // ── Success ──
    return jsonResponse(
      {
        success: true,
        user_id: newUserId,
        password: generatedPassword,
        client_code: clientCode,
        access_code: accessCode,
      },
      201,
      CORS_HEADERS
    );
  } catch (err) {
    return errorResponse("Erreur interne du serveur", 500, CORS_HEADERS, err);
  }
});
