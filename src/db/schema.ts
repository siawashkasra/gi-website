import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projectListings = sqliteTable("project_listings", {
  id: text("id").primaryKey(),
  projectSlug: text("project_slug").notNull(),
  priceUsd: integer("price_usd").notNull(),
  sizeSqm: text("size_sqm").notNull(),
  type: text("type").notNull(),
  availability: text("availability").notNull(),
  imagePath: text("image_path").notNull(),
  label: text("label"),
  sortOrder: integer("sort_order", { mode: "number" }).notNull().default(0),
  featured: integer("featured", { mode: "number" }).notNull().default(0),
  createdAt: integer("created_at", { mode: "number" }).notNull(),
});

export const assets = sqliteTable("assets", {
  id: text("id").primaryKey(),
  publicPath: text("public_path").notNull(),
  mimeType: text("mime_type").notNull(),
  byteSize: integer("byte_size").notNull(),
  createdAt: integer("created_at", { mode: "number" }).notNull(),
});

export const placements = sqliteTable("placements", {
  placementKey: text("placement_key").primaryKey(),
  assetId: text("asset_id").references(() => assets.id, { onDelete: "cascade" }),
  alt: text("alt").notNull(),
});

export type AssetRow = typeof assets.$inferSelect;
export type PlacementRow = typeof placements.$inferSelect;
export type ProjectListingRow = typeof projectListings.$inferSelect;
