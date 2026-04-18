import Image from "next/image";
import { SectionHeading } from "@/components/shared/section-heading";
import { ceoProfile } from "@/data/company-profile";

const ceoPortrait = "/images/ghulam-rabani-rabani.png";

export function CompanyCeoBlock() {
  return (
    <section id="ceo" className="ds-section border-b border-border/60 bg-section-alt" aria-labelledby="ceo-company-heading">
      <div className="ds-container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-border lg:order-1 lg:mx-0">
          <Image src={ceoPortrait} alt={ceoProfile.name} fill className="object-cover object-[center_12%]" sizes="(max-width:1024px) 100vw, 40vw" />
        </div>
        <div className="order-1 space-y-6 lg:order-2">
          <SectionHeading id="ceo-company-heading" eyebrow="Leadership" title="Message from the CEO" />
          <p className="font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">{ceoProfile.quote}</p>
          <footer className="border-t border-border/70 pt-6">
            <p className="font-serif text-2xl font-semibold text-foreground">{ceoProfile.name}</p>
            <p className="mt-2 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary">{ceoProfile.title}</p>
          </footer>
        </div>
      </div>
    </section>
  );
}
