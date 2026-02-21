-- =====================================================================================
--  Fix infinite recursion in RLS policies for profiles table
--  The admin policy on profiles was querying profiles itself, causing a loop.
--  Solution: SECURITY DEFINER function that bypasses RLS to check role.
-- =====================================================================================

-- 1. Create helper function (bypasses RLS)
CREATE OR REPLACE FUNCTION is_admin_or_coach()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('coach', 'admin')
    );
$$;

-- 2. Drop the recursive policies on profiles
DROP POLICY IF EXISTS "profiles_select_coach_admin" ON profiles;
DROP POLICY IF EXISTS "profiles_update_coach_admin" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_coach_admin" ON profiles;

-- 3. Recreate without recursion (using the SECURITY DEFINER function)
CREATE POLICY "profiles_select_coach_admin"
    ON profiles FOR SELECT
    TO authenticated
    USING (is_admin_or_coach());

-- Coach/admin can update any profile
CREATE POLICY "profiles_update_coach_admin"
    ON profiles FOR UPDATE
    TO authenticated
    USING (is_admin_or_coach())
    WITH CHECK (is_admin_or_coach());

-- Coach/admin can insert profiles (for creating clients)
CREATE POLICY "profiles_insert_coach_admin"
    ON profiles FOR INSERT
    TO authenticated
    WITH CHECK (is_admin_or_coach());

-- 4. Fix same recursion issue on ALL other tables that reference profiles for admin check
-- These policies use EXISTS(SELECT 1 FROM profiles WHERE ...) which is fine because
-- the profiles table policies now use is_admin_or_coach() which is SECURITY DEFINER.
-- No changes needed for non-profiles tables.

-- 5. Also fix questionnaire_responses if it has the same pattern
DROP POLICY IF EXISTS "questionnaire_select_coach_admin" ON questionnaire_responses;
CREATE POLICY "questionnaire_select_coach_admin"
    ON questionnaire_responses FOR SELECT
    TO authenticated
    USING (is_admin_or_coach());

DROP POLICY IF EXISTS "questionnaire_insert_coach_admin" ON questionnaire_responses;
CREATE POLICY "questionnaire_insert_coach_admin"
    ON questionnaire_responses FOR INSERT
    TO authenticated
    WITH CHECK (is_admin_or_coach());

-- Fix matches
DROP POLICY IF EXISTS "matches_select_coach_admin" ON matches;
CREATE POLICY "matches_select_coach_admin"
    ON matches FOR SELECT
    TO authenticated
    USING (is_admin_or_coach());

DROP POLICY IF EXISTS "matches_update_coach_admin" ON matches;
CREATE POLICY "matches_update_coach_admin"
    ON matches FOR UPDATE
    TO authenticated
    USING (is_admin_or_coach())
    WITH CHECK (is_admin_or_coach());

DROP POLICY IF EXISTS "matches_insert_coach_admin" ON matches;
CREATE POLICY "matches_insert_coach_admin"
    ON matches FOR INSERT
    TO authenticated
    WITH CHECK (is_admin_or_coach());
