"use client";

import { motion, useReducedMotion } from "framer-motion";
import { OurCompaniesGrid } from "@/components/home/our-companies-grid";
import type { Company } from "@/data/companies";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

export function OurCompaniesSection({ companies }: { companies?: Company[] }) {
  const reduce = useReducedMotion();
  return (
    <section id="companies" className="ds-section relative overflow-visible border-b border-border/60 bg-white" aria-labelledby="our-companies-heading">
      <div className="relative ds-container">
        <motion.div className="overflow-visible rounded-3xl border border-border/60 bg-white shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeLuxury }}>
          <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 text-center sm:px-9 sm:py-10 lg:px-11 lg:py-11 xl:px-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Portfolio</p>
            <h2 id="our-companies-heading" className="mx-auto mt-3 max-w-2xl font-heading text-[clamp(1.65rem,3.2vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-gi-navy">Our Companies</h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground sm:max-w-2xl sm:text-[0.9375rem]">The Gulbahar Group spans real estate development, commercial infrastructure, energy, cement production, foundation initiatives, and related services — with headquarters in Kabul and international affiliation in the United Arab Emirates.</p>
            <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
          </div>
          <div className="relative overflow-visible px-5 pb-9 pt-8 sm:px-7 sm:pb-10 sm:pt-9 md:px-8 lg:px-10 lg:pb-11 lg:pt-10 xl:px-11">
            <OurCompaniesGrid companies={companies} />
            <p className="mx-auto mt-10 max-w-3xl border-t border-border/50 pt-6 text-center font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:text-xs">Each mark opens the relevant company or group profile; composition reflects the active platform, not a complete legal entity listing.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
