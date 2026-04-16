import { SectionHeading } from "@/components/shared/section-heading";
import { companyAbout } from "@/data/company-profile";

export function CompanyAboutFull() {
  return (
    <section id="about-full" className="ds-section border-b border-border/60 bg-background" aria-labelledby="about-full-heading">
      <div className="ds-container max-w-4xl">
        <SectionHeading id="about-full-heading" eyebrow="Who we are" title={companyAbout.headline} />
        <div className="mt-10 space-y-5 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
          {companyAbout.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
