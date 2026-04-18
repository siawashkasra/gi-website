import { SectionHeading } from "@/components/shared/section-heading";
import { sustainabilityStandards, technologyStandards } from "@/data/company-profile";

export function CompanyTechSustainability() {
  return (
    <section id="standards-full" className="ds-section border-b border-border/60 bg-section" aria-labelledby="tech-sus-heading">
      <div className="ds-container grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading id="tech-sus-heading" eyebrow="Built to perform" title="Technology & infrastructure standards" />
          <p className="mt-8 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">{technologyStandards}</p>
        </div>
        <div>
          <SectionHeading eyebrow="Responsibility" title="Sustainability & social responsibility" />
          <p className="mt-8 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">{sustainabilityStandards}</p>
        </div>
      </div>
    </section>
  );
}
