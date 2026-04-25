import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { assets, placements } from "@/db/schema";
import { getDb } from "@/db/index";
import { isValidPlacementKey } from "@/lib/admin/placement-guard";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { placementKey?: string; assetId?: string; alt?: string };
  try {
    body = (await request.json()) as { placementKey?: string; assetId?: string; alt?: string };
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }
  const placementKey = body.placementKey ?? "";
  const assetId = body.assetId ?? "";
  const alt = (body.alt ?? "").trim();
  if (!placementKey || !isValidPlacementKey(placementKey)) return NextResponse.json({ ok: false, message: "Invalid placement key" }, { status: 400 });
  if (!assetId || !alt) return NextResponse.json({ ok: false, message: "assetId and alt required" }, { status: 400 });
  const db = getDb();
  const asset = db.select().from(assets).where(eq(assets.id, assetId)).get();
  if (!asset) return NextResponse.json({ ok: false, message: "Asset not found" }, { status: 404 });
  db.insert(placements).values({ placementKey, assetId, alt }).onConflictDoUpdate({ target: placements.placementKey, set: { assetId, alt } }).run();
  revalidateTag("media", "max");
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const placementKey = searchParams.get("placementKey");
  if (!placementKey || !isValidPlacementKey(placementKey)) return NextResponse.json({ ok: false, message: "Invalid placement key" }, { status: 400 });
  const db = getDb();
  db.delete(placements).where(eq(placements.placementKey, placementKey)).run();
  revalidateTag("media", "max");
  return NextResponse.json({ ok: true });
}
