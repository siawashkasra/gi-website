import Link from "next/link";
import { Building2, Globe2, Landmark, Layers3, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { companySnapshot, homeHighlights } from "@/data/company-profile";

const icons = [Building2, MapPin, Globe2, Layers3, Landmark, Building2, Building2, Layers3, Landmark] as const;

export function CompanySnapshotSection() {
  return (
    <section id="snapshot" className="ds-section relative border-b border-border/60 bg-gradient-to-b from-muted/40 to-background" aria-labelledby="snapshot-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" aria-hidden />
      <div className="ds-container">
        <FadeIn>
          <SectionHeading id="snapshot-heading" align="center" eyebrow="At a glance" title="Company snapshot" description="Structured facts that anchor scale, geography, and sector focus." className="mx-auto max-w-2xl" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {companySnapshot.slice(0, homeHighlights.snapshotHomeCount).map((row, i) => {
              const Icon = icons[i] ?? Building2;
              return (
                <div key={row.label} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-white p-6 shadow-lg transition-all duration-300 hover:border-primary/25 hover:shadow-xl">
                  <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-primary/[0.06] transition-transform duration-500 group-hover:scale-110" aria-hidden />
                  <div className="relative flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <p className="relative mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{row.label}</p>
                  <p className="relative mt-2 font-sans text-sm font-normal leading-relaxed text-foreground sm:text-base">{row.value}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex justify-center">
            <Button render={<Link href={`${homeHighlights.companyCtaPath}#governance`} />} nativeButton={false} variant="outline" size="lg" className="h-12 rounded-xl border-primary/25 px-8 font-semibold text-primary hover:bg-primary/5">
              Governance & structure
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
