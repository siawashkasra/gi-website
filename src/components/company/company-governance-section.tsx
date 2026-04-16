import { SectionHeading } from "@/components/shared/section-heading";
import { governanceIntro } from "@/data/company-profile";

export function CompanyGovernanceSection() {
  return (
    <section id="governance" className="ds-section border-b border-border/60 bg-muted/20" aria-labelledby="governance-heading">
      <div className="ds-container max-w-4xl">
        <SectionHeading id="governance-heading" eyebrow="Structure" title="Corporate governance" description="Board direction and executive delivery across sectors." />
        <div className="mt-10 space-y-5 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
          {governanceIntro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
