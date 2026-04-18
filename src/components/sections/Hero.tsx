"use client";

import { useMemo, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { companyHero } from "@/data/company-profile";

const heroImageSrc = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=2880&q=92";

const heroStats = [
  { value: "1250+", label: "Residential units" },
  { value: "1500+", label: "Retail units" },
  { value: "2006", label: "Founded" },
  { value: "5000+", label: "Industrial jobs" },
];

function MagneticPrimaryCta({ children, delay, reduce }: { children: React.ReactNode; delay: number; reduce: boolean | null }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 280, damping: 28, mass: 0.35 });
  const y = useSpring(0, { stiffness: 280, damping: 28, mass: 0.35 });
  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > 80) {
      x.set(0);
      y.set(0);
      return;
    }
    x.set(dx * 0.3);
    y.set(dy * 0.3);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }
  return (
    <motion.div ref={wrapRef} style={{ x, y }} className="inline-flex max-w-full shrink-0 justify-center" onMouseMove={handleMove} onMouseLeave={handleLeave} initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={reduce ? { duration: 0 } : { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const starPathD = useMemo(() => {
    const cx = 30;
    const cy = 30;
    const ro = 24;
    const ri = 10;
    const pts: string[] = [];
    for (let i = 0; i < 16; i++) {
      const r = i % 2 === 0 ? ro : ri;
      const a = (i * Math.PI) / 8 - Math.PI / 2;
      pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
    }
    return `M ${pts[0]} L ${pts.slice(1).join(" L ")} Z`;
  }, []);
  const headlineDelaySec = 0.4;
  const headlineDurSec = 0.5;
  const subheadDelaySec = headlineDelaySec + headlineDurSec + 0.2;
  const subheadDur = 0.45;
  const ctaStartSec = subheadDelaySec + subheadDur + 150 / 1000;
  const ctaDur = 0.5;
  const ctaEndSec = ctaStartSec + ctaDur;
  const statsFirstDelaySec = Math.max(1.4, ctaEndSec + 0.08);
  const statsCount = heroStats.length;
  const statsEndSec = statsFirstDelaySec + (statsCount - 1) * 0.1 + 0.35;
  const scrollFadeDelaySec = Math.max(1.6, statsEndSec + 0.12);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const tagDur = reduce ? 0 : 0.45;
  const lineDelaySec = reduce ? 0 : 0.35;
  /* Brand scrim — intensities halved vs prior for a lighter, less gray-black wash */
  const gradientOverlayBg =
    "linear-gradient(to bottom, rgba(17,30,65,0.44) 0%, rgba(17,30,65,0.34) 42%, rgba(17,30,65,0.46) 100%), radial-gradient(ellipse 90% 72% at 50% 100%, rgba(42,80,153,0.09), transparent 58%)";

  return (
    <section id="hero" ref={sectionRef} className="relative -mt-[4.25rem] min-h-screen h-[100dvh] w-full overflow-hidden" aria-labelledby="hero-heading">
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ y: bgParallaxY }}>
        <div className="hero-ken-burns absolute inset-0 will-change-transform">
          <Image src={heroImageSrc} alt="" fill priority className="object-cover" sizes="100vw" />
        </div>
      </motion.div>
      <motion.div className="pointer-events-none absolute inset-0 z-[2]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={reduce ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }} aria-hidden style={{ background: gradientOverlayBg }} />
      <motion.div className="pointer-events-none absolute inset-y-0 right-0 z-[3] h-full w-[40%]" initial={{ opacity: 0 }} animate={{ opacity: 0.04 }} transition={reduce ? { duration: 0 } : { duration: 1.2, ease: "easeOut" }} aria-hidden>
        <svg className="h-full w-full text-white" viewBox="0 0 60 60" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="gi-star-pattern-hero" width="60" height="60" patternUnits="userSpaceOnUse">
              <path fill="currentColor" d={starPathD} />
            </pattern>
          </defs>
          <rect width="120%" height="100%" x="-10%" fill="url(#gi-star-pattern-hero)" />
        </svg>
      </motion.div>
      <div className="relative z-[20] flex min-h-[100dvh] flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-20 pt-[5.5rem] text-center sm:px-6 sm:pb-24 sm:pt-24">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={reduce ? { duration: 0 } : { delay: 0.2, duration: tagDur, ease: "easeOut" }} className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-white/90 sm:text-xs sm:tracking-[0.42em]">
              SINCE 2006
            </motion.p>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={reduce ? { duration: 0 } : { delay: lineDelaySec, duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="mt-6 h-0.5 w-16 origin-center rounded-full bg-gradient-to-r from-transparent via-white/85 to-transparent sm:mt-7 sm:w-20" aria-hidden />
            <motion.h1 id="hero-heading" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={reduce ? { duration: 0 } : { delay: headlineDelaySec, duration: headlineDurSec, ease: [0.16, 1, 0.3, 1] }} className="mt-8 max-w-[min(100%,44rem)] px-3 text-balance text-center font-sans text-5xl font-bold leading-[1.15] tracking-[-0.035em] sm:mt-10 sm:text-6xl sm:leading-[1.12] md:max-w-[min(100%,52rem)] md:text-7xl md:leading-[1.08] lg:text-8xl lg:leading-[1.06]">
              Gulbahar Investment
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={reduce ? { duration: 0 } : { delay: subheadDelaySec, duration: subheadDur, ease: [0.16, 1, 0.3, 1] }} className="mx-auto mt-8 max-w-2xl font-sans text-base font-normal leading-relaxed text-white/95 sm:mt-10 sm:text-lg md:text-xl">
              {companyHero.subtitle}
            </motion.p>
            <div className="mt-12 flex w-full max-w-6xl flex-col items-center justify-center gap-4 sm:mt-14 sm:flex-row sm:flex-wrap sm:gap-5">
              <div className="flex w-full shrink-0 justify-center sm:w-auto">
                <MagneticPrimaryCta delay={ctaStartSec} reduce={reduce}>
                  <Button render={<Link href="/projects" />} nativeButton={false} size="lg" className="h-14 w-full min-w-[min(100%,12.5rem)] max-w-md rounded-xl border-2 border-white bg-white px-8 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-primary transition-all duration-300 hover:scale-[1.02] hover:border-primary-hover hover:bg-muted hover:text-primary sm:w-auto">
                    Explore Projects
                  </Button>
                </MagneticPrimaryCta>
              </div>
              <motion.div initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={reduce ? { duration: 0 } : { delay: ctaStartSec, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex w-full shrink-0 justify-center sm:w-auto">
                <Button render={<Link href="/company" />} nativeButton={false} variant="outline" size="lg" className="h-14 w-full min-w-[min(100%,12.5rem)] max-w-md rounded-xl border-2 border-white/60 bg-white/[0.14] px-8 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-primary-hover hover:bg-primary-hover/32 hover:text-white sm:w-auto">
                  Company profile
                </Button>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={reduce ? { duration: 0 } : { delay: ctaStartSec + 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex w-full shrink-0 justify-center sm:w-auto">
                <Button render={<Link href="/contact" />} nativeButton={false} variant="outline" size="lg" className="h-14 w-full min-w-[min(100%,12.5rem)] max-w-md rounded-xl border-2 border-white/60 bg-white/[0.14] px-8 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-primary-hover hover:bg-primary-hover/32 hover:text-white sm:w-auto">
                  Book a Visit
                </Button>
              </motion.div>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-12 sm:gap-3">
              {heroStats.map((s, i) => (
                <motion.span key={s.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={reduce ? { duration: 0 } : { delay: statsFirstDelaySec + i * 0.1, duration: 0.45, ease: "easeOut" }} className="rounded-full border border-white/30 bg-white/12 px-4 py-2 font-sans text-[0.75rem] font-semibold uppercase tracking-widest text-white sm:text-xs">
                  <span className="text-white">{s.value}</span>
                  <span className="mx-2 text-white/45">·</span>
                  <span className="font-normal normal-case tracking-normal text-white/88">{s.label}</span>
                </motion.span>
              ))}
            </div>
          </div>
        </div>
        <AnimatePresence>
          <motion.div key="scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={reduce ? { duration: 0 } : { delay: scrollFadeDelaySec, duration: 0.45, ease: "easeOut" }} className="pointer-events-none flex shrink-0 flex-col items-center gap-2 pb-6 pt-2 sm:pb-8" aria-hidden>
            <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-white/85 sm:text-xs">Scroll</span>
            {!reduce ? (
              <motion.span className="block h-11 w-0.5 rounded-full bg-gradient-to-b from-transparent via-white/80 to-transparent sm:h-12" animate={{ opacity: [0.65, 1, 0.65] }} transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }} />
            ) : (
              <span className="block h-11 w-0.5 rounded-full bg-gradient-to-b from-transparent via-white/78 to-transparent opacity-80 sm:h-12" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
