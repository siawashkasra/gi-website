import { projects, getProjectBySlug, type Project } from "@/data/projects";

export { projects, getProjectBySlug, type Project };

export const megaMenuProjects = projects;

export const portfolioStats = {
  projectCount: projects.length,
  sectorCount: new Set(projects.map((p) => p.category)).size,
};
