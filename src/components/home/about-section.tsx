import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site";

const imageSrc = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85";

export function AboutSection() {
  return (
    <section className="ds-section border-b border-border/60 bg-background" aria-labelledby="about-heading">
      <div className="ds-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-[0_24px_48px_-20px_rgba(0,0,0,0.2)] ring-1 ring-border/60 sm:aspect-[3/4] lg:aspect-[4/5]">
              <Image src={imageSrc} alt="Gulbahar Investment workspace and development" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-foreground/10 via-transparent to-transparent" aria-hidden />
            </div>
            <div className="pointer-events-none absolute -bottom-4 -right-4 -z-10 hidden h-48 w-48 rounded-2xl bg-primary/15 blur-2xl sm:block" aria-hidden />
          </div>
          <div className="space-y-10 lg:max-w-xl xl:max-w-none">
            <header className="space-y-5">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-primary">About us</p>
              <h2 id="about-heading" className="font-serif text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-[2.5rem] md:leading-[1.12]">
                Afghan-owned. Built for the long term.
              </h2>
              <div className="space-y-4 text-base leading-[1.75] text-muted-foreground sm:text-[1.0625rem]">
                <p>
                  {siteConfig.name} is a non-political, Afghan-owned company established in <strong className="font-medium text-foreground">2006</strong> to deliver real estate and large-scale development with uncompromising quality. We are part of the Gulbahar Group of Companies, registered with the Ministry of Commerce and Industries, and committed to supporting reconstruction and economic growth.
                </p>
                <p>
                  From mixed-use landmarks to power and industrial assets, our portfolio reflects a single promise: spaces and infrastructure that serve communities, tenants, and investors for decades.
                </p>
              </div>
            </header>
            <div className="space-y-8 pt-2">
              <div className="space-y-3">
                <h3 className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">Mission</h3>
                <p className="max-w-prose text-base leading-[1.75] text-foreground sm:text-[1.0625rem]">
                  To develop sustainable, innovative, and high-quality projects that strengthen communities and drive responsible economic growth across Afghanistan and the wider region.
                </p>
              </div>
              <Separator className="bg-border/80" />
              <div className="space-y-3">
                <h3 className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">Vision</h3>
                <p className="max-w-prose text-base leading-[1.75] text-foreground sm:text-[1.0625rem]">
                  To be Afghanistan&apos;s leading investment company — recognized for excellence, trust, and development that improves how people live, work, and build the future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
