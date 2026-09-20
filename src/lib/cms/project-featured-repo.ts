import "server-only";
import { eq } from "drizzle-orm";
import { projectFeatured } from "@/db/schema";
import { getDb } from "@/db/index";
import { projects } from "@/data/projects";
import { listProjectRecords } from "@/lib/projects/project-source";

export function fetchFeaturedProjectSlugs(): Set<string> {
  const db = getDb();
  const rows = db.select().from(projectFeatured).all();
  if (rows.length === 0) return new Set(projects.filter((p) => p.featured).map((p) => p.slug));
  return new Set(rows.filter((r) => r.featured === 1).map((r) => r.projectSlug));
}

export function fetchFeaturedAdminState(): { slug: string; name: string; featured: boolean }[] {
  const slugs = fetchFeaturedProjectSlugs();
  return listProjectRecords({ includeStatic: true }).map((p) => ({ slug: p.slug, name: p.name, featured: slugs.has(p.slug) }));
}

export function setProjectFeatured(projectSlug: string, featured: boolean) {
  const db = getDb();
  const now = Date.now();
  const existing = db.select().from(projectFeatured).where(eq(projectFeatured.projectSlug, projectSlug)).get();
  if (existing) {
    db.update(projectFeatured).set({ featured: featured ? 1 : 0, updatedAt: now }).where(eq(projectFeatured.projectSlug, projectSlug)).run();
  } else {
    db.insert(projectFeatured).values({ projectSlug, featured: featured ? 1 : 0, updatedAt: now }).run();
  }
}
