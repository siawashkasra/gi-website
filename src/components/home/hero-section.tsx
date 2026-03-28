import Link from "next/link";
import { HeroParallaxMedia } from "@/components/home/hero-parallax-media";
import { Button } from "@/components/ui/button";

const heroImageSrc = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=2400&q=90";

export function HeroSection() {
  return (
    <section className="relative min-h-screen h-[100dvh] w-full overflow-hidden" aria-labelledby="hero-heading">
      <HeroParallaxMedia imageSrc={heroImageSrc} />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/[0.72] via-black/[0.64] to-black/[0.70]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_70%_at_50%_100%,rgba(212,175,55,0.07),transparent_60%)]" aria-hidden />
      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 sm:py-28">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <p className="hero-animate hero-animate-delay-1 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-primary sm:text-xs sm:tracking-[0.42em]">
              Welcome to
            </p>
            <div className="hero-animate hero-animate-delay-2 mt-6 h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent sm:mt-7 sm:w-16" aria-hidden />
            <h1 id="hero-heading" className="hero-animate hero-animate-delay-2 mt-8 font-serif text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:mt-10 sm:text-6xl sm:leading-[1.04] md:text-7xl md:leading-[1.02]">
              Gulbahar Investment
            </h1>
            <p className="hero-animate hero-animate-delay-3 mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-white/78 sm:mt-8 sm:text-lg md:text-xl md:leading-relaxed">
              Non-political, Afghan-owned real estate services since 2006 — part of the Gulbahar Group of Companies, registered with the Ministry of Commerce and Industries.
            </p>
            <div className="hero-animate hero-animate-delay-4 mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-12 sm:gap-4">
              <Button render={<Link href="/projects" />} nativeButton={false} size="lg" className="h-12 min-w-[11rem] border-0 bg-primary px-8 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground shadow-[0_0_48px_-10px_rgba(200,165,90,0.5)] transition-[transform,box-shadow] duration-300 hover:bg-primary/90 hover:shadow-[0_0_56px_-8px_rgba(200,165,90,0.6)] active:translate-y-px">
                Explore Projects
              </Button>
              <Button
                render={<Link href="/contact" />}
                nativeButton={false}
                variant="outline"
                size="lg"
                className="h-12 min-w-[11rem] border-white/40 bg-white/[0.04] px-8 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-[transform,background-color,border-color] duration-300 hover:border-primary/45 hover:bg-white/10 hover:text-white"
              >
                Book a Visit
              </Button>
            </div>
          </div>
        </div>
        <div className="hero-animate hero-animate-delay-5 pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-10" aria-hidden>
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.35em] text-white/40">Scroll</span>
          <span className="hero-scroll-hint h-10 w-px rounded-full bg-gradient-to-b from-transparent via-primary/65 to-transparent" />
        </div>
      </div>
    </section>
  );
}
