import { createClient } from "./vendor/supabase.mjs?v=ca223e9141c36f35";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "./supabase_config.mjs?v=ca223e9141c36f35";

export function hasSupabaseConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);
}

export const supabase = hasSupabaseConfig()
  ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        detectSessionInUrl: false,
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
