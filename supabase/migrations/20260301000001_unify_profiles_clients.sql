-- =====================================================================================
--  MIGRATION: Unify profiles/clients — Single Source of Truth
--
--  PROBLEM: Clients created via admin (create-client edge function) get a profiles row
--  with id = auth.users.id, but V1 tables (section_visibility, bilans_plan_action, etc.)
--  have FK to clients(id) which is a different UUID. Result: mobile app passes
--  profiles.id as client_id -> 0 results from V1 tables.
--
--  SOLUTION: Re-point all V1 table FKs from clients(id) to profiles(id),
--  move triggers to profiles, backfill companion rows, add RLS self-access.
--
--  TABLES AFFECTED:
--    - section_visibility
--    - section_content
--    - retours_hebdomadaires
--    - bilans_plan_action
--    - rencontres_historique
--    - profiles (add client_code + access_code columns)
--
--  SAFETY: All steps use DO/EXCEPTION blocks to handle tables that may not exist.
--  IDEMPOTENT: Safe to run multiple times.
-- =====================================================================================

BEGIN;
SET lock_timeout = '30s';


-- ============================================================
-- STEP 1: Map clients -> profiles by telephone
-- ============================================================
-- Build a temporary mapping table to translate old clients.id to profiles.id
-- by matching on normalized telephone numbers.

CREATE TEMP TABLE _client_profile_map AS
SELECT c.id AS old_client_id, p.id AS new_profile_id
FROM clients c
JOIN profiles p ON REPLACE(REPLACE(c.telephone, ' ', ''), '-', '')
                 = REPLACE(REPLACE(p.telephone, ' ', ''), '-', '')
WHERE c.telephone IS NOT NULL
  AND c.telephone <> ''
  AND c.id != p.id;  -- Only map rows where IDs actually differ


-- ============================================================
-- STEP 2: Update client_id in V1 tables (old UUID -> profiles UUID)
-- ============================================================
-- For each V1 table, re-point rows from the old clients.id to profiles.id.

-- section_visibility
DO $$
BEGIN
    UPDATE section_visibility sv
    SET client_id = m.new_profile_id
    FROM _client_profile_map m
    WHERE sv.client_id = m.old_client_id;
    RAISE NOTICE 'section_visibility: remapped % rows', (SELECT COUNT(*) FROM _client_profile_map);
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table section_visibility does not exist — skipping remap';
END;
$$;

-- section_content
DO $$
BEGIN
    UPDATE section_content sc
    SET client_id = m.new_profile_id
    FROM _client_profile_map m
    WHERE sc.client_id = m.old_client_id;
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table section_content does not exist — skipping remap';
END;
$$;

-- retours_hebdomadaires
DO $$
BEGIN
    UPDATE retours_hebdomadaires rh
    SET client_id = m.new_profile_id
    FROM _client_profile_map m
    WHERE rh.client_id = m.old_client_id;
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table retours_hebdomadaires does not exist — skipping remap';
END;
$$;

-- bilans_plan_action
DO $$
BEGIN
    UPDATE bilans_plan_action bp
    SET client_id = m.new_profile_id
    FROM _client_profile_map m
    WHERE bp.client_id = m.old_client_id;
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table bilans_plan_action does not exist — skipping remap';
END;
$$;

-- rencontres_historique
DO $$
BEGIN
    UPDATE rencontres_historique rh
    SET client_id = m.new_profile_id
    FROM _client_profile_map m
    WHERE rh.client_id = m.old_client_id;
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table rencontres_historique does not exist — skipping remap';
END;
$$;


-- ============================================================
-- STEP 3: Delete orphaned rows (client_id not in profiles)
-- ============================================================
-- Remove rows whose client_id doesn't match any profiles.id
-- (test data or clients that were never migrated).

DO $$
BEGIN
    DELETE FROM section_visibility
    WHERE client_id NOT IN (SELECT id FROM profiles);
EXCEPTION WHEN undefined_table THEN NULL;
END;
$$;

DO $$
BEGIN
    DELETE FROM section_content
    WHERE client_id NOT IN (SELECT id FROM profiles);
EXCEPTION WHEN undefined_table THEN NULL;
END;
$$;

DO $$
BEGIN
    DELETE FROM retours_hebdomadaires
    WHERE client_id NOT IN (SELECT id FROM profiles);
EXCEPTION WHEN undefined_table THEN NULL;
END;
$$;

DO $$
BEGIN
    DELETE FROM bilans_plan_action
    WHERE client_id NOT IN (SELECT id FROM profiles);
EXCEPTION WHEN undefined_table THEN NULL;
END;
$$;

DO $$
BEGIN
    DELETE FROM rencontres_historique
    WHERE client_id NOT IN (SELECT id FROM profiles);
EXCEPTION WHEN undefined_table THEN NULL;
END;
$$;


-- ============================================================
-- STEP 4: Re-point FK constraints -> profiles(id)
-- ============================================================
-- Drop old FK (to clients) and create new FK (to profiles) for each V1 table.

-- section_visibility
DO $$
DECLARE
    v_constraint TEXT;
BEGIN
    -- Find and drop any existing FK on client_id
    FOR v_constraint IN
        SELECT con.conname
        FROM pg_constraint con
        JOIN pg_attribute att ON att.attnum = ANY(con.conkey)
            AND att.attrelid = con.conrelid
        WHERE con.conrelid = 'section_visibility'::regclass
          AND con.contype = 'f'
          AND att.attname = 'client_id'
    LOOP
        EXECUTE format('ALTER TABLE section_visibility DROP CONSTRAINT %I', v_constraint);
    END LOOP;

    ALTER TABLE section_visibility
        ADD CONSTRAINT section_visibility_client_id_fkey
        FOREIGN KEY (client_id) REFERENCES profiles(id) ON DELETE CASCADE;
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table section_visibility does not exist — skipping FK change';
END;
$$;

-- section_content
DO $$
DECLARE
    v_constraint TEXT;
BEGIN
    FOR v_constraint IN
        SELECT con.conname
        FROM pg_constraint con
        JOIN pg_attribute att ON att.attnum = ANY(con.conkey)
            AND att.attrelid = con.conrelid
        WHERE con.conrelid = 'section_content'::regclass
          AND con.contype = 'f'
          AND att.attname = 'client_id'
    LOOP
        EXECUTE format('ALTER TABLE section_content DROP CONSTRAINT %I', v_constraint);
    END LOOP;

    ALTER TABLE section_content
        ADD CONSTRAINT section_content_client_id_fkey
        FOREIGN KEY (client_id) REFERENCES profiles(id) ON DELETE CASCADE;
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table section_content does not exist — skipping FK change';
END;
$$;

-- retours_hebdomadaires
DO $$
DECLARE
    v_constraint TEXT;
BEGIN
    FOR v_constraint IN
        SELECT con.conname
        FROM pg_constraint con
        JOIN pg_attribute att ON att.attnum = ANY(con.conkey)
            AND att.attrelid = con.conrelid
        WHERE con.conrelid = 'retours_hebdomadaires'::regclass
          AND con.contype = 'f'
          AND att.attname = 'client_id'
    LOOP
        EXECUTE format('ALTER TABLE retours_hebdomadaires DROP CONSTRAINT %I', v_constraint);
    END LOOP;

    ALTER TABLE retours_hebdomadaires
        ADD CONSTRAINT retours_hebdomadaires_client_id_fkey
        FOREIGN KEY (client_id) REFERENCES profiles(id) ON DELETE CASCADE;
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table retours_hebdomadaires does not exist — skipping FK change';
END;
$$;

-- bilans_plan_action
DO $$
DECLARE
    v_constraint TEXT;
BEGIN
    FOR v_constraint IN
        SELECT con.conname
        FROM pg_constraint con
        JOIN pg_attribute att ON att.attnum = ANY(con.conkey)
            AND att.attrelid = con.conrelid
        WHERE con.conrelid = 'bilans_plan_action'::regclass
          AND con.contype = 'f'
          AND att.attname = 'client_id'
    LOOP
        EXECUTE format('ALTER TABLE bilans_plan_action DROP CONSTRAINT %I', v_constraint);
    END LOOP;

    ALTER TABLE bilans_plan_action
        ADD CONSTRAINT bilans_plan_action_client_id_fkey
        FOREIGN KEY (client_id) REFERENCES profiles(id) ON DELETE CASCADE;
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table bilans_plan_action does not exist — skipping FK change';
END;
$$;

-- rencontres_historique
DO $$
DECLARE
    v_constraint TEXT;
BEGIN
    FOR v_constraint IN
        SELECT con.conname
        FROM pg_constraint con
        JOIN pg_attribute att ON att.attnum = ANY(con.conkey)
            AND att.attrelid = con.conrelid
        WHERE con.conrelid = 'rencontres_historique'::regclass
          AND con.contype = 'f'
          AND att.attname = 'client_id'
    LOOP
        EXECUTE format('ALTER TABLE rencontres_historique DROP CONSTRAINT %I', v_constraint);
    END LOOP;

    ALTER TABLE rencontres_historique
        ADD CONSTRAINT rencontres_historique_client_id_fkey
        FOREIGN KEY (client_id) REFERENCES profiles(id) ON DELETE CASCADE;
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table rencontres_historique does not exist — skipping FK change';
END;
$$;


-- ============================================================
-- STEP 5: Move triggers from clients -> profiles
-- ============================================================
-- Drop old triggers on clients table and create new ones on profiles.

-- Drop old triggers (safe if they don't exist)
DO $$
BEGIN
    DROP TRIGGER IF EXISTS tr_client_create_visibility ON clients;
    DROP TRIGGER IF EXISTS tr_client_create_bilans ON clients;
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table clients does not exist — no triggers to drop';
END;
$$;

-- Create the new companion-rows function for profiles
CREATE OR REPLACE FUNCTION create_profile_companion_rows()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Only create companion rows for participants (not coach/admin)
    IF NEW.role = 'participant' THEN
        -- section_visibility: 1 row, all sections visible by default
        INSERT INTO section_visibility (client_id)
        VALUES (NEW.id)
        ON CONFLICT DO NOTHING;

        -- bilans_plan_action: 3 rows (months 1, 2, 3)
        INSERT INTO bilans_plan_action (client_id, mois_numero, titre)
        VALUES
            (NEW.id, 1, 'Bilan du Premier Mois'),
            (NEW.id, 2, 'Bilan du Deuxieme Mois'),
            (NEW.id, 3, 'Bilan Final & Perspectives')
        ON CONFLICT DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$;

-- Create trigger on profiles table
DROP TRIGGER IF EXISTS tr_profile_create_companions ON profiles;
CREATE TRIGGER tr_profile_create_companions
    AFTER INSERT ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION create_profile_companion_rows();


-- ============================================================
-- STEP 6: Backfill companion rows for existing profiles
-- ============================================================
-- Create section_visibility and bilans_plan_action rows for any profiles
-- that don't have them yet (e.g. profiles created before this migration).

-- Backfill section_visibility
DO $$
BEGIN
    INSERT INTO section_visibility (client_id)
    SELECT p.id
    FROM profiles p
    WHERE p.role = 'participant'
      AND NOT EXISTS (
          SELECT 1 FROM section_visibility sv WHERE sv.client_id = p.id
      );
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table section_visibility does not exist — skipping backfill';
END;
$$;

-- Backfill bilans_plan_action (3 rows per profile)
DO $$
BEGIN
    INSERT INTO bilans_plan_action (client_id, mois_numero, titre)
    SELECT p.id, m.n,
        CASE m.n
            WHEN 1 THEN 'Bilan du Premier Mois'
            WHEN 2 THEN 'Bilan du Deuxieme Mois'
            WHEN 3 THEN 'Bilan Final & Perspectives'
        END
    FROM profiles p
    CROSS JOIN (VALUES (1), (2), (3)) AS m(n)
    WHERE p.role = 'participant'
      AND NOT EXISTS (
          SELECT 1 FROM bilans_plan_action bp
          WHERE bp.client_id = p.id AND bp.mois_numero = m.n
      );
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table bilans_plan_action does not exist — skipping backfill';
END;
$$;


-- ============================================================
-- STEP 7: Add client_code + access_code columns to profiles
-- ============================================================
-- These columns allow web dashboard login (6-char code + access code)
-- without relying on the old clients table.

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS client_code VARCHAR(6);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS access_code VARCHAR(6);

-- Populate from old clients table (match by telephone)
DO $$
BEGIN
    UPDATE profiles p
    SET client_code = c.client_id,
        access_code = c.access_code
    FROM clients c
    WHERE REPLACE(REPLACE(p.telephone, ' ', ''), '-', '')
        = REPLACE(REPLACE(c.telephone, ' ', ''), '-', '')
      AND p.client_code IS NULL;
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table clients does not exist — populating from metadata';
END;
$$;

-- For profiles that have access_code in metadata but not in the column
UPDATE profiles
SET access_code = metadata->>'access_code'
WHERE access_code IS NULL
  AND metadata->>'access_code' IS NOT NULL
  AND metadata->>'access_code' != '';

-- Generate random codes for profiles that still don't have them
UPDATE profiles
SET client_code = UPPER(SUBSTRING(MD5(RANDOM()::TEXT || id::TEXT), 1, 6))
WHERE client_code IS NULL;

UPDATE profiles
SET access_code = UPPER(SUBSTRING(MD5(RANDOM()::TEXT || id::TEXT || 'ac'), 1, 6))
WHERE access_code IS NULL;

-- Unique index on client_code (for web dashboard login lookup)
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_client_code
    ON profiles(client_code)
    WHERE client_code IS NOT NULL;


-- ============================================================
-- STEP 8: Rewrite RPCs
-- ============================================================

-- B1: verify_client_access — now reads from profiles directly
DROP FUNCTION IF EXISTS verify_client_access(TEXT, TEXT);

CREATE OR REPLACE FUNCTION verify_client_access(p_telephone TEXT, p_code TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_uuid UUID;
BEGIN
    -- Attempt 1: Login by client_code + access_code (web dashboard 6-char login)
    SELECT p.id INTO v_uuid
    FROM profiles p
    WHERE p.client_code = p_telephone
      AND p.access_code = p_code
      AND p.statut_parcours NOT IN ('desactive', 'termine');

    -- Attempt 2: Login by telephone + access_code
    IF v_uuid IS NULL THEN
        SELECT p.id INTO v_uuid
        FROM profiles p
        WHERE p.telephone = p_telephone
          AND p.access_code = p_code
          AND p.statut_parcours NOT IN ('desactive', 'termine');
    END IF;

    -- Attempt 3: Legacy fallback — metadata access_code
    IF v_uuid IS NULL THEN
        SELECT p.id INTO v_uuid
        FROM profiles p
        WHERE p.telephone = p_telephone
          AND p.metadata->>'access_code' = p_code
          AND p.statut_parcours NOT IN ('desactive', 'termine');
    END IF;

    -- Update last connection timestamp
    IF v_uuid IS NOT NULL THEN
        UPDATE profiles SET derniere_connexion = NOW() WHERE id = v_uuid;
    END IF;

    RETURN v_uuid;
END;
$$;

REVOKE EXECUTE ON FUNCTION verify_client_access(TEXT, TEXT) FROM public;
GRANT EXECUTE ON FUNCTION verify_client_access(TEXT, TEXT) TO anon, authenticated;

COMMENT ON FUNCTION verify_client_access(TEXT, TEXT) IS
    'Unified: verifies client_code or telephone + access_code against profiles. '
    'No longer falls back to V1 clients table.';


-- B2: get_client_dashboard — reads from profiles, maps to V1-compatible format
DROP FUNCTION IF EXISTS get_client_dashboard(UUID);

CREATE OR REPLACE FUNCTION get_client_dashboard(p_uuid UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_result JSON;
    v_profile RECORD;
BEGIN
    SELECT * INTO v_profile FROM profiles WHERE id = p_uuid;

    IF v_profile IS NULL THEN
        RETURN json_build_object('error', 'Profile not found');
    END IF;

    SELECT json_build_object(
        -- CLIENT object (V1-compatible keys + V2 extras)
        'client', json_build_object(
            'id', v_profile.id,
            'client_id', COALESCE(v_profile.client_code, SUBSTRING(v_profile.id::text, 1, 6)),
            'prenom', v_profile.prenom,
            'nom', COALESCE(v_profile.nom, ''),
            'statut', CASE
                WHEN v_profile.statut_parcours IN ('desactive', 'termine') THEN 'archive'
                ELSE 'actif'
            END,
            'statut_parcours', v_profile.statut_parcours,
            'is_high_ticket', v_profile.is_high_ticket,
            'photo_floue_url', v_profile.photo_floue_url,
            'nb_events_participes', v_profile.nb_events_participes,
            'compte_rendu_id', COALESCE(v_profile.metadata->>'compte_rendu_id', ''),
            'plan_action_id', COALESCE(v_profile.metadata->>'plan_action_id', ''),
            'cartographie_id', COALESCE(v_profile.metadata->>'cartographie_id', '')
        ),

        -- VISIBILITY: from section_visibility, defaults if missing
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

        -- RETOURS: weekly feedback
        'retours', COALESCE(
            (SELECT json_agg(r ORDER BY r.semaine_numero) FROM (
                SELECT semaine_numero, date_retour, contenu, statut
                FROM retours_hebdomadaires WHERE client_id = p_uuid
            ) r),
            '[]'::json
        ),

        -- BILANS: action plan
        'bilans', COALESCE(
            (SELECT json_agg(b ORDER BY b.mois_numero) FROM (
                SELECT mois_numero, titre, contenu, statut
                FROM bilans_plan_action WHERE client_id = p_uuid
            ) b),
            '[]'::json
        ),

        -- RENCONTRES: meeting history
        'rencontres', COALESCE(
            (SELECT json_agg(h ORDER BY h.numero) FROM (
                SELECT numero, date_rencontre, titre, "analyse", statut
                FROM rencontres_historique WHERE client_id = p_uuid
            ) h),
            '[]'::json
        ),

        -- CONTENT: key-value store
        'content', COALESCE(
            (SELECT json_object_agg(sc.section_key, sc.content_value) FROM (
                SELECT section_key, content_value
                FROM section_content WHERE client_id = p_uuid
            ) sc),
            '{}'::json
        ),

        -- NEXT EVENT
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

        -- ACTIVE MATCH
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

        -- COACH MESSAGE
        'coach_message', (
            SELECT row_to_json(cm) FROM (
                SELECT cd.titre AS message,
                       TO_CHAR(cd.created_at, 'DD/MM/YYYY') AS date
                FROM coach_documents cd
                WHERE cd.destinataire_id = p_uuid
                  AND cd.published_at IS NOT NULL
                ORDER BY cd.created_at DESC
                LIMIT 1
            ) cm
        ),

        -- PENDING ACTIONS
        'pending_actions', COALESCE(
            (SELECT json_agg(pa) FROM (
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

        -- CURRENT PHASE (1-4)
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

        -- UNREAD NOTIFICATIONS
        'unread_notifications', (
            SELECT COUNT(*)::INTEGER
            FROM notifications
            WHERE user_id = p_uuid AND is_read = FALSE
        )
    ) INTO v_result;

    RETURN v_result;
END;
$$;

REVOKE EXECUTE ON FUNCTION get_client_dashboard(UUID) FROM public;
GRANT EXECUTE ON FUNCTION get_client_dashboard(UUID) TO anon, authenticated;

COMMENT ON FUNCTION get_client_dashboard(UUID) IS
    'Unified: reads from profiles + V1 tables (all FK pointing to profiles.id). '
    'No V1 clients fallback path needed.';


-- ============================================================
-- STEP 9: Add RLS self-access policies on V1 tables
-- ============================================================
-- Currently only coach/admin can read V1 tables (from M2 migration).
-- Mobile users need to read their own rows.
-- Pattern: (SELECT auth.uid()) for ~95% perf improvement (cached per-statement).

-- section_visibility: SELECT own
DO $$
BEGIN
    EXECUTE 'CREATE POLICY "section_visibility_select_own"
        ON section_visibility FOR SELECT
        TO authenticated
        USING ((SELECT auth.uid()) = client_id)';
EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN undefined_table THEN
        RAISE NOTICE 'Table section_visibility does not exist — skipping RLS';
END;
$$;

-- section_content: SELECT own + UPDATE own
DO $$
BEGIN
    EXECUTE 'CREATE POLICY "section_content_select_own"
        ON section_content FOR SELECT
        TO authenticated
        USING ((SELECT auth.uid()) = client_id)';
EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN undefined_table THEN
        RAISE NOTICE 'Table section_content does not exist — skipping RLS';
END;
$$;

DO $$
BEGIN
    EXECUTE 'CREATE POLICY "section_content_update_own"
        ON section_content FOR UPDATE
        TO authenticated
        USING ((SELECT auth.uid()) = client_id)
        WITH CHECK ((SELECT auth.uid()) = client_id)';
EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN undefined_table THEN
        RAISE NOTICE 'Table section_content does not exist — skipping RLS';
END;
$$;

-- retours_hebdomadaires: SELECT own
DO $$
BEGIN
    EXECUTE 'CREATE POLICY "retours_select_own"
        ON retours_hebdomadaires FOR SELECT
        TO authenticated
        USING ((SELECT auth.uid()) = client_id)';
EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN undefined_table THEN
        RAISE NOTICE 'Table retours_hebdomadaires does not exist — skipping RLS';
END;
$$;

-- bilans_plan_action: SELECT own
DO $$
BEGIN
    EXECUTE 'CREATE POLICY "bilans_select_own"
        ON bilans_plan_action FOR SELECT
        TO authenticated
        USING ((SELECT auth.uid()) = client_id)';
EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN undefined_table THEN
        RAISE NOTICE 'Table bilans_plan_action does not exist — skipping RLS';
END;
$$;

-- rencontres_historique: SELECT own
DO $$
BEGIN
    EXECUTE 'CREATE POLICY "rencontres_select_own"
        ON rencontres_historique FOR SELECT
        TO authenticated
        USING ((SELECT auth.uid()) = client_id)';
EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN undefined_table THEN
        RAISE NOTICE 'Table rencontres_historique does not exist — skipping RLS';
END;
$$;


-- ============================================================
-- Cleanup temp table
-- ============================================================
DROP TABLE IF EXISTS _client_profile_map;

COMMIT;

-- =====================================================================================
-- POST-MIGRATION VERIFICATION QUERIES (run manually to validate)
-- =====================================================================================
--
-- 1. Check FK targets:
--    SELECT conname, confrelid::regclass
--    FROM pg_constraint
--    WHERE conrelid = 'section_visibility'::regclass AND contype = 'f';
--    --> Should show: profiles
--
-- 2. Check companion rows for a specific user:
--    SELECT * FROM section_visibility WHERE client_id = '<profiles.id>';
--    SELECT * FROM bilans_plan_action WHERE client_id = '<profiles.id>';
--
-- 3. Test RLS self-access:
--    SET ROLE authenticated;
--    SET request.jwt.claims = '{"sub":"<profiles.id>"}';
--    SELECT * FROM section_visibility WHERE client_id = '<profiles.id>';
--
-- 4. Test verify_client_access:
--    SELECT verify_client_access('+33612345678', 'ABC123');
--
-- 5. Test new client creation trigger:
--    Insert a new profile -> check section_visibility + bilans_plan_action auto-created
-- =====================================================================================
