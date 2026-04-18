"use client";

import Link from "next/link";
import { ArrowRight, Building2, Calendar, Home, Mail, Megaphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { type EventListItem, upcomingEvents } from "@/data/events";
import { siteConfig } from "@/lib/site";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

const mailtoEvents = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Event & partnership inquiry")}`;

const formatCards: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Home, title: "Openings & milestones", body: "Site walkthroughs, handovers, and ribbon moments tied to our residential, commercial, and industrial portfolio." },
  { icon: Megaphone, title: "Public briefings", body: "Where we share context on large-scale work with stakeholders, media, and partners — always within official channels and timing." },
  { icon: Building2, title: "Industry presence", body: "Selected forums, delegations, and trade-facing touchpoints that align with the group’s sectors and markets." },
];

function EventRow({ item }: { item: EventListItem }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gi-navy/[0.08] bg-white p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] transition-[border-color,box-shadow] duration-500 hover:border-gi-navy/18 hover:shadow-[0_20px_56px_-36px_rgba(13,27,62,0.12)] sm:p-8">
      <div className="pointer-events-none absolute -right-4 -top-4 size-28 rounded-full bg-primary/[0.05] transition-transform duration-500 group-hover:scale-110" aria-hidden />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary/90">{item.dateLabel}</p>
        {item.location ? <p className="font-sans text-xs text-muted-foreground sm:text-right">{item.location}</p> : null}
      </div>
      <h3 className="relative mt-3 font-heading text-xl font-semibold leading-snug tracking-tight text-gi-navy sm:text-2xl">{item.title}</h3>
      <p className="relative mt-3 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">{item.summary}</p>
      {item.ctaLabel && item.ctaHref ? (
        <a href={item.ctaHref} className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 transition-colors hover:underline" target={item.ctaHref.startsWith("http") ? "_blank" : undefined} rel={item.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}>
          {item.ctaLabel} <ArrowRight className="size-4" aria-hidden />
        </a>
      ) : null}
    </article>
  );
}

export function EventsPageContent() {
  const reduce = useReducedMotion();
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.06 } } };
  const item = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.48, ease: easeLuxury } } };
  return (
    <>
      <section className="ds-section border-b border-border/60 bg-white" aria-labelledby="events-calendar-heading">
        <div className="ds-container">
          <motion.div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeLuxury }}>
            <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 text-center sm:px-9 sm:py-10">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Calendar</p>
              <h2 id="events-calendar-heading" className="mx-auto mt-3 max-w-2xl font-heading text-[clamp(1.65rem,3vw,2.35rem)] font-semibold leading-[1.08] tracking-tight text-gi-navy">
                {upcomingEvents.length > 0 ? "Upcoming" : "Programme"}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">Published notices for public-facing milestones, briefings, and group-hosted moments.</p>
              <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
            </div>
            <div className="space-y-6 border-t border-border/50 bg-white px-7 py-9 sm:px-9 sm:py-10 sm:space-y-8 lg:px-11 lg:py-11">
              {upcomingEvents.length > 0 ? (
                <motion.div className="space-y-6" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-24px" }}>
                  {upcomingEvents.map((e) => (
                    <motion.div key={e.id} variants={item}>
                      <EventRow item={e} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-gi-navy/15 bg-gi-navy/[0.02] px-8 py-12 text-center sm:px-10 sm:py-14">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-gi-navy/10 bg-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] text-primary">
                    <Calendar className="size-7" aria-hidden />
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-semibold tracking-tight text-gi-navy sm:text-2xl">No public events scheduled</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">When dates are confirmed, they will appear here. For press, speaking invitations, and partnership walkthroughs, message us and reference your sector or project interest.</p>
                  <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center">
                    <Button render={<Link href="/contact" className="inline-flex items-center justify-center gap-2" />} nativeButton={false} variant="luxurySolid" size="lg" className="h-12 rounded-xl px-8 font-semibold">
                      Contact
                      <ArrowRight className="size-4 opacity-90" aria-hidden />
                    </Button>
                    <Button render={<a href={mailtoEvents} className="inline-flex items-center justify-center gap-2" />} nativeButton={false} variant="outline" size="lg" className="h-12 rounded-xl border-gi-navy/20 px-8 font-semibold text-gi-navy hover:bg-gi-navy/[0.04]">
                      <Mail className="size-4" aria-hidden />
                      Email the team
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <p className="border-t border-border/50 bg-gradient-to-b from-gi-navy/[0.02] to-white px-7 py-5 text-center font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:px-9 sm:py-6 sm:text-xs lg:px-11">Listings are informational; attendance and media access are subject to confirmation, capacity, and policy.</p>
          </motion.div>
        </div>
      </section>
      <section className="ds-section border-b border-border/60 bg-gradient-to-b from-gi-navy/[0.02] to-white" aria-labelledby="events-formats-heading">
        <div className="ds-container">
          <motion.div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border/60 bg-white shadow-[0_28px_90px_-42px_rgba(13,27,62,0.18)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-64px" }} transition={reduce ? { duration: 0 } : { duration: 0.72, ease: easeLuxury }}>
            <div className="relative border-b border-border/50 bg-gradient-to-b from-white to-gi-navy/[0.02] px-7 py-9 text-center sm:px-9 sm:py-10">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Formats</p>
              <h2 id="events-formats-heading" className="mx-auto mt-3 max-w-2xl font-heading text-[clamp(1.5rem,2.8vw,2.1rem)] font-semibold leading-tight tracking-tight text-gi-navy">
                What you might see on this page
              </h2>
              <p className="mx-auto mt-3 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">Illustrative categories — not every format runs every year.</p>
              <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
            </div>
            <motion.div className="grid gap-6 p-7 sm:gap-7 sm:p-9 md:grid-cols-3 lg:gap-8 lg:p-10" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-24px" }}>
              {formatCards.map((c) => {
                const Icon = c.icon;
                return (
                  <motion.div key={c.title} variants={item} className="h-full">
                    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gi-navy/[0.08] bg-white p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] sm:p-8">
                      <div className="pointer-events-none absolute -right-4 -top-4 size-24 rounded-full bg-primary/[0.05] transition-transform duration-500 group-hover:scale-110" aria-hidden />
                      <div className="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/12">
                        <Icon className="size-5 text-primary" aria-hidden />
                      </div>
                      <h3 className="relative mt-5 font-heading text-lg font-semibold tracking-tight text-gi-navy">{c.title}</h3>
                      <p className="relative mt-3 flex-1 font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">{c.body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            <p className="border-t border-border/50 bg-white px-7 py-5 text-center font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:px-9 sm:py-6 sm:text-xs">Gulbahar may announce events through official channels; this page mirrors what is published for a public network audience.</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
