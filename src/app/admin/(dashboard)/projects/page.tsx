import { ProjectMediaAdmin } from "@/components/admin/project-media-admin";
import { projects } from "@/data/projects";
import { fetchPlacementMap } from "@/lib/media/queries";

export default async function AdminProjectsPage() {
  const slugs = projects.map((p) => ({ slug: p.slug, name: p.name }));
  const meta = Object.fromEntries(projects.map((p) => [p.slug, { galleryLength: Math.max(p.gallery.length, 1) }]));
  const placements = Object.fromEntries(fetchPlacementMap());
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-gi-navy">Projects</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Hero and gallery images. Unit photos and metadata are managed under Unit listings.</p>
      <div className="mt-8">
        <ProjectMediaAdmin slugs={slugs} meta={meta} placements={placements} projects={projects} />
      </div>
    </div>
  );
}
