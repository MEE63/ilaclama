# İletişim Sistemi Kurulum Talimatları

## 📋 Yapılan Değişiklikler

### 1. Admin Paneli Güncellemeleri
- ✅ Yeni "İletişim" sekmesi eklendi
- ✅ İletişim bilgileri yönetimi (e-posta, telefon, adres)
- ✅ Form gönderilerini görüntüleme ve yönetme
- ✅ Adres bilgisi anasayfadaki CTA bölümüyle senkronize

### 2. İletişim Sayfası Güncellemeleri
- ✅ Form gönderileri Supabase'e kaydediliyor
- ✅ İletişim bilgileri veritabanından çekiliyor
- ✅ Başarı/hata mesajları gösteriliyor
- ✅ Form gönderimi sonrası temizleniyor

## 🚀 Kurulum Adımları

### Adım 1: Supabase Tablolarını Oluşturun

1. Supabase Dashboard'a gidin: https://supabase.com/dashboard
2. Projenizi seçin
3. Sol menüden **SQL Editor**'ü açın
4. `supabase-contact-tables.sql` dosyasının içeriğini kopyalayın
5. SQL Editor'e yapıştırın ve **RUN** butonuna tıklayın

Bu işlem şu tabloları oluşturacak:
- `contact_info` - İletişim bilgileri (e-posta, telefon, adres)
- `contact_submissions` - Form gönderileri

### Adım 2: Tabloları Kontrol Edin

1. Sol menüden **Table Editor**'ü açın
2. `contact_info` ve `contact_submissions` tablolarının oluşturulduğunu kontrol edin
3. `contact_info` tablosunda varsayılan bir kayıt olmalı

### Adım 3: Uygulamayı Test Edin

1. Uygulamayı başlatın: `npm run dev`
2. Admin paneline gidin: `http://localhost:5173/admin`
3. **İletişim** sekmesine tıklayın
4. İletişim bilgilerini güncelleyin ve kaydedin
5. İletişim sayfasına gidin: `http://localhost:5173/iletisim`
6. Formu doldurup gönderin
7. Admin paneline dönün ve form gönderisinin geldiğini kontrol edin

## 📝 Özellikler

### Admin Paneli - İletişim Sekmesi

**İletişim Bilgileri Yönetimi:**
- E-posta adresi
- Telefon numarası
- Adres (anasayfadaki CTA ile senkronize)

**Form Gönderileri:**
- Gönderen adı ve e-posta
- Mesaj içeriği
- Gönderim tarihi
- Okundu/okunmadı durumu
- Silme işlemi

### İletişim Sayfası

**Form Özellikleri:**
- İsim, e-posta ve mesaj alanları
- Form validasyonu
- Başarı/hata mesajları
- Otomatik form temizleme
- Loading durumu

**İletişim Bilgileri:**
- Admin panelden düzenlenebilir e-posta
- Admin panelden düzenlenebilir telefon
- Admin panelden düzenlenebilir adres
- Google Maps entegrasyonu

## 🔄 Senkronizasyon

Adres bilgisi iki yerde kullanılıyor:
1. **Anasayfa CTA Bölümü** - `general_config.address`
2. **İletişim Sayfası** - `contact_info.address`

Admin panelinde iletişim bilgileri kaydedildiğinde, her iki tablo da otomatik olarak güncellenir.

## 🎨 Kullanım

### İletişim Bilgilerini Güncelleme

1. Admin paneline gidin
2. "İletişim" sekmesine tıklayın
3. E-posta, telefon ve adres bilgilerini girin
4. "Kaydet" butonuna tıklayın

### Form Gönderilerini Görüntüleme

1. Admin paneline gidin
2. "İletişim" sekmesine tıklayın
3. Aşağı kaydırın
4. Tüm form gönderileri listelenir
5. "Okundu Olarak İşaretle" veya "Sil" butonlarını kullanın

## 🔒 Güvenlik

- RLS (Row Level Security) politikaları aktif
- Herkes form gönderebilir
- Admin paneli için authentication eklenmeli (opsiyonel)

## 📊 Veritabanı Yapısı

### contact_info
```
id (INTEGER, PRIMARY KEY)
email (TEXT)
phone (TEXT)
address (TEXT)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### contact_submissions
```
id (UUID, PRIMARY KEY)
name (TEXT)
email (TEXT)
message (TEXT)
phone (TEXT, nullable)
is_read (BOOLEAN)
created_at (TIMESTAMP)
```

## ✅ Tamamlandı!

Artık iletişim sisteminiz hazır. Kullanıcılar form gönderebilir, siz de admin panelinden yönetebilirsiniz.
