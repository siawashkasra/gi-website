import "server-only";
import { and, eq } from "drizzle-orm";
import { contentDocuments } from "@/db/schema";
import { getDb } from "@/db/index";
import type { CmsLocale } from "@/lib/cms/apply-content-overlay";
import { deepMerge } from "@/lib/cms/deep-merge";

export function fetchContentDocumentsForLocale(locale: CmsLocale) {
  const db = getDb();
  return db.select().from(contentDocuments).where(and(eq(contentDocuments.locale, locale), eq(contentDocuments.published, 1))).all();
}

export function fetchContentDocument(entityType: string, entityKey: string, locale: CmsLocale) {
  const db = getDb();
  return db.select().from(contentDocuments).where(and(eq(contentDocuments.entityType, entityType), eq(contentDocuments.entityKey, entityKey), eq(contentDocuments.locale, locale))).get();
}

export function upsertContentDocument(entityType: string, entityKey: string, locale: CmsLocale, payload: Record<string, unknown>) {
  const db = getDb();
  const existing = fetchContentDocument(entityType, entityKey, locale);
  const now = Date.now();
  const payloadJson = JSON.stringify(existing ? deepMerge(JSON.parse(existing.payloadJson) as Record<string, unknown>, payload) : payload);
  if (existing) {
    db.update(contentDocuments).set({ payloadJson, updatedAt: now }).where(and(eq(contentDocuments.entityType, entityType), eq(contentDocuments.entityKey, entityKey), eq(contentDocuments.locale, locale))).run();
  } else {
    db.insert(contentDocuments).values({ entityType, entityKey, locale, payloadJson, published: 1, updatedAt: now }).run();
  }
}

export function deleteContentDocument(entityType: string, entityKey: string, locale: CmsLocale) {
  const db = getDb();
  db.delete(contentDocuments).where(and(eq(contentDocuments.entityType, entityType), eq(contentDocuments.entityKey, entityKey), eq(contentDocuments.locale, locale))).run();
}

export function replaceContentDocument(entityType: string, entityKey: string, locale: CmsLocale, payload: Record<string, unknown> | unknown[]) {
  const db = getDb();
  const now = Date.now();
  const payloadJson = JSON.stringify(payload);
  const existing = fetchContentDocument(entityType, entityKey, locale);
  if (existing) {
    db.update(contentDocuments).set({ payloadJson, updatedAt: now }).where(and(eq(contentDocuments.entityType, entityType), eq(contentDocuments.entityKey, entityKey), eq(contentDocuments.locale, locale))).run();
  } else {
    db.insert(contentDocuments).values({ entityType, entityKey, locale, payloadJson, published: 1, updatedAt: now }).run();
  }
}
