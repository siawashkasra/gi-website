"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/contact";
import { siteConfig } from "@/lib/site";

export function ProjectStickySidebar({ project, visible }: { project: Project; visible: boolean }) {
  const wa = new URL(contact.whatsappUrl);
  wa.searchParams.set("text", `Hello — I would like to book a visit regarding ${project.name}.`);
  return (
    <motion.div className="pointer-events-none fixed right-6 top-1/2 z-[90] hidden w-[17.5rem] -translate-y-1/2 lg:block" initial={false} animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 24, pointerEvents: visible ? "auto" : "none" }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
      <div className="gi-depth-panel pointer-events-auto overflow-hidden rounded-2xl border border-border/80 bg-card p-6 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_100%_0%,color-mix(in_srgb,var(--color-primary)_6%,transparent),transparent_50%)]" aria-hidden />
        <div className="relative">
          <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Concierge</p>
          <p className="mt-2 font-heading text-lg font-semibold tracking-tight text-foreground">{project.name}</p>
          <Button render={<Link href={`/contact?project=${encodeURIComponent(project.slug)}&intent=visit`} />} nativeButton={false} className="mt-5 h-11 w-full rounded-xl bg-primary font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">
            Book a Visit
          </Button>
          <a href={contact.telHref} className="mt-4 block text-center font-sans text-sm font-medium text-primary transition-colors hover:text-primary-hover">
            {contact.phoneDisplay}
          </a>
          <a href={wa.toString()} target="_blank" rel="noopener noreferrer" className="mt-3 block text-center font-sans text-xs font-semibold uppercase tracking-[0.16em] text-gi-gold transition-colors hover:text-gi-gold-dark">
            WhatsApp {siteConfig.name.split(" ")[0]}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
