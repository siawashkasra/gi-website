import { SectionHeading } from "@/components/shared/section-heading";
import { testimonials } from "@/data/home-premium";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="ds-section border-b border-border/60 bg-background" aria-labelledby="testimonials-heading">
      <div className="ds-container">
        <SectionHeading id="testimonials-heading" align="center" eyebrow="Recognition" title="What partners value" description="Themes we hear consistently from occupiers, retail partners, and advisors who work with us across the portfolio." className="mx-auto max-w-2xl" />
        <ul className="mt-14 grid list-none gap-8 lg:mt-16 lg:grid-cols-3 lg:gap-10">
          {testimonials.map((t, idx) => (
            <li key={idx} className="flex flex-col rounded-2xl border border-border/60 bg-card p-8 shadow-lg transition-all duration-300 hover:border-primary/20 hover:shadow-xl">
              <p className="font-sans text-lg font-normal leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-8 border-t border-border/60 pt-6">
                <p className="font-sans text-sm font-semibold text-primary">{t.attribution}</p>
                <p className="mt-1 font-sans text-xs text-muted-foreground">{t.context}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
