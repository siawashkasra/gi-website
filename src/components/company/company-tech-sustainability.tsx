"use client";

import { motion, useReducedMotion } from "framer-motion";
import { sustainabilityStandards, technologyStandards } from "@/data/company-profile";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

export function CompanyTechSustainability() {
  const reduce = useReducedMotion();
  return (
    <section id="standards-full" className="ds-section border-b border-border/60 bg-white" aria-labelledby="tech-sus-heading">
      <div className="ds-container">
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)] lg:grid lg:grid-cols-2" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeLuxury }}>
          <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 sm:px-9 sm:py-10 lg:border-b-0 lg:border-r lg:border-border/50">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Built to perform</p>
            <h2 id="tech-sus-heading" className="mt-3 font-heading text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tight text-gi-navy">Technology & infrastructure standards</h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary/35 to-transparent" aria-hidden />
            <p className="mt-6 font-sans text-base font-normal leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">{technologyStandards}</p>
          </div>
          <div className="relative border-t border-border/50 bg-white px-7 py-9 sm:px-9 sm:py-10 lg:border-t-0">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/12 to-transparent lg:hidden" aria-hidden />
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Responsibility</p>
            <h3 className="mt-3 font-heading text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tight text-gi-navy">Sustainability & social responsibility</h3>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary/35 to-transparent" aria-hidden />
            <p className="mt-6 font-sans text-base font-normal leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">{sustainabilityStandards}</p>
          </div>
        </motion.div>
        <p className="mt-6 text-center font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:text-xs">High-level statement; project-level environmental and social performance follows applicable standards and local requirements.</p>
      </div>
    </section>
  );
}
