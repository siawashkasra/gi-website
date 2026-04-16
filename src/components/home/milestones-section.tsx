import Image from "next/image";
import { SectionHeading } from "@/components/shared/section-heading";
import { milestones } from "@/data/home-premium";

const milestonesImageSrc = "/images/home/milestones-side.png";

export function MilestonesSection() {
  return (
    <section id="milestones" className="ds-section border-b border-border/60 bg-muted/30" aria-labelledby="milestones-heading">
      <div className="ds-container">
        <SectionHeading id="milestones-heading" eyebrow="Track record" title="Milestones" description="From establishment through flagship delivery to today’s diversified portfolio." className="max-w-xl" />
        <div className="mt-14 grid items-start gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <ol className="relative space-y-0 border-l border-border pl-6">
            {milestones.map((m) => (
              <li key={m.title} className="relative pb-10 pl-2 last:pb-0">
                <span className="absolute -left-6 top-1.5 size-2.5 -translate-x-1/2 rounded-full border-2 border-background bg-primary ring-2 ring-primary/25" aria-hidden />
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-primary">{m.year}</p>
                <h3 className="mt-2 font-serif text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{m.title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{m.detail}</p>
              </li>
            ))}
          </ol>
          <div className="relative lg:sticky lg:top-28">
            <div className="group/image relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-xl ring-1 ring-border/50 sm:aspect-[16/10] lg:aspect-[4/5] xl:aspect-[3/4]">
              <Image src={milestonesImageSrc} alt="Gulbahar flagship development" fill className="object-cover object-center transition-transform duration-700 ease-out group-hover/image:scale-[1.03]" sizes="(max-width:1024px) 100vw, 45vw" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-primary/10 via-transparent to-transparent" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
