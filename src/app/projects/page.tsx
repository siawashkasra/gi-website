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
      <div className="relative overflow-hidden border-b border-border bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_70%_-20%,rgba(47,110,165,0.35),transparent_52%)]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.05)_50%,transparent_65%)]" aria-hidden />
        <div className="relative ds-container py-24 sm:py-28 lg:py-36">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.36em] text-[#2f6ea5]">{siteConfig.name}</p>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-bold leading-[1.04] tracking-tight text-white sm:text-6xl md:text-7xl md:leading-[1.02]">Our developments</h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg md:text-xl">
            Browse residential towers, commercial destinations, and mixed-use landmarks — filter by typology to find the right scale and stage for your inquiry.
          </p>
          <p className="mt-10 text-sm font-medium uppercase tracking-[0.2em] text-white/45">{projects.length} active and delivered assets</p>
        </div>
      </div>
      <div className="relative bg-muted">
        <div className="relative ds-container py-20 sm:py-24 lg:py-28">
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(100%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden />
          <ProjectsExplorer projects={projects} />
        </div>
      </div>
    </div>
  );
}
