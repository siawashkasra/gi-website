import { projects, getProjectBySlug, getAllProjectSlugs, type Project } from "@/data/projects";

export { projects, getProjectBySlug, getAllProjectSlugs, type Project };

/** Fixed order for corporate mega menu (nine portfolio lines). */
export const MEGA_MENU_SLUGS = [
  "gulbahar-center",
  "gulbahar-towers",
  "gulbahar-plaza",
  "gulbahar-cement",
  "gulbahar-power",
  "gulbahar-petroleum",
  "gulbahar-foundation",
  "gulbahar-pharma",
  "gulbahar-group-afghanistan",
] as const;

export const megaMenuProjects: Project[] = MEGA_MENU_SLUGS.map((slug) => getProjectBySlug(slug)).filter((p): p is Project => p != null);

export const portfolioStats = {
  projectCount: projects.length,
  sectorCount: new Set(projects.map((p) => p.category)).size,
};
