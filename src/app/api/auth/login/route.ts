import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials, createAdminToken, setAuthCookie, checkRateLimit, sanitizeString } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // 1. IP-based Rate Limiting (Prevent Brute-Force)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const rateLimit = checkRateLimit(`login_${ip}`, 5, 60000); // Max 5 attempts per 60 seconds

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "تم تجاوز عدد المحاولات المسموح بها. يرجى المحاولة بعد دقيقة واحدة.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(rateLimit.resetTime / 1000).toString(),
          },
        }
      );
    }

    // 2. Parse and Validate Request Body
    const body = await req.json();
    const username = sanitizeString(body.username || "");
    const password = body.password || "";

    if (!username || !password) {
      return NextResponse.json(
        { error: "يرجى إدخال اسم المستخدم وكلمة المرور" },
        { status: 400 }
      );
    }

    // 3. Verify Credentials using bcrypt
    const isValid = await verifyAdminCredentials(username, password);

    if (!isValid) {
      return NextResponse.json(
        { error: "اسم المستخدم أو كلمة المرور غير صحيحة" },
        { status: 401 }
      );
    }

    // 4. Generate Secure JWT Token
    const token = await createAdminToken(username);

    // 5. Build Response and set HttpOnly SameSite Cookie
    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      user: { username, role: "admin" },
    });

    setAuthCookie(response, token);

    return response;
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع أثناء معالجة الطلب" },
      { status: 500 }
    );
  }
}
