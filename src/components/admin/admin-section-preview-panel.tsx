"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { CmsLocaleId } from "@/components/admin/locale-tabs";
import { cn } from "@/lib/utils";

function localeName(locale: CmsLocaleId) {
  return locale === "en" ? "English" : locale === "fa-AF" ? "Dari" : "Pashto";
}

export function AdminSectionPreviewPanel({ locale, sectionLabel, publicHref, empty, children, className }: { locale: CmsLocaleId; sectionLabel: string; publicHref?: string; empty?: boolean; children: React.ReactNode; className?: string }) {
  const rtl = locale === "fa-AF" || locale === "ps";
  return (
    <div className={cn("admin-section-preview flex h-full min-h-[280px] flex-col overflow-hidden rounded-xl border border-border bg-muted/20", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-white px-3 py-2.5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gi-navy">Current content</p>
          <p className="text-[0.65rem] text-muted-foreground">{sectionLabel} · {localeName(locale)}</p>
        </div>
        {publicHref ? (
          <Link href={publicHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
            On site <ExternalLink className="size-3" />
          </Link>
        ) : null}
      </div>
      <div dir={rtl ? "rtl" : "ltr"} className={cn("min-h-0 flex-1 overflow-y-auto p-4 text-sm", rtl && "text-end")}>
        {empty ? <p className="text-muted-foreground">No content for this section yet.</p> : children}
      </div>
    </div>
  );
}
