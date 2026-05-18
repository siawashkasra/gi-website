import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { EventsPageContent } from "@/components/events/events-page-content";
import { getResolvedPageHero } from "@/lib/media/merge";

const eventsHeroFallback = "https://images.unsplash.com/photo-1511578314322-379afb476865?w=2400&q=90";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.events" });
  const site = await getTranslations({ locale, namespace: "site" });
  return { title: t("title"), description: t("description"), openGraph: { title: `${t("title")} | ${site("name")}`, description: t("description") } };
}

export default async function EventsPage() {
  const t = await getTranslations("events");
  const tNav = await getTranslations("nav");
  const hero = await getResolvedPageHero("events");
  const eventsHeroImage = hero?.desktop ?? eventsHeroFallback;
  const eventsHeroAlt = hero?.alt ?? "";
  return (
    <main>
      <div className="border-b border-border/60">
        <div className="relative min-h-[22rem] overflow-hidden border-b border-border bg-primary text-primary-foreground sm:min-h-[26rem] lg:min-h-[30rem]">
          <Image src={eventsHeroImage} alt={eventsHeroAlt} fill className="object-cover object-[center_40%]" sizes="100vw" priority />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1f4e79]/92 via-[#1f4e79]/78 to-[#1f4e79]/65" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_70%_-20%,rgba(47,110,165,0.28),transparent_52%)]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.06)_50%,transparent_65%)]" aria-hidden />
          <div className="relative ds-container py-20 sm:py-24 lg:py-28">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#2f6ea5]">{t("calendar")}</p>
            <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.02]">{t("upcoming")}</h1>
            <p className="mt-6 max-w-2xl font-sans text-base font-normal leading-relaxed text-white/80 sm:text-lg sm:leading-relaxed">{t("description")}</p>
            <p className="mt-8 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-white/45 sm:text-xs sm:tracking-[0.24em]">
              <Link href="/contact" className="text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline">
                {tNav("inquire")}
              </Link>
              <span className="mx-2.5 text-white/25" aria-hidden>·</span>
              <Link href="/company" className="text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline">
                {tNav("company")}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <EventsPageContent />
    </main>
  );
}
