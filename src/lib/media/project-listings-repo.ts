import "server-only";
import { and, asc, desc, eq } from "drizzle-orm";
import { assets, projectListingTranslations, projectListings } from "@/db/schema";
import { getDb } from "@/db/index";
import type { PropertyListing, PropertyListingAvailability, PropertyListingType } from "@/lib/property-listings";
import type { CmsLocale } from "@/lib/i18n/locales";

const types = new Set<PropertyListingType>(["apartment", "shop"]);
const availabilities = new Set<PropertyListingAvailability>(["available", "reserved", "sold"]);

export function isValidListingType(v: string): v is PropertyListingType {
  return types.has(v as PropertyListingType);
}

export function isValidListingAvailability(v: string): v is PropertyListingAvailability {
  return availabilities.has(v as PropertyListingAvailability);
}

function resolveListingLabel(listingId: string, locale: CmsLocale, fallback: string | null): string | undefined {
  const db = getDb();
  const loc = db.select().from(projectListingTranslations).where(and(eq(projectListingTranslations.listingId, listingId), eq(projectListingTranslations.locale, locale))).get();
  if (loc?.label?.trim()) return loc.label.trim();
  if (locale !== "en") {
    const en = db.select().from(projectListingTranslations).where(and(eq(projectListingTranslations.listingId, listingId), eq(projectListingTranslations.locale, "en"))).get();
    if (en?.label?.trim()) return en.label.trim();
  }
  if (fallback?.trim()) return fallback.trim();
  return undefined;
}

export function rowToPropertyListing(r: typeof projectListings.$inferSelect, locale: CmsLocale = "en"): PropertyListing {
  const size = Number.parseFloat(r.sizeSqm);
  return {
    id: r.id,
    priceUsd: r.priceUsd,
    sizeSqm: Number.isFinite(size) ? size : 0,
    type: r.type as PropertyListingType,
    availability: r.availability as PropertyListingAvailability,
    image: r.imagePath,
    label: resolveListingLabel(r.id, locale, r.label),
    featured: r.featured === 1,
  };
}

export function getListingLabelsByLocale(listingId: string): Partial<Record<CmsLocale, string>> {
  const db = getDb();
  const rows = db.select().from(projectListingTranslations).where(eq(projectListingTranslations.listingId, listingId)).all();
  const out: Partial<Record<CmsLocale, string>> = {};
  for (const t of rows) {
    if (t.label?.trim()) out[t.locale as CmsLocale] = t.label.trim();
  }
  const base = db.select({ label: projectListings.label }).from(projectListings).where(eq(projectListings.id, listingId)).get();
  if (base?.label?.trim() && !out.en) out.en = base.label.trim();
  return out;
}

export function saveListingLabelTranslation(listingId: string, locale: CmsLocale, label: string | null) {
  const db = getDb();
  const trimmed = label?.trim() ?? "";
  if (!trimmed) {
    db.delete(projectListingTranslations).where(and(eq(projectListingTranslations.listingId, listingId), eq(projectListingTranslations.locale, locale))).run();
    if (locale === "en") db.update(projectListings).set({ label: null }).where(eq(projectListings.id, listingId)).run();
    return;
  }
  db.insert(projectListingTranslations).values({ listingId, locale, label: trimmed }).onConflictDoUpdate({ target: [projectListingTranslations.listingId, projectListingTranslations.locale], set: { label: trimmed } }).run();
  if (locale === "en") db.update(projectListings).set({ label: trimmed }).where(eq(projectListings.id, listingId)).run();
}

export function fetchProjectListingsFromDb(projectSlug: string, locale: CmsLocale = "en"): PropertyListing[] {
  const db = getDb();
  const rows = db.select().from(projectListings).where(eq(projectListings.projectSlug, projectSlug)).orderBy(desc(projectListings.featured), asc(projectListings.sortOrder), asc(projectListings.createdAt)).all();
  return rows.map((r) => rowToPropertyListing(r, locale));
}

export function fetchProjectListingRows(projectSlug: string) {
  const db = getDb();
  return db.select().from(projectListings).where(eq(projectListings.projectSlug, projectSlug)).orderBy(desc(projectListings.featured), asc(projectListings.sortOrder), asc(projectListings.createdAt)).all();
}

export function getNextSortOrder(projectSlug: string): number {
  const db = getDb();
  const row = db.select({ m: projectListings.sortOrder }).from(projectListings).where(eq(projectListings.projectSlug, projectSlug)).orderBy(desc(projectListings.sortOrder)).limit(1).get();
  return (row?.m ?? -1) + 1;
}

export function clearFeaturedForProject(projectSlug: string) {
  const db = getDb();
  db.update(projectListings).set({ featured: 0 }).where(eq(projectListings.projectSlug, projectSlug)).run();
}

export function resolveAssetPublicPath(assetId: string): string | null {
  const db = getDb();
  const row = db.select({ path: assets.publicPath }).from(assets).where(eq(assets.id, assetId)).get();
  return row?.path ?? null;
}
