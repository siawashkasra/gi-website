import "server-only";
import { randomUUID } from "crypto";
import { and, asc, eq, inArray } from "drizzle-orm";
import { getProjectBySlug } from "@/data/projects";
import { projectHeroSidebar, projectHeroSidebarI18n, projectHeroSidebarRowI18n, projectHeroSidebarRows } from "@/db/schema";
import { getDb } from "@/db/index";
import type { CmsLocale } from "@/lib/i18n/locales";
import { DEFAULT_RIBBON_LABELS, getRibbonItems } from "@/lib/project-ribbon";

function normalizeOptionalText(v: unknown): string | null {
  if (v == null) return null;
  const t = String(v).trim();
  return t === "" ? null : t;
}

export function fetchHeroSidebarConfig(projectSlug: string) {
  return getDb().select().from(projectHeroSidebar).where(eq(projectHeroSidebar.projectSlug, projectSlug)).get();
}

export function fetchHeroSidebarIntroI18n(projectSlug: string, locale: CmsLocale) {
  return getDb().select().from(projectHeroSidebarI18n).where(and(eq(projectHeroSidebarI18n.projectSlug, projectSlug), eq(projectHeroSidebarI18n.locale, locale))).get();
}

export function fetchHeroSidebarRows(projectSlug: string) {
  return getDb().select().from(projectHeroSidebarRows).where(eq(projectHeroSidebarRows.projectSlug, projectSlug)).orderBy(asc(projectHeroSidebarRows.sortOrder), asc(projectHeroSidebarRows.id)).all();
}

export function fetchHeroSidebarRowI18nForLocale(rowIds: string[], locale: CmsLocale) {
  if (!rowIds.length) return [];
  return getDb().select().from(projectHeroSidebarRowI18n).where(and(inArray(projectHeroSidebarRowI18n.rowId, rowIds), eq(projectHeroSidebarRowI18n.locale, locale))).all();
}

export function resolveIntroForLocale(projectSlug: string, locale: CmsLocale): { eyebrow: string | null; title: string | null; blurb: string | null } | null {
  const loc = fetchHeroSidebarIntroI18n(projectSlug, locale);
  if (loc && (loc.eyebrow || loc.title || loc.blurb)) return { eyebrow: loc.eyebrow, title: loc.title, blurb: loc.blurb };
  if (locale !== "en") {
    const en = fetchHeroSidebarIntroI18n(projectSlug, "en");
    if (en && (en.eyebrow || en.title || en.blurb)) return { eyebrow: en.eyebrow, title: en.title, blurb: en.blurb };
  }
  const legacy = fetchHeroSidebarConfig(projectSlug);
  if (legacy) return { eyebrow: legacy.eyebrow, title: legacy.title, blurb: legacy.blurb };
  return null;
}

export function ensureHeroSidebarRows(projectSlug: string) {
  const existing = fetchHeroSidebarRows(projectSlug);
  if (existing.length) return existing;
  const project = getProjectBySlug(projectSlug);
  if (!project) return [];
  const db = getDb();
  const defaults = getRibbonItems(project, DEFAULT_RIBBON_LABELS);
  defaults.forEach((r, i) => {
    const id = randomUUID();
    db.insert(projectHeroSidebarRows).values({ id, projectSlug, sortOrder: i, label: r.label, value: r.value }).run();
    db.insert(projectHeroSidebarRowI18n).values({ rowId: id, locale: "en", label: r.label, value: r.value }).run();
  });
  return fetchHeroSidebarRows(projectSlug);
}

export function resolveRowsForLocale(projectSlug: string, locale: CmsLocale): { rowKey: string; label: string; value: string }[] {
  const rows = fetchHeroSidebarRows(projectSlug);
  if (!rows.length) return [];
  const locMap = new Map(fetchHeroSidebarRowI18nForLocale(rows.map((r) => r.id), locale).map((t) => [t.rowId, t]));
  const enMap = locale === "en" ? locMap : new Map(fetchHeroSidebarRowI18nForLocale(rows.map((r) => r.id), "en").map((t) => [t.rowId, t]));
  return rows.map((r) => {
    const locTr = locMap.get(r.id);
    if (locTr) return { rowKey: r.id, label: locTr.label, value: locTr.value };
    const enTr = enMap.get(r.id);
    return { rowKey: r.id, label: enTr?.label ?? r.label, value: enTr?.value ?? r.value };
  });
}

export function saveHeroSidebarPayload(projectSlug: string, locale: CmsLocale, payload: { eyebrow: string | null; title: string | null; blurb: string | null; rows: { label: string; value: string }[] }) {
  const db = getDb();
  const eyebrow = normalizeOptionalText(payload.eyebrow);
  const title = normalizeOptionalText(payload.title);
  const blurb = normalizeOptionalText(payload.blurb);
  const hasIntro = eyebrow != null || title != null || blurb != null;
  if (payload.rows.length) ensureHeroSidebarRows(projectSlug);
  if (locale === "en") {
    if (hasIntro) {
      db.insert(projectHeroSidebar).values({ projectSlug, eyebrow, title, blurb }).onConflictDoUpdate({ target: projectHeroSidebar.projectSlug, set: { eyebrow, title, blurb } }).run();
    } else {
      db.delete(projectHeroSidebar).where(eq(projectHeroSidebar.projectSlug, projectSlug)).run();
    }
    const existing = fetchHeroSidebarRows(projectSlug);
    const keptIds = new Set<string>();
    payload.rows.forEach((r, i) => {
      const row = existing[i];
      if (row) {
        keptIds.add(row.id);
        db.update(projectHeroSidebarRows).set({ label: r.label, value: r.value, sortOrder: i }).where(eq(projectHeroSidebarRows.id, row.id)).run();
        db.insert(projectHeroSidebarRowI18n).values({ rowId: row.id, locale: "en", label: r.label, value: r.value }).onConflictDoUpdate({ target: [projectHeroSidebarRowI18n.rowId, projectHeroSidebarRowI18n.locale], set: { label: r.label, value: r.value } }).run();
      } else {
        const id = randomUUID();
        keptIds.add(id);
        db.insert(projectHeroSidebarRows).values({ id, projectSlug, sortOrder: i, label: r.label, value: r.value }).run();
        db.insert(projectHeroSidebarRowI18n).values({ rowId: id, locale: "en", label: r.label, value: r.value }).run();
      }
    });
    for (const row of existing) {
      if (!keptIds.has(row.id)) {
        db.delete(projectHeroSidebarRowI18n).where(eq(projectHeroSidebarRowI18n.rowId, row.id)).run();
        db.delete(projectHeroSidebarRows).where(eq(projectHeroSidebarRows.id, row.id)).run();
      }
    }
  } else {
    const existing = fetchHeroSidebarRows(projectSlug);
    payload.rows.forEach((r, i) => {
      const row = existing[i];
      if (!row) return;
      db.insert(projectHeroSidebarRowI18n).values({ rowId: row.id, locale, label: r.label, value: r.value }).onConflictDoUpdate({ target: [projectHeroSidebarRowI18n.rowId, projectHeroSidebarRowI18n.locale], set: { label: r.label, value: r.value } }).run();
    });
  }
  if (hasIntro) {
    db.insert(projectHeroSidebarI18n).values({ projectSlug, locale, eyebrow, title, blurb }).onConflictDoUpdate({ target: [projectHeroSidebarI18n.projectSlug, projectHeroSidebarI18n.locale], set: { eyebrow, title, blurb } }).run();
  } else {
    db.delete(projectHeroSidebarI18n).where(and(eq(projectHeroSidebarI18n.projectSlug, projectSlug), eq(projectHeroSidebarI18n.locale, locale))).run();
  }
}

export function parseHeroSidebarPutBody(body: unknown): { projectSlug: string; locale: CmsLocale; eyebrow: string | null; title: string | null; blurb: string | null; rows: { label: string; value: string }[] } | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const projectSlug = typeof o.projectSlug === "string" ? o.projectSlug.trim() : "";
  const localeRaw = typeof o.locale === "string" ? o.locale.trim() : "en";
  const locale = localeRaw === "fa-AF" || localeRaw === "ps" ? localeRaw : "en";
  if (!projectSlug) return null;
  const rowsRaw = o.rows;
  if (!Array.isArray(rowsRaw)) return null;
  const rows: { label: string; value: string }[] = [];
  for (const item of rowsRaw) {
    if (!item || typeof item !== "object") return null;
    const r = item as Record<string, unknown>;
    const label = typeof r.label === "string" ? r.label.trim() : "";
    const value = typeof r.value === "string" ? r.value.trim() : "";
    if (!label || !value) return null;
    rows.push({ label, value });
  }
  return { projectSlug, locale, eyebrow: normalizeOptionalText(o.eyebrow), title: normalizeOptionalText(o.title), blurb: normalizeOptionalText(o.blurb), rows };
}
