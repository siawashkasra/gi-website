import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

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

export const projectHeroSidebar = sqliteTable("project_hero_sidebar", {
  projectSlug: text("project_slug").primaryKey(),
  eyebrow: text("eyebrow"),
  title: text("title"),
  blurb: text("blurb"),
});

export const projectHeroSidebarRows = sqliteTable("project_hero_sidebar_rows", {
  id: text("id").primaryKey(),
  projectSlug: text("project_slug").notNull(),
  sortOrder: integer("sort_order", { mode: "number" }).notNull().default(0),
  label: text("label").notNull(),
  value: text("value").notNull(),
});

export const projectHeroSidebarI18n = sqliteTable(
  "project_hero_sidebar_i18n",
  {
    projectSlug: text("project_slug").notNull(),
    locale: text("locale").notNull(),
    eyebrow: text("eyebrow"),
    title: text("title"),
    blurb: text("blurb"),
  },
  (t) => [primaryKey({ columns: [t.projectSlug, t.locale] })],
);

export const projectHeroSidebarRowI18n = sqliteTable(
  "project_hero_sidebar_row_i18n",
  {
    rowId: text("row_id").notNull(),
    locale: text("locale").notNull(),
    label: text("label").notNull(),
    value: text("value").notNull(),
  },
  (t) => [primaryKey({ columns: [t.rowId, t.locale] })],
);

export const projectListingTranslations = sqliteTable(
  "project_listing_translations",
  {
    listingId: text("listing_id").notNull(),
    locale: text("locale").notNull(),
    label: text("label"),
  },
  (t) => [primaryKey({ columns: [t.listingId, t.locale] })],
);

export const jobPostings = sqliteTable("job_postings", {
  id: text("id").primaryKey(),
  sortOrder: integer("sort_order", { mode: "number" }).notNull().default(0),
  published: integer("published", { mode: "number" }).notNull().default(1),
  createdAt: integer("created_at", { mode: "number" }).notNull(),
});

export const jobPostingTranslations = sqliteTable(
  "job_posting_translations",
  {
    jobId: text("job_id").notNull().references(() => jobPostings.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    title: text("title").notNull(),
    dateLabel: text("date_label").notNull(),
    location: text("location").notNull(),
    summary: text("summary").notNull(),
    department: text("department"),
    ctaLabel: text("cta_label"),
    ctaHref: text("cta_href"),
  },
  (t) => [primaryKey({ columns: [t.jobId, t.locale] })],
);

export type AssetRow = typeof assets.$inferSelect;
export type PlacementRow = typeof placements.$inferSelect;
export type ProjectListingRow = typeof projectListings.$inferSelect;
export type ProjectHeroSidebarRow = typeof projectHeroSidebar.$inferSelect;
export type ProjectHeroSidebarMetricRow = typeof projectHeroSidebarRows.$inferSelect;
export type ProjectHeroSidebarI18nRow = typeof projectHeroSidebarI18n.$inferSelect;
export type ProjectHeroSidebarRowI18nRow = typeof projectHeroSidebarRowI18n.$inferSelect;
export type ProjectListingTranslationRow = typeof projectListingTranslations.$inferSelect;
export type JobPostingRow = typeof jobPostings.$inferSelect;
export type JobPostingTranslationRow = typeof jobPostingTranslations.$inferSelect;

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  valueJson: text("value_json").notNull(),
  updatedAt: integer("updated_at", { mode: "number" }).notNull(),
});

export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  sortOrder: integer("sort_order", { mode: "number" }).notNull().default(0),
  published: integer("published", { mode: "number" }).notNull().default(1),
  imageAssetId: text("image_asset_id").references(() => assets.id, { onDelete: "set null" }),
  createdAt: integer("created_at", { mode: "number" }).notNull(),
});

export const eventTranslations = sqliteTable(
  "event_translations",
  {
    eventId: text("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    title: text("title").notNull(),
    dateLabel: text("date_label").notNull(),
    location: text("location").notNull(),
    summary: text("summary").notNull(),
    ctaLabel: text("cta_label"),
    ctaHref: text("cta_href"),
  },
  (t) => [primaryKey({ columns: [t.eventId, t.locale] })],
);

export const contentDocuments = sqliteTable(
  "content_documents",
  {
    entityType: text("entity_type").notNull(),
    entityKey: text("entity_key").notNull(),
    locale: text("locale").notNull(),
    payloadJson: text("payload_json").notNull(),
    published: integer("published", { mode: "number" }).notNull().default(1),
    updatedAt: integer("updated_at", { mode: "number" }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.entityType, t.entityKey, t.locale] })],
);

export const projectFeatured = sqliteTable("project_featured", {
  projectSlug: text("project_slug").primaryKey(),
  featured: integer("featured", { mode: "number" }).notNull().default(0),
  updatedAt: integer("updated_at", { mode: "number" }).notNull(),
});

export type SiteSettingsRow = typeof siteSettings.$inferSelect;
export type EventRow = typeof events.$inferSelect;
export type EventTranslationRow = typeof eventTranslations.$inferSelect;
export type ContentDocumentRow = typeof contentDocuments.$inferSelect;
export type ProjectFeaturedRow = typeof projectFeatured.$inferSelect;
