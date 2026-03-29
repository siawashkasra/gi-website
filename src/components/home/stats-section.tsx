"use client";

import { BriefcaseBusiness, CalendarDays, Home, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedCounter } from "@/components/home/animated-counter";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

type StatBlockProps = {
  icon: LucideIcon;
  children: React.ReactNode;
  label: string;
  sublabel?: string;
  className?: string;
};

function StatBlock({ icon: Icon, children, label, sublabel, className }: StatBlockProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 shadow-lg transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/[0.06] hover:scale-[1.02]",
        className
      )}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-primary/[0.06] transition-transform duration-500 group-hover:scale-110" aria-hidden />
      <div className="relative flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors duration-300 group-hover:bg-primary/15 group-hover:ring-primary/25">
        <Icon className="size-7" aria-hidden />
      </div>
      <div className="relative mt-6 font-serif text-5xl font-bold tracking-tight text-primary sm:text-6xl sm:leading-none lg:text-7xl">{children}</div>
      <p className="relative mt-2 text-sm font-semibold text-foreground">{label}</p>
      {sublabel ? <p className="relative mt-1 text-xs text-muted-foreground">{sublabel}</p> : null}
    </div>
  );
}

export function StatsSection() {
  return (
    <section id="impact" className="ds-section relative border-b border-border/60 bg-white" aria-labelledby="stats-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--color-primary)/0.08,transparent)]" aria-hidden />
      <div className="relative ds-container">
        <SectionHeading id="stats-heading" align="center" eyebrow="Achievements" title="Impact at a glance" description="We have provided thousands of Afghans with jobs and helped build skills that serve communities — alongside housing, commerce, and major infrastructure." className="mx-auto max-w-2xl" />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <StatBlock icon={Home} label="Apartments" sublabel="Residential units delivered & under development">
            <AnimatedCounter end={700} suffix="+" durationMs={2400} />
          </StatBlock>
          <StatBlock icon={BriefcaseBusiness} label="Businesses" sublabel="Tenants and commercial partners served">
            <AnimatedCounter end={200} suffix="+" durationMs={2000} />
          </StatBlock>
          <StatBlock icon={CalendarDays} label="Established since" sublabel="Nearly two decades of continuous operations">
            <AnimatedCounter start={2000} end={2006} durationMs={1400} />
          </StatBlock>
          <StatBlock icon={UsersRound} label="Livelihoods supported" sublabel="Employment, training, and contractor networks across our projects">
            <AnimatedCounter end={3000} suffix="+" durationMs={2600} />
          </StatBlock>
        </div>
      </div>
    </section>
  );
}
