import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/service";
import { dbToShopInfo, shopInfoToDb } from "@/lib/shop-info";
import { DEFAULT_SHOP_INFO, SHOP_INFO_ID } from "@/lib/site-defaults";

const MISSING_COLUMNS_MESSAGE =
  "قاعدة البيانات تحتاج تحديثاً. يرجى تشغيل ملف supabase-migration.sql في Supabase SQL Editor أولاً.";

async function ensureShopInfoExists(supabase: any) {
  const { data, error } = await supabase
    .from("shop_info")
    .select("*")
    .eq("id", SHOP_INFO_ID)
    .maybeSingle();

  if (error) return { row: null, error };

  if (!data) {
    const { data: inserted, error: insertError } = await supabase
      .from("shop_info")
      .insert({ id: SHOP_INFO_ID, ...shopInfoToDb(DEFAULT_SHOP_INFO) })
      .select("*")
      .single();

    if (insertError) return { row: null, error: insertError };
    return { row: inserted, error: null };
  }

  return { row: data, error: null };
}

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = createServiceClient();
    const { row, error } = await ensureShopInfoExists(supabase);

    if (error) {
      console.error("Supabase GET shop_info error:", error);
      if (error.code === "42P01") {
        return NextResponse.json({ error: MISSING_COLUMNS_MESSAGE }, { status: 500 });
      }
      return NextResponse.json({ error: "حدث خطأ أثناء جلب إعدادات المحل" }, { status: 500 });
    }

    return NextResponse.json(dbToShopInfo(row));
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
    const updates = shopInfoToDb(body);

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "لا توجد بيانات للتحديث" }, { status: 400 });
    }

    const supabase = createServiceClient();
    await ensureShopInfoExists(supabase);

    const { data, error } = await supabase
      .from("shop_info")
      .update(updates)
      .eq("id", SHOP_INFO_ID)
      .select("*")
      .single();

    if (error) {
      console.error("Supabase PUT shop_info error:", error);
      if (error.code === "42703" || error.code === "PGRST204") {
        return NextResponse.json({ error: MISSING_COLUMNS_MESSAGE }, { status: 500 });
      }
      return NextResponse.json({ error: "حدث خطأ أثناء حفظ إعدادات المحل" }, { status: 500 });
    }

    return NextResponse.json({ success: true, shopInfo: dbToShopInfo(data) });
  } catch (error) {
    console.error("PUT /api/admin/shop-info error:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء حفظ إعدادات المحل" }, { status: 500 });
  }
}
