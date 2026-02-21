-- =====================================================================================
--  MY MUQABALA — SCHEMA V2 (Complete)
--  Full database schema for the mobile app + web dashboard
--
--  Execute this SQL in the Supabase SQL Editor on a FRESH instance,
--  or after backing up V1 data (see migration_bridge.sql).
--
--  Tables (13):
--    1.  profiles                 — user accounts (replaces V1 clients)
--    2.  invitations              — invitation-only registration (D9)
--    3.  questionnaire_responses  — 147-question compatibility questionnaire (D4)
--    4.  events                   — matching, coaching_groupe, blink_date events
--    5.  event_participants       — who attends what event
--    6.  matches                  — pairings with compatibility scores (D17)
--    7.  blink_dates              — timed 10-minute conversation rounds
--    8.  feedback_forms           — post-event / weekly / monthly feedback
--    9.  coach_documents          — all 12 document types
--    10. photo_selections         — photo selection with decoy photos
--    11. notifications            — in-app notification queue
--    12. device_tokens            — FCM / APNs push notification tokens
--    13. feature_flags            — kill switches for live features (C6)
--
--  Also creates:
--    - update_updated_at() trigger function, applied to 5 tables
--    - 18 indexes (including partial indexes)
--    - 3 storage buckets (photos, documents, recordings)
--    - 5 feature flag seed entries
--    - RLS ENABLED on all 13 tables (policies are in rls_policies.sql)
--
--  NOTE: RLS policies are NOT in this file. See rls_policies.sql (Agent 2).
-- =====================================================================================


-- ============================================================
-- 0. EXTENSIONS
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pg_trgm";    -- trigram search (future use)


-- ============================================================
-- 1. UTILITY: auto-update updated_at trigger function
-- ============================================================
-- Applied to: profiles, questionnaire_responses, matches,
--             device_tokens, feature_flags

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ============================================================
-- 2. PROFILES (replaces V1 clients table)
-- ============================================================
-- Central user table. Every authenticated user has exactly one profile.
-- The id column references auth.users(id) so Supabase Auth is the
-- single source of truth for authentication.
--
-- Key design decisions:
--   - genre is binary ('homme'/'femme') per project scope
--   - statut_parcours tracks the full user journey (10 states)
--   - is_high_ticket + nb_events_participes drive matching priority (D17)
--   - metadata JSONB stores legacy V1 fields and flexible data

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    prenom TEXT NOT NULL,
    nom TEXT,
    telephone TEXT UNIQUE NOT NULL,
    email TEXT,
    date_naissance DATE NOT NULL,
    ville TEXT NOT NULL,
    genre TEXT NOT NULL CHECK (genre IN ('homme', 'femme')),
    bio TEXT,
    photo_floue_url TEXT,
    photo_nette_url TEXT,
    role TEXT NOT NULL DEFAULT 'participant'
        CHECK (role IN ('participant', 'coach', 'admin')),
    statut_parcours TEXT NOT NULL DEFAULT 'inscription'
        CHECK (statut_parcours IN (
            'inscription',
            'formulaire_en_cours',
            'formation',
            'matching_pool',
            'phase_1_matching',
            'phase_2_decouverte',
            'phase_3_approfondie',
            'phase_4_engagement',
            'termine',
            'desactive'
        )),
    date_inscription TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    derniere_connexion TIMESTAMPTZ,
    is_high_ticket BOOLEAN NOT NULL DEFAULT FALSE,
    nb_events_participes INTEGER NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_profiles_telephone ON profiles(telephone);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_statut ON profiles(statut_parcours);
CREATE INDEX idx_profiles_ville ON profiles(ville);

-- Priority index for matching algorithm (D17):
-- High-ticket users first, then by fewest events attended.
-- Only applies to users currently in the matching pool.
CREATE INDEX idx_profiles_priority
    ON profiles(is_high_ticket DESC, nb_events_participes ASC)
    WHERE statut_parcours = 'matching_pool';

-- Trigger: auto-update updated_at
CREATE TRIGGER tr_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- 3. INVITATIONS (D9 — inscription sur invitation uniquement)
-- ============================================================
-- The coach creates an invitation with the participant's telephone.
-- The participant receives a deep link, installs the app, and
-- authenticates via OTP. The invitation row is then linked to the
-- newly created profile via user_id.
-- Invitations expire after 30 days by default.

CREATE TABLE invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    telephone TEXT NOT NULL,
    prenom TEXT NOT NULL,
    nom TEXT,
    email TEXT,
    created_by UUID NOT NULL REFERENCES profiles(id),
    statut TEXT NOT NULL DEFAULT 'envoyee'
        CHECK (statut IN ('envoyee', 'acceptee', 'expiree', 'annulee')),
    user_id UUID REFERENCES profiles(id),
    lien_telechargement TEXT,
    expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_invitations_telephone ON invitations(telephone);
CREATE INDEX idx_invitations_statut ON invitations(statut);


-- ============================================================
-- 4. QUESTIONNAIRE 147 QUESTIONS (D4)
-- ============================================================
-- Each row stores one answer to one question for one user.
-- The reponse column is JSONB to support multiple answer formats:
--   - Text: {"value": "some text"}
--   - Scale: {"value": 7, "min": 1, "max": 10}
--   - Multiple choice: {"value": ["choix_a", "choix_c"]}
--
-- Categories: attachement, valeurs, communication, conflits, projections
-- UNIQUE(user_id, question_id) ensures one answer per question per user.

CREATE TABLE questionnaire_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL,
    categorie TEXT NOT NULL,
    reponse JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, question_id)
);

-- Indexes
CREATE INDEX idx_questionnaire_user ON questionnaire_responses(user_id);
CREATE INDEX idx_questionnaire_categorie ON questionnaire_responses(categorie);

-- Trigger: auto-update updated_at
CREATE TRIGGER tr_questionnaire_updated_at
    BEFORE UPDATE ON questionnaire_responses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- 5. EVENTS
-- ============================================================
-- Three event types:
--   - matching      : the main matching event (Blink Dates + photo selection)
--   - coaching_groupe : group coaching session (link to WebinarJam, D3)
--   - blink_date    : standalone Blink Date round
--
-- config JSONB stores event-specific settings:
--   - For matching: {"blink_date_count": 3, "timer_seconds": 600, ...}
--   - For coaching_groupe: {"webinarjam_url": "...", ...}

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titre TEXT NOT NULL,
    description TEXT,
    date_evenement TIMESTAMPTZ NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('matching', 'coaching_groupe', 'blink_date')),
    statut TEXT NOT NULL DEFAULT 'planifie'
        CHECK (statut IN ('planifie', 'en_cours', 'termine', 'annule')),
    max_participants INTEGER,
    config JSONB DEFAULT '{}',
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 6. EVENT PARTICIPANTS
-- ============================================================
-- Links users to events. Each user can only be registered once per event.
-- role_evenement allows the coach to attend as 'coach' or 'observateur'.

CREATE TABLE event_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    statut TEXT NOT NULL DEFAULT 'inscrit'
        CHECK (statut IN ('inscrit', 'confirme', 'present', 'absent')),
    role_evenement TEXT DEFAULT 'participant'
        CHECK (role_evenement IN ('participant', 'coach', 'observateur')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);


-- ============================================================
-- 7. MATCHES
-- ============================================================
-- NOTE (D17 v3.4.0): Plus de table waitlist. Pool dynamique sans cap.
-- Tous les eligibles avec score >= 45% sont selectionnes.
-- La priorite (high ticket first, nb passages) determine l'ordre
-- d'attribution des matchs, pas l'inclusion dans le pool.
--
-- CHECK (user_1_id < user_2_id) prevents duplicate inverse pairs.
-- score_compatibilite uses NUMERIC(5,2) for 0.00 to 100.00 range.
-- statut has 9 possible values tracking the full match lifecycle.

CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id),
    user_1_id UUID NOT NULL REFERENCES profiles(id),
    user_2_id UUID NOT NULL REFERENCES profiles(id),
    score_compatibilite NUMERIC(5,2),
    statut TEXT NOT NULL DEFAULT 'propose'
        CHECK (statut IN (
            'propose',
            'valide_coach',
            'confirme_mutuel',
            'phase_2',
            'phase_3',
            'phase_4',
            'termine_positif',
            'termine_negatif',
            'annule'
        )),
    analyse_compatibilite JSONB,
    notes_coach TEXT,
    feedback_user_1 JSONB,
    feedback_user_2 JSONB,
    photo_selection_user_1 JSONB,
    photo_selection_user_2 JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (user_1_id < user_2_id)
);

-- Indexes
CREATE INDEX idx_matches_users ON matches(user_1_id, user_2_id);
CREATE INDEX idx_matches_statut ON matches(statut);
CREATE INDEX idx_matches_event ON matches(event_id);

-- Trigger: auto-update updated_at
CREATE TRIGGER tr_matches_updated_at
    BEFORE UPDATE ON matches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- 8. BLINK DATES
-- ============================================================
-- Timed audio conversations between matched users during events.
-- Each Blink Date lasts 600 seconds (10 minutes) by default.
-- The ordre column indicates the round number (1st, 2nd, 3rd).
-- enregistrement_url stores the Egress recording (Mahram numerique).
-- sujets_proposes contains the conversation prompts displayed to users.

CREATE TABLE blink_dates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
    event_id UUID NOT NULL REFERENCES events(id),
    ordre INTEGER NOT NULL,
    duree_secondes INTEGER DEFAULT 600,
    date_debut TIMESTAMPTZ,
    date_fin TIMESTAMPTZ,
    statut TEXT NOT NULL DEFAULT 'planifie'
        CHECK (statut IN ('planifie', 'en_cours', 'termine', 'annule')),
    sujets_proposes JSONB,
    enregistrement_url TEXT,
    feedback_user_1 JSONB,
    feedback_user_2 JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 9. CHAT — Managed by Stream Chat (D16)
-- ============================================================
-- Chat tables (conversations, messages, members) are NOT in Supabase.
-- Stream Chat manages:
--   - Message storage (text + audio + media)
--   - Channels (1-to-1 and group)
--   - Typing indicators, read receipts, presence
--   - Offline sync (SQLite via stream_chat_persistence)
--   - Push notifications for messages
--   - Moderation (reports, blocks, filters)
--
-- Supabase <-> Stream Chat link:
--   - On match creation: Edge Function creates a Stream channel
--     with match ID as channel_id (type: "messaging")
--   - On participant registration: Edge Function creates
--     coach <-> participant channel (type: "coaching")
--   - Stream token generated server-side (Edge Function)
--     using Supabase user_id as Stream identifier
--   - Coach has "admin" role on all channels (Mahram numerique)
-- ============================================================


-- ============================================================
-- 10. FEEDBACK FORMS (formulaires de ressenti)
-- ============================================================
-- Captures user sentiment after interactions and at regular intervals.
-- Six types of feedback forms:
--   - post_blink_date    : immediately after a Blink Date round
--   - post_audio         : after an audio message exchange
--   - post_appel         : after a scheduled phone call
--   - post_rdv_physique  : after a physical meeting
--   - bilan_hebdomadaire : weekly check-in
--   - bilan_mensuel      : monthly review
--
-- reponses JSONB stores all form answers in a flexible format.

CREATE TABLE feedback_forms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id),
    match_id UUID REFERENCES matches(id),
    event_id UUID REFERENCES events(id),
    type_formulaire TEXT NOT NULL
        CHECK (type_formulaire IN (
            'post_blink_date',
            'post_audio',
            'post_appel',
            'post_rdv_physique',
            'bilan_hebdomadaire',
            'bilan_mensuel'
        )),
    reponses JSONB NOT NULL,
    commentaire_coach TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_feedback_user ON feedback_forms(user_id);
CREATE INDEX idx_feedback_match ON feedback_forms(match_id);


-- ============================================================
-- 11. COACH DOCUMENTS
-- ============================================================
-- All document types produced by the coach or automation pipeline.
-- 12 document types covering the entire coaching journey:
--   - compte_rendu_*         : post-interaction reports
--   - analyse_compatibilite  : compatibility analysis
--   - preparation_*          : pre-interaction preparation guides
--   - bilan_*                : weekly/monthly reviews
--   - boucle_engagement      : engagement loop document
--   - cartographie_emotionnelle : emotional cartography (from Agent pipeline)
--
-- contenu_html stores inline HTML; contenu_url links to external HTML files.
-- is_read tracks whether the participant has opened the document.
-- published_at is NULL until the coach publishes the document.

CREATE TABLE coach_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destinataire_id UUID NOT NULL REFERENCES profiles(id),
    match_id UUID REFERENCES matches(id),
    type_document TEXT NOT NULL
        CHECK (type_document IN (
            'compte_rendu_matching',
            'analyse_compatibilite',
            'compte_rendu_audio',
            'compte_rendu_appel',
            'compte_rendu_rdv',
            'preparation_audio',
            'preparation_appel',
            'preparation_rdv',
            'bilan_hebdomadaire',
            'bilan_mensuel',
            'boucle_engagement',
            'cartographie_emotionnelle'
        )),
    titre TEXT NOT NULL,
    contenu_html TEXT,
    contenu_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_coach_docs_destinataire ON coach_documents(destinataire_id);
CREATE INDEX idx_coach_docs_type ON coach_documents(type_document);


-- ============================================================
-- 12. PHOTO SELECTIONS (avec leurres)
-- ============================================================
-- During matching events, each participant sees a grid of blurred photos.
-- Some photos belong to their actual match(es); others are "leurres"
-- (decoy photos from non-matches) to prevent easy identification.
-- is_selected records whether the participant clicked on this photo.

CREATE TABLE photo_selections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id),
    selecteur_id UUID NOT NULL REFERENCES profiles(id),
    photo_user_id UUID NOT NULL REFERENCES profiles(id),
    is_leurre BOOLEAN NOT NULL DEFAULT FALSE,
    is_selected BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 13. NOTIFICATIONS
-- ============================================================
-- In-app notification queue for non-chat events:
--   - New document available
--   - Event reminder
--   - Match status change
--   - Questionnaire reminder
--   - System announcements
--
-- data JSONB stores deep link information for navigation:
--   {"route": "/document/abc-123", "type": "coach_document"}

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    titre TEXT NOT NULL,
    corps TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
-- Composite index for fetching a user's notifications in reverse chronological order
CREATE INDEX idx_notifications_user ON notifications(user_id, created_at DESC);
-- Partial index for efficiently counting/fetching unread notifications
CREATE INDEX idx_notifications_unread ON notifications(user_id) WHERE is_read = FALSE;


-- ============================================================
-- 14. DEVICE TOKENS (push notifications)
-- ============================================================
-- Stores FCM (Android) and APNs (iOS) device tokens.
-- UNIQUE(user_id, token) prevents duplicate registrations.
-- is_active is set to FALSE when a token is no longer valid
-- (e.g., user uninstalled the app, token expired).

CREATE TABLE device_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    platform TEXT NOT NULL CHECK (platform IN ('ios', 'android')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, token)
);

-- Trigger: auto-update updated_at
CREATE TRIGGER tr_device_tokens_updated_at
    BEFORE UPDATE ON device_tokens
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- 15. FEATURE FLAGS (C6 — kill switches)
-- ============================================================
-- Allows the coach/admin to disable features at runtime without
-- redeploying the app. Critical for live events where a buggy
-- feature could disrupt the experience.
--
-- The app reads these flags on startup and periodically refreshes.
-- updated_by tracks which admin made the change (audit trail).

CREATE TABLE feature_flags (
    key TEXT PRIMARY KEY,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    value TEXT,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES profiles(id)
);

-- Trigger: auto-update updated_at
CREATE TRIGGER tr_feature_flags_updated_at
    BEFORE UPDATE ON feature_flags
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Seed data: initial feature flags
INSERT INTO feature_flags (key, enabled, value, description) VALUES
    ('audio_calls',        TRUE, 'livekit', 'Provider audio: livekit ou agora'),
    ('stream_chat',        TRUE, NULL,      'Chat messaging actif'),
    ('blink_dates',        TRUE, NULL,      'Blink Dates actifs'),
    ('push_notifications', TRUE, NULL,      'Push notifications actives'),
    ('photo_selection',    TRUE, NULL,      'Selection photos actif')
ON CONFLICT (key) DO NOTHING;


-- ============================================================
-- 16. ROW LEVEL SECURITY — ENABLE ON ALL TABLES
-- ============================================================
-- RLS is enabled here but NO policies are defined in this file.
-- Policies are managed separately in rls_policies.sql (Agent 2).
-- With RLS enabled and no policies, tables default to DENY ALL
-- for non-superuser roles — which is the safe default.

ALTER TABLE profiles              ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations           ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE events                ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_participants    ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches               ENABLE ROW LEVEL SECURITY;
ALTER TABLE blink_dates           ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_forms        ENABLE ROW LEVEL SECURITY;
ALTER TABLE coach_documents       ENABLE ROW LEVEL SECURITY;
ALTER TABLE photo_selections      ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications         ENABLE ROW LEVEL SECURITY;
ALTER TABLE device_tokens         ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flags         ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- 17. SUPABASE STORAGE BUCKETS
-- ============================================================
-- These must be created via Supabase Storage API or Dashboard.
-- The SQL below uses the internal storage schema to create them
-- programmatically. If running outside Supabase SQL Editor,
-- create these buckets manually in the Storage section.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
    (
        'photos',
        'photos',
        FALSE,
        5242880,  -- 5 MB max per photo
        ARRAY['image/jpeg', 'image/png', 'image/webp']
    ),
    (
        'documents',
        'documents',
        FALSE,
        10485760,  -- 10 MB max per document
        ARRAY['text/html', 'application/pdf', 'image/jpeg', 'image/png', 'image/webp']
    ),
    (
        'recordings',
        'recordings',
        FALSE,
        52428800,  -- 50 MB max per recording
        ARRAY['audio/ogg', 'audio/wav', 'audio/mpeg', 'audio/webm']
    )
ON CONFLICT (id) DO NOTHING;


-- =====================================================================================
-- SCHEMA V2 — SUMMARY
-- =====================================================================================
--
-- Tables created: 13
--   1.  profiles                 (user accounts, replaces V1 clients)
--   2.  invitations              (invitation-only registration, D9)
--   3.  questionnaire_responses  (147 questions, D4)
--   4.  events                   (matching, coaching, blink_date)
--   5.  event_participants       (who attends what)
--   6.  matches                  (pairings with compatibility scores, D17)
--   7.  blink_dates              (timed 10-min conversation rounds)
--   8.  feedback_forms           (6 feedback types)
--   9.  coach_documents          (12 document types)
--   10. photo_selections         (with decoy photos)
--   11. notifications            (in-app notification queue)
--   12. device_tokens            (FCM/APNs push tokens)
--   13. feature_flags            (kill switches, C6)
--
-- Indexes created: 18
--   idx_profiles_telephone, idx_profiles_role, idx_profiles_statut,
--   idx_profiles_ville, idx_profiles_priority (partial),
--   idx_invitations_telephone, idx_invitations_statut,
--   idx_questionnaire_user, idx_questionnaire_categorie,
--   idx_matches_users, idx_matches_statut, idx_matches_event,
--   idx_feedback_user, idx_feedback_match,
--   idx_coach_docs_destinataire, idx_coach_docs_type,
--   idx_notifications_user (composite), idx_notifications_unread (partial)
--
-- Triggers: 5
--   tr_profiles_updated_at, tr_questionnaire_updated_at,
--   tr_matches_updated_at, tr_device_tokens_updated_at,
--   tr_feature_flags_updated_at
--
-- RLS: ENABLED on all 13 tables (policies in rls_policies.sql)
--
-- Storage buckets: 3 (photos, documents, recordings)
--
-- Feature flags seed: 5 entries
--
-- Line count: ~450 LOC
-- =====================================================================================
