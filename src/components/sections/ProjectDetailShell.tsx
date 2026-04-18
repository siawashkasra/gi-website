"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import type { RibbonItem } from "@/lib/project-ribbon";
import { ProjectHero } from "@/components/sections/ProjectHero";
import { ProjectStickySidebar } from "@/components/sections/ProjectStickySidebar";

export function ProjectDetailShell({ project, ribbon, children }: { project: Project; ribbon: RibbonItem[]; children: React.ReactNode }) {
  const heroSectionRef = useRef<HTMLElement>(null);
  const [ctaVisible, setCtaVisible] = useState(false);
  useEffect(() => {
    function tick() {
      const el = heroSectionRef.current;
      if (!el) return;
      setCtaVisible(el.getBoundingClientRect().bottom < 96);
    }
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);
  return (
    <>
      <ProjectHero ref={heroSectionRef} project={project} ribbon={ribbon} />
      {children}
      <ProjectStickySidebar project={project} visible={ctaVisible} />
    </>
  );
}
