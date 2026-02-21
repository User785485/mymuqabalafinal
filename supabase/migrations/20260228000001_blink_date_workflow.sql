-- ============================================================
-- BLINK DATE WORKFLOW — RPCs for Steps 4, 5, 6
-- ============================================================
-- RPC 1: prepare_blink_date_event    (admin: create blink_dates + photo_selections)
-- RPC 2: get_user_blink_dates_for_event (user: get rounds with partner info)
-- RPC 3: submit_blink_date_feedback  (user: binary feedback per round)
-- RPC 4: submit_photo_selections_for_event (user: select photos)
-- RPC 5: resolve_event_matches       (admin: feedback + photos = match)
-- RPC 6: get_user_match_results      (user: final results)
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- RPC 1: prepare_blink_date_event
-- ────────────────────────────────────────────────────────────
-- Greedy scheduling: for each confirmed match, find the lowest
-- round where neither user_1 nor user_2 is busy.
-- Also creates photo_selections (real + decoy photos).

CREATE OR REPLACE FUNCTION prepare_blink_date_event(p_event_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_match RECORD;
    v_round INTEGER;
    v_busy_rounds INTEGER[];
    v_total_blink_dates INTEGER := 0;
    v_max_round INTEGER := 0;
    v_schedule JSONB := '[]'::JSONB;
    v_user_ids UUID[];
    v_user_id UUID;
    v_partner_ids UUID[];
    v_decoy_id UUID;
    v_sujets_pool JSONB[] := ARRAY[
        '["Parlez de vos valeurs essentielles dans un couple", "Qu''est-ce qui vous a amené dans cette démarche ?", "Décrivez votre journée idéale"]'::JSONB,
        '["Comment envisagez-vous votre vie de famille ?", "Quelle place a la spiritualité dans votre quotidien ?", "Parlez d''un moment qui vous a marqué"]'::JSONB,
        '["Qu''est-ce qui vous fait rire ?", "Comment gérez-vous les désaccords ?", "Quels sont vos projets pour l''avenir ?"]'::JSONB
    ];
BEGIN
    -- Verify event exists
    IF NOT EXISTS (SELECT 1 FROM events WHERE id = p_event_id) THEN
        RETURN jsonb_build_object('success', false, 'error', 'Event not found');
    END IF;

    -- Clean existing blink_dates for this event (idempotent)
    DELETE FROM blink_dates WHERE event_id = p_event_id;
    DELETE FROM photo_selections WHERE event_id = p_event_id;

    -- Collect all distinct user IDs from confirmed matches
    SELECT ARRAY_AGG(DISTINCT uid) INTO v_user_ids
    FROM (
        SELECT user_1_id AS uid FROM matches WHERE event_id = p_event_id AND statut = 'confirme_mutuel'
        UNION
        SELECT user_2_id AS uid FROM matches WHERE event_id = p_event_id AND statut = 'confirme_mutuel'
    ) sub;

    -- Greedy scheduling for each confirmed match
    FOR v_match IN
        SELECT id AS match_id, user_1_id, user_2_id
        FROM matches
        WHERE event_id = p_event_id AND statut = 'confirme_mutuel'
        ORDER BY score_compatibilite DESC NULLS LAST
    LOOP
        -- Find rounds where either user is busy
        SELECT ARRAY_AGG(DISTINCT bd.ordre) INTO v_busy_rounds
        FROM blink_dates bd
        JOIN matches m ON m.id = bd.match_id
        WHERE bd.event_id = p_event_id
          AND (m.user_1_id IN (v_match.user_1_id, v_match.user_2_id)
               OR m.user_2_id IN (v_match.user_1_id, v_match.user_2_id));

        IF v_busy_rounds IS NULL THEN
            v_busy_rounds := ARRAY[]::INTEGER[];
        END IF;

        -- Find lowest available round
        v_round := 1;
        WHILE v_round = ANY(v_busy_rounds) LOOP
            v_round := v_round + 1;
        END LOOP;

        -- Insert blink_date
        INSERT INTO blink_dates (match_id, event_id, ordre, duree_secondes, statut, sujets_proposes)
        VALUES (
            v_match.match_id,
            p_event_id,
            v_round,
            600,
            'planifie',
            v_sujets_pool[((v_round - 1) % 3) + 1]
        );

        v_total_blink_dates := v_total_blink_dates + 1;
        IF v_round > v_max_round THEN
            v_max_round := v_round;
        END IF;

        v_schedule := v_schedule || jsonb_build_object(
            'round', v_round,
            'match_id', v_match.match_id,
            'user_1', v_match.user_1_id,
            'user_2', v_match.user_2_id
        );

        -- Create photo_selections for both users (real partner, not leurre)
        INSERT INTO photo_selections (event_id, selecteur_id, photo_user_id, is_leurre)
        VALUES
            (p_event_id, v_match.user_1_id, v_match.user_2_id, false),
            (p_event_id, v_match.user_2_id, v_match.user_1_id, false)
        ON CONFLICT DO NOTHING;
    END LOOP;

    -- Add decoy photo_selections (1-2 leurres per user)
    IF v_user_ids IS NOT NULL AND array_length(v_user_ids, 1) > 2 THEN
        FOREACH v_user_id IN ARRAY v_user_ids LOOP
            -- Get IDs of actual partners
            SELECT ARRAY_AGG(photo_user_id) INTO v_partner_ids
            FROM photo_selections
            WHERE event_id = p_event_id AND selecteur_id = v_user_id AND is_leurre = false;

            -- Pick up to 2 random decoys (other participants who are not partners)
            FOR v_decoy_id IN
                SELECT uid FROM unnest(v_user_ids) AS uid
                WHERE uid != v_user_id
                  AND uid != ALL(COALESCE(v_partner_ids, ARRAY[]::UUID[]))
                ORDER BY random()
                LIMIT 2
            LOOP
                INSERT INTO photo_selections (event_id, selecteur_id, photo_user_id, is_leurre)
                VALUES (p_event_id, v_user_id, v_decoy_id, true)
                ON CONFLICT DO NOTHING;
            END LOOP;
        END LOOP;
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'total_blink_dates', v_total_blink_dates,
        'total_rounds', v_max_round,
        'schedule', v_schedule
    );
END;
$$;


-- ────────────────────────────────────────────────────────────
-- RPC 2: get_user_blink_dates_for_event
-- ────────────────────────────────────────────────────────────
-- Returns all blink_dates for a user in an event, with partner info.

CREATE OR REPLACE FUNCTION get_user_blink_dates_for_event(p_event_id UUID, p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_result JSONB := '[]'::JSONB;
    v_row RECORD;
    v_partner_id UUID;
    v_partner RECORD;
BEGIN
    FOR v_row IN
        SELECT bd.id AS blink_date_id, bd.ordre, bd.statut, bd.duree_secondes,
               bd.sujets_proposes, bd.feedback_user_1, bd.feedback_user_2,
               m.id AS match_id, m.user_1_id, m.user_2_id
        FROM blink_dates bd
        JOIN matches m ON m.id = bd.match_id
        WHERE bd.event_id = p_event_id
          AND (m.user_1_id = p_user_id OR m.user_2_id = p_user_id)
        ORDER BY bd.ordre ASC
    LOOP
        -- Determine partner
        IF v_row.user_1_id = p_user_id THEN
            v_partner_id := v_row.user_2_id;
        ELSE
            v_partner_id := v_row.user_1_id;
        END IF;

        -- Get partner info
        SELECT prenom, photo_floue_url INTO v_partner
        FROM profiles
        WHERE id = v_partner_id;

        v_result := v_result || jsonb_build_object(
            'blink_date_id', v_row.blink_date_id,
            'ordre', v_row.ordre,
            'statut', v_row.statut,
            'duree_secondes', v_row.duree_secondes,
            'sujets_proposes', COALESCE(v_row.sujets_proposes, '[]'::JSONB),
            'partner_id', v_partner_id,
            'partner_prenom', COALESCE(v_partner.prenom, 'Partenaire'),
            'partner_photo_floue_url', v_partner.photo_floue_url,
            'room_name', 'blink-date-' || v_row.match_id || '-round-' || v_row.ordre,
            'match_id', v_row.match_id
        );
    END LOOP;

    RETURN v_result;
END;
$$;


-- ────────────────────────────────────────────────────────────
-- RPC 3: submit_blink_date_feedback
-- ────────────────────────────────────────────────────────────
-- Binary feedback: wants_to_continue = true/false.

CREATE OR REPLACE FUNCTION submit_blink_date_feedback(p_blink_date_id UUID, p_wants_to_continue BOOLEAN)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
    v_bd RECORD;
    v_feedback JSONB;
    v_both_submitted BOOLEAN := false;
BEGIN
    -- Get caller
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Not authenticated');
    END IF;

    -- Get blink_date + match info
    SELECT bd.id, bd.match_id, bd.feedback_user_1, bd.feedback_user_2,
           m.user_1_id, m.user_2_id
    INTO v_bd
    FROM blink_dates bd
    JOIN matches m ON m.id = bd.match_id
    WHERE bd.id = p_blink_date_id;

    IF v_bd IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Blink date not found');
    END IF;

    -- Build feedback JSONB
    v_feedback := jsonb_build_object(
        'wants_to_continue', p_wants_to_continue,
        'submitted_at', NOW()
    );

    -- Update the correct feedback column
    IF v_bd.user_1_id = v_user_id THEN
        UPDATE blink_dates SET feedback_user_1 = v_feedback WHERE id = p_blink_date_id;
        -- Check if both submitted
        IF v_bd.feedback_user_2 IS NOT NULL THEN
            v_both_submitted := true;
        END IF;
    ELSIF v_bd.user_2_id = v_user_id THEN
        UPDATE blink_dates SET feedback_user_2 = v_feedback WHERE id = p_blink_date_id;
        -- Check if both submitted
        IF v_bd.feedback_user_1 IS NOT NULL THEN
            v_both_submitted := true;
        END IF;
    ELSE
        RETURN jsonb_build_object('success', false, 'error', 'Not a participant');
    END IF;

    -- If both feedbacks submitted, mark as termine
    IF v_both_submitted THEN
        UPDATE blink_dates SET statut = 'termine' WHERE id = p_blink_date_id;
    END IF;

    RETURN jsonb_build_object('success', true, 'both_submitted', v_both_submitted);
END;
$$;


-- ────────────────────────────────────────────────────────────
-- RPC 4: submit_photo_selections_for_event
-- ────────────────────────────────────────────────────────────
-- User submits array of photo_selection IDs they selected.

CREATE OR REPLACE FUNCTION submit_photo_selections_for_event(p_event_id UUID, p_selections UUID[])
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
    v_count INTEGER;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Not authenticated');
    END IF;

    -- Reset all selections for this user/event
    UPDATE photo_selections
    SET is_selected = false
    WHERE event_id = p_event_id AND selecteur_id = v_user_id;

    -- Set selected ones
    UPDATE photo_selections
    SET is_selected = true
    WHERE event_id = p_event_id
      AND selecteur_id = v_user_id
      AND id = ANY(p_selections);

    GET DIAGNOSTICS v_count = ROW_COUNT;

    RETURN jsonb_build_object('success', true, 'selections_count', v_count);
END;
$$;


-- ────────────────────────────────────────────────────────────
-- RPC 5: resolve_event_matches
-- ────────────────────────────────────────────────────────────
-- Admin resolves all matches for an event.
-- Match confirmed = both said "continue" in at least 1 round
--                   AND both selected each other's photo.

CREATE OR REPLACE FUNCTION resolve_event_matches(p_event_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_match RECORD;
    v_total INTEGER := 0;
    v_confirmed INTEGER := 0;
    v_rejected INTEGER := 0;
    v_confirmed_list JSONB := '[]'::JSONB;
    v_has_positive_feedback_1 BOOLEAN;
    v_has_positive_feedback_2 BOOLEAN;
    v_photo_selected_1 BOOLEAN;
    v_photo_selected_2 BOOLEAN;
BEGIN
    FOR v_match IN
        SELECT m.id AS match_id, m.user_1_id, m.user_2_id, m.score_compatibilite
        FROM matches m
        WHERE m.event_id = p_event_id AND m.statut = 'confirme_mutuel'
    LOOP
        v_total := v_total + 1;

        -- Check feedback: at least one blink_date where user_1 said continue
        SELECT EXISTS(
            SELECT 1 FROM blink_dates bd
            WHERE bd.match_id = v_match.match_id
              AND bd.feedback_user_1 IS NOT NULL
              AND (bd.feedback_user_1->>'wants_to_continue')::boolean = true
        ) INTO v_has_positive_feedback_1;

        -- Check feedback: at least one blink_date where user_2 said continue
        SELECT EXISTS(
            SELECT 1 FROM blink_dates bd
            WHERE bd.match_id = v_match.match_id
              AND bd.feedback_user_2 IS NOT NULL
              AND (bd.feedback_user_2->>'wants_to_continue')::boolean = true
        ) INTO v_has_positive_feedback_2;

        -- Check photo: user_1 selected user_2's photo (non-leurre)
        SELECT EXISTS(
            SELECT 1 FROM photo_selections ps
            WHERE ps.event_id = p_event_id
              AND ps.selecteur_id = v_match.user_1_id
              AND ps.photo_user_id = v_match.user_2_id
              AND ps.is_leurre = false
              AND ps.is_selected = true
        ) INTO v_photo_selected_1;

        -- Check photo: user_2 selected user_1's photo (non-leurre)
        SELECT EXISTS(
            SELECT 1 FROM photo_selections ps
            WHERE ps.event_id = p_event_id
              AND ps.selecteur_id = v_match.user_2_id
              AND ps.photo_user_id = v_match.user_1_id
              AND ps.is_leurre = false
              AND ps.is_selected = true
        ) INTO v_photo_selected_2;

        -- Resolve
        IF v_has_positive_feedback_1 AND v_has_positive_feedback_2
           AND v_photo_selected_1 AND v_photo_selected_2 THEN
            UPDATE matches SET statut = 'termine_positif' WHERE id = v_match.match_id;
            v_confirmed := v_confirmed + 1;
            v_confirmed_list := v_confirmed_list || jsonb_build_object(
                'match_id', v_match.match_id,
                'user_1_id', v_match.user_1_id,
                'user_2_id', v_match.user_2_id,
                'score', v_match.score_compatibilite
            );
        ELSE
            UPDATE matches SET statut = 'termine_negatif' WHERE id = v_match.match_id;
            v_rejected := v_rejected + 1;
        END IF;
    END LOOP;

    RETURN jsonb_build_object(
        'success', true,
        'total_matches', v_total,
        'confirmed_count', v_confirmed,
        'rejected_count', v_rejected,
        'confirmed_matches', v_confirmed_list
    );
END;
$$;


-- ────────────────────────────────────────────────────────────
-- RPC 6: get_user_match_results
-- ────────────────────────────────────────────────────────────
-- Returns final results for a user after event resolution.

CREATE OR REPLACE FUNCTION get_user_match_results(p_event_id UUID, p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_result JSONB := '[]'::JSONB;
    v_row RECORD;
    v_partner_id UUID;
    v_partner RECORD;
BEGIN
    FOR v_row IN
        SELECT m.id AS match_id, m.user_1_id, m.user_2_id,
               m.score_compatibilite, m.statut
        FROM matches m
        WHERE m.event_id = p_event_id
          AND (m.user_1_id = p_user_id OR m.user_2_id = p_user_id)
          AND m.statut IN ('termine_positif', 'termine_negatif')
    LOOP
        -- Determine partner
        IF v_row.user_1_id = p_user_id THEN
            v_partner_id := v_row.user_2_id;
        ELSE
            v_partner_id := v_row.user_1_id;
        END IF;

        -- Get partner info (nette photo for confirmed matches)
        SELECT prenom, photo_nette_url, photo_floue_url INTO v_partner
        FROM profiles WHERE id = v_partner_id;

        v_result := v_result || jsonb_build_object(
            'match_id', v_row.match_id,
            'partner_prenom', COALESCE(v_partner.prenom, 'Partenaire'),
            'partner_photo_nette_url', CASE
                WHEN v_row.statut = 'termine_positif' THEN v_partner.photo_nette_url
                ELSE NULL
            END,
            'score_compatibilite', v_row.score_compatibilite,
            'is_confirmed', v_row.statut = 'termine_positif'
        );
    END LOOP;

    RETURN v_result;
END;
$$;


-- ============================================================
-- SECURITY HARDENING: REVOKE public access on all 6 RPCs
-- ============================================================
-- prepare_blink_date_event: admin-only (called from admin panel)
REVOKE EXECUTE ON FUNCTION prepare_blink_date_event(UUID) FROM public, anon;
GRANT EXECUTE ON FUNCTION prepare_blink_date_event(UUID) TO authenticated;

-- get_user_blink_dates_for_event: authenticated users
REVOKE EXECUTE ON FUNCTION get_user_blink_dates_for_event(UUID, UUID) FROM public, anon;
GRANT EXECUTE ON FUNCTION get_user_blink_dates_for_event(UUID, UUID) TO authenticated;

-- submit_blink_date_feedback: authenticated users (uses auth.uid())
REVOKE EXECUTE ON FUNCTION submit_blink_date_feedback(UUID, BOOLEAN) FROM public, anon;
GRANT EXECUTE ON FUNCTION submit_blink_date_feedback(UUID, BOOLEAN) TO authenticated;

-- submit_photo_selections_for_event: authenticated users (uses auth.uid())
REVOKE EXECUTE ON FUNCTION submit_photo_selections_for_event(UUID, UUID[]) FROM public, anon;
GRANT EXECUTE ON FUNCTION submit_photo_selections_for_event(UUID, UUID[]) TO authenticated;

-- resolve_event_matches: admin-only (called from admin panel)
REVOKE EXECUTE ON FUNCTION resolve_event_matches(UUID) FROM public, anon;
GRANT EXECUTE ON FUNCTION resolve_event_matches(UUID) TO authenticated;

-- get_user_match_results: authenticated users
REVOKE EXECUTE ON FUNCTION get_user_match_results(UUID, UUID) FROM public, anon;
GRANT EXECUTE ON FUNCTION get_user_match_results(UUID, UUID) TO authenticated;
