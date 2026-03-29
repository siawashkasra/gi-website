"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProjectGalleryProps = { images: string[]; projectName: string };

export function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const len = images.length;
  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + len) % len);
    },
    [len]
  );
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
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-eyebrow">Gallery</p>
          <h2 className="text-heading-lg mt-2">On-site & atmosphere</h2>
        </div>
        <p className="max-w-md text-sm text-muted-foreground">Use arrows or thumbnails to explore. Keyboard ← → supported.</p>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-primary shadow-2xl shadow-primary/20 ring-1 ring-black/5">
        <div className="relative aspect-[16/10] w-full min-h-[280px] sm:aspect-[2/1] sm:min-h-[320px] lg:min-h-[380px]">
          <Image key={images[index]} src={images[index]} alt={`${projectName} — image ${index + 1} of ${len}`} fill className="object-cover transition-opacity duration-500" sizes="100vw" priority={index === 0} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f4e79]/55 from-40% via-transparent to-[#1f4e79]/14 to-100%" aria-hidden />
          <div className="absolute bottom-4 left-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium tabular-nums text-white backdrop-blur-md">
            {index + 1} / {len}
          </div>
          <Button type="button" variant="outline" size="icon" onClick={() => go(-1)} className="absolute left-3 top-1/2 size-11 -translate-y-1/2 rounded-full border-white/30 bg-black/30 text-white backdrop-blur-md hover:bg-black/50 hover:text-white" aria-label="Previous image">
            <ChevronLeft className="size-5" />
          </Button>
          <Button type="button" variant="outline" size="icon" onClick={() => go(1)} className="absolute right-3 top-1/2 size-11 -translate-y-1/2 rounded-full border-white/30 bg-black/30 text-white backdrop-blur-md hover:bg-black/50 hover:text-white" aria-label="Next image">
            <ChevronRight className="size-5" />
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-black/40 p-3 sm:p-4">
          {images.map((src, i) => (
            <button key={`${i}-${src}`} type="button" onClick={() => setIndex(i)} className={cn("relative h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 ring-offset-2 ring-offset-black transition-all sm:h-20 sm:w-28", i === index ? "ring-primary opacity-100" : "ring-transparent opacity-60 hover:opacity-100")} aria-label={`Show image ${i + 1}`} aria-current={i === index ? "true" : undefined}>
              <Image src={src} alt="" fill className="object-cover" sizes="112px" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
