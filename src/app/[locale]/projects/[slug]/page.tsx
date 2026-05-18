import type { Metadata } from "next";
import Image from "next/image";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { ProjectDetailShell } from "@/components/sections/ProjectDetailShell";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { ProjectSpecs } from "@/components/sections/ProjectSpecs";
import { PropertyListingsSection } from "@/components/property-listings/property-listings-section";
import { Button } from "@/components/ui/button";
import { getAllProjectSlugs } from "@/lib/projects-data";
import { getLocalizedProject, localizeMergedProjects, type Messages } from "@/lib/i18n/localized-data";
import { getMergedProject, getMergedProjects } from "@/lib/media/merge";
import { resolveHeroSidebar } from "@/lib/project-hero-sidebar";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const messages = await getMessages();
  const merged = await getMergedProject(slug);
  const localized = merged ? localizeMergedProjects(messages as Messages, [merged])[0] : getLocalizedProject(messages as Messages, slug);
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const site = await getTranslations({ locale, namespace: "site" });
  if (!localized) return { title: tMeta("projectFallback") };
  return {
    title: localized.name,
    description: localized.excerpt,
    openGraph: { title: `${localized.name} | ${site("name")}`, description: localized.excerpt, images: [{ url: localized.image, width: 1200, height: 630, alt: localized.name }] },
    twitter: { card: "summary_large_image", title: localized.name, description: localized.excerpt, images: [localized.image] },
  };
}

function isRealEstateProject(slug: string) {
  return slug !== "gulbahar-cement" && slug !== "gulbahar-power";
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const t = await getTranslations("projects.detail");
  const tRibbon = await getTranslations("projects.ribbon");
  const messages = await getMessages();
  const merged = await getMergedProject(slug);
  if (!merged) notFound();
  const project = localizeMergedProjects(messages as Messages, [merged])[0]!;
  const heroSidebar = resolveHeroSidebar(project, { floors: tRibbon("floors"), retailUnits: tRibbon("retailUnits"), apartments: tRibbon("apartments"), investment: tRibbon("investment"), scale: tRibbon("scale"), capacity: tRibbon("capacity"), scope: tRibbon("scope"), footprint: tRibbon("footprint") });
  const mergedList = localizeMergedProjects(messages as Messages, await getMergedProjects());
  const related = mergedList.filter((p) => p.slug !== project.slug).slice(0, 2);
  const showUnits = !!(project.listings?.length && isRealEstateProject(project.slug));
  return (
    <article className="max-w-full overflow-x-hidden border-b border-border/60">
      <ProjectDetailShell project={project} heroSidebar={heroSidebar}>
        <ProjectSpecs project={project} />
        <ProjectGallery images={project.gallery} projectName={project.name} />
        {showUnits ? (
          <div id="available-units" className="scroll-mt-24">
            <PropertyListingsSection projectName={project.name} listings={project.listings!} />
          </div>
        ) : null}
        <section className="relative overflow-hidden bg-gi-navy py-20 text-white sm:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_65%_at_100%_0%,rgba(255,255,255,0.1),transparent_55%)]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(195deg,rgba(255,255,255,0.04)_0%,transparent_45%)]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_0%_100%,rgba(201,168,76,0.1),transparent_55%)]" aria-hidden />
          <div className="relative z-[1] ds-container flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-gi-gold">{t("nextStep")}</p>
              <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">{t("visit", { name: project.name })}</h2>
            </div>
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center">
              <Button render={<Link href={`/contact?project=${encodeURIComponent(project.slug)}&intent=visit`} />} nativeButton={false} size="lg" className="h-14 min-w-[12rem] rounded-xl bg-gi-gold px-8 font-semibold text-gi-navy shadow-lg hover:bg-gi-gold-light">
                {t("bookVisit")}
              </Button>
              <Button render={<Link href={`/contact?project=${encodeURIComponent(project.slug)}`} />} nativeButton={false} variant="outline" size="lg" className="h-14 min-w-[12rem] rounded-xl border-2 border-white/40 bg-white/5 px-8 font-semibold text-white backdrop-blur-sm hover:bg-white/10">
                {t("contactTeam")}
              </Button>
            </div>
          </div>
        </section>
        <section className="ds-section relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-white to-gi-navy/[0.02]" aria-labelledby="related-heading">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gi-gold/25 to-transparent" aria-hidden />
          <div className="ds-container">
            <div className="flex items-center gap-2.5">
              <span className="size-1 shrink-0 rounded-full bg-gi-gold/70 shadow-[0_0_12px_rgba(201,168,76,0.35)]" aria-hidden />
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-gi-navy/55">{t("discoverMore")}</p>
            </div>
            <h2 id="related-heading" className="mt-4 font-heading text-[clamp(1.65rem,3vw,2.35rem)] font-semibold leading-tight tracking-tight text-gi-navy">
              {t("related")}
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {related.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="group flex overflow-hidden rounded-2xl border border-gi-navy/[0.08] bg-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.92),0_20px_56px_-36px_rgba(13,27,62,0.12)] transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:border-gi-navy/18 hover:shadow-[0_24px_56px_-32px_rgba(13,27,62,0.16)]">
                  <div className="relative h-48 w-44 shrink-0 sm:h-56 sm:w-52">
                    <Image src={p.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="208px" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center p-6 sm:p-7">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gi-gold">{p.category}</p>
                    <p className="mt-2 font-heading text-xl font-semibold tracking-tight text-gi-navy">{p.name}</p>
                    <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </ProjectDetailShell>
    </article>
  );
}
