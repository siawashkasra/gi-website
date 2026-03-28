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
    <ul ref={rootRef} className="mt-12 grid list-none grid-cols-2 gap-x-5 gap-y-8 overflow-visible sm:gap-x-6 sm:gap-y-9 md:mt-14 md:grid-cols-3 md:gap-x-6 md:gap-y-9 lg:mt-16 lg:grid-cols-5 lg:gap-x-5 lg:gap-y-8">
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
              className="group relative flex flex-col items-center overflow-visible rounded-xl border border-transparent px-2 py-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:py-4 lg:py-3.5 group-hover:border-border/70 group-hover:bg-card/40 group-hover:shadow-sm"
            >
              <div className="relative mx-auto h-14 w-[9.25rem] shrink-0 transition-[filter,transform,box-shadow] duration-300 ease-out grayscale group-hover:scale-[1.02] group-hover:grayscale-0 group-hover:shadow-[0_12px_28px_-14px_rgba(0,0,0,0.1)] group-focus-visible:scale-[1.02] group-focus-visible:grayscale-0 md:h-[4.25rem] md:w-[10rem] lg:h-16 lg:w-[10rem]">
                <Image src={c.logo} alt={`${c.name} logo`} fill className="object-contain object-center" sizes="(max-width: 768px) 46vw, 160px" />
              </div>
              <div
                className={cn(
                  "pointer-events-none absolute left-1/2 z-20 w-[min(calc(100vw-2rem),13.5rem)] -translate-x-1/2 rounded-lg border border-border/70 bg-card px-2.5 py-2 text-center opacity-0 shadow-md ring-1 ring-black/[0.03] transition-[opacity,transform] duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 md:w-[min(100%,14rem)] md:px-3 md:py-2",
                  below
                    ? "top-full mt-2 translate-y-1 group-hover:translate-y-0 group-focus-visible:translate-y-0"
                    : "bottom-full mb-2 -translate-y-1 group-hover:translate-y-0 group-focus-visible:translate-y-0",
                )}
                aria-hidden="true"
              >
                <p className="font-serif text-sm font-medium leading-snug text-card-foreground">{c.name}</p>
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
