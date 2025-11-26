-- İletişim bilgileri tablosu (admin panelden düzenlenebilir)
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
VALUES (1, 'info@example.com', '+90 XXX XXX XX XX', 'Örnek Mahalle, Örnek Sokak No:1, İstanbul, Türkiye')
ON CONFLICT (id) DO NOTHING;

-- Form gönderileri tablosu
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  phone TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) politikaları
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Herkes contact_info'yu okuyabilir
CREATE POLICY "Anyone can read contact info"
  ON contact_info FOR SELECT
  USING (true);

-- Herkes contact_info'yu güncelleyebilir (admin paneli için)
CREATE POLICY "Anyone can update contact info"
  ON contact_info FOR UPDATE
  USING (true);

-- Herkes contact_info'ya insert yapabilir (upsert için)
CREATE POLICY "Anyone can insert contact info"
  ON contact_info FOR INSERT
  WITH CHECK (true);

-- Herkes form gönderisi yapabilir
CREATE POLICY "Anyone can insert submissions"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Herkes form gönderilerini okuyabilir (admin paneli için)
CREATE POLICY "Anyone can read submissions"
  ON contact_submissions FOR SELECT
  USING (true);

-- Herkes form gönderilerini güncelleyebilir (okundu işaretleme için)
CREATE POLICY "Anyone can update submissions"
  ON contact_submissions FOR UPDATE
  USING (true);

-- Herkes form gönderilerini silebilir (admin paneli için)
CREATE POLICY "Anyone can delete submissions"
  ON contact_submissions FOR DELETE
  USING (true);

-- İndeksler (performans için)
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_is_read ON contact_submissions(is_read);
