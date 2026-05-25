import type { Project, ProjectType } from "@/data/projects";
import { getProjectBySlug as getStaticProjectBySlug } from "@/data/projects";

const PLACEHOLDER_IMAGE = "/images/projects/gulbahar-plaza/gulbahar-plaza-02.png";

export function defaultRegistryProject(slug: string, name: string, category: string, type: ProjectType): Project {
  return {
    slug,
    name,
    category,
    type,
    featured: false,
    excerpt: "",
    description: "",
    location: "",
    status: "Planned",
    year: "",
    area: "",
    image: PLACEHOLDER_IMAGE,
    gallery: [PLACEHOLDER_IMAGE],
    timeline: [],
    keyStats: { units: "", shops: "", facilities: "" },
    features: [],
    unitsInfo: {},
    detailOverviewTitle: "",
    detailOverviewParagraphs: [],
    missionVision: { vision: "", mission: "", values: [] },
    strategicPositioning: "",
  };
}

export function cmsSeedFromProject(project: Project): Record<string, unknown> {
  const { slug: _slug, image: _image, gallery: _gallery, listings: _listings, featured: _featured, ...rest } = project;
  return structuredClone(rest) as Record<string, unknown>;
}

export function cmsSeedFromTemplateSlug(templateSlug: string, slug: string, name: string, category: string, type: ProjectType): Record<string, unknown> {
  const template = getStaticProjectBySlug(templateSlug);
  if (!template) return cmsSeedFromProject(defaultRegistryProject(slug, name, category, type));
  const seed = cmsSeedFromProject({ ...template, slug, name, category, type, featured: false, image: PLACEHOLDER_IMAGE, gallery: [PLACEHOLDER_IMAGE], listings: undefined });
  seed.name = name;
  seed.excerpt = typeof seed.excerpt === "string" ? seed.excerpt : "";
  seed.description = typeof seed.description === "string" ? seed.description : "";
  return seed;
}

export const PROJECT_TEMPLATE_OPTIONS = [
  { slug: "blank", label: "Blank structure" },
  { slug: "gulbahar-plaza", label: "Mixed-use (Plaza-style)" },
  { slug: "gulbahar-center", label: "Mixed-use (Center-style)" },
  { slug: "gulbahar-towers", label: "Residential towers" },
  { slug: "gulbahar-cement", label: "Industrial" },
] as const;
