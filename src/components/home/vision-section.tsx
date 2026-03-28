export function VisionSection() {
  return (
    <section className="ds-section relative border-b border-border/60 bg-background" aria-labelledby="vision-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_65%,var(--color-primary)/0.06,transparent)]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/22 to-transparent" aria-hidden />
      <div className="relative ds-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-eyebrow mb-3">Ambition</p>
          <h2 id="vision-heading" className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-[2.625rem] md:leading-[1.1]">Our Vision</h2>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-xl font-normal leading-[1.55] tracking-tight text-foreground sm:text-2xl sm:leading-[1.5] md:text-[1.75rem] md:leading-[1.48]">
            To be Afghanistan&apos;s leading investment company, recognized for excellence, trust, and impactful development.
          </p>
        </div>
      </div>
    </section>
  );
}
