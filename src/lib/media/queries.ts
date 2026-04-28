import "server-only";
import { desc, eq } from "drizzle-orm";
import { assets, placements } from "@/db/schema";
import { getDb } from "@/db/index";

export type ResolvedPlacement = { publicPath: string; alt: string };

export function fetchPlacementMap(): Map<string, ResolvedPlacement> {
  const db = getDb();
  const rows = db
    .select({ key: placements.placementKey, path: assets.publicPath, alt: placements.alt })
    .from(placements)
    .innerJoin(assets, eq(placements.assetId, assets.id))
    .all();
  const map = new Map<string, ResolvedPlacement>();
  for (const r of rows) map.set(r.key, { publicPath: r.path, alt: r.alt });
  return map;
}

export function fetchRecentAssets(limit: number) {
  const db = getDb();
  return db.select().from(assets).orderBy(desc(assets.createdAt)).limit(limit).all();
}
