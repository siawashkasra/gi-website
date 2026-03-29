import Link from "next/link";
import { HeroParallaxMedia } from "@/components/home/hero-parallax-media";
import { Button } from "@/components/ui/button";

const heroImageSrc = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=2880&q=92";

export function HeroSection() {
  return (
    <section className="relative min-h-screen h-[100dvh] w-full overflow-hidden" aria-labelledby="hero-heading">
      <HeroParallaxMedia imageSrc={heroImageSrc} />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#1f4e79]/76 via-[#1f4e79]/58 to-[#1f4e79]/78" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_70%_at_50%_100%,rgba(47,110,165,0.11),transparent_58%)]" aria-hidden />
      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-24">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
            <p className="hero-animate hero-animate-delay-1 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-white/90 sm:text-xs sm:tracking-[0.42em]">
              Welcome to
            </p>
            <div className="hero-animate hero-animate-delay-2 mt-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-transparent via-white/85 to-transparent sm:mt-7 sm:w-20" aria-hidden />
            <h1 id="hero-heading" className="hero-animate hero-animate-delay-2 mt-8 font-serif text-5xl font-bold leading-[1.02] tracking-[-0.035em] text-white sm:mt-10 sm:text-6xl sm:leading-[0.98] md:text-7xl md:leading-[0.98] lg:text-8xl lg:leading-[0.96]">
              Gulbahar Investment
            </h1>
            <p className="hero-animate hero-animate-delay-3 mx-auto mt-8 max-w-2xl font-sans text-base font-normal leading-relaxed text-white/82 sm:mt-10 sm:text-lg md:text-xl">
              Non-political, Afghan-owned real estate services since 2006 — part of the Gulbahar Group of Companies, registered with the Ministry of Commerce and Industries.
            </p>
            <div className="hero-animate hero-animate-delay-4 mt-12 flex flex-wrap items-center justify-center gap-4 sm:mt-14 sm:gap-5">
              <Button render={<Link href="/projects" />} nativeButton={false} size="lg" className="h-14 min-w-[12.5rem] rounded-xl border-2 border-white bg-white px-10 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-primary shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[#2f6ea5] hover:bg-[#f5f7fa] hover:text-primary">
                Explore Projects
              </Button>
              <Button render={<Link href="/contact" />} nativeButton={false} variant="outline" size="lg" className="h-14 min-w-[12.5rem] rounded-xl border-2 border-white/50 bg-white/[0.08] px-10 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#2f6ea5] hover:bg-[#2f6ea5]/25 hover:text-white hover:scale-[1.02]">
                Book a Visit
              </Button>
            </div>
          </div>
        </div>
        <div className="hero-animate hero-animate-delay-5 pointer-events-none shrink-0 pb-6 pt-2 sm:pb-8" aria-hidden>
          <div className="mx-auto flex flex-col items-center gap-2">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-white/85 sm:text-xs">Scroll</span>
            <span className="hero-scroll-hint h-11 w-0.5 rounded-full bg-gradient-to-b from-transparent via-white/80 to-transparent sm:h-12" />
          </div>
        </div>
      </div>
    </section>
  );
}
