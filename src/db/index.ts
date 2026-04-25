import "server-only";
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@/db/schema";

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
  `);
  sqlite.close();
}
