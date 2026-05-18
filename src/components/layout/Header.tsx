"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LogoMark } from "@/components/shared/logo-mark";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MegaMenu } from "@/components/layout/mega-menu";
import { NavLink } from "@/components/layout/nav-link";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import type { Project } from "@/data/projects";
import { projects as fallbackMenuProjects } from "@/data/projects";

export function Header({ menuProjects }: { menuProjects?: Project[] }) {
  const t = useTranslations("nav");
  const megaMenuProjects = menuProjects ?? fallbackMenuProjects;
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollYProgress = useScrollProgress();
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <>
      <motion.div className="pointer-events-none fixed top-0 inset-x-0 z-[300] h-0.5 origin-left bg-gi-gold rtl:origin-right" style={{ scaleX: scrollYProgress }} aria-hidden />
      {megaOpen ? <button type="button" className="fixed inset-0 z-[120] cursor-default bg-gi-navy-900/20" aria-label={t("closeMenu")} onClick={() => setMegaOpen(false)} /> : null}
      <header className="fixed top-0 inset-x-0 z-[200] w-full border-b border-white/10 bg-gi-navy text-white shadow-[0_1px_0_rgba(255,255,255,0.06)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_65%_at_100%_0%,rgba(255,255,255,0.1),transparent_55%)]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(195deg,rgba(255,255,255,0.04)_0%,transparent_45%)]" aria-hidden />
        <div className="relative z-[1]">
          <div className="ds-container flex h-[4.25rem] items-center justify-between gap-4">
            <LogoMark variant="light" />
            <nav className="hidden items-center gap-1 md:flex" aria-label={t("mainAria")}>
              <NavLink href="/">{t("home")}</NavLink>
              <span className="group relative inline-flex">
                <button type="button" aria-expanded={megaOpen} className="relative z-10 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors hover:opacity-90" onClick={() => setMegaOpen((v) => !v)}>
                  {t("projects")}
                </button>
                <span className="pointer-events-none absolute bottom-1 inset-x-3 h-px origin-left scale-x-0 bg-gi-gold transition-transform duration-300 ease-out group-hover:scale-x-100 rtl:origin-right" aria-hidden />
              </span>
              <NavLink href="/company">{t("company")}</NavLink>
              <NavLink href="/jobs">{t("jobs")}</NavLink>
              <NavLink href="/events">{t("events")}</NavLink>
              <NavLink href="/contact">{t("contact")}</NavLink>
            </nav>
            <div className="flex shrink-0 items-center gap-2">
              <LanguageSwitcher />
              <Button render={<Link href="/contact" />} nativeButton={false} variant="outline" size="sm" className="hidden h-10 rounded-xl border-white/45 bg-white/10 px-5 font-semibold text-white shadow-none hover:border-white/65 hover:bg-white/18 hover:text-white md:inline-flex">
                {t("inquire")}
              </Button>
              <button type="button" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/35 bg-white/10 text-white transition-colors hover:bg-white/16 md:hidden" aria-expanded={mobileOpen} aria-controls="mobile-nav" aria-label={t("openMenu")} onClick={() => setMobileOpen(true)}>
                <Menu className="size-4" />
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <MegaMenu open={megaOpen} onNavigate={() => setMegaOpen(false)} projects={megaMenuProjects} />
          </div>
        </div>
      </header>
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div key="drawer" id="mobile-nav" initial={{ x: "var(--drawer-from)" }} animate={{ x: 0 }} exit={{ x: "var(--drawer-from)" }} transition={{ type: "tween", duration: 0.32, ease: [0.16, 1, 0.3, 1] }} style={{ "--drawer-from": "calc(-100% * var(--drawer-sign, 1))" } as React.CSSProperties} className="fixed inset-0 z-[250] flex flex-col bg-gi-navy text-white [--drawer-sign:1] rtl:[--drawer-sign:-1]">
            <div className="flex h-[4.25rem] items-center justify-between border-b border-white/10 px-4">
              <LogoMark variant="light" />
              <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 text-white transition-colors hover:bg-white/10" aria-label={t("closeMenu")} onClick={() => setMobileOpen(false)}>
                <X className="size-4" />
              </button>
            </div>
            <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-6" aria-label={t("mobileAria")}>
              <div className="flex flex-col gap-1">
                <Link href="/" className="rounded-lg px-3 py-3 text-base font-medium hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                  {t("home")}
                </Link>
                <Link href="/projects" className="rounded-lg px-3 py-3 text-base font-medium hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                  {t("allProjects")}
                </Link>
                {megaMenuProjects.map((p) => (
                  <Link key={p.slug} href={`/projects/${p.slug}`} className="rounded-lg px-3 py-2.5 ps-6 text-sm text-white/80 hover:bg-white/10 hover:text-white" onClick={() => setMobileOpen(false)}>
                    {p.name}
                  </Link>
                ))}
                <Link href="/company" className="rounded-lg px-3 py-3 text-base font-medium hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                  {t("company")}
                </Link>
                <Link href="/jobs" className="rounded-lg px-3 py-3 text-base font-medium hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                  {t("jobs")}
                </Link>
                <Link href="/events" className="rounded-lg px-3 py-3 text-base font-medium hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                  {t("events")}
                </Link>
                <Link href="/contact" className="rounded-lg px-3 py-3 text-base font-medium hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                  {t("contact")}
                </Link>
              </div>
              <Button render={<Link href="/contact" onClick={() => setMobileOpen(false)} />} nativeButton={false} size="lg" className="mt-8 w-full rounded-xl border border-white/35 bg-white/10 font-semibold text-white hover:bg-white/18">
                {t("inquire")}
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
