import { NextRequest, NextResponse } from "next/server";
import { getAdminSession, sanitizeString } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/service";
import { Product } from "@/types";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80";

function toProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    unit: row.unit,
    description: row.description,
    image_url: row.image_url || DEFAULT_IMAGE,
    is_available: row.is_available,
    created_at: row.created_at,
  };
}

// GET /api/products - Public: Retrieve all products
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const supabase = createServiceClient();

    let query = supabase.from("products").select("*").order("created_at", { ascending: false });

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase GET products error:", error);
      return NextResponse.json(
        { error: "حدث خطأ أثناء جلب قائمة المنتجات" },
        { status: 500 }
      );
    }

    return NextResponse.json(data.map(toProduct), {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
      },
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب قائمة المنتجات" },
      { status: 500 }
    );
  }
}

// POST /api/products - Admin Only: Add new product
export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { error: "غير مصرح. يرجى تسجيل الدخول كمسؤول أولاً." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const name = sanitizeString(body.name || "");
    const category = sanitizeString(body.category || "");
    const description = sanitizeString(body.description || "");
    const image_url = sanitizeString(body.image_url || "");
    const unit = sanitizeString(body.unit || "₪");
    const price = Number(body.price);
    const is_available = body.is_available !== false;

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "اسم الصنف مطلوب ويجب أن يحتوي على حرفين على الأقل" },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: "يرجى تحديد تصنيف الصنف" },
        { status: 400 }
      );
    }

    if (isNaN(price) || price < 0) {
      return NextResponse.json(
        { error: "يرجى إدخال سعر صحيح للصنف" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        category,
        price,
        unit,
        description,
        image_url: image_url || DEFAULT_IMAGE,
        is_available,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase POST product error:", error);
      return NextResponse.json(
        { error: "حدث خطأ أثناء إضافة الصنف" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "تم إضافة الصنف بنجاح",
        product: toProduct(data),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إضافة الصنف" },
      { status: 500 }
    );
  }
}

// PUT /api/products - Admin Only: Update existing product
export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { error: "غير مصرح. يرجى تسجيل الدخول كمسؤول أولاً." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const id = sanitizeString(body.id || "");

    if (!id) {
      return NextResponse.json(
        { error: "معرف الصنف مطلوب للتعديل" },
        { status: 400 }
      );
    }

    const updates: Record<string, any> = {};

    if (body.name !== undefined) updates.name = sanitizeString(body.name);
    if (body.category !== undefined) updates.category = sanitizeString(body.category);
    if (body.description !== undefined) updates.description = sanitizeString(body.description);
    if (body.image_url !== undefined) updates.image_url = sanitizeString(body.image_url);
    if (body.unit !== undefined) updates.unit = sanitizeString(body.unit);
    if (body.price !== undefined) {
      const priceNum = Number(body.price);
      if (isNaN(priceNum) || priceNum < 0) {
        return NextResponse.json(
          { error: "يرجى إدخال سعر صحيح" },
          { status: 400 }
        );
      }
      updates.price = priceNum;
    }
    if (body.is_available !== undefined) {
      updates.is_available = Boolean(body.is_available);
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "لا توجد بيانات للتحديث" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase PUT product error:", error);
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "الصنف غير موجود أو تعذر تحديثه" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "حدث خطأ أثناء تعديل الصنف" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "تم تحديث الصنف بنجاح",
      product: toProduct(data),
    });
  } catch (error) {
    console.error("PUT /api/products error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء تعديل الصنف" },
      { status: 500 }
    );
  }
}

// DELETE /api/products - Admin Only: Delete product
export async function DELETE(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { error: "غير مصرح. يرجى تسجيل الدخول كمسؤول أولاً." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const queryId = searchParams.get("id");
    let id = queryId;

    if (!id) {
      try {
        const body = await req.json();
        id = body.id;
      } catch {
        // body not present
      }
    }

    if (!id) {
      return NextResponse.json(
        { error: "معرف الصنف مطلوب للحذف" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Supabase DELETE product error:", error);
      return NextResponse.json(
        { error: "حدث خطأ أثناء حذف الصنف" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "تم حذف الصنف بنجاح",
    });
  } catch (error) {
    console.error("DELETE /api/products error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء حذف الصنف" },
      { status: 500 }
    );
  }
}