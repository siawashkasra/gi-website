"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  start?: number;
  end: number;
  durationMs?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AnimatedCounter({ start: startVal = 0, end, durationMs = 2200, suffix = "", prefix = "", className }: AnimatedCounterProps) {
  const [value, setValue] = useState(startVal);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      done.current = true;
      queueMicrotask(() => setValue(end));
      return;
    }
    const ob = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting || done.current) return;
        done.current = true;
        setValue(startVal);
        const t0 = performance.now();
        const span = end - startVal;
        const step = (now: number) => {
          const t = Math.min((now - t0) / durationMs, 1);
          const eased = 1 - (1 - t) ** 3;
          setValue(Math.round(startVal + eased * span));
          if (t < 1) requestAnimationFrame(step);
          else setValue(end);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [end, durationMs, startVal]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
