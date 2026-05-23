import { redirect } from "next/navigation";
import { projects } from "@/data/projects";
import { isUnitListingAdminProject } from "@/lib/media/unit-listing-projects";

export default function AdminUnitsRedirectPage() {
  const slug = projects.find((p) => isUnitListingAdminProject(p.slug))?.slug ?? projects[0]?.slug ?? "";
  redirect(`/admin/projects/${slug}/listings`);
}
