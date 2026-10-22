import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/service";

const SHOP_INFO_ID = "00000000-0000-0000-0000-000000000001";

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

export async function GET() {
  try {
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from("shop_info")
      .select("*")
      .eq("id", SHOP_INFO_ID)
      .single();

    if (error) {
      console.error("Supabase GET shop_info error:", error);
      return NextResponse.json({ error: "حدث خطأ أثناء جلب إعدادات المحل" }, { status: 500 });
    }

    return NextResponse.json(toShopInfo(data));
  } catch (error) {
    console.error("GET /api/admin/shop-info error:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء جلب إعدادات المحل" }, { status: 500 });
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