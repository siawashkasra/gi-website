import { notFound } from "next/navigation";
import { findEditorSection, jobsEditorSections } from "@/lib/admin/editor-sections";

export default async function AdminJobsSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!findEditorSection(jobsEditorSections, section)) notFound();
  return null;
}
