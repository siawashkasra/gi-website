"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/shared/logo-mark";
import { Button } from "@/components/ui/button";
import { MegaMenu } from "@/components/layout/mega-menu";
import { NavLink } from "@/components/layout/nav-link";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { megaMenuProjects } from "@/lib/projects-data";

export function Header() {
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
      <motion.div className="pointer-events-none fixed top-0 left-0 right-0 z-[300] h-0.5 origin-left bg-gi-gold" style={{ scaleX: scrollYProgress }} aria-hidden />
      {megaOpen ? <button type="button" className="fixed inset-0 z-[120] cursor-default bg-gi-navy-900/20" aria-label="Close menu" onClick={() => setMegaOpen(false)} /> : null}
      <header className="fixed top-0 left-0 right-0 z-[200] w-full border-b border-white/10 bg-gi-navy text-white shadow-[0_1px_0_rgba(255,255,255,0.06)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_65%_at_100%_0%,rgba(255,255,255,0.1),transparent_55%)]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(195deg,rgba(255,255,255,0.04)_0%,transparent_45%)]" aria-hidden />
        <div className="relative z-[1]">
          <div className="ds-container flex h-[4.25rem] items-center justify-between gap-4">
            <LogoMark variant="light" />
            <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
              <NavLink href="/">Home</NavLink>
              <span className="group relative inline-flex">
                <button type="button" aria-expanded={megaOpen} className="relative z-10 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors hover:opacity-90" onClick={() => setMegaOpen((v) => !v)}>
                  Projects
                </button>
                <span className="pointer-events-none absolute bottom-1 left-3 right-3 h-px origin-left scale-x-0 bg-gi-gold transition-transform duration-300 ease-out group-hover:scale-x-100" aria-hidden />
              </span>
              <NavLink href="/company">Company</NavLink>
              <NavLink href="/jobs">Jobs</NavLink>
              <NavLink href="/events">Events</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </nav>
            <div className="hidden md:block">
              <Button render={<Link href="/contact" />} nativeButton={false} variant="outline" size="sm" className="h-10 rounded-xl border-white/45 bg-white/10 px-5 font-semibold text-white shadow-none hover:border-white/65 hover:bg-white/18 hover:text-white">
                Inquire
              </Button>
            </div>
            <button type="button" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/35 bg-white/10 text-white transition-colors hover:bg-white/16 md:hidden" aria-expanded={mobileOpen} aria-controls="mobile-nav" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
              <Menu className="size-4" />
            </button>
          </div>
          <div className="hidden md:block">
            <MegaMenu open={megaOpen} onNavigate={() => setMegaOpen(false)} />
          </div>
        </div>
      </header>
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div key="drawer" id="mobile-nav" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.32, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-0 z-[250] flex flex-col bg-gi-navy text-white">
            <div className="flex h-[4.25rem] items-center justify-between border-b border-white/10 px-4">
              <LogoMark variant="light" />
              <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 text-white transition-colors hover:bg-white/10" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                <X className="size-4" />
              </button>
            </div>
            <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-6" aria-label="Mobile">
              <div className="flex flex-col gap-1">
                <Link href="/" className="rounded-lg px-3 py-3 text-base font-medium hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                  Home
                </Link>
                <Link href="/projects" className="rounded-lg px-3 py-3 text-base font-medium hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                  All projects
                </Link>
                {megaMenuProjects.map((p) => (
                  <Link key={p.slug} href={`/projects/${p.slug}`} className="rounded-lg px-3 py-2.5 pl-6 text-sm text-white/80 hover:bg-white/10 hover:text-white" onClick={() => setMobileOpen(false)}>
                    {p.name}
                  </Link>
                ))}
                <Link href="/company" className="rounded-lg px-3 py-3 text-base font-medium hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                  Company
                </Link>
                <Link href="/jobs" className="rounded-lg px-3 py-3 text-base font-medium hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                  Jobs
                </Link>
                <Link href="/events" className="rounded-lg px-3 py-3 text-base font-medium hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                  Events
                </Link>
                <Link href="/contact" className="rounded-lg px-3 py-3 text-base font-medium hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                  Contact
                </Link>
              </div>
              <Button render={<Link href="/contact" onClick={() => setMobileOpen(false)} />} nativeButton={false} size="lg" className="mt-8 w-full rounded-xl border border-white/35 bg-white/10 font-semibold text-white hover:bg-white/18">
                Inquire
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
