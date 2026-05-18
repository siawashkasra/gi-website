"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { useSiteContact } from "@/lib/i18n/use-site-contact";

export function ProjectStickySidebar({ project, visible }: { project: Project; visible: boolean }) {
  const t = useTranslations("projects.sidebar");
  const tSite = useTranslations("site");
  const contact = useSiteContact();
  const wa = new URL(contact.whatsappUrl);
  wa.searchParams.set("text", t("whatsappPrefill", { project: project.name }));
  const brand = tSite("name").split(" ")[0] ?? tSite("name");
  return (
    <motion.div className="pointer-events-none fixed end-6 top-1/2 z-[90] hidden w-[17.5rem] -translate-y-1/2 lg:block" initial={false} animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 24, pointerEvents: visible ? "auto" : "none" }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
      <div className="pointer-events-auto overflow-hidden rounded-2xl border border-white/18 bg-gi-navy p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_28px_64px_-20px_rgba(5,13,31,0.55)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_100%_0%,rgba(255,255,255,0.08),transparent_50%)]" aria-hidden />
        <div className="relative">
          <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/55">{t("concierge")}</p>
          <p className="mt-2 font-heading text-lg font-semibold tracking-tight text-white">{project.name}</p>
          <Button render={<Link href={`/contact?project=${encodeURIComponent(project.slug)}&intent=visit`} />} nativeButton={false} className="mt-5 h-11 w-full rounded-xl bg-gi-gold font-semibold text-gi-navy shadow-[0_8px_24px_-8px_rgba(201,168,76,0.45)] hover:bg-gi-gold-light">
            {t("bookVisit")}
          </Button>
          <a href={contact.telHref} className="mt-4 block text-center font-sans text-sm font-medium text-white/80 transition-colors hover:text-white">
            {contact.phoneDisplay}
          </a>
          <a href={wa.toString()} target="_blank" rel="noopener noreferrer" className="mt-3 block text-center font-sans text-xs font-semibold uppercase tracking-[0.16em] text-gi-gold/90 transition-colors hover:text-gi-gold">
            {t("whatsapp", { brand })}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
