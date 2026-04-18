"use client";

import { motion, useReducedMotion } from "framer-motion";
import { competitiveStrengths } from "@/data/company-profile";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

export function CompanyStrengthsFull() {
  const reduce = useReducedMotion();
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.05 } } };
  const item = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.46, ease: easeLuxury } } };
  return (
    <section id="strengths" className="ds-section border-b border-border/60 bg-muted/25" aria-labelledby="strengths-heading">
      <div className="ds-container">
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeLuxury }}>
          <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 text-center sm:px-9 sm:py-10 lg:px-11 lg:py-11 xl:px-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Position</p>
            <h2 id="strengths-heading" className="mx-auto mt-3 max-w-2xl font-heading text-[clamp(1.65rem,3.2vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-gi-navy">Competitive strengths</h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">Six coordinated advantages that underpin delivery and capital discipline.</p>
            <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
          </div>
          <div className="bg-white px-7 py-9 sm:px-9 sm:py-10 lg:px-10 lg:py-11">
            <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-24px" }}>
              {competitiveStrengths.map((s) => (
                <motion.article key={s.order} variants={item} className="group relative flex flex-col overflow-hidden rounded-2xl border border-gi-navy/[0.08] bg-white p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] transition-[border-color,box-shadow] duration-500 hover:border-gi-navy/18 hover:shadow-[0_20px_56px_-36px_rgba(13,27,62,0.14)]">
                  <div className="pointer-events-none absolute -right-4 -top-4 size-24 rounded-full bg-primary/[0.05] transition-transform duration-500 group-hover:scale-110" aria-hidden />
                  <span className="relative font-sans text-5xl font-bold tabular-nums text-primary/10">{s.order}</span>
                  <p className="relative -mt-2 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary">Strength {s.order}</p>
                  <h3 className="relative mt-3 font-heading text-lg font-semibold tracking-tight text-gi-navy">{s.title}</h3>
                  <p className="relative mt-3 font-sans text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </motion.article>
              ))}
            </motion.div>
            <p className="mx-auto mt-10 max-w-3xl border-t border-border/50 pt-6 text-center font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:text-xs">Strategic factors for orientation; market programs and project execution vary by sector and stage.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
