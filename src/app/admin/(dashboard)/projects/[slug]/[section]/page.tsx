import { notFound } from "next/navigation";
import { buildProjectEditorSections } from "@/lib/admin/editor-sections";
import { getProjectRecord, projectSupportsUnitListings } from "@/lib/projects/project-source";

export default async function AdminProjectSectionPage({ params }: { params: Promise<{ slug: string; section: string }> }) {
  const { slug, section } = await params;
  if (!getProjectRecord(slug, { includeUnpublished: true })) notFound();
  const sections = buildProjectEditorSections(slug, projectSupportsUnitListings(slug));
  if (!sections.some((s) => s.slug === section)) notFound();
  return null;
}
