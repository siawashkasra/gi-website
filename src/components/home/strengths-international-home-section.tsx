"use client";

import Link from "next/link";
import { ArrowRight, Globe2, Shield, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { competitiveStrengths, homeHighlights, internationalPresence, leadFromBody } from "@/data/company-profile";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

export function StrengthsInternationalHomeSection() {
  const reduce = useReducedMotion();
  const teaserStrengths = homeHighlights.competitiveStrengthIndices.map((i) => competitiveStrengths[i]).filter(Boolean);
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.06 } } };
  const item = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.46, ease: easeLuxury } } };
  const listB = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.04 } } };
  return (
    <section className="ds-section border-b border-border/60 bg-section" aria-labelledby="positioning-heading">
      <div className="ds-container">
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 gi-depth-panel" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeLuxury }}>
          <div id="home-governance" className="relative bg-primary px-7 py-10 text-white sm:px-9 sm:py-11 lg:px-11 lg:py-12 xl:px-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_65%_at_100%_0%,rgba(255,255,255,0.1),transparent_55%)]" aria-hidden />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(195deg,rgba(255,255,255,0.04)_0%,transparent_45%)]" aria-hidden />
            <div className="relative max-w-3xl">
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/55">Governance</p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/78 sm:text-[0.9375rem] sm:leading-[1.65]">{homeHighlights.governanceTeaser}</p>
              <Button render={<Link href={`${homeHighlights.companyCtaPath}#governance`} />} nativeButton={false} variant="outline" size="lg" className="mt-7 h-12 rounded-xl border-white/35 bg-white/[0.04] px-6 font-semibold text-white shadow-none backdrop-blur-sm transition-all hover:scale-100 hover:border-white/55 hover:bg-white/10 hover:text-white">
                How the board and management operate
                <ArrowRight className="ml-2 size-4 opacity-90" aria-hidden />
              </Button>
            </div>
          </div>
          <div className="relative border-t border-border/50 bg-gradient-to-b from-section to-primary/5">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <div className="px-7 pb-2 pt-10 text-center sm:px-9 sm:pt-11 lg:px-11 lg:pt-12 xl:px-12">
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Advantage</p>
              <h2 id="positioning-heading" className="mx-auto mt-3 max-w-2xl font-heading text-[clamp(1.65rem,3.2vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-foreground">Strengths & reach</h2>
              <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">Selective highlights from the competitive platform and international connectivity.</p>
              <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
            </div>
            <motion.div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-7 pb-10 pt-8 sm:px-9 lg:grid-cols-3 lg:gap-7 lg:px-11 lg:pb-11 xl:px-12" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-24px" }}>
              {teaserStrengths.map((s) => (
                <motion.article key={s.order} variants={item} className="group relative flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-card p-7 gi-card-elevated transition-[border-color,filter] duration-500 hover:border-primary/18">
                  <div className="pointer-events-none absolute -right-5 -top-5 size-20 rounded-full bg-primary/[0.05] transition-transform duration-500 group-hover:scale-110" aria-hidden />
                  <div className="relative flex size-10 items-center justify-center rounded-lg bg-primary/10 font-sans text-lg font-semibold tabular-nums text-primary ring-1 ring-primary/12">{s.order}</div>
                  <h3 className="relative mt-4 font-heading text-lg font-semibold tracking-tight text-foreground">{s.title}</h3>
                  <p className="relative mt-2 font-sans text-sm leading-relaxed text-muted-foreground">{leadFromBody(s.body, 200)}</p>
                </motion.article>
              ))}
            </motion.div>
            <div className="mx-7 border-t border-border/50 sm:mx-9 lg:mx-11 xl:mx-12" />
            <motion.div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-7 py-10 sm:px-9 md:grid-cols-3 md:gap-7 lg:px-11 lg:py-11 xl:px-12" variants={listB} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-20px" }}>
              {[
                { icon: Globe2, title: "UAE presence", body: leadFromBody(internationalPresence.uae, 220) },
                { icon: Sparkles, title: "Regional links", body: leadFromBody(internationalPresence.regional, 220) },
                { icon: Shield, title: "Cross-border", body: leadFromBody(internationalPresence.crossBorder, 220) },
              ].map((block) => {
                const Icon = block.icon;
                return (
                  <motion.article key={block.title} variants={item} className="group relative flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-card p-6 gi-card-elevated transition-[border-color,filter] duration-500 hover:border-primary/18 sm:p-7">
                    <div className="relative flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/12">
                      <Icon className="size-5 shrink-0 text-primary" aria-hidden />
                    </div>
                    <h3 className="relative mt-4 font-heading text-lg font-semibold tracking-tight text-foreground">{block.title}</h3>
                    <p className="relative mt-2 font-sans text-sm leading-relaxed text-muted-foreground">{block.body}</p>
                  </motion.article>
                );
              })}
            </motion.div>
            <div className="flex justify-center px-7 pb-8 pt-2 sm:px-9 lg:px-11 xl:px-12">
              <Button render={<Link href={`${homeHighlights.companyCtaPath}#market`} />} nativeButton={false} size="lg" className="h-12 rounded-xl px-8 font-semibold hover:scale-100">
                Market positioning & outlook
                <ArrowRight className="ml-2 size-4 opacity-90" aria-hidden />
              </Button>
            </div>
            <p className="mx-auto max-w-3xl border-t border-border/50 px-7 py-6 text-center font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:px-9 sm:text-xs lg:px-11 xl:px-12">Governance detail and market context continue on the company profile; this view is a curated summary for the home page.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
