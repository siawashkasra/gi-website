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
import type { Project, ProjectUnitBlock } from "@/data/projects";
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
    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-card to-muted/30 p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full bg-primary/[0.07]" aria-hidden />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className={cn("mt-3 font-serif text-4xl font-medium tracking-tight sm:text-5xl", empty ? "text-muted-foreground/50" : "text-foreground")}>{empty ? "—" : value}</p>
    </div>
  );
}

function UnitCard({ block }: { block: ProjectUnitBlock }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border/70 bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/25 hover:shadow-lg">
      <span className="font-serif text-3xl font-medium text-primary transition-colors group-hover:text-primary/90 sm:text-4xl">{block.count}</span>
      <h3 className="mt-3 font-serif text-xl font-medium tracking-tight">{block.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{block.subtitle}</p>
    </div>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const hasUnits = !!(project.unitsInfo.apartments || project.unitsInfo.shops || project.unitsInfo.offices);
  return (
    <article className="border-b border-border/60">
      <header className="relative h-[min(88vh,52rem)] min-h-[22rem] w-full overflow-hidden">
        <Image src={project.image} alt={project.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/55 to-foreground/25" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_100%,rgba(0,0,0,0.55),transparent)]" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent" aria-hidden />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
          <Button render={<Link href="/projects" />} nativeButton={false} variant="outline" size="sm" className="w-fit border-white/35 bg-black/20 text-white backdrop-blur-md hover:bg-white/15 hover:text-white">
            <ArrowLeft className="mr-2 size-4" aria-hidden />
            All projects
          </Button>
          <div className="mt-auto max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border-0 bg-white/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white backdrop-blur-md">{project.category}</Badge>
              <span className="rounded-full border border-white/20 bg-black/25 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md">{projectTypeLabels[project.type]}</span>
            </div>
            <h1 className="mt-6 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.75rem]">{project.name}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{project.excerpt}</p>
          </div>
        </div>
      </header>
      <section className="relative bg-background py-16 sm:py-20 lg:py-24" aria-labelledby="overview-heading">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Overview</p>
              <h2 id="overview-heading" className="mt-3 font-serif text-3xl font-medium tracking-tight sm:text-4xl">
                A destination shaped for longevity
              </h2>
              <div className="mt-8 space-y-5 text-base leading-[1.75] text-muted-foreground sm:text-[1.0625rem]">
                <p>{project.description}</p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-8 rounded-2xl border border-border/80 bg-muted/25 p-8 shadow-sm backdrop-blur-sm">
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    <MapPin className="size-4 text-primary" aria-hidden />
                    Location
                  </h3>
                  <p className="mt-2 text-lg font-medium text-foreground">{project.location}</p>
                </div>
                <Separator className="bg-border/80" />
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Timeline</h3>
                  <ul className="relative mt-5 space-y-6 border-l border-border pl-6">
                    {project.timeline.map((phase) => (
                      <li key={phase.label} className="relative">
                        <span className="absolute -left-6 top-1.5 size-2.5 -translate-x-1/2 rounded-full border-2 border-background bg-primary ring-2 ring-primary/25" aria-hidden />
                        <p className="text-sm font-medium text-foreground">{phase.label}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">{phase.value}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground">{project.status}</span>
                  {project.area !== "—" ? <span className="rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-muted-foreground">{project.area} GFA</span> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-border/60 bg-muted/20 py-16 sm:py-20" aria-labelledby="stats-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Scale</p>
          <h2 id="stats-heading" className="mt-3 max-w-2xl font-serif text-3xl font-medium tracking-tight sm:text-4xl">
            Key statistics
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <StatCell label="Residential units" value={project.keyStats.units} />
            <StatCell label="Retail & shops" value={project.keyStats.shops} />
            <StatCell label="Facilities & assets" value={project.keyStats.facilities} />
          </div>
        </div>
      </section>
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProjectGallery images={project.gallery} projectName={project.name} />
        </div>
      </section>
      <section className="border-t border-border/60 bg-gradient-to-b from-muted/30 to-background py-16 sm:py-20" aria-labelledby="features-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Experience</p>
          <h2 id="features-heading" className="mt-3 max-w-2xl font-serif text-3xl font-medium tracking-tight sm:text-4xl">
            Signature features
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.features.map((f) => {
              const Icon = FEATURE_ICONS[f.icon];
              return (
                <div key={f.title} className="flex gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-medium tracking-tight">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {project.listings && project.listings.length > 0 ? <PropertyListingsSection projectName={project.name} listings={project.listings} /> : null}
      {hasUnits ? (
        <section className="border-t border-border/60 py-16 sm:py-20 lg:py-24" aria-labelledby="units-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Inventory</p>
            <h2 id="units-heading" className="mt-3 max-w-2xl font-serif text-3xl font-medium tracking-tight sm:text-4xl">
              Apartments, shops & offices
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">Typologies and volumes for this development — speak with our team for live availability and fit-out options.</p>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {project.unitsInfo.apartments ? <UnitCard block={project.unitsInfo.apartments} /> : null}
              {project.unitsInfo.shops ? <UnitCard block={project.unitsInfo.shops} /> : null}
              {project.unitsInfo.offices ? <UnitCard block={project.unitsInfo.offices} /> : null}
            </div>
          </div>
        </section>
      ) : null}
      <section className="relative overflow-hidden bg-foreground py-20 text-background sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,var(--color-primary)/0.2,transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Next step</p>
              <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Visit {project.name}</h2>
              <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">Book a private walkthrough or request investment materials. Our team will confirm timing and access protocols.</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Button render={<Link href="/contact" />} nativeButton={false} size="lg" className="h-12 min-w-[11rem] bg-primary text-primary-foreground hover:bg-primary/90">
                Book a visit
              </Button>
              <Button render={<Link href="/contact" />} nativeButton={false} variant="outline" size="lg" className="h-12 min-w-[11rem] border-white/35 bg-white/5 text-white backdrop-blur-sm hover:bg-white/12 hover:text-white">
                Contact {siteConfig.name.split(" ")[0]}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
