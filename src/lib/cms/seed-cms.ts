import "server-only";
import type BetterSqlite3 from "better-sqlite3";
import en from "../../../messages/en.json";
import faAF from "../../../messages/fa-AF.json";
import ps from "../../../messages/ps.json";
import { projects } from "@/data/projects";
import { getBundledSiteSettingsDefaults } from "@/lib/cms/bundled-cms-defaults";
import type { SiteSettingsPayload } from "@/lib/cms/apply-content-overlay";
import type { CmsLocale } from "@/lib/i18n/locales";

type Sqlite = BetterSqlite3.Database;

const locales = ["en", "fa-AF", "ps"] as const;
const messagesByLocale = { en, "fa-AF": faAF, ps } as const;

function cmsSource(locale: CmsLocale) {
  return messagesByLocale[locale] as Record<string, unknown>;
}

export function seedCmsTablesIfEmpty(sqlite: Sqlite) {
  seedSiteSettingsIfEmpty(sqlite);
  seedContentDocumentsIfEmpty(sqlite);
  seedProjectFeaturedIfEmpty(sqlite);
}

function seedSiteSettingsIfEmpty(sqlite: Sqlite) {
  const row = sqlite.prepare("SELECT key FROM site_settings WHERE key = ?").get("contact");
  if (row) return;
  const payload: SiteSettingsPayload = getBundledSiteSettingsDefaults();
  sqlite.prepare("INSERT INTO site_settings (key, value_json, updated_at) VALUES (?, ?, ?)").run("contact", JSON.stringify(payload), Date.now());
}

function seedContentDocumentsIfEmpty(sqlite: Sqlite) {
  const count = sqlite.prepare("SELECT COUNT(*) as c FROM content_documents").get() as { c: number };
  if (count.c > 0) return;
  const insert = sqlite.prepare(
    "INSERT INTO content_documents (entity_type, entity_key, locale, payload_json, published, updated_at) VALUES (?, ?, ?, ?, 1, ?)",
  );
  const now = Date.now();
  for (const locale of locales) {
    const data = cmsSource(locale);
    if (data.companyProfile) insert.run("companyProfile", "default", locale, JSON.stringify(data.companyProfile), now);
    if (data.homePremium) insert.run("homePremium", "default", locale, JSON.stringify(data.homePremium), now);
    if (data.team) insert.run("team", "all", locale, JSON.stringify(data.team), now);
    if (data.jobs) insert.run("jobs", "default", locale, JSON.stringify(data.jobs), now);
    const companies = data.companiesData as { slug: string }[] | undefined;
    if (Array.isArray(companies)) {
      for (const c of companies) {
        const { slug, ...rest } = c as { slug: string };
        insert.run("company", slug, locale, JSON.stringify(rest), now);
      }
    }
    const pd = data.projectsData as { projectTypeLabels?: Record<string, string>; projects?: Record<string, Record<string, unknown>> } | undefined;
    if (pd?.projectTypeLabels) insert.run("projectsData", "labels", locale, JSON.stringify({ projectTypeLabels: pd.projectTypeLabels }), now);
    if (pd?.projects) {
      for (const [slug, p] of Object.entries(pd.projects)) {
        const copy = { ...p };
        delete copy.slug;
        insert.run("project", slug, locale, JSON.stringify(copy), now);
      }
    }
  }
}

function seedProjectFeaturedIfEmpty(sqlite: Sqlite) {
  const count = sqlite.prepare("SELECT COUNT(*) as c FROM project_featured").get() as { c: number };
  if (count.c > 0) return;
  const insert = sqlite.prepare("INSERT INTO project_featured (project_slug, featured, updated_at) VALUES (?, ?, ?)");
  const now = Date.now();
  for (const p of projects) insert.run(p.slug, p.featured ? 1 : 0, now);
}
