import { notFound } from "next/navigation";
import { eventsEditorSections, findEditorSection } from "@/lib/admin/editor-sections";

export default async function AdminEventsSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!findEditorSection(eventsEditorSections, section)) notFound();
  return null;
}
