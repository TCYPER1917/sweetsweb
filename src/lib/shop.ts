import "server-only";
import { cache } from "react";
import { createServiceClient } from "@/lib/supabase/service";
import { dbToShopInfo } from "@/lib/shop-info";
import { DEFAULT_SHOP_INFO, SHOP_INFO_ID } from "@/lib/site-defaults";
import type { Product, ShopInfo } from "@/types";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80";

export const getShopInfo = cache(async (): Promise<ShopInfo> => {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("shop_info")
      .select("*")
      .eq("id", SHOP_INFO_ID)
      .maybeSingle();

    if (error || !data) return { ...DEFAULT_SHOP_INFO };
    return dbToShopInfo(data);
  } catch {
    return { ...DEFAULT_SHOP_INFO };
  }
});

export const getProducts = cache(async (): Promise<Product[]> => {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: Number(p.price),
      unit: p.unit || "₪",
      description: p.description || "",
      image_url: p.image_url || DEFAULT_IMAGE,
      is_available: p.is_available !== false,
      created_at: p.created_at,
    }));
  } catch {
    return [];
  }
});
