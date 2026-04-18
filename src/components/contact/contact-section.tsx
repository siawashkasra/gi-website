"use client";

import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactMap } from "@/components/contact/contact-map";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/contact";
import { cn } from "@/lib/utils";

const easeLuxury = [0.16, 1, 0.3, 1] as const;

const linkClass = "text-base font-semibold text-primary underline-offset-4 transition-colors hover:text-primary-hover hover:underline";

type ContactSectionProps = {
  showHeading?: boolean;
  className?: string;
};

export function ContactSection({ showHeading = true, className }: ContactSectionProps) {
  const reduce = useReducedMotion();
  const list = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.06 } } };
  const item = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.48, ease: easeLuxury } } };
  return (
    <div className={cn("space-y-12 lg:space-y-14", className)}>
      {showHeading ? (
        <motion.div className="overflow-hidden rounded-3xl border border-border/60 gi-depth-panel" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-72px" }} transition={reduce ? { duration: 0 } : { duration: 0.75, ease: easeLuxury }}>
          <div className="relative border-b border-border/50 bg-gradient-to-b from-section to-primary/5 px-7 py-9 text-center sm:px-9 sm:py-10 lg:px-11 lg:py-11">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden />
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary/85">Contact</p>
            <h1 className="mx-auto mt-3 max-w-2xl font-heading text-[clamp(1.75rem,3.4vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-foreground">Get in touch</h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">Reach us by phone, email, or the form — we respond to serious inquiries regarding projects, partnerships, and services.</p>
            <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
          </div>
          <motion.div className="grid lg:grid-cols-2" variants={list} initial={reduce ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, margin: "-28px" }}>
            <motion.div variants={item} className="border-b border-border/50 px-7 py-9 sm:px-9 sm:py-10 lg:border-b-0 lg:border-r lg:border-border/50 lg:px-10 lg:py-11">
              <dl className="space-y-8 text-sm">
                <div>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Address</dt>
                  <dd className="mt-2 text-base text-foreground">{contact.address}</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Email</dt>
                  <dd className="mt-2">
                    <a href={contact.mailtoHref} className={linkClass}>
                      {contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Phone</dt>
                  <dd className="mt-2 space-y-2">
                    <a href={contact.telLandlineHref} className={`block ${linkClass}`}>
                      {contact.phoneLandlineDisplay}
                    </a>
                    <a href={contact.telHref} className={`block ${linkClass}`}>
                      Mobile · {contact.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="mt-10 rounded-2xl border border-primary/12 bg-primary/5 p-6 sm:p-7">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary/90">WhatsApp</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Prefer chat? Message us on WhatsApp for a quick reply during business hours.</p>
                <Button
                  render={<a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl sm:w-auto" />}
                  nativeButton={false}
                  variant="outline"
                  className="h-12 w-full border-primary/25 bg-card px-8 text-sm font-semibold text-primary shadow-sm transition-all hover:scale-100 hover:border-primary/40 hover:bg-primary/5 hover:text-primary sm:w-auto"
                >
                  <MessageCircle className="size-5 shrink-0" aria-hidden />
                  Message on WhatsApp
                </Button>
              </div>
            </motion.div>
            <motion.div variants={item} className="bg-card p-7 sm:p-9 lg:p-10 lg:py-11">
              <div className="gi-card-elevated rounded-2xl border border-primary/10 bg-card p-6 sm:p-8">
                <ContactForm />
              </div>
            </motion.div>
          </motion.div>
          <div className="border-t border-border/50 bg-card">
            <ContactMap className="rounded-none border-0 border-t-0 shadow-none ring-0" />
          </div>
          <p className="border-t border-border/50 bg-gradient-to-b from-primary/5 to-section px-7 py-5 text-center font-sans text-[0.6875rem] leading-relaxed text-muted-foreground sm:px-9 sm:text-xs lg:px-11">Response times depend on inquiry type; formal complaints can also be routed through the dedicated complaint channel.</p>
        </motion.div>
      ) : (
        <motion.div className="gi-depth-panel mx-auto max-w-2xl overflow-hidden rounded-3xl border border-border/60 bg-card p-7 sm:p-9" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={reduce ? { duration: 0 } : { duration: 0.65, ease: easeLuxury }}>
          <ContactForm />
        </motion.div>
      )}
    </div>
  );
}
