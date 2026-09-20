"use client";

import { AdminBanner } from "@/components/admin/admin-banner";
import { cmsLocales, LocalePanel, LocaleTabs, type CmsLocaleId } from "@/components/admin/locale-tabs";
import { Button } from "@/components/ui/button";
import type { CmsFeedback, CmsPayloadSource } from "@/components/admin/use-cms-document";

export function CmsEditorToolbar({ locale, onLocaleChange, completeness, onCopyFromEnglish, source, error, feedback, dirty, busy, loading, onSave, children }: { locale: CmsLocaleId; onLocaleChange: (l: CmsLocaleId) => void; completeness?: Partial<Record<CmsLocaleId, boolean>>; onCopyFromEnglish: () => void; source: CmsPayloadSource; error: string | null; feedback: CmsFeedback; dirty: boolean; busy: boolean; loading: boolean; onSave: () => void; children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <LocaleTabs value={locale} onChange={onLocaleChange} completeness={completeness} />
        {locale !== "en" ? <Button type="button" variant="outline" size="sm" onClick={onCopyFromEnglish}>Copy from English</Button> : null}
      </div>
      {error ? <div className="mt-3"><AdminBanner tone="error">{error}</AdminBanner></div> : null}
      {!loading && !error && source === "bundled" ? <div className="mt-3"><AdminBanner tone="info">Showing default {locale === "en" ? "English" : locale === "fa-AF" ? "Dari" : "Pashto"} copy from locale files. Save to store edits in the database.</AdminBanner></div> : null}
      <LocalePanel locale={locale}>
        <div className="mt-4">{loading ? <p className="text-sm text-muted-foreground">Loading current content…</p> : children}</div>
      </LocalePanel>
      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-4">
        <Button type="button" size="sm" className="bg-gi-navy hover:bg-gi-navy/90" disabled={busy || loading} onClick={onSave}>Save {locale === "en" ? "English" : locale === "fa-AF" ? "Dari" : "Pashto"}</Button>
        {dirty ? <span className="text-xs text-amber-700">Unsaved changes</span> : null}
      </div>
      {feedback ? <div className="mt-3"><AdminBanner tone={feedback.tone}>{feedback.text}</AdminBanner></div> : null}
    </>
  );
}
