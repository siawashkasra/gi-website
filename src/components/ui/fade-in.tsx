"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type FadeInProps = { children: ReactNode; className?: string };

export function FadeIn({ children, className }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setVisible(true); ob.disconnect(); } }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0", className)}>
      {children}
    </div>
  );
}
