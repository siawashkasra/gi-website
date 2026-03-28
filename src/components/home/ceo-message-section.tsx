import Image from "next/image";

const ceoPortrait = "/images/ghulam-rabani-rabani.png";

export function CeoMessageSection() {
  return (
    <section className="ds-section relative overflow-hidden border-b border-border/60 bg-muted/30" aria-labelledby="ceo-message-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_0%_40%,var(--color-primary)/0.07,transparent)]" aria-hidden />
      <div className="relative ds-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[20rem] overflow-hidden rounded-2xl bg-white shadow-[0_24px_48px_-20px_rgba(0,0,0,0.18)] ring-1 ring-border/60 sm:max-w-[22rem] lg:mx-0 lg:max-w-none">
              <Image src={ceoPortrait} alt="Ghulam Rabani Rabani, Chief Executive Officer" fill className="object-cover object-[center_12%]" sizes="(max-width:1024px) 100vw, 45vw" />
            </div>
            <div className="pointer-events-none absolute -bottom-6 -left-6 -z-10 hidden h-40 w-40 rounded-full bg-primary/12 blur-3xl lg:block" aria-hidden />
          </div>
          <div className="order-1 space-y-8 lg:order-2 lg:max-w-xl xl:max-w-none">
            <header className="space-y-4">
              <p className="text-eyebrow">Leadership</p>
              <h2 id="ceo-message-heading" className="font-serif text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-[2.5rem] md:leading-[1.12]">
                Message From The CEO
              </h2>
            </header>
            <div className="space-y-5 text-base leading-[1.8] text-muted-foreground sm:text-[1.0625rem]">
              <p>
                We at Gulbahar Investment have always been focusing on excellent services to give a good taste to our customers. Our history shows pioneering leadership in establishing such services. Our projects are designed by teams of experts and run by professionals to deliver our targeted quality products and services. We always try to give competitive products and services to our customers.
              </p>
            </div>
            <footer className="border-t border-border/70 pt-8">
              <p className="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-[1.75rem]">Ghulam Rabani Rabani</p>
              <p className="mt-2 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">Chief Executive Officer</p>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
