"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import type { Project } from "@/data/projects";
import { megaMenuProjects } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

const PANEL_H = "h-[520px]";

function megaFacts(project: Project) {
  return project.megaMenu?.facts ?? [
    { label: "Year", value: project.year },
    { label: "Scale", value: project.area },
    { label: "Status", value: project.status },
  ];
}

function megaListStatus(project: Project) {
  return project.megaMenu?.listStatus ?? project.status;
}

export function MegaMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const headingId = useId();
  const prefetchTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const first = megaMenuProjects[0];
  const [previewSlug, setPreviewSlug] = useState(first?.slug ?? "");
  const [showPanel, setShowPanel] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const previewSlugRef = useRef(previewSlug);
  previewSlugRef.current = previewSlug;

  const active = useMemo(
    () => megaMenuProjects.find((p) => p.slug === previewSlug) ?? first,
    [previewSlug, first],
  );

  const schedulePrefetch = useCallback(
    (slug: string) => {
      const existing = prefetchTimers.current.get(slug);
      if (existing) clearTimeout(existing);
      const t = setTimeout(() => {
        router.prefetch(`/projects/${slug}`);
        prefetchTimers.current.delete(slug);
      }, 300);
      prefetchTimers.current.set(slug, t);
    },
    [router],
  );

  const cancelPrefetch = useCallback((slug: string) => {
    const t = prefetchTimers.current.get(slug);
    if (t) {
      clearTimeout(t);
      prefetchTimers.current.delete(slug);
    }
  }, []);

  useEffect(() => {
    return () => {
      prefetchTimers.current.forEach((t) => clearTimeout(t));
      prefetchTimers.current.clear();
    };
  }, []);

  /* Open: show immediately (avoids stuck opacity-0). Close: fade 100ms then unmount. */
  useEffect(() => {
    if (open) {
      setShowPanel(true);
      setPreviewSlug(first.slug);
      setPanelVisible(true);
      return;
    }
    setPanelVisible(false);
    const t = window.setTimeout(() => setShowPanel(false), 100);
    return () => clearTimeout(t);
  }, [open, first.slug]);

  const previewTo = useCallback((slug: string) => {
    if (slug === previewSlugRef.current) return;
    setPreviewSlug(slug);
  }, []);

  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = [...panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
    if (focusables.length === 0) return;
    const i = focusables.indexOf(document.activeElement as HTMLElement);
    if (e.shiftKey) {
      if (i <= 0) {
        e.preventDefault();
        document.getElementById("mega-menu-projects-trigger")?.focus();
      }
    } else if (i === focusables.length - 1) {
      e.preventDefault();
      focusables[0]?.focus();
    }
  };

  if (!first || megaMenuProjects.length === 0) return null;

  const facts = megaFacts(active);

  return showPanel ? (
    <div
      ref={panelRef}
      id="mega-menu-projects-dropdown"
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      onKeyDown={onPanelKeyDown}
      className={cn(
        "fixed inset-x-0 top-[4.25rem] z-[260] border-t border-[#E5E7EB] bg-white [filter:drop-shadow(0_4px_20px_rgba(0,0,0,0.06))]",
        "transition-opacity ease-linear",
        panelVisible ? "pointer-events-auto opacity-100 duration-150" : "pointer-events-none opacity-0 duration-100",
      )}
    >
      <div className={cn("ds-container", PANEL_H, "max-w-[1200px]")}>
        <div className={cn("grid h-full", "grid-cols-1 lg:grid-cols-[2fr_3fr]")}>
          {/* Left — navigation */}
          <nav className="flex min-h-0 flex-col border-b border-[#E5E7EB] bg-white lg:border-b-0 lg:border-r" aria-label="Project portfolio">
            <p id={headingId} className="sr-only">
              Select a project to preview details
            </p>
            <ul className="min-h-0 flex-1 list-none overflow-y-auto p-10">
              {megaMenuProjects.map((p) => {
                const selected = p.slug === previewSlug;
                return (
                  <li key={p.slug} className="mb-8 last:mb-0">
                    <Link
                      href={`/projects/${p.slug}`}
                      onClick={onNavigate}
                      onMouseEnter={() => {
                        previewTo(p.slug);
                        schedulePrefetch(p.slug);
                      }}
                      onMouseLeave={() => cancelPrefetch(p.slug)}
                      onFocus={() => previewTo(p.slug)}
                      className={cn(
                        "group block border-l-[3px] border-transparent pl-5 leading-[1.5] outline-none transition-[padding,background-color,border-color] duration-0",
                        "hover:border-primary hover:bg-[#F9FAFB] hover:pl-6",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                        selected && "border-primary bg-[#F9FAFB] pl-6",
                      )}
                    >
                      <span
                        className={cn(
                          "block text-base font-medium text-primary group-hover:font-semibold",
                          selected && "font-semibold",
                        )}
                      >
                        {p.name}
                      </span>
                      <span className="mt-0.5 block text-[13px] font-normal text-[#6B7280]">
                        {p.category} · {megaListStatus(p)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right — preview */}
          <div className="flex min-h-0 min-w-0 flex-col overflow-y-auto bg-[#F8F9FA]">
            <div className="gi-mega-preview-swap flex min-h-0 flex-1 flex-col" key={active.slug}>
              <div className="relative w-full shrink-0 overflow-hidden bg-[#E5E7EB]" style={{ aspectRatio: "600 / 340" }}>
                <Image
                  src={active.image}
                  alt=""
                  fill
                  sizes="(max-width:1024px) 100vw, 60vw"
                  className="object-cover"
                  priority={active.slug === first.slug}
                  loading={active.slug === first.slug ? "eager" : "lazy"}
                />
              </div>

              <div className="flex min-h-0 flex-1 flex-col p-8">
                <h2 className="font-heading text-2xl font-semibold leading-[1.3] text-primary">{active.name}</h2>
                <p className="mt-3">
                  <span className="inline-block bg-primary/10 px-2 py-1 font-sans text-xs font-medium uppercase tracking-[0.5px] text-primary">
                    {active.category}
                  </span>
                </p>
                <p className="mt-4 flex items-start gap-2 font-sans text-sm font-normal leading-[1.5] text-[#6B7280]">
                  <MapPin className="mt-0.5 size-[14px] shrink-0 text-[#6B7280]" aria-hidden />
                  <span>{active.location}</span>
                </p>

                <div className="my-5 h-px w-full bg-[#E5E7EB]" aria-hidden />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {facts.map((f) => (
                    <div key={`${active.slug}-${f.label}`}>
                      <p className="font-sans text-[12px] font-normal uppercase leading-[1.5] tracking-[0.5px] text-[#6B7280]">{f.label}</p>
                      <p className="mt-2 font-heading text-lg font-semibold leading-[1.3] text-[#1F2937]">{f.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link
                    href={`/projects/${active.slug}`}
                    onClick={onNavigate}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-primary bg-white px-5 py-2.5 font-sans text-sm font-semibold text-primary outline-none transition-[background-color,color] duration-0 hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    View Full Project Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  ) : null;
}
