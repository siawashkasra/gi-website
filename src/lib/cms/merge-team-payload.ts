import "server-only";
import type { TeamMember } from "@/data/team";
import { getBundledCmsPayload } from "@/lib/cms/bundled-cms-defaults";
import type { CmsLocale } from "@/lib/i18n/locales";
import { normalizeTeamMembers, resolveTeamMemberId, teamMembersById, type TeamMemberRecord } from "@/lib/team/member-utils";

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function pickField(locale: CmsLocale, field: "name" | "title" | "bio", patch: Record<string, unknown>, base: TeamMember, en: TeamMember): string {
  const v = str(patch[field]).trim();
  if (!v) return str(base[field]) || str(en[field]);
  if (locale !== "en" && v === str(en[field]).trim()) return str(base[field]) || v;
  return v;
}

function mergeMember(locale: CmsLocale, patch: Record<string, unknown>, index: number, bundledById: Map<string, TeamMember>, enById: Map<string, TeamMember>): TeamMember {
  const patchId = str(patch.id).trim();
  const id = patchId || resolveTeamMemberId(patch as TeamMemberRecord, index);
  const base = bundledById.get(id) ?? enById.get(id) ?? { id, name: "", title: "", photo: "", bio: "" };
  const en = enById.get(id) ?? base;
  const patchPhoto = str(patch.photo).trim();
  const photo = patchPhoto.startsWith("/uploads/") ? patchPhoto : patchPhoto || str(base.photo) || str(en.photo);
  return {
    id,
    name: pickField(locale, "name", patch, base, en),
    title: pickField(locale, "title", patch, base, en),
    bio: pickField(locale, "bio", patch, base, en),
    photo,
  };
}

export function mergeTeamCmsPayload(locale: CmsLocale, bundledTeam: TeamMember[], stored: unknown): TeamMember[] {
  const normalizedBundled = normalizeTeamMembers(bundledTeam) as TeamMember[];
  if (!Array.isArray(stored) || stored.length === 0) return normalizedBundled;
  const enRef = getBundledCmsPayload("team", "all", "en");
  const enTeam = normalizeTeamMembers(Array.isArray(enRef) ? (enRef as TeamMember[]) : []) as TeamMember[];
  const bundledById = teamMembersById(normalizedBundled) as Map<string, TeamMember>;
  const enById = teamMembersById(enTeam) as Map<string, TeamMember>;
  return (stored as Record<string, unknown>[]).map((patch, i) => mergeMember(locale, patch, i, bundledById, enById));
}

export function sanitizeTeamRowsForLocale(locale: CmsLocale, rows: TeamMember[]): TeamMember[] {
  const bundled = getBundledCmsPayload("team", "all", locale);
  const bundledTeam = Array.isArray(bundled) ? (bundled as TeamMember[]) : [];
  return mergeTeamCmsPayload(locale, bundledTeam, normalizeTeamMembers(rows));
}
