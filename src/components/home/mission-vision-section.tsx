"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMessages, useTranslations } from "next-intl";
import { getLocalizedCompanyMission, getLocalizedCompanyVision, type Messages } from "@/lib/i18n/localized-data";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

export function MissionVisionSection() {
  const t = useTranslations("home.missionVision");
  const messages = useMessages() as Messages;
  const companyMission = getLocalizedCompanyMission(messages);
  const companyVision = getLocalizedCompanyVision(messages);
  const reduce = useReducedMotion();
  const item = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.52, ease: easeLuxury } } };
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.14, delayChildren: reduce ? 0 : 0.08 } } };
  return (
    <section id="mission-vision" className="ds-section border-b border-border/60 bg-white" aria-labelledby="mission-vision-heading">
      <div className="ds-container">
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeLuxury }}>
          <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 text-center sm:px-9 sm:py-10 lg:px-11 lg:py-11 xl:px-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">{t("eyebrow")}</p>
            <h2 id="mission-vision-heading" className="mx-auto mt-3 max-w-2xl font-heading text-[clamp(1.65rem,3.2vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-gi-navy">{t("title")}</h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">{t("subtitle")}</p>
            <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
          </div>
          <motion.div className="grid md:grid-cols-2" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-24px" }}>
            <motion.div variants={item} className="relative border-b border-border/50 bg-white px-7 py-9 sm:px-9 sm:py-10 md:border-b-0 md:border-e md:border-border/50 lg:px-11 lg:py-12 xl:px-12 xl:py-14">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_0%_0%,rgba(13,27,62,0.04),transparent_55%)]" aria-hidden />
              <div className="relative">
                <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary/90">{t("purpose")}</p>
                <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-gi-navy sm:text-[1.75rem]">{t("mission")}</h3>
                <p className="mt-6 font-sans text-base font-normal leading-[1.75] text-foreground sm:text-lg sm:leading-[1.78]">{companyMission}</p>
              </div>
            </motion.div>
            <motion.div variants={item} className="relative bg-gi-navy px-7 py-9 text-white sm:px-9 sm:py-10 lg:px-11 lg:py-12 xl:px-12 xl:py-14">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_65%_at_100%_0%,rgba(255,255,255,0.1),transparent_55%)]" aria-hidden />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(195deg,rgba(255,255,255,0.04)_0%,transparent_45%)]" aria-hidden />
              <div className="relative">
                <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/55">{t("ambition")}</p>
                <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">{t("vision")}</h3>
                <p className="mt-6 font-sans text-base font-normal leading-[1.75] text-white/88 sm:text-lg sm:leading-[1.78]">{companyVision}</p>
              </div>
            </motion.div>
          </motion.div>
          <p className="border-t border-border/50 bg-white px-7 py-6 text-center font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:px-9 sm:text-xs lg:px-11">{t("footnote")}</p>
        </motion.div>
      </div>
    </section>
  );
}
