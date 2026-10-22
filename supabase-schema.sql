-- Supabase Schema for Abu Bashar Sweets
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  unit TEXT NOT NULL DEFAULT '₪',
  description TEXT,
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Shop info table (single row)
CREATE TABLE shop_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT 'حلويات أبو بشار',
  hero_title TEXT,
  hero_subtitle TEXT,
  about_title TEXT,
  about_story TEXT,
  phone1 TEXT,
  phone2 TEXT,
  whatsapp TEXT,
  hours TEXT,
  address TEXT,
  announcement TEXT,
  is_open BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default shop info
INSERT INTO shop_info (id, name, hero_title, hero_subtitle, about_title, about_story, phone1, phone2, whatsapp, hours, address, announcement, is_open)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'حلويات أبو بشار',
  'نكهة لا تُنسى من حلويات أبو بشار',
  'نقدم لكم ألذ أنواع الكنافة النابلسية بالسمن البلدي الفاخر، والبقلاوة والكلاج وحلوياتنا الشرقية والغربية المحضرة طازجة يومياً بأعلى معايير الجودة والنظافة.',
  'حكاية نكهة مميزة بدأت في حلويات أبو بشار',
  'منذ انطلاقتنا في عام 2022، وضعنا في حلويات أبو بشار هدفاً واحداً نصب أعيننا: تقديم الحلويات الشرقية والغربية كما يجب أن تكون. أصيلة في نكهتها، فاخرة في مكوناتها، وطازجة تُخبز يومياً لتصلكم ساخنة وتلامس قلوبكم قبل حواسكم.',
  '0569-553350',
  '0595-861525',
  '972569553350',
  'يومياً من الساعة 9:00 صباحاً حتى 11:00 مساءً',
  'حلويات أبو بشار - المركز الرئيسي',
  'نستقبل حجوزات صواني الكنافة والحلويات للأفراح والمناسبات الخاصة مع خدمة التوصيل!',
  true
);

-- Indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_available ON products(is_available);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_info ENABLE ROW LEVEL SECURITY;

-- Public read access for products
CREATE POLICY "Public read products" ON products
  FOR SELECT USING (true);

-- Admin full access for products (using service role)
CREATE POLICY "Admin full access products" ON products
  FOR ALL USING (auth.role() = 'service_role');

-- Public read access for shop_info
CREATE POLICY "Public read shop_info" ON shop_info
  FOR SELECT USING (true);

-- Admin full access for shop_info
CREATE POLICY "Admin full access shop_info" ON shop_info
  FOR ALL USING (auth.role() = 'service_role');

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shop_info_updated_at
  BEFORE UPDATE ON shop_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Optional: Insert sample products
INSERT INTO products (name, category, price, unit, description, image_url, is_available) VALUES
('الكنافة الناعمة النابلسية', 'كنافة', 45, '₪ / كغم', 'كنافة ناعمة تقليدية بالسمن البلدي الفاخر والجبنة النابلسية البلدية المطاطية مع الفستق الحلبي.', 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80', true),
('كنافة أصابع ذهبية', 'كنافة', 50, '₪ / كغم', 'أصابع الكنافة المقرمشة المحشوة بالقشطة الطازجة أو الجبنة والمغطاة بالفستق الأخضر.', 'https://images.unsplash.com/photo-1596504285810-7217316715f5?auto=format&fit=crop&w=800&q=80', true),
('البقلاوة المشكلة بالفستق والجوز', 'حلويات شرقية', 65, '₪ / كغم', 'تشكيلة فاخرة من أصناف البقلاوة المورقة بالسمن البلدي ومحشوة بأجود أنواع الفستق الحلبي والجوز.', 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80', true),
('قهوة عربية بالهيل والزعفران', 'مشروبات ساخنة', 8, '₪ / فنجان', 'قهوة عربية أصيلة معدّة من حبوب البن المحمصة الفاخرة المتبلة بالهيل والزعفران.', 'https://images.unsplash.com/photo-1514432324607-a09d9b4a45a3?auto=format&fit=crop&w=800&q=80', true);