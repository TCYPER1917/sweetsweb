import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

const SHOP_INFO_ID = "00000000-0000-0000-0000-000000000001";

const DEFAULT_SHOP_INFO = {
  id: SHOP_INFO_ID,
  name: "حلويات أبو بشار",
  heroTitle: "نكهة لا تُنسى من حلويات أبو بشار",
  heroSubtitle: "نقدم لكم ألذ أنواع الكنافة النابلسية بالسمن البلدي الفاخر، والبقلاوة والكلاج وحلوياتنا الشرقية والغربية المحضرة طازجة يومياً بأعلى معايير الجودة والنظافة.",
  aboutTitle: "حكاية نكهة مميزة بدأت في حلويات أبو بشار",
  aboutStory: "منذ انطلاقتنا في عام 2022، وضعنا في حلويات أبو بشار هدفاً واحداً نصب أعيننا: تقديم الحلويات الشرقية والغربية كما يجب أن تكون. أصيلة في نكهتها، فاخرة في مكوناتها، وطازجة تُخبز يومياً لتصلكم ساخنة وتلامس قلوبكم قبل حواسكم.",
  phone1: "0569-553350",
  phone2: "0595-861525",
  whatsapp: "972569553350",
  hours: "يومياً من الساعة 9:00 صباحاً حتى 11:00 مساءً",
  address: "حلويات أبو بشار - المركز الرئيسي",
  announcement: "نستقبل حجوزات صواني الكنافة والحلويات للأفراح والمناسبات الخاصة مع خدمة التوصيل!",
  is_open: true,
};

function toProduct(row: any) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    unit: row.unit,
    description: row.description,
    image_url: row.image_url,
    is_available: row.is_available,
    created_at: row.created_at,
  };
}

function toShopInfo(row: any) {
  return {
    id: row.id,
    name: row.name,
    heroTitle: row.hero_title,
    heroSubtitle: row.hero_subtitle,
    aboutTitle: row.about_title,
    aboutStory: row.about_story,
    phone1: row.phone1,
    phone2: row.phone2,
    whatsapp: row.whatsapp,
    hours: row.hours,
    address: row.address,
    announcement: row.announcement,
    is_open: row.is_open,
  };
}

async function ensureShopInfoExists(supabase: any) {
  const { data, error } = await supabase
    .from("shop_info")
    .select("*")
    .eq("id", SHOP_INFO_ID)
    .single();

  if (error && error.code === "PGRST116") {
    const { data: newRow, error: insertError } = await supabase
      .from("shop_info")
      .insert({
        id: SHOP_INFO_ID,
        name: DEFAULT_SHOP_INFO.name,
        hero_title: DEFAULT_SHOP_INFO.heroTitle,
        hero_subtitle: DEFAULT_SHOP_INFO.heroSubtitle,
        about_title: DEFAULT_SHOP_INFO.aboutTitle,
        about_story: DEFAULT_SHOP_INFO.aboutStory,
        phone1: DEFAULT_SHOP_INFO.phone1,
        phone2: DEFAULT_SHOP_INFO.phone2,
        whatsapp: DEFAULT_SHOP_INFO.whatsapp,
        hours: DEFAULT_SHOP_INFO.hours,
        address: DEFAULT_SHOP_INFO.address,
        announcement: DEFAULT_SHOP_INFO.announcement,
        is_open: DEFAULT_SHOP_INFO.is_open,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Failed to create default shop_info:", insertError);
      return DEFAULT_SHOP_INFO;
    }
    return toShopInfo(newRow);
  }

  if (error) {
    console.error("Supabase GET shop_info error:", error);
    return DEFAULT_SHOP_INFO;
  }

  return toShopInfo(data);
}

export async function GET() {
  try {
    const supabase = createServiceClient();

    const [productsRes, shopInfo] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      ensureShopInfoExists(supabase),
    ]);

    if (productsRes.error) {
      console.error("Supabase GET products error:", productsRes.error);
      return NextResponse.json({ error: "حدث خطأ أثناء جلب المنتجات" }, { status: 500 });
    }

    return NextResponse.json({
      products: productsRes.data?.map(toProduct) || [],
      shopInfo,
    });
  } catch (error) {
    console.error("GET /api/admin/dashboard error:", error);
    return NextResponse.json({ products: [], shopInfo: DEFAULT_SHOP_INFO });
  }
}