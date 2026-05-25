import "server-only";
import type { ProjectType } from "@/data/projects";
import { replaceContentDocument } from "@/lib/cms/content-documents-repo";
import type { CmsLocale } from "@/lib/i18n/locales";
import { cmsSeedFromProject, cmsSeedFromTemplateSlug, defaultRegistryProject } from "@/lib/projects/project-template";
import { insertRegistryProject, fetchRegistryProject } from "@/lib/projects/project-registry-repo";
import { isStaticProjectSlug } from "@/lib/projects/project-source";
import { saveHeroSidebarPayload } from "@/lib/media/project-hero-sidebar-repo";
import { HERO_SIDEBAR_DEFAULT_INTRO } from "@/lib/project-hero-sidebar-defaults";

const locales: CmsLocale[] = ["en", "fa-AF", "ps"];

export function normalizeProjectSlug(raw: string): string | null {
  const slug = raw.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  return slug;
}

export function createProjectFromAdmin(input: { slug: string; name: string; category: string; type: ProjectType; templateSlug?: string; enableUnitListings?: boolean }) {
  const slug = normalizeProjectSlug(input.slug);
  if (!slug) throw new Error("Slug must use lowercase letters, numbers, and hyphens only.");
  if (isStaticProjectSlug(slug) || fetchRegistryProject(slug)) throw new Error("A project with this slug already exists.");
  const name = input.name.trim();
  const category = input.category.trim();
  if (!name || !category) throw new Error("Name and category are required.");
  const type = input.type;
  const enableUnitListings = input.enableUnitListings ?? (type === "mixed-use" || type === "residential");
  insertRegistryProject({ slug, name, category, type, enableUnitListings });
  const base = defaultRegistryProject(slug, name, category, type);
  const templateKey = input.templateSlug?.trim() || "blank";
  for (const locale of locales) {
    const seed = templateKey === "blank" ? cmsSeedFromProject(base) : cmsSeedFromTemplateSlug(templateKey, slug, name, category, type);
    replaceContentDocument("project", slug, locale, seed);
  }
  saveHeroSidebarPayload(slug, "en", { eyebrow: HERO_SIDEBAR_DEFAULT_INTRO.eyebrow, title: HERO_SIDEBAR_DEFAULT_INTRO.title, blurb: HERO_SIDEBAR_DEFAULT_INTRO.blurb, rows: [{ label: "Status", value: "Planned" }, { label: "Location", value: "Kabul" }] });
  return slug;
}
