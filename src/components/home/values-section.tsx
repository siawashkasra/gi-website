"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CompanyValueItem } from "@/data/company-profile";
import { companyValues } from "@/data/company-profile";
import { cn } from "@/lib/utils";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

const FEATURED_VALUE_TITLE = "Integrity";

function ValueCard({ title, body, featured = false }: Pick<CompanyValueItem, "title" | "body"> & { featured?: boolean }) {
  return (
    <article
      className={cn(
        "group relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl transition-[border-color,filter] duration-500",
        featured
          ? "border border-white/15 bg-primary text-white hover:border-white/28"
          : "gi-card-elevated border border-primary/10 bg-card hover:border-primary/18",
        featured ? "p-8 sm:p-9 lg:p-10" : "p-7 sm:p-8",
      )}
    >
      {featured ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_65%_at_100%_0%,rgba(255,255,255,0.1),transparent_55%)]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(195deg,rgba(255,255,255,0.04)_0%,transparent_45%)]" aria-hidden />
        </>
      ) : (
        <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-primary/[0.05] transition-transform duration-500 group-hover:scale-110" aria-hidden />
      )}
      <h3 className={cn("relative z-[1] font-heading font-semibold tracking-tight", featured ? "text-2xl text-white sm:text-[1.65rem] lg:text-[1.75rem]" : "text-xl text-foreground")}>{title}</h3>
      <p className={cn("relative z-[1] mt-3 flex-1 font-sans font-normal leading-relaxed", featured ? "text-base text-white/88 sm:text-[1.0625rem] sm:leading-[1.75]" : "text-sm text-muted-foreground")}>{body}</p>
    </article>
  );
}

export function ValuesSection() {
  const reduce = useReducedMotion();
  const featuredIndex = companyValues.findIndex((v) => v.title === FEATURED_VALUE_TITLE);
  const featured = companyValues[featuredIndex >= 0 ? featuredIndex : 0]!;
  const others = companyValues.filter((v) => v.title !== featured.title);
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.06 } } };
  const item = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.46, ease: easeLuxury } } };
  return (
    <section id="values" className="ds-section border-b border-border/60 bg-section" aria-labelledby="values-heading">
      <div className="ds-container">
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 gi-depth-panel" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeLuxury }}>
          <div className="relative border-b border-border/50 bg-gradient-to-b from-section to-primary/5 px-7 py-9 text-center sm:px-9 sm:py-10 lg:px-11 lg:py-11 xl:px-12">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Principles</p>
            <h2 id="values-heading" className="mx-auto mt-3 max-w-2xl font-heading text-[clamp(1.65rem,3.2vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-foreground">Core values</h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">The standards that guide governance, delivery, and relationships across the group.</p>
          </div>
          <div className="relative bg-card px-7 py-9 sm:px-9 sm:py-10 lg:px-10 lg:py-11 xl:px-12 xl:py-12">
            <motion.div className="mx-auto flex max-w-6xl flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-8" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-28px" }}>
              <motion.div variants={item} className="lg:col-span-5">
                <ValueCard title={featured.title} body={featured.body} featured />
              </motion.div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-2 lg:gap-6">
                {others.map((v) => (
                  <motion.div key={v.title} variants={item}>
                    <ValueCard title={v.title} body={v.body} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <p className="mx-auto mt-10 max-w-3xl border-t border-border/50 pt-6 text-center font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:text-xs">Values express institutional expectations; policies, procedures, and governance detail how they are applied in practice.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
