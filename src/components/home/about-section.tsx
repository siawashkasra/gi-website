"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { companyAbout, homeHighlights } from "@/data/company-profile";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

const imageSrc = "/images/home/about-multi-sector-platform.png";

export function AboutSection() {
  const reduce = useReducedMotion();
  const paras = companyAbout.paragraphs.slice(0, homeHighlights.aboutParagraphCount);
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.12 } } };
  const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, ease: easeLuxury } } };
  return (
    <section id="about" className="ds-section border-b border-border/60 bg-white" aria-labelledby="about-heading">
      <div className="ds-container">
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)] lg:grid lg:min-h-[min(28rem,72vh)] lg:grid-cols-[minmax(0,0.46fr)_minmax(0,1fr)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.78, ease: easeLuxury }}>
          <div className="group/image relative min-h-[14rem] border-b border-border/50 sm:min-h-[18rem] lg:min-h-full lg:border-b-0 lg:border-r lg:border-border/50">
            <Image src={imageSrc} alt="Gulbahar Plaza mixed-use development" fill className="object-cover object-center transition-transform duration-[1.05s] ease-out group-hover/image:scale-[1.03]" sizes="(max-width:1024px) 100vw, 46vw" priority={false} />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(13,27,62,0.72)_0%,rgba(13,27,62,0.18)_38%,transparent_62%)]" aria-hidden />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(13,27,62,0.35)_0%,transparent_48%)]" aria-hidden />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_tr,rgba(255,255,255,0.06)_0%,transparent_40%)]" aria-hidden />
            <p className="absolute bottom-5 left-5 max-w-[14rem] font-sans text-[0.6875rem] font-medium uppercase leading-relaxed tracking-[0.18em] text-white/88 sm:bottom-6 sm:left-6 sm:max-w-xs sm:text-xs">Flagship mixed-use — Kabul</p>
          </div>
          <div className="relative bg-gradient-to-b from-white to-gi-navy/[0.02] p-7 sm:p-8 lg:flex lg:flex-col lg:justify-center lg:p-10 xl:p-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <div>
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">About Gulbahar Investment</p>
              <h2 id="about-heading" className="mt-3 font-heading text-[clamp(1.65rem,3.2vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-gi-navy">{companyAbout.headline}</h2>
              <div className="mt-5 h-px w-16 bg-gradient-to-r from-primary/35 to-transparent" aria-hidden />
            </div>
            <motion.div className="mt-8 space-y-5" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-28px" }}>
              {paras.map((p, i) => (
                <motion.p key={i} variants={item} className="font-sans text-sm leading-[1.75] text-muted-foreground sm:text-[0.9375rem] sm:leading-[1.8] lg:text-base lg:leading-[1.82]">
                  {p}
                </motion.p>
              ))}
            </motion.div>
            <div className="mt-10">
              <Button render={<Link href={homeHighlights.companyCtaPath} />} nativeButton={false} variant="outline" size="lg" className="h-12 rounded-xl border-gi-navy/20 bg-white px-8 font-semibold text-gi-navy shadow-sm transition-all hover:scale-100 hover:border-gi-navy/35 hover:bg-gi-navy/[0.04] hover:text-gi-navy">
                Full company profile
                <ArrowRight className="ml-2 size-4 opacity-90" aria-hidden />
              </Button>
            </div>
            <p className="mt-8 border-t border-border/50 pt-6 font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:text-xs">Opening narrative from the company profile; leadership, governance, and market positioning continue on the company page.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
