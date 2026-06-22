-- ============================================
-- InnovaSci Open Academy - Supabase Schema
-- Fully Idempotent LMS Database with RBAC
-- ============================================

-- ============================================
-- 1. PROFILES (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  username TEXT UNIQUE,
  phone TEXT,
  country TEXT,
  state TEXT,
  city TEXT,
  gender TEXT,
  bio TEXT,
  avatar_url TEXT,
  academic_interests TEXT,
  social_links JSONB DEFAULT '{}',
  role TEXT NOT NULL DEFAULT 'STUDENT' CHECK (role IN ('SUPER_ADMIN', 'STUDENT')),
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED', 'PENDING', 'DEACTIVATED')),
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. LEARNING PATHS
-- ============================================
CREATE TABLE IF NOT EXISTS learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  full_description TEXT,
  thumbnail_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. COURSES
-- ============================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  code TEXT UNIQUE,
  category TEXT,
  subcategory TEXT,
  short_description TEXT,
  full_description TEXT,
  learning_outcomes TEXT,
  prerequisites TEXT,
  target_audience TEXT,
  difficulty_level TEXT DEFAULT 'BEGINNER' CHECK (difficulty_level IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT')),
  language TEXT DEFAULT 'English',
  duration_hours INT,
  thumbnail_url TEXT,
  promo_video_url TEXT,
  price DECIMAL(10, 2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  is_free BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED', 'SUSPENDED')),
  featured BOOLEAN DEFAULT FALSE,
  instructor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- ============================================
-- 4. LEARNING PATH COURSES (Junction Table)
-- ============================================
CREATE TABLE IF NOT EXISTS learning_path_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learning_path_id UUID NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(learning_path_id, course_id)
);

-- ============================================
-- 5. LESSONS
-- ============================================
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INT DEFAULT 0,
  duration INT,
  is_preview BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. VIDEOS
-- ============================================
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  duration INT,
  thumbnail_url TEXT,
  provider TEXT DEFAULT 'SUPABASE' CHECK (provider IN ('SUPABASE', 'AWS_S3', 'CLOUDFLARE_R2', 'CLOUDFLARE_STREAM', 'BUNNY_STREAM', 'VIMEO', 'YOUTUBE', 'GOOGLE_DRIVE', 'CUSTOM')),
  storage_type TEXT DEFAULT 'URL' CHECK (storage_type IN ('URL', 'FILE', 'STREAM')),
  quality TEXT,
  order_index INT DEFAULT 0,
  is_public BOOLEAN DEFAULT TRUE,
  views INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. MATERIALS
-- ============================================
CREATE TABLE IF NOT EXISTS materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('PDF', 'SLIDES', 'NOTES', 'ASSIGNMENT', 'ARTICLE', 'EBOOK', 'DATASET', 'EXTERNAL')),
  file_url TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  visibility TEXT DEFAULT 'PUBLIC' CHECK (visibility IN ('PUBLIC', 'ENROLLED', 'PREMIUM')),
  download_allowed BOOLEAN DEFAULT TRUE,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. ENROLLMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  progress_percent INT DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- ============================================
-- 9. LEARNING PROGRESS
-- ============================================
CREATE TABLE IF NOT EXISTS learning_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  watch_time INT DEFAULT 0,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- ============================================
-- 10. CERTIFICATES
-- ============================================
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  certificate_url TEXT,
  template_url TEXT,
  signature_url TEXT,
  seal_url TEXT,
  verification_code TEXT UNIQUE NOT NULL,
  grade TEXT,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'REVOKED', 'EXPIRED')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- ============================================
-- 11. CERTIFICATE TEMPLATES
-- ============================================
CREATE TABLE IF NOT EXISTS certificate_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  template_url TEXT NOT NULL,
  signature_url TEXT,
  seal_url TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 12. PAYMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'DISPUTED')),
  provider TEXT DEFAULT 'PAYSTACK' CHECK (provider IN ('STRIPE', 'PAYSTACK', 'FLUTTERWAVE', 'PAYPAL')),
  reference TEXT UNIQUE,
  provider_ref TEXT,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 13. SUBSCRIPTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL,
  plan_interval TEXT DEFAULT 'month',
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'PAST_DUE', 'CANCELED', 'UNPAID', 'INCOMPLETE')),
  provider TEXT DEFAULT 'STRIPE',
  provider_id TEXT UNIQUE,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 14. NEWSLETTERS
-- ============================================
CREATE TABLE IF NOT EXISTS newsletters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'SCHEDULED', 'SENDING', 'SENT', 'FAILED')),
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  audience TEXT DEFAULT 'ALL_USERS',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES profiles(id) ON DELETE SET NULL,
  email TEXT UNIQUE NOT NULL,
  subscribed BOOLEAN DEFAULT TRUE,
  preferences JSONB DEFAULT '{}',
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS newsletter_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  newsletter_id UUID REFERENCES newsletters(id) ON DELETE CASCADE,
  subscriber_id UUID REFERENCES newsletter_subscribers(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  opened BOOLEAN DEFAULT FALSE,
  clicked BOOLEAN DEFAULT FALSE,
  bounced BOOLEAN DEFAULT FALSE,
  unsubscribed BOOLEAN DEFAULT FALSE,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 15. NOTIFICATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'SYSTEM' CHECK (type IN ('SYSTEM', 'ENROLLMENT', 'COURSE_UPDATE', 'CERTIFICATE', 'PAYMENT', 'NEWSLETTER', 'ANNOUNCEMENT', 'REMINDER')),
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 16. WISHLIST
-- ============================================
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- ============================================
-- 17. STORAGE FILES
-- ============================================
CREATE TABLE IF NOT EXISTS storage_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  mime_type TEXT,
  size BIGINT,
  uploaded_by UUID NOT NULL REFERENCES profiles(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 18. ANALYTICS EVENTS (with updated_at added)
-- ============================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_name TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 19. AUDIT LOGS (with updated_at added)
-- ============================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  module TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  status TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 20. SITE SETTINGS
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  group_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_instructor ON courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_lessons_course ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_videos_lesson ON videos(lesson_id);
CREATE INDEX IF NOT EXISTS idx_materials_lesson ON materials(lesson_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_progress_user_course ON learning_progress(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_certificates_user ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_verification ON certificates(verification_code);
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_reference ON payments(reference);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_module ON audit_logs(module);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);

-- ============================================
-- SCHEMA-AWARE TRIGGER FUNCTION
-- ============================================
DO $$
BEGIN
  DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
END $$;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.updated_at IS DISTINCT FROM OLD.updated_at THEN
    NEW.updated_at = NOW();
  END IF;
  RETURN NEW;
EXCEPTION
  WHEN undefined_column THEN
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- CLEANUP AND CREATE TRIGGERS
-- ============================================
DO $$
DECLARE
  trigger_name TEXT;
  table_name TEXT;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'profiles', 'learning_paths', 'courses', 'lessons', 'videos',
    'materials', 'enrollments', 'learning_progress', 'certificates',
    'certificate_templates', 'payments', 'subscriptions', 'newsletters',
    'notifications', 'storage_files', 'analytics_events', 'audit_logs', 'site_settings'
  ]
  LOOP
    trigger_name := 'update_' || table_name || '_updated_at';
    EXECUTE format('DROP TRIGGER IF EXISTS %I ON %I', trigger_name, table_name);
  END LOOP;
END $$;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_paths_updated_at
  BEFORE UPDATE ON learning_paths FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON videos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_materials_updated_at
  BEFORE UPDATE ON materials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at
  BEFORE UPDATE ON enrollments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_progress_updated_at
  BEFORE UPDATE ON learning_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certificates_updated_at
  BEFORE UPDATE ON certificates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certificate_templates_updated_at
  BEFORE UPDATE ON certificate_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletters_updated_at
  BEFORE UPDATE ON newsletters FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at
  BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_storage_files_updated_at
  BEFORE UPDATE ON storage_files FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analytics_events_updated_at
  BEFORE UPDATE ON analytics_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_audit_logs_updated_at
  BEFORE UPDATE ON audit_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- AUTO-CREATE PROFILE ON USER SIGNUP
-- ============================================
DO $$
BEGIN
  DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
END $$;

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, avatar_url, role, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url',
    'STUDENT',
    'ACTIVE'
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_path_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificate_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES: PROFILES
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
  DROP POLICY IF EXISTS "Super Admins can view all profiles" ON profiles;
  DROP POLICY IF EXISTS "Super Admins can update all profiles" ON profiles;
  DROP POLICY IF EXISTS "Enable insert for authenticated users" ON profiles;
END $$;

CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Super Admins can view all profiles" ON profiles FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));
CREATE POLICY "Super Admins can update all profiles" ON profiles FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));
CREATE POLICY "Enable insert for authenticated users" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================
-- RLS POLICIES: LEARNING PATHS
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Anyone can view published learning paths" ON learning_paths;
  DROP POLICY IF EXISTS "Super Admins can manage learning paths" ON learning_paths;
END $$;

CREATE POLICY "Anyone can view published learning paths" ON learning_paths FOR SELECT USING (status = 'PUBLISHED' OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));
CREATE POLICY "Super Admins can manage learning paths" ON learning_paths FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));

-- ============================================
-- RLS POLICIES: COURSES
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Anyone can view published courses" ON courses;
  DROP POLICY IF EXISTS "Super Admins can manage courses" ON courses;
END $$;

CREATE POLICY "Anyone can view published courses" ON courses FOR SELECT USING (status = 'PUBLISHED' OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));
CREATE POLICY "Super Admins can manage courses" ON courses FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));

-- ============================================
-- RLS POLICIES: LESSONS
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Enrolled users can view lessons" ON lessons;
  DROP POLICY IF EXISTS "Super Admins can manage lessons" ON lessons;
END $$;

CREATE POLICY "Enrolled users can view lessons" ON lessons FOR SELECT USING (
  EXISTS (SELECT 1 FROM enrollments e WHERE e.course_id = lessons.course_id AND e.user_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN') OR
  EXISTS (SELECT 1 FROM courses c WHERE c.id = lessons.course_id AND c.status = 'PUBLISHED')
);
CREATE POLICY "Super Admins can manage lessons" ON lessons FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));

-- ============================================
-- RLS POLICIES: VIDEOS
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can view enrolled videos" ON videos;
  DROP POLICY IF EXISTS "Super Admins can manage videos" ON videos;
END $$;

CREATE POLICY "Users can view enrolled videos" ON videos FOR SELECT USING (
  is_public = TRUE OR
  EXISTS (SELECT 1 FROM enrollments e JOIN lessons l ON l.course_id = e.course_id WHERE l.id = videos.lesson_id AND e.user_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN')
);
CREATE POLICY "Super Admins can manage videos" ON videos FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));

-- ============================================
-- RLS POLICIES: MATERIALS
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can view enrolled materials" ON materials;
  DROP POLICY IF EXISTS "Super Admins can manage materials" ON materials;
END $$;

CREATE POLICY "Users can view enrolled materials" ON materials FOR SELECT USING (
  visibility = 'PUBLIC' OR
  EXISTS (SELECT 1 FROM enrollments e JOIN lessons l ON l.course_id = e.course_id WHERE l.id = materials.lesson_id AND e.user_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN')
);
CREATE POLICY "Super Admins can manage materials" ON materials FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));

-- ============================================
-- RLS POLICIES: ENROLLMENTS
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can view own enrollments" ON enrollments;
  DROP POLICY IF EXISTS "Users can create own enrollments" ON enrollments;
  DROP POLICY IF EXISTS "Users can update own enrollments" ON enrollments;
  DROP POLICY IF EXISTS "Super Admins can manage all enrollments" ON enrollments;
END $$;

CREATE POLICY "Users can view own enrollments" ON enrollments FOR SELECT USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));
CREATE POLICY "Users can create own enrollments" ON enrollments FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own enrollments" ON enrollments FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Super Admins can manage all enrollments" ON enrollments FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));

-- ============================================
-- RLS POLICIES: LEARNING PROGRESS
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can manage own progress" ON learning_progress;
END $$;

CREATE POLICY "Users can manage own progress" ON learning_progress FOR ALL USING (user_id = auth.uid());

-- ============================================
-- RLS POLICIES: CERTIFICATES
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can view own certificates" ON certificates;
  DROP POLICY IF EXISTS "Super Admins can manage certificates" ON certificates;
END $$;

CREATE POLICY "Users can view own certificates" ON certificates FOR SELECT USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));
CREATE POLICY "Super Admins can manage certificates" ON certificates FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));

-- ============================================
-- RLS POLICIES: PAYMENTS
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can view own payments" ON payments;
  DROP POLICY IF EXISTS "Users can create own payments" ON payments;
  DROP POLICY IF EXISTS "Super Admins can manage payments" ON payments;
END $$;

CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));
CREATE POLICY "Users can create own payments" ON payments FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Super Admins can manage payments" ON payments FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));

-- ============================================
-- RLS POLICIES: SUBSCRIPTIONS
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can manage own subscriptions" ON subscriptions;
END $$;

CREATE POLICY "Users can manage own subscriptions" ON subscriptions FOR ALL USING (user_id = auth.uid());

-- ============================================
-- RLS POLICIES: NEWSLETTERS
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscribers;
  DROP POLICY IF EXISTS "Users can manage own subscription" ON newsletter_subscribers;
  DROP POLICY IF EXISTS "Super Admins can manage newsletters" ON newsletters;
  DROP POLICY IF EXISTS "Super Admins can view newsletter logs" ON newsletter_logs;
  DROP POLICY IF EXISTS "Anyone can view newsletter subscribers" ON newsletter_subscribers;
  DROP POLICY IF EXISTS "System can insert newsletter logs" ON newsletter_logs;
END $$;

CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Users can manage own subscription" ON newsletter_subscribers FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Super Admins can manage newsletters" ON newsletters FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));
CREATE POLICY "Super Admins can view newsletter logs" ON newsletter_logs FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));
CREATE POLICY "Anyone can view newsletter subscribers" ON newsletter_subscribers FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));
CREATE POLICY "System can insert newsletter logs" ON newsletter_logs FOR INSERT WITH CHECK (TRUE);

-- ============================================
-- RLS POLICIES: NOTIFICATIONS
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
  DROP POLICY IF EXISTS "System can create notifications" ON notifications;
  DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
END $$;

CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "System can create notifications" ON notifications FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (user_id = auth.uid());

-- ============================================
-- RLS POLICIES: WISHLIST
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can manage own wishlist" ON wishlists;
END $$;

CREATE POLICY "Users can manage own wishlist" ON wishlists FOR ALL USING (user_id = auth.uid());

-- ============================================
-- RLS POLICIES: STORAGE FILES
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can view public storage files" ON storage_files;
  DROP POLICY IF EXISTS "Users can upload files" ON storage_files;
  DROP POLICY IF EXISTS "Users can manage own files" ON storage_files;
END $$;

CREATE POLICY "Users can view public storage files" ON storage_files FOR SELECT USING (TRUE);
CREATE POLICY "Users can upload files" ON storage_files FOR INSERT WITH CHECK (uploaded_by = auth.uid());
CREATE POLICY "Users can manage own files" ON storage_files FOR ALL USING (uploaded_by = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));

-- ============================================
-- RLS POLICIES: ANALYTICS
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "System can insert analytics" ON analytics_events;
  DROP POLICY IF EXISTS "Super Admins can view analytics" ON analytics_events;
END $$;

CREATE POLICY "System can insert analytics" ON analytics_events FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Super Admins can view analytics" ON analytics_events FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));

-- ============================================
-- RLS POLICIES: AUDIT LOGS
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Super Admins can view audit logs" ON audit_logs;
  DROP POLICY IF EXISTS "System can insert audit logs" ON audit_logs;
END $$;

CREATE POLICY "Super Admins can view audit logs" ON audit_logs FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));
CREATE POLICY "System can insert audit logs" ON audit_logs FOR INSERT WITH CHECK (TRUE);

-- ============================================
-- RLS POLICIES: SITE SETTINGS
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Super Admins can manage site settings" ON site_settings;
END $$;

CREATE POLICY "Super Admins can manage site settings" ON site_settings FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));

-- ============================================
-- RLS POLICIES: LEARNING PATH COURSES
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Anyone can view learning path courses" ON learning_path_courses;
  DROP POLICY IF EXISTS "Super Admins can manage learning path courses" ON learning_path_courses;
END $$;

CREATE POLICY "Anyone can view learning path courses" ON learning_path_courses FOR SELECT USING (TRUE);
CREATE POLICY "Super Admins can manage learning path courses" ON learning_path_courses FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));

-- ============================================
-- RLS POLICIES: CERTIFICATE TEMPLATES
-- ============================================
DO $$
BEGIN
  DROP POLICY IF EXISTS "Anyone can view certificate templates" ON certificate_templates;
  DROP POLICY IF EXISTS "Super Admins can manage certificate templates" ON certificate_templates;
END $$;

CREATE POLICY "Anyone can view certificate templates" ON certificate_templates FOR SELECT USING (TRUE);
CREATE POLICY "Super Admins can manage certificate templates" ON certificate_templates FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN'));

-- ============================================
-- HELPER FUNCTIONS
-- ============================================
DO $$
BEGIN
  DROP FUNCTION IF EXISTS is_super_admin(UUID) CASCADE;
  DROP FUNCTION IF EXISTS is_enrolled(UUID, UUID) CASCADE;
END $$;

CREATE OR REPLACE FUNCTION is_super_admin(uid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM profiles WHERE id = uid AND role = 'SUPER_ADMIN');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_enrolled(uid UUID, cid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM enrollments WHERE user_id = uid AND course_id = cid);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SEED DATA
-- ============================================
UPDATE profiles SET role = 'SUPER_ADMIN' WHERE email = 'superadmin@gmail.com';

INSERT INTO certificate_templates (name, description, template_url, is_default)
VALUES ('Default Certificate', 'Standard InnovaSci Open Academy certificate template', '/templates/certificate-default.png', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO site_settings (key, value, group_name) VALUES
  ('site_name', '"InnovaSci Open Academy"', 'general'),
  ('site_description', '"Democratizing high-quality scientific education"', 'general'),
  ('contact_email', '"support@innovasci.com"', 'contact'),
  ('maintenance_mode', 'false', 'system'),
  ('allow_registrations', 'true', 'system')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- SAMPLE DATA (Optional)
-- ============================================
INSERT INTO learning_paths (title, slug, short_description, full_description, status)
VALUES ('Data Science Fundamentals', 'data-science-fundamentals', 'Master data science and ML', 'Comprehensive data science learning path', 'PUBLISHED')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO courses (title, slug, code, category, short_description, full_description, difficulty_level, duration_hours, price, is_free, status, featured)
VALUES ('Introduction to Python', 'introduction-to-python', 'PYT-101', 'Programming', 'Learn Python basics', 'Beginner Python course', 'BEGINNER', 20, 0, TRUE, 'PUBLISHED', TRUE)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO learning_path_courses (learning_path_id, course_id, order_index)
SELECT lp.id, c.id, 1 FROM learning_paths lp, courses c WHERE lp.slug = 'data-science-fundamentals' AND c.slug = 'introduction-to-python'
ON CONFLICT DO NOTHING;

INSERT INTO lessons (course_id, title, description, order_index, is_preview)
SELECT id, 'Getting Started with Python', 'Intro and setup', 1, TRUE FROM courses WHERE slug = 'introduction-to-python'
ON CONFLICT DO NOTHING;

-- ============================================
-- COMPLETION MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE 'InnovaSci Open Academy schema deployed successfully!';
END $$;
