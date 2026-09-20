"use client";

import { CompanySectionPreview } from "@/components/admin/previews/company-section-preview";
import { CompanyDirectoryPreview } from "@/components/admin/previews/company-directory-preview";
import { EventsSectionPreview, type EventPreviewData } from "@/components/admin/previews/events-section-preview";
import { HeroesSectionPreview } from "@/components/admin/previews/heroes-section-preview";
import { HomeSectionPreview } from "@/components/admin/previews/home-section-preview";
import { JobsSectionPreview } from "@/components/admin/previews/jobs-section-preview";
import { ProjectSectionPreview } from "@/components/admin/previews/project-section-preview";
import { ProjectsLabelsPreview } from "@/components/admin/previews/projects-labels-preview";
import { SettingsSectionPreview } from "@/components/admin/previews/settings-section-preview";
import { TeamSectionPreview } from "@/components/admin/previews/team-section-preview";
import type { Member } from "@/components/admin/team-content-admin";
import type { CmsLocaleId } from "@/components/admin/locale-tabs";
import type { SiteSettingsPayload } from "@/lib/cms/apply-content-overlay";

const TYPE_KEYS = ["residential", "commercial", "mixed-use"] as const;

export type PreviewDomain = "company" | "home" | "jobs" | "team" | "settings" | "events" | "companyDirectory" | "project" | "heroes" | "projectsLabels";

export function SectionContentPreview({ domain, section, data, members, settings, locale, placements, event, companyCard, heroImage, heroLabel, projectLabels, selectedMemberId, onSelectMember, teamPlacements }: { domain: PreviewDomain; section: string; data?: Record<string, unknown>; members?: Member[]; settings?: SiteSettingsPayload; locale?: CmsLocaleId; placements?: Map<string, { publicPath: string; alt: string } | null | undefined>; event?: EventPreviewData | null; companyCard?: { name?: string; industry?: string; description?: string; logoUrl?: string | null }; heroImage?: string | null; heroLabel?: string; projectLabels?: Record<string, string>; selectedMemberId?: string | null; onSelectMember?: (id: string | null) => void; teamPlacements?: Record<string, { publicPath: string; alt: string } | null> }) {
  if (domain === "company" && data) return <CompanySectionPreview section={section} data={data} />;
  if (domain === "home" && data) return <HomeSectionPreview section={section} data={data} placements={placements} />;
  if (domain === "jobs" && data) return <JobsSectionPreview section={section} data={data} />;
  if (domain === "team" && members) return <TeamSectionPreview members={members} selectedMemberId={selectedMemberId} onSelectMember={onSelectMember} placements={teamPlacements} />;
  if (domain === "settings" && settings) return <SettingsSectionPreview section={section} settings={settings} locale={locale} />;
  if (domain === "events") return <EventsSectionPreview section={section} event={event} />;
  if (domain === "companyDirectory" && companyCard) return <CompanyDirectoryPreview {...companyCard} />;
  if (domain === "project" && data) return <ProjectSectionPreview section={section} data={data} />;
  if (domain === "heroes") return <HeroesSectionPreview imageUrl={heroImage} label={heroLabel} />;
  if (domain === "projectsLabels" && projectLabels) return <ProjectsLabelsPreview labels={projectLabels} />;
  return null;
}

export function isSectionPreviewEmpty(domain: PreviewDomain, section: string, data?: Record<string, unknown>, members?: Member[], settings?: SiteSettingsPayload, locale?: CmsLocaleId, event?: EventPreviewData | null, companyCard?: { name?: string; industry?: string; description?: string }, projectLabels?: Record<string, string>): boolean {
  if (domain === "events") {
    if (section === "list") return false;
    return !event?.title?.trim() && !event?.summary?.trim();
  }
  if (domain === "companyDirectory") return !companyCard?.name?.trim() && !companyCard?.description?.trim();
  if (domain === "heroes") return false;
  if (domain === "projectsLabels") return !TYPE_KEYS.some((k) => projectLabels?.[k]?.trim());
  if (domain === "team") return !members?.length || !members.some((m) => m.name?.trim() || m.title?.trim() || m.bio?.trim());
  if (domain === "settings") {
    if (section === "contact") return !settings?.email?.trim() && !settings?.phone?.trim() && !settings?.phoneLandline?.trim();
    if (section === "address" && locale) return !settings?.addressByLocale?.[locale]?.trim();
    if (section === "social") return !settings?.social?.instagram?.trim() && !settings?.social?.facebook?.trim();
    return true;
  }
  if (!data) return true;
  if (domain === "project") {
    if (section === "basics") return !String(data.name ?? "").trim() && !String(data.excerpt ?? "").trim();
    if (section === "overview") return !String(data.description ?? "").trim() && !(Array.isArray(data.detailOverviewParagraphs) && (data.detailOverviewParagraphs as string[]).some((p) => p?.trim()));
    if (section === "mission") { const mv = data.missionVision as { vision?: string; mission?: string }; return !mv?.vision?.trim() && !mv?.mission?.trim(); }
    if (section === "timeline") return !(Array.isArray(data.timeline) && data.timeline.length);
    if (section === "features") return !(Array.isArray(data.features) && data.features.length);
    if (section === "media" || section === "sidebar" || section === "listings") return false;
  }
  if (domain === "company") {
    if (section === "hero") return !((data.companyHero as { subtitle?: string })?.subtitle?.trim());
    if (section === "about") { const a = data.companyAbout as { headline?: string; paragraphs?: string[] }; return !a?.headline?.trim() && !(Array.isArray(a?.paragraphs) && a.paragraphs.some((p) => p?.trim())); }
    if (section === "mission-vision") return !String(data.companyMission ?? "").trim() && !String(data.companyVision ?? "").trim();
    if (section === "snapshot") return !(Array.isArray(data.companySnapshot) && data.companySnapshot.length);
    if (section === "values") return !(Array.isArray(data.companyValues) && data.companyValues.length);
    if (section === "core-areas") return !(Array.isArray(data.coreBusinessAreas) && data.coreBusinessAreas.length);
    if (section === "strengths") return !(Array.isArray(data.competitiveStrengths) && data.competitiveStrengths.length);
    if (section === "governance") return !(Array.isArray(data.governanceIntro) && data.governanceIntro.some((p: string) => p?.trim()));
    if (section === "portfolio") return !(Array.isArray(data.portfolioTableRows) && data.portfolioTableRows.length);
    if (section === "ceo") { const c = data.ceoProfile as { quote?: string; name?: string }; return !c?.quote?.trim() && !c?.name?.trim(); }
    if (section === "growth-clients") return !String(data.growthOutlook ?? "").trim();
    if (section === "international") { const i = data.internationalPresence as { uae?: string }; return !i?.uae?.trim(); }
    if (section === "market") return !(Array.isArray(data.marketPositioning) && data.marketPositioning.length);
    if (section === "standards") return !String(data.technologyStandards ?? "").trim() && !String(data.sustainabilityStandards ?? "").trim();
    if (section === "org") return !(data.organizationalStructure as { sectionTitle?: string })?.sectionTitle?.trim();
  }
  if (domain === "home") {
    if (section === "testimonials") return !(Array.isArray(data.testimonials) && data.testimonials.length);
    if (section === "milestones") return !(Array.isArray(data.milestones) && data.milestones.length);
    if (section === "standards") return !(Array.isArray(data.standardPillars) && data.standardPillars.length);
    if (section === "images" || section === "featured") return false;
  }
  if (domain === "jobs") {
    if (section === "intro") return !String(data.body ?? "").trim() && !String(data.join ?? "").trim();
    if (section === "sectors") return !["sector1", "sector2", "sector3"].some((k) => (data[k] as { title?: string })?.title?.trim());
    if (section === "footnotes") return !String(data.footnote1 ?? "").trim() && !String(data.footnote2 ?? "").trim();
  }
  return false;
}
