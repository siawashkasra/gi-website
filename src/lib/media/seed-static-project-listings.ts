import BetterSqlite3 from "better-sqlite3";
import { getProjectBySlug } from "@/data/projects";
import { UNIT_LISTING_PROJECT_SLUGS } from "@/lib/media/unit-listing-projects";

type SqliteConnection = InstanceType<typeof BetterSqlite3>;

export function seedStaticProjectListingsFromData(sqlite: SqliteConnection) {
  const insert = sqlite.prepare(
    "INSERT OR IGNORE INTO project_listings (id, project_slug, price_usd, size_sqm, type, availability, image_path, label, sort_order, featured, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  );
  const now = Date.now();
  for (const slug of UNIT_LISTING_PROJECT_SLUGS) {
    const p = getProjectBySlug(slug);
    if (!p?.listings?.length) continue;
    for (let i = 0; i < p.listings.length; i++) {
      const l = p.listings[i];
      insert.run(l.id, slug, l.priceUsd, String(l.sizeSqm), l.type, l.availability, l.image, l.label ?? null, i, 0, now);
    }
  }
}
