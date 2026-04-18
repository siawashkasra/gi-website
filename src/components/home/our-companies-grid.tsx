"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { companies, companyHref } from "@/data/companies";
import { cn } from "@/lib/utils";

const ROW_EPS = 3;

export function OurCompaniesGrid() {
  const rootRef = useRef<HTMLUListElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [tooltipBelow, setTooltipBelow] = useState<Set<number>>(() => new Set());
  const updateTooltipPlacement = useCallback(() => {
    const ul = rootRef.current;
    if (!ul) return;
    const items = [...ul.querySelectorAll<HTMLLIElement>(":scope > li")];
    if (items.length === 0) return;
    const tops = items.map((li) => li.getBoundingClientRect().top);
    const maxTop = Math.max(...tops);
    const next = new Set<number>();
    items.forEach((_, i) => { if (Math.abs(tops[i] - maxTop) <= ROW_EPS) next.add(i); });
    setTooltipBelow((prev) => {
      if (prev.size === next.size && [...next].every((i) => prev.has(i))) return prev;
      return next;
    });
  }, []);
  useLayoutEffect(() => {
    const schedulePlacement = () => { queueMicrotask(() => updateTooltipPlacement()); };
    schedulePlacement();
    const ul = rootRef.current;
    if (!ul || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(schedulePlacement);
    ro.observe(ul);
    return () => ro.disconnect();
  }, [updateTooltipPlacement]);
  useEffect(() => {
    const onResize = () => updateTooltipPlacement();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateTooltipPlacement]);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduceMotion(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    const el = rootRef.current;
    if (!el) return () => mq.removeEventListener("change", onMq);
    const obs = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setVisible(true); obs.disconnect(); } }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    obs.observe(el);
    return () => { mq.removeEventListener("change", onMq); obs.disconnect(); };
  }, []);
  useLayoutEffect(() => {
    if (!visible) return;
    const id = requestAnimationFrame(() => { updateTooltipPlacement(); });
    return () => cancelAnimationFrame(id);
  }, [visible, updateTooltipPlacement]);
  return (
    <ul ref={rootRef} className="grid list-none grid-cols-2 gap-x-4 gap-y-7 overflow-visible sm:gap-x-5 sm:gap-y-8 md:grid-cols-3 md:gap-x-5 md:gap-y-8 lg:grid-cols-5 lg:gap-x-4 lg:gap-y-7">
      {companies.map((c, i) => {
        const below = tooltipBelow.has(i);
        return (
          <li
            key={c.slug}
            className={cn(
              "overflow-visible",
              !visible && "opacity-0",
              visible && reduceMotion && "opacity-100",
              visible && !reduceMotion && "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500",
            )}
            style={visible && !reduceMotion ? { animationDelay: `${i * 32}ms` } : undefined}
          >
            <span id={`company-desc-${c.slug}`} className="sr-only">
              {c.industry}. {c.description}
            </span>
            <Link
              href={companyHref(c)}
              aria-describedby={`company-desc-${c.slug}`}
              className="gi-card-elevated group relative flex flex-col items-center overflow-visible rounded-2xl border border-primary/10 bg-card/95 px-2 py-3.5 transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:py-4 lg:py-3.5 group-hover:border-primary/18 group-hover:bg-card"
            >
              <div className="relative mx-auto h-14 w-[9.25rem] shrink-0 transition-[filter,transform] duration-500 ease-out grayscale group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:drop-shadow-[0_0_20px_rgba(13,27,62,0.16)] group-focus-visible:scale-[1.04] group-focus-visible:grayscale-0 md:h-[4.25rem] md:w-[10rem] lg:h-16 lg:w-[10rem]">
                <Image src={c.logo} alt={`${c.name} logo`} fill className="object-contain object-center" sizes="(max-width: 768px) 46vw, 160px" />
              </div>
              <div
                className={cn(
                  "gi-depth-panel pointer-events-none absolute left-1/2 z-20 w-[min(calc(100vw-2rem),13.5rem)] -translate-x-1/2 rounded-xl border border-border bg-card px-2.5 py-2 text-center opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 md:w-[min(100%,14rem)] md:px-3 md:py-2",
                  below
                    ? "top-full mt-2 translate-y-1 group-hover:translate-y-0 group-focus-visible:translate-y-0"
                    : "bottom-full mb-2 -translate-y-1 group-hover:translate-y-0 group-focus-visible:translate-y-0",
                )}
                aria-hidden="true"
              >
                <p className="font-heading text-sm font-semibold leading-snug text-card-foreground">{c.name}</p>
                <p className="mt-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-primary">{c.industry}</p>
                <p className="mt-1 text-[0.6875rem] leading-snug text-muted-foreground md:text-xs">{c.description}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
