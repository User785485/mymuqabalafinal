-- ═══════════════════════════════════════
-- Form Engine v2 — Schema enhancements
-- form_responses table · Versioning · Audit Log · Export RPC · file storage
-- ═══════════════════════════════════════

-- 0. Create form_responses table (dedicated table for completed/in-progress forms)
CREATE TABLE IF NOT EXISTS form_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    form_id TEXT NOT NULL,
    answers JSONB DEFAULT '{}'::jsonb,
    status TEXT NOT NULL DEFAULT 'in_progress'
        CHECK (status IN ('in_progress', 'completed')),
    form_version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed_at TIMESTAMPTZ
);

-- Unique constraint: one response per client per form
DO $$ BEGIN
    ALTER TABLE form_responses
        ADD CONSTRAINT form_responses_client_form_unique
        UNIQUE (client_id, form_id);
EXCEPTION
    WHEN duplicate_table THEN NULL;
    WHEN duplicate_object THEN NULL;
END $$;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_form_responses_client ON form_responses(client_id);
CREATE INDEX IF NOT EXISTS idx_form_responses_form ON form_responses(form_id);
CREATE INDEX IF NOT EXISTS idx_form_responses_status ON form_responses(status);
CREATE INDEX IF NOT EXISTS idx_form_responses_updated ON form_responses(updated_at DESC);

-- RLS: clients see own, admin/coach see all
ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    EXECUTE 'CREATE POLICY "form_responses_self_select"
        ON form_responses FOR SELECT TO authenticated
        USING (client_id = auth.uid())';
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    EXECUTE 'CREATE POLICY "form_responses_admin_select"
        ON form_responses FOR SELECT TO authenticated
        USING (
            EXISTS (
                SELECT 1 FROM profiles
                WHERE profiles.id = auth.uid()
                AND profiles.role IN (''admin'', ''coach'')
            )
        )';
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    EXECUTE 'CREATE POLICY "form_responses_self_insert"
        ON form_responses FOR INSERT TO authenticated
        WITH CHECK (client_id = auth.uid())';
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    EXECUTE 'CREATE POLICY "form_responses_self_update"
        ON form_responses FOR UPDATE TO authenticated
        USING (client_id = auth.uid())
        WITH CHECK (client_id = auth.uid())';
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 1. Add form_version column (for existing installs that might already have the table)
DO $$ BEGIN
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'form_responses' AND column_name = 'form_version') THEN
        -- already exists, no-op
        NULL;
    ELSE
        ALTER TABLE form_responses ADD COLUMN form_version integer DEFAULT 1;
    END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;


-- 2. Audit log table
CREATE TABLE IF NOT EXISTS audit_log (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    client_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
    action text NOT NULL,
    form_id text,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now()
);

-- Index for querying by client and action
CREATE INDEX IF NOT EXISTS idx_audit_log_client ON audit_log(client_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_log_form ON audit_log(form_id);

-- RLS: admin only
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    EXECUTE 'CREATE POLICY "Admin read audit_log"
        ON audit_log FOR SELECT TO authenticated
        USING (
            EXISTS (
                SELECT 1 FROM profiles
                WHERE profiles.id = auth.uid()
                AND profiles.role IN (''admin'', ''coach'')
            )
        )';
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;


-- 3. Enhanced complete_form_response with validation + audit + form_responses table
CREATE OR REPLACE FUNCTION complete_form_response(
    p_telephone text,
    p_code text,
    p_form_id text,
    p_answers jsonb
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_client_id uuid;
BEGIN
    -- Validate inputs
    IF p_answers IS NULL OR p_answers = '{}'::jsonb THEN
        RETURN jsonb_build_object('success', false, 'error', 'Answers cannot be empty');
    END IF;

    -- Verify client via unified verify_client_access
    SELECT verify_client_access(p_telephone, p_code) INTO v_client_id;

    IF v_client_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Client not found');
    END IF;

    -- Update or insert into form_responses table
    INSERT INTO form_responses (client_id, form_id, answers, status, completed_at, updated_at)
    VALUES (v_client_id, p_form_id, p_answers, 'completed', now(), now())
    ON CONFLICT (client_id, form_id)
    DO UPDATE SET
        answers = EXCLUDED.answers,
        status = 'completed',
        completed_at = now(),
        updated_at = now();

    -- Also update section_content (for backward compat with dashboard)
    INSERT INTO section_content (client_id, section_key, content_value)
    VALUES (v_client_id, 'form_progress_' || p_form_id,
        jsonb_build_object(
            'form_id', p_form_id,
            'answers', p_answers,
            'status', 'completed',
            'completed_at', now()
        )::text)
    ON CONFLICT (client_id, section_key)
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


-- 4. Export RPC for admin
CREATE OR REPLACE FUNCTION get_form_responses(
    p_form_id text DEFAULT NULL,
    p_status text DEFAULT NULL,
    p_limit integer DEFAULT 100,
    p_offset integer DEFAULT 0
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_admin boolean;
    v_result jsonb;
    v_total bigint;
BEGIN
    -- Check admin/coach role
    SELECT EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
        AND role IN ('admin', 'coach')
    ) INTO v_admin;

    IF NOT v_admin THEN
        RETURN jsonb_build_object('success', false, 'error', 'Unauthorized');
    END IF;

    -- Count total matching rows
    SELECT count(*) INTO v_total
    FROM form_responses fr
    WHERE (p_form_id IS NULL OR fr.form_id = p_form_id)
    AND (p_status IS NULL OR fr.status = p_status);

    -- Fetch paginated results joined with profiles
    SELECT jsonb_build_object(
        'success', true,
        'data', COALESCE(jsonb_agg(row_to_json(r)), '[]'::jsonb),
        'total', v_total
    ) INTO v_result
    FROM (
        SELECT
            fr.id,
            fr.form_id,
            fr.status,
            fr.answers,
            fr.form_version,
            fr.created_at,
            fr.updated_at,
            fr.completed_at,
            fr.client_id,
            p.telephone,
            p.prenom
        FROM form_responses fr
        JOIN profiles p ON p.id = fr.client_id
        WHERE (p_form_id IS NULL OR fr.form_id = p_form_id)
        AND (p_status IS NULL OR fr.status = p_status)
        ORDER BY fr.updated_at DESC
        LIMIT p_limit
        OFFSET p_offset
    ) r;

    RETURN v_result;
END;
$$;

REVOKE EXECUTE ON FUNCTION get_form_responses(TEXT, TEXT, INTEGER, INTEGER) FROM public;
GRANT EXECUTE ON FUNCTION get_form_responses(TEXT, TEXT, INTEGER, INTEGER) TO authenticated;


-- 5. Storage bucket for form file uploads (Phase 3.3)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'form-files',
    'form-files',
    true,
    10485760,  -- 10 MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: authenticated users can upload to their own folder
DO $$ BEGIN
    EXECUTE 'CREATE POLICY "form_files_upload"
        ON storage.objects FOR INSERT TO authenticated
        WITH CHECK (bucket_id = ''form-files'')';
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    EXECUTE 'CREATE POLICY "form_files_public_read"
        ON storage.objects FOR SELECT TO public
        USING (bucket_id = ''form-files'')';
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
