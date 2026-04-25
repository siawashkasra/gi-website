import { MediaSlotEditor } from "@/components/admin/media-slot-editor";
import { adminHomeSectionFallbacks } from "@/lib/admin/media-slot-defaults";
import { sectionHomeAboutKey, sectionHomeCeoKey, sectionHomeMilestonesKey } from "@/lib/media/placement-keys";
import { fetchPlacementMap } from "@/lib/media/queries";

export default function AdminHomeSectionsPage() {
  const placements = fetchPlacementMap();
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-gi-navy">Home sections</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Images for About, Milestones, and CEO blocks on the homepage.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <MediaSlotEditor label="About section" placementKey={sectionHomeAboutKey()} current={placements.get(sectionHomeAboutKey()) ?? null} fallbackImage={adminHomeSectionFallbacks.about} />
        <MediaSlotEditor label="Milestones section" placementKey={sectionHomeMilestonesKey()} current={placements.get(sectionHomeMilestonesKey()) ?? null} fallbackImage={adminHomeSectionFallbacks.milestones} />
        <MediaSlotEditor label="CEO message portrait" placementKey={sectionHomeCeoKey()} current={placements.get(sectionHomeCeoKey()) ?? null} fallbackImage={adminHomeSectionFallbacks.ceo} />
      </div>
    </div>
  );
}
