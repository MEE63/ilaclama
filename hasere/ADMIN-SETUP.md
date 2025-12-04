# Admin Yetkilendirme Sistemi - Dinamik Yönetim

## 🔐 Sistem Özeti

Bu projede **dinamik ve veritabanı tabanlı** admin yetkilendirme sistemi kurulmuştur:

- **Veritabanı Kontrolü**: Admin yetkisi `profiles` tablosundaki `is_admin` alanından kontrol edilir
- **Kod Değişikliği Gerektirmez**: Müşteri kod değiştirmeden yeni admin ekleyebilir
- **Protected Routes**: Admin sayfası korumalıdır, yetkisiz erişim engellenir
- **UI Gizleme**: Yönetim Paneli butonu sadece admin kullanıcılara görünür
- **Admin Yönetimi**: Admin panelinden yeni yöneticiler eklenebilir/silinebilir

## 📋 İlk Kurulum Adımları

### 1. Supabase'de Tabloları Oluştur

`supabase-admin-system.sql` dosyasındaki SQL kodunu Supabase Dashboard'da çalıştır:

1. **SQL Editor** > **New Query**
2. SQL kodunu yapıştır ve **Run** butonuna tıkla
3. Bu işlem:
   - `profiles` tablosunu oluşturur
   - RLS (Row Level Security) politikalarını ayarlar
   - Otomatik profil oluşturma trigger'ını kurar

### 2. İlk Admin Kullanıcıyı Oluştur

#### Yöntem 1: Supabase Dashboard (Önerilen)
1. **Authentication** > **Users** > **Add User**
2. Email: `admin@hasere.com` (veya istediğin email)
3. Şifre: Güçlü bir şifre belirle
4. **Create User** butonuna tıkla
5. **SQL Editor**'de şu komutu çalıştır:
   ```sql
   UPDATE profiles SET is_admin = true WHERE email = 'admin@hasere.com';
   ```

#### Yöntem 2: Direkt SQL
```sql
-- Önce kullanıcıyı oluştur (Supabase Dashboard'dan)
-- Sonra admin yap
UPDATE profiles SET is_admin = true WHERE email = 'SENIN_EMAILIN@hasere.com';
```

### 3. Test Et

1. Tarayıcıda `/login` sayfasına git
2. Oluşturduğun admin email ve şifreyle giriş yap
3. Başarılı girişten sonra `/admin` sayfasına yönlendirileceksin
4. Navbar'da "Yönetim Paneli" butonu görünecek

## 🎯 Yeni Yönetici Ekleme (Müşteri İçin)

### Admin Panelinden Yönetici Ekleme

1. Admin paneline giriş yap
2. **"Yöneticiler"** sekmesine tıkla
3. **"Yeni Yönetici Ekle"** formunu doldur:
   - Email adresi
   - Şifre (en az 6 karakter)
4. **"Yönetici Ekle"** butonuna tıkla
5. ✅ Yeni yönetici oluşturuldu!

### Önemli Notlar
- Yeni eklenen yönetici email adresini doğrulamalıdır
- Email doğrulama linki otomatik olarak gönderilir
- Doğrulama sonrası sisteme giriş yapabilir
- Tüm yöneticiler eşit yetkiye sahiptir

## 🔒 Güvenlik Özellikleri

### Veritabanı Güvenliği (RLS)
- Sadece adminler diğer profilleri görebilir
- Sadece adminler yeni admin oluşturabilir
- Kullanıcılar kendi profillerini silemez
- Tüm işlemler Supabase RLS ile korunur

### Uygulama Güvenliği
- Protected Routes ile rota koruması
- AuthContext ile merkezi yetkilendirme
- Admin kontrolü her istekte yapılır
- Yetkisiz erişim otomatik yönlendirilir

## 📊 Veritabanı Yapısı

### profiles Tablosu
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY,              -- auth.users ile ilişkili
  email TEXT,                       -- Kullanıcı email
  is_admin BOOLEAN DEFAULT FALSE,   -- Admin yetkisi
  created_at TIMESTAMP,             -- Oluşturulma tarihi
  updated_at TIMESTAMP              -- Güncellenme tarihi
);
```

### Trigger
Yeni kullanıcı oluşturulduğunda otomatik olarak `profiles` tablosuna kayıt eklenir.

## 🛠️ Teknik Detaylar

### AuthContext
```javascript
// Admin kontrolü artık veritabanından
const isAdmin = profile?.is_admin === true
```

### Kullanım (Kod İçinde)
```javascript
import { useAuth } from '../contexts/AuthContext'

function MyComponent() {
  const { isAdmin, user, profile } = useAuth()
  
  if (isAdmin) {
    // Admin için özel içerik
  }
}
```

## 🚀 Gelişmiş Özellikler

### Yönetici Silme
- Admin panelinden diğer yöneticileri silebilirsiniz
- Kendi hesabınızı silemezsiniz
- Silinen yönetici tekrar giriş yapamaz

### Email Doğrulama
- Supabase otomatik email doğrulama gönderir
- Doğrulama linki tıklanana kadar giriş yapılamaz
- Email şablonları Supabase Dashboard'dan özelleştirilebilir

### Çoklu Admin Desteği
- Sınırsız sayıda admin eklenebilir
- Tüm adminler eşit yetkiye sahiptir
- Her admin diğer adminleri yönetebilir

## ❓ Sorun Giderme

**Soru**: Yeni yönetici ekledim ama giriş yapamıyor
**Cevap**: Kullanıcının email adresini doğrulaması gerekiyor. Email kutusunu kontrol etsin.

**Soru**: "Yönetim Paneli" butonu görünmüyor
**Cevap**: 
1. Giriş yaptığından emin ol
2. `profiles` tablosunda `is_admin` değerinin `true` olduğunu kontrol et
3. Sayfayı yenile

**Soru**: `/admin` sayfasına gidince ana sayfaya yönlendiriliyor
**Cevap**: Admin yetkisi olmadığın için bu normal. `profiles` tablosunu kontrol et.

**Soru**: Trigger çalışmıyor, yeni kullanıcı için profil oluşturulmuyor
**Cevap**: 
1. SQL Editor'de trigger'ın oluşturulduğunu kontrol et
2. `auth.users` tablosuna manuel kayıt ekleyerek test et
3. Supabase loglarını kontrol et

## 📞 Destek

### Supabase Dashboard Kontrolleri
1. **Authentication** > **Users**: Kullanıcıları görüntüle
2. **Table Editor** > **profiles**: Admin durumlarını kontrol et
3. **SQL Editor**: Manuel sorgular çalıştır
4. **Logs**: Hata loglarını incele

### Yararlı SQL Sorguları

```sql
-- Tüm adminleri listele
SELECT * FROM profiles WHERE is_admin = true;

-- Kullanıcıyı admin yap
UPDATE profiles SET is_admin = true WHERE email = 'email@example.com';

-- Kullanıcının admin yetkisini kaldır
UPDATE profiles SET is_admin = false WHERE email = 'email@example.com';

-- Tüm profilleri listele
SELECT * FROM profiles ORDER BY created_at DESC;
```

## 🎉 Avantajlar

✅ **Kod değişikliği gerektirmez** - Müşteri admin panelinden yönetir
✅ **Güvenli** - Supabase RLS ile korunur
✅ **Kolay kullanım** - Basit form ile yönetici ekleme
✅ **Ölçeklenebilir** - Sınırsız admin desteği
✅ **Profesyonel** - Email doğrulama ve güvenlik özellikleri

## 📝 Değişiklik Geçmişi

### v2.0 - Dinamik Admin Sistemi
- ✅ Veritabanı tabanlı admin kontrolü
- ✅ Admin panelinden yönetici ekleme/silme
- ✅ Otomatik profil oluşturma (trigger)
- ✅ RLS politikaları
- ✅ Email doğrulama entegrasyonu

### v1.0 - Statik Admin Sistemi
- ❌ Kod içinde sabit email kontrolü (kaldırıldı)
