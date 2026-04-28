import { MediaSlotEditor } from "@/components/admin/media-slot-editor";
import { leadershipTeam } from "@/data/team";
import { teamPhotoKey } from "@/lib/media/placement-keys";
import { fetchPlacementMap } from "@/lib/media/queries";

function keyFromPhoto(photo: string) {
  const m = photo.match(/\/([^/]+)\.(png|jpe?g|webp)$/i);
  return m ? m[1] : photo;
}

export default function AdminTeamPage() {
  const placements = fetchPlacementMap();
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-gi-navy">Team</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Portrait photos on the homepage. Keys match static filenames (e.g. abdullah-hashimi).</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {leadershipTeam.map((m) => {
          const k = keyFromPhoto(m.photo);
          const pk = teamPhotoKey(k);
          return <MediaSlotEditor key={m.name} label={`${m.name} — ${m.title}`} placementKey={pk} current={placements.get(pk) ?? null} fallbackImage={{ publicPath: m.photo, alt: `${m.name}, ${m.title}` }} />;
        })}
      </div>
    </div>
  );
}
