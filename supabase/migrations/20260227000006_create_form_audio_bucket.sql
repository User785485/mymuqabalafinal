-- =====================================================================================
--  M6: Create missing 'form-audio' storage bucket (referenced by chat-engine.js)
--  SAFETY: DROP POLICY IF EXISTS before CREATE to ensure idempotency on storage.objects
-- =====================================================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'form-audio',
    'form-audio',
    TRUE,
    26214400,  -- 25 MB max
    ARRAY['audio/ogg', 'audio/wav', 'audio/mpeg', 'audio/webm', 'audio/aac', 'audio/mp4']
)
ON CONFLICT (id) DO NOTHING;

-- ── Storage policies (idempotent with DROP IF EXISTS) ──────────────────────

-- Anyone (anon + authenticated) can upload audio to form-audio
DROP POLICY IF EXISTS "form_audio_insert_public" ON storage.objects;
CREATE POLICY "form_audio_insert_public"
    ON storage.objects FOR INSERT
    TO anon, authenticated
    WITH CHECK (bucket_id = 'form-audio');

-- Anyone can read audio from form-audio (public bucket)
DROP POLICY IF EXISTS "form_audio_select_public" ON storage.objects;
CREATE POLICY "form_audio_select_public"
    ON storage.objects FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'form-audio');

-- Only coach/admin can delete audio files
DROP POLICY IF EXISTS "form_audio_delete_admin" ON storage.objects;
CREATE POLICY "form_audio_delete_admin"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'form-audio'
        AND is_admin_or_coach()
    );
