import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

const SHOP_INFO_ID = "00000000-0000-0000-0000-000000000001";

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

export async function GET() {
  try {
    const supabase = createServiceClient();

    const [productsRes, shopRes] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("shop_info").select("*").eq("id", SHOP_INFO_ID).single(),
    ]);

    if (productsRes.error) {
      console.error("Supabase GET products error:", productsRes.error);
      return NextResponse.json({ error: "حدث خطأ أثناء جلب المنتجات" }, { status: 500 });
    }

    if (shopRes.error) {
      console.error("Supabase GET shop_info error:", shopRes.error);
      return NextResponse.json({ error: "حدث خطأ أثناء جلب إعدادات المحل" }, { status: 500 });
    }

    return NextResponse.json({
      products: productsRes.data.map(toProduct),
      shopInfo: toShopInfo(shopRes.data),
    });
  } catch (error) {
    console.error("GET /api/admin/dashboard error:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء جلب البيانات" }, { status: 500 });
  }
}