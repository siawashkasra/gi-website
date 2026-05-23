import "server-only";
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@/db/schema";
import { repairCorruptedContentDocumentsSqlite } from "@/lib/cms/repair-cms-documents";
import { seedCmsTablesIfEmpty } from "@/lib/cms/seed-cms";
import { seedStaticProjectListingsFromData } from "@/lib/media/seed-static-project-listings";

function resolveDbFilePath() {
  const url = process.env.SQLITE_URL;
  if (url?.startsWith("file:")) return url.slice("file:".length);
  return path.join(process.cwd(), "data", "site-media.db");
}

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;
let _sqlite: Database.Database | null = null;
let _migrated = false;

export function getDb() {
  if (_db) return _db;
  if (!_migrated) {
    runMigrationsIfNeeded();
    _migrated = true;
  }
  const filePath = resolveDbFilePath();
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  _sqlite = new Database(filePath);
  _sqlite.pragma("journal_mode = WAL");
  _sqlite.pragma("foreign_keys = ON");
  _db = drizzle(_sqlite, { schema });
  return _db;
}

function migrateHeroSidebarToI18n(sqlite: Database.Database) {
  const configs = sqlite.prepare("SELECT project_slug, eyebrow, title, blurb FROM project_hero_sidebar").all() as { project_slug: string; eyebrow: string | null; title: string | null; blurb: string | null }[];
  const insertIntro = sqlite.prepare("INSERT OR IGNORE INTO project_hero_sidebar_i18n (project_slug, locale, eyebrow, title, blurb) VALUES (?, 'en', ?, ?, ?)");
  for (const c of configs) insertIntro.run(c.project_slug, c.eyebrow, c.title, c.blurb);
  const rows = sqlite.prepare("SELECT id, label, value FROM project_hero_sidebar_rows").all() as { id: string; label: string; value: string }[];
  const insertRow = sqlite.prepare("INSERT OR IGNORE INTO project_hero_sidebar_row_i18n (row_id, locale, label, value) VALUES (?, 'en', ?, ?)");
  for (const r of rows) insertRow.run(r.id, r.label, r.value);
}

function migrateListingLabelsToI18n(sqlite: Database.Database) {
  const rows = sqlite.prepare("SELECT id, label FROM project_listings WHERE label IS NOT NULL AND trim(label) != ''").all() as { id: string; label: string }[];
  const insert = sqlite.prepare("INSERT OR IGNORE INTO project_listing_translations (listing_id, locale, label) VALUES (?, 'en', ?)");
  for (const r of rows) insert.run(r.id, r.label);
}

export function runMigrationsIfNeeded() {
  const filePath = resolveDbFilePath();
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const sqlite = new Database(filePath);
  sqlite.pragma("foreign_keys = ON");
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS \`assets\` (
      \`id\` text PRIMARY KEY NOT NULL,
      \`public_path\` text NOT NULL,
      \`mime_type\` text NOT NULL,
      \`byte_size\` integer NOT NULL,
      \`created_at\` integer NOT NULL
    );
    CREATE TABLE IF NOT EXISTS \`placements\` (
      \`placement_key\` text PRIMARY KEY NOT NULL,
      \`asset_id\` text REFERENCES assets(id) ON DELETE CASCADE,
      \`alt\` text NOT NULL
    );
    CREATE TABLE IF NOT EXISTS \`project_listings\` (
      \`id\` text PRIMARY KEY NOT NULL,
      \`project_slug\` text NOT NULL,
      \`price_usd\` integer NOT NULL,
      \`size_sqm\` text NOT NULL,
      \`type\` text NOT NULL,
      \`availability\` text NOT NULL,
      \`image_path\` text NOT NULL,
      \`label\` text,
      \`sort_order\` integer NOT NULL DEFAULT 0,
      \`featured\` integer NOT NULL DEFAULT 0,
      \`created_at\` integer NOT NULL
    );
    CREATE INDEX IF NOT EXISTS project_listings_slug_idx ON project_listings(project_slug);
    CREATE TABLE IF NOT EXISTS \`project_hero_sidebar\` (
      \`project_slug\` text PRIMARY KEY NOT NULL,
      \`eyebrow\` text,
      \`title\` text,
      \`blurb\` text
    );
    CREATE TABLE IF NOT EXISTS \`project_hero_sidebar_rows\` (
      \`id\` text PRIMARY KEY NOT NULL,
      \`project_slug\` text NOT NULL,
      \`sort_order\` integer NOT NULL DEFAULT 0,
      \`label\` text NOT NULL,
      \`value\` text NOT NULL
    );
    CREATE INDEX IF NOT EXISTS project_hero_sidebar_rows_slug_idx ON project_hero_sidebar_rows(project_slug);
    CREATE TABLE IF NOT EXISTS \`site_settings\` (
      \`key\` text PRIMARY KEY NOT NULL,
      \`value_json\` text NOT NULL,
      \`updated_at\` integer NOT NULL
    );
    CREATE TABLE IF NOT EXISTS \`events\` (
      \`id\` text PRIMARY KEY NOT NULL,
      \`sort_order\` integer NOT NULL DEFAULT 0,
      \`published\` integer NOT NULL DEFAULT 1,
      \`image_asset_id\` text REFERENCES assets(id) ON DELETE SET NULL,
      \`created_at\` integer NOT NULL
    );
    CREATE TABLE IF NOT EXISTS \`event_translations\` (
      \`event_id\` text NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      \`locale\` text NOT NULL,
      \`title\` text NOT NULL,
      \`date_label\` text NOT NULL,
      \`location\` text NOT NULL,
      \`summary\` text NOT NULL,
      \`cta_label\` text,
      \`cta_href\` text,
      PRIMARY KEY (\`event_id\`, \`locale\`)
    );
    CREATE TABLE IF NOT EXISTS \`content_documents\` (
      \`entity_type\` text NOT NULL,
      \`entity_key\` text NOT NULL,
      \`locale\` text NOT NULL,
      \`payload_json\` text NOT NULL,
      \`published\` integer NOT NULL DEFAULT 1,
      \`updated_at\` integer NOT NULL,
      PRIMARY KEY (\`entity_type\`, \`entity_key\`, \`locale\`)
    );
    CREATE TABLE IF NOT EXISTS \`project_featured\` (
      \`project_slug\` text PRIMARY KEY NOT NULL,
      \`featured\` integer NOT NULL DEFAULT 0,
      \`updated_at\` integer NOT NULL
    );
    CREATE TABLE IF NOT EXISTS \`project_hero_sidebar_i18n\` (
      \`project_slug\` text NOT NULL,
      \`locale\` text NOT NULL,
      \`eyebrow\` text,
      \`title\` text,
      \`blurb\` text,
      PRIMARY KEY (\`project_slug\`, \`locale\`)
    );
    CREATE TABLE IF NOT EXISTS \`project_hero_sidebar_row_i18n\` (
      \`row_id\` text NOT NULL,
      \`locale\` text NOT NULL,
      \`label\` text NOT NULL,
      \`value\` text NOT NULL,
      PRIMARY KEY (\`row_id\`, \`locale\`)
    );
    CREATE TABLE IF NOT EXISTS \`project_listing_translations\` (
      \`listing_id\` text NOT NULL,
      \`locale\` text NOT NULL,
      \`label\` text,
      PRIMARY KEY (\`listing_id\`, \`locale\`)
    );
    CREATE TABLE IF NOT EXISTS \`job_postings\` (
      \`id\` text PRIMARY KEY NOT NULL,
      \`sort_order\` integer NOT NULL DEFAULT 0,
      \`published\` integer NOT NULL DEFAULT 1,
      \`created_at\` integer NOT NULL
    );
    CREATE TABLE IF NOT EXISTS \`job_posting_translations\` (
      \`job_id\` text NOT NULL REFERENCES job_postings(id) ON DELETE CASCADE,
      \`locale\` text NOT NULL,
      \`title\` text NOT NULL,
      \`date_label\` text NOT NULL,
      \`location\` text NOT NULL,
      \`summary\` text NOT NULL,
      \`department\` text,
      \`cta_label\` text,
      \`cta_href\` text,
      PRIMARY KEY (\`job_id\`, \`locale\`)
    );
  `);
  migrateHeroSidebarToI18n(sqlite);
  migrateListingLabelsToI18n(sqlite);
  seedStaticProjectListingsFromData(sqlite);
  seedCmsTablesIfEmpty(sqlite);
  repairCorruptedContentDocumentsSqlite(sqlite);
  sqlite.close();
}
