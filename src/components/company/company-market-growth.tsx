"use client";

import { motion, useReducedMotion } from "framer-motion";
import { growthOutlook, internationalPresence, marketPositioning } from "@/data/company-profile";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

export function CompanyMarketGrowth() {
  const reduce = useReducedMotion();
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.05 } } };
  const listSlow = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.04 } } };
  const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.45, ease: easeLuxury } } };
  return (
    <section id="market" className="ds-section border-b border-border/60 bg-muted/20" aria-labelledby="market-heading">
      <div className="ds-container space-y-12 sm:space-y-14">
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeLuxury }}>
          <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 sm:px-9 sm:py-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Markets</p>
            <h2 id="market-heading" className="mt-3 font-heading text-[clamp(1.65rem,3vw,2.35rem)] font-semibold leading-[1.08] tracking-tight text-gi-navy">Market positioning</h2>
            <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">Sector-level differentiation across cement, energy, and integrated infrastructure.</p>
            <div className="mt-5 h-px w-16 bg-gradient-to-r from-primary/35 to-transparent" aria-hidden />
          </div>
          <motion.div className="grid gap-6 border-b border-border/50 bg-white px-7 py-8 sm:px-9 sm:py-10 md:grid-cols-2 md:gap-8" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-24px" }}>
            {marketPositioning.map((m) => (
              <motion.article key={m.title} variants={item} className="group relative flex flex-col overflow-hidden rounded-2xl border border-gi-navy/[0.08] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] transition-[border-color,box-shadow] duration-500 hover:border-gi-navy/18 sm:p-8">
                <div className="pointer-events-none absolute -right-4 -top-4 size-24 rounded-full bg-primary/[0.05] transition-transform duration-500 group-hover:scale-110" aria-hidden />
                <h3 className="relative font-heading text-xl font-semibold tracking-tight text-gi-navy">{m.title}</h3>
                <p className="relative mt-4 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">{m.body}</p>
              </motion.article>
            ))}
          </motion.div>
          <p className="bg-white px-7 py-5 font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:px-9 sm:py-6 sm:text-xs">Context for strategic orientation; program detail follows sector governance and project lifecycle.</p>
        </motion.div>
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-64px" }} transition={reduce ? { duration: 0 } : { duration: 0.72, ease: easeLuxury }}>
          <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 sm:px-9 sm:py-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Forward view</p>
            <h3 className="mt-3 font-heading text-2xl font-semibold leading-tight tracking-tight text-gi-navy">Growth outlook</h3>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary/35 to-transparent" aria-hidden />
          </div>
          <div className="bg-white px-7 py-9 sm:px-9 sm:py-10">
            <p className="max-w-3xl font-sans text-base font-normal leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">{growthOutlook}</p>
          </div>
        </motion.div>
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-64px" }} transition={reduce ? { duration: 0 } : { duration: 0.72, ease: easeLuxury }}>
          <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 text-center sm:px-9 sm:py-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Connectivity</p>
            <h3 className="mt-3 font-heading text-2xl font-semibold leading-tight tracking-tight text-gi-navy">International presence</h3>
            <p className="mx-auto mt-3 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">Offices, affiliations, and cross-border reach.</p>
            <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
          </div>
          <motion.div className="grid gap-6 border-t border-border/50 bg-white px-7 py-8 sm:px-9 sm:py-10 md:grid-cols-3 md:gap-7" variants={listSlow} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-20px" }}>
            {[
              { title: "Offices & affiliations", body: internationalPresence.uae },
              { title: "Regional connections", body: internationalPresence.regional },
              { title: "Cross-border positioning", body: internationalPresence.crossBorder },
            ].map((block) => (
              <motion.article key={block.title} variants={item} className="group relative flex flex-col overflow-hidden rounded-2xl border border-gi-navy/[0.08] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] sm:p-7">
                <div className="pointer-events-none absolute -right-3 -top-3 size-20 rounded-full bg-primary/[0.05] transition-transform duration-500 group-hover:scale-110" aria-hidden />
                <h4 className="relative font-heading text-lg font-semibold text-gi-navy">{block.title}</h4>
                <p className="relative mt-3 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">{block.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
