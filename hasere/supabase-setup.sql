-- İletişim bilgileri tablosu
CREATE TABLE IF NOT EXISTS contact_info (
  id INTEGER PRIMARY KEY DEFAULT 1,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- İlk kayıt ekle
INSERT INTO contact_info (id, email, phone, address)
VALUES (1, 'info@example.com', '+90 XXX XXX XX XX', 'Örnek Mahalle, Örnek Sokak No:1
İstanbul, Türkiye')
ON CONFLICT (id) DO NOTHING;

-- Form gönderileri tablosu
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) politikaları
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir
CREATE POLICY "Anyone can read contact_info" ON contact_info
  FOR SELECT USING (true);

-- Herkes ekleyebilir (form gönderimi için)
CREATE POLICY "Anyone can insert contact_submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Herkes okuyabilir (admin paneli için)
CREATE POLICY "Anyone can read contact_submissions" ON contact_submissions
  FOR SELECT USING (true);

-- Herkes silebilir (admin paneli için - production'da bu politikayı kaldırın veya auth ekleyin)
CREATE POLICY "Anyone can delete contact_submissions" ON contact_submissions
  FOR DELETE USING (true);

-- Herkes güncelleyebilir (admin paneli için - production'da bu politikayı kaldırın veya auth ekleyin)
CREATE POLICY "Anyone can update contact_info" ON contact_info
  FOR UPDATE USING (true);
