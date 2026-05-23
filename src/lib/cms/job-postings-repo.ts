import "server-only";
import { and, asc, eq } from "drizzle-orm";
import { jobPostingTranslations, jobPostings } from "@/db/schema";
import { getDb } from "@/db/index";
import type { CmsLocale } from "@/lib/i18n/locales";

export type JobPostingListItem = { id: string; title: string; dateLabel: string; location: string; summary: string; department?: string; ctaLabel?: string; ctaHref?: string };

export type AdminJobPostingRow = {
  id: string;
  sortOrder: number;
  published: number;
  createdAt: number;
  translations: { locale: string; title: string; dateLabel: string; location: string; summary: string; department: string | null; ctaLabel: string | null; ctaHref: string | null }[];
};

export function createJobPosting(input: { sortOrder?: number; published?: boolean; translations: { locale: string; title: string; dateLabel: string; location: string; summary: string; department?: string | null; ctaLabel?: string | null; ctaHref?: string | null }[] }) {
  const db = getDb();
  const id = crypto.randomUUID();
  const now = Date.now();
  db.insert(jobPostings).values({ id, sortOrder: input.sortOrder ?? 0, published: input.published === false ? 0 : 1, createdAt: now }).run();
  for (const t of input.translations) {
    db.insert(jobPostingTranslations).values({ jobId: id, locale: t.locale, title: t.title, dateLabel: t.dateLabel, location: t.location, summary: t.summary, department: t.department ?? null, ctaLabel: t.ctaLabel ?? null, ctaHref: t.ctaHref ?? null }).run();
  }
  return id;
}

export function updateJobPosting(id: string, input: { sortOrder?: number; published?: boolean; translations?: { locale: string; title: string; dateLabel: string; location: string; summary: string; department?: string | null; ctaLabel?: string | null; ctaHref?: string | null }[] }) {
  const db = getDb();
  const row = db.select().from(jobPostings).where(eq(jobPostings.id, id)).get();
  if (!row) return false;
  const patch: Partial<{ sortOrder: number; published: number }> = {};
  if (input.sortOrder !== undefined) patch.sortOrder = input.sortOrder;
  if (input.published !== undefined) patch.published = input.published ? 1 : 0;
  if (Object.keys(patch).length) db.update(jobPostings).set(patch).where(eq(jobPostings.id, id)).run();
  if (input.translations) {
    for (const t of input.translations) {
      const existing = db.select().from(jobPostingTranslations).where(and(eq(jobPostingTranslations.jobId, id), eq(jobPostingTranslations.locale, t.locale))).get();
      if (existing) {
        db.update(jobPostingTranslations).set({ title: t.title, dateLabel: t.dateLabel, location: t.location, summary: t.summary, department: t.department ?? null, ctaLabel: t.ctaLabel ?? null, ctaHref: t.ctaHref ?? null }).where(and(eq(jobPostingTranslations.jobId, id), eq(jobPostingTranslations.locale, t.locale))).run();
      } else {
        db.insert(jobPostingTranslations).values({ jobId: id, locale: t.locale, title: t.title, dateLabel: t.dateLabel, location: t.location, summary: t.summary, department: t.department ?? null, ctaLabel: t.ctaLabel ?? null, ctaHref: t.ctaHref ?? null }).run();
      }
    }
  }
  return true;
}

export function deleteJobPosting(id: string) {
  getDb().delete(jobPostings).where(eq(jobPostings.id, id)).run();
}

export function reorderJobPostings(ids: string[]) {
  const db = getDb();
  ids.forEach((jobId, i) => db.update(jobPostings).set({ sortOrder: i }).where(eq(jobPostings.id, jobId)).run());
}

export function fetchAdminJobPostings(): AdminJobPostingRow[] {
  const db = getDb();
  const jobs = db.select().from(jobPostings).orderBy(asc(jobPostings.sortOrder), asc(jobPostings.createdAt)).all();
  return jobs.map((j) => ({
    id: j.id,
    sortOrder: j.sortOrder,
    published: j.published,
    createdAt: j.createdAt,
    translations: db.select().from(jobPostingTranslations).where(eq(jobPostingTranslations.jobId, j.id)).all(),
  }));
}

export function fetchPublishedJobPostingsForLocale(locale: CmsLocale): JobPostingListItem[] {
  const db = getDb();
  const jobs = db.select().from(jobPostings).where(eq(jobPostings.published, 1)).orderBy(asc(jobPostings.sortOrder), asc(jobPostings.createdAt)).all();
  const out: JobPostingListItem[] = [];
  for (const j of jobs) {
    const tr =
      db.select().from(jobPostingTranslations).where(and(eq(jobPostingTranslations.jobId, j.id), eq(jobPostingTranslations.locale, locale))).get() ??
      db.select().from(jobPostingTranslations).where(and(eq(jobPostingTranslations.jobId, j.id), eq(jobPostingTranslations.locale, "en"))).get();
    if (!tr) continue;
    out.push({ id: j.id, title: tr.title, dateLabel: tr.dateLabel, location: tr.location, summary: tr.summary, department: tr.department ?? undefined, ctaLabel: tr.ctaLabel ?? undefined, ctaHref: tr.ctaHref ?? undefined });
  }
  return out;
}
