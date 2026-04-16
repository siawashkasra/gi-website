import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Car,
  Dumbbell,
  Landmark,
  Layers,
  MapPin,
  Shield,
  Sparkles,
  Store,
  TreePine,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import type { Project, ProjectKeyStatLabels, ProjectUnitBlock } from "@/data/projects";
import { projectTypeLabels } from "@/data/projects";
import { ProjectGallery } from "@/components/projects/detail/project-gallery";
import { PropertyListingsSection } from "@/components/property-listings/property-listings-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const FEATURE_ICONS = {
  building2: Building2,
  car: Car,
  shield: Shield,
  sparkles: Sparkles,
  trees: TreePine,
  dumbbell: Dumbbell,
  zap: Zap,
  users: Users,
  store: Store,
  layers: Layers,
  wifi: Wifi,
  landmark: Landmark,
} as const;

function StatCell({ label, value }: { label: string; value: string }) {
  const empty = value === "—" || value === "";
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-white to-muted/40 p-8 shadow-lg transition-all duration-300 hover:border-primary/20 hover:shadow-xl">
      <div className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full bg-primary/[0.08]" aria-hidden />
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
      <p className={cn("mt-4 font-sans text-5xl font-bold tabular-nums tracking-tight sm:text-6xl", empty ? "text-muted-foreground/50" : "text-primary")}>{empty ? "—" : value}</p>
    </div>
  );
}

function UnitCard({ block }: { block: ProjectUnitBlock }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border/60 bg-card p-8 shadow-lg transition-all duration-300 hover:border-primary/25 hover:shadow-xl hover:scale-[1.02]">
      <span className="font-sans text-3xl font-bold tabular-nums text-primary transition-colors group-hover:text-primary/90 sm:text-4xl">{block.count}</span>
      <h3 className="mt-3 font-serif text-xl font-semibold tracking-tight">{block.title}</h3>
      <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">{block.subtitle}</p>
    </div>
  );
}

const defaultKeyStatLabels: ProjectKeyStatLabels = { units: "Residential units", shops: "Retail & shops", facilities: "Facilities & assets" };

export function ProjectDetail({ project }: { project: Project }) {
  const hasUnits = !!(project.unitsInfo.apartments || project.unitsInfo.shops || project.unitsInfo.offices);
  const statLabels = project.keyStatLabels ?? defaultKeyStatLabels;
  const overviewTitle = project.detailOverviewTitle ?? "A destination shaped for longevity";
  const scaleEyebrow = project.scaleSectionEyebrow ?? "Scale";
  const scaleTitle = project.scaleSectionTitle ?? "Key statistics";
  const featuresEyebrow = project.featuresSectionEyebrow ?? "Experience";
  const featuresTitle = project.featuresSectionTitle ?? "Signature features";
  return (
    <article className="border-b border-border/60">
      <header className="relative h-[min(92vh,56rem)] min-h-[24rem] w-full overflow-hidden">
        <Image src={project.image} alt={project.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f4e79]/80 from-30% via-[#1f4e79]/48 via-55% to-[#1f4e79]/18 to-100%" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_100%,rgba(47,110,165,0.1),transparent_58%)]" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent" aria-hidden />
        <div className="relative z-10 ds-container flex h-full flex-col pb-20 pt-10 sm:pb-24 sm:pt-12">
          <Button render={<Link href="/projects" />} nativeButton={false} variant="outline" size="sm" className="w-fit rounded-xl border-white/40 bg-black/25 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#2f6ea5] hover:bg-[#2f6ea5]/20 hover:text-white">
            <ArrowLeft className="mr-2 size-4" aria-hidden />
            All projects
          </Button>
          <div className="mt-auto max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border-0 bg-white/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white backdrop-blur-md">{project.category}</Badge>
              <span className="rounded-full border border-white/20 bg-black/25 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md">{projectTypeLabels[project.type]}</span>
            </div>
            <h1 className="mt-8 font-serif text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[4.25rem] lg:leading-[1.02]">{project.name}</h1>
            <p className="mt-6 max-w-2xl font-sans text-lg font-normal leading-relaxed text-white/82 sm:text-xl md:text-2xl">{project.excerpt}</p>
          </div>
        </div>
      </header>
      <section className="relative bg-white py-20 sm:py-28 lg:py-32" aria-labelledby="overview-heading">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden />
        <div className="ds-container">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-primary">Overview</p>
              <h2 id="overview-heading" className="mt-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
                {overviewTitle}
              </h2>
              <div className="mt-8 space-y-5 font-sans text-base font-normal leading-relaxed text-muted-foreground sm:text-lg">
                {project.detailOverviewParagraphs?.length ? (
                  project.detailOverviewParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                ) : (
                  <p>{project.description}</p>
                )}
              </div>
              {project.strategicPositioning ? (
                <div className="mt-10 border-t border-border/60 pt-10">
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary">Strategic positioning</p>
                  <p className="mt-3 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">{project.strategicPositioning}</p>
                </div>
              ) : null}
              {project.keyComponentBullets?.length ? (
                <div className="mt-10">
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary">Key components</p>
                  <ul className="mt-4 list-inside list-disc space-y-2 font-sans text-base text-muted-foreground sm:text-lg">
                    {project.keyComponentBullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {project.facilityBullets?.length ? (
                <div className="mt-10">
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary">Facilities</p>
                  <ul className="mt-4 list-inside list-disc space-y-2 font-sans text-base text-muted-foreground sm:text-lg">
                    {project.facilityBullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {project.missionVision ? (
                <div className="mt-12 space-y-8 border-t border-border/60 pt-10">
                  <div>
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary">Vision</p>
                    <p className="mt-3 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">{project.missionVision.vision}</p>
                  </div>
                  <div>
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary">Mission</p>
                    <p className="mt-3 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">{project.missionVision.mission}</p>
                  </div>
                  <div>
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary">Our values</p>
                    <ul className="mt-4 list-inside list-disc space-y-2 font-sans text-base text-muted-foreground sm:text-lg">
                      {project.missionVision.values.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-8 rounded-2xl border border-border bg-muted p-8 shadow-lg shadow-primary/5 backdrop-blur-sm">
                <div>
                  <h3 className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    <MapPin className="size-4 shrink-0 text-[#2f6ea5]" aria-hidden />
                    Location
                  </h3>
                  <p className="mt-2 font-sans text-lg font-normal text-foreground">{project.location}</p>
                </div>
                <Separator className="bg-border/80" />
                <div>
                  <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Timeline</h3>
                  <ul className="relative mt-5 space-y-6 border-l border-border pl-6">
                    {project.timeline.map((phase) => (
                      <li key={phase.label} className="relative">
                        <span className="absolute -left-6 top-1.5 size-2.5 -translate-x-1/2 rounded-full border-2 border-background bg-primary ring-2 ring-primary/25" aria-hidden />
                        <p className="font-sans text-sm font-normal text-foreground">{phase.label}</p>
                        <p className="mt-0.5 font-sans text-sm text-muted-foreground">{phase.value}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="rounded-full border border-border bg-background px-4 py-2 font-sans text-xs font-semibold text-foreground">{project.status}</span>
                  {project.area !== "—" ? (
                    <span className="rounded-full border border-border bg-background px-4 py-2 font-sans text-xs font-semibold text-muted-foreground">
                      {project.area}
                      {project.areaBadgePlain ? "" : " GFA"}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-border/60 bg-muted py-20 sm:py-28" aria-labelledby="stats-heading">
        <div className="ds-container">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-primary">{scaleEyebrow}</p>
          <h2 id="stats-heading" className="mt-4 max-w-2xl font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            {scaleTitle}
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-3 lg:gap-10">
            <StatCell label={statLabels.units} value={project.keyStats.units} />
            <StatCell label={statLabels.shops} value={project.keyStats.shops} />
            <StatCell label={statLabels.facilities} value={project.keyStats.facilities} />
          </div>
        </div>
      </section>
      <section className="border-t border-border/60 bg-white py-20 sm:py-28 lg:py-32">
        <div className="ds-container">
          <ProjectGallery images={project.gallery} projectName={project.name} />
        </div>
      </section>
      <section className="border-t border-border/60 bg-gradient-to-b from-muted to-background py-20 sm:py-28" aria-labelledby="features-heading">
        <div className="ds-container">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-primary">{featuresEyebrow}</p>
          <h2 id="features-heading" className="mt-4 max-w-2xl font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            {featuresTitle}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.features.map((f) => {
              const Icon = FEATURE_ICONS[f.icon];
              return (
                <div key={f.title} className="flex gap-4 rounded-2xl border border-border/60 bg-white p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-semibold tracking-tight">{f.title}</h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {project.listings && project.listings.length > 0 ? <PropertyListingsSection projectName={project.name} listings={project.listings} /> : null}
      {hasUnits ? (
        <section className="border-t border-border/60 bg-white py-20 sm:py-28 lg:py-32" aria-labelledby="units-heading">
          <div className="ds-container">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-primary">Inventory</p>
            <h2 id="units-heading" className="mt-4 max-w-2xl font-serif text-4xl font-bold tracking-tight sm:text-5xl">
              Apartments, shops & offices
            </h2>
            <p className="mt-4 max-w-2xl font-sans text-muted-foreground">Typologies and volumes for this development — speak with our team for live availability and fit-out options.</p>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {project.unitsInfo.apartments ? <UnitCard block={project.unitsInfo.apartments} /> : null}
              {project.unitsInfo.shops ? <UnitCard block={project.unitsInfo.shops} /> : null}
              {project.unitsInfo.offices ? <UnitCard block={project.unitsInfo.offices} /> : null}
            </div>
          </div>
        </section>
      ) : null}
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(47,110,165,0.22),transparent)]" aria-hidden />
        <div className="relative ds-container">
          <div className="flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-[#2f6ea5]">Next step</p>
              <h2 className="mt-5 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">Visit {project.name}</h2>
              <p className="mt-5 font-sans text-base font-normal leading-relaxed text-white/80 sm:text-lg">Book a private walkthrough or request investment materials. Our team will confirm timing and access protocols.</p>
            </div>
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
              <Button render={<Link href="/contact" />} nativeButton={false} size="lg" className="h-14 min-w-[12rem] rounded-xl border-2 border-white/20 bg-white px-8 font-semibold text-primary shadow-md hover:scale-[1.02] hover:bg-[#f5f7fa]">
                Book a visit
              </Button>
              <Button render={<Link href="/contact" />} nativeButton={false} variant="outline" size="lg" className="h-14 min-w-[12rem] rounded-xl border-2 border-white/45 bg-white/5 px-8 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-[#2f6ea5] hover:bg-[#2f6ea5]/25 hover:text-white">
                Contact {siteConfig.name.split(" ")[0]}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
