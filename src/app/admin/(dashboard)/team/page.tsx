import { TeamEditorPage } from "@/components/admin/team-editor-page";
import { MediaSlotEditor } from "@/components/admin/media-slot-editor";
import { leadershipTeam } from "@/data/team";
import { teamPhotoKey } from "@/lib/media/placement-keys";
import { fetchPlacementMap } from "@/lib/media/queries";

export default function AdminTeamPage() {
  const placements = fetchPlacementMap();
  return (
    <div>
      <TeamEditorPage />
      <div className="mx-4 mt-10 sm:mx-8">
        <h2 className="font-heading text-lg font-semibold text-gi-navy">Photos</h2>
        <p className="mt-1 text-sm text-muted-foreground">Portrait images for each team member (linked by position).</p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {leadershipTeam.map((m) => {
            const memberKey = m.photo.match(/\/([^/]+)\.(png|jpe?g|webp)$/i)?.[1] ?? m.name;
            const k = teamPhotoKey(memberKey);
            return <MediaSlotEditor key={k} label={m.name} placementKey={k} current={placements.get(k) ?? null} fallbackImage={{ publicPath: m.photo, alt: m.name }} variant="portrait" compact />;
          })}
        </div>
      </div>
    </div>
  );
}
