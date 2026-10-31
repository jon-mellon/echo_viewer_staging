import { createClient } from "./vendor/supabase.mjs?v=90cb4a8a93f3fdbc";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "./supabase_config.mjs?v=90cb4a8a93f3fdbc";

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
