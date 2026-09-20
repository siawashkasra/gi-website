import { notFound } from "next/navigation";
import { ProjectEditorShell } from "@/components/admin/project-editor-shell";
import { fetchPlacementMap } from "@/lib/media/queries";
import { getProjectRecord, isStaticProjectSlug, listProjectRecords, projectSupportsUnitListings } from "@/lib/projects/project-source";
import { fetchRegistryProject } from "@/lib/projects/project-registry-repo";

export default async function AdminProjectEditorLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectRecord(slug, { includeUnpublished: true });
  if (!project) notFound();
  const placements = Object.fromEntries(fetchPlacementMap());
  const listingOptions = listProjectRecords({ includeStatic: true }).filter((p) => projectSupportsUnitListings(p.slug)).map((p) => ({ slug: p.slug, name: p.name }));
  const supportsUnitListings = projectSupportsUnitListings(slug);
  const registryRow = !isStaticProjectSlug(slug) ? fetchRegistryProject(slug) : null;
  const registryPublish = registryRow ? { isRegistry: true as const, published: registryRow.published } : null;
  return (
    <>
      <ProjectEditorShell project={project} placements={placements} listingOptions={listingOptions} supportsUnitListings={supportsUnitListings} registryPublish={registryPublish} />
      {children}
    </>
  );
}
