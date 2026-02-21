// ═══════════════════════════════════════════════════════════
//  MY MUQABALA — Edge Function: invite-participant
//  Allows the coach to invite a new participant to the platform.
//  Creates a Supabase Auth user (phone-based), a profiles entry
//  with role='participant' and statut_parcours='inscription',
//  and an invitations entry linked to the coach who invited.
//  Decision D9: inscription sur invitation uniquement.
// ═══════════════════════════════════════════════════════════

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, errorResponse, jsonResponse, isValidPhone, isValidLength, RateLimiter, getClientIp } from "../_shared/cors.ts";

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

    // Use service role client for admin operations (creating users, inserting profiles)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Use the caller's JWT to verify identity
    const jwt = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(jwt);

    if (authError || !user) {
      return errorResponse("Invalid or expired token", 401, CORS_HEADERS);
    }

    // ── Verify caller is coach or admin ──
    const { data: callerProfile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !callerProfile) {
      return errorResponse("Caller profile not found", 404, CORS_HEADERS);
    }

    if (!["coach", "admin"].includes(callerProfile.role)) {
      return errorResponse("Only coaches and admins can invite participants", 403, CORS_HEADERS);
    }

    // ── Parse request body ──
    const body = await req.json().catch(() => ({}));
    const { telephone, prenom, nom, email } = body;

    if (!telephone || typeof telephone !== "string") {
      return errorResponse("telephone is required", 400, CORS_HEADERS);
    }

    if (!isValidPhone(telephone)) {
      return errorResponse("Invalid phone number format (expected: +33612345678)", 400, CORS_HEADERS);
    }

    if (!prenom || typeof prenom !== "string") {
      return errorResponse("prenom is required", 400, CORS_HEADERS);
    }

    if (!isValidLength(prenom, 2, 100)) {
      return errorResponse("prenom must be between 2 and 100 characters", 400, CORS_HEADERS);
    }

    if (nom && typeof nom === "string" && !isValidLength(nom, 1, 100)) {
      return errorResponse("nom must be 100 characters or less", 400, CORS_HEADERS);
    }

    // ── Check if invitation already exists for this phone ──
    const { data: existingInvitation } = await supabaseAdmin
      .from("invitations")
      .select("id, statut")
      .eq("telephone", telephone)
      .in("statut", ["envoyee", "acceptee"])
      .maybeSingle();

    if (existingInvitation) {
      return jsonResponse(
        {
          error: "An active invitation already exists for this phone number",
          existing_invitation_id: existingInvitation.id,
          statut: existingInvitation.statut,
        },
        409,
        CORS_HEADERS
      );
    }

    // ── Create Supabase Auth user with phone ──
    const { data: newAuthUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
      phone: telephone,
      phone_confirm: true,
      user_metadata: {
        prenom,
        nom: nom || null,
        email: email || null,
        invited_by: user.id,
      },
    });

    if (createUserError) {
      // If user already exists in auth, try to find them
      if (createUserError.message?.includes("already been registered")) {
        return errorResponse(
          "A user with this phone number already exists",
          409,
          CORS_HEADERS
        );
      }

      return errorResponse("Failed to create auth user", 500, CORS_HEADERS, createUserError);
    }

    const newUserId = newAuthUser.user.id;

    // ── Create profiles entry ──
    const { error: profileInsertError } = await supabaseAdmin.from("profiles").insert({
      id: newUserId,
      prenom,
      nom: nom || null,
      telephone,
      email: email || null,
      date_naissance: "2000-01-01",  // Placeholder — participant will fill in during onboarding
      ville: "",                      // Placeholder — participant will fill in during onboarding
      genre: "homme",                 // Placeholder — participant will fill in during onboarding
      role: "participant",
      statut_parcours: "inscription",
    });

    if (profileInsertError) {
      // Rollback: delete the auth user we just created
      await supabaseAdmin.auth.admin.deleteUser(newUserId);
      return errorResponse("Failed to create profile", 500, CORS_HEADERS, profileInsertError);
    }

    // ── Create invitations entry ──
    // Download link is a deep link placeholder; the actual URL will depend
    // on the app store links once the app is published (Decision D10/D13)
    const downloadLink = `https://my-muqabala.fr/invitation?uid=${newUserId}`;

    const { data: invitation, error: invitationError } = await supabaseAdmin
      .from("invitations")
      .insert({
        telephone,
        prenom,
        nom: nom || null,
        email: email || null,
        created_by: user.id,
        statut: "envoyee",
        user_id: newUserId,
        lien_telechargement: downloadLink,
      })
      .select("id")
      .single();

    if (invitationError) {
      return errorResponse("Failed to create invitation", 500, CORS_HEADERS, invitationError);
    }

    return jsonResponse(
      {
        invitation_id: invitation.id,
        user_id: newUserId,
        download_link: downloadLink,
      },
      201,
      CORS_HEADERS
    );
  } catch (err) {
    return errorResponse("Internal server error", 500, CORS_HEADERS, err);
  }
});
