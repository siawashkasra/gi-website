"use client";

import { forwardRef, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";
import { NAVY_BLUR_DATA_URL } from "@/lib/image-placeholders";
import { projectTypeLabels } from "@/data/projects";
import type { HeroSidebarRibbonItem, ResolvedHeroSidebar } from "@/lib/project-hero-sidebar-types";
import { formatProjectStatusLabel } from "@/lib/project-status";
import { cn } from "@/lib/utils";

export const ProjectHero = forwardRef<HTMLElement, { project: Project; heroIntro: ResolvedHeroSidebar["intro"]; ribbon: HeroSidebarRibbonItem[] }>(function ProjectHero({ project, heroIntro, ribbon }, ref) {
  const localRef = useRef<HTMLElement | null>(null);
  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      localRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    },
    [ref]
  );
  const { scrollYProgress } = useScroll({ target: localRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const statusLabel = formatProjectStatusLabel(project.status);
  const hasRibbon = ribbon.length > 0;
  return (
    <header ref={setRefs} className="relative -mt-[var(--header-h)] w-full max-w-full overflow-hidden pt-[var(--header-h)]" aria-labelledby="project-detail-title">
      <div
        className={cn(
          "flex min-h-0 min-w-0 w-full max-w-full flex-col lg:min-h-[calc(100svh-4.25rem)]",
          hasRibbon ? "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,17.5rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,19.5rem)]" : "lg:grid lg:grid-cols-1"
        )}
      >
        <div className="relative min-h-[min(88svh,38rem)] min-w-0 w-full max-w-full lg:min-h-[calc(100svh-4.25rem)]">
          <motion.div className="absolute inset-0 will-change-transform" style={{ y }}>
            <Image src={project.image} alt={project.name} fill priority fetchPriority="high" placeholder="blur" blurDataURL={NAVY_BLUR_DATA_URL} className="object-cover" sizes="(max-width:1024px) 100vw, 72vw" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-gi-navy/95 via-gi-navy/50 to-gi-navy/28" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_65%_at_100%_0%,rgba(255,255,255,0.1),transparent_55%)]" aria-hidden />
          <div className="absolute inset-0 bg-[linear-gradient(195deg,rgba(255,255,255,0.06)_0%,transparent_42%)]" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_100%,rgba(255,255,255,0.08),transparent_55%)]" aria-hidden />
          <div className="relative z-10 flex min-h-[min(88svh,38rem)] min-w-0 max-w-full flex-col pb-12 pt-6 sm:min-h-[min(90svh,42rem)] sm:pb-16 sm:pt-8 lg:min-h-[calc(100svh-4.25rem)] lg:pb-16 lg:pt-10">
            <div className="ds-container flex min-w-0 max-w-full flex-1 flex-col px-0 sm:px-0">
              <nav className="min-w-0 font-sans text-xs text-white/50" aria-label="Breadcrumb">
                <Link href="/projects" className="transition-colors hover:text-white/85">
                  All projects
                </Link>
                <span className="mx-2 inline-flex align-middle text-white/35" aria-hidden>
                  <ChevronRight className="inline size-3" />
                </span>
                <span className="break-words text-white/60">{project.name}</span>
              </nav>
              <div className="mt-6 flex min-w-0 flex-wrap items-center gap-2 sm:mt-8">
                <span className="rounded-full border border-white/45 bg-white/12 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-md">{project.category}</span>
                <span className="rounded-full border border-white/35 bg-gi-navy/50 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">{statusLabel}</span>
                <span className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">{projectTypeLabels[project.type]}</span>
              </div>
              <div className="mt-auto min-w-0 max-w-full pb-4 sm:max-w-5xl sm:pb-6 lg:pb-8">
                <div className="mb-5 h-px w-16 bg-gradient-to-r from-gi-gold/80 to-transparent sm:mb-6" aria-hidden />
                <h1 id="project-detail-title" className="text-hero text-balance break-words font-heading font-bold leading-[0.98] tracking-tight text-white">
                  {project.name}
                </h1>
                <p className="mt-6 max-w-2xl break-words font-sans text-base leading-relaxed text-white/78 sm:mt-8 sm:text-lg md:text-xl">{project.excerpt}</p>
              </div>
            </div>
          </div>
        </div>
        {hasRibbon ? (
          <aside className="relative flex min-w-0 max-w-full flex-col justify-between border-t border-white/10 bg-gi-navy px-6 py-9 text-white sm:px-8 sm:py-10 lg:min-h-[calc(100svh-4.25rem)] lg:border-l lg:border-t-0 lg:px-8 lg:py-11 xl:px-10 xl:py-12" aria-label="Project key figures">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_65%_at_100%_0%,rgba(255,255,255,0.1),transparent_55%)]" aria-hidden />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(195deg,rgba(255,255,255,0.035)_0%,transparent_42%)]" aria-hidden />
            <div className="relative">
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-white/55">{heroIntro.eyebrow}</p>
              <p className="mt-3 font-heading text-lg font-semibold leading-snug tracking-tight text-white xl:text-xl">{heroIntro.title}</p>
              <p className="mt-3 font-sans text-xs leading-relaxed text-white/68 sm:text-sm">{heroIntro.blurb}</p>
            </div>
            <ul className="relative mt-8 space-y-6 border-t border-white/10 pt-8 lg:mt-10 lg:flex-1">
              {ribbon.map((item) => (
                <li key={item.rowKey}>
                  <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/50">{item.label}</p>
                  <p className="mt-1 break-words font-heading text-2xl font-semibold tabular-nums tracking-tight text-white sm:text-3xl">{item.value}</p>
                </li>
              ))}
            </ul>
            <div className="relative mt-8 border-t border-white/10 pt-8 lg:mt-10">
              <Link href={`/contact?project=${encodeURIComponent(project.slug)}`} className="inline-flex w-full items-center justify-center rounded-xl border border-white/35 bg-white/[0.06] px-5 py-3 text-center text-sm font-semibold text-white shadow-none backdrop-blur-sm transition-colors hover:border-white/55 hover:bg-white/12">
                Discuss this project
              </Link>
            </div>
          </aside>
        ) : null}
      </div>
    </header>
  );
});
