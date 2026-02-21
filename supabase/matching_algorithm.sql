-- =====================================================================================
--  MY MUQABALA — ALGORITHME DE MATCHING
--  Scoring de compatibilite base sur les styles d'attachement (ECR-R)
-- =====================================================================================

-- ============================================================
-- 1. HELPER: get_attachment_scores(user_id)
-- ============================================================
-- Returns anxiety_score, avoidance_score, and attachment_style
-- for a given user based on their questionnaire_responses.
--
-- Inverse items: {5, 9, 12, 15, 19} -> scored as (6 - raw_value)
-- Anxiety: mean of Q1-Q10 (after inversion)
-- Avoidance: mean of Q11-Q20 (after inversion)
-- Style classification:
--   anxiety < 3.0 AND avoidance < 3.0 -> 'secure'
--   anxiety >= 3.0 AND avoidance < 3.0 -> 'anxious'
--   anxiety < 3.0 AND avoidance >= 3.0 -> 'avoidant'
--   anxiety >= 3.0 AND avoidance >= 3.0 -> 'fearful'

CREATE OR REPLACE FUNCTION get_attachment_scores(p_user_id UUID)
RETURNS TABLE(anxiety_score NUMERIC, avoidance_score NUMERIC, attachment_style TEXT)
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    v_anxiety NUMERIC;
    v_avoidance NUMERIC;
    v_style TEXT;
BEGIN
    -- Calculate anxiety score (Q1-Q10)
    SELECT AVG(
        CASE
            WHEN qr.question_id IN (5, 9) THEN 6 - (qr.reponse->>'value')::INT
            ELSE (qr.reponse->>'value')::INT
        END
    ) INTO v_anxiety
    FROM questionnaire_responses qr
    WHERE qr.user_id = p_user_id
      AND qr.categorie = 'attachement'
      AND qr.question_id BETWEEN 1 AND 10;

    -- Calculate avoidance score (Q11-Q20)
    SELECT AVG(
        CASE
            WHEN qr.question_id IN (12, 15, 19) THEN 6 - (qr.reponse->>'value')::INT
            ELSE (qr.reponse->>'value')::INT
        END
    ) INTO v_avoidance
    FROM questionnaire_responses qr
    WHERE qr.user_id = p_user_id
      AND qr.categorie = 'attachement'
      AND qr.question_id BETWEEN 11 AND 20;

    -- Default to 3.0 if no responses
    v_anxiety := COALESCE(v_anxiety, 3.0);
    v_avoidance := COALESCE(v_avoidance, 3.0);

    -- Classify style
    IF v_anxiety < 3.0 AND v_avoidance < 3.0 THEN
        v_style := 'secure';
    ELSIF v_anxiety >= 3.0 AND v_avoidance < 3.0 THEN
        v_style := 'anxious';
    ELSIF v_anxiety < 3.0 AND v_avoidance >= 3.0 THEN
        v_style := 'avoidant';
    ELSE
        v_style := 'fearful';
    END IF;

    RETURN QUERY SELECT v_anxiety, v_avoidance, v_style;
END;
$$;


-- ============================================================
-- 2. HELPER: compute_compatibility_score(styles + scores)
-- ============================================================
-- Pure function: no DB access. Computes compatibility percentage
-- based on attachment styles and gap penalty.

CREATE OR REPLACE FUNCTION compute_compatibility_score(
    p_style_a TEXT,
    p_style_b TEXT,
    p_anxiety_a NUMERIC,
    p_avoidance_a NUMERIC,
    p_anxiety_b NUMERIC,
    p_avoidance_b NUMERIC
) RETURNS NUMERIC
LANGUAGE plpgsql IMMUTABLE AS $$
DECLARE
    v_min_score NUMERIC;
    v_max_score NUMERIC;
    v_gap NUMERIC;
    v_gap_ratio NUMERIC;
    v_score NUMERIC;
    v_pair TEXT;
BEGIN
    -- Sort styles alphabetically to create canonical pair key
    IF p_style_a <= p_style_b THEN
        v_pair := p_style_a || '+' || p_style_b;
    ELSE
        v_pair := p_style_b || '+' || p_style_a;
    END IF;

    -- Compatibility ranges by style pair
    CASE v_pair
        WHEN 'secure+secure' THEN v_min_score := 85; v_max_score := 100;
        WHEN 'anxious+secure' THEN v_min_score := 70; v_max_score := 85;
        WHEN 'avoidant+secure' THEN v_min_score := 65; v_max_score := 80;
        WHEN 'fearful+secure' THEN v_min_score := 50; v_max_score := 70;
        WHEN 'anxious+anxious' THEN v_min_score := 40; v_max_score := 60;
        WHEN 'anxious+avoidant' THEN v_min_score := 25; v_max_score := 45;
        WHEN 'anxious+fearful' THEN v_min_score := 30; v_max_score := 50;
        WHEN 'avoidant+avoidant' THEN v_min_score := 30; v_max_score := 50;
        WHEN 'avoidant+fearful' THEN v_min_score := 25; v_max_score := 45;
        WHEN 'fearful+fearful' THEN v_min_score := 20; v_max_score := 40;
        ELSE v_min_score := 30; v_max_score := 60;
    END CASE;

    -- Gap penalty
    v_gap := ABS(p_anxiety_a - p_anxiety_b) + ABS(p_avoidance_a - p_avoidance_b);
    v_gap_ratio := LEAST(v_gap / 8.0, 1.0);
    v_score := v_max_score - (v_gap_ratio * (v_max_score - v_min_score));

    RETURN ROUND(v_score, 2);
END;
$$;


-- ============================================================
-- 3. MAIN: run_matching_algorithm(event_id)
-- ============================================================
-- RPC function callable from the admin panel.
-- Steps:
--   0. Filter eligible profiles (matching_pool + 20 attachment responses)
--   1. Compute compatibility for all F x M pairs
--   2. Filter pairs >= 45%
--   3. Sort by priority (high_ticket, nb_events) then score
--   4. Greedy matching (max 3 matches per person)
--   5. Insert into matches table
--   6. Return JSON summary

CREATE OR REPLACE FUNCTION run_matching_algorithm(p_event_id UUID)
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
    rec RECORD;
    v_u1 UUID;
    v_u2 UUID;
    v_count_u1 INT;
    v_count_u2 INT;
BEGIN
    -- == STEP 0: Get eligible profiles ==
    -- Must be in matching_pool AND have 20 attachment responses
    SELECT ARRAY_AGG(p.id) INTO v_eligible_women
    FROM profiles p
    WHERE p.statut_parcours = 'matching_pool'
      AND p.genre = 'femme'
      AND (SELECT COUNT(*) FROM questionnaire_responses qr
           WHERE qr.user_id = p.id AND qr.categorie = 'attachement'
           AND qr.question_id BETWEEN 1 AND 20) = 20;

    SELECT ARRAY_AGG(p.id) INTO v_eligible_men
    FROM profiles p
    WHERE p.statut_parcours = 'matching_pool'
      AND p.genre = 'homme'
      AND (SELECT COUNT(*) FROM questionnaire_responses qr
           WHERE qr.user_id = p.id AND qr.categorie = 'attachement'
           AND qr.question_id BETWEEN 1 AND 20) = 20;

    -- If no eligible profiles on either side, return early
    IF v_eligible_women IS NULL OR v_eligible_men IS NULL THEN
        RETURN jsonb_build_object(
            'success', true,
            'matches_created', 0,
            'eligible_women', COALESCE(array_length(v_eligible_women, 1), 0),
            'eligible_men', COALESCE(array_length(v_eligible_men, 1), 0),
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
        -- Priority: high_ticket * 10000 + (999 - nb_events)
        (CASE WHEN w.is_high_ticket THEN 10000 ELSE 0 END) + (999 - LEAST(w.nb_events_participes, 999)) AS priority_w,
        (CASE WHEN m.is_high_ticket THEN 10000 ELSE 0 END) + (999 - LEAST(m.nb_events_participes, 999)) AS priority_m,
        -- Combined priority (sum of both)
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
    -- Initialize match counts
    CREATE TEMP TABLE IF NOT EXISTS tmp_match_counts (
        user_id UUID PRIMARY KEY,
        match_count INT DEFAULT 0
    ) ON COMMIT DROP;

    DELETE FROM tmp_match_counts;

    -- Insert all eligible users with 0 count
    INSERT INTO tmp_match_counts (user_id, match_count)
    SELECT unnest(v_eligible_women), 0
    UNION ALL
    SELECT unnest(v_eligible_men), 0
    ON CONFLICT (user_id) DO NOTHING;

    -- Iterate pairs in priority order
    FOR rec IN (
        SELECT woman_id, man_id, score
        FROM tmp_pairs
        ORDER BY combined_priority DESC, score DESC
    ) LOOP
        -- Check if both users have < max matches
        SELECT match_count INTO v_count_u1 FROM tmp_match_counts WHERE user_id = rec.woman_id;
        SELECT match_count INTO v_count_u2 FROM tmp_match_counts WHERE user_id = rec.man_id;

        IF COALESCE(v_count_u1, 0) < v_max_matches_per_person
           AND COALESCE(v_count_u2, 0) < v_max_matches_per_person THEN

            -- Ensure user_1_id < user_2_id (CHECK constraint)
            IF rec.woman_id < rec.man_id THEN
                v_u1 := rec.woman_id;
                v_u2 := rec.man_id;
            ELSE
                v_u1 := rec.man_id;
                v_u2 := rec.woman_id;
            END IF;

            -- Check no duplicate match exists
            IF NOT EXISTS (
                SELECT 1 FROM matches
                WHERE user_1_id = v_u1 AND user_2_id = v_u2 AND event_id = p_event_id
            ) THEN
                -- Insert match
                INSERT INTO matches (event_id, user_1_id, user_2_id, score_compatibilite, statut)
                VALUES (p_event_id, v_u1, v_u2, rec.score, 'propose');

                v_matches_created := v_matches_created + 1;

                -- Update counts
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
        'max_matches_per_person', v_max_matches_per_person
    );
END;
$$;


-- ============================================================
-- 4. HELPER: get_user_attachment_profile(user_id)
-- ============================================================
-- Convenience function for admin panel to view a user's
-- attachment profile with scores and style.

CREATE OR REPLACE FUNCTION get_user_attachment_profile(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    v_scores RECORD;
    v_response_count INT;
BEGIN
    -- Count responses
    SELECT COUNT(*) INTO v_response_count
    FROM questionnaire_responses
    WHERE user_id = p_user_id
      AND categorie = 'attachement'
      AND question_id BETWEEN 1 AND 20;

    -- Get scores
    SELECT * INTO v_scores FROM get_attachment_scores(p_user_id);

    RETURN jsonb_build_object(
        'user_id', p_user_id,
        'responses_count', v_response_count,
        'anxiety_score', ROUND(v_scores.anxiety_score, 2),
        'avoidance_score', ROUND(v_scores.avoidance_score, 2),
        'attachment_style', v_scores.attachment_style,
        'is_complete', (v_response_count = 20)
    );
END;
$$;
