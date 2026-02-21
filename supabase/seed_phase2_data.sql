-- =====================================================================================
--  MY MUQABALA -- SEED PHASE 2 : Test data for all Phase 2 features
--  Prerequisite: seed_test_data.sql already executed (100 profiles + 2000 responses)
--                matching_algorithm.sql already executed (functions exist)
--
--  This script populates:
--    1. Matching results (via run_matching_algorithm)
--    2. Event participants (60 registered to test event)
--    3. Blink dates (3 rounds per match, status 'termine')
--    4. Coach documents (20 documents: 10 compte_rendu + 5 analyse + 5 preparation)
--    5. Notifications (50 varied, 6 types)
--    6. Photo selections (for first 10 matches: 2 real + 3 leurres each)
--    7. Feedback forms (15 post_blink_date with actual user_ids)
--    8. Profile status diversification (35 profiles moved to various phases)
--    9. Two new future events (matching + coaching_groupe)
--
--  Execute in Supabase SQL Editor after seed_test_data.sql
-- =====================================================================================

BEGIN;


-- =====================================================================================
-- 1. RUN MATCHING on the test event
-- =====================================================================================
-- This calls the matching algorithm which:
--   - Finds all eligible profiles in matching_pool with 20 attachment responses
--   - Computes compatibility scores for all F x M pairs
--   - Creates match rows for pairs scoring >= 45%
--   - Max 3 matches per person, prioritizing high_ticket users
-- =====================================================================================

SELECT run_matching_algorithm('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID);


-- =====================================================================================
-- 2. REGISTER 60 PARTICIPANTS to the test event
-- =====================================================================================
-- Register the first 60 participants (by creation order) as 'present'.
-- This simulates an event where 60 out of 100 profiles showed up.
-- =====================================================================================

INSERT INTO event_participants (event_id, user_id, statut, role_evenement)
SELECT
    'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID,
    p.id,
    'present',
    'participant'
FROM profiles p
WHERE p.role = 'participant'
ORDER BY p.created_at
LIMIT 60
ON CONFLICT (event_id, user_id) DO NOTHING;


-- =====================================================================================
-- 3. CREATE BLINK DATES (3 rounds per match, status 'termine')
-- =====================================================================================
-- Each match gets 3 Blink Date rounds of 10 minutes (600 seconds).
-- Conversation topics are realistic French prompts with Islamic context.
-- All dates are marked 'termine' (completed) for testing the feedback flow.
-- =====================================================================================

INSERT INTO blink_dates (match_id, event_id, ordre, duree_secondes, sujets_proposes, statut, date_debut, date_fin)
SELECT
    m.id,
    m.event_id,
    g.ordre,
    600,
    CASE g.ordre
        WHEN 1 THEN '["Parle-moi de ta relation avec ta famille", "Qu''est-ce qui te rend heureux(se) au quotidien ?"]'::jsonb
        WHEN 2 THEN '["Comment geres-tu les desaccords ?", "Quelle est ta vision du mariage en islam ?"]'::jsonb
        WHEN 3 THEN '["Quelles sont tes valeurs les plus importantes ?", "Comment vois-tu ton role dans un couple ?"]'::jsonb
    END,
    'termine',
    -- Simulate realistic timestamps: event happened 2 days ago
    NOW() - INTERVAL '2 days' + (g.ordre - 1) * INTERVAL '15 minutes',
    NOW() - INTERVAL '2 days' + (g.ordre - 1) * INTERVAL '15 minutes' + INTERVAL '10 minutes'
FROM matches m
CROSS JOIN generate_series(1, 3) AS g(ordre)
WHERE m.event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID;


-- =====================================================================================
-- 4. CREATE COACH DOCUMENTS (20 documents of varied types)
-- =====================================================================================
-- Distribution:
--   10 x compte_rendu_matching (post-matching reports)
--    5 x analyse_compatibilite (compatibility analysis)
--    5 x preparation_audio     (audio preparation guides)
--
-- Content uses realistic French HTML with Islamic greetings (Bismillah,
-- incha'Allah, barakAllahou fiki/fik). Some are published, some not.
-- =====================================================================================

-- 4a. 10 x compte_rendu_matching (one per match, for user_1)
INSERT INTO coach_documents (destinataire_id, match_id, type_document, titre, contenu_html, is_read, published_at)
SELECT
    m.user_1_id,
    m.id,
    'compte_rendu_matching',
    'Compte-rendu de votre matching #' || ROW_NUMBER() OVER (ORDER BY m.created_at),
    '<div class="compte-rendu">
  <h1>Bismillah ar-Rahman ar-Rahim</h1>
  <h2>Compte-rendu de votre matching</h2>
  <p>As-salamu alaykum,</p>
  <p>Voici le compte-rendu detaille de votre session de matching lors de l''evenement
  <strong>Evenement Test Matching #1</strong>.</p>
  <h3>Resume de la compatibilite</h3>
  <p>Votre score de compatibilite avec votre partenaire est de <strong>' || m.score_compatibilite || '%</strong>.
  Ce score reflete l''analyse de vos styles d''attachement respectifs et de vos reponses au questionnaire.</p>
  <h3>Points forts identifies</h3>
  <ul>
    <li>Valeurs familiales partagees</li>
    <li>Vision commune du role de la spiritualite dans le couple</li>
    <li>Complementarite dans la gestion des emotions</li>
  </ul>
  <h3>Points d''attention</h3>
  <ul>
    <li>Differences dans le style de communication a explorer</li>
    <li>Attentes differentes concernant le rythme de la relation</li>
  </ul>
  <h3>Recommandations du coach</h3>
  <p>Incha''Allah, je vous recommande de prendre le temps d''echanger sur vos attentes mutuelles
  lors de la phase de decouverte. N''hesitez pas a etre authentique et a poser des questions ouvertes.</p>
  <p>BarakAllahou fik(i) pour votre confiance.</p>
  <p><em>Votre coach, equipe My Muqabala</em></p>
</div>',
    -- First 5 are read, last 5 are unread
    CASE WHEN ROW_NUMBER() OVER (ORDER BY m.created_at) <= 5 THEN TRUE ELSE FALSE END,
    -- First 7 are published, last 3 are not yet
    CASE WHEN ROW_NUMBER() OVER (ORDER BY m.created_at) <= 7 THEN NOW() - INTERVAL '1 day' ELSE NULL END
FROM matches m
WHERE m.event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID
ORDER BY m.created_at
LIMIT 10;


-- 4b. 5 x analyse_compatibilite (for user_2 of first 5 matches)
INSERT INTO coach_documents (destinataire_id, match_id, type_document, titre, contenu_html, is_read, published_at)
SELECT
    m.user_2_id,
    m.id,
    'analyse_compatibilite',
    'Analyse de compatibilite - Votre profil d''attachement',
    '<div class="analyse-compatibilite">
  <h1>Bismillah ar-Rahman ar-Rahim</h1>
  <h2>Analyse detaillee de votre compatibilite</h2>
  <p>As-salamu alaykum,</p>
  <p>Suite a votre participation a l''evenement de matching, voici une analyse approfondie
  de votre compatibilite avec votre partenaire.</p>
  <h3>Votre style d''attachement</h3>
  <p>D''apres vos reponses au questionnaire ECR-R, votre profil d''attachement
  revele les tendances suivantes :</p>
  <ul>
    <li><strong>Dimension anxiete :</strong> Votre score indique une gestion equilibree
    de l''anxiete relationnelle, ma cha Allah.</li>
    <li><strong>Dimension evitement :</strong> Vous montrez une capacite a vous ouvrir
    emotionnellement tout en preservant des limites saines.</li>
  </ul>
  <h3>Dynamique du couple</h3>
  <p>La combinaison de vos deux profils d''attachement cree une dynamique interessante.
  Votre score de <strong>' || m.score_compatibilite || '%</strong> reflete un potentiel
  de complementarite que nous allons explorer ensemble incha''Allah.</p>
  <h3>Prochaines etapes</h3>
  <p>Je vous invite a lire attentivement ce document avant votre prochaine session
  de decouverte. Prenez note des points qui resonnent avec vous et preparez
  quelques questions pour votre partenaire.</p>
  <p>Qu''Allah mette la baraka dans votre demarche.</p>
  <p><em>Votre coach, equipe My Muqabala</em></p>
</div>',
    FALSE,
    NOW() - INTERVAL '12 hours'
FROM matches m
WHERE m.event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID
ORDER BY m.created_at
LIMIT 5;


-- 4c. 5 x preparation_audio (for user_1 of matches 6-10)
INSERT INTO coach_documents (destinataire_id, match_id, type_document, titre, contenu_html, is_read, published_at)
SELECT
    sub.user_1_id,
    sub.id,
    'preparation_audio',
    'Guide de preparation - Votre prochain echange audio',
    '<div class="preparation-audio">
  <h1>Bismillah ar-Rahman ar-Rahim</h1>
  <h2>Preparation pour votre echange audio</h2>
  <p>As-salamu alaykum,</p>
  <p>Votre prochaine etape dans le parcours My Muqabala est un echange audio
  avec votre partenaire. Voici comment vous y preparer au mieux incha''Allah.</p>
  <h3>Conseils avant l''echange</h3>
  <ol>
    <li><strong>Trouvez un endroit calme</strong> ou vous ne serez pas derange(e).</li>
    <li><strong>Faites une doua</strong> avant de commencer pour mettre votre coeur
    dans les meilleures dispositions.</li>
    <li><strong>Preparez 2-3 sujets</strong> que vous aimeriez aborder.</li>
    <li><strong>Soyez authentique</strong> - votre partenaire appreciera votre sincerite.</li>
  </ol>
  <h3>Sujets suggeres</h3>
  <ul>
    <li>Votre rapport a la priere et a la spiritualite au quotidien</li>
    <li>Vos projets professionnels et personnels</li>
    <li>Votre vision de la vie de famille</li>
    <li>Ce qui vous fait rire et vous detend</li>
  </ul>
  <h3>Rappel important</h3>
  <p>L''echange se deroule sous la supervision du coach (Mahram numerique).
  Le respect et la bienveillance sont au coeur de notre demarche.</p>
  <p>Qu''Allah facilite cette etape pour vous.</p>
  <p><em>Votre coach, equipe My Muqabala</em></p>
</div>',
    FALSE,
    NOW() - INTERVAL '6 hours'
FROM (
    SELECT m.id, m.user_1_id, m.created_at
    FROM matches m
    WHERE m.event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID
    ORDER BY m.created_at
    OFFSET 5
    LIMIT 5
) sub;


-- =====================================================================================
-- 5. CREATE NOTIFICATIONS (50 varied, distributed across 6 types)
-- =====================================================================================
-- Types:
--   document_disponible  (12) - new coach document available
--   rappel_evenement     (10) - upcoming event reminder
--   match_statut         (10) - match status change
--   rappel_questionnaire  (8) - complete your questionnaire
--   blink_date_termine    (5) - blink date session completed
--   systeme              (5)  - system announcements
-- =====================================================================================

-- 5a. 12 x document_disponible notifications
INSERT INTO notifications (user_id, type, titre, corps, data, is_read)
SELECT
    p.id,
    'document_disponible',
    'Nouveau document disponible',
    'Votre coach a publie un nouveau document pour vous. Consultez-le dans votre espace personnel incha''Allah.',
    jsonb_build_object(
        'route_path', '/documents',
        'type', 'coach_document'
    ),
    CASE WHEN ROW_NUMBER() OVER (ORDER BY p.created_at) <= 4 THEN TRUE ELSE FALSE END
FROM profiles p
WHERE p.role = 'participant'
ORDER BY p.created_at
LIMIT 12;


-- 5b. 10 x rappel_evenement notifications
INSERT INTO notifications (user_id, type, titre, corps, data, is_read)
SELECT
    p.id,
    'rappel_evenement',
    'Rappel : Evenement dans 24h',
    'As-salamu alaykum ! N''oubliez pas votre evenement de matching demain. Soyez pret(e) a l''heure incha''Allah.',
    jsonb_build_object(
        'route_path', '/events/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        'type', 'event_reminder',
        'event_id', 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
    ),
    FALSE
FROM profiles p
WHERE p.role = 'participant'
ORDER BY p.created_at
OFFSET 10
LIMIT 10;


-- 5c. 10 x match_statut notifications
INSERT INTO notifications (user_id, type, titre, corps, data, is_read)
SELECT
    m.user_1_id,
    'match_statut',
    'Votre matching a ete valide !',
    'Al-hamdulillah, votre matching a ete valide par le coach. Decouvrez votre partenaire et commencez la phase de decouverte.',
    jsonb_build_object(
        'route_path', '/matches/' || m.id::text,
        'type', 'match_update',
        'match_id', m.id::text
    ),
    CASE WHEN ROW_NUMBER() OVER (ORDER BY m.created_at) <= 3 THEN TRUE ELSE FALSE END
FROM matches m
WHERE m.event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID
ORDER BY m.created_at
LIMIT 10;


-- 5d. 8 x rappel_questionnaire notifications
INSERT INTO notifications (user_id, type, titre, corps, data, is_read)
SELECT
    p.id,
    'rappel_questionnaire',
    'Completez votre questionnaire',
    'Votre questionnaire de compatibilite est en attente. Prenez quelques minutes pour le terminer afin que nous puissions vous proposer les meilleurs matchings incha''Allah.',
    jsonb_build_object(
        'route_path', '/questionnaire',
        'type', 'questionnaire_reminder'
    ),
    FALSE
FROM profiles p
WHERE p.role = 'participant'
ORDER BY p.created_at
OFFSET 20
LIMIT 8;


-- 5e. 5 x blink_date_termine notifications
INSERT INTO notifications (user_id, type, titre, corps, data, is_read)
SELECT
    m.user_2_id,
    'blink_date_termine',
    'Votre Blink Date est termine',
    'Votre session de Blink Date s''est bien deroulee, ma cha Allah. N''oubliez pas de remplir votre formulaire de ressenti.',
    jsonb_build_object(
        'route_path', '/feedback',
        'type', 'blink_date_complete',
        'match_id', m.id::text
    ),
    FALSE
FROM matches m
WHERE m.event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID
ORDER BY m.created_at
LIMIT 5;


-- 5f. 5 x systeme notifications (broadcast to first 5 participants)
INSERT INTO notifications (user_id, type, titre, corps, data, is_read)
SELECT
    p.id,
    'systeme',
    'Bienvenue sur My Muqabala !',
    'As-salamu alaykum ! Bienvenue dans votre espace My Muqabala. Nous sommes honores de vous accompagner dans cette belle demarche. Qu''Allah mette la baraka dans votre recherche.',
    jsonb_build_object(
        'route_path', '/home',
        'type', 'welcome'
    ),
    TRUE
FROM profiles p
WHERE p.role = 'participant'
ORDER BY p.created_at
LIMIT 5;


-- =====================================================================================
-- 6. CREATE PHOTO SELECTIONS (for first 10 matches)
-- =====================================================================================
-- For each of the first 10 matches:
--   - selecteur_id = user_1_id (the one selecting)
--   - 2 real photos (is_leurre = FALSE): the match partner + one other real person
--   - 3 leurre photos (is_leurre = TRUE): random other participants
--   - 1 of the 5 is selected (the real match partner)
--
-- We use a DO block to properly handle the cross-references.
-- =====================================================================================

DO $$
DECLARE
    v_match RECORD;
    v_leurre_ids UUID[];
    v_extra_real_id UUID;
    v_match_count INT := 0;
BEGIN
    FOR v_match IN (
        SELECT m.id AS match_id, m.user_1_id, m.user_2_id, m.event_id
        FROM matches m
        WHERE m.event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID
        ORDER BY m.created_at
        LIMIT 10
    ) LOOP
        v_match_count := v_match_count + 1;

        -- Get one extra real (non-leurre) participant of same genre as user_2
        SELECT p.id INTO v_extra_real_id
        FROM profiles p
        WHERE p.id != v_match.user_1_id
          AND p.id != v_match.user_2_id
          AND p.role = 'participant'
          AND p.genre = (SELECT genre FROM profiles WHERE id = v_match.user_2_id)
        ORDER BY random()
        LIMIT 1;

        -- Get 3 leurre participants (same genre as user_2, different from real photos)
        SELECT ARRAY_AGG(p.id) INTO v_leurre_ids
        FROM (
            SELECT p2.id
            FROM profiles p2
            WHERE p2.id != v_match.user_1_id
              AND p2.id != v_match.user_2_id
              AND p2.id != v_extra_real_id
              AND p2.role = 'participant'
              AND p2.genre = (SELECT genre FROM profiles WHERE id = v_match.user_2_id)
            ORDER BY random()
            LIMIT 3
        ) p;

        -- Insert the real match partner photo (selected = TRUE -- they found them!)
        INSERT INTO photo_selections (event_id, selecteur_id, photo_user_id, is_leurre, is_selected)
        VALUES (v_match.event_id, v_match.user_1_id, v_match.user_2_id, FALSE, TRUE);

        -- Insert the extra real photo (selected = FALSE)
        IF v_extra_real_id IS NOT NULL THEN
            INSERT INTO photo_selections (event_id, selecteur_id, photo_user_id, is_leurre, is_selected)
            VALUES (v_match.event_id, v_match.user_1_id, v_extra_real_id, FALSE, FALSE);
        END IF;

        -- Insert 3 leurre photos (selected = FALSE)
        IF v_leurre_ids IS NOT NULL THEN
            INSERT INTO photo_selections (event_id, selecteur_id, photo_user_id, is_leurre, is_selected)
            SELECT v_match.event_id, v_match.user_1_id, unnest(v_leurre_ids), TRUE, FALSE;
        END IF;
    END LOOP;

    RAISE NOTICE 'Photo selections created for % matches', v_match_count;
END;
$$;


-- =====================================================================================
-- 7. CREATE FEEDBACK FORMS (15 post_blink_date)
-- =====================================================================================
-- IMPORTANT FIX: Uses m.user_1_id (actual user UUID) instead of bd.match_id::text
-- which was the bug in the original plan.
--
-- We take feedback for the first round (ordre = 1) of the first 15 matches.
-- Ratings range from 3-5, with 70% wanting to meet again.
-- =====================================================================================

INSERT INTO feedback_forms (user_id, match_id, event_id, type_formulaire, reponses)
SELECT
    m.user_1_id,
    m.id,
    bd.event_id,
    'post_blink_date',
    jsonb_build_object(
        'rating', (3 + floor(random() * 3))::int,
        'want_to_meet_again', CASE WHEN random() > 0.3 THEN 'oui' ELSE 'non' END,
        'comment', CASE (floor(random() * 5))::int
            WHEN 0 THEN 'Ma cha Allah, echange tres enrichissant. J''ai senti une vraie sincerite.'
            WHEN 1 THEN 'Echange agreable, on a des points communs sur la vision de la famille.'
            WHEN 2 THEN 'Al-hamdulillah, bonne premiere impression. J''aimerais en savoir plus.'
            WHEN 3 THEN 'Personne respectueuse et bien elevee. Le cadre etait rassurant.'
            WHEN 4 THEN 'Conversation fluide et naturelle. J''ai apprecie son authenticite.'
        END,
        'blink_date_ordre', bd.ordre
    )
FROM blink_dates bd
JOIN matches m ON m.id = bd.match_id
WHERE bd.event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID
  AND bd.ordre = 1
ORDER BY bd.created_at
LIMIT 15;


-- =====================================================================================
-- 8. UPDATE PROFILE STATUSES (diversify for testing UI states)
-- =====================================================================================
-- Move profiles out of 'matching_pool' to test different UI states:
--   20 -> phase_1_matching  (actively in matching process)
--   10 -> phase_2_decouverte (discovery phase with a match)
--    5 -> phase_3_approfondie (deeper exploration phase)
--
-- We target profiles that have matches to make the status coherent.
-- =====================================================================================

-- 8a. 20 profiles -> phase_1_matching (profiles involved in matches)
UPDATE profiles
SET statut_parcours = 'phase_1_matching'
WHERE id IN (
    SELECT DISTINCT user_id FROM (
        SELECT user_1_id AS user_id FROM matches
        WHERE event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID
        UNION ALL
        SELECT user_2_id AS user_id FROM matches
        WHERE event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID
    ) matched_users
    LIMIT 20
);

-- 8b. 10 profiles -> phase_2_decouverte (from phase_1 profiles that have feedback)
UPDATE profiles
SET statut_parcours = 'phase_2_decouverte'
WHERE id IN (
    SELECT DISTINCT ff.user_id
    FROM feedback_forms ff
    WHERE ff.type_formulaire = 'post_blink_date'
    LIMIT 10
);

-- 8c. 5 profiles -> phase_3_approfondie (from phase_2 profiles with high ratings)
UPDATE profiles
SET statut_parcours = 'phase_3_approfondie'
WHERE id IN (
    SELECT ff.user_id
    FROM feedback_forms ff
    WHERE ff.type_formulaire = 'post_blink_date'
      AND (ff.reponses->>'rating')::int >= 4
      AND ff.reponses->>'want_to_meet_again' = 'oui'
    LIMIT 5
);

-- Also update some matches to reflect status progression
UPDATE matches
SET statut = 'valide_coach'
WHERE event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID
  AND id IN (
    SELECT id FROM matches
    WHERE event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID
    ORDER BY score_compatibilite DESC
    LIMIT 15
);

UPDATE matches
SET statut = 'phase_2'
WHERE event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID
  AND id IN (
    SELECT id FROM matches
    WHERE event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID
    ORDER BY score_compatibilite DESC
    LIMIT 8
);

UPDATE matches
SET statut = 'phase_3'
WHERE event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID
  AND id IN (
    SELECT id FROM matches
    WHERE event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID
    ORDER BY score_compatibilite DESC
    LIMIT 3
);


-- =====================================================================================
-- 9. CREATE 2 NEW FUTURE EVENTS
-- =====================================================================================
-- Event A: 'matching' event in 14 days, in-person in Paris
-- Event B: 'coaching_groupe' event in 7 days, online via Zoom
-- =====================================================================================

-- 9a. Matching event in Paris, 14 days from now
INSERT INTO events (titre, description, date_evenement, type, statut, max_participants, config)
VALUES (
    'Soiree Matching Paris - Mars 2026',
    'As-salamu alaykum ! Rejoignez-nous pour une soiree de matching a Paris. '
    || 'Trois rounds de Blink Dates de 10 minutes chacun, suivis d''une selection de photos. '
    || 'Tenue correcte exigee. Hommes et femmes dans des espaces separes avec communication audio uniquement. '
    || 'Qu''Allah mette la baraka dans cette rencontre.',
    NOW() + INTERVAL '14 days',
    'matching',
    'planifie',
    40,
    jsonb_build_object(
        'lieu', 'Espace Evenementiel Le Lumiere, 25 rue de Rivoli, 75004 Paris',
        'blink_date_count', 3,
        'timer_seconds', 600,
        'photo_selection_enabled', true,
        'max_matches_per_person', 3,
        'dress_code', 'Tenue correcte et pudique',
        'horaires', jsonb_build_object(
            'accueil', '18h30',
            'debut', '19h00',
            'fin_estimee', '22h00'
        )
    )
);

-- 9b. Coaching groupe online, 7 days from now
INSERT INTO events (titre, description, date_evenement, type, statut, max_participants, config)
VALUES (
    'Atelier Coaching Groupe - Communication dans le couple',
    'Bismillah, cet atelier en ligne abordera les fondements d''une communication saine '
    || 'dans le couple selon une approche islamique et psychologique. '
    || 'Themes : ecoute active, expression des besoins, gestion des desaccords avec respect. '
    || 'Anime par notre coach certifie(e). Hommes et femmes en sessions separees.',
    NOW() + INTERVAL '7 days',
    'coaching_groupe',
    'planifie',
    25,
    jsonb_build_object(
        'lieu', 'En ligne - Zoom',
        'zoom_url', 'https://zoom.us/j/12345678901?pwd=AbCdEfGhIjKlMnOpQrStUv',
        'zoom_meeting_id', '123 4567 8901',
        'zoom_password', 'muqabala2026',
        'duree_minutes', 90,
        'intervenant', 'Coach Nadia Alaoui',
        'prerequis', 'Avoir complete le questionnaire d''attachement',
        'horaires', jsonb_build_object(
            'session_femmes', '14h00 - 15h30',
            'session_hommes', '16h00 - 17h30'
        )
    )
);

-- Register 15 participants to the coaching event
INSERT INTO event_participants (event_id, user_id, statut, role_evenement)
SELECT
    e.id,
    p.id,
    'inscrit',
    'participant'
FROM events e
CROSS JOIN LATERAL (
    SELECT p2.id
    FROM profiles p2
    WHERE p2.role = 'participant'
    ORDER BY p2.created_at
    OFFSET 30
    LIMIT 15
) p
WHERE e.titre = 'Atelier Coaching Groupe - Communication dans le couple'
ON CONFLICT (event_id, user_id) DO NOTHING;


COMMIT;


-- =====================================================================================
-- VERIFICATION QUERIES (run separately after seed)
-- =====================================================================================
-- -- 1. Matches created
-- SELECT count(*) AS total_matches,
--        avg(score_compatibilite)::numeric(5,2) AS avg_score,
--        min(score_compatibilite) AS min_score,
--        max(score_compatibilite) AS max_score
-- FROM matches WHERE event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
--
-- -- 2. Event participants
-- SELECT statut, count(*) FROM event_participants
-- WHERE event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
-- GROUP BY statut;
--
-- -- 3. Blink dates
-- SELECT statut, count(*) FROM blink_dates
-- WHERE event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
-- GROUP BY statut;
--
-- -- 4. Coach documents by type
-- SELECT type_document, count(*), count(*) FILTER (WHERE published_at IS NOT NULL) AS published
-- FROM coach_documents GROUP BY type_document;
--
-- -- 5. Notifications by type
-- SELECT type, count(*), count(*) FILTER (WHERE is_read) AS read_count
-- FROM notifications GROUP BY type ORDER BY count(*) DESC;
--
-- -- 6. Photo selections
-- SELECT count(*) AS total_photos,
--        count(*) FILTER (WHERE is_leurre) AS leurres,
--        count(*) FILTER (WHERE NOT is_leurre) AS real_photos,
--        count(*) FILTER (WHERE is_selected) AS selected
-- FROM photo_selections;
--
-- -- 7. Feedback forms
-- SELECT type_formulaire, count(*),
--        avg((reponses->>'rating')::int)::numeric(3,1) AS avg_rating
-- FROM feedback_forms GROUP BY type_formulaire;
--
-- -- 8. Profile status distribution
-- SELECT statut_parcours, count(*) FROM profiles
-- WHERE role = 'participant' GROUP BY statut_parcours ORDER BY count(*) DESC;
--
-- -- 9. Events overview
-- SELECT titre, type, statut, date_evenement, max_participants,
--        (SELECT count(*) FROM event_participants ep WHERE ep.event_id = e.id) AS registered
-- FROM events e ORDER BY date_evenement;
--
-- -- 10. Match status distribution
-- SELECT statut, count(*) FROM matches
-- WHERE event_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
-- GROUP BY statut ORDER BY count(*) DESC;
-- =====================================================================================
