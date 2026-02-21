/* ═══════════════════════════════════════
   MY MUQABALA — Supabase Configuration
   Shared across dashboard + admin pages
═══════════════════════════════════════ */

// ⚠️ Replace these with your actual Supabase project values
const SUPABASE_URL = 'https://eawmathizvtxdtdgrwsg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhd21hdGhpenZ0eGR0ZGdyd3NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MDM2NTQsImV4cCI6MjA4NzA3OTY1NH0.lYbPWT0EVM3mXo68zL5O2_87vLjMyG0euWp7itLs0Yg';

// Initialize Supabase client (loaded via CDN in HTML)
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
