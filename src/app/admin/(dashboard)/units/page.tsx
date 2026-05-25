import { redirect } from "next/navigation";
import { listProjectRecords, projectSupportsUnitListings } from "@/lib/projects/project-source";

export default function AdminUnitsRedirectPage() {
  const slug = listProjectRecords({ includeStatic: true }).find((p) => projectSupportsUnitListings(p.slug))?.slug ?? listProjectRecords({ includeStatic: true })[0]?.slug ?? "";
  redirect(`/admin/projects/${slug}/listings`);
}
