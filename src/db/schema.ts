import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
