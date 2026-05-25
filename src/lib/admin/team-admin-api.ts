import { adminFetch } from "@/lib/admin/admin-fetch";
import { withPhotos, type Member } from "@/components/admin/team-content-admin";
import { cmsLocales, type CmsLocaleId } from "@/components/admin/locale-tabs";
import { teamPhotoKey } from "@/lib/media/placement-keys";
import { resolveTeamMemberId } from "@/lib/team/member-utils";

export type TeamLocaleFields = { name: string; title: string; bio: string };
export type TeamMemberForm = Record<CmsLocaleId, TeamLocaleFields>;

export const emptyTeamFields = (): TeamLocaleFields => ({ name: "", title: "", bio: "" });
export const emptyTeamForm = (): TeamMemberForm => ({ en: emptyTeamFields(), "fa-AF": emptyTeamFields(), ps: emptyTeamFields() });

export function teamFormCompleteness(form: TeamMemberForm): Partial<Record<CmsLocaleId, boolean>> {
  return {
    en: Boolean(form.en.name.trim() && form.en.title.trim()),
    "fa-AF": Boolean(form["fa-AF"].name.trim() && form["fa-AF"].title.trim()),
    ps: Boolean(form.ps.name.trim() && form.ps.title.trim()),
  };
}

export function teamFieldsForLocale(form: TeamMemberForm, locale: CmsLocaleId): TeamLocaleFields {
  const cur = form[locale];
  if (locale === "en") return cur;
  return {
    name: cur.name.trim() || form.en.name.trim(),
    title: cur.title.trim() || form.en.title.trim(),
    bio: cur.bio.trim() || form.en.bio.trim(),
  };
}

export async function fetchTeamLocale(locale: CmsLocaleId): Promise<Member[]> {
  const res = await adminFetch(`/api/admin/content?entityType=team&entityKey=all&locale=${encodeURIComponent(locale)}`);
  const j = (await res.json()) as { ok?: boolean; payload?: Member[] | null };
  if (!res.ok || !j.ok || !Array.isArray(j.payload)) return [];
  return withPhotos(j.payload);
}

export async function saveTeamLocale(locale: CmsLocaleId, members: Member[]) {
  const res = await adminFetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ entityType: "team", entityKey: "all", locale, payload: withPhotos(members), merge: false }) });
  const j = (await res.json()) as { ok?: boolean; message?: string };
  if (!res.ok || !j.ok) throw new Error(j.message ?? `Failed to save ${locale} team`);
}

export async function uploadTeamPortrait(file: File) {
  const fd = new FormData();
  fd.append("file", file);
  const up = await adminFetch("/api/admin/upload", { method: "POST", body: fd });
  const upJson = (await up.json()) as { ok?: boolean; id?: string; message?: string; publicPath?: string };
  if (!up.ok || !upJson.ok || !upJson.id || !upJson.publicPath) throw new Error(upJson.message ?? "Upload failed");
  return { assetId: upJson.id, publicPath: upJson.publicPath };
}

export async function saveTeamMember(mode: "add" | "edit", form: TeamMemberForm, options: { memberId?: string; assetId?: string; publicPath?: string; alt?: string }) {
  const res = await adminFetch("/api/admin/team/members", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode, memberId: options.memberId, form, assetId: options.assetId, publicPath: options.publicPath, alt: options.alt ?? form.en.name.trim() }) });
  const j = (await res.json()) as { ok?: boolean; message?: string; memberId?: string; photo?: string };
  if (!res.ok || !j.ok) throw new Error(j.message ?? "Could not save team member");
  return j;
}

export async function fetchTeamMemberForm(memberId: string): Promise<TeamMemberForm> {
  const form = emptyTeamForm();
  await Promise.all(
    cmsLocales.map(async (l) => {
      const team = await fetchTeamLocale(l.id);
      const member = team.find((m, i) => resolveTeamMemberId(m, i) === memberId);
      if (member) form[l.id] = { name: member.name, title: member.title, bio: member.bio };
    }),
  );
  return form;
}

export async function deleteTeamMemberAllLocales(memberId: string) {
  const res = await adminFetch(`/api/admin/team/members?memberId=${encodeURIComponent(memberId)}`, { method: "DELETE" });
  const j = (await res.json()) as { ok?: boolean; message?: string };
  if (!res.ok || !j.ok) throw new Error(j.message ?? "Could not delete team member");
}

export async function fetchTeamPlacements(): Promise<Record<string, { publicPath: string; alt: string }>> {
  const res = await adminFetch("/api/admin/placements/map");
  const j = (await res.json()) as { ok?: boolean; placements?: Record<string, { publicPath: string; alt: string }> };
  if (!res.ok || !j.ok || !j.placements) return {};
  return Object.fromEntries(Object.entries(j.placements).filter(([key]) => key.startsWith("team:")));
}

export function teamPhotoPlacementKey(memberId: string) {
  return teamPhotoKey(memberId);
}
