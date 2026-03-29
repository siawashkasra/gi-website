import Link from "next/link";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects, projects } from "@/data/projects";

export function FeaturedProjects() {
  const marked = getFeaturedProjects();
  const featured = marked.length > 0 ? marked : projects.slice(0, 3);
  return (
    <section id="featured-projects" className="ds-section relative border-b border-border/60 bg-gradient-to-b from-[#f8f8f8] via-white to-[#f8f8f8]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" aria-hidden />
      <div className="ds-container">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Featured" title="Featured projects" description="Landmark developments including Gulbahar Center, Gulbahar Towers, Gulbahar Plaza, Gulbahar Power, and Gulbahar Cement — built for lasting value across Kabul and the region." className="max-w-xl" />
          <Button render={<Link href="/projects" />} nativeButton={false} variant="outline" size="sm" className="h-9 shrink-0 self-start border-primary/20 px-5 text-xs font-semibold uppercase tracking-[0.18em] hover:border-primary/40 hover:bg-primary/5 md:self-auto">
            View all
          </Button>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
