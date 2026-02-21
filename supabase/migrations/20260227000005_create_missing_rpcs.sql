-- =====================================================================================
--  M5: Create 4 missing RPCs referenced by dashboard-app.js / chat-engine.js
--  All use SECURITY DEFINER with internal verify_client_access() authentication
--
--  PREREQUISITE: section_content table must exist with UNIQUE (client_id, section_key)
--  for ON CONFLICT clauses. Created below if missing (V1 table may not exist).
-- =====================================================================================

-- ── Ensure section_content table exists (V1 table, may not be present) ─────
CREATE TABLE IF NOT EXISTS section_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    section_key TEXT NOT NULL,
    content_value TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE section_content ENABLE ROW LEVEL SECURITY;

-- Ensure unique constraint exists for ON CONFLICT (client_id, section_key)
DO $$
BEGIN
    ALTER TABLE section_content
        ADD CONSTRAINT section_content_client_section_unique
        UNIQUE (client_id, section_key);
EXCEPTION
    WHEN duplicate_table THEN NULL;
    WHEN duplicate_object THEN NULL;
END;
$$;

-- RLS policies for section_content (if newly created, needs policies)
-- Use DO/EXCEPTION to avoid conflicts if M2 already created them
DO $$
BEGIN
    EXECUTE 'CREATE POLICY "section_content_select_coach_admin_m5"
        ON section_content FOR SELECT TO authenticated USING (is_admin_or_coach())';
EXCEPTION WHEN duplicate_object THEN NULL;
END;
$$;

DO $$
BEGIN
    EXECUTE 'CREATE POLICY "section_content_insert_coach_admin_m5"
        ON section_content FOR INSERT TO authenticated WITH CHECK (is_admin_or_coach())';
EXCEPTION WHEN duplicate_object THEN NULL;
END;
$$;

DO $$
BEGIN
    EXECUTE 'CREATE POLICY "section_content_update_coach_admin_m5"
        ON section_content FOR UPDATE TO authenticated
        USING (is_admin_or_coach()) WITH CHECK (is_admin_or_coach())';
EXCEPTION WHEN duplicate_object THEN NULL;
END;
$$;

DO $$
BEGIN
    EXECUTE 'CREATE POLICY "section_content_delete_admin_m5"
        ON section_content FOR DELETE TO authenticated USING (is_admin())';
EXCEPTION WHEN duplicate_object THEN NULL;
END;
$$;


-- ── save_client_progress ─────────────────────────────────────────────────────
-- Saves client progression data (formulaires, ressources completion)
CREATE OR REPLACE FUNCTION save_client_progress(
    p_telephone TEXT,
    p_code TEXT,
    p_progress JSONB
)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_client_id UUID;
BEGIN
    -- Authenticate client
    SELECT verify_client_access(p_telephone, p_code) INTO v_client_id;
    IF v_client_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Accès refusé');
    END IF;

    -- Upsert into section_content
    INSERT INTO section_content (client_id, section_key, content_value)
    VALUES (v_client_id, 'progress', p_progress::TEXT)
    ON CONFLICT (client_id, section_key)
    DO UPDATE SET content_value = p_progress::TEXT;

    RETURN jsonb_build_object('success', true);
END;
$$;

REVOKE EXECUTE ON FUNCTION save_client_progress(TEXT, TEXT, JSONB) FROM public;
GRANT EXECUTE ON FUNCTION save_client_progress(TEXT, TEXT, JSONB) TO anon, authenticated;


-- ── save_form_progress ───────────────────────────────────────────────────────
-- Saves partial form progress (draft answers for a specific form)
CREATE OR REPLACE FUNCTION save_form_progress(
    p_telephone TEXT,
    p_code TEXT,
    p_form_id TEXT,
    p_step INTEGER,
    p_answers JSONB
)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_client_id UUID;
    v_section_key TEXT;
    v_content JSONB;
BEGIN
    SELECT verify_client_access(p_telephone, p_code) INTO v_client_id;
    IF v_client_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Accès refusé');
    END IF;

    v_section_key := 'form_progress_' || p_form_id;
    v_content := jsonb_build_object(
        'form_id', p_form_id,
        'step', p_step,
        'answers', p_answers,
        'status', 'in_progress',
        'updated_at', NOW()
    );

    INSERT INTO section_content (client_id, section_key, content_value)
    VALUES (v_client_id, v_section_key, v_content::TEXT)
    ON CONFLICT (client_id, section_key)
    DO UPDATE SET content_value = v_content::TEXT;

    RETURN jsonb_build_object('success', true, 'step', p_step);
END;
$$;

REVOKE EXECUTE ON FUNCTION save_form_progress(TEXT, TEXT, TEXT, INTEGER, JSONB) FROM public;
GRANT EXECUTE ON FUNCTION save_form_progress(TEXT, TEXT, TEXT, INTEGER, JSONB) TO anon, authenticated;


-- ── load_form_progress ───────────────────────────────────────────────────────
-- Loads saved form progress for a specific form
CREATE OR REPLACE FUNCTION load_form_progress(
    p_telephone TEXT,
    p_code TEXT,
    p_form_id TEXT
)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_client_id UUID;
    v_section_key TEXT;
    v_content TEXT;
BEGIN
    SELECT verify_client_access(p_telephone, p_code) INTO v_client_id;
    IF v_client_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Accès refusé');
    END IF;

    v_section_key := 'form_progress_' || p_form_id;

    SELECT content_value INTO v_content
    FROM section_content
    WHERE client_id = v_client_id AND section_key = v_section_key;

    IF v_content IS NULL THEN
        RETURN jsonb_build_object('success', true, 'data', NULL);
    END IF;

    RETURN jsonb_build_object('success', true, 'data', v_content::JSONB);
END;
$$;

REVOKE EXECUTE ON FUNCTION load_form_progress(TEXT, TEXT, TEXT) FROM public;
GRANT EXECUTE ON FUNCTION load_form_progress(TEXT, TEXT, TEXT) TO anon, authenticated;


-- ── complete_form_response ───────────────────────────────────────────────────
-- Marks a form as completed with final answers
CREATE OR REPLACE FUNCTION complete_form_response(
    p_telephone TEXT,
    p_code TEXT,
    p_form_id TEXT,
    p_answers JSONB
)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_client_id UUID;
    v_section_key TEXT;
    v_content JSONB;
BEGIN
    SELECT verify_client_access(p_telephone, p_code) INTO v_client_id;
    IF v_client_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Accès refusé');
    END IF;

    v_section_key := 'form_progress_' || p_form_id;
    v_content := jsonb_build_object(
        'form_id', p_form_id,
        'answers', p_answers,
        'status', 'completed',
        'completed_at', NOW()
    );

    INSERT INTO section_content (client_id, section_key, content_value)
    VALUES (v_client_id, v_section_key, v_content::TEXT)
    ON CONFLICT (client_id, section_key)
    DO UPDATE SET content_value = v_content::TEXT;

    RETURN jsonb_build_object('success', true, 'status', 'completed');
END;
$$;

REVOKE EXECUTE ON FUNCTION complete_form_response(TEXT, TEXT, TEXT, JSONB) FROM public;
GRANT EXECUTE ON FUNCTION complete_form_response(TEXT, TEXT, TEXT, JSONB) TO anon, authenticated;
