"use client";

import { forwardRef, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";
import { NAVY_BLUR_DATA_URL } from "@/lib/image-placeholders";
import { projectTypeLabels } from "@/data/projects";
import type { RibbonItem } from "@/lib/project-ribbon";
import { formatProjectStatusLabel } from "@/lib/project-status";

export const ProjectHero = forwardRef<HTMLElement, { project: Project }>(function ProjectHero({ project }, ref) {
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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const statusLabel = formatProjectStatusLabel(project.status);
  return (
    <header ref={setRefs} className="relative -mt-[var(--header-h)] min-h-[100svh] w-full overflow-hidden pt-[var(--header-h)]" aria-labelledby="project-detail-title">
      <motion.div className="absolute inset-0 will-change-transform" style={{ y }}>
        <Image src={project.image} alt="" fill priority fetchPriority="high" placeholder="blur" blurDataURL={NAVY_BLUR_DATA_URL} className="object-cover" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-gi-navy/95 via-gi-navy/50 to-gi-navy/28" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_65%_at_100%_0%,rgba(255,255,255,0.1),transparent_55%)]" aria-hidden />
      <div className="absolute inset-0 bg-[linear-gradient(195deg,rgba(255,255,255,0.06)_0%,transparent_42%)]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_100%,rgba(255,255,255,0.08),transparent_55%)]" aria-hidden />
      <div className="relative z-10 flex min-h-[100svh] flex-col pb-16 pt-8 sm:pb-24 sm:pt-10">
        <div className="ds-container flex flex-1 flex-col">
          <nav className="font-sans text-xs text-white/50" aria-label="Breadcrumb">
            <Link href="/projects" className="transition-colors hover:text-white/85">
              All projects
            </Link>
            <span className="mx-2 inline-flex align-middle text-white/35" aria-hidden>
              <ChevronRight className="inline size-3" />
            </span>
            <span className="text-white/60">{project.name}</span>
          </nav>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/45 bg-white/12 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-md">{project.category}</span>
            <span className="rounded-full border border-white/35 bg-gi-navy/50 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">{statusLabel}</span>
            <span className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">{projectTypeLabels[project.type]}</span>
          </div>
          <div className="mt-auto max-w-5xl pb-6 sm:pb-8">
            <div className="mb-6 h-px w-16 bg-gradient-to-r from-gi-gold/80 to-transparent sm:mb-8" aria-hidden />
            <h1 id="project-detail-title" className="text-hero font-heading font-bold leading-[0.98] tracking-tight text-white">
              {project.name}
            </h1>
            <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-white/78 sm:text-lg md:text-xl">{project.excerpt}</p>
          </div>
        </div>
      </div>
    </header>
  );
});

export function ProjectDataRibbon({ items }: { items: RibbonItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="sticky top-[var(--header-h)] z-40 overflow-hidden border-y border-white/10 bg-gi-navy shadow-[0_10px_40px_-14px_rgba(13,27,62,0.5)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_65%_at_100%_0%,rgba(255,255,255,0.1),transparent_55%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(195deg,rgba(255,255,255,0.04)_0%,transparent_45%)]" aria-hidden />
      <div className="relative z-[1] ds-container py-4 sm:py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:justify-between md:gap-x-14">
          {items.map((item) => (
            <div key={item.label} className="text-center sm:text-left">
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/50">{item.label}</p>
              <p className="mt-1 font-heading text-2xl font-semibold tabular-nums tracking-tight text-white sm:text-3xl">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
