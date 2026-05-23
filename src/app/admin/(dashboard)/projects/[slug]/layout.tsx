import { notFound } from "next/navigation";
import { ProjectEditorShell } from "@/components/admin/project-editor-shell";
import { projects, getProjectBySlug } from "@/data/projects";
import { fetchPlacementMap } from "@/lib/media/queries";
import { isUnitListingAdminProject } from "@/lib/media/unit-listing-projects";

export default async function AdminProjectEditorLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getProjectBySlug(slug)) notFound();
  const placements = Object.fromEntries(fetchPlacementMap());
  const listingOptions = projects.filter((p) => isUnitListingAdminProject(p.slug)).map((p) => ({ slug: p.slug, name: p.name }));
  return (
    <>
      <ProjectEditorShell placements={placements} listingOptions={listingOptions} />
      {children}
    </>
  );
}
