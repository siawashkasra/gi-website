"use client";

import { cn } from "@/lib/utils";

export const cmsLocales = [{ id: "en", label: "English", short: "EN" }, { id: "fa-AF", label: "Dari", short: "FA" }, { id: "ps", label: "Pashto", short: "PS" }] as const;
export type CmsLocaleId = (typeof cmsLocales)[number]["id"];

export function LocaleTabs({ value, onChange, completeness }: { value: CmsLocaleId; onChange: (locale: CmsLocaleId) => void; completeness?: Partial<Record<CmsLocaleId, boolean>> }) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1" role="tablist">
      {cmsLocales.map((l) => {
        const hasDoc = completeness?.[l.id];
        const showGap = completeness != null && l.id !== "en" && hasDoc === false;
        return (
          <button key={l.id} type="button" role="tab" aria-selected={value === l.id} onClick={() => onChange(l.id)} className={cn("relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors", value === l.id ? "bg-card text-gi-navy shadow-sm" : "text-muted-foreground hover:text-foreground")}>
            {l.label}
            {showGap ? <span className="absolute -top-0.5 -end-0.5 size-2 rounded-full bg-amber-500" aria-label="Translation missing" /> : null}
          </button>
        );
      })}
    </div>
  );
}

export function LocalePanel({ locale, children }: { locale: CmsLocaleId; children: React.ReactNode }) {
  const rtl = locale === "fa-AF" || locale === "ps";
  return (
    <div dir={rtl ? "rtl" : "ltr"} className={cn(rtl && "text-end")}>
      {children}
    </div>
  );
}
