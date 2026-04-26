"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import type { ResolvedHeroSidebar } from "@/lib/project-hero-sidebar-types";
import { ProjectHero } from "@/components/sections/ProjectHero";
import { ProjectStickySidebar } from "@/components/sections/ProjectStickySidebar";

export function ProjectDetailShell({ project, heroSidebar, children }: { project: Project; heroSidebar: ResolvedHeroSidebar; children: React.ReactNode }) {
  const heroSectionRef = useRef<HTMLElement>(null);
  const [ctaVisible, setCtaVisible] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, [project.slug]);
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
      <ProjectHero ref={heroSectionRef} project={project} heroIntro={heroSidebar.intro} ribbon={heroSidebar.ribbon} />
      {children}
      <ProjectStickySidebar project={project} visible={ctaVisible} />
    </>
  );
}
