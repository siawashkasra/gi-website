import Link from "next/link";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = projects.slice(0, 3);
  return (
    <section className="border-b border-border/60 bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Portfolio" title="Signature developments" description="A curated selection of active and delivered assets across real estate and infrastructure." className="max-w-xl" />
          <Button render={<Link href="/projects" />} nativeButton={false} variant="outline" size="sm" className="shrink-0 self-start md:self-auto">
            Full catalog
          </Button>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
