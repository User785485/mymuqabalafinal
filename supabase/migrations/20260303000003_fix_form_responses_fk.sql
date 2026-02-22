-- ═══════════════════════════════════════
-- Fix form_responses foreign key
--
-- PROBLEM: form_responses was created before unification migration,
--   with client_id referencing clients(id). After unification,
--   profiles is the canonical table. Some rows reference clients
--   that don't exist in profiles.
--
-- FIX: Clean orphans → drop old FK → add new FK referencing profiles(id)
-- ═══════════════════════════════════════

-- 1. Drop the old FK referencing clients
ALTER TABLE form_responses DROP CONSTRAINT IF EXISTS form_responses_client_id_fkey;

-- 2. Clean up orphaned rows (client_ids not in profiles)
DELETE FROM form_responses
WHERE client_id NOT IN (SELECT id FROM profiles);

-- 3. Add new FK referencing profiles
ALTER TABLE form_responses
    ADD CONSTRAINT form_responses_client_id_fkey
    FOREIGN KEY (client_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Also fix audit_log FK if it exists
ALTER TABLE audit_log DROP CONSTRAINT IF EXISTS audit_log_client_id_fkey;

DELETE FROM audit_log
WHERE client_id IS NOT NULL
AND client_id NOT IN (SELECT id FROM profiles);

ALTER TABLE audit_log
    ADD CONSTRAINT audit_log_client_id_fkey
    FOREIGN KEY (client_id) REFERENCES profiles(id) ON DELETE SET NULL;
