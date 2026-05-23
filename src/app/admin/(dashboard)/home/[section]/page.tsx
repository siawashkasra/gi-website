import { notFound } from "next/navigation";
import { findEditorSection, homeEditorSections } from "@/lib/admin/editor-sections";

export default async function AdminHomeSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!findEditorSection(homeEditorSections, section)) notFound();
  return null;
}
