-- ⚡ HIZLI ÇÖZÜM - Admin Sistemi Kurulumu
-- Bu dosyayı Supabase SQL Editor'de çalıştır

-- 1. Önce profiles tablosunu oluştur (yoksa)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. RLS'yi aktif et
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Eski politikaları temizle
DROP POLICY IF EXISTS "Kullanıcılar kendi profilini görebilir" ON profiles;
DROP POLICY IF EXISTS "Adminler tüm profilleri görebilir" ON profiles;
DROP POLICY IF EXISTS "Adminler profil oluşturabilir" ON profiles;
DROP POLICY IF EXISTS "Adminler profil güncelleyebilir" ON profiles;
DROP POLICY IF EXISTS "Adminler profil silebilir" ON profiles;

-- 4. Yeni politikalar oluştur
CREATE POLICY "Kullanıcılar kendi profilini görebilir" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Adminler tüm profilleri görebilir" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Adminler profil oluşturabilir" ON profiles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Adminler profil güncelleyebilir" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Adminler profil silebilir" ON profiles
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
    AND id != auth.uid()
  );

-- 5. Trigger'ı oluştur
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, is_admin)
  VALUES (NEW.id, NEW.email, false);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Mevcut kullanıcılar için profil oluştur
INSERT INTO profiles (id, email, is_admin)
SELECT id, email, false
FROM auth.users
WHERE id NOT IN (SELECT id FROM profiles);

-- 7. İLK ADMİNİ OLUŞTUR
-- ⚠️ ÖNEMLİ: Önce Supabase Dashboard'dan bir kullanıcı oluştur!
-- Authentication > Users > Add User
-- Email: admin@hasere.com (veya istediğin email)
-- Password: Admin123! (veya istediğin şifre)

-- Sonra aşağıdaki komutu çalıştır (email'i değiştir):
UPDATE profiles SET is_admin = true WHERE email = 'ahmtmlhyzseke@gmail.com';

-- 8. Email doğrulamayı atla (development için)
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email = 'ahmtmlhyzseke@gmail.com';

-- 9. KONTROL ET - Sonuç görmeli ve is_admin = true olmalı
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  p.is_admin,
  p.created_at
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE u.email = 'ahmtmlhyzseke@gmail.com';

-- ✅ Eğer yukarıdaki sorgu sonuç gösteriyorsa ve is_admin = true ise, sistem hazır!
-- Şimdi /login sayfasına git ve giriş yap.
