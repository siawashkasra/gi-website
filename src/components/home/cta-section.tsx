"use client";

import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ContactForm } from "@/components/contact/contact-form";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/contact";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

const chipClass =
  "inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/[0.08] px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/45 hover:bg-white/15";

export function CtaSection() {
  const reduce = useReducedMotion();
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.05 } } };
  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, ease: easeLuxury } } };
  return (
    <section id="contact-cta" className="ds-section border-b border-border/60 bg-white">
      <div className="ds-container">
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 shadow-[0_28px_90px_-42px_rgba(13,27,62,0.2)]" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.78, ease: easeLuxury }}>
          <motion.div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-24px" }}>
            <motion.div variants={item} className="relative bg-gi-navy px-7 py-10 text-white sm:px-9 sm:py-11 lg:px-10 lg:py-12 xl:px-11">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_65%_at_100%_0%,rgba(255,255,255,0.1),transparent_55%)]" aria-hidden />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(195deg,rgba(255,255,255,0.04)_0%,transparent_45%)]" aria-hidden />
                <div className="relative">
                  <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/55">Contact</p>
                  <h2 className="mt-3 font-heading text-[clamp(1.85rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-tight text-white">Get in touch</h2>
                  <p className="mt-5 max-w-xl font-sans text-base font-normal leading-relaxed text-white/78 sm:text-lg sm:leading-[1.65]">Serious inquiries about projects, partnerships, or services — reach us directly or send a message.</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href={contact.mailtoHref} className={chipClass}>
                      <Mail className="size-4 shrink-0 text-white/90" aria-hidden />
                      Email
                    </a>
                    <a href={contact.telHref} className={chipClass}>
                      <Phone className="size-4 shrink-0 text-white/90" aria-hidden />
                      Mobile
                    </a>
                    <a href={contact.telLandlineHref} className={chipClass}>
                      <Phone className="size-4 shrink-0 text-white/90" aria-hidden />
                      Landline
                    </a>
                    <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className={chipClass}>
                      <MessageCircle className="size-4 shrink-0 text-white/90" aria-hidden />
                      WhatsApp
                    </a>
                  </div>
                  <p className="mt-8 font-sans text-sm text-white/68">
                    Hiring? See open roles on our{" "}
                    <Link href="/jobs" className="font-semibold text-white underline-offset-4 transition-colors hover:text-white/90 hover:underline">
                      Jobs
                    </Link>{" "}
                    page.
                  </p>
                  <Button render={<Link href="/contact" />} nativeButton={false} variant="outline" size="sm" className="mt-6 h-10 border-white/35 bg-white/[0.06] text-white backdrop-blur-sm transition-all hover:scale-100 hover:border-white/55 hover:bg-white/12 hover:text-white">
                    Full contact page & map
                    <ArrowRight className="ml-2 size-4 opacity-90" aria-hidden />
                  </Button>
                </div>
              </motion.div>
              <motion.div variants={item} className="relative border-t border-border/50 bg-white p-7 sm:p-9 lg:border-t-0 lg:border-l lg:border-border/50 lg:p-10 xl:p-11">
                <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary/85">Send a message</p>
                <div className="mt-4 rounded-2xl border border-gi-navy/[0.08] bg-white p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95)] sm:p-6">
                  <ContactForm compact />
                </div>
              </motion.div>
          </motion.div>
          <p className="border-t border-border/50 bg-gradient-to-b from-gi-navy/[0.02] to-white px-7 py-5 text-center font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:px-9 sm:text-xs lg:px-11">Inquiries are triaged by mandate; detailed address, channels, and map appear on the full contact page.</p>
        </motion.div>
      </div>
    </section>
  );
}
