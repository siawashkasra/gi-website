import type { Metadata } from "next";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { siteConfig } from "@/lib/site";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore the development portfolio of ${siteConfig.name}: residential, commercial, and mixed-use landmarks across Afghanistan.`,
  openGraph: { title: `Projects | ${siteConfig.name}` },
};

export default function ProjectsPage() {
  return (
    <div className="border-b border-border/60">
      <div className="relative overflow-hidden border-b border-border/60 bg-foreground text-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_70%_-20%,var(--color-primary)/0.35,transparent_50%)]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.04)_50%,transparent_60%)]" aria-hidden />
        <div className="relative ds-container py-20 sm:py-24 lg:py-28">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-primary">{siteConfig.name}</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl md:text-[3.25rem]">Our developments</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
            Browse residential towers, commercial destinations, and mixed-use landmarks — filter by typology to find the right scale and stage for your inquiry.
          </p>
          <p className="mt-8 text-sm font-medium text-white/50">{projects.length} active and delivered assets</p>
        </div>
      </div>
      <div className="relative ds-container py-14 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(100%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden />
        <ProjectsExplorer projects={projects} />
      </div>
    </div>
  );
}
