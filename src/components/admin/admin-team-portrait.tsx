"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function AdminTeamPortrait({ src, name, className }: { src: string; name: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
  }, [src]);
  if (!src || failed) {
    return <div className={cn("flex items-center justify-center bg-muted font-heading font-semibold text-muted-foreground", className)}>{name.trim().slice(0, 1) || "?"}</div>;
  }
  return <img src={src} alt="" className={cn("object-cover", className)} onError={() => setFailed(true)} />;
}
