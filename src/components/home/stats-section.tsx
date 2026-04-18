"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Home, Store, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedCounter } from "@/components/home/animated-counter";
import { cn } from "@/lib/utils";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

type StatTileProps = {
  icon: LucideIcon;
  children: React.ReactNode;
  label: string;
  sublabel?: string;
  className?: string;
  size?: "default" | "hero";
};

function StatTile({ icon: Icon, children, label, sublabel, className, size = "default" }: StatTileProps) {
  const hero = size === "hero";
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-gi-navy/[0.08] bg-white p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85)] transition-[border-color,box-shadow] duration-500 hover:border-gi-navy/18 hover:shadow-[0_22px_56px_-32px_rgba(13,27,62,0.14)]",
        hero && "p-8 sm:p-9",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 size-[7.5rem] rounded-full bg-primary/[0.055] transition-transform duration-500 ease-out group-hover:scale-110" aria-hidden />
      <div className="relative flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/12 transition-colors duration-300 group-hover:bg-primary/[0.14]">
        <Icon className={cn("shrink-0 text-primary", hero ? "size-7" : "size-6")} aria-hidden />
      </div>
      <div className={cn("relative mt-5 font-sans font-bold tabular-nums tracking-tight text-primary leading-none", hero ? "text-5xl sm:text-6xl lg:text-7xl xl:text-8xl" : "text-4xl sm:text-5xl lg:text-6xl")}>{children}</div>
      <p className="relative mt-3 font-sans text-sm font-semibold leading-snug text-foreground">{label}</p>
      {sublabel ? <p className="relative mt-1.5 max-w-prose font-sans text-xs leading-relaxed text-muted-foreground">{sublabel}</p> : null}
    </div>
  );
}

export function StatsSection() {
  const reduce = useReducedMotion();
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.04 } } };
  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, ease: easeLuxury } } };
  return (
    <section id="impact" className="ds-section relative border-b border-border/60 bg-white" aria-labelledby="stats-heading">
      <div className="relative ds-container">
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.2)] lg:grid lg:min-h-[min(28rem,62vh)] lg:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={reduce ? { duration: 0 } : { duration: 0.8, ease: easeLuxury }}>
          <div className="relative flex flex-col justify-between bg-gi-navy px-8 py-12 text-white sm:px-10 sm:py-14 lg:px-11 lg:py-14 xl:px-14 xl:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_0%_100%,rgba(255,255,255,0.1),transparent_58%)]" aria-hidden />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(255,255,255,0.04)_0%,transparent_45%)]" aria-hidden />
            <div className="relative">
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/55">Achievements</p>
              <h2 id="stats-heading" className="mt-4 font-heading text-[clamp(1.65rem,3.6vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-white">Impact at a glance</h2>
              <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-white/72 sm:text-[0.9375rem]">Structured residential and commercial capacity across flagship Kabul assets, with industrial scale in cement and energy aligned to national demand.</p>
              <div className="mt-8 h-px w-20 bg-gradient-to-r from-white/45 to-transparent" aria-hidden />
            </div>
            <div className="relative mt-12 border-t border-white/12 pt-10 lg:mt-10 lg:border-t-0 lg:pt-0">
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white backdrop-blur-sm">
                  <CalendarDays className="size-6" aria-hidden />
                </div>
                <div>
                  <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/55">Established</p>
                  <p className="mt-1 font-sans text-4xl font-bold tabular-nums tracking-tight text-white sm:text-5xl">
                    <AnimatedCounter start={2000} end={2006} durationMs={1600} />
                  </p>
                  <p className="mt-1.5 font-sans text-xs leading-relaxed text-white/60">Privately held platform since incorporation.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative border-t border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] p-7 sm:p-8 lg:border-t-0 lg:border-l lg:border-border/50 lg:p-9 xl:p-11">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <motion.ul className="grid list-none grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
              <motion.li variants={item}>
                <StatTile icon={Home} label="Residential units" sublabel="Across Center, Towers, Plaza and related developments.">
                  <AnimatedCounter end={1250} suffix="+" durationMs={2400} />
                </StatTile>
              </motion.li>
              <motion.li variants={item}>
                <StatTile icon={Store} label="Commercial retail units" sublabel="Including Gulbahar Center marketplace scale.">
                  <AnimatedCounter end={1500} suffix="+" durationMs={2200} />
                </StatTile>
              </motion.li>
              <motion.li variants={item} className="sm:col-span-2">
                <StatTile icon={UsersRound} label="Industrial employment" sublabel="Cement operations direct jobs target; construction and facilities network." size="hero">
                  <AnimatedCounter end={5000} suffix="+" durationMs={2800} />
                </StatTile>
              </motion.li>
            </motion.ul>
            <p className="mt-8 border-t border-border/50 pt-6 font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:text-xs">Figures represent portfolio-scale capacity and planning targets across active and delivered assets; employment reflects cement and related operations scope.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
