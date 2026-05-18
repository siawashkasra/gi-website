import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import type { Locale } from "../../../../i18n";
import { formatNumber } from "@/lib/i18n/format";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { localizeMergedProjects, type Messages } from "@/lib/i18n/localized-data";
import { getMergedProjects, getResolvedPageHero } from "@/lib/media/merge";

const projectsHeroFallback = "/images/projects/gulbahar-plaza/gulbahar-plaza-hero-page.png";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.projects" });
  const site = await getTranslations({ locale, namespace: "site" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: `${t("title")} | ${site("name")}` },
  };
}

export default async function ProjectsPage() {
  const t = await getTranslations("projects.index");
  const site = await getTranslations("site");
  const messages = await getMessages();
  const hero = await getResolvedPageHero("projectsIndex");
  const locale = (await getLocale()) as Locale;
  const merged = localizeMergedProjects(messages as Messages, await getMergedProjects());
  const projectsHeroImage = hero?.desktop ?? projectsHeroFallback;
  const projectsHeroAlt = hero?.alt ?? "";
  return (
    <div className="border-b border-border/60">
      <div className="relative min-h-[22rem] overflow-hidden border-b border-border bg-primary text-primary-foreground sm:min-h-[26rem] lg:min-h-[30rem]">
        <Image src={projectsHeroImage} alt={projectsHeroAlt} fill className="object-cover object-[center_42%]" sizes="100vw" priority />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1f4e79]/92 via-[#1f4e79]/78 to-[#1f4e79]/65" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_70%_-20%,rgba(47,110,165,0.28),transparent_52%)]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.06)_50%,transparent_65%)]" aria-hidden />
        <div className="relative ds-container py-24 sm:py-28 lg:py-36">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.36em] text-[#2f6ea5]">{site("name")}</p>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-bold leading-[1.04] tracking-tight text-white sm:text-6xl md:text-7xl md:leading-[1.02]">{t("title")}</h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg md:text-xl">{t("description")}</p>
          <p className="mt-10 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-white/45">{formatNumber(merged.length, locale)}</p>
        </div>
      </div>
      <div className="relative bg-muted">
        <div className="relative ds-container py-20 sm:py-24 lg:py-28">
          <div className="pointer-events-none absolute start-1/2 top-0 h-px w-[min(100%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent rtl:translate-x-1/2" aria-hidden />
          <ProjectsExplorer projects={merged} />
        </div>
      </div>
    </div>
  );
}
