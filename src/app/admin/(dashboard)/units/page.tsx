import { ProjectListingsAdmin } from "@/components/admin/project-listings-admin";
import { projects } from "@/data/projects";
import { isUnitListingAdminProject } from "@/lib/media/unit-listing-projects";

export default function AdminUnitsPage() {
  const projectOptions = projects.filter((p) => isUnitListingAdminProject(p.slug)).map((p) => ({ slug: p.slug, name: p.name }));
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-gi-navy">Unit listings</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Gulbahar Center, Plaza, and Towers only. Existing site units are copied into the database on first run so you can edit them here. One featured unit per project is highlighted on the public page with pagination.</p>
      <div className="mt-8">
        <ProjectListingsAdmin projectOptions={projectOptions} />
      </div>
    </div>
  );
}
