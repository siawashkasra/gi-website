import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { buildProjectEditorSections } from "@/lib/admin/editor-sections";
import { isUnitListingAdminProject } from "@/lib/media/unit-listing-projects";

export default async function AdminProjectSectionPage({ params }: { params: Promise<{ slug: string; section: string }> }) {
  const { slug, section } = await params;
  if (!getProjectBySlug(slug)) notFound();
  const sections = buildProjectEditorSections(slug, isUnitListingAdminProject(slug));
  if (!sections.some((s) => s.slug === section)) notFound();
  return null;
}
