-- =====================================================================================
--  M1: Fix RLS recursion on remaining tables not covered by 20260225
--  Creates is_admin() helper and replaces recursive policies on 9+ tables
-- =====================================================================================

-- 1. Create is_admin() helper (admin-only, no coach)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    );
$$;

-- =====================================================================================
-- 2. INVITATIONS — replace recursive policies with is_admin_or_coach()
-- =====================================================================================

DROP POLICY IF EXISTS "invitations_select_coach_admin" ON invitations;
CREATE POLICY "invitations_select_coach_admin"
    ON invitations FOR SELECT
    TO authenticated
    USING (is_admin_or_coach());

DROP POLICY IF EXISTS "invitations_insert_coach_admin" ON invitations;
CREATE POLICY "invitations_insert_coach_admin"
    ON invitations FOR INSERT
    TO authenticated
    WITH CHECK (is_admin_or_coach());

DROP POLICY IF EXISTS "invitations_update_coach_admin" ON invitations;
CREATE POLICY "invitations_update_coach_admin"
    ON invitations FOR UPDATE
    TO authenticated
    USING (is_admin_or_coach())
    WITH CHECK (is_admin_or_coach());

DROP POLICY IF EXISTS "invitations_delete_coach_admin" ON invitations;
CREATE POLICY "invitations_delete_coach_admin"
    ON invitations FOR DELETE
    TO authenticated
    USING (is_admin_or_coach());

-- =====================================================================================
-- 3. EVENTS — replace recursive policies
-- =====================================================================================

DROP POLICY IF EXISTS "events_insert_coach_admin" ON events;
CREATE POLICY "events_insert_coach_admin"
    ON events FOR INSERT
    TO authenticated
    WITH CHECK (is_admin_or_coach());

DROP POLICY IF EXISTS "events_update_coach_admin" ON events;
CREATE POLICY "events_update_coach_admin"
    ON events FOR UPDATE
    TO authenticated
    USING (is_admin_or_coach())
    WITH CHECK (is_admin_or_coach());

DROP POLICY IF EXISTS "events_delete_coach_admin" ON events;
CREATE POLICY "events_delete_coach_admin"
    ON events FOR DELETE
    TO authenticated
    USING (is_admin_or_coach());

-- =====================================================================================
-- 4. EVENT_PARTICIPANTS — replace recursive policies
-- =====================================================================================

DROP POLICY IF EXISTS "event_participants_select_coach_admin" ON event_participants;
CREATE POLICY "event_participants_select_coach_admin"
    ON event_participants FOR SELECT
    TO authenticated
    USING (is_admin_or_coach());

DROP POLICY IF EXISTS "event_participants_insert_coach_admin" ON event_participants;
CREATE POLICY "event_participants_insert_coach_admin"
    ON event_participants FOR INSERT
    TO authenticated
    WITH CHECK (is_admin_or_coach());

DROP POLICY IF EXISTS "event_participants_update_coach_admin" ON event_participants;
CREATE POLICY "event_participants_update_coach_admin"
    ON event_participants FOR UPDATE
    TO authenticated
    USING (is_admin_or_coach())
    WITH CHECK (is_admin_or_coach());

DROP POLICY IF EXISTS "event_participants_delete_coach_admin" ON event_participants;
CREATE POLICY "event_participants_delete_coach_admin"
    ON event_participants FOR DELETE
    TO authenticated
    USING (is_admin_or_coach());

-- =====================================================================================
-- 5. BLINK_DATES — replace recursive policies
-- =====================================================================================

DROP POLICY IF EXISTS "blink_dates_select_coach_admin" ON blink_dates;
CREATE POLICY "blink_dates_select_coach_admin"
    ON blink_dates FOR SELECT
    TO authenticated
    USING (is_admin_or_coach());

DROP POLICY IF EXISTS "blink_dates_insert_coach_admin" ON blink_dates;
CREATE POLICY "blink_dates_insert_coach_admin"
    ON blink_dates FOR INSERT
    TO authenticated
    WITH CHECK (is_admin_or_coach());

DROP POLICY IF EXISTS "blink_dates_update_coach_admin" ON blink_dates;
CREATE POLICY "blink_dates_update_coach_admin"
    ON blink_dates FOR UPDATE
    TO authenticated
    USING (is_admin_or_coach())
    WITH CHECK (is_admin_or_coach());

DROP POLICY IF EXISTS "blink_dates_delete_coach_admin" ON blink_dates;
CREATE POLICY "blink_dates_delete_coach_admin"
    ON blink_dates FOR DELETE
    TO authenticated
    USING (is_admin_or_coach());

-- =====================================================================================
-- 6. FEEDBACK_FORMS — replace recursive policies
-- =====================================================================================

DROP POLICY IF EXISTS "feedback_forms_select_coach_admin" ON feedback_forms;
CREATE POLICY "feedback_forms_select_coach_admin"
    ON feedback_forms FOR SELECT
    TO authenticated
    USING (is_admin_or_coach());

-- =====================================================================================
-- 7. COACH_DOCUMENTS — replace recursive policies
-- =====================================================================================

DROP POLICY IF EXISTS "coach_documents_select_coach_admin" ON coach_documents;
CREATE POLICY "coach_documents_select_coach_admin"
    ON coach_documents FOR SELECT
    TO authenticated
    USING (is_admin_or_coach());

DROP POLICY IF EXISTS "coach_documents_insert_coach_admin" ON coach_documents;
CREATE POLICY "coach_documents_insert_coach_admin"
    ON coach_documents FOR INSERT
    TO authenticated
    WITH CHECK (is_admin_or_coach());

DROP POLICY IF EXISTS "coach_documents_update_coach_admin" ON coach_documents;
CREATE POLICY "coach_documents_update_coach_admin"
    ON coach_documents FOR UPDATE
    TO authenticated
    USING (is_admin_or_coach())
    WITH CHECK (is_admin_or_coach());

DROP POLICY IF EXISTS "coach_documents_delete_coach_admin" ON coach_documents;
CREATE POLICY "coach_documents_delete_coach_admin"
    ON coach_documents FOR DELETE
    TO authenticated
    USING (is_admin_or_coach());

-- =====================================================================================
-- 8. PHOTO_SELECTIONS — replace recursive policies
-- =====================================================================================

DROP POLICY IF EXISTS "photo_selections_select_coach_admin" ON photo_selections;
CREATE POLICY "photo_selections_select_coach_admin"
    ON photo_selections FOR SELECT
    TO authenticated
    USING (is_admin_or_coach());

DROP POLICY IF EXISTS "photo_selections_insert_coach_admin" ON photo_selections;
CREATE POLICY "photo_selections_insert_coach_admin"
    ON photo_selections FOR INSERT
    TO authenticated
    WITH CHECK (is_admin_or_coach());

DROP POLICY IF EXISTS "photo_selections_update_coach_admin" ON photo_selections;
CREATE POLICY "photo_selections_update_coach_admin"
    ON photo_selections FOR UPDATE
    TO authenticated
    USING (is_admin_or_coach())
    WITH CHECK (is_admin_or_coach());

DROP POLICY IF EXISTS "photo_selections_delete_coach_admin" ON photo_selections;
CREATE POLICY "photo_selections_delete_coach_admin"
    ON photo_selections FOR DELETE
    TO authenticated
    USING (is_admin_or_coach());

-- =====================================================================================
-- 9. NOTIFICATIONS — replace recursive policies
-- =====================================================================================

DROP POLICY IF EXISTS "notifications_insert_coach_admin" ON notifications;
CREATE POLICY "notifications_insert_coach_admin"
    ON notifications FOR INSERT
    TO authenticated
    WITH CHECK (is_admin_or_coach());

DROP POLICY IF EXISTS "notifications_select_coach_admin" ON notifications;
CREATE POLICY "notifications_select_coach_admin"
    ON notifications FOR SELECT
    TO authenticated
    USING (is_admin_or_coach());

-- =====================================================================================
-- 10. FEATURE_FLAGS — replace recursive update policy with is_admin()
-- =====================================================================================

DROP POLICY IF EXISTS "feature_flags_update_admin" ON feature_flags;
CREATE POLICY "feature_flags_update_admin"
    ON feature_flags FOR UPDATE
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

-- =====================================================================================
-- 11. Fix missing DELETE policies from 20260225
-- =====================================================================================

-- profiles_delete_admin was recursive in 20260222
DROP POLICY IF EXISTS "profiles_delete_admin" ON profiles;
CREATE POLICY "profiles_delete_admin"
    ON profiles FOR DELETE
    TO authenticated
    USING (is_admin());

-- matches_delete_coach_admin was recursive in 20260222
DROP POLICY IF EXISTS "matches_delete_coach_admin" ON matches;
CREATE POLICY "matches_delete_coach_admin"
    ON matches FOR DELETE
    TO authenticated
    USING (is_admin_or_coach());
