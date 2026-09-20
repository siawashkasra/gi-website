import { projects, getProjectBySlug as getStaticProjectBySlug, getAllProjectSlugs as getStaticProjectSlugs, type Project } from "@/data/projects";

export { projects, type Project };

export function getProjectBySlug(slug: string) {
  return getStaticProjectBySlug(slug);
}

export function getAllProjectSlugs() {
  return getStaticProjectSlugs();
}

export const megaMenuProjects = projects;

export const portfolioStats = {
  projectCount: projects.length,
  sectorCount: new Set(projects.map((p) => p.category)).size,
};
