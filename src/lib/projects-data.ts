import { projects, getProjectBySlug, getAllProjectSlugs, type Project } from "@/data/projects";

export { projects, getProjectBySlug, getAllProjectSlugs, type Project };

export const megaMenuProjects = projects;

export const portfolioStats = {
  projectCount: projects.length,
  sectorCount: new Set(projects.map((p) => p.category)).size,
};
