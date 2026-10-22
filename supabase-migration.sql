-- ============================================================
-- Migration: full site content control for Abu Bashar Sweets
-- Run this in Supabase SQL Editor (safe to run multiple times)
-- ============================================================

-- 1) New editable columns on shop_info
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS hero_badge TEXT NOT NULL DEFAULT 'أصالة المذاق الشرقي منذ عام 2022';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS hero_image TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS hero_featured_name TEXT NOT NULL DEFAULT 'كنافة نابلسية ناعمة';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS hero_featured_desc TEXT NOT NULL DEFAULT 'جبنة بلدية فاخرة بالقطر الذهبي والفستق الحلبي';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS hero_featured_badge TEXT NOT NULL DEFAULT 'الأكثر طلباً ⭐';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS hero_hours_note TEXT NOT NULL DEFAULT 'يومياً 9:00 ص - 11:00 م';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS hero_delivery_note TEXT NOT NULL DEFAULT 'لكافة المناطق القريبة';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS hero_cta_text TEXT NOT NULL DEFAULT 'اطلب الآن عبر واتساب';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS hero_features JSONB NOT NULL DEFAULT '[{"title":"سمن بلدي","subtitle":"مكونات نقية 100%"},{"title":"طازج يومياً","subtitle":"يُخبز على مدار الساعة"},{"title":"خدمة سريعة","subtitle":"ضيافة وتجهيز مناسبات"}]'::jsonb;
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS about_image TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS about_highlights JSONB NOT NULL DEFAULT '["تأسسنا عام 2022 برؤية لتقديم أرقى وأشهى الحلويات الشرقية والغربية.","استخدام السمن البلدي الأصلي والجبنة النابلسية الطازجة يومياً.","وصفات متوارثة بإتقان عصري يلبي جميع الأذواق والمناسبات.","فريق متخصص يضمن أعلى معايير النظافة والجودة في كل قطعة."]'::jsonb;
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS about_stat_year TEXT NOT NULL DEFAULT '2022';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS about_stat_label TEXT NOT NULL DEFAULT 'سنة التأسيس والانطلاق';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS about_badge TEXT NOT NULL DEFAULT 'نكهة بلدية أصيلة';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS about_badge_sub TEXT NOT NULL DEFAULT 'من أطيب ما تذوقت';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS catalog_title TEXT NOT NULL DEFAULT 'اختر ما تشتهيه من أطيب الحلويات';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS catalog_subtitle TEXT NOT NULL DEFAULT 'جميع أصنافنا تُحضر يومياً بأفخر أنواع السمن البلدي والمكسرات الطازجة والجبنة البلدية. اضغط على أي صنف للطلب السريع عبر واتساب.';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS catalog_badge TEXT NOT NULL DEFAULT 'قائمة الأصناف الطازجة';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS categories JSONB NOT NULL DEFAULT '["كنافة","حلويات شرقية","مشروبات ساخنة"]'::jsonb;
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS hours_note TEXT NOT NULL DEFAULT 'طيلة أيام الأسبوع';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS address_note TEXT NOT NULL DEFAULT 'موقع مميز وسهل الوصول مع توفر أماكن للاصطفاف';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS map_url TEXT NOT NULL DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108846.54160410777!2d35.203764!3d31.903764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502d50e828d011d%3A0xb36b3dbba9b14e6b!2sRamallah!5e0!3m2!1sar!2s!4v1700000000000!5m2!1sar!2s';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS footer_about TEXT NOT NULL DEFAULT 'رمز الأصالة والذوق الرفيع. نقدم لكم أشهى الحلويات الشرقية والغربية والكنافة النابلسية بالسمن البلدي مع إمكانية التوصيل وتلبية المناسبات.';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS facebook_url TEXT NOT NULL DEFAULT 'https://facebook.com';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS meta_title TEXT NOT NULL DEFAULT 'حلويات أبو بشار | Abu Bashar Sweets';
ALTER TABLE shop_info ADD COLUMN IF NOT EXISTS meta_description TEXT NOT NULL DEFAULT 'حلويات شرقية وغربية أصيلة، محضرة يومياً بأجود المكونات. كنافة، بقلاوة، هريسة، ومشروبات ساخنة.';

-- 2) Make sure the single shop_info row exists
INSERT INTO shop_info (id, name)
VALUES ('00000000-0000-0000-0000-000000000001', 'حلويات أبو بشار')
ON CONFLICT (id) DO NOTHING;

-- 3) Storage bucket for admin image uploads (public read)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read site images" ON storage.objects;
CREATE POLICY "Public read site images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-images');

-- 4) Ensure products policies exist
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read products" ON products;
CREATE POLICY "Public read products" ON products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin full access products" ON products;
CREATE POLICY "Admin full access products" ON products
  FOR ALL USING (auth.role() = 'service_role');

-- 5) Ensure shop_info policies exist
ALTER TABLE shop_info ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read shop_info" ON shop_info;
CREATE POLICY "Public read shop_info" ON shop_info
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin full access shop_info" ON shop_info;
CREATE POLICY "Admin full access shop_info" ON shop_info
  FOR ALL USING (auth.role() = 'service_role');
