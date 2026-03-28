import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/site";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore the development portfolio of ${siteConfig.name}: commercial, residential, retail, and infrastructure.`,
  openGraph: { title: `Projects | ${siteConfig.name}` },
};

export default function ProjectsPage() {
  return (
    <div className="border-b border-border/60">
      <div className="border-b border-border/60 bg-muted/25 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Portfolio" title="Projects" description="Every asset reflects a long-term commitment to quality, employment, and economic contribution." />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} priority={i < 2} />
          ))}
        </div>
      </div>
    </div>
  );
}
