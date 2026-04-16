import { Building2, Globe2, Landmark, Layers3, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { companySnapshot } from "@/data/company-profile";

const icons = [Building2, MapPin, Globe2, Layers3, Landmark, Building2, Building2, Layers3, Landmark] as const;

export function CompanySnapshotFull() {
  return (
    <section id="snapshot-full" className="ds-section border-b border-border/60 bg-background" aria-labelledby="snapshot-full-heading">
      <div className="ds-container">
        <SectionHeading id="snapshot-full-heading" eyebrow="Facts" title="Company snapshot" description="Complete snapshot aligned with the official company profile." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {companySnapshot.map((row, i) => {
            const Icon = icons[i] ?? Building2;
            return (
              <div key={row.label} className="rounded-2xl border border-border/60 bg-white p-6 shadow-md transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{row.label}</p>
                <p className="mt-2 text-sm font-normal leading-relaxed text-foreground sm:text-base">{row.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
