-- ═══════════════════════════════════════
-- Fix form RPCs — ON CONFLICT mismatch
--
-- PROBLEM: Migration 20260302000001 dropped the 2-column unique constraint
--   (client_id, section_key) on section_content and replaced it with
--   (client_id, section_key, content_key). But save_form_progress and
--   complete_form_response still use ON CONFLICT (client_id, section_key)
--   → PostgreSQL error 42P10.
--
-- FIX: Rewrite RPCs to use form_responses as primary store (has correct
--   UNIQUE(client_id, form_id)), with section_content backward-compat
--   using the 3-column constraint.
-- ═══════════════════════════════════════


-- 1. Fix save_form_progress: write to form_responses + section_content
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

    -- Primary store: form_responses (has UNIQUE(client_id, form_id))
    -- Embed _step in answers JSONB so load_form_progress can extract it
    INSERT INTO form_responses (client_id, form_id, answers, status, updated_at)
    VALUES (v_client_id, p_form_id, jsonb_set(p_answers, '{_step}', to_jsonb(p_step)), 'in_progress', now())
    ON CONFLICT (client_id, form_id)
    DO UPDATE SET
        answers = jsonb_set(EXCLUDED.answers, '{_step}', to_jsonb(p_step)),
        status = 'in_progress',
        updated_at = now();

    -- Backward-compat: section_content (3-column unique)
    v_section_key := 'form_progress_' || p_form_id;
    v_content := jsonb_build_object(
        'form_id', p_form_id,
        'step', p_step,
        'answers', p_answers,
        'status', 'in_progress',
        'updated_at', NOW()
    );

    INSERT INTO section_content (client_id, section_key, content_key, content_value)
    VALUES (v_client_id, v_section_key, 'progress', v_content::TEXT)
    ON CONFLICT (client_id, section_key, content_key)
    DO UPDATE SET content_value = v_content::TEXT;

    RETURN jsonb_build_object('success', true, 'step', p_step);
END;
$$;

REVOKE EXECUTE ON FUNCTION save_form_progress(TEXT, TEXT, TEXT, INTEGER, JSONB) FROM public;
GRANT EXECUTE ON FUNCTION save_form_progress(TEXT, TEXT, TEXT, INTEGER, JSONB) TO anon, authenticated;


-- 2. Fix load_form_progress: read from form_responses first, fallback section_content
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
    v_form_row RECORD;
    v_content TEXT;
    v_section_key TEXT;
BEGIN
    SELECT verify_client_access(p_telephone, p_code) INTO v_client_id;
    IF v_client_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Accès refusé');
    END IF;

    -- Try form_responses first (primary store)
    SELECT form_id, answers, status, updated_at
    INTO v_form_row
    FROM form_responses
    WHERE client_id = v_client_id AND form_id = p_form_id;

    IF FOUND THEN
        RETURN jsonb_build_object(
            'success', true,
            'data', jsonb_build_object(
                'form_id', v_form_row.form_id,
                'step', COALESCE((v_form_row.answers->>'_step')::int, 0),
                'answers', v_form_row.answers,
                'status', v_form_row.status,
                'updated_at', v_form_row.updated_at
            )
        );
    END IF;

    -- Fallback: section_content (legacy)
    v_section_key := 'form_progress_' || p_form_id;
    SELECT content_value INTO v_content
    FROM section_content
    WHERE client_id = v_client_id AND section_key = v_section_key
    LIMIT 1;

    IF v_content IS NULL THEN
        RETURN jsonb_build_object('success', true, 'data', NULL);
    END IF;

    RETURN jsonb_build_object('success', true, 'data', v_content::JSONB);
END;
$$;

REVOKE EXECUTE ON FUNCTION load_form_progress(TEXT, TEXT, TEXT) FROM public;
GRANT EXECUTE ON FUNCTION load_form_progress(TEXT, TEXT, TEXT) TO anon, authenticated;


-- 3. Fix complete_form_response: section_content backward-compat with 3-column conflict
CREATE OR REPLACE FUNCTION complete_form_response(
    p_telephone TEXT,
    p_code TEXT,
    p_form_id TEXT,
    p_answers JSONB
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_client_id UUID;
BEGIN
    -- Validate inputs
    IF p_answers IS NULL OR p_answers = '{}'::jsonb THEN
        RETURN jsonb_build_object('success', false, 'error', 'Answers cannot be empty');
    END IF;

    -- Verify client
    SELECT verify_client_access(p_telephone, p_code) INTO v_client_id;
    IF v_client_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Client not found');
    END IF;

    -- Primary store: form_responses
    INSERT INTO form_responses (client_id, form_id, answers, status, completed_at, updated_at)
    VALUES (v_client_id, p_form_id, p_answers, 'completed', now(), now())
    ON CONFLICT (client_id, form_id)
    DO UPDATE SET
        answers = EXCLUDED.answers,
        status = 'completed',
        completed_at = now(),
        updated_at = now();

    -- Backward-compat: section_content (3-column unique)
    INSERT INTO section_content (client_id, section_key, content_key, content_value)
    VALUES (v_client_id, 'form_progress_' || p_form_id, 'progress',
        jsonb_build_object(
            'form_id', p_form_id,
            'answers', p_answers,
            'status', 'completed',
            'completed_at', now()
        )::text)
    ON CONFLICT (client_id, section_key, content_key)
    DO UPDATE SET content_value = jsonb_build_object(
        'form_id', p_form_id,
        'answers', p_answers,
        'status', 'completed',
        'completed_at', now()
    )::text;

    -- Audit log
    INSERT INTO audit_log (client_id, action, form_id, metadata)
    VALUES (v_client_id, 'form_completed', p_form_id,
        jsonb_build_object('answer_count', (SELECT count(*) FROM jsonb_object_keys(p_answers)))
    );

    RETURN jsonb_build_object('success', true);
END;
$$;

REVOKE EXECUTE ON FUNCTION complete_form_response(TEXT, TEXT, TEXT, JSONB) FROM public;
GRANT EXECUTE ON FUNCTION complete_form_response(TEXT, TEXT, TEXT, JSONB) TO anon, authenticated;
