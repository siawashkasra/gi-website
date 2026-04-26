import "server-only";
import { randomUUID } from "crypto";
import { asc, eq } from "drizzle-orm";
import { projectHeroSidebar, projectHeroSidebarRows } from "@/db/schema";
import { getDb } from "@/db/index";

function normalizeOptionalText(v: unknown): string | null {
  if (v == null) return null;
  const t = String(v).trim();
  return t === "" ? null : t;
}

export function fetchHeroSidebarConfig(projectSlug: string) {
  return getDb().select().from(projectHeroSidebar).where(eq(projectHeroSidebar.projectSlug, projectSlug)).get();
}

export function fetchHeroSidebarRows(projectSlug: string) {
  return getDb().select().from(projectHeroSidebarRows).where(eq(projectHeroSidebarRows.projectSlug, projectSlug)).orderBy(asc(projectHeroSidebarRows.sortOrder), asc(projectHeroSidebarRows.id)).all();
}

export function saveHeroSidebarPayload(projectSlug: string, payload: { eyebrow: string | null; title: string | null; blurb: string | null; rows: { label: string; value: string }[] }) {
  const db = getDb();
  const eyebrow = normalizeOptionalText(payload.eyebrow);
  const title = normalizeOptionalText(payload.title);
  const blurb = normalizeOptionalText(payload.blurb);
  const hasIntro = eyebrow != null || title != null || blurb != null;
  db.delete(projectHeroSidebarRows).where(eq(projectHeroSidebarRows.projectSlug, projectSlug)).run();
  if (hasIntro) {
    db.insert(projectHeroSidebar).values({ projectSlug, eyebrow, title, blurb }).onConflictDoUpdate({ target: projectHeroSidebar.projectSlug, set: { eyebrow, title, blurb } }).run();
  } else {
    db.delete(projectHeroSidebar).where(eq(projectHeroSidebar.projectSlug, projectSlug)).run();
  }
  payload.rows.forEach((r, i) => {
    db.insert(projectHeroSidebarRows).values({ id: randomUUID(), projectSlug, sortOrder: i, label: r.label, value: r.value }).run();
  });
}

export function parseHeroSidebarPutBody(body: unknown): { projectSlug: string; eyebrow: string | null; title: string | null; blurb: string | null; rows: { label: string; value: string }[] } | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const projectSlug = typeof o.projectSlug === "string" ? o.projectSlug.trim() : "";
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
  return { projectSlug, eyebrow: normalizeOptionalText(o.eyebrow), title: normalizeOptionalText(o.title), blurb: normalizeOptionalText(o.blurb), rows };
}
