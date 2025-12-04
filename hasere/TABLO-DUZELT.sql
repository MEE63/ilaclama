-- 🔧 TÜM TABLOLARI DÜZELT - Supabase SQL Editor'de çalıştır

-- ============================================
-- 1. PROFILES TABLOSU
-- ============================================
DROP TABLE IF EXISTS profiles CASCADE;

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS KAPALI
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Profil oluştur
INSERT INTO profiles (id, email, is_admin)
SELECT id, email, false
FROM auth.users;

-- Admin yap
UPDATE profiles SET is_admin = true WHERE email = 'ahmtmlhyzseke@gmail.com';

-- ============================================
-- 2. ABOUT_PAGE_SETTINGS TABLOSU
-- ============================================
DROP TABLE IF EXISTS about_page_settings CASCADE;

CREATE TABLE about_page_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  hero_image_url TEXT,
  office_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- RLS KAPALI
ALTER TABLE about_page_settings DISABLE ROW LEVEL SECURITY;

-- İlk kayıt
INSERT INTO about_page_settings (id, hero_image_url, office_image_url)
VALUES (
  1, 
  'https://via.placeholder.com/600x400/d4dfe5/393d3f?text=Profesyonel+Ekibimiz',
  'https://via.placeholder.com/500x350/d4dfe5/393d3f?text=Ofisimiz'
);

-- ============================================
-- 3. DİĞER TABLOLARIN RLS'İNİ KAPAT
-- ============================================
ALTER TABLE general_config DISABLE ROW LEVEL SECURITY;
ALTER TABLE pests DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. KONTROL ET
-- ============================================
SELECT 'profiles' as tablo, COUNT(*) as kayit_sayisi FROM profiles
UNION ALL
SELECT 'about_page_settings', COUNT(*) FROM about_page_settings
UNION ALL
SELECT 'general_config', COUNT(*) FROM general_config
UNION ALL
SELECT 'pests', COUNT(*) FROM pests
UNION ALL
SELECT 'services', COUNT(*) FROM services;

-- ============================================
-- 5. ADMIN KONTROLÜ
-- ============================================
SELECT 
  email,
  is_admin,
  created_at
FROM profiles 
WHERE email = 'ahmtmlhyzseke@gmail.com';

-- ✅ is_admin = true görmelisin!
