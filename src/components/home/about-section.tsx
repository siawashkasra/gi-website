import Image from "next/image";
import { siteConfig } from "@/lib/site";

const imageSrc = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85";

export function AboutSection() {
  return (
    <section className="ds-section border-b border-border/60 bg-background" aria-labelledby="about-heading">
      <div className="ds-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-[0_24px_48px_-20px_rgba(0,0,0,0.2)] ring-1 ring-border/60 sm:aspect-[3/4] lg:aspect-[4/5]">
              <Image src={imageSrc} alt="Gulbahar Investment developments and workspace" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-foreground/10 via-transparent to-transparent" aria-hidden />
            </div>
            <div className="pointer-events-none absolute -bottom-4 -right-4 -z-10 hidden h-48 w-48 rounded-2xl bg-primary/15 blur-2xl sm:block" aria-hidden />
          </div>
          <div className="space-y-10 lg:max-w-xl xl:max-w-none">
            <header className="space-y-5">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-primary">About Gulbahar Investment</p>
              <h2 id="about-heading" className="font-serif text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-[2.5rem] md:leading-[1.12]">
                Afghan-owned. Serving communities since 2006.
              </h2>
              <div className="space-y-4 text-base leading-[1.75] text-muted-foreground sm:text-[1.0625rem]">
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
        </div>
      </div>
    </section>
  );
}
