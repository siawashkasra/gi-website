"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type HeroParallaxMediaProps = { imageSrc: string };

export function HeroParallaxMedia({ imageSrc }: HeroParallaxMediaProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layer = layerRef.current;
    if (!layer) return;
    const onScroll = () => {
      const y = window.scrollY;
      layer.style.transform = `translate3d(0, ${Math.min(y * 0.22, 100)}px, 0) scale(1.06)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div ref={layerRef} className="absolute inset-0 h-[115%] w-full -top-[7.5%] will-change-transform [transform:translate3d(0,0,0)_scale(1.06)]">
        <Image src={imageSrc} alt="" fill className="object-cover object-center" priority sizes="100vw" quality={90} aria-hidden />
      </div>
    </div>
  );
}
