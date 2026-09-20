import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { asc, desc, eq } from "drizzle-orm";
import { projectListings } from "@/db/schema";
import { getDb } from "@/db/index";
import { getProjectRecord, projectSupportsUnitListings } from "@/lib/projects/project-source";
import { getListingLabelsByLocaleForAdmin } from "@/lib/media/admin-public-content";
import { clearFeaturedForProject, getNextSortOrder, isValidListingAvailability, isValidListingType, resolveAssetPublicPath, saveListingLabelTranslation } from "@/lib/media/project-listings-repo";
import type { CmsLocale } from "@/lib/i18n/locales";
import { requireAdminApi } from "@/lib/admin/require-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function revalidateProject(slug: string) {
  revalidatePath("/admin/projects");
  revalidatePath("/admin/units");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
}

export async function GET(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const url = new URL(request.url);
  const slug = url.searchParams.get("projectSlug");
  if (!slug) return NextResponse.json({ ok: false, message: "projectSlug required" }, { status: 400 });
  const db = getDb();
  const rows = db.select().from(projectListings).where(eq(projectListings.projectSlug, slug)).orderBy(desc(projectListings.featured), asc(projectListings.sortOrder), asc(projectListings.createdAt)).all();
  const listings = await Promise.all(
    rows.map(async (r) => {
      const labelsByLocale = await getListingLabelsByLocaleForAdmin(r.id, slug);
      return { ...r, label: labelsByLocale.en ?? r.label ?? null, labelsByLocale };
    }),
  );
  return NextResponse.json({ ok: true, listings });
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  let body: { projectSlug?: string; priceUsd?: number; sizeSqm?: number; type?: string; availability?: string; label?: string; labelsByLocale?: Partial<Record<CmsLocale, string>>; featured?: boolean; sortOrder?: number; assetId?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }
  const projectSlug = body.projectSlug ?? "";
  if (!projectSupportsUnitListings(projectSlug)) return NextResponse.json({ ok: false, message: "Unit listings are not enabled for this project" }, { status: 403 });
  if (!getProjectRecord(projectSlug, { includeUnpublished: true })) return NextResponse.json({ ok: false, message: "Unknown project" }, { status: 400 });
  const priceUsd = body.priceUsd;
  const sizeSqm = body.sizeSqm;
  if (typeof priceUsd !== "number" || !Number.isFinite(priceUsd) || priceUsd < 0 || !Number.isInteger(priceUsd)) return NextResponse.json({ ok: false, message: "Invalid priceUsd" }, { status: 400 });
  if (typeof sizeSqm !== "number" || !Number.isFinite(sizeSqm) || sizeSqm <= 0) return NextResponse.json({ ok: false, message: "Invalid sizeSqm" }, { status: 400 });
  const type = body.type ?? "";
  const availability = body.availability ?? "";
  if (!isValidListingType(type)) return NextResponse.json({ ok: false, message: "Invalid type" }, { status: 400 });
  if (!isValidListingAvailability(availability)) return NextResponse.json({ ok: false, message: "Invalid availability" }, { status: 400 });
  const assetId = body.assetId ?? "";
  const imagePath = resolveAssetPublicPath(assetId);
  if (!imagePath) return NextResponse.json({ ok: false, message: "Invalid assetId" }, { status: 400 });
  const featured = Boolean(body.featured);
  if (featured) clearFeaturedForProject(projectSlug);
  const sortOrder = typeof body.sortOrder === "number" && Number.isFinite(body.sortOrder) ? Math.floor(body.sortOrder) : getNextSortOrder(projectSlug);
  const id = randomUUID();
  const now = Date.now();
  const labelsByLocale = body.labelsByLocale ?? {};
  const enFromMap = (labelsByLocale.en ?? "").trim();
  const label = enFromMap || ((body.label ?? "").trim() || null);
  const db = getDb();
  db.insert(projectListings).values({ id, projectSlug, priceUsd, sizeSqm: String(sizeSqm), type, availability, imagePath, label, sortOrder, featured: featured ? 1 : 0, createdAt: now }).run();
  const locales: CmsLocale[] = ["en", "fa-AF", "ps"];
  for (const loc of locales) {
    const v = (labelsByLocale[loc] ?? (loc === "en" ? body.label : undefined) ?? "").trim();
    if (v) saveListingLabelTranslation(id, loc, v);
  }
  revalidateProject(projectSlug);
  return NextResponse.json({ ok: true, id });
}
