"use client";

import Link from "next/link";
import { HardHat, HeartHandshake, Scale } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { standardPillars } from "@/data/home-premium";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

const icons = [HardHat, HeartHandshake, Scale] as const;

export function StandardsSection() {
  const reduce = useReducedMotion();
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.06 } } };
  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.48, ease: easeLuxury } } };
  return (
    <section id="standards" className="ds-section border-b border-border/60 bg-white" aria-labelledby="standards-heading">
      <div className="ds-container">
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeLuxury }}>
          <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 text-center sm:px-9 sm:py-10 lg:px-11 lg:py-11 xl:px-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Commitment</p>
            <h2 id="standards-heading" className="mx-auto mt-3 max-w-2xl font-heading text-[clamp(1.65rem,3.2vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-gi-navy">How we work</h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">Standards that underpin every mandate — from first sketch to long-term operations.</p>
            <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
          </div>
          <div className="relative bg-white px-7 py-9 sm:px-9 sm:py-10 lg:px-10 lg:py-11 xl:px-12 xl:py-12">
            <motion.ul className="mx-auto grid max-w-6xl list-none grid-cols-1 gap-6 text-left lg:grid-cols-3 lg:gap-8" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-28px" }}>
              {standardPillars.map((p, i) => {
                const Icon = icons[i] ?? HardHat;
                return (
                  <motion.li key={p.title} variants={item}>
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gi-navy/[0.08] bg-white p-7 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] transition-[border-color,box-shadow] duration-500 hover:border-gi-navy/18 hover:shadow-[0_20px_56px_-36px_rgba(13,27,62,0.14)] sm:p-8 lg:text-left">
                      <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-primary/[0.05] transition-transform duration-500 group-hover:scale-110" aria-hidden />
                      <div className="relative mx-auto flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/12 transition-colors duration-300 group-hover:bg-primary/[0.14] lg:mx-0">
                        <Icon className="size-6 shrink-0 text-primary" aria-hidden />
                      </div>
                      <h3 className="relative mt-5 font-heading text-xl font-semibold tracking-tight text-gi-navy">{p.title}</h3>
                      <p className="relative mt-3 font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
                        {i === 2 ? (
                          <>
                            {p.description} Use our{" "}
                            <Link href="/complaint" className="font-semibold text-primary underline-offset-4 hover:underline">
                              complaint channel
                            </Link>{" "}
                            for formal feedback.
                          </>
                        ) : (
                          p.description
                        )}
                      </p>
                    </article>
                  </motion.li>
                );
              })}
            </motion.ul>
            <p className="mx-auto mt-10 max-w-3xl border-t border-border/50 pt-6 text-center font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:text-xs">Summaries for orientation; detailed standards, approvals, and escalation are defined in internal governance and operating manuals.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
