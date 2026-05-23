import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { assets, placements } from "@/db/schema";
import { getDb } from "@/db/index";
import { requireAdminApi } from "@/lib/admin/require-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml"]);
const MAX_BYTES = 8 * 1024 * 1024;
const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/svg+xml": "svg" };

export async function POST(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ ok: false, message: "Missing file" }, { status: 400 });
  const mime = file.type || "application/octet-stream";
  if (!ALLOWED.has(mime)) return NextResponse.json({ ok: false, message: "Invalid file type" }, { status: 400 });
  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length > MAX_BYTES) return NextResponse.json({ ok: false, message: "File too large" }, { status: 400 });
  const ext = EXT[mime] ?? "bin";
  const id = randomUUID();
  const name = `${id}.${ext}`;
  const publicPath = `/uploads/${name}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, name), buf);
  const db = getDb();
  const now = Date.now();
  db.insert(assets).values({ id, publicPath, mimeType: mime, byteSize: buf.length, createdAt: now }).run();
  revalidateTag("media", "max");
  return NextResponse.json({ ok: true, id, publicPath });
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, message: "Missing id" }, { status: 400 });
  const db = getDb();
  const row = db.select().from(assets).where(eq(assets.id, id)).get();
  if (!row) return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
  const used = db.select().from(placements).where(eq(placements.assetId, id)).get();
  if (used) return NextResponse.json({ ok: false, message: "Asset is assigned to a placement. Clear the placement first.", code: "IN_USE" }, { status: 409 });
  db.delete(assets).where(eq(assets.id, id)).run();
  try {
    await unlink(path.join(process.cwd(), "public", row.publicPath.replace(/^\//, "")));
  } catch {
    /* ignore */
  }
  revalidateTag("media", "max");
  return NextResponse.json({ ok: true });
}
