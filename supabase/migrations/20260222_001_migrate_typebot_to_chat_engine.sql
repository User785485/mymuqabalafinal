-- ============================================================
-- Migration: Typebot → Chat Engine (moteur maison)
-- Date: 2026-02-22
-- 
-- Updates all 32 formulaire URLs from typebot.co to
-- questionnaire.html?form=xxx (in-house chat engine).
-- Also updates the trigger for new client creation.
-- ============================================================

BEGIN;

-- ============================================================
-- STEP 1: Update existing URLs in section_content
-- ============================================================

-- Scénarios S1-S10
UPDATE section_content SET url = 'questionnaire.html?form=s1-etincelle'
WHERE section_key = 'formulaires' AND content_key = 'S1' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=s2-rythme'
WHERE section_key = 'formulaires' AND content_key = 'S2' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=s3-deux-mondes'
WHERE section_key = 'formulaires' AND content_key = 'S3' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=s4-test-invisible'
WHERE section_key = 'formulaires' AND content_key = 'S4' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=s5-danse-pouvoir'
WHERE section_key = 'formulaires' AND content_key = 'S5' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=s6-echo-passe'
WHERE section_key = 'formulaires' AND content_key = 'S6' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=s7-triangle-sacre'
WHERE section_key = 'formulaires' AND content_key = 'S7' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=s8-miroir-derangeant'
WHERE section_key = 'formulaires' AND content_key = 'S8' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=s9-promesse-floue'
WHERE section_key = 'formulaires' AND content_key = 'S9' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=s10-futur-se-dessine'
WHERE section_key = 'formulaires' AND content_key = 'S10' AND url LIKE '%typebot.co%';

-- Partie 1 — Germination (F1.1-F1.6)
UPDATE section_content SET url = 'questionnaire.html?form=f1-1-espace-sacre'
WHERE section_key = 'formulaires' AND content_key = 'F1.1' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=f1-2-exploration'
WHERE section_key = 'formulaires' AND content_key = 'F1.2' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=f1-3-fil-conducteur'
WHERE section_key = 'formulaires' AND content_key = 'F1.3' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=f1-4-parcours'
WHERE section_key = 'formulaires' AND content_key = 'F1.4' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=f1-5-transformation'
WHERE section_key = 'formulaires' AND content_key = 'F1.5' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=f1-6-boussole-interieure'
WHERE section_key = 'formulaires' AND content_key = 'F1.6' AND url LIKE '%typebot.co%';

-- Partie 2 — Racines (F2.1-F2.5)
UPDATE section_content SET url = 'questionnaire.html?form=f2-1-fondations'
WHERE section_key = 'formulaires' AND content_key = 'F2.1' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=f2-2-heritage'
WHERE section_key = 'formulaires' AND content_key = 'F2.2' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=f2-3-echos'
WHERE section_key = 'formulaires' AND content_key = 'F2.3' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=f2-4-attachement'
WHERE section_key = 'formulaires' AND content_key = 'F2.4' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=f2-5-corps-raconte'
WHERE section_key = 'formulaires' AND content_key = 'F2.5' AND url LIKE '%typebot.co%';

-- Partie 3 — Patterns (F3.1-F3.4)
UPDATE section_content SET url = 'questionnaire.html?form=f3-1-debut-relations'
WHERE section_key = 'formulaires' AND content_key = 'F3.1' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=f3-2-saisons'
WHERE section_key = 'formulaires' AND content_key = 'F3.2' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=f3-3-racines-entrelacees'
WHERE section_key = 'formulaires' AND content_key = 'F3.3' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=f3-4-forces-creativite'
WHERE section_key = 'formulaires' AND content_key = 'F3.4' AND url LIKE '%typebot.co%';

-- Partie 4 — Valeurs (F4.1-F4.3)
UPDATE section_content SET url = 'questionnaire.html?form=f4-1-spiritualite'
WHERE section_key = 'formulaires' AND content_key = 'F4.1' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=f4-2-jardin-secret'
WHERE section_key = 'formulaires' AND content_key = 'F4.2' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=f4-3-boussole-coeur'
WHERE section_key = 'formulaires' AND content_key = 'F4.3' AND url LIKE '%typebot.co%';

-- Bilan Final
UPDATE section_content SET url = 'questionnaire.html?form=f-final-bilan'
WHERE section_key = 'formulaires' AND content_key = 'F_FINAL' AND url LIKE '%typebot.co%';

-- Express EXP2-EXP4 (EXP1 already uses chat engine)
UPDATE section_content SET url = 'questionnaire.html?form=f2-express'
WHERE section_key = 'formulaires' AND content_key = 'EXP2' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=f3-express'
WHERE section_key = 'formulaires' AND content_key = 'EXP3' AND url LIKE '%typebot.co%';

UPDATE section_content SET url = 'questionnaire.html?form=f4-express'
WHERE section_key = 'formulaires' AND content_key = 'EXP4' AND url LIKE '%typebot.co%';


-- ============================================================
-- STEP 2: Replace the trigger function for new clients
-- ============================================================

CREATE OR REPLACE FUNCTION create_section_content_for_new_client()
RETURNS TRIGGER AS $$
BEGIN
    -- Only for participants
    IF NEW.role != 'participant' THEN
        RETURN NEW;
    END IF;

    -- ========================================
    -- Cartographie (21 docs)
    -- ========================================
    INSERT INTO section_content (client_id, section_key, content_key, titre) VALUES
        (NEW.id, 'cartographie', 'DOC_1',  'Ton Profil Émotionnel'),
        (NEW.id, 'cartographie', 'DOC_2',  'Tes Blessures Fondamentales'),
        (NEW.id, 'cartographie', 'DOC_3',  'Ton Style d''Attachement'),
        (NEW.id, 'cartographie', 'DOC_4',  'Ton Enfance & Héritage'),
        (NEW.id, 'cartographie', 'DOC_5',  'Tes Patterns Relationnels'),
        (NEW.id, 'cartographie', 'DOC_6',  'Ton Histoire Amoureuse'),
        (NEW.id, 'cartographie', 'DOC_7',  'Tes Mécanismes de Défense'),
        (NEW.id, 'cartographie', 'DOC_8',  'Ton Rapport au Corps'),
        (NEW.id, 'cartographie', 'DOC_9',  'Ta Communication'),
        (NEW.id, 'cartographie', 'DOC_10', 'Tes Croyances Limitantes'),
        (NEW.id, 'cartographie', 'DOC_11', 'Tes Forces & Ressources'),
        (NEW.id, 'cartographie', 'DOC_12', 'Ton Rapport à l''Intimité'),
        (NEW.id, 'cartographie', 'DOC_13', 'Tes Valeurs Profondes'),
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
    -- Formulaires (33 items — ALL chat engine)
    -- ========================================
    INSERT INTO section_content (client_id, section_key, content_key, titre, url) VALUES
        -- Scénarios S1-S10
        (NEW.id, 'formulaires', 'S1',   'S1 — L''Étincelle Initiale',
         'questionnaire.html?form=s1-etincelle'),
        (NEW.id, 'formulaires', 'S2',   'S2 — Le Rythme Discord',
         'questionnaire.html?form=s2-rythme'),
        (NEW.id, 'formulaires', 'S3',   'S3 — Les Deux Mondes',
         'questionnaire.html?form=s3-deux-mondes'),
        (NEW.id, 'formulaires', 'S4',   'S4 — Le Test Invisible',
         'questionnaire.html?form=s4-test-invisible'),
        (NEW.id, 'formulaires', 'S5',   'S5 — La Danse du Pouvoir',
         'questionnaire.html?form=s5-danse-pouvoir'),
        (NEW.id, 'formulaires', 'S6',   'S6 — L''Écho du Passé',
         'questionnaire.html?form=s6-echo-passe'),
        (NEW.id, 'formulaires', 'S7',   'S7 — Le Triangle Sacré',
         'questionnaire.html?form=s7-triangle-sacre'),
        (NEW.id, 'formulaires', 'S8',   'S8 — Le Miroir Dérangeant',
         'questionnaire.html?form=s8-miroir-derangeant'),
        (NEW.id, 'formulaires', 'S9',   'S9 — La Promesse Floue',
         'questionnaire.html?form=s9-promesse-floue'),
        (NEW.id, 'formulaires', 'S10',  'S10 — Le Futur se Dessine',
         'questionnaire.html?form=s10-futur-se-dessine'),
        -- Partie 1 — La Germination (F1.1-F1.6)
        (NEW.id, 'formulaires', 'F1.1', 'F1.1 — L''Espace Sacré',
         'questionnaire.html?form=f1-1-espace-sacre'),
        (NEW.id, 'formulaires', 'F1.2', 'F1.2 — Exploration Intérieure',
         'questionnaire.html?form=f1-2-exploration'),
        (NEW.id, 'formulaires', 'F1.3', 'F1.3 — Le Fil Conducteur',
         'questionnaire.html?form=f1-3-fil-conducteur'),
        (NEW.id, 'formulaires', 'F1.4', 'F1.4 — Ton Parcours',
         'questionnaire.html?form=f1-4-parcours'),
        (NEW.id, 'formulaires', 'F1.5', 'F1.5 — Exploration & Transformation',
         'questionnaire.html?form=f1-5-transformation'),
        (NEW.id, 'formulaires', 'F1.6', 'F1.6 — La Boussole Intérieure',
         'questionnaire.html?form=f1-6-boussole-interieure'),
        -- Partie 2 — Les Racines (F2.1-F2.5)
        (NEW.id, 'formulaires', 'F2.1', 'F2.1 — Les Fondations',
         'questionnaire.html?form=f2-1-fondations'),
        (NEW.id, 'formulaires', 'F2.2', 'F2.2 — L''Héritage Émotionnel',
         'questionnaire.html?form=f2-2-heritage'),
        (NEW.id, 'formulaires', 'F2.3', 'F2.3 — Les Échos d''Enfance',
         'questionnaire.html?form=f2-3-echos'),
        (NEW.id, 'formulaires', 'F2.4', 'F2.4 — Le Style d''Attachement',
         'questionnaire.html?form=f2-4-attachement'),
        (NEW.id, 'formulaires', 'F2.5', 'F2.5 — Le Corps Raconte',
         'questionnaire.html?form=f2-5-corps-raconte'),
        -- Partie 3 — Les Patterns (F3.1-F3.4)
        (NEW.id, 'formulaires', 'F3.1', 'F3.1 — Début des Relations',
         'questionnaire.html?form=f3-1-debut-relations'),
        (NEW.id, 'formulaires', 'F3.2', 'F3.2 — Les Saisons Amoureuses',
         'questionnaire.html?form=f3-2-saisons'),
        (NEW.id, 'formulaires', 'F3.3', 'F3.3 — Racines Entrelacées',
         'questionnaire.html?form=f3-3-racines-entrelacees'),
        (NEW.id, 'formulaires', 'F3.4', 'F3.4 — Forces & Créativité',
         'questionnaire.html?form=f3-4-forces-creativite'),
        -- Partie 4 — Les Valeurs (F4.1-F4.3)
        (NEW.id, 'formulaires', 'F4.1', 'F4.1 — Spiritualité et Amour',
         'questionnaire.html?form=f4-1-spiritualite'),
        (NEW.id, 'formulaires', 'F4.2', 'F4.2 — Le Jardin Secret',
         'questionnaire.html?form=f4-2-jardin-secret'),
        (NEW.id, 'formulaires', 'F4.3', 'F4.3 — La Boussole du Coeur',
         'questionnaire.html?form=f4-3-boussole-coeur'),
        -- Bilan Final
        (NEW.id, 'formulaires', 'F_FINAL', 'Formulaire Final — Le Bilan',
         'questionnaire.html?form=f-final-bilan'),
        -- Express (EXP1-EXP4)
        (NEW.id, 'formulaires', 'EXP1', 'F1 — L''Empreinte',
         'questionnaire.html?form=f1-express'),
        (NEW.id, 'formulaires', 'EXP2', 'F2 — Le Schéma',
         'questionnaire.html?form=f2-express'),
        (NEW.id, 'formulaires', 'EXP3', 'F3 — La Boussole',
         'questionnaire.html?form=f3-express'),
        (NEW.id, 'formulaires', 'EXP4', 'F4 — Les Forces',
         'questionnaire.html?form=f4-express')
    ON CONFLICT DO NOTHING;

    -- ========================================
    -- Ressources (48 weeks + 30 Ramadan)
    -- ========================================
    INSERT INTO section_content (client_id, section_key, content_key, titre, metadata) VALUES
        -- MOIS 1
        (NEW.id, 'ressources', 'm1w1', 'Introduction au parcours',                  '{"duration":"Vidéo 12min + Guide","media_type":"video"}'::jsonb),
        (NEW.id, 'ressources', 'm1w2', 'Comprendre tes schémas',                    '{"duration":"Audio 18min + Guide","media_type":"audio"}'::jsonb),
        (NEW.id, 'ressources', 'm1w3', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
        (NEW.id, 'ressources', 'm1w4', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
        -- MOIS 2
        (NEW.id, 'ressources', 'm2w1', 'Les blessures fondamentales',               '{"duration":"Vidéo 24min + Guide","media_type":"video"}'::jsonb),
        (NEW.id, 'ressources', 'm2w2', 'Identifier tes masques',                    '{"duration":"Audio 15min + Guide","media_type":"audio"}'::jsonb),
        (NEW.id, 'ressources', 'm2w3', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
        (NEW.id, 'ressources', 'm2w4', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
        -- MOIS 3-12: locked
        (NEW.id, 'ressources', 'm3w1', 'Les styles d''attachement',                 '{"duration":"Vidéo 20min + Guide","media_type":"video"}'::jsonb),
        (NEW.id, 'ressources', 'm3w2', 'L''attachement sécurisant',                 '{"duration":"Audio 12min + Guide","media_type":"audio"}'::jsonb),
        (NEW.id, 'ressources', 'm3w3', 'Bientôt disponible',                        '{"locked":true}'::jsonb),
        (NEW.id, 'ressources', 'm3w4', 'Bientôt disponible',                        '{"locked":true}'::jsonb)
    ON CONFLICT DO NOTHING;

    -- Plan d'action
    INSERT INTO section_content (client_id, section_key, content_key, titre) VALUES
        (NEW.id, 'plan_action', 'PLAN', 'Mon Plan d''Action')
    ON CONFLICT DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- STEP 3: Verify migration
-- ============================================================

-- Count remaining Typebot URLs (should be 0)
DO $$
DECLARE
    remaining INTEGER;
BEGIN
    SELECT COUNT(*) INTO remaining
    FROM section_content
    WHERE section_key = 'formulaires'
      AND url LIKE '%typebot.co%';
    
    IF remaining > 0 THEN
        RAISE WARNING 'Migration incomplete: % rows still have Typebot URLs', remaining;
    ELSE
        RAISE NOTICE 'Migration complete: all formulaire URLs now use chat engine';
    END IF;
END $$;

COMMIT;
