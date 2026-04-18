"use client";

import { motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/data/home-premium";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

export function TestimonialsSection() {
  const reduce = useReducedMotion();
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.06 } } };
  const item = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.52, ease: easeLuxury } } };
  return (
    <section id="testimonials" className="ds-section border-b border-border/60 bg-section" aria-labelledby="testimonials-heading">
      <div className="ds-container">
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 gi-depth-panel" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeLuxury }}>
          <div className="relative border-b border-border/50 bg-gradient-to-b from-section to-primary/5 px-7 py-9 text-center sm:px-9 sm:py-10 lg:px-11 lg:py-11 xl:px-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Recognition</p>
            <h2 id="testimonials-heading" className="mx-auto mt-3 max-w-2xl font-heading text-[clamp(1.65rem,3.2vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-foreground">What partners value</h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">Themes we hear consistently from occupiers, retail partners, and advisors who work with us across the portfolio.</p>
            <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
          </div>
          <div className="relative bg-card px-7 py-9 sm:px-9 sm:py-10 lg:px-10 lg:py-11 xl:px-12 xl:py-12">
            <motion.ul className="mx-auto grid max-w-6xl list-none grid-cols-1 gap-6 md:grid-cols-3 md:gap-7 lg:gap-8" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-28px" }}>
              {testimonials.map((t, idx) => (
                <motion.li key={idx} variants={item}>
                  <figure className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-card p-7 gi-card-elevated transition-[border-color,filter] duration-500 hover:border-primary/18 sm:p-8">
                    <div className="pointer-events-none absolute -right-4 -top-4 font-heading text-[4.5rem] leading-none text-primary/[0.07] transition-opacity duration-500 group-hover:text-primary/[0.1]" aria-hidden>
                      &ldquo;
                    </div>
                    <blockquote className="relative z-[1] m-0 flex flex-1 flex-col">
                      <p className="font-heading text-[1.0625rem] font-normal leading-[1.55] text-foreground sm:text-lg sm:leading-[1.58]">&ldquo;{t.quote}&rdquo;</p>
                      <figcaption className="mt-8 border-t border-border/55 pt-6">
                        <p className="font-sans text-sm font-semibold text-primary">{t.attribution}</p>
                        <p className="mt-1.5 font-sans text-xs leading-relaxed text-muted-foreground">{t.context}</p>
                      </figcaption>
                    </blockquote>
                  </figure>
                </motion.li>
              ))}
            </motion.ul>
            <p className="mx-auto mt-10 max-w-3xl border-t border-border/50 pt-6 text-center font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:text-xs">Illustrative themes from stakeholder conversations; roles and organizations are generalized to protect confidentiality.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
