"use client";

import { motion, useReducedMotion } from "framer-motion";
import { governanceIntro } from "@/data/company-profile";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

export function CompanyGovernanceSection() {
  const reduce = useReducedMotion();
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.08 } } };
  const item = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.48, ease: easeLuxury } } };
  return (
    <section id="governance" className="ds-section border-b border-border/60 bg-white" aria-labelledby="governance-heading">
      <div className="ds-container">
        <motion.div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeLuxury }}>
          <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 sm:px-9 sm:py-10 lg:px-10 lg:py-11">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Structure</p>
            <h2 id="governance-heading" className="mt-3 font-heading text-[clamp(1.65rem,3vw,2.35rem)] font-semibold leading-[1.08] tracking-tight text-gi-navy">Corporate governance</h2>
            <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">Board direction and executive delivery across sectors.</p>
            <div className="mt-5 h-px w-16 bg-gradient-to-r from-primary/35 to-transparent" aria-hidden />
          </div>
          <motion.div className="space-y-6 bg-white px-7 py-9 font-sans text-base leading-[1.75] text-muted-foreground sm:space-y-7 sm:px-9 sm:py-10 sm:text-lg sm:leading-[1.78] lg:px-10 lg:py-11" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-28px" }}>
            {governanceIntro.map((p, i) => (
              <motion.p key={i} variants={item}>
                {p}
              </motion.p>
            ))}
          </motion.div>
          <p className="border-t border-border/50 bg-white px-7 py-6 font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:px-9 sm:text-xs lg:px-10">This overview summarizes governance at a high level; board composition, delegated authorities, and reporting cadence are maintained in internal documentation.</p>
        </motion.div>
      </div>
    </section>
  );
}
