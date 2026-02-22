-- =====================================================================================
--  MIGRATION: Fix section_content data to match web dashboard
--
--  PROBLEM: The previous migration (000001) seeded WRONG skeleton data:
--    - Cartographie: 20 docs with invented titles, missing PROTOCOLE
--    - Formulaires: 22 items with no URLs, missing F1.4-F1.6, F2.4-F2.5, F3.4, F_FINAL, EXP1-EXP4
--    - Ressources: 12 generic weeks instead of 48 weeks + 30 Ramadan days = 78 items
--
--  SOLUTION:
--    1. DELETE wrong data for cartographie, formulaires, ressources
--    2. INSERT correct 21 cartographie + 33 formulaires + 78 ressources
--    3. Replace trigger function with correct data for new clients
-- =====================================================================================

BEGIN;
SET lock_timeout = '30s';


-- ============================================================
-- STEP 1: Delete wrong data (keep plan_action — acceptable)
-- ============================================================

DELETE FROM section_content WHERE section_key IN ('cartographie', 'formulaires', 'ressources');


-- ============================================================
-- STEP 2: Insert 21 correct cartographie rows per participant
-- ============================================================

INSERT INTO section_content (client_id, section_key, content_key, titre)
SELECT
    p.id,
    'cartographie',
    doc.key,
    doc.titre
FROM profiles p
CROSS JOIN (VALUES
    ('DOC_01', 'Accueil & Intention'),
    ('DOC_02', 'Comprendre ton Monde Intérieur'),
    ('DOC_03', 'Roadmap & Organisation'),
    ('DOC_04', 'Ton Histoire'),
    ('DOC_05', 'Tes Racines Familiales'),
    ('DOC_06', 'Tes Blessures'),
    ('DOC_07', 'Ta Navigation Émotionnelle'),
    ('DOC_08', 'Ton Style d''Attachement'),
    ('DOC_09', 'Ton Corps'),
    ('DOC_10', 'Ton Identité'),
    ('DOC_11', 'Tes Saboteurs Intérieurs'),
    ('DOC_12', 'Tes Forces & Ressources'),
    ('DOC_13', 'Tes Valeurs & Limites'),
    ('DOC_14', 'Tes Sphères de Vie'),
    ('DOC_15', 'Ta Spiritualité'),
    ('DOC_16', 'Ton Profil Partenaire Idéal'),
    ('DOC_17', 'Green & Red Flags'),
    ('DOC_18', 'Exercices & Protocoles'),
    ('DOC_19', 'Plan d''Action'),
    ('DOC_20', 'Synthèse & Transformation'),
    ('PROTOCOLE', 'Protocole de Libération Émotionnelle')
) AS doc(key, titre)
WHERE p.role = 'participant'
ON CONFLICT (client_id, section_key, content_key) DO NOTHING;


-- ============================================================
-- STEP 3: Insert 33 correct formulaire rows with Typebot URLs
-- ============================================================

INSERT INTO section_content (client_id, section_key, content_key, titre, url)
SELECT
    p.id,
    'formulaires',
    f.key,
    f.titre,
    f.url
FROM profiles p
CROSS JOIN (VALUES
    -- Scénarios S1-S10
    ('S1',   'S1 — L''Étincelle Initiale',
     'https://typebot.co/sc-nario-1-l-tincelle-initiale-n86djk1'),
    ('S2',   'S2 — Le Rythme Discord',
     'https://typebot.co/sc-nario-2-le-rythme-discord-rczy8ny'),
    ('S3',   'S3 — Les Deux Mondes',
     'https://typebot.co/sc-nario-3-les-deux-mondes-qyh5otq'),
    ('S4',   'S4 — Le Test Invisible',
     'https://typebot.co/sc-nario-4-le-test-invisible-cp0ilf0'),
    ('S5',   'S5 — La Danse du Pouvoir',
     'https://typebot.co/sc-nario-5-la-danse-du-pouvoir-rxq69yf'),
    ('S6',   'S6 — L''Écho du Passé',
     'https://typebot.co/sc-nario-6-l-cho-du-pass-wceyt3c'),
    ('S7',   'S7 — Le Triangle Sacré',
     'https://typebot.co/sc-nario-7-le-triangle-sacr-nd0036c'),
    ('S8',   'S8 — Le Miroir Dérangeant',
     'https://typebot.co/sc-nario-8-le-miroir-d-rangeant-cjnvkex'),
    ('S9',   'S9 — La Promesse Floue',
     'https://typebot.co/sc-nario-9-la-promesse-floue-py4s34m'),
    ('S10',  'S10 — Le Futur se Dessine',
     'https://typebot.co/sc-nario-10-le-futur-se-dessine-synth-se-fractale-uqhc7kx'),

    -- Partie 1 — La Germination (F1.1-F1.6)
    ('F1.1', 'F1.1 — L''Espace Sacré',
     'https://typebot.co/formulaire-1-1-cartographie-motionnelle-phase-germination-bonsjjz'),
    ('F1.2', 'F1.2 — Exploration Intérieure',
     'https://typebot.co/formulaire-1-2-12w47bj'),
    ('F1.3', 'F1.3 — Le Fil Conducteur',
     'https://typebot.co/formulaire-1-3-b2lp3g6'),
    ('F1.4', 'F1.4 — Ton Parcours',
     'https://typebot.co/formulaire-1-4-1g09i9c'),
    ('F1.5', 'F1.5 — Exploration & Transformation',
     'https://typebot.co/formulaire-1-2-b-exploration-transformation-xngwj6x'),
    ('F1.6', 'F1.6 — La Boussole Intérieure',
     'https://typebot.co/formulaire-1-6-xdsru8d'),

    -- Partie 2 — Les Racines (F2.1-F2.5)
    ('F2.1', 'F2.1 — Les Fondations',
     'https://typebot.co/formulaire-2-1-s39mswv'),
    ('F2.2', 'F2.2 — L''Héritage Émotionnel',
     'https://typebot.co/formulaire-2-2-b6c8kpw'),
    ('F2.3', 'F2.3 — Les Échos d''Enfance',
     'https://typebot.co/formulaire-2-3-iwp7z27'),
    ('F2.4', 'F2.4 — Le Style d''Attachement',
     'https://typebot.co/formulaire-2-4-2upxvud'),
    ('F2.5', 'F2.5 — Le Corps Raconte',
     'https://typebot.co/formulaire-2-5-5f5ovmk'),

    -- Partie 3 — Les Patterns (F3.1-F3.4)
    ('F3.1', 'F3.1 — Début des Relations',
     'https://typebot.co/formulaire-3-1-d-but-des-relations-enrichi-0l40mak'),
    ('F3.2', 'F3.2 — Les Saisons Amoureuses',
     'https://typebot.co/formulaire-3-2-l-arbre-des-saisons-amoureuses-nectpn3'),
    ('F3.3', 'F3.3 — Racines Entrelacées',
     'https://typebot.co/formulaire-3-3-racines-entrelac-es-attachement-communication-4f22a24'),
    ('F3.4', 'F3.4 — Forces & Créativité',
     'https://typebot.co/partie-3-4-forces-cr-ativit-l-arbre-fruitier-g-n-reux-8dpto9j'),

    -- Partie 4 — Les Valeurs (F4.1-F4.3)
    ('F4.1', 'F4.1 — Spiritualité et Amour',
     'https://typebot.co/formulaire-4-1-spiritualit-et-amour-l3eifqz'),
    ('F4.2', 'F4.2 — Le Jardin Secret',
     'https://typebot.co/formulaire-4-2-intimit-et-gu-rison-le-jardin-secret-qui-refleurit-q69djog'),
    ('F4.3', 'F4.3 — La Boussole du Coeur',
     'https://typebot.co/partie-4-formulaire-3-la-boussole-du-c-ur-clair-enrichi-doggm10'),

    -- Bilan Final
    ('F_FINAL', 'Formulaire Final — Le Bilan',
     'https://typebot.co/formulaire-final-6otobgo'),

    -- Express (EXP1-EXP4)
    ('EXP1', 'F1 — L''Empreinte',
     'questionnaire.html?form=f1-express'),
    ('EXP2', 'F2 — Le Schéma',
     'https://typebot.co/formulaire-2-le-pattern-la-danse-r-p-titive-hsr6ukc'),
    ('EXP3', 'F3 — La Boussole',
     'https://typebot.co/formulaire-3-la-boussole-ce-qui-compte-vraiment-hxm0o0i'),
    ('EXP4', 'F4 — Les Forces',
     'https://typebot.co/formulaire-4-les-forces-l-engagement-ta-transformation-c143d3m')
) AS f(key, titre, url)
WHERE p.role = 'participant'
ON CONFLICT (client_id, section_key, content_key) DO NOTHING;


-- ============================================================
-- STEP 4: Insert 78 correct ressource rows (48 weeks + 30 Ramadan)
-- ============================================================

INSERT INTO section_content (client_id, section_key, content_key, titre, metadata)
SELECT
    p.id,
    'ressources',
    r.key,
    r.titre,
    r.meta::jsonb
FROM profiles p
CROSS JOIN (VALUES
    -- MOIS 1 — Fondations
    ('m1w1', 'Introduction au parcours',                  '{"duration":"Vidéo 12min + Guide","media_type":"video"}'),
    ('m1w2', 'Comprendre tes schémas',                    '{"duration":"Audio 18min + Guide","media_type":"audio"}'),
    ('m1w3', 'Bientôt disponible',                        '{"locked":true}'),
    ('m1w4', 'Bientôt disponible',                        '{"locked":true}'),

    -- MOIS 2 — Les blessures et les masques
    ('m2w1', 'Les blessures fondamentales',               '{"duration":"Vidéo 24min + Guide","media_type":"video"}'),
    ('m2w2', 'Identifier tes masques',                    '{"duration":"Audio 15min + Guide","media_type":"audio"}'),
    ('m2w3', 'Bientôt disponible',                        '{"locked":true}'),
    ('m2w4', 'Bientôt disponible',                        '{"locked":true}'),

    -- MOIS 3 — L'attachement en Islam
    ('m3w1', 'Les styles d''attachement',                 '{"duration":"Vidéo 20min + Guide","media_type":"video"}'),
    ('m3w2', 'L''attachement sécurisant',                 '{"duration":"Audio 12min + Guide","media_type":"audio"}'),
    ('m3w3', 'Bientôt disponible',                        '{"locked":true}'),
    ('m3w4', 'Bientôt disponible',                        '{"locked":true}'),

    -- MOIS 4 — Construire des relations saines
    ('m4w1', 'Les fondations relationnelles',             '{"duration":"Vidéo 22min + Guide","media_type":"video"}'),
    ('m4w2', 'Communication non-violente',                '{"duration":"Audio 14min + Guide","media_type":"audio"}'),
    ('m4w3', 'Bientôt disponible',                        '{"locked":true}'),
    ('m4w4', 'Bientôt disponible',                        '{"locked":true}'),

    -- MOIS 5 — Le chemin vers la paix intérieure
    ('m5w1', 'La paix intérieure',                        '{"duration":"Vidéo 15min + Guide","media_type":"video"}'),
    ('m5w2', 'Méditation du Tawakkul',                    '{"duration":"Audio 8min + Guide","media_type":"audio"}'),
    ('m5w3', 'Bientôt disponible',                        '{"locked":true}'),
    ('m5w4', 'Bientôt disponible',                        '{"locked":true}'),

    -- MOIS 6 — Régulation émotionnelle
    ('m6w1', 'Respiration de régulation',                 '{"duration":"Audio 5min + Guide","media_type":"audio"}'),
    ('m6w2', 'Gestion des déclencheurs',                  '{"duration":"Vidéo 16min + Guide","media_type":"video"}'),
    ('m6w3', 'Bientôt disponible',                        '{"locked":true}'),
    ('m6w4', 'Bientôt disponible',                        '{"locked":true}'),

    -- MOIS 7 — Dhikr thérapeutique
    ('m7w1', 'Introduction au Dhikr thérapeutique',       '{"duration":"Audio 12min + Guide","media_type":"audio"}'),
    ('m7w2', 'Pratique guidée',                           '{"duration":"Vidéo 18min + Guide","media_type":"video"}'),
    ('m7w3', 'Bientôt disponible',                        '{"locked":true}'),
    ('m7w4', 'Bientôt disponible',                        '{"locked":true}'),

    -- MOIS 8 — Visualisation positive
    ('m8w1', 'Visualisation et intention',                '{"duration":"Audio 10min + Guide","media_type":"audio"}'),
    ('m8w2', 'Ancrer ta vision',                          '{"duration":"Vidéo 14min + Guide","media_type":"video"}'),
    ('m8w3', 'Bientôt disponible',                        '{"locked":true}'),
    ('m8w4', 'Bientôt disponible',                        '{"locked":true}'),

    -- MOIS 9 — Coaching : Les fondations
    ('m9w1', 'Session coaching Les fondations Partie 1',  '{"duration":"Vidéo 1h15 + PDF","media_type":"video"}'),
    ('m9w2', 'Intégration et exercices',                  '{"duration":"Guide","media_type":"guide"}'),
    ('m9w3', 'Bientôt disponible',                        '{"locked":true}'),
    ('m9w4', 'Bientôt disponible',                        '{"locked":true}'),

    -- MOIS 10 — Coaching : Approfondir
    ('m10w1', 'Session coaching Approfondir Partie 1',    '{"duration":"Vidéo 1h20 + PDF","media_type":"video"}'),
    ('m10w2', 'Intégration et exercices',                 '{"duration":"Guide","media_type":"guide"}'),
    ('m10w3', 'Bientôt disponible',                       '{"locked":true}'),
    ('m10w4', 'Bientôt disponible',                       '{"locked":true}'),

    -- MOIS 11 — Consolidation
    ('m11w1', 'Bientôt disponible',                       '{"locked":true}'),
    ('m11w2', 'Bientôt disponible',                       '{"locked":true}'),
    ('m11w3', 'Bientôt disponible',                       '{"locked":true}'),
    ('m11w4', 'Bientôt disponible',                       '{"locked":true}'),

    -- MOIS 12 — Célébration & Perspectives
    ('m12w1', 'Bientôt disponible',                       '{"locked":true}'),
    ('m12w2', 'Bientôt disponible',                       '{"locked":true}'),
    ('m12w3', 'Bientôt disponible',                       '{"locked":true}'),
    ('m12w4', 'Bientôt disponible',                       '{"locked":true}'),

    -- RAMADAN S1 — Purification de l'intention (Jours 1-7)
    ('r1d1', 'L''intention du coeur',                     '{"duration":"Audio 7min"}'),
    ('r1d2', 'Accueillir le mois béni',                   '{"duration":"Audio 6min"}'),
    ('r1d3', 'La patience comme force',                   '{"duration":"Audio 8min"}'),
    ('r1d4', 'Pardonner pour avancer',                    '{"duration":"Audio 7min"}'),
    ('r1d5', 'La gratitude profonde',                     '{"duration":"Audio 5min"}'),
    ('r1d6', 'Le silence intérieur',                      '{"duration":"Audio 6min"}'),
    ('r1d7', 'Bilan de la première semaine',              '{"duration":"Audio 10min"}'),

    -- RAMADAN S2 — Guérison des blessures (Jours 8-14)
    ('r2d1', 'Reconnaître ses blessures',                 '{"duration":"Audio 8min"}'),
    ('r2d2', 'L''enfant intérieur',                       '{"duration":"Audio 9min"}'),
    ('r2d3', 'Libérer la colère',                         '{"duration":"Audio 7min"}'),
    ('r2d4', 'La tristesse comme messagère',              '{"duration":"Audio 8min"}'),
    ('r2d5', 'La peur et la confiance',                   '{"duration":"Audio 6min"}'),
    ('r2d6', 'Transformer la honte',                      '{"duration":"Audio 7min"}'),
    ('r2d7', 'Bilan de la deuxième semaine',              '{"duration":"Audio 10min"}'),

    -- RAMADAN S3 — Reconstruction (Jours 15-21)
    ('r3d1', 'Connaître ta valeur',                       '{"duration":"Audio 7min"}'),
    ('r3d2', 'Les limites saines',                        '{"duration":"Audio 8min"}'),
    ('r3d3', 'Laylat al-Qadr, La nuit du destin',        '{"duration":"Audio 10min"}'),
    ('r3d4', 'La vision du mariage en Islam',             '{"duration":"Audio 8min"}'),
    ('r3d5', 'Tes forces intérieures',                    '{"duration":"Audio 6min"}'),
    ('r3d6', 'Construire sur du solide',                  '{"duration":"Audio 7min"}'),
    ('r3d7', 'Bilan de la troisième semaine',             '{"duration":"Audio 10min"}'),

    -- RAMADAN S4 — Intégration & Célébration (Jours 22-30)
    ('r4d1', 'L''amour inconditionnel',                   '{"duration":"Audio 7min"}'),
    ('r4d2', 'La du''a qui guérit',                       '{"duration":"Audio 8min"}'),
    ('r4d3', 'Le Tawakkul profond',                       '{"duration":"Audio 6min"}'),
    ('r4d4', 'La renaissance',                            '{"duration":"Audio 7min"}'),
    ('r4d5', 'Laylat al-Qadr, Nuit de la puissance',     '{"duration":"Audio 10min"}'),
    ('r4d6', 'Les dernières nuits',                       '{"duration":"Audio 8min"}'),
    ('r4d7', 'Préparer l''après-Ramadan',                 '{"duration":"Audio 7min"}'),
    ('r4d8', 'Célébration et gratitude',                  '{"duration":"Audio 6min"}'),
    ('r4d9', 'Eid Mubarak, Ton bilan complet',           '{"duration":"Audio 10min"}')
) AS r(key, titre, meta)
WHERE p.role = 'participant'
ON CONFLICT (client_id, section_key, content_key) DO NOTHING;


-- ============================================================
-- STEP 5: Replace trigger with correct data for new clients
-- ============================================================

CREATE OR REPLACE FUNCTION create_profile_companion_rows()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF NEW.role = 'participant' THEN
        -- Section visibility (all true by default)
        INSERT INTO section_visibility (client_id)
        VALUES (NEW.id)
        ON CONFLICT DO NOTHING;

        -- Bilans plan action (3 months)
        INSERT INTO bilans_plan_action (client_id, mois_numero, titre)
        VALUES
            (NEW.id, 1, 'Bilan du Premier Mois'),
            (NEW.id, 2, 'Bilan du Deuxième Mois'),
            (NEW.id, 3, 'Bilan Final & Perspectives')
        ON CONFLICT DO NOTHING;

        -- ========================================
        -- Cartographie (21 docs: DOC_01-20 + PROTOCOLE)
        -- ========================================
        INSERT INTO section_content (client_id, section_key, content_key, titre) VALUES
            (NEW.id, 'cartographie', 'DOC_01', 'Accueil & Intention'),
            (NEW.id, 'cartographie', 'DOC_02', 'Comprendre ton Monde Intérieur'),
            (NEW.id, 'cartographie', 'DOC_03', 'Roadmap & Organisation'),
            (NEW.id, 'cartographie', 'DOC_04', 'Ton Histoire'),
            (NEW.id, 'cartographie', 'DOC_05', 'Tes Racines Familiales'),
            (NEW.id, 'cartographie', 'DOC_06', 'Tes Blessures'),
            (NEW.id, 'cartographie', 'DOC_07', 'Ta Navigation Émotionnelle'),
            (NEW.id, 'cartographie', 'DOC_08', 'Ton Style d''Attachement'),
            (NEW.id, 'cartographie', 'DOC_09', 'Ton Corps'),
            (NEW.id, 'cartographie', 'DOC_10', 'Ton Identité'),
            (NEW.id, 'cartographie', 'DOC_11', 'Tes Saboteurs Intérieurs'),
            (NEW.id, 'cartographie', 'DOC_12', 'Tes Forces & Ressources'),
            (NEW.id, 'cartographie', 'DOC_13', 'Tes Valeurs & Limites'),
            (NEW.id, 'cartographie', 'DOC_14', 'Tes Sphères de Vie'),
            (NEW.id, 'cartographie', 'DOC_15', 'Ta Spiritualité'),
            (NEW.id, 'cartographie', 'DOC_16', 'Ton Profil Partenaire Idéal'),
            (NEW.id, 'cartographie', 'DOC_17', 'Green & Red Flags'),
            (NEW.id, 'cartographie', 'DOC_18', 'Exercices & Protocoles'),
            (NEW.id, 'cartographie', 'DOC_19', 'Plan d''Action'),
            (NEW.id, 'cartographie', 'DOC_20', 'Synthèse & Transformation'),
            (NEW.id, 'cartographie', 'PROTOCOLE', 'Protocole de Libération Émotionnelle')
        ON CONFLICT DO NOTHING;

        -- ========================================
        -- Formulaires (33 items with Typebot URLs)
        -- ========================================
        INSERT INTO section_content (client_id, section_key, content_key, titre, url) VALUES
            -- Scénarios S1-S10
            (NEW.id, 'formulaires', 'S1',   'S1 — L''Étincelle Initiale',
             'https://typebot.co/sc-nario-1-l-tincelle-initiale-n86djk1'),
            (NEW.id, 'formulaires', 'S2',   'S2 — Le Rythme Discord',
             'https://typebot.co/sc-nario-2-le-rythme-discord-rczy8ny'),
            (NEW.id, 'formulaires', 'S3',   'S3 — Les Deux Mondes',
             'https://typebot.co/sc-nario-3-les-deux-mondes-qyh5otq'),
            (NEW.id, 'formulaires', 'S4',   'S4 — Le Test Invisible',
             'https://typebot.co/sc-nario-4-le-test-invisible-cp0ilf0'),
            (NEW.id, 'formulaires', 'S5',   'S5 — La Danse du Pouvoir',
             'https://typebot.co/sc-nario-5-la-danse-du-pouvoir-rxq69yf'),
            (NEW.id, 'formulaires', 'S6',   'S6 — L''Écho du Passé',
             'https://typebot.co/sc-nario-6-l-cho-du-pass-wceyt3c'),
            (NEW.id, 'formulaires', 'S7',   'S7 — Le Triangle Sacré',
             'https://typebot.co/sc-nario-7-le-triangle-sacr-nd0036c'),
            (NEW.id, 'formulaires', 'S8',   'S8 — Le Miroir Dérangeant',
             'https://typebot.co/sc-nario-8-le-miroir-d-rangeant-cjnvkex'),
            (NEW.id, 'formulaires', 'S9',   'S9 — La Promesse Floue',
             'https://typebot.co/sc-nario-9-la-promesse-floue-py4s34m'),
            (NEW.id, 'formulaires', 'S10',  'S10 — Le Futur se Dessine',
             'https://typebot.co/sc-nario-10-le-futur-se-dessine-synth-se-fractale-uqhc7kx'),
            -- Partie 1 — La Germination (F1.1-F1.6)
            (NEW.id, 'formulaires', 'F1.1', 'F1.1 — L''Espace Sacré',
             'https://typebot.co/formulaire-1-1-cartographie-motionnelle-phase-germination-bonsjjz'),
            (NEW.id, 'formulaires', 'F1.2', 'F1.2 — Exploration Intérieure',
             'https://typebot.co/formulaire-1-2-12w47bj'),
            (NEW.id, 'formulaires', 'F1.3', 'F1.3 — Le Fil Conducteur',
             'https://typebot.co/formulaire-1-3-b2lp3g6'),
            (NEW.id, 'formulaires', 'F1.4', 'F1.4 — Ton Parcours',
             'https://typebot.co/formulaire-1-4-1g09i9c'),
            (NEW.id, 'formulaires', 'F1.5', 'F1.5 — Exploration & Transformation',
             'https://typebot.co/formulaire-1-2-b-exploration-transformation-xngwj6x'),
            (NEW.id, 'formulaires', 'F1.6', 'F1.6 — La Boussole Intérieure',
             'https://typebot.co/formulaire-1-6-xdsru8d'),
            -- Partie 2 — Les Racines (F2.1-F2.5)
            (NEW.id, 'formulaires', 'F2.1', 'F2.1 — Les Fondations',
             'https://typebot.co/formulaire-2-1-s39mswv'),
            (NEW.id, 'formulaires', 'F2.2', 'F2.2 — L''Héritage Émotionnel',
             'https://typebot.co/formulaire-2-2-b6c8kpw'),
            (NEW.id, 'formulaires', 'F2.3', 'F2.3 — Les Échos d''Enfance',
             'https://typebot.co/formulaire-2-3-iwp7z27'),
            (NEW.id, 'formulaires', 'F2.4', 'F2.4 — Le Style d''Attachement',
             'https://typebot.co/formulaire-2-4-2upxvud'),
            (NEW.id, 'formulaires', 'F2.5', 'F2.5 — Le Corps Raconte',
             'https://typebot.co/formulaire-2-5-5f5ovmk'),
            -- Partie 3 — Les Patterns (F3.1-F3.4)
            (NEW.id, 'formulaires', 'F3.1', 'F3.1 — Début des Relations',
             'https://typebot.co/formulaire-3-1-d-but-des-relations-enrichi-0l40mak'),
            (NEW.id, 'formulaires', 'F3.2', 'F3.2 — Les Saisons Amoureuses',
             'https://typebot.co/formulaire-3-2-l-arbre-des-saisons-amoureuses-nectpn3'),
            (NEW.id, 'formulaires', 'F3.3', 'F3.3 — Racines Entrelacées',
             'https://typebot.co/formulaire-3-3-racines-entrelac-es-attachement-communication-4f22a24'),
            (NEW.id, 'formulaires', 'F3.4', 'F3.4 — Forces & Créativité',
             'https://typebot.co/partie-3-4-forces-cr-ativit-l-arbre-fruitier-g-n-reux-8dpto9j'),
            -- Partie 4 — Les Valeurs (F4.1-F4.3)
            (NEW.id, 'formulaires', 'F4.1', 'F4.1 — Spiritualité et Amour',
             'https://typebot.co/formulaire-4-1-spiritualit-et-amour-l3eifqz'),
            (NEW.id, 'formulaires', 'F4.2', 'F4.2 — Le Jardin Secret',
             'https://typebot.co/formulaire-4-2-intimit-et-gu-rison-le-jardin-secret-qui-refleurit-q69djog'),
            (NEW.id, 'formulaires', 'F4.3', 'F4.3 — La Boussole du Coeur',
             'https://typebot.co/partie-4-formulaire-3-la-boussole-du-c-ur-clair-enrichi-doggm10'),
            -- Bilan Final
            (NEW.id, 'formulaires', 'F_FINAL', 'Formulaire Final — Le Bilan',
             'https://typebot.co/formulaire-final-6otobgo'),
            -- Express (EXP1-EXP4)
            (NEW.id, 'formulaires', 'EXP1', 'F1 — L''Empreinte',
             'questionnaire.html?form=f1-express'),
            (NEW.id, 'formulaires', 'EXP2', 'F2 — Le Schéma',
             'https://typebot.co/formulaire-2-le-pattern-la-danse-r-p-titive-hsr6ukc'),
            (NEW.id, 'formulaires', 'EXP3', 'F3 — La Boussole',
             'https://typebot.co/formulaire-3-la-boussole-ce-qui-compte-vraiment-hxm0o0i'),
            (NEW.id, 'formulaires', 'EXP4', 'F4 — Les Forces',
             'https://typebot.co/formulaire-4-les-forces-l-engagement-ta-transformation-c143d3m')
        ON CONFLICT DO NOTHING;

        -- ========================================
        -- Ressources (48 weeks + 30 Ramadan = 78 items)
        -- ========================================
        INSERT INTO section_content (client_id, section_key, content_key, titre, metadata) VALUES
            -- MOIS 1 — Fondations
            (NEW.id, 'ressources', 'm1w1', 'Introduction au parcours',                  '{"duration":"Vidéo 12min + Guide","media_type":"video"}'::jsonb),
            (NEW.id, 'ressources', 'm1w2', 'Comprendre tes schémas',                    '{"duration":"Audio 18min + Guide","media_type":"audio"}'::jsonb),
            (NEW.id, 'ressources', 'm1w3', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            (NEW.id, 'ressources', 'm1w4', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            -- MOIS 2 — Les blessures et les masques
            (NEW.id, 'ressources', 'm2w1', 'Les blessures fondamentales',               '{"duration":"Vidéo 24min + Guide","media_type":"video"}'::jsonb),
            (NEW.id, 'ressources', 'm2w2', 'Identifier tes masques',                    '{"duration":"Audio 15min + Guide","media_type":"audio"}'::jsonb),
            (NEW.id, 'ressources', 'm2w3', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            (NEW.id, 'ressources', 'm2w4', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            -- MOIS 3 — L'attachement en Islam
            (NEW.id, 'ressources', 'm3w1', 'Les styles d''attachement',                 '{"duration":"Vidéo 20min + Guide","media_type":"video"}'::jsonb),
            (NEW.id, 'ressources', 'm3w2', 'L''attachement sécurisant',                 '{"duration":"Audio 12min + Guide","media_type":"audio"}'::jsonb),
            (NEW.id, 'ressources', 'm3w3', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            (NEW.id, 'ressources', 'm3w4', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            -- MOIS 4 — Construire des relations saines
            (NEW.id, 'ressources', 'm4w1', 'Les fondations relationnelles',             '{"duration":"Vidéo 22min + Guide","media_type":"video"}'::jsonb),
            (NEW.id, 'ressources', 'm4w2', 'Communication non-violente',                '{"duration":"Audio 14min + Guide","media_type":"audio"}'::jsonb),
            (NEW.id, 'ressources', 'm4w3', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            (NEW.id, 'ressources', 'm4w4', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            -- MOIS 5 — Le chemin vers la paix intérieure
            (NEW.id, 'ressources', 'm5w1', 'La paix intérieure',                        '{"duration":"Vidéo 15min + Guide","media_type":"video"}'::jsonb),
            (NEW.id, 'ressources', 'm5w2', 'Méditation du Tawakkul',                    '{"duration":"Audio 8min + Guide","media_type":"audio"}'::jsonb),
            (NEW.id, 'ressources', 'm5w3', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            (NEW.id, 'ressources', 'm5w4', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            -- MOIS 6 — Régulation émotionnelle
            (NEW.id, 'ressources', 'm6w1', 'Respiration de régulation',                 '{"duration":"Audio 5min + Guide","media_type":"audio"}'::jsonb),
            (NEW.id, 'ressources', 'm6w2', 'Gestion des déclencheurs',                  '{"duration":"Vidéo 16min + Guide","media_type":"video"}'::jsonb),
            (NEW.id, 'ressources', 'm6w3', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            (NEW.id, 'ressources', 'm6w4', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            -- MOIS 7 — Dhikr thérapeutique
            (NEW.id, 'ressources', 'm7w1', 'Introduction au Dhikr thérapeutique',       '{"duration":"Audio 12min + Guide","media_type":"audio"}'::jsonb),
            (NEW.id, 'ressources', 'm7w2', 'Pratique guidée',                           '{"duration":"Vidéo 18min + Guide","media_type":"video"}'::jsonb),
            (NEW.id, 'ressources', 'm7w3', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            (NEW.id, 'ressources', 'm7w4', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            -- MOIS 8 — Visualisation positive
            (NEW.id, 'ressources', 'm8w1', 'Visualisation et intention',                '{"duration":"Audio 10min + Guide","media_type":"audio"}'::jsonb),
            (NEW.id, 'ressources', 'm8w2', 'Ancrer ta vision',                          '{"duration":"Vidéo 14min + Guide","media_type":"video"}'::jsonb),
            (NEW.id, 'ressources', 'm8w3', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            (NEW.id, 'ressources', 'm8w4', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            -- MOIS 9 — Coaching : Les fondations
            (NEW.id, 'ressources', 'm9w1', 'Session coaching Les fondations Partie 1',  '{"duration":"Vidéo 1h15 + PDF","media_type":"video"}'::jsonb),
            (NEW.id, 'ressources', 'm9w2', 'Intégration et exercices',                  '{"duration":"Guide","media_type":"guide"}'::jsonb),
            (NEW.id, 'ressources', 'm9w3', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            (NEW.id, 'ressources', 'm9w4', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
            -- MOIS 10 — Coaching : Approfondir
            (NEW.id, 'ressources', 'm10w1', 'Session coaching Approfondir Partie 1',    '{"duration":"Vidéo 1h20 + PDF","media_type":"video"}'::jsonb),
            (NEW.id, 'ressources', 'm10w2', 'Intégration et exercices',                 '{"duration":"Guide","media_type":"guide"}'::jsonb),
            (NEW.id, 'ressources', 'm10w3', 'Bientôt disponible',                       '{"locked":true}'::jsonb),
            (NEW.id, 'ressources', 'm10w4', 'Bientôt disponible',                       '{"locked":true}'::jsonb),
            -- MOIS 11 — Consolidation
            (NEW.id, 'ressources', 'm11w1', 'Bientôt disponible',                       '{"locked":true}'::jsonb),
            (NEW.id, 'ressources', 'm11w2', 'Bientôt disponible',                       '{"locked":true}'::jsonb),
            (NEW.id, 'ressources', 'm11w3', 'Bientôt disponible',                       '{"locked":true}'::jsonb),
            (NEW.id, 'ressources', 'm11w4', 'Bientôt disponible',                       '{"locked":true}'::jsonb),
            -- MOIS 12 — Célébration & Perspectives
            (NEW.id, 'ressources', 'm12w1', 'Bientôt disponible',                       '{"locked":true}'::jsonb),
            (NEW.id, 'ressources', 'm12w2', 'Bientôt disponible',                       '{"locked":true}'::jsonb),
            (NEW.id, 'ressources', 'm12w3', 'Bientôt disponible',                       '{"locked":true}'::jsonb),
            (NEW.id, 'ressources', 'm12w4', 'Bientôt disponible',                       '{"locked":true}'::jsonb),
            -- RAMADAN S1 — Purification de l'intention (Jours 1-7)
            (NEW.id, 'ressources', 'r1d1', 'L''intention du coeur',                     '{"duration":"Audio 7min"}'::jsonb),
            (NEW.id, 'ressources', 'r1d2', 'Accueillir le mois béni',                   '{"duration":"Audio 6min"}'::jsonb),
            (NEW.id, 'ressources', 'r1d3', 'La patience comme force',                   '{"duration":"Audio 8min"}'::jsonb),
            (NEW.id, 'ressources', 'r1d4', 'Pardonner pour avancer',                    '{"duration":"Audio 7min"}'::jsonb),
            (NEW.id, 'ressources', 'r1d5', 'La gratitude profonde',                     '{"duration":"Audio 5min"}'::jsonb),
            (NEW.id, 'ressources', 'r1d6', 'Le silence intérieur',                      '{"duration":"Audio 6min"}'::jsonb),
            (NEW.id, 'ressources', 'r1d7', 'Bilan de la première semaine',              '{"duration":"Audio 10min"}'::jsonb),
            -- RAMADAN S2 — Guérison des blessures (Jours 8-14)
            (NEW.id, 'ressources', 'r2d1', 'Reconnaître ses blessures',                 '{"duration":"Audio 8min"}'::jsonb),
            (NEW.id, 'ressources', 'r2d2', 'L''enfant intérieur',                       '{"duration":"Audio 9min"}'::jsonb),
            (NEW.id, 'ressources', 'r2d3', 'Libérer la colère',                         '{"duration":"Audio 7min"}'::jsonb),
            (NEW.id, 'ressources', 'r2d4', 'La tristesse comme messagère',              '{"duration":"Audio 8min"}'::jsonb),
            (NEW.id, 'ressources', 'r2d5', 'La peur et la confiance',                   '{"duration":"Audio 6min"}'::jsonb),
            (NEW.id, 'ressources', 'r2d6', 'Transformer la honte',                      '{"duration":"Audio 7min"}'::jsonb),
            (NEW.id, 'ressources', 'r2d7', 'Bilan de la deuxième semaine',              '{"duration":"Audio 10min"}'::jsonb),
            -- RAMADAN S3 — Reconstruction (Jours 15-21)
            (NEW.id, 'ressources', 'r3d1', 'Connaître ta valeur',                       '{"duration":"Audio 7min"}'::jsonb),
            (NEW.id, 'ressources', 'r3d2', 'Les limites saines',                        '{"duration":"Audio 8min"}'::jsonb),
            (NEW.id, 'ressources', 'r3d3', 'Laylat al-Qadr, La nuit du destin',        '{"duration":"Audio 10min"}'::jsonb),
            (NEW.id, 'ressources', 'r3d4', 'La vision du mariage en Islam',             '{"duration":"Audio 8min"}'::jsonb),
            (NEW.id, 'ressources', 'r3d5', 'Tes forces intérieures',                    '{"duration":"Audio 6min"}'::jsonb),
            (NEW.id, 'ressources', 'r3d6', 'Construire sur du solide',                  '{"duration":"Audio 7min"}'::jsonb),
            (NEW.id, 'ressources', 'r3d7', 'Bilan de la troisième semaine',             '{"duration":"Audio 10min"}'::jsonb),
            -- RAMADAN S4 — Intégration & Célébration (Jours 22-30)
            (NEW.id, 'ressources', 'r4d1', 'L''amour inconditionnel',                   '{"duration":"Audio 7min"}'::jsonb),
            (NEW.id, 'ressources', 'r4d2', 'La du''a qui guérit',                       '{"duration":"Audio 8min"}'::jsonb),
            (NEW.id, 'ressources', 'r4d3', 'Le Tawakkul profond',                       '{"duration":"Audio 6min"}'::jsonb),
            (NEW.id, 'ressources', 'r4d4', 'La renaissance',                            '{"duration":"Audio 7min"}'::jsonb),
            (NEW.id, 'ressources', 'r4d5', 'Laylat al-Qadr, Nuit de la puissance',     '{"duration":"Audio 10min"}'::jsonb),
            (NEW.id, 'ressources', 'r4d6', 'Les dernières nuits',                       '{"duration":"Audio 8min"}'::jsonb),
            (NEW.id, 'ressources', 'r4d7', 'Préparer l''après-Ramadan',                 '{"duration":"Audio 7min"}'::jsonb),
            (NEW.id, 'ressources', 'r4d8', 'Célébration et gratitude',                  '{"duration":"Audio 6min"}'::jsonb),
            (NEW.id, 'ressources', 'r4d9', 'Eid Mubarak, Ton bilan complet',           '{"duration":"Audio 10min"}'::jsonb)
        ON CONFLICT DO NOTHING;

        -- Plan d'action (9 objectifs + 3 bilans) — unchanged
        INSERT INTO section_content (client_id, section_key, content_key, titre) VALUES
            (NEW.id, 'plan_action', 'month_1_obj1', 'Définir mes critères essentiels'),
            (NEW.id, 'plan_action', 'month_1_obj2', 'Compléter mon profil émotionnel'),
            (NEW.id, 'plan_action', 'month_1_obj3', 'Premier échange structuré'),
            (NEW.id, 'plan_action', 'month_2_obj1', 'Approfondir la compatibilité'),
            (NEW.id, 'plan_action', 'month_2_obj2', 'Rencontre supervisée'),
            (NEW.id, 'plan_action', 'month_2_obj3', 'Bilan de mi-parcours'),
            (NEW.id, 'plan_action', 'month_3_obj1', 'Consolider la relation'),
            (NEW.id, 'plan_action', 'month_3_obj2', 'Préparer la décision finale'),
            (NEW.id, 'plan_action', 'month_3_obj3', 'Plan post-accompagnement'),
            (NEW.id, 'plan_action', 'bilan_1',      'Bilan du Premier Mois'),
            (NEW.id, 'plan_action', 'bilan_2',      'Bilan du Deuxième Mois'),
            (NEW.id, 'plan_action', 'bilan_3',      'Bilan Final & Perspectives')
        ON CONFLICT DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$;


COMMIT;
