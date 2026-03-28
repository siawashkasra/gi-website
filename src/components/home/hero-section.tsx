import Link from "next/link";
import { HeroMedia } from "@/components/home/hero-media";
import { Button } from "@/components/ui/button";

const posterSrc = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=88";
const videoSrc = "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4";

export function HeroSection() {
  return (
    <section className="relative h-svh min-h-[32rem] w-full overflow-hidden" aria-labelledby="hero-heading">
      <HeroMedia posterSrc={posterSrc} videoSrc={videoSrc} />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-black/35 to-black/[0.88]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/75 via-black/25 to-amber-950/25 hero-overlay-pulse" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_120%_80%_at_50%_100%,rgba(180,140,60,0.12),transparent_55%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" aria-hidden />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-28">
        <div className="max-w-4xl">
          <p className="hero-animate hero-animate-delay-1 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-primary sm:text-xs">
            Gulbahar Investment
          </p>
          <div className="hero-animate hero-animate-delay-2 mt-5 h-px w-16 bg-gradient-to-r from-primary to-primary/0 sm:mt-6 sm:w-20" aria-hidden />
          <h1 id="hero-heading" className="hero-animate hero-animate-delay-2 mt-6 font-serif text-[2.35rem] font-medium leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl sm:leading-[1.04] md:text-6xl md:leading-[1.02] lg:text-[4.25rem] lg:leading-[1.01]">
            Modern Living in the Heart of Kabul
          </h1>
          <p className="hero-animate hero-animate-delay-3 mt-6 max-w-2xl text-base leading-relaxed text-white/78 sm:text-lg sm:leading-relaxed">
            Skyline residences and curated amenities inspired by the world&apos;s finest addresses — refined spaces, private views, and a new standard of urban life in Afghanistan&apos;s capital.
          </p>
          <div className="hero-animate hero-animate-delay-4 mt-10 flex flex-wrap gap-3 sm:gap-4">
            <Button render={<Link href="/projects" />} nativeButton={false} size="lg" className="h-12 min-w-[10.5rem] border-0 bg-primary px-8 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-[0_0_40px_-8px_rgba(200,165,90,0.45)] transition-[transform,box-shadow] duration-300 hover:bg-primary/92 hover:shadow-[0_0_48px_-6px_rgba(200,165,90,0.55)] active:translate-y-px">
              Explore Projects
            </Button>
            <Button
              render={<Link href="/contact" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="h-12 min-w-[10.5rem] border-white/35 bg-white/[0.06] px-8 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md transition-[transform,background-color,border-color] duration-300 hover:border-primary/50 hover:bg-white/12 hover:text-white"
            >
              Book a Visit
            </Button>
          </div>
        </div>
        <div className="hero-animate hero-animate-delay-5 pointer-events-none mt-14 flex flex-col items-center gap-2 sm:absolute sm:bottom-8 sm:left-1/2 sm:mt-0 sm:-translate-x-1/2" aria-hidden>
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.35em] text-white/45">Scroll</span>
          <span className="hero-scroll-hint h-10 w-px rounded-full bg-gradient-to-b from-transparent via-primary/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
