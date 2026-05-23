import "server-only";
import { and, asc, eq } from "drizzle-orm";
import { eventTranslations, events } from "@/db/schema";
import { getDb } from "@/db/index";
import type { EventListItem } from "@/data/events";
import type { CmsLocale } from "@/lib/cms/apply-content-overlay";

export type AdminEventRow = {
  id: string;
  sortOrder: number;
  published: number;
  imageAssetId: string | null;
  createdAt: number;
  translations: { locale: string; title: string; dateLabel: string; location: string; summary: string; ctaLabel: string | null; ctaHref: string | null }[];
};

export function createEvent(input: { sortOrder?: number; published?: boolean; imageAssetId?: string | null; translations: { locale: string; title: string; dateLabel: string; location: string; summary: string; ctaLabel?: string | null; ctaHref?: string | null }[] }) {
  const db = getDb();
  const id = crypto.randomUUID();
  const now = Date.now();
  db.insert(events).values({ id, sortOrder: input.sortOrder ?? 0, published: input.published === false ? 0 : 1, imageAssetId: input.imageAssetId ?? null, createdAt: now }).run();
  for (const t of input.translations) {
    db.insert(eventTranslations).values({ eventId: id, locale: t.locale, title: t.title, dateLabel: t.dateLabel, location: t.location, summary: t.summary, ctaLabel: t.ctaLabel ?? null, ctaHref: t.ctaHref ?? null }).run();
  }
  return id;
}

export function updateEvent(id: string, input: { sortOrder?: number; published?: boolean; imageAssetId?: string | null; translations?: { locale: string; title: string; dateLabel: string; location: string; summary: string; ctaLabel?: string | null; ctaHref?: string | null }[] }) {
  const db = getDb();
  const row = db.select().from(events).where(eq(events.id, id)).get();
  if (!row) return false;
  const patch: Partial<{ sortOrder: number; published: number; imageAssetId: string | null }> = {};
  if (input.sortOrder !== undefined) patch.sortOrder = input.sortOrder;
  if (input.published !== undefined) patch.published = input.published ? 1 : 0;
  if (input.imageAssetId !== undefined) patch.imageAssetId = input.imageAssetId;
  if (Object.keys(patch).length) db.update(events).set(patch).where(eq(events.id, id)).run();
  if (input.translations) {
    for (const t of input.translations) {
      const existing = db.select().from(eventTranslations).where(and(eq(eventTranslations.eventId, id), eq(eventTranslations.locale, t.locale))).get();
      if (existing) {
        db.update(eventTranslations).set({ title: t.title, dateLabel: t.dateLabel, location: t.location, summary: t.summary, ctaLabel: t.ctaLabel ?? null, ctaHref: t.ctaHref ?? null }).where(and(eq(eventTranslations.eventId, id), eq(eventTranslations.locale, t.locale))).run();
      } else {
        db.insert(eventTranslations).values({ eventId: id, locale: t.locale, title: t.title, dateLabel: t.dateLabel, location: t.location, summary: t.summary, ctaLabel: t.ctaLabel ?? null, ctaHref: t.ctaHref ?? null }).run();
      }
    }
  }
  return true;
}

export function deleteEvent(id: string) {
  const db = getDb();
  db.delete(events).where(eq(events.id, id)).run();
}

export function reorderEvents(ids: string[]) {
  const db = getDb();
  ids.forEach((id, i) => db.update(events).set({ sortOrder: i }).where(eq(events.id, id)).run());
}

export function fetchAdminEvents(): AdminEventRow[] {
  const db = getDb();
  const evs = db.select().from(events).orderBy(asc(events.sortOrder), asc(events.createdAt)).all();
  return evs.map((e) => ({
    id: e.id,
    sortOrder: e.sortOrder,
    published: e.published,
    imageAssetId: e.imageAssetId,
    createdAt: e.createdAt,
    translations: db.select().from(eventTranslations).where(eq(eventTranslations.eventId, e.id)).all(),
  }));
}

export function fetchPublishedEventsForLocale(locale: CmsLocale): EventListItem[] {
  const db = getDb();
  const evs = db.select().from(events).where(eq(events.published, 1)).orderBy(asc(events.sortOrder), asc(events.createdAt)).all();
  const out: EventListItem[] = [];
  for (const e of evs) {
    const tr =
      db.select().from(eventTranslations).where(and(eq(eventTranslations.eventId, e.id), eq(eventTranslations.locale, locale))).get() ??
      db.select().from(eventTranslations).where(and(eq(eventTranslations.eventId, e.id), eq(eventTranslations.locale, "en"))).get();
    if (!tr) continue;
    out.push({ id: e.id, title: tr.title, dateLabel: tr.dateLabel, location: tr.location, summary: tr.summary, ctaLabel: tr.ctaLabel ?? undefined, ctaHref: tr.ctaHref ?? undefined });
  }
  return out;
}
