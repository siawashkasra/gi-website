import { redirect } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";

export default async function AdminProjectIndexPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getProjectBySlug(slug)) redirect("/admin/projects");
  redirect(`/admin/projects/${slug}/basics`);
}
