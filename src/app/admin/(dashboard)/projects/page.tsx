import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminProjectsGrid, type AdminProjectCard } from "@/components/admin/admin-projects-grid";
import { CreateProjectAdmin } from "@/components/admin/create-project-admin";
import { projects } from "@/data/projects";
import { fetchPlacementMap } from "@/lib/media/queries";
import { projectHeroKey } from "@/lib/media/placement-keys";
import { getDb } from "@/db/index";
import { projectListings } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { fetchFeaturedProjectSlugs } from "@/lib/cms/project-featured-repo";
import { fetchRegistryProjects } from "@/lib/projects/project-registry-repo";
import { isStaticProjectSlug } from "@/lib/projects/project-source";

export default function AdminProjectsListPage() {
  const placements = fetchPlacementMap();
  const db = getDb();
  const featured = fetchFeaturedProjectSlugs();
  const registry = fetchRegistryProjects();
  const listingCounts = new Map<string, number>();
  const cards: AdminProjectCard[] = [];
  for (const p of projects) {
    const c = db.select({ c: count() }).from(projectListings).where(eq(projectListings.projectSlug, p.slug)).get()?.c ?? 0;
    listingCounts.set(p.slug, c);
    const hero = placements.get(projectHeroKey(p.slug));
    cards.push({ slug: p.slug, name: p.name, image: hero?.publicPath ?? p.image, featured: featured.has(p.slug), hasCustomHero: !!hero, listingCount: c, published: true, isRegistry: false });
  }
  for (const r of registry) {
    if (isStaticProjectSlug(r.slug)) continue;
    const c = db.select({ c: count() }).from(projectListings).where(eq(projectListings.projectSlug, r.slug)).get()?.c ?? 0;
    listingCounts.set(r.slug, c);
    const hero = placements.get(projectHeroKey(r.slug));
    const fallback = "/images/projects/gulbahar-plaza/gulbahar-plaza-02.png";
    cards.push({ slug: r.slug, name: r.name, image: hero?.publicPath ?? fallback, featured: featured.has(r.slug), hasCustomHero: !!hero, listingCount: c, published: r.published, isRegistry: true });
  }
  return (
    <div>
      <AdminPageHeader title="Projects" description="Create projects, edit copy and media, and publish when ready." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Projects" }]} />
      <p className="mb-6 flex flex-wrap gap-4 text-sm">
        <Link href="/admin/projects/labels" className="text-primary underline-offset-2 hover:underline">Project type labels</Link>
      </p>
      <div className="mb-10">
        <CreateProjectAdmin />
      </div>
      <AdminProjectsGrid projects={cards} />
    </div>
  );
}
