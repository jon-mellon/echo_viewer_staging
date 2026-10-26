import { createClient } from "./vendor/supabase.mjs?v=d63e4b66e75f63fc";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "./supabase_config.mjs?v=d63e4b66e75f63fc";

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
