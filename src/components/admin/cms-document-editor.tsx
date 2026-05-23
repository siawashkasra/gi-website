"use client";

import { adminFetch } from "@/lib/admin/admin-fetch";
import { useCallback, useEffect, useState } from "react";
import { AdminBanner } from "@/components/admin/admin-banner";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { cmsLocales, LocalePanel, LocaleTabs, type CmsLocaleId } from "@/components/admin/locale-tabs";
import { Button } from "@/components/ui/button";
import { useCmsDocument, type CmsPayloadSource } from "@/components/admin/use-cms-document";

export function CmsDocumentEditor({ entityType, entityKey, title, description, merge, onSave, children }: { entityType: string; entityKey: string; title: string; description?: string; merge?: boolean; onSave: (payload: Record<string, unknown> | unknown[]) => Record<string, unknown> | unknown[]; children: (ctx: { locale: CmsLocaleId; payload: Record<string, unknown> | unknown[] | null; setPayload: (p: Record<string, unknown> | unknown[] | null) => void; loading: boolean; source: CmsPayloadSource }) => React.ReactNode }) {
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
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [doc.dirty]);
  async function handleSave() {
    if (doc.payload == null) return;
    const data = onSave(doc.payload);
    await doc.save(data);
    await refreshCompleteness();
  }
  return (
    <AdminSectionCard title={title} description={description}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <LocaleTabs value={doc.locale} onChange={doc.setLocale} completeness={completeness} />
        {doc.locale !== "en" ? (
          <Button type="button" variant="outline" size="sm" onClick={doc.copyFromEnglish}>
            Copy from English
          </Button>
        ) : null}
      </div>
      {doc.error ? <AdminBanner tone="error">{doc.error}</AdminBanner> : null}
      {!doc.loading && !doc.error && doc.source === "bundled" ? <AdminBanner tone="info">Showing default {doc.locale === "en" ? "English" : doc.locale === "fa-AF" ? "Dari" : "Pashto"} copy from locale files. Save to store edits in the database.</AdminBanner> : null}
      <LocalePanel locale={doc.locale}>
        {doc.loading ? <p className="text-sm text-muted-foreground">Loading…</p> : children({ locale: doc.locale, payload: doc.payload, setPayload: doc.setPayload, loading: doc.loading, source: doc.source })}
      </LocalePanel>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Button type="button" size="sm" disabled={doc.busy || doc.loading} onClick={handleSave}>
          Save {doc.locale === "en" ? "English" : doc.locale === "fa-AF" ? "Dari" : "Pashto"}
        </Button>
        {doc.dirty ? <span className="text-xs text-amber-700">Unsaved changes</span> : null}
      </div>
      {doc.feedback ? <div className="mt-4"><AdminBanner tone={doc.feedback.tone}>{doc.feedback.text}</AdminBanner></div> : null}
    </AdminSectionCard>
  );
}
