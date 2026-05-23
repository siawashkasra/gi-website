"use client";

import { AdminSectionPreviewPanel } from "@/components/admin/admin-section-preview-panel";
import { isSectionPreviewEmpty, SectionContentPreview, type PreviewDomain } from "@/components/admin/section-content-preview";
import type { EventPreviewData } from "@/components/admin/previews/events-section-preview";
import type { CmsLocaleId } from "@/components/admin/locale-tabs";
import type { Member } from "@/components/admin/team-content-admin";
import type { SiteSettingsPayload } from "@/lib/cms/apply-content-overlay";
import { findEditorSection, type AdminEditorSection } from "@/lib/admin/editor-sections";

export function CmsSectionPreview({ domain, section, locale, data, members, settings, placements, sections, sectionLabel, publicPath, event, companyCard, heroImage, heroLabel, projectLabels }: { domain: PreviewDomain; section: string; locale: CmsLocaleId; data?: Record<string, unknown>; members?: Member[]; settings?: SiteSettingsPayload; placements?: Map<string, { publicPath: string; alt: string } | null | undefined>; sections?: AdminEditorSection[]; sectionLabel?: string; publicPath?: string; event?: EventPreviewData | null; companyCard?: { name?: string; industry?: string; description?: string; logoUrl?: string | null }; heroImage?: string | null; heroLabel?: string; projectLabels?: Record<string, string> }) {
  const meta = sections ? findEditorSection(sections, section) : undefined;
  const label = sectionLabel ?? meta?.label ?? section;
  const href = publicPath ?? (meta ? `/${locale}${meta.previewPath}${meta.previewHash ?? ""}` : undefined);
  const empty = isSectionPreviewEmpty(domain, section, data, members, settings, locale, event, companyCard, projectLabels);
  return (
    <AdminSectionPreviewPanel locale={locale} sectionLabel={label} publicHref={href} empty={empty} className="sticky top-20 h-[min(70vh,640px)]">
      <SectionContentPreview domain={domain} section={section} data={data} members={members} settings={settings} locale={locale} placements={placements} event={event} companyCard={companyCard} heroImage={heroImage} heroLabel={heroLabel} projectLabels={projectLabels} />
    </AdminSectionPreviewPanel>
  );
}
