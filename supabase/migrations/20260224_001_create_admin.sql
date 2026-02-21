-- =====================================================================================
--  Create admin account for web panel
-- =====================================================================================

DO $$
DECLARE
    v_admin_id UUID;
BEGIN
    -- Create admin auth user with email/password
    v_admin_id := gen_random_uuid();

    INSERT INTO auth.users (
        id, instance_id, aud, role,
        email, encrypted_password, email_confirmed_at,
        created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
    ) VALUES (
        v_admin_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'admin@my-muqabala.fr', extensions.crypt('MyMuqabala2026!', extensions.gen_salt('bf')), NOW(),
        NOW(), NOW(), '', '', '', ''
    ) ON CONFLICT DO NOTHING;

    -- Create admin profile
    INSERT INTO profiles (
        id, prenom, nom, email, telephone, genre, date_naissance, ville, role, statut_parcours
    ) VALUES (
        v_admin_id, 'Admin', 'My Muqabala', 'admin@my-muqabala.fr', '+33600000000', 'homme', '1990-01-01'::DATE, 'Paris', 'admin', 'termine'
    ) ON CONFLICT (id) DO NOTHING;

    RAISE NOTICE 'Admin account created: admin@my-muqabala.fr / MyMuqabala2026!';
END;
$$;
