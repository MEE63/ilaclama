# 🔧 Admin Sistemi Sorun Giderme

## ❌ Giriş Yapamıyorum - Kontrol Listesi

### 1. Supabase'de Kullanıcı Var mı?

**Kontrol:**
1. Supabase Dashboard > Authentication > Users
2. Kullanıcının listede olduğunu kontrol et
3. Email adresinin doğru olduğunu kontrol et

**Yoksa:**
```
Authentication > Users > Add User
Email: admin@hasere.com
Password: [güçlü şifre]
```

### 2. SQL Dosyası Çalıştırıldı mı?

**Kontrol:**
1. Supabase Dashboard > Table Editor
2. `profiles` tablosunun olup olmadığını kontrol et

**Yoksa:**
1. SQL Editor > New Query
2. `supabase-admin-system.sql` dosyasının içeriğini yapıştır
3. Run butonuna tıkla

### 3. Kullanıcının Profili Var mı?

**Kontrol:**
```sql
-- SQL Editor'de çalıştır
SELECT * FROM profiles;
```

**Profil yoksa:**
```sql
-- Manuel profil oluştur
INSERT INTO profiles (id, email, is_admin)
SELECT id, email, true
FROM auth.users
WHERE email = 'admin@hasere.com';
```

### 4. Kullanıcı Admin mi?

**Kontrol:**
```sql
-- SQL Editor'de çalıştır
SELECT * FROM profiles WHERE email = 'admin@hasere.com';
```

**is_admin = false ise:**
```sql
-- Admin yap
UPDATE profiles SET is_admin = true WHERE email = 'admin@hasere.com';
```

### 5. Email Doğrulandı mı?

**Kontrol:**
1. Supabase Dashboard > Authentication > Users
2. Kullanıcının yanında "Email Confirmed" yazıyor mu?

**Doğrulanmadıysa:**
- Email kutusunu kontrol et
- Veya manuel doğrula:
```sql
-- SQL Editor'de çalıştır
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email = 'admin@hasere.com';
```

### 6. Supabase URL ve Key Doğru mu?

**Kontrol:**
`src/supabase.js` dosyasını aç:
```javascript
const supabaseUrl = 'https://mrboppgajzglgvbjwfzr.supabase.co'
const supabaseKey = 'sb_publishable_9AqZxDoxM4qoxeOVWWX5kg_Umaskb4M'
```

**Doğru değilse:**
1. Supabase Dashboard > Settings > API
2. Project URL ve anon/public key'i kopyala
3. `src/supabase.js` dosyasına yapıştır

## 🐛 Hata Mesajları

### "Invalid login credentials"
- ✅ Email ve şifre doğru mu kontrol et
- ✅ Kullanıcı Supabase'de var mı kontrol et
- ✅ Email doğrulandı mı kontrol et

### "User not found"
- ✅ Supabase'de kullanıcı oluştur
- ✅ Email adresini doğru yaz

### "Profil çekme hatası"
- ✅ `profiles` tablosu var mı kontrol et
- ✅ SQL dosyasını çalıştır
- ✅ RLS politikalarını kontrol et

### Giriş yapıyorum ama admin paneline erişemiyorum
- ✅ `profiles` tablosunda `is_admin = true` olmalı
- ✅ Tarayıcı console'unu aç (F12) ve hataları kontrol et

## 🔍 Debug Adımları

### 1. Console Loglarını Kontrol Et

Tarayıcıda F12 tuşuna bas ve Console sekmesine bak. Hata var mı?

### 2. Network Sekmesini Kontrol Et

F12 > Network sekmesi > Login butonuna tıkla
- Supabase'e istek gidiyor mu?
- Yanıt ne?
- 401 hatası varsa: Şifre yanlış
- 400 hatası varsa: Email formatı yanlış

### 3. AuthContext'i Test Et

`src/contexts/AuthContext.jsx` dosyasına log ekle:

```javascript
const fetchProfile = async (userId) => {
  console.log('Profil çekiliyor, userId:', userId)
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    console.log('Profil data:', data)
    console.log('Profil error:', error)

    if (error) {
      console.error('Profil çekme hatası:', error)
      setProfile(null)
    } else {
      console.log('Profil başarıyla çekildi:', data)
      setProfile(data)
    }
  } catch (error) {
    console.error('Profil çekme hatası:', error)
    setProfile(null)
  } finally {
    setLoading(false)
  }
}
```

## ✅ Hızlı Çözüm - Tüm Adımlar

```sql
-- 1. Kullanıcı oluştur (Supabase Dashboard'dan)
-- Authentication > Users > Add User
-- Email: admin@hasere.com
-- Password: Admin123!

-- 2. Email'i doğrula
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email = 'admin@hasere.com';

-- 3. Profil oluştur (trigger otomatik yapmalı ama manuel de yapabilirsin)
INSERT INTO profiles (id, email, is_admin)
SELECT id, email, true
FROM auth.users
WHERE email = 'admin@hasere.com'
ON CONFLICT (id) DO UPDATE SET is_admin = true;

-- 4. Kontrol et
SELECT 
  u.email,
  u.email_confirmed_at,
  p.is_admin
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE u.email = 'admin@hasere.com';
```

## 📞 Hala Çalışmıyor mu?

### Adım 1: Tüm Tabloları Kontrol Et
```sql
-- Profiles tablosu var mı?
SELECT * FROM information_schema.tables WHERE table_name = 'profiles';

-- Trigger var mı?
SELECT * FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created';
```

### Adım 2: RLS Politikalarını Kontrol Et
```sql
-- RLS aktif mi?
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'profiles';

-- Politikalar var mı?
SELECT * FROM pg_policies WHERE tablename = 'profiles';
```

### Adım 3: Manuel Test
```sql
-- Test kullanıcısı oluştur
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'test@hasere.com',
  crypt('Test123!', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
);

-- Profil oluştur
INSERT INTO profiles (id, email, is_admin)
SELECT id, email, true
FROM auth.users
WHERE email = 'test@hasere.com';
```

## 🎯 En Yaygın Sorun

**Trigger çalışmıyor ve profil oluşturulmuyor!**

**Çözüm:**
```sql
-- Trigger'ı yeniden oluştur
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

-- Mevcut kullanıcılar için profil oluştur
INSERT INTO profiles (id, email, is_admin)
SELECT id, email, false
FROM auth.users
WHERE id NOT IN (SELECT id FROM profiles);

-- İlk kullanıcıyı admin yap
UPDATE profiles SET is_admin = true WHERE email = 'admin@hasere.com';
```

## 💡 İpuçları

1. **Her zaman Supabase Dashboard'u kullan** - Manuel işlemler daha güvenli
2. **Console loglarını kontrol et** - Hataları görmek için F12
3. **SQL Editor'ü kullan** - Veritabanını direkt kontrol et
4. **Email doğrulamayı atla** - Development için manuel doğrula
5. **Basit şifre kullan** - Test için "Admin123!" gibi

## 📧 Destek

Hala sorun yaşıyorsan:
1. Tarayıcı console'undaki hataları kopyala
2. Supabase logs'ları kontrol et (Dashboard > Logs)
3. `SELECT * FROM profiles;` sorgusunun çıktısını paylaş
