import { readFile, stat } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const uploadDir = path.join(process.cwd(), "public", "uploads");
const mimeByExt: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml" };
const safeUploadName = /^[a-f0-9-]+\.(jpg|jpeg|png|webp|svg)$/i;

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const segments = (await params).path;
  const name = path.basename(segments.join("/"));
  if (!segments.length || !safeUploadName.test(name)) return new NextResponse(null, { status: 404 });
  const filePath = path.join(uploadDir, name);
  if (!filePath.startsWith(uploadDir)) return new NextResponse(null, { status: 400 });
  try {
    const info = await stat(filePath);
    if (!info.isFile()) return new NextResponse(null, { status: 404 });
    const buf = await readFile(filePath);
    const ext = path.extname(name).toLowerCase();
    return new NextResponse(buf, { headers: { "Content-Type": mimeByExt[ext] ?? "application/octet-stream", "Cache-Control": "public, max-age=31536000, immutable" } });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
