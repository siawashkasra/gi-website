import "server-only";
import { eq } from "drizzle-orm";
import { siteSettings } from "@/db/schema";
import { getDb } from "@/db/index";
import { mergeSiteSettingsWithBundled } from "@/lib/cms/bundled-cms-defaults";
import type { SiteSettingsPayload } from "@/lib/cms/apply-content-overlay";

const CONTACT_KEY = "contact";

export function getSiteSettingsPayload(): SiteSettingsPayload {
  const db = getDb();
  const row = db.select().from(siteSettings).where(eq(siteSettings.key, CONTACT_KEY)).get();
  const stored = row ? (JSON.parse(row.valueJson) as SiteSettingsPayload) : null;
  return mergeSiteSettingsWithBundled(stored);
}

export function saveSiteSettingsPayload(payload: SiteSettingsPayload) {
  const db = getDb();
  const now = Date.now();
  const valueJson = JSON.stringify(payload);
  const existing = db.select().from(siteSettings).where(eq(siteSettings.key, CONTACT_KEY)).get();
  if (existing) {
    db.update(siteSettings).set({ valueJson, updatedAt: now }).where(eq(siteSettings.key, CONTACT_KEY)).run();
  } else {
    db.insert(siteSettings).values({ key: CONTACT_KEY, valueJson, updatedAt: now }).run();
  }
}
