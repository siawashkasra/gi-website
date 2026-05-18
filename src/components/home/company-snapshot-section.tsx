"use client";

import { ArrowRight, Building2, Globe2, Landmark, Layers3, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useMessages, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { homeHighlights } from "@/data/company-profile";
import { getLocalizedCompanySnapshot, type Messages } from "@/lib/i18n/localized-data";
import { useLocalizedFormat } from "@/lib/i18n/use-localized-format";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

const icons = [Building2, MapPin, Globe2, Layers3, Landmark, Building2, Building2, Layers3, Landmark] as const;

function SnapshotTile({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  const { localizeText } = useLocalizedFormat();
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gi-navy/[0.08] bg-white p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85)] transition-[border-color,box-shadow] duration-500 hover:border-gi-navy/18 hover:shadow-[0_18px_48px_-30px_rgba(13,27,62,0.12)] sm:p-7">
      <div className="pointer-events-none absolute -end-7 -top-7 size-[6.5rem] rounded-full bg-primary/[0.05] transition-transform duration-500 ease-out group-hover:scale-110" aria-hidden />
      <div className="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/12 transition-colors duration-300 group-hover:bg-primary/[0.14]">
        <Icon className="size-5 text-primary" aria-hidden />
      </div>
      <p className="relative mt-4 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary/85">{label}</p>
      <p className="relative mt-2 flex-1 font-sans text-sm font-medium leading-relaxed text-foreground sm:text-[0.9375rem]">{localizeText(value)}</p>
    </div>
  );
}

export function CompanySnapshotSection() {
  const t = useTranslations("home.snapshot");
  const { formatNumber } = useLocalizedFormat();
  const messages = useMessages() as Messages;
  const rows = getLocalizedCompanySnapshot(messages, homeHighlights.snapshotHomeCount);
  const reduce = useReducedMotion();
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: reduce ? 0 : 0.06 } } };
  const item = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.45, ease: easeLuxury } } };
  return (
    <section id="snapshot" className="ds-section relative border-b border-border/60 bg-white" aria-labelledby="snapshot-heading">
      <div className="relative ds-container">
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)] lg:grid lg:min-h-[min(26rem,58vh)] lg:grid-cols-[minmax(0,1fr)_minmax(0,17.5rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,19.5rem)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeLuxury }}>
          <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] p-7 sm:p-8 lg:border-b-0 lg:border-e lg:border-border/50 lg:p-9 xl:p-11">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <div className="relative max-w-3xl">
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/80">{t("eyebrow")}</p>
              <h2 id="snapshot-heading" className="mt-3 font-heading text-[clamp(1.65rem,3.4vw,2.5rem)] font-semibold leading-[1.08] tracking-tight text-gi-navy">{t("title")}</h2>
              <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">{t("description")}</p>
              <div className="mt-6 h-px w-16 bg-gradient-to-r from-primary/35 to-transparent" aria-hidden />
            </div>
            <motion.ul className="mt-10 grid list-none grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-36px" }}>
              {rows.map((row, i) => {
                const Icon = icons[i] ?? Building2;
                return (
                  <motion.li key={row.label} variants={item}>
                    <SnapshotTile icon={Icon} label={row.label} value={row.value} />
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
          <div className="relative flex flex-col justify-between bg-gi-navy px-8 py-10 text-white sm:px-9 sm:py-11 lg:px-8 lg:py-12 xl:px-10 xl:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_65%_at_100%_0%,rgba(255,255,255,0.1),transparent_55%)]" aria-hidden />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(195deg,rgba(255,255,255,0.035)_0%,transparent_42%)]" aria-hidden />
            <div className="relative">
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-white/55">{t("governance")}</p>
              <p className="mt-3 font-heading text-lg font-semibold leading-snug tracking-tight text-white xl:text-xl">{t("governanceSub")}</p>
            </div>
            <div className="relative mt-10 lg:mt-12">
              <div className="flex items-baseline gap-2 border-b border-white/10 pb-8">
                <span className="font-heading text-5xl font-semibold tabular-nums tracking-tight text-white sm:text-6xl">{formatNumber(rows.length)}</span>
                <span className="pb-1 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/50">{t("facts")}</span>
              </div>
              <Button render={<Link href={`${homeHighlights.companyCtaPath}#governance`} />} nativeButton={false} variant="outline" size="lg" className="mt-8 h-12 w-full rounded-xl border-white/35 bg-white/[0.04] px-6 font-semibold text-white shadow-none backdrop-blur-sm transition-all hover:scale-100 hover:border-white/55 hover:bg-white/10 hover:text-white">
                {t("governanceStructure")}
                <ArrowRight className="ms-2 size-4 opacity-90 rtl:scale-x-[-1]" aria-hidden />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
