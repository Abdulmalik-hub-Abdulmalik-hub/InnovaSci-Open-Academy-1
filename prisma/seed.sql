-- InnovaSci Open Academy - Database Seed Script
-- Run this script to populate initial data

-- Insert default roles
INSERT INTO roles (name, description) VALUES
  ('SUPER_ADMIN', 'Full system access with all permissions'),
  ('ADMIN', 'Administrative access to manage platform'),
  ('INSTRUCTOR', 'Can create and manage courses'),
  ('COURSE_MANAGER', 'Can manage course content and enrollments'),
  ('STUDENT', 'Standard learner access'),
  ('GUEST', 'Limited read-only access')
ON CONFLICT (name) DO NOTHING;

-- Insert default permissions
INSERT INTO permissions (key, description, category) VALUES
  ('users.view', 'View user profiles', 'users'),
  ('users.create', 'Create new users', 'users'),
  ('users.edit', 'Edit user profiles', 'users'),
  ('users.delete', 'Delete users', 'users'),
  ('courses.view', 'View courses', 'courses'),
  ('courses.create', 'Create courses', 'courses'),
  ('courses.edit', 'Edit courses', 'courses'),
  ('courses.delete', 'Delete courses', 'courses'),
  ('courses.publish', 'Publish/unpublish courses', 'courses'),
  ('certificates.view', 'View certificates', 'certificates'),
  ('certificates.create', 'Create certificates', 'certificates'),
  ('certificates.revoke', 'Revoke certificates', 'certificates'),
  ('analytics.view', 'View analytics', 'analytics'),
  ('settings.manage', 'Manage system settings', 'settings'),
  ('newsletter.send', 'Send newsletters', 'newsletter'),
  ('payments.manage', 'Manage payments', 'payments'),
  ('database.view', 'View database', 'database'),
  ('database.edit', 'Edit database records', 'database'),
  ('roles.manage', 'Manage roles and permissions', 'roles'),
  ('audit.view', 'View audit logs', 'audit')
ON CONFLICT (key) DO NOTHING;

-- Assign all permissions to SUPER_ADMIN role
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.name = 'SUPER_ADMIN'
ON CONFLICT DO NOTHING;

-- ============================================
-- ADMIN USER CREATION
-- ============================================
-- This creates the admin user for InnovaSci Open Academy
-- Email: innovasciailabspolytechnic@gmail.com
-- Password: Ummuhani////1

-- First, create the user in auth.users (Supabase Auth)
-- Note: In Supabase, users are created via the Auth system, not directly in the database
-- Run this SQL after creating the user via Supabase Dashboard or API:

-- 1. Create the profile for the admin user
-- Replace 'USER_ID_FROM_AUTH' with the actual user ID from auth.users
-- The profile will be created automatically if using Supabase triggers,
-- but you can also insert manually:

INSERT INTO profiles (user_id, full_name, email, role, status)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'innovasciailabspolytechnic@gmail.com'),
  'InnovaSci Admin',
  'innovasciailabspolytechnic@gmail.com',
  'SUPER_ADMIN',
  'ACTIVE'
)
ON CONFLICT (user_id) DO UPDATE SET
  full_name = 'InnovaSci Admin',
  role = 'SUPER_ADMIN',
  status = 'ACTIVE';

-- Assign SUPER_ADMIN role to the user
INSERT INTO user_roles (user_id, role_id)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'innovasciailabspolytechnic@gmail.com'),
  r.id
FROM roles r
WHERE r.name = 'SUPER_ADMIN'
ON CONFLICT (user_id, role_id) DO NOTHING;

-- ============================================
-- END ADMIN USER CREATION
-- ============================================

-- Insert sample courses
INSERT INTO courses (title, slug, code, category, subcategory, short_description, full_description, learning_outcomes, difficulty_level, duration_hours, price, is_free, status, featured) VALUES
  ('Introduction to Computational Chemistry', 'intro-computational-chemistry', 'ISA-CHEM001', 'Computational Chemistry', 'Molecular Modeling',
   'Learn the fundamentals of computational chemistry, including molecular modeling, quantum chemistry, and drug design principles.',
   'This comprehensive course introduces you to the exciting world of computational chemistry. You will learn how to use computer simulations to understand molecular behavior, predict chemical reactions, and design new molecules.',
   '["Understand the fundamental principles of computational chemistry", "Apply molecular modeling techniques to solve chemical problems", "Perform quantum chemistry calculations"]',
   'BEGINNER', 24, 0, true, 'PUBLISHED', true),
  
  ('Machine Learning for Scientists', 'ml-for-scientists', 'ISA-AI002', 'Artificial Intelligence', 'Machine Learning',
   'Master machine learning techniques specifically designed for scientific research and data analysis.',
   'This course bridges the gap between traditional science and modern AI techniques, teaching you how to apply machine learning to real-world scientific problems.',
   '["Apply ML algorithms to scientific datasets", "Build predictive models for research", "Evaluate and optimize ML performance"]',
   'INTERMEDIATE', 36, 49.99, false, 'PUBLISHED', true),
  
  ('Drug Discovery Fundamentals', 'drug-discovery-fundamentals', 'ISA-DRUG003', 'Drug Discovery', 'Pharmacology',
   'Explore the complete drug discovery pipeline from target identification to clinical trials.',
   'Learn the essential concepts and techniques used in modern pharmaceutical research and drug development.',
   '["Identify drug targets", "Design and optimize lead compounds", "Understand clinical trial phases"]',
   'ADVANCED', 48, 79.99, false, 'PUBLISHED', true),
  
  ('Python Programming for Bioinformatics', 'python-bioinformatics', 'ISA-BIO004', 'Bioinformatics', 'Programming',
   'Learn Python programming specifically for bioinformatics applications and genomic data analysis.',
   'This course teaches programming concepts and their application in biological data analysis.',
   '["Write Python scripts for data analysis", "Process genomic sequences", "Create visualizations for biological data"]',
   'BEGINNER', 20, 0, true, 'PUBLISHED', false),
  
  ('Data Science for Research', 'data-science-research', 'ISA-DS005', 'Data Science', 'Research Methods',
   'Apply data science techniques to research problems across scientific disciplines.',
   'Learn how to collect, analyze, and visualize data to extract meaningful insights for research.',
   '["Clean and prepare research data", "Apply statistical analysis", "Create compelling data visualizations"]',
   'INTERMEDIATE', 32, 59.99, false, 'PUBLISHED', false)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample learning paths
INSERT INTO learning_paths (title, slug, description, difficulty, estimated_hours, status, featured) VALUES
  ('Computational Chemistry Path', 'computational-chemistry', 'Master molecular modeling, quantum chemistry calculations, and computational drug design techniques.', 'INTERMEDIATE', 40, 'PUBLISHED', true),
  ('Bioinformatics Path', 'bioinformatics', 'Learn DNA sequence analysis, protein structure prediction, and genomic data science.', 'ADVANCED', 60, 'PUBLISHED', true),
  ('Drug Discovery Path', 'drug-discovery', 'Explore target identification, lead optimization, and clinical trial design methodologies.', 'EXPERT', 80, 'PUBLISHED', false),
  ('Scientific Programming Path', 'scientific-programming', 'Develop programming skills for scientific computing with Python, R, and Julia.', 'BEGINNER', 30, 'PUBLISHED', true),
  ('Data Science Path', 'data-science-for-scientists', 'Apply machine learning and statistical analysis to scientific research problems.', 'INTERMEDIATE', 45, 'PUBLISHED', true),
  ('Artificial Intelligence Path', 'artificial-intelligence', 'Understand AI fundamentals, neural networks, and their applications in science.', 'ADVANCED', 50, 'PUBLISHED', true)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample newsletter subscribers
INSERT INTO newsletter_subscribers (email, subscribed) VALUES
  ('researcher1@example.com', true),
  ('scientist2@example.com', true),
  ('student3@example.com', true),
  ('professor4@example.com', true),
  ('engineer5@example.com', true)
ON CONFLICT (email) DO NOTHING;

-- Insert sample certificate template
INSERT INTO certificate_templates (name, description, template_url, signature_url, seal_url, is_default) VALUES
  ('Standard Certificate', 'Standard InnovaSci Academy certificate', '/templates/certificate-standard.svg', '/assets/signature.png', '/assets/seal.png', true)
ON CONFLICT DO NOTHING;

-- Insert site settings
INSERT INTO site_settings (key, value, "group") VALUES
  ('site_name', '"InnovaSci Open Academy"', 'general'),
  ('site_description', '"Democratizing high-quality scientific and technological education"', 'general'),
  ('contact_email', '"contact@innovasci.com"', 'contact'),
  ('support_email', '"support@innovasci.com"', 'contact'),
  ('maintenance_mode', 'false', 'system'),
  ('registration_enabled', 'true', 'users'),
  ('newsletter_enabled', 'true', 'newsletter')
ON CONFLICT (key) DO NOTHING;