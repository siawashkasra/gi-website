import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { signAdminSessionJwt } from "@/lib/admin/jwt";
import { verifyAdminPassword } from "@/lib/admin/password";
import { allowLoginAttempt } from "@/lib/admin/rate-limit";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE_SEC } from "@/lib/admin/session-cookie";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const configured = process.env.ADMIN_PASSWORD ?? "";
  if (!configured || configured.length < 8) return NextResponse.json({ ok: false, message: "Server misconfigured" }, { status: 503 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "local";
  if (!allowLoginAttempt(ip)) return NextResponse.json({ ok: false, message: "Too many attempts" }, { status: 429 });
  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }
  const password = body.password ?? "";
  if (!verifyAdminPassword(password)) return NextResponse.json({ ok: false, message: "Invalid credentials" }, { status: 401 });
  let token: string;
  try {
    token = await signAdminSessionJwt();
  } catch {
    return NextResponse.json({ ok: false, message: "Server misconfigured" }, { status: 500 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: ADMIN_SESSION_MAX_AGE_SEC });
  revalidatePath("/admin");
  return res;
}
