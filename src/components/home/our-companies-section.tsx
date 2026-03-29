import { SectionHeading } from "@/components/shared/section-heading";
import { OurCompaniesGrid } from "@/components/home/our-companies-grid";

export function OurCompaniesSection() {
  return (
    <section id="companies" className="ds-section relative overflow-visible border-b border-border/60 bg-background" aria-labelledby="our-companies-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_-10%,var(--color-primary)/0.06,transparent)]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" aria-hidden />
      <div className="relative ds-container">
        <SectionHeading id="our-companies-heading" align="center" eyebrow="Portfolio" title="Our Companies" description="Gulbahar Investment is part of the Gulbahar Group of Companies, registered with the Ministry of Commerce and Industries — spanning development, industry, and energy." className="mx-auto max-w-xl" />
        <OurCompaniesGrid />
      </div>
    </section>
  );
}
