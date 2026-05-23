"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AdminEditorSection } from "@/lib/admin/editor-sections";
import { cn } from "@/lib/utils";

export function AdminEditorLayout({ pageTitle, pageDescription, sections, activeSlug, preview, toolbar }: { pageTitle: string; pageDescription?: string; sections: AdminEditorSection[]; activeSlug: string; preview?: React.ReactNode; toolbar?: React.ReactNode }) {
  const pathname = usePathname();
  const active = sections.find((s) => s.slug === activeSlug) ?? sections[0];
  return (
    <div className="admin-editor-workspace -mx-4 flex min-h-[calc(100vh-8rem)] flex-col sm:-mx-8">
      <div className="admin-page-hero mx-4 mb-4 px-5 py-5 sm:mx-8 sm:px-6">
        <h1 className="font-heading text-xl font-semibold tracking-tight text-gi-navy sm:text-2xl">{pageTitle}</h1>
        {pageDescription ? <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{pageDescription}</p> : null}
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 pb-8 sm:px-8 lg:flex-row">
        <aside className="admin-section-nav shrink-0 lg:w-52">
          <p className="mb-2 px-2 text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">Sections</p>
          <nav className="flex flex-row gap-1 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
            {sections.map((s) => {
              const isActive = pathname === s.href || activeSlug === s.slug;
              return (
                <Link key={s.slug} href={s.href} className={cn("admin-section-link shrink-0 rounded-lg px-3 py-2 text-sm transition-colors lg:shrink", isActive ? "bg-gi-navy text-white font-medium" : "text-foreground/75 hover:bg-muted")}>
                  {s.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 xl:flex-row">
          {preview ? <div className="w-full shrink-0 xl:w-[min(42%,22rem)] xl:max-w-md">{preview}</div> : null}
          <div className="admin-editor-panel min-w-0 flex-1">
            <div className="rounded-xl border border-border bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 border-b border-border pb-4">
                <h2 className="font-heading text-lg font-semibold text-gi-navy">{active?.label}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{active?.description}</p>
              </div>
              {toolbar}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
