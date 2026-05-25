import { redirect } from "next/navigation";
import { getProjectRecord } from "@/lib/projects/project-source";

export default async function AdminProjectIndexPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getProjectRecord(slug, { includeUnpublished: true })) redirect("/admin/projects");
  redirect(`/admin/projects/${slug}/basics`);
}
