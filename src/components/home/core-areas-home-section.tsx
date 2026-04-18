"use client";

import Link from "next/link";
import { ArrowUpRight, Factory, Flame, LayoutGrid, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { coreBusinessAreas, homeHighlights, leadFromBody } from "@/data/company-profile";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

const areaIcons = [LayoutGrid, Sparkles, Factory, Flame] as const;

export function CoreAreasHomeSection() {
  const reduce = useReducedMotion();
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.06 } } };
  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, ease: easeLuxury } } };
  return (
    <section id="core-areas" className="ds-section border-b border-border/60 bg-white" aria-labelledby="core-areas-heading">
      <div className="ds-container">
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeLuxury }}>
          <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 text-center sm:px-9 sm:py-10 lg:px-11 lg:py-11 xl:px-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Platform</p>
            <h2 id="core-areas-heading" className="mx-auto mt-3 max-w-2xl font-heading text-[clamp(1.65rem,3.2vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-gi-navy">Core business areas</h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">Four integrated pillars that align real estate, commercial, industrial, and energy capacity.</p>
            <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
          </div>
          <div className="relative bg-white px-7 py-9 sm:px-9 sm:py-10 lg:px-10 lg:py-11 xl:px-12 xl:py-12">
            <motion.div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2 lg:gap-8" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-28px" }}>
              {coreBusinessAreas.map((area, i) => {
                const Icon = areaIcons[i] ?? LayoutGrid;
                const href = area.projectSlugs[0] ? `/projects/${area.projectSlugs[0]}` : homeHighlights.companyCtaPath;
                return (
                  <motion.article key={area.title} variants={item} className="group relative flex flex-col overflow-hidden rounded-2xl border border-gi-navy/[0.08] bg-white p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] transition-[border-color,box-shadow] duration-500 hover:border-gi-navy/18 hover:shadow-[0_20px_56px_-36px_rgba(13,27,62,0.14)] lg:p-10">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_100%_0%,rgba(13,27,62,0.045),transparent)]" aria-hidden />
                    <div className="relative flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/12 transition-colors duration-300 group-hover:bg-primary/[0.14]">
                      <Icon className="size-6 shrink-0 text-primary" aria-hidden />
                    </div>
                    <h3 className="relative mt-6 font-heading text-xl font-semibold tracking-tight text-gi-navy sm:text-2xl">{area.title}</h3>
                    <p className="relative mt-4 flex-1 font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">{leadFromBody(area.body, 280)}</p>
                    <div className="relative mt-7 flex flex-wrap gap-3">
                      <Button render={<Link href={href} />} nativeButton={false} size="sm" className="rounded-xl px-4 font-semibold hover:scale-100">
                        Explore <ArrowUpRight className="ml-1 inline size-3.5" aria-hidden />
                      </Button>
                      <Button render={<Link href={`${homeHighlights.companyCtaPath}#core-areas`} />} nativeButton={false} variant="outline" size="sm" className="rounded-xl border-gi-navy/18 px-4 font-semibold text-gi-navy hover:scale-100 hover:border-gi-navy/30 hover:bg-gi-navy/[0.04] hover:text-gi-navy">
                        Read full context
                      </Button>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
            <p className="mx-auto mt-10 max-w-3xl border-t border-border/50 pt-6 text-center font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:text-xs">Sector summaries for orientation; methodology, governance, and extended narrative appear on the company profile.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
