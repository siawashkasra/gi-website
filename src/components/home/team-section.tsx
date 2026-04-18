"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { leadershipTeam } from "@/data/team";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

export function TeamSection() {
  const reduce = useReducedMotion();
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.06 } } };
  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.48, ease: easeLuxury } } };
  return (
    <section id="team" className="ds-section border-b border-border/60 bg-section" aria-labelledby="team-heading">
      <div className="ds-container">
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 gi-depth-panel" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeLuxury }}>
          <div className="relative border-b border-border/50 bg-gradient-to-b from-section to-primary/5 px-7 py-9 text-center sm:px-9 sm:py-10 lg:px-11 lg:py-11 xl:px-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">People</p>
            <h2 id="team-heading" className="mx-auto mt-3 max-w-2xl font-heading text-[clamp(1.65rem,3.2vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-foreground">Meet The Team</h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">Leadership and specialists guiding operations, finance, legal, and human resources.</p>
            <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
          </div>
          <div className="relative bg-card px-7 py-9 sm:px-9 sm:py-10 lg:px-10 lg:py-11 xl:px-12 xl:py-12">
            <motion.ul className="mx-auto grid max-w-6xl list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-28px" }}>
              {leadershipTeam.map((m) => (
                <motion.li key={m.name} variants={item}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-card p-0 gi-card-elevated transition-[border-color,filter] duration-500 hover:border-primary/18">
                    <div className="pointer-events-none absolute -right-4 -top-4 z-0 size-20 rounded-full bg-primary/[0.06] transition-transform duration-500 group-hover:scale-110" aria-hidden />
                    <div className="relative z-[1] aspect-[4/5] w-full shrink-0 bg-muted">
                      <Image src={m.photo} alt={`${m.name}, ${m.title}`} fill className="object-cover object-top transition-transform duration-[1s] ease-out group-hover:scale-[1.04]" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" />
                    </div>
                    <div className="relative border-t border-border/40 px-5 pb-6 pt-5 text-left sm:px-6 sm:pb-7 sm:pt-6">
                      <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">{m.name}</h3>
                      <p className="mt-2 font-sans text-[0.65rem] font-semibold uppercase leading-snug tracking-[0.18em] text-primary/90">{m.title}</p>
                      <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
                    </div>
                  </article>
                </motion.li>
              ))}
            </motion.ul>
            <p className="mx-auto mt-10 max-w-3xl border-t border-border/50 pt-6 text-center font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:text-xs">Representative leadership and functional leads; full organizational structure and reporting lines are outlined on the company page.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
