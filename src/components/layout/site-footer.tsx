"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Facebook, Instagram } from "lucide-react";
import { LogoMark } from "@/components/shared/logo-mark";
import { Separator } from "@/components/ui/separator";
import { useSiteContact } from "@/lib/i18n/use-site-contact";
import { useLocalizedFormat } from "@/lib/i18n/use-localized-format";
import { siteConfig } from "@/lib/site";
import { useMessages } from "next-intl";
import { getLocalizedProjects, type Messages } from "@/lib/i18n/localized-data";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tSite = useTranslations("site");
  const messages = useMessages() as Messages;
  const contact = useSiteContact();
  const { formatNumber } = useLocalizedFormat();
  const projects = getLocalizedProjects(messages).slice(0, 5);
  const year = formatNumber(new Date().getFullYear());
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gi-navy text-white" role="contentinfo">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_65%_at_100%_0%,rgba(255,255,255,0.1),transparent_55%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(195deg,rgba(255,255,255,0.04)_0%,transparent_45%)]" aria-hidden />
      <div className="relative z-[1] ds-container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <LogoMark variant="light" />
            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-white/70">{tSite("description")}</p>
          </div>
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/55">{t("explore")}</p>
            <ul className="mt-4 space-y-3 font-sans text-sm">
              <li><Link href="/" className="text-white/75 transition-colors hover:text-white">{tNav("home")}</Link></li>
              <li><Link href="/projects" className="text-white/75 transition-colors hover:text-white">{tNav("projects")}</Link></li>
              <li><Link href="/company" className="text-white/75 transition-colors hover:text-white">{tNav("company")}</Link></li>
              <li><Link href="/jobs" className="text-white/75 transition-colors hover:text-white">{tNav("jobs")}</Link></li>
              <li><Link href="/events" className="text-white/75 transition-colors hover:text-white">{tNav("events")}</Link></li>
              <li><Link href="/contact" className="text-white/75 transition-colors hover:text-white">{tNav("contact")}</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/55">{t("portfolio")}</p>
            <ul className="mt-4 space-y-3 font-sans text-sm">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className="text-white/75 transition-colors hover:text-white">{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator className="my-10 bg-white/15" />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="font-sans text-sm text-white/65">
            <p>{contact.address}</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
              <a href={contact.mailtoHref} className="underline-offset-4 hover:underline">{contact.email}</a>
              <span className="text-white/40">·</span>
              <a href={contact.telLandlineHref} className="underline-offset-4 hover:underline">{contact.phoneLandlineDisplay}</a>
              <span className="text-white/40">·</span>
              <a href={contact.telHref} className="underline-offset-4 hover:underline">{contact.phoneDisplay}</a>
              <span className="text-white/40">·</span>
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#7eb8e8] underline-offset-4 hover:underline">{t("whatsapp")}</a>
            </p>
            {siteConfig.social.instagram || siteConfig.social.facebook ? (
              <p className="mt-4 flex flex-wrap items-center gap-4">
                {siteConfig.social.instagram ? (
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white">
                    <Instagram className="size-4" aria-hidden />
                    {t("instagram")}
                  </a>
                ) : null}
                {siteConfig.social.facebook ? (
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white">
                    <Facebook className="size-4" aria-hidden />
                    {t("facebook")}
                  </a>
                ) : null}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <LanguageSwitcher dropUp />
            <p className="font-sans text-xs text-white/50">{t("rights", { year, name: tSite("name") })}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
