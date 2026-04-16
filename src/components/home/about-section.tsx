import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { companyAbout, homeHighlights } from "@/data/company-profile";

const imageSrc = "/images/home/about-multi-sector-platform.png";

export function AboutSection() {
  return (
    <section id="about" className="ds-section border-b border-border/60 bg-background" aria-labelledby="about-heading">
      <div className="ds-container">
        <FadeIn className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <div className="relative">
            <div className="group/image relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-2xl ring-1 ring-border/50 sm:aspect-[3/4] lg:aspect-[4/5]">
              <Image src={imageSrc} alt="Gulbahar Plaza mixed-use development" fill className="object-cover object-center transition-transform duration-700 ease-out group-hover/image:scale-105" sizes="(max-width:1024px) 100vw, 50vw" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-transparent" aria-hidden />
            </div>
            <div className="pointer-events-none absolute -bottom-4 -right-4 -z-10 hidden h-48 w-48 rounded-2xl bg-primary/15 blur-2xl sm:block" aria-hidden />
          </div>
          <div className="space-y-10 lg:max-w-xl xl:max-w-none">
            <header className="space-y-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-primary">About Gulbahar Investment</p>
              <h2 id="about-heading" className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[2.85rem] md:leading-[1.08]">{companyAbout.headline}</h2>
              <div className="space-y-5 text-base leading-[1.8] text-muted-foreground sm:text-lg">
                {companyAbout.paragraphs.slice(0, homeHighlights.aboutParagraphCount).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="pt-2">
                <Button render={<Link href={homeHighlights.companyCtaPath} />} nativeButton={false} variant="outline" size="lg" className="h-12 rounded-xl border-primary/30 px-8 font-semibold text-primary hover:bg-primary/5">
                  Full company profile
                </Button>
              </div>
            </header>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
