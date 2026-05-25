export type TeamMemberRecord = { id?: string; name: string; title: string; photo?: string; bio: string };

export function photoKeyFromTeamPhoto(photo: string): string {
  const m = photo.match(/\/([^/]+)\.(png|jpe?g|webp)$/i);
  return m ? m[1]! : "";
}

export function resolveTeamMemberId(member: TeamMemberRecord, index: number): string {
  if (typeof member.id === "string" && member.id.trim()) return member.id.trim();
  const photo = member.photo ?? "";
  if (photo.startsWith("/images/team/")) {
    const fromPhoto = photoKeyFromTeamPhoto(photo);
    if (fromPhoto) return fromPhoto;
  }
  return `member-${index + 1}`;
}

export function defaultTeamPhotoPath(id: string): string {
  return `/images/team/${id}.png`;
}

export function newTeamMemberId(existingIds: Set<string>): string {
  let n = 1;
  let id = `member-${n}`;
  while (existingIds.has(id)) {
    n += 1;
    id = `member-${n}`;
  }
  return id;
}

export function normalizeTeamMembers(rows: TeamMemberRecord[]): TeamMemberRecord[] {
  const seen = new Set<string>();
  return rows.map((m, i) => {
    let id = resolveTeamMemberId(m, i);
    if (seen.has(id)) id = `${id}-${i}`;
    seen.add(id);
    const photo = typeof m.photo === "string" && m.photo.trim() ? m.photo.trim() : "";
    return { ...m, id, name: m.name ?? "", title: m.title ?? "", bio: m.bio ?? "", photo };
  });
}

export function teamMembersById(rows: TeamMemberRecord[]): Map<string, TeamMemberRecord> {
  return new Map(normalizeTeamMembers(rows).map((m, i) => [resolveTeamMemberId(m, i), m]));
}

export function resolveMemberPhoto(member: TeamMemberRecord, index: number, placements?: Record<string, { publicPath: string } | null>): string {
  const id = resolveTeamMemberId(member, index);
  const direct = typeof member.photo === "string" ? member.photo.trim() : "";
  if (direct.startsWith("/uploads/")) return direct;
  const placed = placements?.[`team:${id}`]?.publicPath?.trim();
  if (placed) return placed;
  return direct;
}
