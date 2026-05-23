import "server-only";
import { count } from "drizzle-orm";
import { assets, placements, projectListings } from "@/db/schema";
import { getDb } from "@/db/index";
import { projects } from "@/data/projects";

export function fetchDashboardStats() {
  const db = getDb();
  const listings = db.select({ c: count() }).from(projectListings).get()?.c ?? 0;
  const customPlacements = db.select({ c: count() }).from(placements).get()?.c ?? 0;
  const assetCount = db.select({ c: count() }).from(assets).get()?.c ?? 0;
  return { projectsCount: projects.length, listingsCount: listings, customPlacementsCount: customPlacements, assetCount };
}
