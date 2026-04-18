import Link from "next/link";
import { ArrowUpRight, Factory, Flame, LayoutGrid, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { coreBusinessAreas } from "@/data/company-profile";
import { projects } from "@/data/projects";

const areaIcons = [LayoutGrid, Sparkles, Factory, Flame] as const;

export function CompanyCoreAreasFull() {
  return (
    <section id="core-areas" className="ds-section border-b border-border/60 bg-section-alt" aria-labelledby="core-areas-full-heading">
      <div className="ds-container">
        <SectionHeading id="core-areas-full-heading" align="center" eyebrow="Sectors" title="Core business areas" description="Four primary platforms that organize investment and delivery." className="mx-auto max-w-2xl" />
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {coreBusinessAreas.map((area, i) => {
            const Icon = areaIcons[i] ?? LayoutGrid;
            return (
              <article key={area.title} className="flex flex-col rounded-2xl border border-border/60 bg-card p-8 shadow-xl transition-all duration-300 hover:border-primary/20 lg:p-10">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
                  <Icon className="size-6" aria-hidden />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-semibold tracking-tight">{area.title}</h3>
                <p className="mt-4 flex-1 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">{area.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {area.projectSlugs.map((slug) => {
                    const label = projects.find((p) => p.slug === slug)?.name ?? slug;
                    return (
                      <Button key={slug} render={<Link href={`/projects/${slug}`} />} nativeButton={false} size="sm" variant="outline" className="rounded-xl border-primary/25 font-semibold text-primary hover:bg-primary/5">
                        {label} <ArrowUpRight className="ml-1 inline size-3.5" aria-hidden />
                      </Button>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
