-- =====================================================================================
--  M2: Fix V1 tables with wide-open USING(true) WITH CHECK(true) policies
--  Tables: clients, section_visibility, retours_hebdomadaires,
--          bilans_plan_action, rencontres_historique, section_content
--
--  SAFETY: Each table block is wrapped in DO/EXCEPTION because V1 tables
--          may not exist on all deployments (V2-only installs).
-- =====================================================================================

-- ── clients ──────────────────────────────────────────────────────────────────
DO $$
BEGIN
    EXECUTE 'DROP POLICY IF EXISTS "admin_all_clients" ON clients';

    EXECUTE 'CREATE POLICY "clients_select_coach_admin"
        ON clients FOR SELECT TO authenticated USING (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "clients_insert_coach_admin"
        ON clients FOR INSERT TO authenticated WITH CHECK (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "clients_update_coach_admin"
        ON clients FOR UPDATE TO authenticated
        USING (is_admin_or_coach()) WITH CHECK (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "clients_delete_admin"
        ON clients FOR DELETE TO authenticated USING (is_admin())';
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table clients does not exist — skipping V1 RLS fix';
END;
$$;


-- ── section_visibility ───────────────────────────────────────────────────────
DO $$
BEGIN
    EXECUTE 'DROP POLICY IF EXISTS "admin_all_section_visibility" ON section_visibility';

    EXECUTE 'CREATE POLICY "section_visibility_select_coach_admin"
        ON section_visibility FOR SELECT TO authenticated USING (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "section_visibility_insert_coach_admin"
        ON section_visibility FOR INSERT TO authenticated WITH CHECK (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "section_visibility_update_coach_admin"
        ON section_visibility FOR UPDATE TO authenticated
        USING (is_admin_or_coach()) WITH CHECK (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "section_visibility_delete_admin"
        ON section_visibility FOR DELETE TO authenticated USING (is_admin())';
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table section_visibility does not exist — skipping V1 RLS fix';
END;
$$;


-- ── retours_hebdomadaires ────────────────────────────────────────────────────
DO $$
BEGIN
    EXECUTE 'DROP POLICY IF EXISTS "admin_all_retours_hebdomadaires" ON retours_hebdomadaires';

    EXECUTE 'CREATE POLICY "retours_select_coach_admin"
        ON retours_hebdomadaires FOR SELECT TO authenticated USING (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "retours_insert_coach_admin"
        ON retours_hebdomadaires FOR INSERT TO authenticated WITH CHECK (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "retours_update_coach_admin"
        ON retours_hebdomadaires FOR UPDATE TO authenticated
        USING (is_admin_or_coach()) WITH CHECK (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "retours_delete_admin"
        ON retours_hebdomadaires FOR DELETE TO authenticated USING (is_admin())';
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table retours_hebdomadaires does not exist — skipping V1 RLS fix';
END;
$$;


-- ── bilans_plan_action ───────────────────────────────────────────────────────
DO $$
BEGIN
    EXECUTE 'DROP POLICY IF EXISTS "admin_all_bilans_plan_action" ON bilans_plan_action';

    EXECUTE 'CREATE POLICY "bilans_select_coach_admin"
        ON bilans_plan_action FOR SELECT TO authenticated USING (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "bilans_insert_coach_admin"
        ON bilans_plan_action FOR INSERT TO authenticated WITH CHECK (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "bilans_update_coach_admin"
        ON bilans_plan_action FOR UPDATE TO authenticated
        USING (is_admin_or_coach()) WITH CHECK (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "bilans_delete_admin"
        ON bilans_plan_action FOR DELETE TO authenticated USING (is_admin())';
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table bilans_plan_action does not exist — skipping V1 RLS fix';
END;
$$;


-- ── rencontres_historique ────────────────────────────────────────────────────
DO $$
BEGIN
    EXECUTE 'DROP POLICY IF EXISTS "admin_all_rencontres_historique" ON rencontres_historique';

    EXECUTE 'CREATE POLICY "rencontres_select_coach_admin"
        ON rencontres_historique FOR SELECT TO authenticated USING (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "rencontres_insert_coach_admin"
        ON rencontres_historique FOR INSERT TO authenticated WITH CHECK (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "rencontres_update_coach_admin"
        ON rencontres_historique FOR UPDATE TO authenticated
        USING (is_admin_or_coach()) WITH CHECK (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "rencontres_delete_admin"
        ON rencontres_historique FOR DELETE TO authenticated USING (is_admin())';
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table rencontres_historique does not exist — skipping V1 RLS fix';
END;
$$;


-- ── section_content ──────────────────────────────────────────────────────────
DO $$
BEGIN
    EXECUTE 'DROP POLICY IF EXISTS "admin_all_section_content" ON section_content';

    EXECUTE 'CREATE POLICY "section_content_select_coach_admin"
        ON section_content FOR SELECT TO authenticated USING (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "section_content_insert_coach_admin"
        ON section_content FOR INSERT TO authenticated WITH CHECK (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "section_content_update_coach_admin"
        ON section_content FOR UPDATE TO authenticated
        USING (is_admin_or_coach()) WITH CHECK (is_admin_or_coach())';

    EXECUTE 'CREATE POLICY "section_content_delete_admin"
        ON section_content FOR DELETE TO authenticated USING (is_admin())';
EXCEPTION WHEN undefined_table THEN
    RAISE NOTICE 'Table section_content does not exist — skipping (M5 will create it)';
END;
$$;
