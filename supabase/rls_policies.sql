-- ═══════════════════════════════════════════════════════════════════════
--  MY MUQABALA — Row Level Security (RLS) Policies
--  Complete RLS for all V2 tables.
--
--  PERFORMANCE NOTE: We always use (SELECT auth.uid()) instead of
--  auth.uid() directly. This is ~100x faster because it prevents
--  re-evaluation per row (the subselect is evaluated once and cached).
--
--  COACH/ADMIN HELPER PATTERN:
--    EXISTS (SELECT 1 FROM profiles WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin'))
-- ═══════════════════════════════════════════════════════════════════════


-- ═══════════════════════════════════════════════════════════════════════
-- 1. PROFILES
-- ═══════════════════════════════════════════════════════════════════════

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own full profile
CREATE POLICY "profiles_select_own"
    ON profiles FOR SELECT
    TO authenticated
    USING (id = (SELECT auth.uid()));

-- Users can view basic info (prenom, photo_floue_url, ville, genre) of matched users
-- Note: The application layer must use a restricted column list for non-own profiles.
-- This policy only controls row-level visibility, not column-level.
CREATE POLICY "profiles_select_matched_users"
    ON profiles FOR SELECT
    TO authenticated
    USING (
        id != (SELECT auth.uid())
        AND EXISTS (
            SELECT 1 FROM matches
            WHERE statut NOT IN ('annule', 'termine_negatif')
            AND (
                (user_1_id = (SELECT auth.uid()) AND user_2_id = profiles.id)
                OR (user_2_id = (SELECT auth.uid()) AND user_1_id = profiles.id)
            )
        )
    );

-- Coaches and admins can view all profiles
CREATE POLICY "profiles_select_coach_admin"
    ON profiles FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles p
            WHERE p.id = (SELECT auth.uid()) AND p.role IN ('coach', 'admin')
        )
    );

-- Users can update their own profile only
CREATE POLICY "profiles_update_own"
    ON profiles FOR UPDATE
    TO authenticated
    USING (id = (SELECT auth.uid()))
    WITH CHECK (id = (SELECT auth.uid()));

-- Coaches/admins can update any profile (e.g., change statut_parcours)
CREATE POLICY "profiles_update_coach_admin"
    ON profiles FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles p
            WHERE p.id = (SELECT auth.uid()) AND p.role IN ('coach', 'admin')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles p
            WHERE p.id = (SELECT auth.uid()) AND p.role IN ('coach', 'admin')
        )
    );

-- Only coaches/admins can insert profiles (via invite-participant edge function)
CREATE POLICY "profiles_insert_coach_admin"
    ON profiles FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles p
            WHERE p.id = (SELECT auth.uid()) AND p.role IN ('coach', 'admin')
        )
        -- OR the user is inserting their own profile (bootstrap on first login)
        OR id = (SELECT auth.uid())
    );

-- Only admins can delete profiles (hard delete — use with extreme caution)
CREATE POLICY "profiles_delete_admin"
    ON profiles FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles p
            WHERE p.id = (SELECT auth.uid()) AND p.role = 'admin'
        )
    );


-- ═══════════════════════════════════════════════════════════════════════
-- 2. INVITATIONS
-- ═══════════════════════════════════════════════════════════════════════

ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- Only coaches/admins can view all invitations
CREATE POLICY "invitations_select_coach_admin"
    ON invitations FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Invited user can view their own invitation (linked via user_id)
CREATE POLICY "invitations_select_own"
    ON invitations FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

-- Only coaches/admins can create invitations
CREATE POLICY "invitations_insert_coach_admin"
    ON invitations FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Only coaches/admins can update invitations (e.g., mark as acceptee, annulee)
CREATE POLICY "invitations_update_coach_admin"
    ON invitations FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Only coaches/admins can delete invitations
CREATE POLICY "invitations_delete_coach_admin"
    ON invitations FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );


-- ═══════════════════════════════════════════════════════════════════════
-- 3. QUESTIONNAIRE RESPONSES
-- ═══════════════════════════════════════════════════════════════════════

ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;

-- Users can view their own responses
CREATE POLICY "questionnaire_select_own"
    ON questionnaire_responses FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

-- Users can insert their own responses
CREATE POLICY "questionnaire_insert_own"
    ON questionnaire_responses FOR INSERT
    TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));

-- Users can update their own responses
CREATE POLICY "questionnaire_update_own"
    ON questionnaire_responses FOR UPDATE
    TO authenticated
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));

-- Users can delete their own responses (re-answer)
CREATE POLICY "questionnaire_delete_own"
    ON questionnaire_responses FOR DELETE
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

-- Coaches can view all responses (for scoring/analysis)
CREATE POLICY "questionnaire_select_coach_admin"
    ON questionnaire_responses FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );


-- ═══════════════════════════════════════════════════════════════════════
-- 4. EVENTS
-- ═══════════════════════════════════════════════════════════════════════

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- All authenticated users can view events
CREATE POLICY "events_select_authenticated"
    ON events FOR SELECT
    TO authenticated
    USING (true);

-- Only coaches/admins can create events
CREATE POLICY "events_insert_coach_admin"
    ON events FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Only coaches/admins can update events
CREATE POLICY "events_update_coach_admin"
    ON events FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Only coaches/admins can delete events
CREATE POLICY "events_delete_coach_admin"
    ON events FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );


-- ═══════════════════════════════════════════════════════════════════════
-- 5. EVENT PARTICIPANTS
-- ═══════════════════════════════════════════════════════════════════════

ALTER TABLE event_participants ENABLE ROW LEVEL SECURITY;

-- Users can view their own event participation records
CREATE POLICY "event_participants_select_own"
    ON event_participants FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

-- Coaches/admins can view all event participants
CREATE POLICY "event_participants_select_coach_admin"
    ON event_participants FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Users can insert their own participation (self-register with 'inscrit' status only)
CREATE POLICY "event_participants_insert_own"
    ON event_participants FOR INSERT
    TO authenticated
    WITH CHECK (
        user_id = (SELECT auth.uid())
        AND statut = 'inscrit'
        AND role_evenement = 'participant'
    );

-- Coaches/admins can insert event participants
CREATE POLICY "event_participants_insert_coach_admin"
    ON event_participants FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Coaches/admins can update event participants (change statut)
CREATE POLICY "event_participants_update_coach_admin"
    ON event_participants FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Coaches/admins can delete event participants
CREATE POLICY "event_participants_delete_coach_admin"
    ON event_participants FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );


-- ═══════════════════════════════════════════════════════════════════════
-- 6. MATCHES
-- ═══════════════════════════════════════════════════════════════════════

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Users can view matches where they are user_1 or user_2
CREATE POLICY "matches_select_own"
    ON matches FOR SELECT
    TO authenticated
    USING (
        user_1_id = (SELECT auth.uid())
        OR user_2_id = (SELECT auth.uid())
    );

-- Coaches/admins can view all matches
CREATE POLICY "matches_select_coach_admin"
    ON matches FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Coaches/admins can insert matches
CREATE POLICY "matches_insert_coach_admin"
    ON matches FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Coaches/admins can update matches
CREATE POLICY "matches_update_coach_admin"
    ON matches FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Coaches/admins can delete matches
CREATE POLICY "matches_delete_coach_admin"
    ON matches FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );


-- ═══════════════════════════════════════════════════════════════════════
-- 7. BLINK DATES
-- ═══════════════════════════════════════════════════════════════════════

ALTER TABLE blink_dates ENABLE ROW LEVEL SECURITY;

-- Users can view blink dates linked to their matches
CREATE POLICY "blink_dates_select_own"
    ON blink_dates FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM matches m
            WHERE m.id = blink_dates.match_id
            AND (
                m.user_1_id = (SELECT auth.uid())
                OR m.user_2_id = (SELECT auth.uid())
            )
        )
    );

-- Coaches/admins can view all blink dates
CREATE POLICY "blink_dates_select_coach_admin"
    ON blink_dates FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Coaches/admins can insert blink dates
CREATE POLICY "blink_dates_insert_coach_admin"
    ON blink_dates FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Coaches/admins can update blink dates
CREATE POLICY "blink_dates_update_coach_admin"
    ON blink_dates FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Coaches/admins can delete blink dates
CREATE POLICY "blink_dates_delete_coach_admin"
    ON blink_dates FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );


-- ═══════════════════════════════════════════════════════════════════════
-- 8. FEEDBACK FORMS
-- ═══════════════════════════════════════════════════════════════════════

ALTER TABLE feedback_forms ENABLE ROW LEVEL SECURITY;

-- Users can view their own feedback forms
CREATE POLICY "feedback_forms_select_own"
    ON feedback_forms FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

-- Users can insert their own feedback
CREATE POLICY "feedback_forms_insert_own"
    ON feedback_forms FOR INSERT
    TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));

-- Coaches/admins can view all feedback forms
CREATE POLICY "feedback_forms_select_coach_admin"
    ON feedback_forms FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );


-- ═══════════════════════════════════════════════════════════════════════
-- 9. COACH DOCUMENTS
-- ═══════════════════════════════════════════════════════════════════════

ALTER TABLE coach_documents ENABLE ROW LEVEL SECURITY;

-- Users can view documents addressed to them
CREATE POLICY "coach_documents_select_own"
    ON coach_documents FOR SELECT
    TO authenticated
    USING (destinataire_id = (SELECT auth.uid()));

-- Users can update is_read on their own documents
CREATE POLICY "coach_documents_update_own_read"
    ON coach_documents FOR UPDATE
    TO authenticated
    USING (destinataire_id = (SELECT auth.uid()))
    WITH CHECK (destinataire_id = (SELECT auth.uid()));

-- Coaches/admins can view all documents
CREATE POLICY "coach_documents_select_coach_admin"
    ON coach_documents FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Coaches/admins can create documents
CREATE POLICY "coach_documents_insert_coach_admin"
    ON coach_documents FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Coaches/admins can update documents
CREATE POLICY "coach_documents_update_coach_admin"
    ON coach_documents FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Coaches/admins can delete documents
CREATE POLICY "coach_documents_delete_coach_admin"
    ON coach_documents FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );


-- ═══════════════════════════════════════════════════════════════════════
-- 10. PHOTO SELECTIONS
-- ═══════════════════════════════════════════════════════════════════════

ALTER TABLE photo_selections ENABLE ROW LEVEL SECURITY;

-- Users can view their own photo selections (where they are the selecteur)
CREATE POLICY "photo_selections_select_own"
    ON photo_selections FOR SELECT
    TO authenticated
    USING (selecteur_id = (SELECT auth.uid()));

-- Users can update their own selections (mark is_selected)
CREATE POLICY "photo_selections_update_own"
    ON photo_selections FOR UPDATE
    TO authenticated
    USING (selecteur_id = (SELECT auth.uid()))
    WITH CHECK (selecteur_id = (SELECT auth.uid()));

-- Coaches/admins can view all photo selections
CREATE POLICY "photo_selections_select_coach_admin"
    ON photo_selections FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Users can insert their own photo selections (selecteur_id must be self)
CREATE POLICY "photo_selections_insert_own"
    ON photo_selections FOR INSERT
    TO authenticated
    WITH CHECK (selecteur_id = (SELECT auth.uid()));

-- Coaches/admins can insert photo selections (setup before blink date)
CREATE POLICY "photo_selections_insert_coach_admin"
    ON photo_selections FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Coaches/admins can update any photo selection
CREATE POLICY "photo_selections_update_coach_admin"
    ON photo_selections FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Coaches/admins can delete photo selections
CREATE POLICY "photo_selections_delete_coach_admin"
    ON photo_selections FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );


-- ═══════════════════════════════════════════════════════════════════════
-- 11. NOTIFICATIONS
-- ═══════════════════════════════════════════════════════════════════════

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own notifications
CREATE POLICY "notifications_select_own"
    ON notifications FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

-- Users can update their own notifications (mark as read)
CREATE POLICY "notifications_update_own"
    ON notifications FOR UPDATE
    TO authenticated
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));

-- Coaches/admins can insert notifications (send to users)
CREATE POLICY "notifications_insert_coach_admin"
    ON notifications FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );

-- Coaches/admins can also view all notifications (for debugging/support)
CREATE POLICY "notifications_select_coach_admin"
    ON notifications FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role IN ('coach', 'admin')
        )
    );


-- ═══════════════════════════════════════════════════════════════════════
-- 12. DEVICE TOKENS
-- ═══════════════════════════════════════════════════════════════════════

ALTER TABLE device_tokens ENABLE ROW LEVEL SECURITY;

-- Users can view their own device tokens
CREATE POLICY "device_tokens_select_own"
    ON device_tokens FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

-- Users can insert their own device tokens
CREATE POLICY "device_tokens_insert_own"
    ON device_tokens FOR INSERT
    TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));

-- Users can update their own device tokens (deactivate)
CREATE POLICY "device_tokens_update_own"
    ON device_tokens FOR UPDATE
    TO authenticated
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));

-- Users can delete their own device tokens (logout)
CREATE POLICY "device_tokens_delete_own"
    ON device_tokens FOR DELETE
    TO authenticated
    USING (user_id = (SELECT auth.uid()));


-- ═══════════════════════════════════════════════════════════════════════
-- 13. FEATURE FLAGS
-- ═══════════════════════════════════════════════════════════════════════

ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read feature flags (needed to check kill switches)
CREATE POLICY "feature_flags_select_authenticated"
    ON feature_flags FOR SELECT
    TO authenticated
    USING (true);

-- Only admins can update feature flags
CREATE POLICY "feature_flags_update_admin"
    ON feature_flags FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = (SELECT auth.uid()) AND role = 'admin'
        )
    );


-- ═══════════════════════════════════════════════════════════════════════
-- END OF RLS POLICIES
-- ═══════════════════════════════════════════════════════════════════════
