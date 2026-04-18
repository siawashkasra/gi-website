import { SectionHeading } from "@/components/shared/section-heading";
import { competitiveStrengths } from "@/data/company-profile";

export function CompanyStrengthsFull() {
  return (
    <section id="strengths" className="ds-section border-b border-border/60 bg-section-alt" aria-labelledby="strengths-heading">
      <div className="ds-container">
        <SectionHeading id="strengths-heading" align="center" eyebrow="Position" title="Competitive strengths" description="Six coordinated advantages that underpin delivery and capital discipline." className="mx-auto max-w-2xl" />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {competitiveStrengths.map((s) => (
            <div key={s.order} className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl">
              <span className="absolute right-4 top-4 font-sans text-5xl font-bold tabular-nums text-primary/10">{s.order}</span>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary">Strength {s.order}</p>
              <h3 className="mt-3 font-serif text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
