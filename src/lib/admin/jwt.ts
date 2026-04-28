import { SignJWT, jwtVerify } from "jose";
import { ADMIN_SESSION_MAX_AGE_SEC } from "@/lib/admin/session-cookie";

function getSecret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) throw new Error("SESSION_SECRET must be set (min 16 characters)");
  return new TextEncoder().encode(s);
}

export async function signAdminSessionJwt() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_MAX_AGE_SEC}s`)
    .sign(getSecret());
}

export async function verifyAdminSessionJwt(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  return payload.role === "admin";
}
