import { SectionHeading } from "@/components/shared/section-heading";
import { milestones } from "@/data/home-premium";

export function MilestonesSection() {
  return (
    <section id="milestones" className="ds-section border-b border-border/60 bg-muted/30" aria-labelledby="milestones-heading">
      <div className="ds-container">
        <SectionHeading id="milestones-heading" eyebrow="Track record" title="Milestones" description="From establishment through flagship delivery to today’s diversified portfolio." className="max-w-xl" />
        <ol className="relative mt-14 space-y-0 border-l border-border pl-6 lg:mt-16">
          {milestones.map((m) => (
            <li key={m.title} className="relative pb-10 pl-2 last:pb-0">
              <span className="absolute -left-6 top-1.5 size-2.5 -translate-x-1/2 rounded-full border-2 border-background bg-primary ring-2 ring-primary/25" aria-hidden />
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-primary">{m.year}</p>
              <h3 className="mt-2 font-serif text-xl font-bold tracking-tight text-foreground sm:text-2xl">{m.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{m.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
