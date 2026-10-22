import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import DOMPurify from "isomorphic-dompurify";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-placeholder-for-dev-only";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD_HASH =
  process.env.ADMIN_PASSWORD_HASH ||
  "$2a$12$qK38aOD6TVaiZby.HIq.je2wOiGLRPkTVEUNoEXBqXXn0YIeqR9Fq"; // Replace with real hash

// 1. Password Hashing & Verification
export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  if (username !== ADMIN_USERNAME) return false;
  return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

// 2. Token Generation
export async function createAdminToken(username: string): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET);
  return await new SignJWT({ username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h") // Token expires in 2 hours
    .sign(secret);
}

// 3. Token Verification
export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

// 4. Set Secure Cookie
export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7200, // 2 hours
    path: "/",
  });
}

// 5. Clear Cookie
export function clearAuthCookie(response: NextResponse) {
  response.cookies.delete("admin_token");
}

// 6. Input Sanitization
export function sanitizeString(input: string): string {
  // Use isomorphic-dompurify for safe stripping of potential XSS
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Strip all HTML tags
    ALLOWED_ATTR: [],
  });
}

// 7. Simple In-Memory Rate Limiter
const rateLimits = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = rateLimits.get(key) || { count: 0, resetTime: now + windowMs };

  if (now > entry.resetTime) {
    entry.count = 0;
    entry.resetTime = now + windowMs;
  }

  entry.count++;
  rateLimits.set(key, entry);

  return {
    allowed: entry.count <= limit,
    resetTime: entry.resetTime - now,
  };
}
