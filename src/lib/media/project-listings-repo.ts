import "server-only";
import { asc, desc, eq } from "drizzle-orm";
import { assets, projectListings } from "@/db/schema";
import { getDb } from "@/db/index";
import type { PropertyListing, PropertyListingAvailability, PropertyListingType } from "@/lib/property-listings";

const types = new Set<PropertyListingType>(["apartment", "shop"]);
const availabilities = new Set<PropertyListingAvailability>(["available", "reserved", "sold"]);

export function isValidListingType(v: string): v is PropertyListingType {
  return types.has(v as PropertyListingType);
}

export function isValidListingAvailability(v: string): v is PropertyListingAvailability {
  return availabilities.has(v as PropertyListingAvailability);
}

export function rowToPropertyListing(r: typeof projectListings.$inferSelect): PropertyListing {
  const size = Number.parseFloat(r.sizeSqm);
  return {
    id: r.id,
    priceUsd: r.priceUsd,
    sizeSqm: Number.isFinite(size) ? size : 0,
    type: r.type as PropertyListingType,
    availability: r.availability as PropertyListingAvailability,
    image: r.imagePath,
    label: r.label ?? undefined,
    featured: r.featured === 1,
  };
}

export function fetchProjectListingsFromDb(projectSlug: string): PropertyListing[] {
  const db = getDb();
  const rows = db.select().from(projectListings).where(eq(projectListings.projectSlug, projectSlug)).orderBy(desc(projectListings.featured), asc(projectListings.sortOrder), asc(projectListings.createdAt)).all();
  return rows.map(rowToPropertyListing);
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
