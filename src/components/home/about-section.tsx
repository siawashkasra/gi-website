import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import { siteConfig } from "@/lib/site";

const imageSrc = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85";

export function AboutSection() {
  return (
    <section id="about" className="ds-section border-b border-border/60 bg-background" aria-labelledby="about-heading">
      <div className="ds-container">
        <FadeIn className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <div className="relative">
            <div className="group/image relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-2xl ring-1 ring-border/50 sm:aspect-[3/4] lg:aspect-[4/5]">
              <Image src={imageSrc} alt="Gulbahar Investment developments and workspace" fill className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-105" sizes="(max-width:1024px) 100vw, 50vw" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-transparent" aria-hidden />
            </div>
            <div className="pointer-events-none absolute -bottom-4 -right-4 -z-10 hidden h-48 w-48 rounded-2xl bg-primary/15 blur-2xl sm:block" aria-hidden />
          </div>
          <div className="space-y-10 lg:max-w-xl xl:max-w-none">
            <header className="space-y-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-primary">About Gulbahar Investment</p>
              <h2 id="about-heading" className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[2.85rem] md:leading-[1.08]">
                Privately held. Multi-sector platform since 2006.
              </h2>
              <div className="space-y-5 text-base leading-[1.8] text-muted-foreground sm:text-lg">
                <p>
                  {siteConfig.name} is a privately held Afghan investment and development company established in <strong className="font-medium text-foreground">2006</strong>. Since then it has evolved into a multi-sector enterprise operating across real estate, infrastructure, and industrial activities within Afghanistan.
                </p>
                <p>
                  The company has developed a recognized presence in Kabul through large-scale residential and commercial projects that contribute to the city&apos;s expanding built environment, with organized project execution and sustained capital investment in key metropolitan areas.
                </p>
                <p>
                  Beyond real estate, the group has extended into industrial and energy-related sectors, reinforcing its role in the broader construction and infrastructure landscape. This diversified presence supports participation across multiple stages of development in the domestic market.
                </p>
                <p>
                  Through measured expansion and disciplined project delivery, {siteConfig.name} continues to strengthen its institutional footprint within Afghanistan&apos;s growing urban and infrastructure sectors. The group maintains regional affiliations including a presence in the United Arab Emirates.
                </p>
              </div>
            </header>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
