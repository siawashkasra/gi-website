"use client";

import { useParams } from "next/navigation";
import { AdminEditorLayout } from "@/components/admin/admin-editor-layout";
import { CmsSectionPreview } from "@/components/admin/cms-section-preview";
import { MediaSlotEditor } from "@/components/admin/media-slot-editor";
import { adminHeroFallbackByRoute, adminHomeMobileHeroFallback } from "@/lib/admin/media-slot-defaults";
import { findEditorSection, heroesEditorSections } from "@/lib/admin/editor-sections";
import { heroMobilePlacementKey, heroPlacementKey, type HeroRoute } from "@/lib/media/placement-keys";
import { notFound } from "next/navigation";

const labels: Record<HeroRoute, string> = {
  home: "Home (main hero)",
  company: "Company page",
  jobs: "Jobs page",
  events: "Events page",
  projectsIndex: "Projects index",
};

export function HeroesEditorShell({ placements }: { placements: Map<string, { publicPath: string; alt: string } | null | undefined> }) {
  const params = useParams();
  const section = typeof params.section === "string" ? params.section : "home";
  const meta = findEditorSection(heroesEditorSections, section);
  if (!meta) notFound();
  const isMobile = section === "home-mobile";
  const route = isMobile ? null : (section as HeroRoute);
  const placementKey = isMobile ? heroMobilePlacementKey() : heroPlacementKey(route!);
  const current = placements.get(placementKey) ?? null;
  const fallback = isMobile ? adminHomeMobileHeroFallback : adminHeroFallbackByRoute[route!];
  const imageUrl = current?.publicPath ?? fallback.publicPath;
  const label = isMobile ? "Home — mobile hero" : labels[route!];
  const preview = <CmsSectionPreview domain="heroes" section={section} locale="en" heroImage={imageUrl} heroLabel={label} sections={heroesEditorSections} />;
  return (
    <AdminEditorLayout pageTitle="Page heroes" pageDescription="Review the current hero image, then upload or replace it." sections={heroesEditorSections} activeSlug={section} preview={preview} toolbar={<MediaSlotEditor label={label} placementKey={placementKey} current={current} fallbackImage={fallback} />} />
  );
}
