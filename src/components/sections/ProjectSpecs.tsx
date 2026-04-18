import Image from "next/image";
import Link from "next/link";
import {
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
import type { LucideIcon } from "lucide-react";
import type { Project, ProjectFeatureIcon, ProjectUnitBlock } from "@/data/projects";
import { projectTypeLabels } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NAVY_BLUR_DATA_URL } from "@/lib/image-placeholders";
import { cn } from "@/lib/utils";

const FEATURE_ICONS: Record<ProjectFeatureIcon, LucideIcon> = {
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
};

const luxEase = "duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

const luxCard =
  "rounded-2xl border border-gi-navy/[0.08] bg-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.92),0_20px_56px_-36px_rgba(13,27,62,0.12)] transition-[border-color,box-shadow,transform] duration-500 hover:border-gi-navy/18 hover:shadow-[0_24px_56px_-32px_rgba(13,27,62,0.14)]";

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="size-1 shrink-0 rounded-full bg-gi-gold/70 shadow-[0_0_12px_rgba(201,168,76,0.38)]" aria-hidden />
      <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gi-navy/58">{children}</p>
    </div>
  );
}

function StatHighlight({ label, value }: { label: string; value: string }) {
  const empty = value === "—" || value === "";
  return (
    <div className={cn(luxCard, "p-8 sm:p-9")}>
      <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gi-navy/50">{label}</p>
      <p className={cn("mt-4 font-heading text-4xl font-semibold tabular-nums tracking-tight text-gi-navy sm:text-5xl", empty && "text-muted-foreground/45")}>{empty ? "—" : value}</p>
    </div>
  );
}

function UnitBlockCard({ block }: { block: ProjectUnitBlock }) {
  return (
    <div className={cn(luxCard, "group flex flex-col p-8 sm:p-9", luxEase, "hover:-translate-y-0.5")}>
      <span className="font-heading text-3xl font-bold tabular-nums text-gi-navy transition-colors group-hover:text-gi-blue sm:text-4xl">{block.count}</span>
      <h3 className="mt-3 font-heading text-xl font-semibold tracking-tight text-gi-navy">{block.title}</h3>
      <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">{block.subtitle}</p>
    </div>
  );
}

const defaultKeyStatLabels = { units: "Residential units", shops: "Retail & shops", facilities: "Facilities & assets" } as const;

export function ProjectSpecs({ project }: { project: Project }) {
  const overviewTitle = project.detailOverviewTitle ?? "A destination shaped for longevity";
  const paras = project.detailOverviewParagraphs?.length ? project.detailOverviewParagraphs : [project.description];
  const imgs = project.gallery.length ? project.gallery : [project.image];
  const hasUnits = !!(project.unitsInfo.apartments || project.unitsInfo.shops || project.unitsInfo.offices);
  const featuresEyebrow = project.featuresSectionEyebrow ?? "Experience";
  const featuresTitle = project.featuresSectionTitle ?? "Signature features";
  const statLabels = project.keyStatLabels ?? defaultKeyStatLabels;
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-white to-gi-navy/[0.02]" aria-labelledby="project-overview-heading">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gi-gold/30 to-transparent" aria-hidden />
        <div className="ds-section">
          <div className="ds-container">
            <SectionEyebrow>Overview</SectionEyebrow>
            <h2 id="project-overview-heading" className="mt-4 max-w-3xl font-heading text-[clamp(1.85rem,4vw,2.85rem)] font-semibold leading-[1.08] tracking-tight text-gi-navy">
              {overviewTitle}
            </h2>
            <div className="mt-14 grid gap-6 sm:grid-cols-3 lg:gap-8">
              <StatHighlight label={statLabels.units} value={project.keyStats.units} />
              <StatHighlight label={statLabels.shops} value={project.keyStats.shops} />
              <StatHighlight label={statLabels.facilities} value={project.keyStats.facilities} />
            </div>
            <div className="mt-20 space-y-24 lg:mt-24 lg:space-y-28">
              {paras.map((para, i) => (
                <div key={i} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={cn("border-l-2 border-gi-gold/55 pl-8", i % 2 === 1 && "lg:col-start-2")}>
                    <p className="font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">{para}</p>
                  </div>
                  <div className={cn("relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted ring-1 ring-gi-navy/[0.08] shadow-[0_24px_60px_-28px_rgba(13,27,62,0.18)]", i % 2 === 1 && "lg:col-start-1 lg:row-start-1")}>
                    <Image src={imgs[i % imgs.length]} alt="" fill loading={i === 0 ? "eager" : "lazy"} placeholder="blur" blurDataURL={NAVY_BLUR_DATA_URL} className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
                  </div>
                </div>
              ))}
            </div>
            {project.strategicPositioning ? (
              <div className="mt-20 border-l-2 border-gi-gold/55 pl-8 lg:mt-24">
                <SectionEyebrow>Strategic positioning</SectionEyebrow>
                <p className="mt-4 max-w-3xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">{project.strategicPositioning}</p>
              </div>
            ) : null}
            {project.keyComponentBullets?.length ? (
              <div className="mt-16 border-l-2 border-gi-gold/55 pl-8 lg:mt-20">
                <SectionEyebrow>Key components</SectionEyebrow>
                <ul className="mt-4 space-y-2.5 font-sans text-base text-muted-foreground sm:text-lg">
                  {project.keyComponentBullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-gi-gold/60" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {project.facilityBullets?.length ? (
              <div className="mt-16 border-l-2 border-gi-gold/55 pl-8 lg:mt-20">
                <SectionEyebrow>Facilities</SectionEyebrow>
                <ul className="mt-4 space-y-2.5 font-sans text-base text-muted-foreground sm:text-lg">
                  {project.facilityBullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-gi-gold/60" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="mt-20 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
              <div className="border-l-2 border-gi-gold/55 pl-8 lg:col-span-7">
                {project.missionVision ? (
                  <div className="space-y-10">
                    <div>
                      <SectionEyebrow>Vision</SectionEyebrow>
                      <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">{project.missionVision.vision}</p>
                    </div>
                    <div>
                      <SectionEyebrow>Mission</SectionEyebrow>
                      <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">{project.missionVision.mission}</p>
                    </div>
                    <div>
                      <SectionEyebrow>Values</SectionEyebrow>
                      <ul className="mt-4 space-y-2.5 font-sans text-base text-muted-foreground sm:text-lg">
                        {project.missionVision.values.map((v) => (
                          <li key={v} className="flex gap-3">
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-gi-gold/60" aria-hidden />
                            <span>{v}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
              <aside className="lg:col-span-5">
                <div className="sticky top-28 space-y-8 rounded-2xl border border-gi-navy/[0.1] bg-white/95 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.96),0_28px_70px_-40px_rgba(13,27,62,0.16)] backdrop-blur-sm sm:p-9">
                  <div>
                    <h3 className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      <MapPin className="size-4 shrink-0 text-gi-navy" strokeWidth={1.5} aria-hidden />
                      Location
                    </h3>
                    <p className="mt-3 font-sans text-lg font-medium text-gi-navy">{project.location}</p>
                  </div>
                  <Separator className="bg-border/70" />
                  <div>
                    <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Timeline</h3>
                    <ul className="relative mt-5 space-y-6 border-l border-gi-navy/12 pl-6">
                      {project.timeline.map((phase) => (
                        <li key={phase.label} className="relative">
                          <span className="absolute -left-6 top-1.5 size-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-gi-navy shadow-[0_0_0_3px_rgba(201,168,76,0.2)]" aria-hidden />
                          <p className="font-sans text-sm font-semibold text-gi-navy">{phase.label}</p>
                          <p className="mt-0.5 font-sans text-sm text-muted-foreground">{phase.value}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="rounded-full border border-gi-navy/12 bg-gi-navy/[0.04] px-4 py-2 font-sans text-xs font-semibold text-gi-navy">{project.status}</span>
                    <span className="rounded-full border border-gi-navy/12 bg-white px-4 py-2 font-sans text-xs font-semibold text-gi-navy/80">{projectTypeLabels[project.type]}</span>
                    {project.area !== "—" ? <span className="rounded-full border border-gi-navy/12 bg-white px-4 py-2 font-sans text-xs font-semibold text-muted-foreground">{project.area}</span> : null}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden border-b border-border/60 bg-white" aria-labelledby="project-features-heading">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gi-navy/12 to-transparent" aria-hidden />
        <div className="ds-section">
          <div className="ds-container">
            <SectionEyebrow>{featuresEyebrow}</SectionEyebrow>
            <h2 id="project-features-heading" className="mt-4 max-w-2xl font-heading text-[clamp(1.75rem,3.5vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-gi-navy">
              {featuresTitle}
            </h2>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {project.features.map((f) => {
                const Icon = FEATURE_ICONS[f.icon];
                return (
                  <div key={f.title} className={cn(luxCard, "flex gap-4 p-7 sm:p-8", luxEase, "hover:-translate-y-0.5")}>
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-gi-navy/10 bg-gi-navy/[0.04] text-gi-navy shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7)]">
                      <Icon className="size-5" strokeWidth={1.25} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-heading text-lg font-semibold tracking-tight text-gi-navy">{f.title}</h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {hasUnits ? (
        <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-gi-navy/[0.03] to-white" aria-labelledby="project-units-heading">
          <div className="ds-section">
            <div className="ds-container">
              <SectionEyebrow>Inventory</SectionEyebrow>
              <h2 id="project-units-heading" className="mt-4 max-w-2xl font-heading text-[clamp(1.75rem,3.5vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-gi-navy">
                Scale at a glance
              </h2>
              <p className="mt-4 max-w-2xl font-sans text-muted-foreground sm:text-[0.9375rem]">Residential, retail, and office volumes for this development — confirm live availability with our team.</p>
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {project.unitsInfo.apartments ? <UnitBlockCard block={project.unitsInfo.apartments} /> : null}
                {project.unitsInfo.shops ? <UnitBlockCard block={project.unitsInfo.shops} /> : null}
                {project.unitsInfo.offices ? <UnitBlockCard block={project.unitsInfo.offices} /> : null}
              </div>
              <div className="mt-12 flex flex-wrap gap-4">
                <Button render={<Link href={`/contact?project=${encodeURIComponent(project.slug)}`} />} nativeButton={false} size="lg" className="h-12 rounded-xl bg-gi-navy px-8 font-semibold text-white shadow-[0_16px_40px_-20px_rgba(13,27,62,0.45)] transition-colors hover:bg-gi-navy/92">
                  Request inventory
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
