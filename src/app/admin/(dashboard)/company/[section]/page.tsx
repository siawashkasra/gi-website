import { notFound } from "next/navigation";
import { companyEditorSections, findEditorSection } from "@/lib/admin/editor-sections";

export default async function AdminCompanySectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!findEditorSection(companyEditorSections, section)) notFound();
  return null;
}
