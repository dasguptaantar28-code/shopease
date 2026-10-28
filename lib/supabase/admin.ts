import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./env";

export function createAdminClient() {
  const { url, serviceRoleKey } = getSupabaseConfig();
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for admin operations");
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
