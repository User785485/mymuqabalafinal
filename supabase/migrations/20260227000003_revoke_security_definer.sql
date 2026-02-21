-- =====================================================================================
--  M3: REVOKE EXECUTE FROM public/anon on all SECURITY DEFINER functions
--  Then GRANT back to appropriate roles.
--
--  Exceptions:
--    - verify_client_access & get_client_dashboard: keep anon access
--      (client dashboard calls these with anon key)
-- =====================================================================================

-- ── Helper functions (used by RLS policies) ──────────────────────────────────
REVOKE EXECUTE ON FUNCTION is_admin_or_coach() FROM public, anon;
GRANT EXECUTE ON FUNCTION is_admin_or_coach() TO authenticated;

REVOKE EXECUTE ON FUNCTION is_admin() FROM public, anon;
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

-- ── Attachment scoring functions ─────────────────────────────────────────────
REVOKE EXECUTE ON FUNCTION get_attachment_scores(UUID) FROM public, anon;
GRANT EXECUTE ON FUNCTION get_attachment_scores(UUID) TO authenticated;

REVOKE EXECUTE ON FUNCTION compute_compatibility_score(TEXT, TEXT, NUMERIC, NUMERIC, NUMERIC, NUMERIC) FROM public, anon;
GRANT EXECUTE ON FUNCTION compute_compatibility_score(TEXT, TEXT, NUMERIC, NUMERIC, NUMERIC, NUMERIC) TO authenticated;

-- ── Matching algorithm (2 signatures) ────────────────────────────────────────
-- 1-arg version from 20260220 may not exist on all deployments
DO $$
BEGIN
    EXECUTE 'REVOKE EXECUTE ON FUNCTION run_matching_algorithm(UUID) FROM public, anon';
    EXECUTE 'GRANT EXECUTE ON FUNCTION run_matching_algorithm(UUID) TO authenticated';
EXCEPTION WHEN undefined_function THEN
    RAISE NOTICE 'run_matching_algorithm(UUID) does not exist — skipping';
END;
$$;

DO $$
BEGIN
    EXECUTE 'REVOKE EXECUTE ON FUNCTION run_matching_algorithm(UUID, BOOLEAN) FROM public, anon';
    EXECUTE 'GRANT EXECUTE ON FUNCTION run_matching_algorithm(UUID, BOOLEAN) TO authenticated';
EXCEPTION WHEN undefined_function THEN
    RAISE NOTICE 'run_matching_algorithm(UUID, BOOLEAN) does not exist — skipping';
END;
$$;

-- ── User profile function ────────────────────────────────────────────────────
REVOKE EXECUTE ON FUNCTION get_user_attachment_profile(UUID) FROM public, anon;
GRANT EXECUTE ON FUNCTION get_user_attachment_profile(UUID) TO authenticated;

-- ── Matching workflow functions ──────────────────────────────────────────────
REVOKE EXECUTE ON FUNCTION register_pre_matching_participants(UUID) FROM public, anon;
GRANT EXECUTE ON FUNCTION register_pre_matching_participants(UUID) TO authenticated;

REVOKE EXECUTE ON FUNCTION confirm_event_participation(UUID) FROM public, anon;
GRANT EXECUTE ON FUNCTION confirm_event_participation(UUID) TO authenticated;

REVOKE EXECUTE ON FUNCTION decline_event_participation(UUID) FROM public, anon;
GRANT EXECUTE ON FUNCTION decline_event_participation(UUID) TO authenticated;

REVOKE EXECUTE ON FUNCTION get_event_confirmation_status(UUID) FROM public, anon;
GRANT EXECUTE ON FUNCTION get_event_confirmation_status(UUID) TO authenticated;

-- ── Migration functions ──────────────────────────────────────────────────────
-- These may not exist on all deployments, so use DO block with exception handling
DO $$
BEGIN
    EXECUTE 'REVOKE EXECUTE ON FUNCTION migrate_v1_to_v2() FROM public, anon';
    EXECUTE 'GRANT EXECUTE ON FUNCTION migrate_v1_to_v2() TO authenticated';
EXCEPTION WHEN undefined_function THEN NULL;
END;
$$;

DO $$
BEGIN
    EXECUTE 'REVOKE EXECUTE ON FUNCTION verify_migration_status() FROM public, anon';
    EXECUTE 'GRANT EXECUTE ON FUNCTION verify_migration_status() TO authenticated';
EXCEPTION WHEN undefined_function THEN NULL;
END;
$$;

-- ── Client-facing functions: KEEP anon access ────────────────────────────────
-- verify_client_access and get_client_dashboard are called by the client
-- dashboard using the anon key, so they MUST remain accessible to anon.
-- We still revoke from public and grant explicitly:
DO $$
BEGIN
    EXECUTE 'REVOKE EXECUTE ON FUNCTION verify_client_access(TEXT, TEXT) FROM public';
    EXECUTE 'GRANT EXECUTE ON FUNCTION verify_client_access(TEXT, TEXT) TO anon, authenticated';
EXCEPTION WHEN undefined_function THEN NULL;
END;
$$;

DO $$
BEGIN
    EXECUTE 'REVOKE EXECUTE ON FUNCTION get_client_dashboard(UUID) FROM public';
    EXECUTE 'GRANT EXECUTE ON FUNCTION get_client_dashboard(UUID) TO anon, authenticated';
EXCEPTION WHEN undefined_function THEN NULL;
END;
$$;
