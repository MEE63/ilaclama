-- Admin yönetim sistemi için profiles tablosu
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS politikaları
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Herkes kendi profilini okuyabilir
CREATE POLICY "Kullanıcılar kendi profilini görebilir" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Adminler tüm profilleri görebilir
CREATE POLICY "Adminler tüm profilleri görebilir" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Adminler yeni profil oluşturabilir
CREATE POLICY "Adminler profil oluşturabilir" ON profiles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Adminler profilleri güncelleyebilir
CREATE POLICY "Adminler profil güncelleyebilir" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Adminler profilleri silebilir (kendi profilini hariç)
CREATE POLICY "Adminler profil silebilir" ON profiles
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
    AND id != auth.uid()
  );

-- Yeni kullanıcı oluşturulduğunda otomatik profil oluştur (Trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, is_admin)
  VALUES (NEW.id, NEW.email, false);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger'ı oluştur
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- İLK ADMIN KULLANICIYI OLUŞTUR
-- Not: Önce Supabase Dashboard'dan bir kullanıcı oluştur, sonra aşağıdaki komutu çalıştır
-- UPDATE profiles SET is_admin = true WHERE email = 'admin@hasere.com';

-- Veya direkt SQL ile kullanıcı oluşturmak için (opsiyonel):
-- 1. Supabase Dashboard > Authentication > Users > Add User
-- 2. Email: admin@hasere.com, Password: [güçlü şifre]
-- 3. Sonra yukarıdaki UPDATE komutunu çalıştır
