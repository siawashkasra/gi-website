import "server-only";
import type { TeamMember } from "@/data/team";
import { getBundledCmsPayload } from "@/lib/cms/bundled-cms-defaults";
import { fetchContentDocument, replaceContentDocument } from "@/lib/cms/content-documents-repo";
import type { CmsLocale } from "@/lib/i18n/locales";
import { normalizeTeamMembers, resolveTeamMemberId, type TeamMemberRecord } from "@/lib/team/member-utils";

export function readStoredTeamLocale(locale: CmsLocale): TeamMember[] {
  const row = fetchContentDocument("team", "all", locale);
  if (row) {
    const parsed = JSON.parse(row.payloadJson) as unknown;
    // A present row is authoritative even when empty (admin removed all members).
    if (Array.isArray(parsed)) return normalizeTeamMembers(parsed as TeamMemberRecord[]) as TeamMember[];
  }
  const bundled = getBundledCmsPayload("team", "all", locale);
  if (Array.isArray(bundled) && bundled.length > 0) return normalizeTeamMembers(bundled as TeamMemberRecord[]) as TeamMember[];
  return [];
}

export function writeStoredTeamLocale(locale: CmsLocale, members: TeamMember[]) {
  const payload = normalizeTeamMembers(members as TeamMemberRecord[]) as TeamMember[];
  replaceContentDocument("team", "all", locale, payload);
}

export function upsertStoredTeamMember(locale: CmsLocale, member: TeamMember, mode: "add" | "edit") {
  const current = readStoredTeamLocale(locale);
  const memberId = resolveTeamMemberId(member, current.length);
  if (mode === "add") {
    if (current.some((m, i) => resolveTeamMemberId(m, i) === memberId)) throw new Error("Team member already exists");
    writeStoredTeamLocale(locale, [...current, { ...member, id: memberId }]);
    return;
  }
  const next = current.map((m, i) => (resolveTeamMemberId(m, i) === memberId ? { ...m, ...member, id: memberId } : m));
  if (!next.some((m, i) => resolveTeamMemberId(m, i) === memberId)) throw new Error("Team member not found");
  writeStoredTeamLocale(locale, next);
}

export function removeStoredTeamMemberAllLocales(memberId: string) {
  for (const locale of ["en", "fa-AF", "ps"] as const) {
    const current = readStoredTeamLocale(locale);
    const next = current.filter((m, i) => resolveTeamMemberId(m, i) !== memberId);
    writeStoredTeamLocale(locale, next);
  }
}
