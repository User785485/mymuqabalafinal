-- =====================================================================================
--  M7: Remove cleartext passwords from profiles.metadata
--  The generated_password key was stored during client creation for admin convenience.
--  This is a security risk — remove it from all profiles.
-- =====================================================================================

UPDATE profiles
SET metadata = metadata - 'generated_password'
WHERE metadata ? 'generated_password';

-- REMINDER: After deploying this migration, change the admin password via
-- Supabase Dashboard → Authentication → Users → admin@my-muqabala.fr → Reset Password
COMMENT ON TABLE profiles IS
    'User profiles. SECURITY: generated_password has been purged from metadata. '
    'Rotate admin password via Supabase Dashboard after deployment.';
