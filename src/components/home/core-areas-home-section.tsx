import Link from "next/link";
import { ArrowUpRight, Factory, Flame, LayoutGrid, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { coreBusinessAreas, homeHighlights, leadFromBody } from "@/data/company-profile";

const areaIcons = [LayoutGrid, Sparkles, Factory, Flame] as const;

export function CoreAreasHomeSection() {
  return (
    <section id="core-areas" className="ds-section border-b border-border/60 bg-white" aria-labelledby="core-areas-heading">
      <div className="ds-container">
        <FadeIn>
          <SectionHeading id="core-areas-heading" align="center" eyebrow="Platform" title="Core business areas" description="Four integrated pillars that align real estate, commercial, industrial, and energy capacity." className="mx-auto max-w-2xl" />
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {coreBusinessAreas.map((area, i) => {
              const Icon = areaIcons[i] ?? LayoutGrid;
              const href = area.projectSlugs[0] ? `/projects/${area.projectSlugs[0]}` : homeHighlights.companyCtaPath;
              return (
                <article key={area.title} className="relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-muted/30 via-white to-white p-8 shadow-lg transition-all duration-300 hover:border-primary/20 hover:shadow-xl lg:p-10">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,var(--color-primary)/0.06,transparent)]" aria-hidden />
                  <div className="relative flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
                    <Icon className="size-6" aria-hidden />
                  </div>
                  <h3 className="relative mt-6 font-serif text-xl font-semibold tracking-tight sm:text-2xl">{area.title}</h3>
                  <p className="relative mt-4 flex-1 font-sans text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">{leadFromBody(area.body, 280)}</p>
                  <div className="relative mt-6 flex flex-wrap gap-3">
                    <Button render={<Link href={href} />} nativeButton={false} size="sm" className="rounded-xl px-4 font-semibold">
                      Explore <ArrowUpRight className="ml-1 inline size-3.5" aria-hidden />
                    </Button>
                    <Button render={<Link href={`${homeHighlights.companyCtaPath}#core-areas`} />} nativeButton={false} variant="outline" size="sm" className="rounded-xl border-primary/25 px-4 font-semibold text-primary hover:bg-primary/5">
                      Read full context
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
