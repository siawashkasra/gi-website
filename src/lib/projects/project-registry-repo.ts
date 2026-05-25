import "server-only";
import { asc, eq } from "drizzle-orm";
import { projectRegistry } from "@/db/schema";
import { getDb } from "@/db/index";
import type { ProjectType } from "@/data/projects";

export type ProjectRegistryRow = {
  slug: string;
  name: string;
  category: string;
  type: ProjectType;
  published: boolean;
  sortOrder: number;
  enableUnitListings: boolean;
  createdAt: number;
  updatedAt: number;
};

function mapRow(row: typeof projectRegistry.$inferSelect): ProjectRegistryRow {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category,
    type: row.type as ProjectType,
    published: row.published === 1,
    sortOrder: row.sortOrder,
    enableUnitListings: row.enableUnitListings === 1,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export function fetchRegistryProject(slug: string): ProjectRegistryRow | null {
  const db = getDb();
  const row = db.select().from(projectRegistry).where(eq(projectRegistry.slug, slug)).get();
  return row ? mapRow(row) : null;
}

export function fetchRegistryProjects(options?: { publishedOnly?: boolean }): ProjectRegistryRow[] {
  const db = getDb();
  const rows = db.select().from(projectRegistry).orderBy(asc(projectRegistry.sortOrder), asc(projectRegistry.slug)).all();
  const list = rows.map(mapRow);
  if (options?.publishedOnly) return list.filter((r) => r.published);
  return list;
}

export function insertRegistryProject(input: { slug: string; name: string; category: string; type: ProjectType; sortOrder?: number; enableUnitListings?: boolean }) {
  const db = getDb();
  const now = Date.now();
  const sortOrder = input.sortOrder ?? db.select().from(projectRegistry).all().length;
  db.insert(projectRegistry).values({
    slug: input.slug,
    name: input.name,
    category: input.category,
    type: input.type,
    published: 0,
    sortOrder,
    enableUnitListings: input.enableUnitListings ? 1 : 0,
    createdAt: now,
    updatedAt: now,
  }).run();
}

export function updateRegistryProject(slug: string, patch: Partial<{ name: string; category: string; type: ProjectType; published: boolean; sortOrder: number; enableUnitListings: boolean }>) {
  const db = getDb();
  const cur = fetchRegistryProject(slug);
  if (!cur) return false;
  const next: Partial<typeof projectRegistry.$inferInsert> = { updatedAt: Date.now() };
  if (patch.name != null) next.name = patch.name;
  if (patch.category != null) next.category = patch.category;
  if (patch.type != null) next.type = patch.type;
  if (patch.published != null) next.published = patch.published ? 1 : 0;
  if (patch.sortOrder != null) next.sortOrder = patch.sortOrder;
  if (patch.enableUnitListings != null) next.enableUnitListings = patch.enableUnitListings ? 1 : 0;
  db.update(projectRegistry).set(next).where(eq(projectRegistry.slug, slug)).run();
  return true;
}

export function deleteRegistryProject(slug: string) {
  const db = getDb();
  db.delete(projectRegistry).where(eq(projectRegistry.slug, slug)).run();
}
