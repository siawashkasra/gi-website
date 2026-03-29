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
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0f172a]/20 via-transparent to-transparent" aria-hidden />
            </div>
            <div className="pointer-events-none absolute -bottom-4 -right-4 -z-10 hidden h-48 w-48 rounded-2xl bg-primary/15 blur-2xl sm:block" aria-hidden />
          </div>
          <div className="space-y-10 lg:max-w-xl xl:max-w-none">
            <header className="space-y-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-primary">About Gulbahar Investment</p>
              <h2 id="about-heading" className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[2.85rem] md:leading-[1.08]">
                Afghan-owned. Serving communities since 2006.
              </h2>
              <div className="space-y-5 text-base leading-[1.8] text-muted-foreground sm:text-lg">
                <p>
                  {siteConfig.name} is a non-political, Afghan-owned and operated company that was established in <strong className="font-medium text-foreground">2006</strong> in order to provide real estate services.
                </p>
                <p>
                  {siteConfig.name} is part of the Gulbahar Group of Companies. It is registered with the Ministry of Commerce and Industries. The company was established to take part in the rebuilding process and to provide the community with excellent services.
                </p>
                <p>
                  We strive to accomplish our mission with discipline and integrity — to show that we are a leading provider in the country and the wider region. {siteConfig.name} has developed major projects including Gulbahar Center, Gulbahar Towers, Gulbahar Plaza, Gulbahar Power, and Gulbahar Cement. We are committed to sustainable, dynamic project development and to nurturing Afghanistan&apos;s emerging economy.
                </p>
                <p>
                  We have provided thousands of Afghans with jobs and helped strengthen their skills to serve society.
                </p>
              </div>
            </header>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
