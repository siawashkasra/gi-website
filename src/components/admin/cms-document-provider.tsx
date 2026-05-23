"use client";

import { adminFetch } from "@/lib/admin/admin-fetch";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { cmsLocales, type CmsLocaleId } from "@/components/admin/locale-tabs";
import { useCmsDocument, type CmsPayloadSource } from "@/components/admin/use-cms-document";

type CmsDocCtx = {
  locale: CmsLocaleId;
  setLocale: (l: CmsLocaleId) => void;
  payload: Record<string, unknown> | unknown[] | null;
  setPayload: (p: Record<string, unknown> | unknown[] | null) => void;
  patch: (partial: Record<string, unknown>) => void;
  data: Record<string, unknown>;
  loading: boolean;
  busy: boolean;
  dirty: boolean;
  source: CmsPayloadSource;
  error: string | null;
  feedback: ReturnType<typeof useCmsDocument>["feedback"];
  save: (transform?: (p: Record<string, unknown> | unknown[]) => Record<string, unknown> | unknown[]) => Promise<void>;
  copyFromEnglish: () => void;
  completeness: Partial<Record<CmsLocaleId, boolean>>;
};

const CmsDocumentContext = createContext<CmsDocCtx | null>(null);

export function useCmsDocumentContext() {
  const ctx = useContext(CmsDocumentContext);
  if (!ctx) throw new Error("useCmsDocumentContext requires CmsDocumentProvider");
  return ctx;
}

export function CmsDocumentProvider({ entityType, entityKey, merge, onSaveTransform, children }: { entityType: string; entityKey: string; merge?: boolean; onSaveTransform?: (p: Record<string, unknown> | unknown[]) => Record<string, unknown> | unknown[]; children: React.ReactNode }) {
  const doc = useCmsDocument(entityType, entityKey, { merge });
  const [completeness, setCompleteness] = useState<Partial<Record<CmsLocaleId, boolean>>>({});
  const refreshCompleteness = useCallback(async () => {
    const flags: Partial<Record<CmsLocaleId, boolean>> = {};
    await Promise.all(
      cmsLocales.map(async (l) => {
        const res = await adminFetch(`/api/admin/content?entityType=${encodeURIComponent(entityType)}&entityKey=${encodeURIComponent(entityKey)}&locale=${encodeURIComponent(l.id)}`);
        const j = (await res.json()) as { ok?: boolean; payload?: unknown };
        flags[l.id] = j.payload != null && (Array.isArray(j.payload) ? j.payload.length > 0 : Object.keys(j.payload as object).length > 0);
      }),
    );
    setCompleteness(flags);
  }, [entityType, entityKey]);
  useEffect(() => {
    void refreshCompleteness();
  }, [refreshCompleteness, doc.feedback]);
  useEffect(() => {
    if (!doc.dirty) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [doc.dirty]);
  const data = (doc.payload ?? {}) as Record<string, unknown>;
  const patch = useCallback((partial: Record<string, unknown>) => {
    const cur = (doc.payload ?? {}) as Record<string, unknown>;
    doc.setPayload({ ...cur, ...partial });
  }, [doc.payload, doc.setPayload]);
  const save = useCallback(async (transform?: (p: Record<string, unknown> | unknown[]) => Record<string, unknown> | unknown[]) => {
    if (doc.payload == null) return;
    const fn = transform ?? onSaveTransform ?? ((p: Record<string, unknown> | unknown[]) => p);
    await doc.save(fn(doc.payload));
    await refreshCompleteness();
  }, [doc, onSaveTransform, refreshCompleteness]);
  const value = useMemo<CmsDocCtx>(() => ({ locale: doc.locale, setLocale: doc.setLocale, payload: doc.payload, setPayload: doc.setPayload, patch, data, loading: doc.loading, busy: doc.busy, dirty: doc.dirty, source: doc.source, error: doc.error, feedback: doc.feedback, save, copyFromEnglish: doc.copyFromEnglish, completeness }), [doc, patch, save, completeness]);
  return <CmsDocumentContext.Provider value={value}>{children}</CmsDocumentContext.Provider>;
}
