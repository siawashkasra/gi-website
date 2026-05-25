import "server-only";
import type { Project } from "@/data/projects";
import { getProjectBySlug as getStaticProjectBySlug, projects as staticProjects } from "@/data/projects";
import { defaultRegistryProject } from "@/lib/projects/project-template";
import { fetchRegistryProject, fetchRegistryProjects, type ProjectRegistryRow } from "@/lib/projects/project-registry-repo";

const staticSlugs = new Set(staticProjects.map((p) => p.slug));

export function isStaticProjectSlug(slug: string) {
  return staticSlugs.has(slug);
}

export function isRegistryProjectSlug(slug: string) {
  return fetchRegistryProject(slug) != null;
}

export function registryRowToProject(row: ProjectRegistryRow): Project {
  return defaultRegistryProject(row.slug, row.name, row.category, row.type);
}

export function getProjectRecord(slug: string, options?: { includeUnpublished?: boolean }): Project | undefined {
  const staticProject = getStaticProjectBySlug(slug);
  if (staticProject) return staticProject;
  const row = fetchRegistryProject(slug);
  if (!row) return undefined;
  if (!row.published && !options?.includeUnpublished) return undefined;
  return registryRowToProject(row);
}

export function listProjectRecords(options?: { publishedOnly?: boolean; includeStatic?: boolean }): Project[] {
  const includeStatic = options?.includeStatic !== false;
  const staticList = includeStatic ? staticProjects : [];
  const registry = fetchRegistryProjects(options?.publishedOnly ? { publishedOnly: true } : undefined).filter((r) => !staticSlugs.has(r.slug));
  const registryProjects = registry.map(registryRowToProject);
  const merged = [...staticList, ...registryProjects];
  merged.sort((a, b) => {
    const aReg = fetchRegistryProject(a.slug);
    const bReg = fetchRegistryProject(b.slug);
    const aOrder = aReg?.sortOrder ?? staticProjects.findIndex((p) => p.slug === a.slug);
    const bOrder = bReg?.sortOrder ?? staticProjects.findIndex((p) => p.slug === b.slug);
    return aOrder - bOrder;
  });
  return merged;
}

export function getAllProjectSlugs(options?: { publishedOnly?: boolean; includeUnpublished?: boolean }) {
  const publishedOnly = options?.includeUnpublished ? false : (options?.publishedOnly ?? true);
  return listProjectRecords({ publishedOnly, includeStatic: true }).map((p) => p.slug);
}

export function projectSupportsUnitListings(slug: string): boolean {
  const row = fetchRegistryProject(slug);
  if (row) return row.enableUnitListings;
  return slug === "gulbahar-center" || slug === "gulbahar-plaza" || slug === "gulbahar-towers";
}
