"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAVY_BLUR_DATA_URL } from "@/lib/image-placeholders";
import { cn } from "@/lib/utils";

export function ProjectGallery({ images, projectName }: { images: string[]; projectName: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [index, setIndex] = useState(0);
  const len = images.length;
  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => {
        const next = (i + dir + len) % len;
        return next;
      });
    },
    [len]
  );
  useEffect(() => {
    const el = itemRefs.current[index];
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);
  if (len === 0) return null;
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-section via-background to-section py-16 md:py-24" aria-labelledby="project-gallery-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_55%_at_100%_0%,color-mix(in_srgb,var(--color-primary)_6%,transparent),transparent_52%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(195deg,color-mix(in_srgb,var(--color-primary)_4%,transparent)_0%,transparent_40%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_0%_100%,rgba(201,168,76,0.06),transparent_55%)]" aria-hidden />
      <div className="relative z-[1]">
        <div className="ds-container mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="size-1 shrink-0 rounded-full bg-gi-gold/75 drop-shadow-[0_0_6px_rgba(201,168,76,0.55)]" aria-hidden />
              <p className="[font-variant-caps:small-caps] text-xs font-semibold tracking-[0.28em] text-primary/60">Gallery</p>
            </div>
            <h2 id="project-gallery-heading" className="mt-3 font-heading text-[clamp(1.65rem,3.5vw,2.35rem)] font-semibold leading-tight tracking-tight text-foreground sm:mt-4">
              On-site & atmosphere
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm leading-relaxed text-muted-foreground">Swipe or scroll horizontally. Keyboard arrows step between frames. Imagery is shown without aggressive cropping.</p>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-14 bg-gradient-to-r from-background via-background/90 to-transparent sm:w-16" aria-hidden />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-14 bg-gradient-to-l from-background via-background/90 to-transparent sm:w-16" aria-hidden />
          <div ref={scrollerRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-4 pb-5 pt-2 scrollbar-gi sm:gap-6 md:px-8 md:pb-6" style={{ WebkitOverflowScrolling: "touch" }}>
            {images.map((src, i) => (
              <div
                key={src}
                role="button"
                tabIndex={0}
                onClick={() => setIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setIndex(i);
                }}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={cn(
                  "gi-card-elevated relative shrink-0 cursor-pointer snap-center overflow-hidden rounded-2xl border border-primary/12 bg-card transition-[border-color,filter] duration-500 hover:border-primary/25",
                  i % 3 === 0 ? "h-[min(72vh,36rem)] w-[min(92vw,52rem)]" : i % 3 === 1 ? "h-[min(58vh,30rem)] w-[min(78vw,38rem)]" : "h-[min(64vh,32rem)] w-[min(85vw,44rem)]"
                )}
              >
                <Image src={src} alt={`${projectName} — ${i + 1} of ${len}`} fill loading={i === 0 ? "eager" : "lazy"} placeholder="blur" blurDataURL={NAVY_BLUR_DATA_URL} className="object-contain p-2" sizes="(max-width:768px) 92vw, 52rem" priority={i === 0} fetchPriority={i === 0 ? "high" : undefined} />
              </div>
            ))}
          </div>
          <div className="pointer-events-none mx-6 mt-1 h-px max-w-none bg-gradient-to-r from-transparent via-primary/15 to-transparent md:mx-10" aria-hidden />
          <div className="pointer-events-none mx-auto mt-2 hidden h-[3px] max-w-md rounded-full bg-gradient-to-r from-transparent via-gi-gold/35 to-transparent opacity-90 md:block" aria-hidden />
          <div className="pointer-events-none absolute right-4 top-3 z-[15] flex items-center gap-3 sm:right-8 md:right-10">
            <span className="rounded-full border border-border bg-card px-4 py-1.5 font-sans text-sm font-semibold tabular-nums text-foreground backdrop-blur-sm">
              {index + 1} / {len}
            </span>
          </div>
          <Button type="button" variant="outline" size="icon" onClick={() => go(-1)} className="absolute left-2 top-1/2 z-10 hidden size-12 -translate-y-1/2 rounded-full border-2 border-primary/25 bg-card text-primary backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-primary hover:text-primary-foreground md:left-6 md:flex" aria-label="Previous image">
            <ChevronLeft className="size-5" />
          </Button>
          <Button type="button" variant="outline" size="icon" onClick={() => go(1)} className="absolute right-2 top-1/2 z-10 hidden size-12 -translate-y-1/2 rounded-full border-2 border-primary/25 bg-card text-primary backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-primary hover:text-primary-foreground md:right-6 md:flex" aria-label="Next image">
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
