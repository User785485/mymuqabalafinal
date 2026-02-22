-- ============================================================
-- Migration: Documents Storage bucket + processing history
-- Bucket 'documents' pour le pipeline automation (uploads admin)
-- ============================================================

-- 1. Bucket 'documents' pour uploads pipeline
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('documents', 'documents', FALSE, 52428800,
        ARRAY['text/html','text/plain','text/csv','application/json'])
ON CONFLICT (id) DO NOTHING;

-- 2. Policies : admin/coach seulement
CREATE POLICY "documents_insert_admin" ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'documents' AND is_admin_or_coach());

CREATE POLICY "documents_select_admin" ON storage.objects FOR SELECT TO authenticated
    USING (bucket_id = 'documents' AND is_admin_or_coach());

CREATE POLICY "documents_delete_admin" ON storage.objects FOR DELETE TO authenticated
    USING (bucket_id = 'documents' AND is_admin_or_coach());

-- 3. Table historique de traitement
CREATE TABLE IF NOT EXISTS document_processing_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    doc_type TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    storage_path TEXT,
    generated_id TEXT,
    generated_code TEXT,
    generated_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ
);

ALTER TABLE document_processing_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "doc_history_admin_all" ON document_processing_history FOR ALL
    TO authenticated USING (is_admin_or_coach()) WITH CHECK (is_admin_or_coach());
