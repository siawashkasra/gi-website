"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProjectContentFields } from "@/components/admin/project-content-fields";
import { ProjectHeroSidebarAdmin } from "@/components/admin/project-hero-sidebar-admin";
import { ProjectListingsAdmin } from "@/components/admin/project-listings-admin";
import { ProjectMediaAdmin } from "@/components/admin/project-media-admin";
import { AdminTabs } from "@/components/admin/admin-tabs";
import type { Project } from "@/data/projects";
import type { MediaSlotCurrent } from "@/components/admin/media-slot-editor";
import { isUnitListingAdminProject } from "@/lib/media/unit-listing-projects";

const tabs = [
  { id: "content", label: "Content" },
  { id: "media", label: "Media" },
  { id: "sidebar", label: "Hero sidebar" },
  { id: "listings", label: "Unit listings" },
] as const;

export function ProjectHubClient({ project, placements, listingOptions }: { project: Project; placements: Record<string, MediaSlotCurrent>; listingOptions: { slug: string; name: string }[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "content";
  const visibleTabs = tabs.filter((t) => t.id !== "listings" || isUnitListingAdminProject(project.slug));
  const active = visibleTabs.some((t) => t.id === tab) ? tab : "content";
  return (
    <div>
      <AdminTabs tabs={visibleTabs.map((t) => ({ id: t.id, label: t.label }))} value={active} onChange={(id) => router.replace(`${pathname}?tab=${id}`)} />
      <div className="mt-8">
        {active === "content" ? <ProjectContentFields slug={project.slug} projectName={project.name} /> : null}
        {active === "media" ? <ProjectMediaAdmin fixedProjectSlug={project.slug} slugs={[{ slug: project.slug, name: project.name }]} meta={{ [project.slug]: { galleryLength: Math.max(project.gallery.length, 1) } }} placements={placements} projects={[project]} /> : null}
        {active === "sidebar" ? <ProjectHeroSidebarAdmin fixedProjectSlug={project.slug} projectOptions={[{ slug: project.slug, name: project.name }]} /> : null}
        {active === "listings" && isUnitListingAdminProject(project.slug) ? <ProjectListingsAdmin fixedProjectSlug={project.slug} projectOptions={listingOptions} /> : null}
      </div>
    </div>
  );
}
