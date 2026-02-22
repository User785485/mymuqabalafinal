import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zoknyytimzihihvmhwzs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpva255eXRpbXppaGlodm1od3pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczODQxNDMsImV4cCI6MjA1Mjk2MDE0M30.Jqq47KDNndEAqsTyZHtHC5rzWMkEPyLlJvO2Kjz12Xk";

// Ajout de logs pour débugger
console.log('🔄 Initializing Supabase client with:', {
  url: SUPABASE_URL,
  keyLength: SUPABASE_PUBLISHABLE_KEY.length
});

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    // Ajout de la configuration pour gérer les timeouts et les erreurs réseau
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
    db: {
      schema: 'public',
    },
    // Configuration des tentatives pour les requêtes en cas d'échec
    fetch: (url, options) => {
      const fetchWithRetry = async (attempt = 0) => {
        try {
          return await fetch(url, options);
        } catch (error) {
          if (attempt < 3) {
            console.log(`📡 Retrying fetch attempt ${attempt + 1}/3 after network error`);
            // Attente exponentielle: 1s, 2s, 4s
            await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
            return fetchWithRetry(attempt + 1);
          }
          throw error;
        }
      };
      return fetchWithRetry();
    }
  }
);

// Test de connexion avec Promise explicite
Promise.resolve(
  supabase
    .from('prompts')
    .select('*')
    .limit(1)
)
.then(response => {
  if (response.error) {
    console.error('❌ Supabase connection test failed:', response.error);
  } else {
    console.log('✅ Supabase connection test successful');
  }
})
.catch(error => {
  console.error('❌ Supabase connection test error:', error);
});