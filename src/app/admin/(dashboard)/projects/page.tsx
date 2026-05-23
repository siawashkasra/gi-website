import Link from "next/link";
import Image from "next/image";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import { fetchPlacementMap } from "@/lib/media/queries";
import { projectHeroKey } from "@/lib/media/placement-keys";
import { getDb } from "@/db/index";
import { projectListings } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { fetchFeaturedProjectSlugs } from "@/lib/cms/project-featured-repo";

export default function AdminProjectsListPage() {
  const placements = fetchPlacementMap();
  const db = getDb();
  const featured = fetchFeaturedProjectSlugs();
  const listingCounts = new Map<string, number>();
  for (const p of projects) {
    const c = db.select({ c: count() }).from(projectListings).where(eq(projectListings.projectSlug, p.slug)).get()?.c ?? 0;
    listingCounts.set(p.slug, c);
  }
  return (
    <div>
      <AdminPageHeader title="Projects" description="Open a project to edit copy, images, hero sidebar, and unit listings." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Projects" }]} />
      <p className="mb-6 flex flex-wrap gap-4 text-sm">
        <Link href="/admin/home/featured" className="text-primary underline-offset-2 hover:underline">Featured on home</Link>
        <Link href="/admin/projects/labels" className="text-primary underline-offset-2 hover:underline">Project type labels</Link>
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const hero = placements.get(projectHeroKey(p.slug));
          const thumb = hero?.publicPath ?? p.image;
          return (
            <Link key={p.slug} href={`/admin/projects/${p.slug}/basics`} className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/30">
              <div className="relative aspect-[16/10] bg-muted">
                <Image src={thumb} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
              </div>
              <div className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-medium text-gi-navy group-hover:text-primary">{p.name}</h2>
                  {featured.has(p.slug) ? <Badge variant="secondary">Featured</Badge> : null}
                  {hero ? <Badge>Custom hero</Badge> : null}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{p.slug}{(listingCounts.get(p.slug) ?? 0) > 0 ? ` · ${listingCounts.get(p.slug)} listings` : ""}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
