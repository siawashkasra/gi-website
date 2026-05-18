"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight, Briefcase, Building2, Factory, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

function HighlightCard({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gi-navy/[0.08] bg-white p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] transition-[border-color,box-shadow] duration-500 hover:border-gi-navy/18 hover:shadow-[0_20px_56px_-36px_rgba(13,27,62,0.14)] sm:p-8">
      <div className="pointer-events-none absolute -end-5 -top-5 size-24 rounded-full bg-primary/[0.05] transition-transform duration-500 group-hover:scale-110" aria-hidden />
      <div className="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/12">
        <Icon className="size-5 text-primary" aria-hidden />
      </div>
      <h3 className="relative mt-5 font-heading text-lg font-semibold tracking-tight text-gi-navy">{title}</h3>
      <p className="relative mt-3 flex-1 font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">{body}</p>
    </div>
  );
}

export function JobsPageContent() {
  const t = useTranslations("jobs");
  const mailtoCareers = `mailto:${siteConfig.email}?subject=${encodeURIComponent(t("subject"))}`;
  const highlightTiles: { icon: LucideIcon; title: string; body: string }[] = [
    { icon: Building2, title: t("sector1.title"), body: t("sector1.body") },
    { icon: Factory, title: t("sector2.title"), body: t("sector2.body") },
    { icon: Briefcase, title: t("sector3.title"), body: t("sector3.body") },
  ];
  const reduce = useReducedMotion();
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.06 } } };
  const item = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.48, ease: easeLuxury } } };
  return (
    <>
      <section className="ds-section border-b border-border/60 bg-white" aria-labelledby="jobs-primary-heading">
        <div className="ds-container">
          <motion.div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeLuxury }}>
            <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 text-center sm:px-9 sm:py-10">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">{t("careers")}</p>
            <h2 id="jobs-primary-heading" className="mx-auto mt-3 max-w-2xl font-heading text-[clamp(1.65rem,3vw,2.35rem)] font-semibold leading-[1.08] tracking-tight text-gi-navy">
                {t("join")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">{t("body")}</p>
              <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
            </div>
            <div className="space-y-6 border-t border-border/50 bg-white px-7 py-9 sm:px-9 sm:py-10 sm:space-y-7 lg:px-11 lg:py-11">
              <p className="text-center font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">{t("footnote1")}</p>
              <p className="text-center font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">{t("footnote2", { email: siteConfig.email })}</p>
              <div className="flex flex-col items-stretch justify-center gap-3 pt-2 sm:flex-row sm:items-center sm:justify-center">
                <Button render={<Link href="/contact" className="inline-flex items-center justify-center gap-2" />} nativeButton={false} variant="luxurySolid" size="lg" className="h-12 rounded-xl px-8 font-semibold">
                  {t("contactUs")}
                  <ArrowRight className="ms-1 size-4 opacity-90 rtl:scale-x-[-1]" aria-hidden />
                </Button>
                <Button render={<a href={mailtoCareers} className="inline-flex items-center justify-center gap-2" />} nativeButton={false} variant="outline" size="lg" className="h-12 rounded-xl border-gi-navy/20 px-8 font-semibold text-gi-navy hover:bg-gi-navy/[0.04]">
                  <Mail className="size-4" aria-hidden />
                  {t("emailCv")}
                </Button>
              </div>
            </div>
            <p className="border-t border-border/50 bg-gradient-to-b from-gi-navy/[0.02] to-white px-7 py-5 text-center font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:px-9 sm:py-6 sm:text-xs lg:px-11">{t("footnote1")}</p>
          </motion.div>
        </div>
      </section>
      <section className="ds-section border-b border-border/60 bg-gradient-to-b from-gi-navy/[0.02] to-white" aria-labelledby="jobs-sectors-heading">
        <div className="ds-container">
          <motion.div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border/60 bg-white shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-64px" }} transition={reduce ? { duration: 0 } : { duration: 0.72, ease: easeLuxury }}>
            <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 text-center sm:px-9 sm:py-10">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">{t("sectors")}</p>
              <h2 id="jobs-sectors-heading" className="mx-auto mt-3 max-w-2xl font-heading text-[clamp(1.5rem,2.8vw,2.1rem)] font-semibold leading-tight tracking-tight text-gi-navy">
                {t("contribute")}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">{t("footnote1")}</p>
              <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
            </div>
            <motion.div className="grid gap-6 p-7 sm:gap-7 sm:p-9 md:grid-cols-3 lg:gap-8 lg:p-10" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-24px" }}>
              {highlightTiles.map((h) => (
                <motion.div key={h.title} variants={item} className="h-full">
                  <HighlightCard {...h} />
                </motion.div>
              ))}
            </motion.div>
            <p className="border-t border-border/50 bg-white px-7 py-5 text-center font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:px-9 sm:py-6 sm:text-xs">{t("footnote2", { email: siteConfig.email })}</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
