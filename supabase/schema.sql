-- ═══════════════════════════════════════════════════════
--  MY MUQABALA — Supabase Database Setup
--  Execute this SQL in the Supabase SQL Editor
-- ═══════════════════════════════════════════════════════

-- 1. TABLE: clients
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id VARCHAR(6) UNIQUE NOT NULL,
    access_code VARCHAR(6) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    nom VARCHAR(100) DEFAULT '',
    email VARCHAR(255) DEFAULT '',
    telephone VARCHAR(20) DEFAULT '',
    statut VARCHAR(20) DEFAULT 'actif' CHECK (statut IN ('actif', 'archive', 'pause')),
    notes_internes TEXT DEFAULT '',
    compte_rendu_id VARCHAR(6) DEFAULT '',
    plan_action_id VARCHAR(6) DEFAULT '',
    cartographie_id VARCHAR(6) DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. TABLE: section_visibility
CREATE TABLE IF NOT EXISTS section_visibility (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE UNIQUE NOT NULL,
    show_accueil BOOLEAN DEFAULT true,
    show_ressources BOOLEAN DEFAULT true,
    show_formulaires BOOLEAN DEFAULT true,
    show_cartographie BOOLEAN DEFAULT true,
    show_compatibilite BOOLEAN DEFAULT true,
    show_plan_action BOOLEAN DEFAULT true,
    show_rencontres BOOLEAN DEFAULT true,
    show_historique BOOLEAN DEFAULT true
);

-- 3. TABLE: retours_hebdomadaires
CREATE TABLE IF NOT EXISTS retours_hebdomadaires (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
    semaine_numero INTEGER NOT NULL,
    date_retour TEXT DEFAULT '',
    contenu TEXT DEFAULT '',
    statut VARCHAR(20) DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'redige')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(client_id, semaine_numero)
);

-- 4. TABLE: bilans_plan_action
CREATE TABLE IF NOT EXISTS bilans_plan_action (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
    mois_numero INTEGER NOT NULL CHECK (mois_numero BETWEEN 1 AND 3),
    titre VARCHAR(255) NOT NULL,
    contenu TEXT DEFAULT '',
    statut VARCHAR(20) DEFAULT 'a_venir' CHECK (statut IN ('a_venir', 'en_cours', 'disponible')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(client_id, mois_numero)
);

-- 5. TABLE: rencontres_historique
CREATE TABLE IF NOT EXISTS rencontres_historique (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
    numero INTEGER NOT NULL,
    date_rencontre TEXT DEFAULT '',
    titre VARCHAR(255) DEFAULT '',
    analyse TEXT DEFAULT '',
    statut VARCHAR(20) DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'analyse_disponible')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(client_id, numero)
);

-- 6. TABLE: section_content (key-value flexible content)
CREATE TABLE IF NOT EXISTS section_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
    section_key VARCHAR(100) NOT NULL,
    content_value TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(client_id, section_key)
);

-- ═══ INDEXES ═══
CREATE INDEX IF NOT EXISTS idx_clients_client_id ON clients(client_id);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_telephone ON clients(telephone);
CREATE INDEX IF NOT EXISTS idx_clients_prenom ON clients(prenom);
CREATE INDEX IF NOT EXISTS idx_retours_client ON retours_hebdomadaires(client_id);
CREATE INDEX IF NOT EXISTS idx_bilans_client ON bilans_plan_action(client_id);
CREATE INDEX IF NOT EXISTS idx_rencontres_client ON rencontres_historique(client_id);
CREATE INDEX IF NOT EXISTS idx_section_content_client ON section_content(client_id);

-- ═══ TRIGGER: auto-update updated_at ═══
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER tr_clients_updated_at
    BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE OR REPLACE TRIGGER tr_retours_updated_at
    BEFORE UPDATE ON retours_hebdomadaires FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE OR REPLACE TRIGGER tr_bilans_updated_at
    BEFORE UPDATE ON bilans_plan_action FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE OR REPLACE TRIGGER tr_rencontres_updated_at
    BEFORE UPDATE ON rencontres_historique FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE OR REPLACE TRIGGER tr_section_content_updated_at
    BEFORE UPDATE ON section_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ═══ TRIGGER: auto-create section_visibility on client insert ═══
CREATE OR REPLACE FUNCTION create_section_visibility()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO section_visibility (client_id) VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER tr_client_create_visibility
    AFTER INSERT ON clients FOR EACH ROW EXECUTE FUNCTION create_section_visibility();

-- ═══ TRIGGER: auto-create 3 bilans on client insert ═══
CREATE OR REPLACE FUNCTION create_bilans()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO bilans_plan_action (client_id, mois_numero, titre) VALUES
        (NEW.id, 1, 'Bilan du Premier Mois'),
        (NEW.id, 2, 'Bilan du Deuxieme Mois'),
        (NEW.id, 3, 'Bilan Final & Perspectives');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER tr_client_create_bilans
    AFTER INSERT ON clients FOR EACH ROW EXECUTE FUNCTION create_bilans();

-- ═══ RPC: verify_client_access ═══
CREATE OR REPLACE FUNCTION verify_client_access(p_client_id TEXT, p_code TEXT)
RETURNS UUID AS $$
DECLARE
    v_uuid UUID;
BEGIN
    SELECT id INTO v_uuid
    FROM clients
    WHERE client_id = p_client_id
      AND access_code = p_code
      AND statut = 'actif';
    RETURN v_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ═══ RPC: get_client_dashboard ═══
CREATE OR REPLACE FUNCTION get_client_dashboard(p_uuid UUID)
RETURNS JSON AS $$
DECLARE
    v_result JSON;
BEGIN
    SELECT json_build_object(
        'client', (SELECT row_to_json(c) FROM (
            SELECT id, client_id, prenom, nom, statut,
                   compte_rendu_id, plan_action_id, cartographie_id
            FROM clients WHERE id = p_uuid
        ) c),
        'visibility', (SELECT row_to_json(v) FROM (
            SELECT show_accueil, show_ressources, show_formulaires,
                   show_cartographie, show_compatibilite, show_plan_action,
                   show_rencontres, show_historique
            FROM section_visibility WHERE client_id = p_uuid
        ) v),
        'retours', COALESCE((SELECT json_agg(r ORDER BY r.semaine_numero) FROM (
            SELECT semaine_numero, date_retour, contenu, statut
            FROM retours_hebdomadaires WHERE client_id = p_uuid
        ) r), '[]'::json),
        'bilans', COALESCE((SELECT json_agg(b ORDER BY b.mois_numero) FROM (
            SELECT mois_numero, titre, contenu, statut
            FROM bilans_plan_action WHERE client_id = p_uuid
        ) b), '[]'::json),
        'rencontres', COALESCE((SELECT json_agg(h ORDER BY h.numero) FROM (
            SELECT numero, date_rencontre, titre, analyse, statut
            FROM rencontres_historique WHERE client_id = p_uuid
        ) h), '[]'::json),
        'content', COALESCE((SELECT json_object_agg(sc.section_key, sc.content_value) FROM (
            SELECT section_key, content_value
            FROM section_content WHERE client_id = p_uuid
        ) sc), '{}'::json)
    ) INTO v_result;
    RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ═══ ROW LEVEL SECURITY ═══
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_visibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE retours_hebdomadaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE bilans_plan_action ENABLE ROW LEVEL SECURITY;
ALTER TABLE rencontres_historique ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_content ENABLE ROW LEVEL SECURITY;

-- Admin (authenticated) = full CRUD
CREATE POLICY admin_all_clients ON clients
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY admin_all_visibility ON section_visibility
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY admin_all_retours ON retours_hebdomadaires
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY admin_all_bilans ON bilans_plan_action
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY admin_all_rencontres ON rencontres_historique
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY admin_all_content ON section_content
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Anon = read-only via RPC (SECURITY DEFINER functions bypass RLS)
-- No direct table access for anon users
