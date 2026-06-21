-- ============================================
-- ADMIN USER SETUP FOR INNOVASCI OPEN ACADEMY
-- ============================================
-- Run this script AFTER the schema is applied
-- This creates the admin user with credentials:
-- Email: innovasciailabspolytechnic@gmail.com
-- Password: Ummuhani////1
-- ============================================

-- STEP 1: Create the user in auth.users
-- Note: In Supabase, you must use the Supabase Dashboard or Auth API to create users
-- This script assumes the user already exists in auth.users

-- STEP 2: Create profile for the admin user
-- Update this with the actual user ID from auth.users
-- Replace 'YOUR_USER_ID_HERE' with the UUID from auth.users

-- Example (run after getting the user ID):
-- INSERT INTO profiles (user_id, full_name, role, status)
-- VALUES (
--   'YOUR_USER_ID_HERE',
--   'InnovaSci Admin',
--   'SUPER_ADMIN',
--   'ACTIVE'
-- )
-- ON CONFLICT (user_id) DO UPDATE SET
--   role = 'SUPER_ADMIN',
--   status = 'ACTIVE';

-- STEP 3: Assign SUPER_ADMIN role
-- INSERT INTO user_roles (user_id, role_id)
-- SELECT 
--   'YOUR_USER_ID_HERE',
--   r.id
-- FROM roles r
-- WHERE r.name = 'SUPER_ADMIN'
-- ON CONFLICT (user_id, role_id) DO NOTHING;

-- ============================================
-- ALTERNATIVE: Use this template for direct insertion
-- ============================================
-- Run this AFTER creating the user via Supabase Dashboard:

DO $$
DECLARE
  admin_email TEXT := 'innovasciailabspolytechnic@gmail.com';
  admin_user_id UUID;
  super_admin_role_id UUID;
BEGIN
  -- Get the user ID from auth.users
  SELECT id INTO admin_user_id FROM auth.users WHERE email = admin_email;
  
  -- Get the SUPER_ADMIN role ID
  SELECT id INTO super_admin_role_id FROM roles WHERE name = 'SUPER_ADMIN';
  
  -- If user exists, create/update profile
  IF admin_user_id IS NOT NULL THEN
    INSERT INTO profiles (user_id, full_name, role, status)
    VALUES (admin_user_id, 'InnovaSci Admin', 'SUPER_ADMIN', 'ACTIVE')
    ON CONFLICT (user_id) DO UPDATE SET
      full_name = 'InnovaSci Admin',
      role = 'SUPER_ADMIN',
      status = 'ACTIVE';
    
    -- Assign SUPER_ADMIN role
    INSERT INTO user_roles (user_id, role_id)
    VALUES (admin_user_id, super_admin_role_id)
    ON CONFLICT (user_id, role_id) DO NOTHING;
    
    RAISE NOTICE 'Admin user setup complete for: %', admin_email;
  ELSE
    RAISE NOTICE 'Admin user not found in auth.users. Please create the user first via Supabase Dashboard.';
  END IF;
END $$;

-- ============================================
-- INSTRUCTIONS FOR SETUP:
-- ============================================
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add User" 
-- 3. Enter the email: innovasciailabspolytechnic@gmail.com
-- 4. Enter the password: Ummuhani////1
-- 5. Click "Create User"
-- 6. Copy the user's UUID
-- 7. Run this script in the SQL Editor
-- 8. The admin user will now have SUPER_ADMIN access
-- ============================================
