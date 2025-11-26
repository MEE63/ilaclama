# İletişim Modülü - Yapılan Değişiklikler

## 📋 Özet

Admin paneline iletişim yönetimi eklendi. Artık:
- ✅ İletişim formu gönderileri Supabase'e kaydediliyor
- ✅ Admin panelinden iletişim bilgileri (e-posta, telefon, adres) düzenlenebiliyor
- ✅ Form gönderileri görüntülenip silinebiliyor
- ✅ Adres bilgisi anasayfa ve footer'da senkronize

## 🗂️ Değiştirilen Dosyalar

### 1. `src/pages/Admin.jsx`
**Eklenenler:**
- Yeni "İletişim" tab'ı
- İletişim bilgileri formu (e-posta, telefon, adres)
- Form gönderileri listesi
- Form gönderilerini silme özelliği
- Adres senkronizasyonu (general_config ile)

**Yeni State'ler:**
```javascript
const [contactInfo, setContactInfo] = useState({ email: '', phone: '', address: '' })
const [submissions, setSubmissions] = useState([])
```

**Yeni Fonksiyonlar:**
- `fetchContactInfo()` - İletişim bilgilerini çeker
- `fetchSubmissions()` - Form gönderilerini çeker
- `handleContactInfoChange()` - Form değişikliklerini yönetir
- `handleContactInfoSave()` - İletişim bilgilerini kaydeder
- `handleDeleteSubmission()` - Form gönderisini siler

### 2. `src/pages/Iletisim.jsx`
**Eklenenler:**
- Form state yönetimi
- Supabase entegrasyonu
- Form gönderimi fonksiyonu
- Başarı/hata mesajları
- Telefon alanı (opsiyonel)
- İletişim bilgilerini veritabanından çekme

**Yeni State'ler:**
```javascript
const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
const [contactInfo, setContactInfo] = useState({ email: '', phone: '', address: '' })
const [loading, setLoading] = useState(false)
const [submitMessage, setSubmitMessage] = useState('')
```

**Yeni Fonksiyonlar:**
- `fetchContactInfo()` - İletişim bilgilerini çeker
- `handleChange()` - Form değişikliklerini yönetir
- `handleSubmit()` - Formu Supabase'e gönderir

### 3. `src/components/Footer.jsx`
**Eklenenler:**
- Adres bilgisini veritabanından çekme
- Dinamik adres gösterimi

**Yeni State:**
```javascript
const [address, setAddress] = useState('')
```

**Yeni Fonksiyon:**
- `fetchAddress()` - Adresi general_config'den çeker

## 🗄️ Yeni Supabase Tabloları

### `contact_info`
İletişim bilgilerini saklar (tek satır)

| Kolon | Tip | Açıklama |
|-------|-----|----------|
| id | INTEGER | Her zaman 1 (tek satır) |
| email | TEXT | E-posta adresi |
| phone | TEXT | Telefon numarası |
| address | TEXT | Adres bilgisi |
| created_at | TIMESTAMP | Oluşturulma tarihi |
| updated_at | TIMESTAMP | Güncellenme tarihi |

### `contact_submissions`
Form gönderilerini saklar

| Kolon | Tip | Açıklama |
|-------|-----|----------|
| id | UUID | Benzersiz ID |
| name | TEXT | Gönderen adı |
| email | TEXT | Gönderen e-postası |
| phone | TEXT | Gönderen telefonu (opsiyonel) |
| message | TEXT | Mesaj içeriği |
| created_at | TIMESTAMP | Gönderim tarihi |

## 📝 Yeni Dosyalar

1. **`supabase-setup.sql`** - Supabase tablolarını oluşturan SQL komutları
2. **`ILETISIM-KURULUM.md`** - Detaylı kurulum rehberi
3. **`DEGISIKLIKLER.md`** - Bu dosya

## 🚀 Kurulum Adımları

1. Supabase Dashboard'a gidin
2. SQL Editor'ü açın
3. `supabase-setup.sql` dosyasındaki komutları çalıştırın
4. Uygulamayı yeniden başlatın
5. `/admin` sayfasına gidin ve "İletişim" tab'ına tıklayın
6. İletişim bilgilerini doldurun ve kaydedin
7. `/iletisim` sayfasına gidin ve formu test edin

## ⚠️ Önemli Notlar

### Güvenlik
- Şu anda herkes admin paneline erişebilir
- Production'da mutlaka authentication ekleyin
- RLS politikalarını güvenli hale getirin

### Senkronizasyon
- `contact_info.address` ve `general_config.address` senkronize
- Admin panelinden adres değiştirildiğinde her iki tablo da güncellenir
- Footer ve anasayfa aynı adresi gösterir

### Test Edilmesi Gerekenler
- [ ] Admin panelinde iletişim bilgilerini güncelleme
- [ ] İletişim sayfasında form gönderimi
- [ ] Admin panelinde form gönderilerini görüntüleme
- [ ] Form gönderilerini silme
- [ ] Footer'da adres görünümü
- [ ] Adres senkronizasyonu

## 🔄 Veri Akışı

```
İletişim Sayfası (Form)
    ↓
Supabase (contact_submissions)
    ↓
Admin Paneli (Görüntüleme/Silme)

Admin Paneli (İletişim Bilgileri)
    ↓
Supabase (contact_info + general_config)
    ↓
İletişim Sayfası + Footer (Görüntüleme)
```

## 📞 Kullanım Senaryoları

### Senaryo 1: Yeni İletişim Bilgileri Ekleme
1. Admin paneline git → İletişim tab'ı
2. E-posta, telefon ve adres bilgilerini gir
3. Kaydet butonuna tıkla
4. İletişim sayfasını kontrol et
5. Footer'ı kontrol et

### Senaryo 2: Form Gönderisi Alma
1. Kullanıcı iletişim sayfasından form doldurur
2. Form Supabase'e kaydedilir
3. Admin panelinde form gönderisi görünür
4. Admin formu okur ve siler

### Senaryo 3: Adres Güncelleme
1. Admin paneline git → İletişim tab'ı
2. Adres bilgisini güncelle
3. Kaydet butonuna tıkla
4. Anasayfa ve footer'da yeni adres görünür
