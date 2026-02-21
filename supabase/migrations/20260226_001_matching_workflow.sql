-- =====================================================================================
--  MY MUQABALA — MATCHING WORKFLOW V2
--  Migration: Pre-matching -> Notification -> Confirmation -> Definitive matching
--
--  Changes:
--    1. ALTER run_matching_algorithm: add p_confirmed_only parameter
--    2. CREATE cleanup_pre_matches(event_id): delete propose matches before re-run
--    3. CREATE register_pre_matching_participants(event_id): link matched users to event
--    4. CREATE confirm_event_participation(event_id): participant confirms presence
--    5. CREATE decline_event_participation(event_id): participant declines + malus
--    6. CREATE get_event_confirmation_status(event_id): admin dashboard query
-- =====================================================================================


-- ============================================================
-- 1. MODIFIED: run_matching_algorithm
-- ============================================================
-- Added p_confirmed_only BOOLEAN DEFAULT FALSE.
-- When TRUE:
--   a) Deletes existing 'propose' matches for this event (cleanup)
--   b) Only includes users in event_participants with statut='confirme'

CREATE OR REPLACE FUNCTION run_matching_algorithm(
    p_event_id UUID,
    p_confirmed_only BOOLEAN DEFAULT FALSE
)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    v_eligible_women UUID[];
    v_eligible_men UUID[];
    v_pairs JSONB := '[]'::JSONB;
    v_matches_created INT := 0;
    v_match_counts JSONB := '{}'::JSONB;
    v_undermatched JSONB := '[]'::JSONB;
    v_user_match_count JSONB := '{}'::JSONB;
    v_max_matches_per_person INT := 3;
    v_min_score NUMERIC := 45.0;
    v_cleanup_count INT := 0;
    rec RECORD;
    v_u1 UUID;
    v_u2 UUID;
    v_count_u1 INT;
    v_count_u2 INT;
BEGIN
    -- == CLEANUP: When running definitive matching, delete pre-matches first ==
    IF p_confirmed_only THEN
        DELETE FROM matches
        WHERE event_id = p_event_id AND statut = 'propose';
        GET DIAGNOSTICS v_cleanup_count = ROW_COUNT;
    END IF;

    -- == STEP 0: Get eligible profiles ==
    -- Must be in matching_pool AND have 20 attachment responses
    -- When p_confirmed_only = TRUE, also require event_participants.statut = 'confirme'
    SELECT ARRAY_AGG(p.id) INTO v_eligible_women
    FROM profiles p
    WHERE p.statut_parcours = 'matching_pool'
      AND p.genre = 'femme'
      AND (SELECT COUNT(*) FROM questionnaire_responses qr
           WHERE qr.user_id = p.id AND qr.categorie = 'attachement'
           AND qr.question_id BETWEEN 1 AND 20) = 20
      AND (NOT p_confirmed_only OR EXISTS (
          SELECT 1 FROM event_participants ep
          WHERE ep.user_id = p.id
            AND ep.event_id = p_event_id
            AND ep.statut = 'confirme'
      ));

    SELECT ARRAY_AGG(p.id) INTO v_eligible_men
    FROM profiles p
    WHERE p.statut_parcours = 'matching_pool'
      AND p.genre = 'homme'
      AND (SELECT COUNT(*) FROM questionnaire_responses qr
           WHERE qr.user_id = p.id AND qr.categorie = 'attachement'
           AND qr.question_id BETWEEN 1 AND 20) = 20
      AND (NOT p_confirmed_only OR EXISTS (
          SELECT 1 FROM event_participants ep
          WHERE ep.user_id = p.id
            AND ep.event_id = p_event_id
            AND ep.statut = 'confirme'
      ));

    -- If no eligible profiles on either side, return early
    IF v_eligible_women IS NULL OR v_eligible_men IS NULL THEN
        RETURN jsonb_build_object(
            'success', true,
            'matches_created', 0,
            'eligible_women', COALESCE(array_length(v_eligible_women, 1), 0),
            'eligible_men', COALESCE(array_length(v_eligible_men, 1), 0),
            'confirmed_only', p_confirmed_only,
            'pre_matches_cleaned', v_cleanup_count,
            'message', 'Pas assez de profils éligibles pour le matching.'
        );
    END IF;

    -- == STEP 1 & 2: Compute all F x M pairs with scores, filter >= 45% ==
    CREATE TEMP TABLE IF NOT EXISTS tmp_pairs (
        woman_id UUID,
        man_id UUID,
        score NUMERIC,
        priority_w NUMERIC,
        priority_m NUMERIC,
        combined_priority NUMERIC
    ) ON COMMIT DROP;

    DELETE FROM tmp_pairs;

    INSERT INTO tmp_pairs (woman_id, man_id, score, priority_w, priority_m, combined_priority)
    SELECT
        w.id AS woman_id,
        m.id AS man_id,
        compute_compatibility_score(
            ws.attachment_style, ms.attachment_style,
            ws.anxiety_score, ws.avoidance_score,
            ms.anxiety_score, ms.avoidance_score
        ) AS score,
        (CASE WHEN w.is_high_ticket THEN 10000 ELSE 0 END) + (999 - LEAST(w.nb_events_participes, 999)) AS priority_w,
        (CASE WHEN m.is_high_ticket THEN 10000 ELSE 0 END) + (999 - LEAST(m.nb_events_participes, 999)) AS priority_m,
        (CASE WHEN w.is_high_ticket THEN 10000 ELSE 0 END) + (999 - LEAST(w.nb_events_participes, 999))
        + (CASE WHEN m.is_high_ticket THEN 10000 ELSE 0 END) + (999 - LEAST(m.nb_events_participes, 999)) AS combined_priority
    FROM unnest(v_eligible_women) AS w_id
    JOIN profiles w ON w.id = w_id
    CROSS JOIN unnest(v_eligible_men) AS m_id
    JOIN profiles m ON m.id = m_id
    CROSS JOIN LATERAL get_attachment_scores(w.id) AS ws
    CROSS JOIN LATERAL get_attachment_scores(m.id) AS ms
    WHERE compute_compatibility_score(
        ws.attachment_style, ms.attachment_style,
        ws.anxiety_score, ws.avoidance_score,
        ms.anxiety_score, ms.avoidance_score
    ) >= v_min_score;

    -- == STEP 3 & 4: Greedy matching sorted by priority then score ==
    CREATE TEMP TABLE IF NOT EXISTS tmp_match_counts (
        user_id UUID PRIMARY KEY,
        match_count INT DEFAULT 0
    ) ON COMMIT DROP;

    DELETE FROM tmp_match_counts;

    INSERT INTO tmp_match_counts (user_id, match_count)
    SELECT unnest(v_eligible_women), 0
    UNION ALL
    SELECT unnest(v_eligible_men), 0
    ON CONFLICT (user_id) DO NOTHING;

    FOR rec IN (
        SELECT woman_id, man_id, score
        FROM tmp_pairs
        ORDER BY combined_priority DESC, score DESC
    ) LOOP
        SELECT match_count INTO v_count_u1 FROM tmp_match_counts WHERE user_id = rec.woman_id;
        SELECT match_count INTO v_count_u2 FROM tmp_match_counts WHERE user_id = rec.man_id;

        IF COALESCE(v_count_u1, 0) < v_max_matches_per_person
           AND COALESCE(v_count_u2, 0) < v_max_matches_per_person THEN

            IF rec.woman_id < rec.man_id THEN
                v_u1 := rec.woman_id;
                v_u2 := rec.man_id;
            ELSE
                v_u1 := rec.man_id;
                v_u2 := rec.woman_id;
            END IF;

            IF NOT EXISTS (
                SELECT 1 FROM matches
                WHERE user_1_id = v_u1 AND user_2_id = v_u2 AND event_id = p_event_id
            ) THEN
                INSERT INTO matches (event_id, user_1_id, user_2_id, score_compatibilite, statut)
                VALUES (p_event_id, v_u1, v_u2, rec.score, 'propose');

                v_matches_created := v_matches_created + 1;

                UPDATE tmp_match_counts SET match_count = match_count + 1 WHERE user_id = rec.woman_id;
                UPDATE tmp_match_counts SET match_count = match_count + 1 WHERE user_id = rec.man_id;
            END IF;
        END IF;
    END LOOP;

    -- == STEP 5: Build alerts for undermatched users ==
    SELECT jsonb_agg(jsonb_build_object(
        'user_id', mc.user_id,
        'prenom', p.prenom,
        'match_count', mc.match_count
    )) INTO v_undermatched
    FROM tmp_match_counts mc
    JOIN profiles p ON p.id = mc.user_id
    WHERE mc.match_count = 0;

    -- == STEP 6: Return summary ==
    RETURN jsonb_build_object(
        'success', true,
        'matches_created', v_matches_created,
        'eligible_women', COALESCE(array_length(v_eligible_women, 1), 0),
        'eligible_men', COALESCE(array_length(v_eligible_men, 1), 0),
        'total_pairs_evaluated', (SELECT COUNT(*) FROM tmp_pairs),
        'undermatched', COALESCE(v_undermatched, '[]'::JSONB),
        'min_score_threshold', v_min_score,
        'max_matches_per_person', v_max_matches_per_person,
        'confirmed_only', p_confirmed_only,
        'pre_matches_cleaned', v_cleanup_count
    );
END;
$$;


-- ============================================================
-- 2. register_pre_matching_participants(event_id)
-- ============================================================
-- After pre-matching, registers all matched users as event_participants.
-- Called by admin after running the pre-matching algorithm.
-- Only coach/admin should call this (via admin panel with service key).

CREATE OR REPLACE FUNCTION register_pre_matching_participants(p_event_id UUID)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    v_count INT := 0;
BEGIN
    -- Insert all unique users from matches for this event into event_participants
    -- ON CONFLICT: skip if already registered (preserves existing statut)
    INSERT INTO event_participants (event_id, user_id, statut, role_evenement)
    SELECT DISTINCT p_event_id, user_id, 'inscrit', 'participant'
    FROM (
        SELECT user_1_id AS user_id FROM matches WHERE event_id = p_event_id
        UNION
        SELECT user_2_id AS user_id FROM matches WHERE event_id = p_event_id
    ) matched_users
    ON CONFLICT (event_id, user_id) DO NOTHING;

    GET DIAGNOSTICS v_count = ROW_COUNT;

    RETURN jsonb_build_object(
        'success', true,
        'participants_registered', v_count,
        'event_id', p_event_id
    );
END;
$$;


-- ============================================================
-- 3. confirm_event_participation(event_id)
-- ============================================================
-- Participant confirms their presence at the event.
-- Uses auth.uid() to identify the caller (RLS-compatible).

CREATE OR REPLACE FUNCTION confirm_event_participation(p_event_id UUID)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    v_user_id UUID;
    v_updated INT;
BEGIN
    v_user_id := auth.uid();

    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Non authentifié');
    END IF;

    UPDATE event_participants
    SET statut = 'confirme'
    WHERE event_id = p_event_id
      AND user_id = v_user_id
      AND statut = 'inscrit';

    GET DIAGNOSTICS v_updated = ROW_COUNT;

    IF v_updated = 0 THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'Participation non trouvée ou déjà confirmée/déclinée'
        );
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'event_id', p_event_id,
        'user_id', v_user_id,
        'statut', 'confirme'
    );
END;
$$;


-- ============================================================
-- 4. decline_event_participation(event_id)
-- ============================================================
-- Participant declines -> statut = 'absent' + MALUS on nb_events_participes.
-- The malus increments nb_events_participes by 1 as if they had participated,
-- which lowers their priority for future matchings.

CREATE OR REPLACE FUNCTION decline_event_participation(p_event_id UUID)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    v_user_id UUID;
    v_updated INT;
BEGIN
    v_user_id := auth.uid();

    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Non authentifié');
    END IF;

    -- Update participation to absent
    UPDATE event_participants
    SET statut = 'absent'
    WHERE event_id = p_event_id
      AND user_id = v_user_id
      AND statut = 'inscrit';

    GET DIAGNOSTICS v_updated = ROW_COUNT;

    IF v_updated = 0 THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'Participation non trouvée ou déjà confirmée/déclinée'
        );
    END IF;

    -- Apply MALUS: increment nb_events_participes as if they participated
    UPDATE profiles
    SET nb_events_participes = nb_events_participes + 1
    WHERE id = v_user_id;

    RETURN jsonb_build_object(
        'success', true,
        'event_id', p_event_id,
        'user_id', v_user_id,
        'statut', 'absent',
        'malus_applied', true
    );
END;
$$;


-- ============================================================
-- 5. get_event_confirmation_status(event_id)
-- ============================================================
-- Admin query: returns confirmation status of all participants for an event.

CREATE OR REPLACE FUNCTION get_event_confirmation_status(p_event_id UUID)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    v_total INT;
    v_confirme INT;
    v_inscrit INT;
    v_absent INT;
    v_participants JSONB;
BEGIN
    SELECT COUNT(*) INTO v_total
    FROM event_participants WHERE event_id = p_event_id;

    SELECT COUNT(*) INTO v_confirme
    FROM event_participants WHERE event_id = p_event_id AND statut = 'confirme';

    SELECT COUNT(*) INTO v_inscrit
    FROM event_participants WHERE event_id = p_event_id AND statut = 'inscrit';

    SELECT COUNT(*) INTO v_absent
    FROM event_participants WHERE event_id = p_event_id AND statut = 'absent';

    SELECT jsonb_agg(jsonb_build_object(
        'user_id', ep.user_id,
        'prenom', p.prenom,
        'nom', p.nom,
        'genre', p.genre,
        'statut', ep.statut,
        'is_high_ticket', p.is_high_ticket
    ) ORDER BY ep.statut, p.prenom) INTO v_participants
    FROM event_participants ep
    JOIN profiles p ON p.id = ep.user_id
    WHERE ep.event_id = p_event_id;

    RETURN jsonb_build_object(
        'success', true,
        'event_id', p_event_id,
        'total', v_total,
        'confirme', v_confirme,
        'en_attente', v_inscrit,
        'decline', v_absent,
        'participants', COALESCE(v_participants, '[]'::JSONB)
    );
END;
$$;
