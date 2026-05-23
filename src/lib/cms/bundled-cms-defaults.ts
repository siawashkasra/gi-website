import "server-only";
import en from "../../../messages/en.json";
import faAF from "../../../messages/fa-AF.json";
import ps from "../../../messages/ps.json";
import type { CmsEntityType } from "@/lib/cms/cms-content-validation";
import { mergeTeamCmsPayload } from "@/lib/cms/merge-team-payload";
import type { TeamMember } from "@/data/team";
import type { CmsLocale } from "@/lib/i18n/locales";
import type { SiteSettingsPayload } from "@/lib/cms/apply-content-overlay";
import { siteConfig } from "@/lib/site";

const messagesByLocale = { en, "fa-AF": faAF, ps } as const;

export function getBundledMessages(locale: CmsLocale): Record<string, unknown> {
  return messagesByLocale[locale] as Record<string, unknown>;
}

export function getBundledCmsPayload(entityType: CmsEntityType, entityKey: string, locale: CmsLocale): unknown | null {
  const messages = getBundledMessages(locale);
  if (entityType === "companyProfile") return messages.companyProfile ?? null;
  if (entityType === "homePremium") return messages.homePremium ?? null;
  if (entityType === "team") return Array.isArray(messages.team) ? messages.team : null;
  if (entityType === "jobs") return messages.jobs ?? null;
  if (entityType === "company") {
    const list = messages.companiesData as { slug: string }[] | undefined;
    if (!Array.isArray(list)) return null;
    const row = list.find((c) => c.slug === entityKey);
    if (!row) return null;
    const { slug: _slug, ...rest } = row as Record<string, unknown> & { slug: string };
    return rest;
  }
  if (entityType === "project") {
    const pd = messages.projectsData as { projects?: Record<string, unknown> } | undefined;
    return pd?.projects?.[entityKey] ?? null;
  }
  if (entityType === "projectsData" && entityKey === "labels") {
    const pd = messages.projectsData as { projectTypeLabels?: Record<string, string> } | undefined;
    return pd?.projectTypeLabels ? { projectTypeLabels: pd.projectTypeLabels } : null;
  }
  return null;
}

export function resolveAdminCmsPayload(entityType: CmsEntityType, entityKey: string, locale: CmsLocale, stored: unknown | null): { payload: unknown | null; source: "database" | "bundled" | "none" } {
  const bundled = getBundledCmsPayload(entityType, entityKey, locale);
  if (entityType === "team" && stored != null) {
    const bundledTeam = Array.isArray(bundled) ? (bundled as TeamMember[]) : [];
    const merged = mergeTeamCmsPayload(locale, bundledTeam, stored);
    return { payload: merged, source: "database" };
  }
  if (stored != null) return { payload: stored, source: "database" };
  if (bundled != null) return { payload: bundled, source: "bundled" };
  return { payload: null, source: "none" };
}

export function getBundledSiteSettingsDefaults(): SiteSettingsPayload {
  const addressByLocale: SiteSettingsPayload["addressByLocale"] = {};
  for (const locale of ["en", "fa-AF", "ps"] as const) {
    const site = getBundledMessages(locale).site as { address?: string } | undefined;
    if (site?.address) addressByLocale[locale] = site.address;
  }
  return {
    email: siteConfig.email,
    phone: siteConfig.phone,
    phoneLandline: siteConfig.phoneLandline,
    addressByLocale: { en: addressByLocale.en ?? siteConfig.address, "fa-AF": addressByLocale["fa-AF"] ?? siteConfig.address, ps: addressByLocale.ps ?? siteConfig.address },
    social: { instagram: siteConfig.social.instagram, facebook: siteConfig.social.facebook },
  };
}

function mergeLocaleAddressMap(defaults: NonNullable<SiteSettingsPayload["addressByLocale"]>, stored?: SiteSettingsPayload["addressByLocale"]): NonNullable<SiteSettingsPayload["addressByLocale"]> {
  const out = { ...defaults };
  for (const locale of ["en", "fa-AF", "ps"] as const) {
    const v = stored?.[locale]?.trim();
    if (v) out[locale] = v;
  }
  return out;
}

export function mergeSiteSettingsWithBundled(stored: SiteSettingsPayload | null): SiteSettingsPayload {
  const defaults = getBundledSiteSettingsDefaults();
  if (!stored) return defaults;
  return {
    ...defaults,
    ...stored,
    email: stored.email?.trim() ? stored.email : defaults.email,
    phone: stored.phone?.trim() ? stored.phone : defaults.phone,
    phoneLandline: stored.phoneLandline?.trim() ? stored.phoneLandline : defaults.phoneLandline,
    addressByLocale: mergeLocaleAddressMap(defaults.addressByLocale ?? {}, stored.addressByLocale),
    social: { ...defaults.social, ...stored.social },
  };
}
