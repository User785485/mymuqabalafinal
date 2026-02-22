-- =====================================================================================
--  MIGRATION: Extend section_content schema + seed skeleton data
--
--  PROBLEM: The mobile app expects columns (content_key, titre, contenu_html, url,
--  is_completed, metadata) that don't exist in the V1 section_content table.
--  Also, the table is empty — no content rows for any client.
--
--  SOLUTION:
--    1. ALTER TABLE to add missing columns
--    2. Seed skeleton rows for all existing participants (cartographie, formulaires,
--       ressources, plan_action)
--    3. Update the trigger to also create section_content skeletons for new clients
-- =====================================================================================

BEGIN;
SET lock_timeout = '30s';


-- ============================================================
-- STEP 1: Add missing columns to section_content
-- ============================================================

-- Columns (IF NOT EXISTS = safe to re-run)
ALTER TABLE section_content ADD COLUMN IF NOT EXISTS content_key VARCHAR(100);
ALTER TABLE section_content ADD COLUMN IF NOT EXISTS titre TEXT;
ALTER TABLE section_content ADD COLUMN IF NOT EXISTS contenu_html TEXT;
ALTER TABLE section_content ADD COLUMN IF NOT EXISTS url TEXT;
ALTER TABLE section_content ADD COLUMN IF NOT EXISTS is_completed BOOLEAN DEFAULT false;
ALTER TABLE section_content ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Drop the old V1 unique constraint on (client_id, section_key) which blocks
-- multiple rows per section. We need (client_id, section_key, content_key) instead.
ALTER TABLE section_content DROP CONSTRAINT IF EXISTS section_content_client_section_unique;
ALTER TABLE section_content DROP CONSTRAINT IF EXISTS section_content_client_id_section_key_key;

-- Add the new 3-column unique constraint
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'section_content_client_section_key_uq'
    ) THEN
        ALTER TABLE section_content
            ADD CONSTRAINT section_content_client_section_key_uq
            UNIQUE (client_id, section_key, content_key);
    END IF;
EXCEPTION WHEN others THEN
    RAISE NOTICE 'Unique constraint already exists or conflict: %', SQLERRM;
END $$;


-- ============================================================
-- STEP 2: Seed skeleton rows for ALL existing participants
-- ============================================================

-- 2a. Cartographie Émotionnelle: DOC_01 to DOC_20
INSERT INTO section_content (client_id, section_key, content_key, titre)
SELECT
    p.id,
    'cartographie',
    doc.key,
    doc.titre
FROM profiles p
CROSS JOIN (VALUES
    ('DOC_01', 'Accueil & Introduction'),
    ('DOC_02', 'Mon Histoire Émotionnelle'),
    ('DOC_03', 'Mes Valeurs Fondamentales'),
    ('DOC_04', 'Mes Besoins Relationnels'),
    ('DOC_05', 'Mon Style d''Attachement'),
    ('DOC_06', 'Mes Schémas Répétitifs'),
    ('DOC_07', 'Mes Blessures Émotionnelles'),
    ('DOC_08', 'Ma Relation au Conflit'),
    ('DOC_09', 'Ma Communication Affective'),
    ('DOC_10', 'Mon Rapport à l''Engagement'),
    ('DOC_11', 'Transformer mes Croyances'),
    ('DOC_12', 'Développer ma Résilience'),
    ('DOC_13', 'Cultiver l''Empathie'),
    ('DOC_14', 'Renforcer ma Confiance'),
    ('DOC_15', 'Construire mes Limites Saines'),
    ('DOC_16', 'Intégrer mes Apprentissages'),
    ('DOC_17', 'Mon Projet de Couple'),
    ('DOC_18', 'Ma Vision du Mariage'),
    ('DOC_19', 'Mon Plan d''Action Personnel'),
    ('DOC_20', 'Synthèse & Perspectives')
) AS doc(key, titre)
WHERE p.role = 'participant'
ON CONFLICT (client_id, section_key, content_key) DO NOTHING;

-- 2b. Formulaires Exploratoires: Scénarios S1-S10 + Phases F1-F4
INSERT INTO section_content (client_id, section_key, content_key, titre)
SELECT
    p.id,
    'formulaires',
    f.key,
    f.titre
FROM profiles p
CROSS JOIN (VALUES
    ('S1',   'Scénario 1 — Première Rencontre'),
    ('S2',   'Scénario 2 — La Vie Quotidienne'),
    ('S3',   'Scénario 3 — Gestion des Conflits'),
    ('S4',   'Scénario 4 — Les Finances'),
    ('S5',   'Scénario 5 — La Famille Élargie'),
    ('S6',   'Scénario 6 — L''Éducation des Enfants'),
    ('S7',   'Scénario 7 — La Spiritualité'),
    ('S8',   'Scénario 8 — Les Projets de Vie'),
    ('S9',   'Scénario 9 — La Communication'),
    ('S10',  'Scénario 10 — L''Intimité'),
    ('F1.1', 'Phase 1 — Auto-évaluation'),
    ('F1.2', 'Phase 1 — Mes Attentes'),
    ('F1.3', 'Phase 1 — Mon Profil Idéal'),
    ('F2.1', 'Phase 2 — Compatibilité Valeurs'),
    ('F2.2', 'Phase 2 — Compatibilité Mode de Vie'),
    ('F2.3', 'Phase 2 — Compatibilité Émotionnelle'),
    ('F3.1', 'Phase 3 — Bilan Intermédiaire'),
    ('F3.2', 'Phase 3 — Ajustements'),
    ('F3.3', 'Phase 3 — Décision Éclairée'),
    ('F4.1', 'Phase 4 — Engagement'),
    ('F4.2', 'Phase 4 — Préparation au Mariage'),
    ('F4.3', 'Phase 4 — Bilan Final')
) AS f(key, titre)
WHERE p.role = 'participant'
ON CONFLICT (client_id, section_key, content_key) DO NOTHING;

-- 2c. Ressources: 12 semaines programme
INSERT INTO section_content (client_id, section_key, content_key, titre, metadata)
SELECT
    p.id,
    'ressources',
    r.key,
    r.titre,
    r.meta::jsonb
FROM profiles p
CROSS JOIN (VALUES
    ('W01', 'Semaine 1 — Se Connaître',        '{"duration":"45 min"}'),
    ('W02', 'Semaine 2 — Ses Valeurs',          '{"duration":"45 min"}'),
    ('W03', 'Semaine 3 — Communication',        '{"duration":"50 min"}'),
    ('W04', 'Semaine 4 — Gestion Émotionnelle', '{"duration":"45 min"}'),
    ('W05', 'Semaine 5 — L''Attachement',       '{"duration":"50 min"}'),
    ('W06', 'Semaine 6 — Les Conflits',         '{"duration":"45 min"}'),
    ('W07', 'Semaine 7 — La Confiance',         '{"duration":"50 min"}'),
    ('W08', 'Semaine 8 — L''Engagement',        '{"duration":"45 min"}'),
    ('W09', 'Semaine 9 — La Famille',           '{"duration":"50 min"}'),
    ('W10', 'Semaine 10 — La Spiritualité',     '{"duration":"45 min"}'),
    ('W11', 'Semaine 11 — Le Projet de Couple', '{"duration":"50 min"}'),
    ('W12', 'Semaine 12 — Bilan & Suite',       '{"duration":"45 min"}')
) AS r(key, titre, meta)
WHERE p.role = 'participant'
ON CONFLICT (client_id, section_key, content_key) DO NOTHING;

-- 2d. Plan d'Action: objectifs mensuels + bilans
INSERT INTO section_content (client_id, section_key, content_key, titre)
SELECT
    p.id,
    'plan_action',
    pa.key,
    pa.titre
FROM profiles p
CROSS JOIN (VALUES
    ('month_1_obj1', 'Définir mes critères essentiels'),
    ('month_1_obj2', 'Compléter mon profil émotionnel'),
    ('month_1_obj3', 'Premier échange structuré'),
    ('month_2_obj1', 'Approfondir la compatibilité'),
    ('month_2_obj2', 'Rencontre supervisée'),
    ('month_2_obj3', 'Bilan de mi-parcours'),
    ('month_3_obj1', 'Consolider la relation'),
    ('month_3_obj2', 'Préparer la décision finale'),
    ('month_3_obj3', 'Plan post-accompagnement'),
    ('bilan_1',      'Bilan du Premier Mois'),
    ('bilan_2',      'Bilan du Deuxième Mois'),
    ('bilan_3',      'Bilan Final & Perspectives')
) AS pa(key, titre)
WHERE p.role = 'participant'
ON CONFLICT (client_id, section_key, content_key) DO NOTHING;


-- ============================================================
-- STEP 3: Update trigger to also seed section_content for new clients
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

        -- Section content: Cartographie (20 docs)
        INSERT INTO section_content (client_id, section_key, content_key, titre) VALUES
            (NEW.id, 'cartographie', 'DOC_01', 'Accueil & Introduction'),
            (NEW.id, 'cartographie', 'DOC_02', 'Mon Histoire Émotionnelle'),
            (NEW.id, 'cartographie', 'DOC_03', 'Mes Valeurs Fondamentales'),
            (NEW.id, 'cartographie', 'DOC_04', 'Mes Besoins Relationnels'),
            (NEW.id, 'cartographie', 'DOC_05', 'Mon Style d''Attachement'),
            (NEW.id, 'cartographie', 'DOC_06', 'Mes Schémas Répétitifs'),
            (NEW.id, 'cartographie', 'DOC_07', 'Mes Blessures Émotionnelles'),
            (NEW.id, 'cartographie', 'DOC_08', 'Ma Relation au Conflit'),
            (NEW.id, 'cartographie', 'DOC_09', 'Ma Communication Affective'),
            (NEW.id, 'cartographie', 'DOC_10', 'Mon Rapport à l''Engagement'),
            (NEW.id, 'cartographie', 'DOC_11', 'Transformer mes Croyances'),
            (NEW.id, 'cartographie', 'DOC_12', 'Développer ma Résilience'),
            (NEW.id, 'cartographie', 'DOC_13', 'Cultiver l''Empathie'),
            (NEW.id, 'cartographie', 'DOC_14', 'Renforcer ma Confiance'),
            (NEW.id, 'cartographie', 'DOC_15', 'Construire mes Limites Saines'),
            (NEW.id, 'cartographie', 'DOC_16', 'Intégrer mes Apprentissages'),
            (NEW.id, 'cartographie', 'DOC_17', 'Mon Projet de Couple'),
            (NEW.id, 'cartographie', 'DOC_18', 'Ma Vision du Mariage'),
            (NEW.id, 'cartographie', 'DOC_19', 'Mon Plan d''Action Personnel'),
            (NEW.id, 'cartographie', 'DOC_20', 'Synthèse & Perspectives')
        ON CONFLICT DO NOTHING;

        -- Section content: Formulaires (22 items)
        INSERT INTO section_content (client_id, section_key, content_key, titre) VALUES
            (NEW.id, 'formulaires', 'S1',   'Scénario 1 — Première Rencontre'),
            (NEW.id, 'formulaires', 'S2',   'Scénario 2 — La Vie Quotidienne'),
            (NEW.id, 'formulaires', 'S3',   'Scénario 3 — Gestion des Conflits'),
            (NEW.id, 'formulaires', 'S4',   'Scénario 4 — Les Finances'),
            (NEW.id, 'formulaires', 'S5',   'Scénario 5 — La Famille Élargie'),
            (NEW.id, 'formulaires', 'S6',   'Scénario 6 — L''Éducation des Enfants'),
            (NEW.id, 'formulaires', 'S7',   'Scénario 7 — La Spiritualité'),
            (NEW.id, 'formulaires', 'S8',   'Scénario 8 — Les Projets de Vie'),
            (NEW.id, 'formulaires', 'S9',   'Scénario 9 — La Communication'),
            (NEW.id, 'formulaires', 'S10',  'Scénario 10 — L''Intimité'),
            (NEW.id, 'formulaires', 'F1.1', 'Phase 1 — Auto-évaluation'),
            (NEW.id, 'formulaires', 'F1.2', 'Phase 1 — Mes Attentes'),
            (NEW.id, 'formulaires', 'F1.3', 'Phase 1 — Mon Profil Idéal'),
            (NEW.id, 'formulaires', 'F2.1', 'Phase 2 — Compatibilité Valeurs'),
            (NEW.id, 'formulaires', 'F2.2', 'Phase 2 — Compatibilité Mode de Vie'),
            (NEW.id, 'formulaires', 'F2.3', 'Phase 2 — Compatibilité Émotionnelle'),
            (NEW.id, 'formulaires', 'F3.1', 'Phase 3 — Bilan Intermédiaire'),
            (NEW.id, 'formulaires', 'F3.2', 'Phase 3 — Ajustements'),
            (NEW.id, 'formulaires', 'F3.3', 'Phase 3 — Décision Éclairée'),
            (NEW.id, 'formulaires', 'F4.1', 'Phase 4 — Engagement'),
            (NEW.id, 'formulaires', 'F4.2', 'Phase 4 — Préparation au Mariage'),
            (NEW.id, 'formulaires', 'F4.3', 'Phase 4 — Bilan Final')
        ON CONFLICT DO NOTHING;

        -- Section content: Ressources (12 weeks)
        INSERT INTO section_content (client_id, section_key, content_key, titre, metadata) VALUES
            (NEW.id, 'ressources', 'W01', 'Semaine 1 — Se Connaître',        '{"duration":"45 min"}'::jsonb),
            (NEW.id, 'ressources', 'W02', 'Semaine 2 — Ses Valeurs',          '{"duration":"45 min"}'::jsonb),
            (NEW.id, 'ressources', 'W03', 'Semaine 3 — Communication',        '{"duration":"50 min"}'::jsonb),
            (NEW.id, 'ressources', 'W04', 'Semaine 4 — Gestion Émotionnelle', '{"duration":"45 min"}'::jsonb),
            (NEW.id, 'ressources', 'W05', 'Semaine 5 — L''Attachement',       '{"duration":"50 min"}'::jsonb),
            (NEW.id, 'ressources', 'W06', 'Semaine 6 — Les Conflits',         '{"duration":"45 min"}'::jsonb),
            (NEW.id, 'ressources', 'W07', 'Semaine 7 — La Confiance',         '{"duration":"50 min"}'::jsonb),
            (NEW.id, 'ressources', 'W08', 'Semaine 8 — L''Engagement',        '{"duration":"45 min"}'::jsonb),
            (NEW.id, 'ressources', 'W09', 'Semaine 9 — La Famille',           '{"duration":"50 min"}'::jsonb),
            (NEW.id, 'ressources', 'W10', 'Semaine 10 — La Spiritualité',     '{"duration":"45 min"}'::jsonb),
            (NEW.id, 'ressources', 'W11', 'Semaine 11 — Le Projet de Couple', '{"duration":"50 min"}'::jsonb),
            (NEW.id, 'ressources', 'W12', 'Semaine 12 — Bilan & Suite',       '{"duration":"45 min"}'::jsonb)
        ON CONFLICT DO NOTHING;

        -- Section content: Plan d'action (9 objectifs + 3 bilans)
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


-- ============================================================
-- STEP 4: RLS self-access for section_content (if not already set)
-- ============================================================
-- The previous migration added admin_all_content. Add self-access for participants.

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'section_content' AND policyname = 'section_content_select_own'
    ) THEN
        CREATE POLICY section_content_select_own
            ON section_content FOR SELECT TO authenticated
            USING ((SELECT auth.uid()) = client_id);
    END IF;
EXCEPTION WHEN others THEN
    RAISE NOTICE 'Policy section_content_select_own: %', SQLERRM;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'section_content' AND policyname = 'section_content_update_own'
    ) THEN
        CREATE POLICY section_content_update_own
            ON section_content FOR UPDATE TO authenticated
            USING ((SELECT auth.uid()) = client_id)
            WITH CHECK ((SELECT auth.uid()) = client_id);
    END IF;
EXCEPTION WHEN others THEN
    RAISE NOTICE 'Policy section_content_update_own: %', SQLERRM;
END $$;


COMMIT;
