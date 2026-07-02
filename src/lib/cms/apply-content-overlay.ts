import { deepMerge } from "@/lib/cms/deep-merge";
import { mergeTeamCmsPayload } from "@/lib/cms/merge-team-payload";
import type { TeamMember } from "@/data/team";
import type { ContentDocumentRow } from "@/db/schema";
import type { CmsLocale } from "@/lib/i18n/locales";
import { fetchRegistryProject } from "@/lib/projects/project-registry-repo";
import { isStaticProjectSlug } from "@/lib/projects/project-source";

export function applyContentOverlays(messages: Record<string, unknown>, rows: ContentDocumentRow[]) {
  for (const row of rows) {
    if (row.published === 0) continue;
    const payload = JSON.parse(row.payloadJson) as unknown;
    if (row.entityType === "companyProfile") {
      messages.companyProfile = deepMerge((messages.companyProfile ?? {}) as Record<string, unknown>, payload as Record<string, unknown>);
      continue;
    }
    if (row.entityType === "homePremium") {
      messages.homePremium = deepMerge((messages.homePremium ?? {}) as Record<string, unknown>, payload as Record<string, unknown>);
      continue;
    }
    if (row.entityType === "team") {
      if (!Array.isArray(payload)) continue;
      const bundled = (Array.isArray(messages.team) ? messages.team : []) as TeamMember[];
      messages.team = mergeTeamCmsPayload(row.locale as CmsLocale, bundled, payload);
      continue;
    }
    if (row.entityType === "company") {
      if (!payload || typeof payload !== "object" || Array.isArray(payload)) continue;
      const patch = payload as Record<string, unknown>;
      const list = (messages.companiesData ?? []) as Record<string, unknown>[];
      const idx = list.findIndex((c) => c.slug === row.entityKey);
      if (idx >= 0) list[idx] = { ...list[idx], ...patch };
      messages.companiesData = list;
      continue;
    }
    if (row.entityType === "project") {
      if (!payload || typeof payload !== "object" || Array.isArray(payload)) continue;
      if (!isStaticProjectSlug(row.entityKey)) {
        const reg = fetchRegistryProject(row.entityKey);
        if (!reg?.published) continue;
      }
      const patch = payload as Record<string, unknown>;
      const pd = (messages.projectsData ?? { projects: {} }) as { projects: Record<string, Record<string, unknown>>; projectTypeLabels?: Record<string, string> };
      const cur = pd.projects[row.entityKey] ?? {};
      pd.projects[row.entityKey] = deepMerge(cur, patch);
      messages.projectsData = pd;
      continue;
    }
    if (row.entityType === "projectsData") {
      if (!payload || typeof payload !== "object" || Array.isArray(payload)) continue;
      messages.projectsData = deepMerge((messages.projectsData ?? {}) as Record<string, unknown>, payload as Record<string, unknown>);
      continue;
    }
    if (row.entityType === "jobs") {
      if (!payload || typeof payload !== "object" || Array.isArray(payload)) continue;
      messages.jobs = deepMerge((messages.jobs ?? {}) as Record<string, unknown>, payload as Record<string, unknown>);
    }
  }
}

export type { CmsLocale };

export function applySiteSettingsToMessages(messages: Record<string, unknown>, locale: CmsLocale, settings: SiteSettingsPayload | null) {
  if (!settings) return;
  const site = { ...((messages.site ?? {}) as Record<string, string>) };
  if (settings.email) site.email = settings.email;
  if (settings.phone) site.phone = settings.phone;
  if (settings.phoneLandline) site.phoneLandline = settings.phoneLandline;
  const addr = settings.addressByLocale?.[locale];
  if (addr) site.address = addr;
  messages.site = site;
}

export type SiteSettingsPayload = {
  email?: string;
  phone?: string;
  phoneLandline?: string;
  addressByLocale?: Partial<Record<CmsLocale, string>>;
  social?: { instagram?: string; facebook?: string };
};
