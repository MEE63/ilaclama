-- 🚨 ACİL ÇÖZÜM - Supabase SQL Editor'de çalıştır

-- 1. Eski tabloyu sil
DROP TABLE IF EXISTS profiles CASCADE;

-- 2. Yeni tablo oluştur (RLS KAPALI)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. RLS'yi KAPAT (önemli!)
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- 4. Mevcut kullanıcılar için profil oluştur
INSERT INTO profiles (id, email, is_admin)
SELECT id, email, false
FROM auth.users;

-- 5. Senin hesabını admin yap
UPDATE profiles 
SET is_admin = true 
WHERE email = 'ahmtmlhyzseke@gmail.com';

-- 6. KONTROL ET - Sonuç görmeli
SELECT 
  u.email,
  p.is_admin,
  p.created_at
FROM auth.users u
JOIN profiles p ON u.id = p.id
WHERE u.email = 'ahmtmlhyzseke@gmail.com';

-- ✅ Eğer yukarıda 1 satır görüyorsan ve is_admin = true ise TAMAM!
-- Şimdi tarayıcıyı yenile (Ctrl+Shift+R) ve tekrar giriş yap
