import { SectionHeading } from "@/components/shared/section-heading";
import { companyMission, companyVision } from "@/data/company-profile";

export function CompanyMissionVisionBlock() {
  return (
    <section className="ds-section border-b border-border/60 bg-muted/20" aria-labelledby="mv-company-heading">
      <div className="ds-container">
        <SectionHeading id="mv-company-heading" align="center" eyebrow="Direction" title="Vision & mission" className="mx-auto max-w-2xl" />
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-white p-8 shadow-lg sm:p-10">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary">Mission</p>
            <p className="mt-4 font-sans text-base leading-relaxed text-foreground sm:text-lg">{companyMission}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-white p-8 shadow-lg sm:p-10">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary">Vision</p>
            <p className="mt-4 font-sans text-base leading-relaxed text-foreground sm:text-lg">{companyVision}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
