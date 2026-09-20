import { notFound } from "next/navigation";
import { findEditorSection, heroesEditorSections } from "@/lib/admin/editor-sections";

export default async function AdminHeroesSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!findEditorSection(heroesEditorSections, section)) notFound();
  return null;
}
