-- Biz Kimiz sayfası ayarları tablosu
CREATE TABLE IF NOT EXISTS about_page_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  hero_image_url TEXT,
  office_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- İlk kayıt
INSERT INTO about_page_settings (id, hero_image_url, office_image_url)
VALUES (1, 'https://via.placeholder.com/600x400/d4dfe5/393d3f?text=Profesyonel+Ekibimiz', 'https://via.placeholder.com/500x350/d4dfe5/393d3f?text=Ofisimiz')
ON CONFLICT (id) DO NOTHING;

-- RLS politikaları
ALTER TABLE about_page_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Herkes okuyabilir" ON about_page_settings
  FOR SELECT USING (true);

CREATE POLICY "Herkes güncelleyebilir" ON about_page_settings
  FOR UPDATE USING (true);
