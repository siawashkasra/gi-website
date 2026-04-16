import { SectionHeading } from "@/components/shared/section-heading";
import { growthOutlook, internationalPresence, marketPositioning } from "@/data/company-profile";

export function CompanyMarketGrowth() {
  return (
    <section id="market" className="ds-section border-b border-border/60 bg-muted/20" aria-labelledby="market-heading">
      <div className="ds-container space-y-16">
        <div>
          <SectionHeading id="market-heading" eyebrow="Markets" title="Market positioning" description="Sector-level differentiation across cement, energy, and integrated infrastructure." />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {marketPositioning.map((m) => (
              <article key={m.title} className="rounded-2xl border border-border/60 bg-white p-8 shadow-md">
                <h3 className="font-serif text-xl font-semibold tracking-tight">{m.title}</h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">{m.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-white p-8 shadow-lg sm:p-10">
          <SectionHeading eyebrow="Forward view" title="Growth outlook" />
          <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">{growthOutlook}</p>
        </div>
        <div>
          <SectionHeading eyebrow="Connectivity" title="International presence" />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <article className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-lg font-semibold">Offices & affiliations</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">{internationalPresence.uae}</p>
            </article>
            <article className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-lg font-semibold">Regional connections</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">{internationalPresence.regional}</p>
            </article>
            <article className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-lg font-semibold">Cross-border positioning</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">{internationalPresence.crossBorder}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
