-- ============================================================
-- Full schema for Abu Bashar Sweets (fresh Supabase project)
-- For an existing project, run supabase-migration.sql instead
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  unit TEXT NOT NULL DEFAULT '₪',
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Shop info table (single row, all editable site content)
CREATE TABLE IF NOT EXISTS shop_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT 'حلويات أبو بشار',

  hero_title TEXT DEFAULT 'نكهة لا تُنسى من حلويات أبو بشار',
  hero_subtitle TEXT DEFAULT 'نقدم لكم ألذ أنواع الكنافة النابلسية بالسمن البلدي الفاخر، والبقلاوة والكلاج وحلوياتنا الشرقية والغربية المحضرة طازجة يومياً بأعلى معايير الجودة والنظافة.',
  hero_badge TEXT NOT NULL DEFAULT 'أصالة المذاق الشرقي منذ عام 2022',
  hero_image TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
  hero_featured_name TEXT NOT NULL DEFAULT 'كنافة نابلسية ناعمة',
  hero_featured_desc TEXT NOT NULL DEFAULT 'جبنة بلدية فاخرة بالقطر الذهبي والفستق الحلبي',
  hero_featured_badge TEXT NOT NULL DEFAULT 'الأكثر طلباً ⭐',
  hero_hours_note TEXT NOT NULL DEFAULT 'يومياً 9:00 ص - 11:00 م',
  hero_delivery_note TEXT NOT NULL DEFAULT 'لكافة المناطق القريبة',
  hero_cta_text TEXT NOT NULL DEFAULT 'اطلب الآن عبر واتساب',
  hero_features JSONB NOT NULL DEFAULT '[{"title":"سمن بلدي","subtitle":"مكونات نقية 100%"},{"title":"طازج يومياً","subtitle":"يُخبز على مدار الساعة"},{"title":"خدمة سريعة","subtitle":"ضيافة وتجهيز مناسبات"}]'::jsonb,

  about_title TEXT DEFAULT 'حكاية نكهة مميزة بدأت في حلويات أبو بشار',
  about_story TEXT DEFAULT 'منذ انطلاقتنا في عام 2022، وضعنا في حلويات أبو بشار هدفاً واحداً نصب أعيننا: تقديم الحلويات الشرقية والغربية كما يجب أن تكون. أصيلة في نكهتها، فاخرة في مكوناتها، وطازجة تُخبز يومياً لتصلكم ساخنة وتلامس قلوبكم قبل حواسكم.',
  about_image TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
  about_highlights JSONB NOT NULL DEFAULT '["تأسسنا عام 2022 برؤية لتقديم أرقى وأشهى الحلويات الشرقية والغربية.","استخدام السمن البلدي الأصلي والجبنة النابلسية الطازجة يومياً.","وصفات متوارثة بإتقان عصري يلبي جميع الأذواق والمناسبات.","فريق متخصص يضمن أعلى معايير النظافة والجودة في كل قطعة."]'::jsonb,
  about_stat_year TEXT NOT NULL DEFAULT '2022',
  about_stat_label TEXT NOT NULL DEFAULT 'سنة التأسيس والانطلاق',
  about_badge TEXT NOT NULL DEFAULT 'نكهة بلدية أصيلة',
  about_badge_sub TEXT NOT NULL DEFAULT 'من أطيب ما تذوقت',

  catalog_title TEXT NOT NULL DEFAULT 'اختر ما تشتهيه من أطيب الحلويات',
  catalog_subtitle TEXT NOT NULL DEFAULT 'جميع أصنافنا تُحضر يومياً بأفخر أنواع السمن البلدي والمكسرات الطازجة والجبنة البلدية. اضغط على أي صنف للطلب السريع عبر واتساب.',
  catalog_badge TEXT NOT NULL DEFAULT 'قائمة الأصناف الطازجة',
  categories JSONB NOT NULL DEFAULT '["كنافة","حلويات شرقية","مشروبات ساخنة"]'::jsonb,

  phone1 TEXT DEFAULT '0569-553350',
  phone2 TEXT DEFAULT '0595-861525',
  whatsapp TEXT DEFAULT '972569553350',
  hours TEXT DEFAULT 'يومياً من الساعة 9:00 صباحاً حتى 11:00 مساءً',
  hours_note TEXT NOT NULL DEFAULT 'طيلة أيام الأسبوع',
  address TEXT DEFAULT 'حلويات أبو بشار - سنجل، بجانب استوديو فرح',
  address_note TEXT NOT NULL DEFAULT 'موقع مميز وسهل الوصول مع توفر أماكن للاصطفاف',
  map_url TEXT NOT NULL DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108846.54160410777!2d35.203764!3d31.903764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502d50e828d011d%3A0xb36b3dbba9b14e6b!2sRamallah!5e0!3m2!1sar!2s!4v1700000000000!5m2!1sar!2s',

  announcement TEXT DEFAULT 'نستقبل حجوزات صواني الكنافة والحلويات للأفراح والمناسبات الخاصة مع خدمة التوصيل!',
  footer_about TEXT NOT NULL DEFAULT 'رمز الأصالة والذوق الرفيع. نقدم لكم أشهى الحلويات الشرقية والغربية والكنافة النابلسية بالسمن البلدي مع إمكانية التوصيل وتلبية المناسبات.',
  facebook_url TEXT NOT NULL DEFAULT 'https://facebook.com',
  instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com',
  meta_title TEXT NOT NULL DEFAULT 'حلويات أبو بشار | Abu Bashar Sweets',
  meta_description TEXT NOT NULL DEFAULT 'حلويات شرقية وغربية أصيلة، محضرة يومياً بأجود المكونات. كنافة، بقلاوة، هريسة، ومشروبات ساخنة.',

  is_open BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Default shop row
INSERT INTO shop_info (id) VALUES ('00000000-0000-0000-0000-000000000001')
ON CONFLICT (id) DO NOTHING;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_available ON products(is_available);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_info ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read products" ON products;
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin full access products" ON products;
CREATE POLICY "Admin full access products" ON products FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Public read shop_info" ON shop_info;
CREATE POLICY "Public read shop_info" ON shop_info FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin full access shop_info" ON shop_info;
CREATE POLICY "Admin full access shop_info" ON shop_info FOR ALL USING (auth.role() = 'service_role');

-- updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_shop_info_updated_at ON shop_info;
CREATE TRIGGER update_shop_info_updated_at
  BEFORE UPDATE ON shop_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Storage bucket for admin image uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read site images" ON storage.objects;
CREATE POLICY "Public read site images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-images');

-- Sample products
INSERT INTO products (name, category, price, unit, description, image_url, is_available) VALUES
('الكنافة الناعمة النابلسية', 'كنافة', 45, '₪ / كغم', 'كنافة ناعمة تقليدية بالسمن البلدي الفاخر والجبنة النابلسية البلدية المطاطية مع الفستق الحلبي.', 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80', true),
('كنافة أصابع ذهبية', 'كنافة', 50, '₪ / كغم', 'أصابع الكنافة المقرمشة المحشوة بالقشطة الطازجة أو الجبنة والمغطاة بالفستق الأخضر.', 'https://images.unsplash.com/photo-1596504285810-7217316715f5?auto=format&fit=crop&w=800&q=80', true),
('البقلاوة المشكلة بالفستق والجوز', 'حلويات شرقية', 65, '₪ / كغم', 'تشكيلة فاخرة من أصناف البقلاوة المورقة بالسمن البلدي ومحشوة بأجود أنواع الفستق الحلبي والجوز.', 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80', true),
('قهوة عربية بالهيل والزعفران', 'مشروبات ساخنة', 8, '₪ / فنجان', 'قهوة عربية أصيلة معدّة من حبوب البن المحمصة الفاخرة المتبلة بالهيل والزعفران.', 'https://images.unsplash.com/photo-1514432324607-a09d9b4a45a3?auto=format&fit=crop&w=800&q=80', true);
