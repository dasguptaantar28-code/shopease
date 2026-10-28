export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project")
);

export const getSupabaseConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  return {
    url,
    anonKey,
    serviceRoleKey,
    isConfigured: isSupabaseConfigured,
  };
};
