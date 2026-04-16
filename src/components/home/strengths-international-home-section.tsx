import Link from "next/link";
import { Globe2, Shield, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { competitiveStrengths, homeHighlights, internationalPresence, leadFromBody } from "@/data/company-profile";

export function StrengthsInternationalHomeSection() {
  const teaserStrengths = homeHighlights.competitiveStrengthIndices.map((i) => competitiveStrengths[i]).filter(Boolean);
  return (
    <section className="ds-section relative border-b border-border/60 bg-muted/25" aria-labelledby="positioning-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,var(--color-primary)/0.06,transparent)]" aria-hidden />
      <div className="relative ds-container">
        <FadeIn>
          <div className="mx-auto max-w-4xl rounded-2xl border border-border/60 bg-white/90 p-8 shadow-lg backdrop-blur-sm sm:p-10">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-primary">Governance</p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">{homeHighlights.governanceTeaser}</p>
            <Button render={<Link href={`${homeHighlights.companyCtaPath}#governance`} />} nativeButton={false} variant="link" className="mt-4 h-auto p-0 font-semibold text-primary">
              How the board and management operate
            </Button>
          </div>
          <SectionHeading id="positioning-heading" className="mx-auto mt-16 max-w-2xl text-center" align="center" eyebrow="Advantage" title="Strengths & reach" description="Selective highlights from the competitive platform and international connectivity." />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {teaserStrengths.map((s) => (
              <div key={s.order} className="rounded-2xl border border-border/60 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-xl">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 font-sans text-lg font-semibold tabular-nums text-primary">{s.order}</div>
                <h3 className="mt-4 font-serif text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">{leadFromBody(s.body, 200)}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 grid gap-8 border-t border-border/60 pt-14 md:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Globe2 className="size-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold">UAE presence</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">{leadFromBody(internationalPresence.uae, 220)}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="size-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold">Regional links</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">{leadFromBody(internationalPresence.regional, 220)}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Shield className="size-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold">Cross-border</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">{leadFromBody(internationalPresence.crossBorder, 220)}</p>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <Button render={<Link href={`${homeHighlights.companyCtaPath}#market`} />} nativeButton={false} size="lg" className="h-12 rounded-xl px-8 font-semibold">
              Market positioning & outlook
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
