"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ceoProfile } from "@/data/company-profile";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

const ceoPortrait = "/images/ghulam-rabani-rabani.png";

type CeoMessageSectionProps = { sectionId?: string; headingId?: string };

export function CeoMessageSection({ sectionId = "ceo-message", headingId = "ceo-message-heading" }: CeoMessageSectionProps) {
  const reduce = useReducedMotion();
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.14 } } };
  const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.48, ease: easeLuxury } } };
  return (
    <section id={sectionId} className="ds-section border-b border-border/60 bg-white" aria-labelledby={headingId}>
      <div className="ds-container">
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)] lg:grid lg:min-h-[min(26rem,70vh)] lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.78, ease: easeLuxury }}>
          <div className="relative order-2 min-h-[15rem] border-b border-border/50 sm:min-h-[18rem] lg:order-1 lg:min-h-0 lg:border-b-0 lg:border-r lg:border-border/50">
            <div className="group/image relative h-full min-h-[15rem] sm:min-h-[18rem] lg:min-h-[min(32rem,72vh)]">
              <Image src={ceoPortrait} alt="Ghulam Rabani Rabani, Chief Executive Officer" fill className="object-cover object-[center_12%] transition-transform duration-[1.05s] ease-out group-hover/image:scale-[1.03]" sizes="(max-width:1024px) 100vw, 42vw" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(13,27,62,0.68)_0%,rgba(13,27,62,0.15)_40%,transparent_65%)]" aria-hidden />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(13,27,62,0.32)_0%,transparent_48%)]" aria-hidden />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_tr,rgba(255,255,255,0.06)_0%,transparent_40%)]" aria-hidden />
              <p className="absolute bottom-5 left-5 max-w-[14rem] font-sans text-[0.6875rem] font-medium uppercase leading-relaxed tracking-[0.18em] text-white/88 sm:bottom-6 sm:left-6 sm:max-w-xs sm:text-xs">Chief Executive Officer</p>
            </div>
          </div>
          <div className="relative order-1 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 sm:px-9 sm:py-10 lg:order-2 lg:flex lg:flex-col lg:justify-center lg:px-10 lg:py-11 xl:px-12 xl:py-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <motion.div variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-28px" }}>
              <motion.div variants={item}>
                <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Leadership</p>
                <h2 id={headingId} className="mt-3 font-heading text-[clamp(1.65rem,3vw,2.35rem)] font-semibold leading-[1.08] tracking-tight text-gi-navy">Message From The CEO</h2>
                <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">A note on service quality, delivery discipline, and how the group approaches its customers and markets.</p>
                <div className="mt-5 h-px w-16 bg-gradient-to-r from-primary/35 to-transparent" aria-hidden />
              </motion.div>
              <motion.div variants={item} className="mt-8">
                <p className="max-w-2xl font-heading text-[1.0625rem] font-normal leading-[1.62] text-gi-navy sm:text-lg sm:leading-[1.65]">&ldquo;{ceoProfile.quote}&rdquo;</p>
              </motion.div>
              <motion.footer variants={item} className="mt-10 border-t border-border/55 pt-8">
                <p className="font-heading text-2xl font-semibold tracking-tight text-gi-navy sm:text-[1.75rem]">{ceoProfile.name}</p>
                <p className="mt-2 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary/90">{ceoProfile.title}</p>
              </motion.footer>
              <motion.p variants={item} className="mt-8 max-w-2xl border-t border-border/50 pt-6 font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:text-xs">Executive message reflects group priorities; operational updates and disclosures appear through official channels and the company profile.</motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
