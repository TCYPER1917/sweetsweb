import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
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

function toDbFields(body: any) {
  const updates: Record<string, any> = {};
  if (body.name !== undefined) updates.name = body.name;
  if (body.heroTitle !== undefined) updates.hero_title = body.heroTitle;
  if (body.heroSubtitle !== undefined) updates.hero_subtitle = body.heroSubtitle;
  if (body.aboutTitle !== undefined) updates.about_title = body.aboutTitle;
  if (body.aboutStory !== undefined) updates.about_story = body.aboutStory;
  if (body.phone1 !== undefined) updates.phone1 = body.phone1;
  if (body.phone2 !== undefined) updates.phone2 = body.phone2;
  if (body.whatsapp !== undefined) updates.whatsapp = body.whatsapp;
  if (body.hours !== undefined) updates.hours = body.hours;
  if (body.address !== undefined) updates.address = body.address;
  if (body.announcement !== undefined) updates.announcement = body.announcement;
  if (body.is_open !== undefined) updates.is_open = body.is_open;
  return updates;
}

async function ensureShopInfoExists(supabase: any) {
  const { data, error } = await supabase
    .from("shop_info")
    .select("*")
    .eq("id", SHOP_INFO_ID)
    .single();

  if (error && error.code === "PGRST116") {
    // Row doesn't exist, create it
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
    const shopInfo = await ensureShopInfoExists(supabase);
    return NextResponse.json(shopInfo);
  } catch (error) {
    console.error("GET /api/admin/shop-info error:", error);
    return NextResponse.json(DEFAULT_SHOP_INFO);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const updates = toDbFields(body);

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "لا توجد بيانات للتحديث" }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Ensure row exists first
    await ensureShopInfoExists(supabase);

    const { data, error } = await supabase
      .from("shop_info")
      .update(updates)
      .eq("id", SHOP_INFO_ID)
      .select()
      .single();

    if (error) {
      console.error("Supabase PUT shop_info error:", error);
      return NextResponse.json({ error: "حدث خطأ أثناء حفظ إعدادات المحل" }, { status: 500 });
    }

    return NextResponse.json({ success: true, shopInfo: toShopInfo(data) });
  } catch (error) {
    console.error("PUT /api/admin/shop-info error:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء حفظ إعدادات المحل" }, { status: 500 });
  }
}