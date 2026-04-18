import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { projects } from "@/data/projects";
import { contact } from "@/lib/contact";
import { siteConfig } from "@/lib/site";

const portfolio = projects.slice(0, 5);

const footerCopy = {
  explore: "Explore",
  portfolio: "Portfolio",
  contact: "Contact",
  openInMaps: "Open in Google Maps",
  affiliation: "Headquarters Kabul; international affiliation United Arab Emirates.",
  locationLine: "Kabul, Afghanistan",
  privacy: "Privacy",
  terms: "Terms of use",
} as const;

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/company", label: "Company" },
  { href: "/jobs", label: "Jobs" },
  { href: "/complaint", label: "Complaint" },
  { href: "/contact", label: "Contact" },
] as const;

function IslamicTopBand() {
  return (
    <div className="relative z-[2]" aria-hidden>
      <div className="footer-geo-band h-[20px] w-full text-white/45">
        <svg width="100%" height="20" preserveAspectRatio="none" viewBox="0 0 400 20" className="h-[20px] w-full">
          <defs>
            <pattern id="footer-islamic-border" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 2 L24 10 L20 18 L16 10 Z M2 10 L10 6 L18 10 L10 14 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="20" fill="url(#footer-islamic-border)" />
        </svg>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gi-gold/35 to-transparent" />
    </div>
  );
}

const colLabel = "font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/60";

function FooterColHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="size-1 shrink-0 rounded-full bg-gi-gold/60 shadow-[0_0_14px_rgba(201,168,76,0.45)]" aria-hidden />
      <p className={colLabel}>{children}</p>
    </div>
  );
}

const luxEase = "duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gi-navy text-white" role="contentinfo">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_100%_65%_at_100%_0%,rgba(255,255,255,0.1),transparent_55%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(195deg,rgba(255,255,255,0.04)_0%,transparent_45%)]" aria-hidden />
      <IslamicTopBand />
      <div className="relative z-[1] ds-container py-16 lg:py-24">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.13] bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-9 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),inset_0_0_0_1px_rgba(255,255,255,0.04),0_32px_100px_-52px_rgba(13,27,62,0.6)] backdrop-blur-md lg:p-12">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gi-gold/25 to-transparent lg:inset-x-12" aria-hidden />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent)]" aria-hidden />
          <div className="relative grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
            <div className="md:col-span-2 lg:col-span-1">
              <div className="flex flex-wrap items-center gap-5">
                <span className="flex size-[4.25rem] shrink-0 items-center justify-center rounded-2xl border border-white/22 bg-white/[0.09] font-heading text-[1.35rem] font-semibold tracking-tight text-white shadow-[0_14px_44px_-18px_rgba(13,27,62,0.7),inset_0_1px_0_0_rgba(255,255,255,0.12),0_0_40px_-14px_rgba(201,168,76,0.14)] ring-1 ring-white/10">GI</span>
                <div className="min-w-0">
                  <p className="font-heading text-[clamp(1.35rem,3vw,1.9rem)] font-semibold leading-[1.12] tracking-tight text-white">{siteConfig.name}</p>
                  <div className="mt-3 h-px w-14 bg-gradient-to-r from-gi-gold/70 to-transparent" aria-hidden />
                </div>
              </div>
              <p className="mt-7 max-w-sm font-sans text-[0.9375rem] leading-[1.7] text-white/52">{siteConfig.tagline}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={contact.telHref} className={`inline-flex size-12 items-center justify-center rounded-full border border-white/22 bg-white/[0.07] text-white/88 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-sm transition-all ${luxEase} hover:border-gi-gold/40 hover:bg-white/12 hover:text-white hover:shadow-[0_0_24px_-8px_rgba(201,168,76,0.35)]`} aria-label="Phone">
                  <Phone className="size-[19px]" strokeWidth={1.5} aria-hidden />
                </a>
                <a href={contact.mailtoHref} className={`inline-flex size-12 items-center justify-center rounded-full border border-white/22 bg-white/[0.07] text-white/88 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-sm transition-all ${luxEase} hover:border-gi-gold/40 hover:bg-white/12 hover:text-white hover:shadow-[0_0_24px_-8px_rgba(201,168,76,0.35)]`} aria-label="Email">
                  <Mail className="size-[19px]" strokeWidth={1.5} aria-hidden />
                </a>
                <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex size-12 items-center justify-center rounded-full border border-white/22 bg-white/[0.07] text-white/88 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-sm transition-all ${luxEase} hover:border-gi-gold/40 hover:bg-white/12 hover:text-white hover:shadow-[0_0_24px_-8px_rgba(201,168,76,0.35)]`} aria-label="WhatsApp">
                  <MessageCircle className="size-[19px]" strokeWidth={1.5} aria-hidden />
                </a>
                {siteConfig.social.instagram ? (
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className={`inline-flex size-12 items-center justify-center rounded-full border border-white/22 bg-white/[0.07] text-white/88 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-sm transition-all ${luxEase} hover:border-gi-gold/40 hover:bg-white/12 hover:text-white hover:shadow-[0_0_24px_-8px_rgba(201,168,76,0.35)]`} aria-label="Instagram">
                    <Instagram className="size-[19px]" strokeWidth={1.5} aria-hidden />
                  </a>
                ) : null}
                {siteConfig.social.facebook ? (
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className={`inline-flex size-12 items-center justify-center rounded-full border border-white/22 bg-white/[0.07] text-white/88 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-sm transition-all ${luxEase} hover:border-gi-gold/40 hover:bg-white/12 hover:text-white hover:shadow-[0_0_24px_-8px_rgba(201,168,76,0.35)]`} aria-label="Facebook">
                    <Facebook className="size-[19px]" strokeWidth={1.5} aria-hidden />
                  </a>
                ) : null}
              </div>
            </div>
            <div>
              <FooterColHeading>{footerCopy.explore}</FooterColHeading>
              <ul className="mt-6 space-y-0.5 border-t border-white/12 pt-5 font-sans text-sm">
                {exploreLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={`group flex items-center gap-2.5 rounded-xl py-2 pe-3 text-white/68 transition-all ${luxEase} hover:bg-white/[0.07] hover:text-white`}>
                      <span className={`min-w-[1ch] text-sm text-gi-gold opacity-0 transition-all ${luxEase} group-hover:opacity-100 ltr:-translate-x-1 ltr:group-hover:translate-x-0 rtl:translate-x-1 rtl:group-hover:translate-x-0`} aria-hidden>
                        →
                      </span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <FooterColHeading>{footerCopy.portfolio}</FooterColHeading>
              <ul className="mt-6 space-y-0 divide-y divide-white/12 border-t border-white/12 pt-2 font-sans text-sm">
                {portfolio.map((p) => (
                  <li key={p.slug} className="py-3.5 first:pt-2">
                    <Link href={`/projects/${p.slug}`} className={`group relative block rounded-xl py-1.5 pe-2 ps-3 text-white/72 transition-all ${luxEase} before:pointer-events-none before:absolute before:start-0 before:top-1/2 before:h-8 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-gi-gold/0 before:transition-all before:duration-300 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/[0.05] hover:text-white hover:before:bg-gi-gold/70`}>
                      <span className="block font-medium text-white/92 transition-colors group-hover:text-white">{p.name}</span>
                      <span className="mt-1 block [font-variant-caps:small-caps] text-[0.65rem] tracking-[0.2em] text-white/48">{p.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <FooterColHeading>{footerCopy.contact}</FooterColHeading>
              <div className="mt-6 space-y-5 border-t border-white/12 pt-5 font-sans text-sm">
                <div className="flex gap-3.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-white/72 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white">
                    <MapPin className="size-[18px]" strokeWidth={1.5} aria-hidden />
                  </span>
                  <p className="min-w-0 leading-relaxed">{contact.address}</p>
                </div>
                <div className="flex flex-col gap-3.5">
                  <a href={contact.telHref} className={`inline-flex items-center gap-3 rounded-xl border border-transparent px-1 py-0.5 font-medium text-white/82 underline-offset-4 transition-all ${luxEase} hover:border-white/[0.06] hover:bg-white/[0.05] hover:text-white hover:underline`}>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.05] text-white/90">
                      <Phone className="size-4" strokeWidth={1.5} aria-hidden />
                    </span>
                    {contact.phoneDisplay}
                  </a>
                  <a href={contact.telLandlineHref} className={`inline-flex items-center gap-3 rounded-xl border border-transparent px-1 py-0.5 font-medium text-white/82 underline-offset-4 transition-all ${luxEase} hover:border-white/[0.06] hover:bg-white/[0.05] hover:text-white hover:underline`}>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.05] text-white/90">
                      <Phone className="size-4" strokeWidth={1.5} aria-hidden />
                    </span>
                    {contact.phoneLandlineDisplay}
                  </a>
                  <a href={contact.mailtoHref} className={`inline-flex items-center gap-3 rounded-xl border border-transparent px-1 py-0.5 font-medium text-white/82 underline-offset-4 transition-all ${luxEase} hover:border-white/[0.06] hover:bg-white/[0.05] hover:text-white hover:underline`}>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.05] text-white/90">
                      <Mail className="size-4" strokeWidth={1.5} aria-hidden />
                    </span>
                    {contact.email}
                  </a>
                </div>
                <a href={contact.mapsOpenUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gi-gold/85 underline-offset-4 transition-colors hover:text-gi-gold hover:underline">
                  <span className="h-px w-6 bg-gradient-to-r from-gi-gold/50 to-transparent" aria-hidden />
                  {footerCopy.openInMaps}
                </a>
                <p className="max-w-xs border-t border-white/10 pt-4 font-sans text-xs leading-relaxed text-white/42">{footerCopy.affiliation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-[1] h-px w-full bg-gradient-to-r from-transparent via-white/28 to-transparent" aria-hidden />
      <div className="relative z-[1] ds-container grid grid-cols-1 gap-6 py-10 font-sans text-sm text-white/42 md:grid-cols-3 md:items-center md:gap-8">
        <p className="text-center font-medium tracking-tight text-white/55 md:text-start">
          © {year} {siteConfig.name}
        </p>
        <p className="text-center text-[0.8125rem] text-white/48">{footerCopy.locationLine}</p>
        <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 md:justify-end">
          <Link href="/contact" className={`rounded-md px-1 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] transition-colors ${luxEase} hover:text-gi-gold`}>
            {footerCopy.privacy}
          </Link>
          <span className="text-gi-gold/35" aria-hidden>
            ·
          </span>
          <Link href="/contact" className={`rounded-md px-1 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] transition-colors ${luxEase} hover:text-gi-gold`}>
            {footerCopy.terms}
          </Link>
        </p>
      </div>
    </footer>
  );
}
