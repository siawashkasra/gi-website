import { TeamEditorPage } from "@/components/admin/team-editor-page";
import { fetchPlacementMap } from "@/lib/media/queries";
import { teamPhotoKey } from "@/lib/media/placement-keys";
import { resolveTeamMemberId } from "@/lib/team/member-utils";
import { leadershipTeam } from "@/data/team";
import { resolveAdminCmsPayload } from "@/lib/cms/bundled-cms-defaults";
import { fetchContentDocument } from "@/lib/cms/content-documents-repo";
import type { TeamMember } from "@/data/team";

export default function AdminTeamPage() {
  const placementMap = fetchPlacementMap();
  const row = fetchContentDocument("team", "all", "en");
  const stored = row ? (JSON.parse(row.payloadJson) as unknown) : null;
  const { payload } = resolveAdminCmsPayload("team", "all", "en", stored);
  const members = Array.isArray(payload) && payload.length ? (payload as TeamMember[]) : leadershipTeam;
  const placements: Record<string, { publicPath: string; alt: string } | null> = {};
  for (const [i, m] of members.entries()) {
    const memberId = resolveTeamMemberId(m, i);
    const k = teamPhotoKey(memberId);
    const cur = placementMap.get(k);
    placements[k] = cur ? { publicPath: cur.publicPath, alt: cur.alt } : null;
  }
  for (const m of leadershipTeam) {
    const legacyKey = teamPhotoKey(m.id ?? m.photo.match(/\/([^/]+)\.(png|jpe?g|webp)$/i)?.[1] ?? "");
    if (!placements[legacyKey]) {
      const cur = placementMap.get(legacyKey);
      placements[legacyKey] = cur ? { publicPath: cur.publicPath, alt: cur.alt } : null;
    }
  }
  return <TeamEditorPage placements={placements} />;
}
