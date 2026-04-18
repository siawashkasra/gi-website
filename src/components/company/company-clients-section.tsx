"use client";

import { motion, useReducedMotion } from "framer-motion";
import { clientsPartners } from "@/data/company-profile";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

export function CompanyClientsSection() {
  const reduce = useReducedMotion();
  return (
    <section id="clients" className="ds-section border-b border-border/60 bg-white" aria-labelledby="clients-heading">
      <div className="ds-container max-w-3xl">
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 text-center shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-64px" }} transition={reduce ? { duration: 0 } : { duration: 0.7, ease: easeLuxury }}>
          <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 sm:px-9 sm:py-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Ecosystem</p>
            <h2 id="clients-heading" className="mx-auto mt-3 max-w-2xl font-heading text-[clamp(1.5rem,2.8vw,2.15rem)] font-semibold leading-tight tracking-tight text-gi-navy">{clientsPartners.title}</h2>
            <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-primary/35 to-transparent" aria-hidden />
          </div>
          <p className="px-7 py-9 font-sans text-sm leading-relaxed text-muted-foreground sm:px-9 sm:py-10 sm:text-base">{clientsPartners.note}</p>
        </motion.div>
      </div>
    </section>
  );
}
