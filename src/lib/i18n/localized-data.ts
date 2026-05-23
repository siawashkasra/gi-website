import type { CoreBusinessArea, CompanySnapshotRow, CompanyValueItem, CompetitiveStrength, MarketTheme, OrgStructureUnit } from "@/data/company-profile";
import type { Company } from "@/data/companies";
import type { Project, ProjectType } from "@/data/projects";
import type { MilestoneItem, StandardPillar, TestimonialItem } from "@/data/home-premium";
import type { TeamMember } from "@/data/team";
import { projects as projectsBase } from "@/data/projects";

export type Messages = {
  companyProfile: Record<string, unknown>;
  homePremium: { testimonials: TestimonialItem[]; milestones: MilestoneItem[]; standardPillars: StandardPillar[] };
  team: TeamMember[];
  companiesData: Company[];
  projectsData: { projectTypeLabels: Record<ProjectType, string>; projects: Record<string, Partial<Project>> };
};

export function getLocalizedCompanySnapshot(messages: Messages, count?: number): CompanySnapshotRow[] {
  const rows = messages.companyProfile.companySnapshot as CompanySnapshotRow[];
  return count ? rows.slice(0, count) : rows;
}

export function getLocalizedCompanyValues(messages: Messages): CompanyValueItem[] {
  return messages.companyProfile.companyValues as CompanyValueItem[];
}

export function getLocalizedCoreBusinessAreas(messages: Messages): CoreBusinessArea[] {
  return messages.companyProfile.coreBusinessAreas as CoreBusinessArea[];
}

export function getLocalizedCompetitiveStrengths(messages: Messages): CompetitiveStrength[] {
  return messages.companyProfile.competitiveStrengths as CompetitiveStrength[];
}

export function getLocalizedMarketPositioning(messages: Messages): MarketTheme[] {
  return messages.companyProfile.marketPositioning as MarketTheme[];
}

export function getLocalizedProjects(messages: Messages): Project[] {
  const copy = messages.projectsData.projects;
  return projectsBase.map((p) => {
    const t = copy[p.slug];
    if (!t) return p;
    return mergeLocalizedProject(p, t as Partial<Project>);
  });
}

export function getLocalizedProject(messages: Messages, slug: string): Project | undefined {
  return getLocalizedProjects(messages).find((p) => p.slug === slug);
}

function mergeLocalizedProject(base: Project, localized: Partial<Project>): Project {
  return {
    ...base,
    ...localized,
    slug: base.slug,
    type: (localized.type ?? base.type) as Project["type"],
    image: base.image,
    gallery: base.gallery?.length ? base.gallery : (localized.gallery ?? base.gallery),
    listings: localized.listings?.length ? localized.listings : base.listings,
  };
}

export function localizeMergedProjects(messages: Messages, merged: Project[]): Project[] {
  const bySlug = new Map(getLocalizedProjects(messages).map((p) => [p.slug, p]));
  return merged.map((p) => {
    const loc = bySlug.get(p.slug);
    if (!loc) return p;
    return { ...loc, image: p.image, gallery: p.gallery?.length ? p.gallery : loc.gallery };
  });
}

export function getProjectTypeLabels(messages: Messages): Record<ProjectType, string> {
  return messages.projectsData.projectTypeLabels;
}

export function getLocalizedCompanies(messages: Messages): Company[] {
  return messages.companiesData;
}

export function getLocalizedTeam(messages: Messages): TeamMember[] {
  return messages.team;
}

export function getLocalizedTestimonials(messages: Messages): TestimonialItem[] {
  return messages.homePremium.testimonials;
}

export function getLocalizedMilestones(messages: Messages): MilestoneItem[] {
  return messages.homePremium.milestones;
}

export function getLocalizedStandardPillars(messages: Messages): StandardPillar[] {
  return messages.homePremium.standardPillars;
}

export function getOrgStructure(messages: Messages) {
  return messages.companyProfile.organizationalStructure as {
    sectionTitle: string;
    chairman: { name: string; title: string };
    chiefExecutive: { name: string; title: string };
    units: OrgStructureUnit[];
  };
}

export function getLocalizedCompanyAbout(messages: Messages) {
  return messages.companyProfile.companyAbout as { headline: string; paragraphs: string[] };
}

export function getLocalizedCompanyMission(messages: Messages) {
  return messages.companyProfile.companyMission as string;
}

export function getLocalizedCompanyVision(messages: Messages) {
  return messages.companyProfile.companyVision as string;
}

export function getLocalizedGovernanceIntro(messages: Messages) {
  return messages.companyProfile.governanceIntro as string[];
}

export function getLocalizedTechnologyStandards(messages: Messages) {
  return messages.companyProfile as { technologyStandards: string; sustainabilityStandards: string; technologyStandardsCard: string; sustainabilityStandardsCard: string; governanceStandardsPillar: string };
}

export function getLocalizedCeoProfile(messages: Messages) {
  return messages.companyProfile.ceoProfile as { quote: string; name: string; title: string };
}

export function getLocalizedPortfolioTableRows(messages: Messages) {
  return messages.companyProfile.portfolioTableRows as { project: string; location: string; sector: string }[];
}

export function getLocalizedGrowthOutlook(messages: Messages) {
  return messages.companyProfile.growthOutlook as string;
}

export function getLocalizedClientsPartners(messages: Messages) {
  return messages.companyProfile.clientsPartners as { title: string; note: string };
}

export function getLocalizedInternationalPresenceStrings(messages: Messages) {
  return messages.companyProfile.internationalPresence as { uae: string; regional: string; crossBorder: string };
}
