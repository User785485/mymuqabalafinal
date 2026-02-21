-- ═══════════════════════════════════════════════════════════
-- Enable Supabase Realtime for profiles table
-- Required for .stream() in Flutter to receive live updates
-- (e.g. when admin toggles is_high_ticket)
-- ═══════════════════════════════════════════════════════════

-- Add profiles to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE profiles;
