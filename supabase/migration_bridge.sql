-- =====================================================================================
--  MY MUQABALA — MIGRATION BRIDGE (V1 -> V2)
--  Backward-compatibility layer so the existing web app continues
--  to work while the mobile app uses the new V2 schema.
--
--  Prerequisites:
--    1. V1 schema (schema.sql) must already exist with data
--    2. V2 schema (schema_v2.sql) must be applied first
--
--  What this file does:
--    SECTION A: clients_v1_view    — VIEW mapping profiles -> old clients format
--    SECTION B: verify_client_access() — RPC rewritten for V2 (with V1 fallback)
--               get_client_dashboard() — RPC rewritten for V2 (with V1 data fallback)
--    SECTION C: migrate_v1_to_v2()     — Data migration: clients -> auth.users + profiles
--    SECTION D: verify_migration_status() — Migration health check
--
--  IDEMPOTENT: This file uses CREATE OR REPLACE, IF NOT EXISTS, and
--  ON CONFLICT DO NOTHING throughout. Safe to run multiple times.
--
--  IMPORTANT: Run this AFTER schema_v2.sql and AFTER verifying V1 data.
-- =====================================================================================


-- ============================================================
-- SECTION A: COMPATIBILITY VIEW
-- ============================================================
-- Maps V2 profiles -> V1 clients format for any code that still
-- reads from the "clients" table structure. The web dashboard JS
-- expects columns like client_id, access_code, statut, etc.

CREATE OR REPLACE VIEW clients_v1_view AS
SELECT
    p.id,

    -- Generate a 6-character client_id from the UUID (first 6 hex digits)
    SUBSTRING(p.id::text, 1, 6) AS client_id,

    -- OTP replaces access codes in V2, so this is a placeholder.
    -- During transition, the real access_code is stored in metadata.
    COALESCE(p.metadata->>'access_code', '000000') AS access_code,

    p.prenom,
    COALESCE(p.nom, '') AS nom,
    COALESCE(p.email, '') AS email,
    p.telephone,

    -- Statut mapping: V2 statut_parcours -> V1 statut (3 values: actif/archive/pause)
    CASE
        WHEN p.statut_parcours IN ('desactive', 'termine') THEN 'archive'
        ELSE 'actif'
    END AS statut,

    -- Legacy fields stored in metadata JSONB
    COALESCE(p.metadata->>'notes_internes', '') AS notes_internes,
    COALESCE(p.metadata->>'compte_rendu_id', '') AS compte_rendu_id,
    COALESCE(p.metadata->>'plan_action_id', '') AS plan_action_id,
    COALESCE(p.metadata->>'cartographie_id', '') AS cartographie_id,

    p.created_at,
    p.updated_at
FROM profiles p;

COMMENT ON VIEW clients_v1_view IS
    'Backward-compatibility view: maps V2 profiles to V1 clients format. '
    'Used by the existing web dashboard until full migration to V2 is complete.';


-- ============================================================
-- SECTION B: REWRITTEN RPCs
-- ============================================================
-- Same function signatures as V1. The web app calls these via
-- supabase.rpc() — no frontend changes needed during transition.


-- -----------------------------------------------------------
-- B1: verify_client_access(p_telephone TEXT, p_code TEXT)
-- -----------------------------------------------------------
-- V1 signature: verify_client_access(p_client_id TEXT, p_code TEXT)
-- NOTE: The ACTUAL web login form sends telephone + access_code,
-- even though the V1 SQL parameter was named p_client_id.
-- We keep the same (TEXT, TEXT) signature so nothing breaks.
--
-- Transition logic:
--   1. First check V2 profiles table (telephone + access_code in metadata)
--   2. Fall back to V1 clients table if not found in profiles
--   3. Update derniere_connexion on successful V2 lookup
--   4. Return the user UUID (or NULL if not found)

DROP FUNCTION IF EXISTS verify_client_access(TEXT, TEXT);

CREATE OR REPLACE FUNCTION verify_client_access(p_telephone TEXT, p_code TEXT)
RETURNS UUID AS $$
DECLARE
    v_uuid UUID;
BEGIN
    -- Attempt 1: Look up in V2 profiles by telephone + metadata->>'access_code'
    -- Only return active profiles (not desactive or termine)
    SELECT p.id INTO v_uuid
    FROM profiles p
    WHERE p.telephone = p_telephone
      AND p.metadata->>'access_code' = p_code
      AND p.statut_parcours NOT IN ('desactive', 'termine');

    -- Attempt 2: Fall back to V1 clients table
    -- (in case this client has not been migrated yet)
    IF v_uuid IS NULL THEN
        SELECT c.id INTO v_uuid
        FROM clients c
        WHERE c.telephone = p_telephone
          AND c.access_code = p_code
          AND c.statut = 'actif';
    END IF;

    -- Update derniere_connexion if found in V2 profiles
    IF v_uuid IS NOT NULL THEN
        UPDATE profiles
        SET derniere_connexion = NOW()
        WHERE id = v_uuid;
    END IF;

    RETURN v_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION verify_client_access(TEXT, TEXT) IS
    'V2 bridge: verifies telephone + access_code against profiles table, '
    'falling back to V1 clients table if not yet migrated. '
    'Updates derniere_connexion on successful V2 lookup.';


-- -----------------------------------------------------------
-- B2: get_client_dashboard(p_uuid UUID)
-- -----------------------------------------------------------
-- Returns the EXACT same JSON structure the web app expects:
--   {
--     client:              { id, client_id, prenom, nom, statut, ...IDs },
--     visibility:          { show_accueil, show_ressources, ... },
--     retours:             [ { semaine_numero, date_retour, contenu, statut } ],
--     bilans:              [ { mois_numero, titre, contenu, statut } ],
--     rencontres:          [ { numero, date_rencontre, titre, analyse, statut } ],
--     content:             { section_key: content_value, ... },
--     next_event:          { title, date, type } | null,
--     active_match:        { name, hobbies, compatibility, match_status } | null,
--     coach_message:       { message, date } | null,
--     pending_actions:     [ { type, text, link, priority, cta } ],
--     current_phase:       1-4,
--     unread_notifications: integer
--   }
--
-- Reads from V2 tables where available, falls back to V1 tables
-- for data not yet migrated (section_visibility, retours, bilans,
-- rencontres, section_content).

DROP FUNCTION IF EXISTS get_client_dashboard(UUID);

CREATE OR REPLACE FUNCTION get_client_dashboard(p_uuid UUID)
RETURNS JSON AS $$
DECLARE
    v_result JSON;
    v_profile RECORD;
BEGIN
    -- Check if this user exists in V2 profiles
    SELECT * INTO v_profile FROM profiles WHERE id = p_uuid;

    IF v_profile IS NULL THEN
        -- -------------------------------------------------------
        -- PURE V1 PATH: user not yet migrated to V2
        -- Read entirely from V1 tables
        -- -------------------------------------------------------
        SELECT json_build_object(
            'client', (SELECT row_to_json(c) FROM (
                SELECT id, client_id, prenom, nom, statut,
                       compte_rendu_id, plan_action_id, cartographie_id
                FROM clients WHERE id = p_uuid
            ) c),
            'visibility', (SELECT row_to_json(v) FROM (
                SELECT show_accueil, show_ressources, show_formulaires,
                       show_cartographie, show_compatibilite, show_plan_action,
                       show_rencontres, show_historique
                FROM section_visibility WHERE client_id = p_uuid
            ) v),
            'retours', COALESCE((SELECT json_agg(r ORDER BY r.semaine_numero) FROM (
                SELECT semaine_numero, date_retour, contenu, statut
                FROM retours_hebdomadaires WHERE client_id = p_uuid
            ) r), '[]'::json),
            'bilans', COALESCE((SELECT json_agg(b ORDER BY b.mois_numero) FROM (
                SELECT mois_numero, titre, contenu, statut
                FROM bilans_plan_action WHERE client_id = p_uuid
            ) b), '[]'::json),
            'rencontres', COALESCE((SELECT json_agg(h ORDER BY h.numero) FROM (
                SELECT numero, date_rencontre, titre, analyse, statut
                FROM rencontres_historique WHERE client_id = p_uuid
            ) h), '[]'::json),
            'content', COALESCE((SELECT json_object_agg(sc.section_key, sc.content_value) FROM (
                SELECT section_key, content_value
                FROM section_content WHERE client_id = p_uuid
            ) sc), '{}'::json),
            'next_event', NULL,
            'active_match', NULL,
            'coach_message', NULL,
            'pending_actions', '[]'::json,
            'current_phase', 1,
            'unread_notifications', 0
        ) INTO v_result;

        RETURN v_result;
    END IF;

    -- -------------------------------------------------------
    -- V2 PATH: profile exists, build response from V2 tables
    -- with fallback to V1 tables for legacy data
    -- -------------------------------------------------------

    SELECT json_build_object(
        -- CLIENT object (same keys as V1 for frontend compatibility)
        'client', json_build_object(
            'id', v_profile.id,
            'client_id', SUBSTRING(v_profile.id::text, 1, 6),
            'prenom', v_profile.prenom,
            'nom', COALESCE(v_profile.nom, ''),
            'statut', CASE
                WHEN v_profile.statut_parcours IN ('desactive', 'termine') THEN 'archive'
                ELSE 'actif'
            END,
            'compte_rendu_id', COALESCE(v_profile.metadata->>'compte_rendu_id', ''),
            'plan_action_id', COALESCE(v_profile.metadata->>'plan_action_id', ''),
            'cartographie_id', COALESCE(v_profile.metadata->>'cartographie_id', '')
        ),

        -- VISIBILITY: read from V1 section_visibility if it exists, else defaults
        'visibility', COALESCE(
            (SELECT row_to_json(v) FROM (
                SELECT show_accueil, show_ressources, show_formulaires,
                       show_cartographie, show_compatibilite, show_plan_action,
                       show_rencontres, show_historique
                FROM section_visibility WHERE client_id = p_uuid
            ) v),
            json_build_object(
                'show_accueil', TRUE,
                'show_ressources', TRUE,
                'show_formulaires', TRUE,
                'show_cartographie', TRUE,
                'show_compatibilite', TRUE,
                'show_plan_action', TRUE,
                'show_rencontres', TRUE,
                'show_historique', TRUE
            )
        ),

        -- RETOURS: from V1 retours_hebdomadaires (still used until V2 feedback_forms)
        'retours', COALESCE(
            (SELECT json_agg(r ORDER BY r.semaine_numero) FROM (
                SELECT semaine_numero, date_retour, contenu, statut
                FROM retours_hebdomadaires WHERE client_id = p_uuid
            ) r),
            '[]'::json
        ),

        -- BILANS: from V1 bilans_plan_action (still used until V2 feedback_forms)
        'bilans', COALESCE(
            (SELECT json_agg(b ORDER BY b.mois_numero) FROM (
                SELECT mois_numero, titre, contenu, statut
                FROM bilans_plan_action WHERE client_id = p_uuid
            ) b),
            '[]'::json
        ),

        -- RENCONTRES: from V1 rencontres_historique (still used)
        'rencontres', COALESCE(
            (SELECT json_agg(h ORDER BY h.numero) FROM (
                SELECT numero, date_rencontre, titre, analyse, statut
                FROM rencontres_historique WHERE client_id = p_uuid
            ) h),
            '[]'::json
        ),

        -- CONTENT: from V1 section_content (key-value store, still used)
        'content', COALESCE(
            (SELECT json_object_agg(sc.section_key, sc.content_value) FROM (
                SELECT section_key, content_value
                FROM section_content WHERE client_id = p_uuid
            ) sc),
            '{}'::json
        ),

        -- ============================================================
        -- V2-ONLY FIELDS (used by new dashboard widgets)
        -- ============================================================

        -- NEXT EVENT: closest upcoming event this user is registered for
        'next_event', (
            SELECT row_to_json(ne) FROM (
                SELECT e.titre AS title, e.date_evenement AS date, e.type
                FROM events e
                JOIN event_participants ep ON ep.event_id = e.id
                WHERE ep.user_id = p_uuid
                  AND e.statut IN ('planifie', 'en_cours')
                  AND e.date_evenement > NOW()
                ORDER BY e.date_evenement ASC
                LIMIT 1
            ) ne
        ),

        -- ACTIVE MATCH: current non-terminated match
        'active_match', (
            SELECT row_to_json(am) FROM (
                SELECT
                    CASE WHEN m.user_1_id = p_uuid THEN p2.prenom ELSE p1.prenom END AS name,
                    CASE WHEN m.user_1_id = p_uuid
                        THEN ARRAY(SELECT q.reponse->>'value' FROM questionnaire_responses q
                                   WHERE q.user_id = m.user_2_id AND q.categorie = 'hobbies' LIMIT 3)
                        ELSE ARRAY(SELECT q.reponse->>'value' FROM questionnaire_responses q
                                   WHERE q.user_id = m.user_1_id AND q.categorie = 'hobbies' LIMIT 3)
                    END AS hobbies,
                    m.score_compatibilite AS compatibility,
                    m.statut AS match_status
                FROM matches m
                JOIN profiles p1 ON p1.id = m.user_1_id
                JOIN profiles p2 ON p2.id = m.user_2_id
                WHERE (m.user_1_id = p_uuid OR m.user_2_id = p_uuid)
                  AND m.statut NOT IN ('termine_positif', 'termine_negatif', 'annule')
                ORDER BY m.created_at DESC
                LIMIT 1
            ) am
        ),

        -- COACH MESSAGE: latest published coach document
        'coach_message', (
            SELECT row_to_json(cm) FROM (
                SELECT
                    cd.titre AS message,
                    TO_CHAR(cd.created_at, 'DD/MM/YYYY') AS date
                FROM coach_documents cd
                WHERE cd.destinataire_id = p_uuid
                  AND cd.published_at IS NOT NULL
                ORDER BY cd.created_at DESC
                LIMIT 1
            ) cm
        ),

        -- PENDING ACTIONS: items the user needs to act on
        'pending_actions', COALESCE(
            (SELECT json_agg(pa) FROM (
                -- Unread published documents (max 3)
                SELECT
                    'document' AS type,
                    cd.titre AS text,
                    'document-viewer.html?doc=' || cd.id AS link,
                    'normal' AS priority,
                    'Lire' AS cta
                FROM coach_documents cd
                WHERE cd.destinataire_id = p_uuid
                  AND cd.is_read = FALSE
                  AND cd.published_at IS NOT NULL
                ORDER BY cd.created_at DESC
                LIMIT 3
            ) pa),
            '[]'::json
        ),

        -- CURRENT PHASE: derived from statut_parcours (1-4)
        'current_phase', CASE
            WHEN v_profile.statut_parcours IN (
                'inscription', 'formulaire_en_cours', 'formation',
                'matching_pool', 'phase_1_matching'
            ) THEN 1
            WHEN v_profile.statut_parcours = 'phase_2_decouverte' THEN 2
            WHEN v_profile.statut_parcours = 'phase_3_approfondie' THEN 3
            WHEN v_profile.statut_parcours = 'phase_4_engagement' THEN 4
            ELSE 1
        END,

        -- UNREAD NOTIFICATIONS count
        'unread_notifications', (
            SELECT COUNT(*)::INTEGER
            FROM notifications
            WHERE user_id = p_uuid AND is_read = FALSE
        )
    ) INTO v_result;

    RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_client_dashboard(UUID) IS
    'V2 bridge: returns dashboard JSON in V1-compatible format. '
    'Reads from V2 profiles/events/matches/notifications + V1 legacy tables '
    '(section_visibility, retours, bilans, rencontres, section_content).';


-- ============================================================
-- SECTION C: DATA MIGRATION (V1 clients -> V2 profiles)
-- ============================================================
-- Copies existing clients into auth.users + profiles.
-- Safe to run multiple times (uses ON CONFLICT DO NOTHING).
--
-- IMPORTANT: This uses auth.users insertion which requires
-- the service_role key or must be run in a trusted context
-- (e.g., Supabase SQL Editor or a SECURITY DEFINER function).
--
-- Usage: SELECT * FROM migrate_v1_to_v2();

CREATE OR REPLACE FUNCTION migrate_v1_to_v2()
RETURNS TABLE(
    migrated_count INTEGER,
    skipped_count INTEGER,
    error_count INTEGER
) AS $$
DECLARE
    v_client RECORD;
    v_migrated INTEGER := 0;
    v_skipped INTEGER := 0;
    v_errors INTEGER := 0;
    v_auth_uid UUID;
BEGIN
    FOR v_client IN
        SELECT * FROM clients
        ORDER BY created_at ASC
    LOOP
        BEGIN
            -- Skip if this client already exists in profiles (by id or telephone)
            IF EXISTS(SELECT 1 FROM profiles WHERE id = v_client.id) THEN
                v_skipped := v_skipped + 1;
                CONTINUE;
            END IF;

            IF EXISTS(SELECT 1 FROM profiles WHERE telephone = v_client.telephone) THEN
                v_skipped := v_skipped + 1;
                CONTINUE;
            END IF;

            -- Create auth.users entry if it does not exist
            -- The user will need to re-authenticate via OTP on first mobile login
            IF NOT EXISTS(SELECT 1 FROM auth.users WHERE id = v_client.id) THEN
                INSERT INTO auth.users (
                    id,
                    instance_id,
                    aud,
                    role,
                    email,
                    phone,
                    encrypted_password,
                    email_confirmed_at,
                    phone_confirmed_at,
                    created_at,
                    updated_at,
                    raw_app_meta_data,
                    raw_user_meta_data,
                    is_super_admin,
                    confirmation_token,
                    recovery_token,
                    email_change_token_new
                )
                VALUES (
                    v_client.id,
                    '00000000-0000-0000-0000-000000000000',
                    'authenticated',
                    'authenticated',
                    NULLIF(v_client.email, ''),
                    v_client.telephone,
                    '',  -- no password, will use OTP
                    CASE WHEN v_client.email IS NOT NULL AND v_client.email != ''
                         THEN NOW() ELSE NULL END,
                    NOW(),  -- phone confirmed (they already had access)
                    v_client.created_at,
                    COALESCE(v_client.updated_at, v_client.created_at),
                    jsonb_build_object(
                        'provider', 'phone',
                        'providers', ARRAY['phone'],
                        'migrated_from_v1', TRUE
                    ),
                    jsonb_build_object(
                        'prenom', v_client.prenom,
                        'nom', COALESCE(v_client.nom, '')
                    ),
                    FALSE,
                    '',
                    '',
                    ''
                )
                ON CONFLICT (id) DO NOTHING;
            END IF;

            v_auth_uid := v_client.id;

            -- Insert into profiles with V1 data mapped to V2 fields
            INSERT INTO profiles (
                id,
                prenom,
                nom,
                telephone,
                email,
                date_naissance,
                ville,
                genre,
                role,
                statut_parcours,
                date_inscription,
                metadata,
                created_at,
                updated_at
            )
            VALUES (
                v_auth_uid,
                v_client.prenom,
                NULLIF(v_client.nom, ''),
                v_client.telephone,
                NULLIF(v_client.email, ''),
                '1990-01-01'::DATE,  -- placeholder: V1 did not collect date_naissance
                'Non renseigne',     -- placeholder: V1 did not collect ville
                'homme',             -- placeholder: V1 did not collect genre
                'participant',
                CASE
                    WHEN v_client.statut = 'archive' THEN 'desactive'
                    WHEN v_client.statut = 'pause' THEN 'desactive'
                    ELSE 'inscription'
                END,
                v_client.created_at,
                jsonb_build_object(
                    'access_code', v_client.access_code,
                    'notes_internes', COALESCE(v_client.notes_internes, ''),
                    'compte_rendu_id', COALESCE(v_client.compte_rendu_id, ''),
                    'plan_action_id', COALESCE(v_client.plan_action_id, ''),
                    'cartographie_id', COALESCE(v_client.cartographie_id, ''),
                    'v1_client_id', v_client.client_id,
                    'migrated_at', NOW()::TEXT
                ),
                v_client.created_at,
                COALESCE(v_client.updated_at, v_client.created_at)
            )
            ON CONFLICT (id) DO NOTHING;

            v_migrated := v_migrated + 1;

        EXCEPTION WHEN OTHERS THEN
            -- Log the error but do not fail the entire migration
            RAISE WARNING 'Failed to migrate client % (% %): %',
                v_client.client_id, v_client.prenom,
                COALESCE(v_client.nom, ''), SQLERRM;
            v_errors := v_errors + 1;
        END;
    END LOOP;

    -- Return migration results
    RETURN QUERY SELECT v_migrated, v_skipped, v_errors;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION migrate_v1_to_v2() IS
    'Migrates V1 clients into auth.users + profiles. '
    'Safe to run multiple times (idempotent via ON CONFLICT DO NOTHING). '
    'Returns counts of migrated/skipped/errors. '
    'V1 tables (section_visibility, retours, bilans, rencontres, section_content) '
    'are left untouched — they still work via client_id FK pointing to profiles.id.';


-- ============================================================
-- SECTION D: VERIFY MIGRATION
-- ============================================================
-- Helper function to check migration status.
-- Returns a JSON object with counts from both V1 and V2 tables.
-- Usage: SELECT verify_migration_status();

CREATE OR REPLACE FUNCTION verify_migration_status()
RETURNS JSON AS $$
DECLARE
    v_result JSON;
BEGIN
    SELECT json_build_object(
        'v1_clients_total', (SELECT COUNT(*) FROM clients),
        'v1_clients_active', (SELECT COUNT(*) FROM clients WHERE statut = 'actif'),
        'v2_profiles_total', (SELECT COUNT(*) FROM profiles),
        'v2_profiles_with_access_code', (
            SELECT COUNT(*) FROM profiles
            WHERE metadata->>'access_code' IS NOT NULL
              AND metadata->>'access_code' != ''
        ),
        'auth_users_total', (SELECT COUNT(*) FROM auth.users),
        'unmigrated_clients', (
            SELECT COUNT(*) FROM clients c
            WHERE NOT EXISTS(SELECT 1 FROM profiles p WHERE p.id = c.id)
              AND c.statut = 'actif'
        ),
        'v1_tables_intact', json_build_object(
            'section_visibility', (SELECT COUNT(*) FROM section_visibility),
            'retours_hebdomadaires', (SELECT COUNT(*) FROM retours_hebdomadaires),
            'bilans_plan_action', (SELECT COUNT(*) FROM bilans_plan_action),
            'rencontres_historique', (SELECT COUNT(*) FROM rencontres_historique),
            'section_content', (SELECT COUNT(*) FROM section_content)
        )
    ) INTO v_result;

    RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION verify_migration_status() IS
    'Returns a JSON summary of V1 vs V2 data counts to verify migration completeness.';


-- =====================================================================================
-- MIGRATION BRIDGE — SUMMARY
-- =====================================================================================
--
-- Created:
--   1. clients_v1_view            — VIEW mapping profiles -> old clients format
--   2. verify_client_access()     — RPC rewritten for V2 (with V1 fallback)
--   3. get_client_dashboard()     — RPC rewritten for V2 (with V1 data fallback)
--   4. migrate_v1_to_v2()         — Function to copy clients -> auth.users + profiles
--   5. verify_migration_status()  — Function to check migration completeness
--
-- V1 tables NOT touched:
--   - clients              (still readable, used as fallback by verify_client_access)
--   - section_visibility   (still linked by client_id = profiles.id)
--   - retours_hebdomadaires (still linked by client_id = profiles.id)
--   - bilans_plan_action   (still linked by client_id = profiles.id)
--   - rencontres_historique (still linked by client_id = profiles.id)
--   - section_content      (still linked by client_id = profiles.id)
--
-- Idempotency:
--   - CREATE OR REPLACE VIEW / FUNCTION throughout
--   - ON CONFLICT DO NOTHING in migration function
--   - Safe to run multiple times without side effects
--
-- Usage:
--   1. Apply schema_v2.sql
--   2. Apply this file (migration_bridge.sql)
--   3. Run: SELECT * FROM migrate_v1_to_v2();
--   4. Verify: SELECT verify_migration_status();
--   5. Test web app login — should work identically
-- =====================================================================================
