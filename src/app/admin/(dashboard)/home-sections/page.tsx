import { MediaSlotEditor } from "@/components/admin/media-slot-editor";
import { sectionHomeAboutKey, sectionHomeCeoKey, sectionHomeMilestonesKey } from "@/lib/media/placement-keys";

export default function AdminHomeSectionsPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-gi-navy">Home sections</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Images for About, Milestones, and CEO blocks on the homepage.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <MediaSlotEditor label="About section" placementKey={sectionHomeAboutKey()} />
        <MediaSlotEditor label="Milestones section" placementKey={sectionHomeMilestonesKey()} />
        <MediaSlotEditor label="CEO message portrait" placementKey={sectionHomeCeoKey()} />
      </div>
    </div>
  );
}
