"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useMessages, useTranslations } from "next-intl";
import { getLocalizedMilestones, type Messages } from "@/lib/i18n/localized-data";
import { useLocalizedFormat } from "@/lib/i18n/use-localized-format";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

const defaultMilestonesImageSrc = "/images/home/milestones-side.png";

export function MilestonesSection({ imageSrc = defaultMilestonesImageSrc, imageAlt }: { imageSrc?: string; imageAlt?: string }) {
  const t = useTranslations("home.milestones");
  const messages = useMessages() as Messages;
  const milestones = getLocalizedMilestones(messages);
  const { localizeText } = useLocalizedFormat();
  const alt = imageAlt ?? t("imageAlt");
  const reduce = useReducedMotion();
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.11, delayChildren: reduce ? 0 : 0.08 } } };
  const item = { hidden: { opacity: 0, x: reduce ? 0 : -12 }, visible: { opacity: 1, x: 0, transition: { duration: reduce ? 0 : 0.48, ease: easeLuxury } } };
  return (
    <section id="milestones" className="ds-section border-b border-border/60 bg-white" aria-labelledby="milestones-heading">
      <div className="ds-container">
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeLuxury }}>
          <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 sm:px-9 sm:py-10 lg:px-11 lg:py-11 xl:px-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">{t("eyebrow")}</p>
            <h2 id="milestones-heading" className="mt-3 max-w-2xl font-heading text-[clamp(1.65rem,3.2vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-gi-navy">{t("title")}</h2>
            <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">{t("description")}</p>
            <div className="mt-6 h-px w-16 bg-gradient-to-r from-primary/35 to-transparent" aria-hidden />
          </div>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.44fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,0.4fr)]">
            <div className="relative order-2 border-t border-border/50 bg-white px-7 py-9 sm:px-9 sm:py-10 lg:order-1 lg:border-e lg:border-t-0 lg:border-border/50 lg:px-10 lg:py-11 xl:px-12 xl:py-12">
              <motion.ol className="relative m-0 list-none space-y-0 border-s border-gi-navy/12 ps-7 sm:ps-8" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-32px" }}>
                {milestones.map((m) => (
                  <motion.li key={m.title} variants={item} className="relative pb-12 ps-1 last:pb-0">
                    <span className="absolute -start-7 top-1.5 size-3 -translate-x-1/2 rounded-full border-2 border-white bg-gi-navy shadow-[0_0_0_3px_rgba(13,27,62,0.12)] sm:-start-8 rtl:translate-x-1/2" aria-hidden />
                    <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-primary/90">{localizeText(m.year)}</p>
                    <h3 className="mt-2 font-heading text-lg font-semibold tracking-tight text-gi-navy sm:text-xl">{m.title}</h3>
                    <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem] sm:leading-[1.75]">{localizeText(m.detail)}</p>
                  </motion.li>
                ))}
              </motion.ol>
              <p className="mt-10 border-t border-border/50 pt-6 font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:text-xs">{t("footnote")}</p>
            </div>
            <div className="relative order-1 min-h-[13rem] border-b border-border/50 sm:min-h-[16rem] lg:order-2 lg:min-h-0 lg:self-stretch lg:border-b-0">
              <div className="group/image relative h-full min-h-[13rem] sm:min-h-[16rem] lg:sticky lg:top-28 lg:min-h-[min(36rem,78vh)]">
                <Image src={imageSrc} alt={alt} fill className="object-cover object-center transition-transform duration-[1.05s] ease-out group-hover/image:scale-[1.03]" sizes="(max-width:1024px) 100vw, 40vw" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(13,27,62,0.65)_0%,rgba(13,27,62,0.12)_42%,transparent_68%)]" aria-hidden />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(13,27,62,0.28)_0%,transparent_45%)]" aria-hidden />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_tr,rgba(255,255,255,0.07)_0%,transparent_38%)]" aria-hidden />
                <p className="absolute bottom-5 start-5 max-w-[13rem] font-sans text-[0.6875rem] font-medium uppercase leading-relaxed tracking-[0.18em] text-white/88 sm:bottom-6 sm:start-6 sm:max-w-xs sm:text-xs">{t("imageCaption")}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
