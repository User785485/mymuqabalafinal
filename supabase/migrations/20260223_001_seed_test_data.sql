-- =====================================================================================
--  MY MUQABALA — SEED TEST DATA
--  100 profils test (50F + 50H) avec réponses questionnaire attachement
--
--  Distribution:
--    Secure (40%):  20F + 20H = 40
--    Anxious (25%): 13F + 12H = 25
--    Avoidant (25%): 12F + 13H = 25
--    Fearful (10%):  5F + 5H  = 10
--
--  High Ticket (10%): 5F + 5H (indices 0-4)
--
--  Execute in Supabase SQL Editor
-- =====================================================================================

-- Enable pgcrypto for crypt() and gen_salt()
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- Wrap everything in a transaction
BEGIN;

-- ============================================================
-- Helper function to generate questionnaire responses
-- ============================================================
CREATE OR REPLACE FUNCTION _seed_generate_responses(
    p_user_id UUID,
    p_anxiety_target NUMERIC,
    p_avoidance_target NUMERIC,
    p_deviation NUMERIC
) RETURNS void
LANGUAGE plpgsql AS $$
DECLARE
    v_question_id INT;
    v_target NUMERIC;
    v_raw_value INT;
    v_rand NUMERIC;
BEGIN
    FOR v_question_id IN 1..20 LOOP
        -- Determine target based on dimension
        IF v_question_id <= 10 THEN
            v_target := p_anxiety_target;
        ELSE
            v_target := p_avoidance_target;
        END IF;

        -- For inverse items, invert the target
        IF v_question_id IN (5, 9, 12, 15, 19) THEN
            v_target := 6.0 - v_target;
        END IF;

        -- Generate random value around target
        v_rand := (random() * 2 - 1) * p_deviation;
        v_raw_value := ROUND(v_target + v_rand)::INT;

        -- Clamp to 1-5
        v_raw_value := GREATEST(1, LEAST(5, v_raw_value));

        INSERT INTO questionnaire_responses (user_id, question_id, categorie, reponse)
        VALUES (p_user_id, v_question_id, 'attachement', jsonb_build_object('value', v_raw_value))
        ON CONFLICT (user_id, question_id) DO UPDATE SET reponse = EXCLUDED.reponse;
    END LOOP;
END;
$$;

-- ============================================================
-- Generate 100 test users
-- ============================================================

DO $$
DECLARE
    v_user_id UUID;
    v_phone TEXT;
    v_email TEXT;
    v_index INT := 0;
    v_genre TEXT;
    v_prenom TEXT;
    v_nom TEXT;
    v_ville TEXT;
    v_is_high_ticket BOOLEAN;
    v_nb_events INT;
    v_style TEXT;
    v_anxiety_target NUMERIC;
    v_avoidance_target NUMERIC;
    v_deviation NUMERIC;

    -- Female first names (50)
    v_prenoms_f TEXT[] := ARRAY[
        'Fatima', 'Amina', 'Khadija', 'Maryam', 'Aisha',
        'Nour', 'Yasmine', 'Sara', 'Leila', 'Hana',
        'Zahra', 'Rania', 'Inès', 'Samira', 'Hafsa',
        'Dina', 'Lina', 'Salma', 'Malika', 'Imane',
        'Safiya', 'Houda', 'Meriem', 'Djamila', 'Souad',
        'Asma', 'Nawal', 'Warda', 'Fadila', 'Lamia',
        'Siham', 'Latifa', 'Habiba', 'Soumaya', 'Farida',
        'Karima', 'Zainab', 'Mounia', 'Rachida', 'Aïcha',
        'Nabila', 'Sana', 'Wahiba', 'Noura', 'Rim',
        'Loubna', 'Ikram', 'Chaïma', 'Nesrine', 'Sabrina'
    ];

    -- Male first names (50)
    v_prenoms_m TEXT[] := ARRAY[
        'Mohamed', 'Ahmed', 'Youssef', 'Ibrahim', 'Omar',
        'Ali', 'Hassan', 'Bilal', 'Amine', 'Karim',
        'Réda', 'Mehdi', 'Samir', 'Tarek', 'Nabil',
        'Hamza', 'Rachid', 'Mourad', 'Sofiane', 'Khalid',
        'Farès', 'Ilyas', 'Zakaria', 'Walid', 'Adel',
        'Sélim', 'Nassim', 'Anis', 'Fouad', 'Jamal',
        'Driss', 'Hakim', 'Brahim', 'Idris', 'Sami',
        'Riad', 'Farid', 'Mounir', 'Aziz', 'Othmane',
        'Yassine', 'Ayoub', 'Ismaïl', 'Hicham', 'Kamel',
        'Lotfi', 'Nadir', 'Saad', 'Slim', 'Toufik'
    ];

    -- Last names (20, cycled)
    v_noms TEXT[] := ARRAY[
        'Benali', 'El Amrani', 'Bouhali', 'Meziane', 'Saïdi',
        'Berrada', 'Chaoui', 'Khelifi', 'Bouzid', 'Hamidi',
        'Rifi', 'Tahiri', 'Ziani', 'Alaoui', 'Fassi',
        'Idrissi', 'Bennani', 'El Harti', 'Lahlou', 'Mansouri'
    ];

    -- Cities (cycled)
    v_villes TEXT[] := ARRAY[
        'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux',
        'Lille', 'Strasbourg', 'Casablanca', 'Rabat'
    ];

    -- Style distribution for women:
    -- 0-19: Secure (20), 20-32: Anxious (13), 33-44: Avoidant (12), 45-49: Fearful (5)
    -- Style distribution for men:
    -- 0-19: Secure (20), 20-31: Anxious (12), 32-44: Avoidant (13), 45-49: Fearful (5)

    -- nb_events distribution (applied across all 100):
    -- 0 events: 60, 1: 15, 2: 10, 3: 8, 4: 5, 5: 2
    v_nb_events_dist INT[] := ARRAY[
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        2,2,2,2,2,2,2,2,2,2,
        3,3,3,3,3,3,3,3,
        4,4,4,4,4,
        5,5
    ];

BEGIN
    -- ── CREATE 50 WOMEN ──
    FOR i IN 0..49 LOOP
        v_user_id := gen_random_uuid();
        v_genre := 'femme';
        v_prenom := v_prenoms_f[i + 1];
        v_nom := v_noms[(i % 20) + 1];
        v_ville := v_villes[(i % 9) + 1];
        v_phone := '+336' || LPAD((10000000 + i)::TEXT, 8, '0');
        v_is_high_ticket := (i < 5); -- first 5 are high ticket
        v_nb_events := v_nb_events_dist[(i % 100) + 1];

        -- Determine attachment style
        IF i < 20 THEN
            v_style := 'secure';
            v_anxiety_target := 2.0; v_avoidance_target := 1.8; v_deviation := 1.0;
        ELSIF i < 33 THEN
            v_style := 'anxious';
            v_anxiety_target := 4.0; v_avoidance_target := 2.0; v_deviation := 0.8;
        ELSIF i < 45 THEN
            v_style := 'avoidant';
            v_anxiety_target := 2.0; v_avoidance_target := 4.0; v_deviation := 0.8;
        ELSE
            v_style := 'fearful';
            v_anxiety_target := 3.8; v_avoidance_target := 3.8; v_deviation := 0.8;
        END IF;

        -- Insert auth user (Supabase SQL Editor allows this)
        -- Email derived from phone: +33610000000 → 33610000000@mymuqabala.app
        v_email := REPLACE(v_phone, '+', '') || '@mymuqabala.app';
        INSERT INTO auth.users (
            id, instance_id, aud, role,
            email, phone, encrypted_password, email_confirmed_at, phone_confirmed_at,
            created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
        ) VALUES (
            v_user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
            v_email, v_phone, extensions.crypt('TestPass123', extensions.gen_salt('bf')), NOW(), NOW(),
            NOW(), NOW(), '', '', '', ''
        ) ON CONFLICT (id) DO NOTHING;

        -- Insert profile
        INSERT INTO profiles (
            id, prenom, nom, telephone, genre, date_naissance, ville,
            role, statut_parcours, is_high_ticket, nb_events_participes,
            metadata
        ) VALUES (
            v_user_id, v_prenom, v_nom, v_phone, v_genre,
            ('1990-01-01'::DATE + (random() * 3650)::INT),
            v_ville, 'participant', 'matching_pool',
            v_is_high_ticket, v_nb_events,
            jsonb_build_object('generated_password', 'TestPass123', 'test_profile', true, 'attachment_style', v_style)
        ) ON CONFLICT (id) DO NOTHING;

        -- Generate questionnaire responses
        PERFORM _seed_generate_responses(v_user_id, v_anxiety_target, v_avoidance_target, v_deviation);

        v_index := v_index + 1;
    END LOOP;

    -- ── CREATE 50 MEN ──
    FOR i IN 0..49 LOOP
        v_user_id := gen_random_uuid();
        v_genre := 'homme';
        v_prenom := v_prenoms_m[i + 1];
        v_nom := v_noms[(i % 20) + 1];
        v_ville := v_villes[(i % 9) + 1];
        v_phone := '+337' || LPAD((10000000 + i)::TEXT, 8, '0');
        v_is_high_ticket := (i < 5); -- first 5 are high ticket
        v_nb_events := v_nb_events_dist[(50 + i) + 1];

        -- Determine attachment style (men: 20 secure, 12 anxious, 13 avoidant, 5 fearful)
        IF i < 20 THEN
            v_style := 'secure';
            v_anxiety_target := 2.0; v_avoidance_target := 1.8; v_deviation := 1.0;
        ELSIF i < 32 THEN
            v_style := 'anxious';
            v_anxiety_target := 4.0; v_avoidance_target := 2.0; v_deviation := 0.8;
        ELSIF i < 45 THEN
            v_style := 'avoidant';
            v_anxiety_target := 2.0; v_avoidance_target := 4.0; v_deviation := 0.8;
        ELSE
            v_style := 'fearful';
            v_anxiety_target := 3.8; v_avoidance_target := 3.8; v_deviation := 0.8;
        END IF;

        -- Insert auth user
        v_email := REPLACE(v_phone, '+', '') || '@mymuqabala.app';
        INSERT INTO auth.users (
            id, instance_id, aud, role,
            email, phone, encrypted_password, email_confirmed_at, phone_confirmed_at,
            created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
        ) VALUES (
            v_user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
            v_email, v_phone, extensions.crypt('TestPass123', extensions.gen_salt('bf')), NOW(), NOW(),
            NOW(), NOW(), '', '', '', ''
        ) ON CONFLICT (id) DO NOTHING;

        -- Insert profile
        INSERT INTO profiles (
            id, prenom, nom, telephone, genre, date_naissance, ville,
            role, statut_parcours, is_high_ticket, nb_events_participes,
            metadata
        ) VALUES (
            v_user_id, v_prenom, v_nom, v_phone, v_genre,
            ('1988-01-01'::DATE + (random() * 4380)::INT),
            v_ville, 'participant', 'matching_pool',
            v_is_high_ticket, v_nb_events,
            jsonb_build_object('generated_password', 'TestPass123', 'test_profile', true, 'attachment_style', v_style)
        ) ON CONFLICT (id) DO NOTHING;

        -- Generate questionnaire responses
        PERFORM _seed_generate_responses(v_user_id, v_anxiety_target, v_avoidance_target, v_deviation);

        v_index := v_index + 1;
    END LOOP;

    -- ── CREATE TEST EVENT ──
    INSERT INTO events (id, titre, description, date_evenement, type, statut, created_at)
    VALUES (
        'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'::UUID,
        'Événement Test Matching #1',
        'Événement de test pour valider l''algorithme de matching avec 100 profils.',
        NOW() + INTERVAL '7 days',
        'matching',
        'planifie',
        NOW()
    ) ON CONFLICT (id) DO NOTHING;

    RAISE NOTICE 'Seed complete: % profiles created with questionnaire responses', v_index;
END;
$$;

-- Clean up helper function
DROP FUNCTION IF EXISTS _seed_generate_responses(UUID, NUMERIC, NUMERIC, NUMERIC);

COMMIT;

-- =====================================================================================
-- VERIFICATION QUERIES (run separately)
-- =====================================================================================
-- SELECT genre, count(*) FROM profiles WHERE (metadata->>'test_profile')::boolean = true GROUP BY genre;
-- SELECT metadata->>'attachment_style' as style, genre, count(*) FROM profiles WHERE (metadata->>'test_profile')::boolean = true GROUP BY style, genre ORDER BY style, genre;
-- SELECT count(*) FROM questionnaire_responses WHERE categorie = 'attachement';
-- SELECT is_high_ticket, count(*) FROM profiles WHERE (metadata->>'test_profile')::boolean = true GROUP BY is_high_ticket;
-- SELECT nb_events_participes, count(*) FROM profiles WHERE (metadata->>'test_profile')::boolean = true GROUP BY nb_events_participes ORDER BY nb_events_participes;
-- SELECT * FROM events WHERE id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
