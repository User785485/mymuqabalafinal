-- =====================================================================================
--  M4: Create 3 missing tables referenced by admin-mahram.js
--  Tables: chat_channels, chat_messages, document_distributions
-- =====================================================================================

-- ── chat_channels ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_channels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    channel_type TEXT NOT NULL DEFAULT 'coach'
        CHECK (channel_type IN ('coach', 'mahram', 'group')),
    last_message_at TIMESTAMPTZ,
    message_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_channels_client ON chat_channels(client_id);

ALTER TABLE chat_channels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chat_channels_select_coach_admin"
    ON chat_channels FOR SELECT
    TO authenticated
    USING (is_admin_or_coach());

CREATE POLICY "chat_channels_insert_coach_admin"
    ON chat_channels FOR INSERT
    TO authenticated
    WITH CHECK (is_admin_or_coach());

CREATE POLICY "chat_channels_update_coach_admin"
    ON chat_channels FOR UPDATE
    TO authenticated
    USING (is_admin_or_coach())
    WITH CHECK (is_admin_or_coach());

CREATE POLICY "chat_channels_delete_coach_admin"
    ON chat_channels FOR DELETE
    TO authenticated
    USING (is_admin_or_coach());


-- ── chat_messages ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_id UUID NOT NULL REFERENCES chat_channels(id) ON DELETE CASCADE,
    sender_type TEXT NOT NULL CHECK (sender_type IN ('coach', 'admin', 'client')),
    sender_id UUID,
    content TEXT,
    type TEXT NOT NULL DEFAULT 'text'
        CHECK (type IN ('text', 'audio', 'image', 'document')),
    duration INTEGER,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_channel ON chat_messages(channel_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created ON chat_messages(created_at);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chat_messages_select_coach_admin"
    ON chat_messages FOR SELECT
    TO authenticated
    USING (is_admin_or_coach());

CREATE POLICY "chat_messages_insert_coach_admin"
    ON chat_messages FOR INSERT
    TO authenticated
    WITH CHECK (is_admin_or_coach());

CREATE POLICY "chat_messages_update_coach_admin"
    ON chat_messages FOR UPDATE
    TO authenticated
    USING (is_admin_or_coach())
    WITH CHECK (is_admin_or_coach());

CREATE POLICY "chat_messages_delete_coach_admin"
    ON chat_messages FOR DELETE
    TO authenticated
    USING (is_admin_or_coach());


-- ── document_distributions ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS document_distributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    document_name TEXT NOT NULL,
    document_url TEXT,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_doc_dist_client ON document_distributions(client_id);
CREATE INDEX IF NOT EXISTS idx_doc_dist_sent ON document_distributions(sent_at);

ALTER TABLE document_distributions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "doc_dist_select_coach_admin"
    ON document_distributions FOR SELECT
    TO authenticated
    USING (is_admin_or_coach());

CREATE POLICY "doc_dist_insert_coach_admin"
    ON document_distributions FOR INSERT
    TO authenticated
    WITH CHECK (is_admin_or_coach());

CREATE POLICY "doc_dist_update_coach_admin"
    ON document_distributions FOR UPDATE
    TO authenticated
    USING (is_admin_or_coach())
    WITH CHECK (is_admin_or_coach());

CREATE POLICY "doc_dist_delete_coach_admin"
    ON document_distributions FOR DELETE
    TO authenticated
    USING (is_admin_or_coach());
