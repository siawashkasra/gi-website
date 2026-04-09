import { SectionHeading } from "@/components/shared/section-heading";

export function MissionVisionSection() {
  return (
    <section className="ds-section relative border-b border-border/60 bg-muted/25" aria-labelledby="mission-vision-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_40%,var(--color-primary)/0.08,transparent)]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/22 to-transparent" aria-hidden />
      <div className="relative ds-container">
        <SectionHeading id="mission-vision-heading" align="center" eyebrow="Direction" title="Mission & vision" className="mx-auto max-w-2xl" />
        <div className="mx-auto mt-14 grid max-w-5xl gap-10 md:mt-16 md:grid-cols-2 md:gap-12">
          <div className="rounded-2xl border border-border/60 bg-white p-8 shadow-lg transition-all duration-300 hover:border-primary/15 hover:shadow-xl sm:p-10">
            <p className="text-eyebrow mb-4">Purpose</p>
            <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">Our Mission</h3>
            <p className="mt-6 font-sans text-lg font-normal leading-relaxed text-foreground sm:text-xl">
              To invest in and develop structured residential, commercial, and infrastructure projects that create long-term value, support modern urban development, and contribute to national economic progress through responsible and disciplined execution.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-muted p-8 shadow-lg transition-all duration-300 hover:border-primary/20 hover:shadow-xl sm:p-10">
            <p className="text-eyebrow mb-4">Ambition</p>
            <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">Our Vision</h3>
            <p className="mt-6 font-sans text-lg font-normal leading-relaxed text-foreground sm:text-xl">
              To be recognized as a leading investment and development group in Afghanistan, delivering quality projects that contribute to sustainable economic and urban growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
