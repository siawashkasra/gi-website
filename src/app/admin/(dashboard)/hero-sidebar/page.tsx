import { ProjectHeroSidebarAdmin } from "@/components/admin/project-hero-sidebar-admin";
import { projects } from "@/data/projects";

export default function AdminHeroSidebarPage() {
  const projectOptions = projects.map((p) => ({ slug: p.slug, name: p.name }));
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-gi-navy">Hero sidebar</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Key figures column on project hero pages only. Does not change the main specs section or other pages.</p>
      <div className="mt-8">
        <ProjectHeroSidebarAdmin projectOptions={projectOptions} />
      </div>
    </div>
  );
}
