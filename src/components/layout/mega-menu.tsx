"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { portfolioStats } from "@/lib/projects-data";

export function MegaMenu({ open, onNavigate, projects }: { open: boolean; onNavigate: () => void; projects: Project[] }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div key="mega" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }} className="absolute left-0 right-0 top-full border-b border-border/80 bg-background shadow-2xl shadow-[0_24px_48px_-24px_rgba(13,27,62,0.25)]" role="dialog" aria-label="Projects portfolio">
          <div className="ds-container grid max-h-[min(85vh,44rem)] grid-cols-1 gap-10 py-10 lg:grid-cols-[3fr_2fr] lg:gap-12">
            <ul className="min-w-0 space-y-0 divide-y divide-border/60">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} onClick={onNavigate} className="group flex gap-4 py-4 first:pt-0 transition-colors hover:bg-muted/30">
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-muted ring-1 ring-border/50">
                      <Image src={p.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="80px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-heading text-lg font-semibold leading-snug text-gi-navy transition-colors group-hover:text-gi-blue">{p.name}</p>
                      <p className="mt-1 [font-variant-caps:small-caps] text-[0.7rem] font-medium tracking-[0.14em] text-gi-gold">
                        {p.category}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col justify-between border-t border-border/60 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div>
                <p className="font-heading text-2xl font-semibold leading-tight tracking-tight text-gi-navy md:text-[1.65rem]">Afghanistan&apos;s leading development group</p>
                <dl className="mt-8 grid grid-cols-2 gap-6 text-left">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Portfolio</dt>
                    <dd className="mt-1 font-heading text-3xl font-bold text-gi-navy">{portfolioStats.projectCount}</dd>
                    <dd className="text-xs text-muted-foreground">developments</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Sectors</dt>
                    <dd className="mt-1 font-heading text-3xl font-bold text-gi-navy">{portfolioStats.sectorCount}+</dd>
                    <dd className="text-xs text-muted-foreground">focus areas</dd>
                  </div>
                </dl>
              </div>
              <Link href="/projects" onClick={onNavigate} className="mt-10 inline-flex items-center gap-2 self-start font-sans text-sm font-semibold uppercase tracking-[0.12em] text-gi-gold transition-colors hover:text-gi-gold-dark">
                Explore full portfolio
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
