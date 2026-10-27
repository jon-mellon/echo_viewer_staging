import { createClient } from "./vendor/supabase.mjs?v=e0be7beaa1a32f1e";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "./supabase_config.mjs?v=e0be7beaa1a32f1e";

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
