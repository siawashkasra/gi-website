import { SectionHeading } from "@/components/shared/section-heading";
import { clientsPartners } from "@/data/company-profile";

export function CompanyClientsSection() {
  return (
    <section id="clients" className="ds-section border-b border-border/60 bg-white" aria-labelledby="clients-heading">
      <div className="ds-container max-w-3xl text-center">
        <SectionHeading id="clients-heading" align="center" eyebrow="Ecosystem" title={clientsPartners.title} />
        <p className="mx-auto mt-6 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">{clientsPartners.note}</p>
      </div>
    </section>
  );
}
