import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EventsPageContent } from "@/components/events/events-page-content";
import { siteConfig } from "@/lib/site";

const eventsHeroImage = "https://images.unsplash.com/photo-1511578314322-379afb476865?w=2400&q=90";

export const metadata: Metadata = {
  title: "Events",
  description: `Public events, briefings, and milestones for ${siteConfig.name} — Kabul, infrastructure, and industrial portfolio updates.`,
  openGraph: { title: `Events | ${siteConfig.name}`, description: `Official events and announcements for ${siteConfig.name}.` },
};

export default function EventsPage() {
  return (
    <main>
      <div className="border-b border-border/60">
        <div className="relative min-h-[22rem] overflow-hidden border-b border-border bg-primary text-primary-foreground sm:min-h-[26rem] lg:min-h-[30rem]">
          <Image src={eventsHeroImage} alt="" fill className="object-cover object-[center_40%]" sizes="100vw" priority />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1f4e79]/92 via-[#1f4e79]/78 to-[#1f4e79]/65" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_70%_-20%,rgba(47,110,165,0.28),transparent_52%)]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.06)_50%,transparent_65%)]" aria-hidden />
          <div className="relative ds-container py-20 sm:py-24 lg:py-28">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#2f6ea5]">Events</p>
            <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.02]">Official moments & public programme</h1>
            <p className="mt-6 max-w-2xl font-sans text-base font-normal leading-relaxed text-white/80 sm:text-lg sm:leading-relaxed">Milestones, site updates, and briefings we share with partners, media, and the community. Confirmed dates and details are published here and through official channels.</p>
            <p className="mt-8 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-white/45 sm:text-xs sm:tracking-[0.24em]">
              <Link href="/contact" className="text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline">
                Inquire
              </Link>
              <span className="mx-2.5 text-white/25" aria-hidden>
                ·
              </span>
              <Link href="/company" className="text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline">
                Company
              </Link>
            </p>
          </div>
        </div>
      </div>
      <EventsPageContent />
    </main>
  );
}
