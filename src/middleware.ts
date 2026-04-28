import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/session-cookie";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/api/admin/login")) return NextResponse.next();
  if (pathname.startsWith("/api/admin/logout")) {
    if (request.method !== "POST") return NextResponse.json({ ok: false, message: "Method not allowed" }, { status: 405 });
    return NextResponse.next();
  }
  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (!token) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    const secret = process.env.SESSION_SECRET;
    if (!secret || secret.length < 16) return NextResponse.json({ ok: false, message: "Server misconfigured" }, { status: 500 });
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
      if (payload.role !== "admin") return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
      return NextResponse.next();
    } catch {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }
  }
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname.startsWith("/admin/login")) return NextResponse.next();
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return NextResponse.redirect(new URL("/admin/login", request.url));
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) return NextResponse.redirect(new URL("/admin/login", request.url));
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    if (payload.role !== "admin") return NextResponse.redirect(new URL("/admin/login", request.url));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = { matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"] };
