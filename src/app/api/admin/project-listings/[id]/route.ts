import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { projectListings } from "@/db/schema";
import { getDb } from "@/db/index";
import { clearFeaturedForProject, isValidListingAvailability, isValidListingType, resolveAssetPublicPath } from "@/lib/media/project-listings-repo";
import { isUnitListingAdminProject } from "@/lib/media/unit-listing-projects";

export const runtime = "nodejs";

function revalidateProject(slug: string) {
  revalidatePath("/admin/projects");
  revalidatePath("/admin/units");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
}

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const db = getDb();
  const row = db.select().from(projectListings).where(eq(projectListings.id, id)).get();
  if (!row) return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
  if (!isUnitListingAdminProject(row.projectSlug)) return NextResponse.json({ ok: false, message: "Forbidden" }, { status: 403 });
  let body: { priceUsd?: number; sizeSqm?: number; type?: string; availability?: string; label?: string | null; featured?: boolean; sortOrder?: number; assetId?: string | null };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }
  const patch: Partial<typeof row> = {};
  if (body.priceUsd !== undefined) {
    if (typeof body.priceUsd !== "number" || !Number.isFinite(body.priceUsd) || body.priceUsd < 0 || !Number.isInteger(body.priceUsd)) return NextResponse.json({ ok: false, message: "Invalid priceUsd" }, { status: 400 });
    patch.priceUsd = body.priceUsd;
  }
  if (body.sizeSqm !== undefined) {
    if (typeof body.sizeSqm !== "number" || !Number.isFinite(body.sizeSqm) || body.sizeSqm <= 0) return NextResponse.json({ ok: false, message: "Invalid sizeSqm" }, { status: 400 });
    patch.sizeSqm = String(body.sizeSqm);
  }
  if (body.type !== undefined) {
    if (!isValidListingType(body.type)) return NextResponse.json({ ok: false, message: "Invalid type" }, { status: 400 });
    patch.type = body.type;
  }
  if (body.availability !== undefined) {
    if (!isValidListingAvailability(body.availability)) return NextResponse.json({ ok: false, message: "Invalid availability" }, { status: 400 });
    patch.availability = body.availability;
  }
  if (body.label !== undefined) patch.label = body.label === null || body.label === "" ? null : String(body.label).trim();
  if (body.sortOrder !== undefined) {
    if (typeof body.sortOrder !== "number" || !Number.isFinite(body.sortOrder)) return NextResponse.json({ ok: false, message: "Invalid sortOrder" }, { status: 400 });
    patch.sortOrder = Math.floor(body.sortOrder);
  }
  if (body.assetId !== undefined && body.assetId !== null && body.assetId !== "") {
    const path = resolveAssetPublicPath(body.assetId);
    if (!path) return NextResponse.json({ ok: false, message: "Invalid assetId" }, { status: 400 });
    patch.imagePath = path;
  }
  if (body.featured !== undefined) {
    if (body.featured) clearFeaturedForProject(row.projectSlug);
    patch.featured = body.featured ? 1 : 0;
  }
  if (Object.keys(patch).length === 0) return NextResponse.json({ ok: false, message: "No changes" }, { status: 400 });
  db.update(projectListings).set(patch).where(eq(projectListings.id, id)).run();
  revalidateProject(row.projectSlug);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const db = getDb();
  const row = db.select().from(projectListings).where(eq(projectListings.id, id)).get();
  if (!row) return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
  if (!isUnitListingAdminProject(row.projectSlug)) return NextResponse.json({ ok: false, message: "Forbidden" }, { status: 403 });
  db.delete(projectListings).where(eq(projectListings.id, id)).run();
  revalidateProject(row.projectSlug);
  return NextResponse.json({ ok: true });
}
