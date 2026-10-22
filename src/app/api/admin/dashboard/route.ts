import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/service";
import { dbToShopInfo } from "@/lib/shop-info";
import { DEFAULT_SHOP_INFO, SHOP_INFO_ID } from "@/lib/site-defaults";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80";

function toProduct(row: any) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    unit: row.unit || "₪",
    description: row.description || "",
    image_url: row.image_url || DEFAULT_IMAGE,
    is_available: row.is_available !== false,
    created_at: row.created_at,
  };
}

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = createServiceClient();

    const [productsRes, shopRes] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("shop_info").select("*").eq("id", SHOP_INFO_ID).maybeSingle(),
    ]);

    if (productsRes.error) {
      console.error("Supabase GET products error:", productsRes.error);
      return NextResponse.json({ error: "حدث خطأ أثناء جلب المنتجات" }, { status: 500 });
    }

    return NextResponse.json({
      products: (productsRes.data || []).map(toProduct),
      shopInfo: shopRes.data ? dbToShopInfo(shopRes.data) : { ...DEFAULT_SHOP_INFO },
    });
  } catch (error) {
    console.error("GET /api/admin/dashboard error:", error);
    return NextResponse.json(
      { products: [], shopInfo: DEFAULT_SHOP_INFO },
      { status: 500 }
    );
  }
}
