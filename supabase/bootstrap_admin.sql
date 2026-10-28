-- ==============================================================================
-- ShopEase Admin Promotion Script
-- Run this in the Supabase Dashboard SQL Editor to grant admin privileges
-- Replace 'YOUR_ADMIN_EMAIL@EXAMPLE.COM' with your actual registered email
-- ==============================================================================

DO $$
DECLARE
  target_email TEXT := 'admin@shopease.store'; -- Change to your registered email
  target_user_id UUID;
BEGIN
  -- Look up user ID from auth.users
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = target_email;

  IF target_user_id IS NOT NULL THEN
    -- Ensure profile exists and promote to admin
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (target_user_id, target_email, 'Store Administrator', 'admin')
    ON CONFLICT (id) DO UPDATE SET role = 'admin', updated_at = now();

    RAISE NOTICE 'User % (ID: %) successfully promoted to admin.', target_email, target_user_id;
  ELSE
    RAISE WARNING 'User with email % was not found in auth.users. Please sign up first via /auth/register then run this script.', target_email;
  END IF;
END $$;
