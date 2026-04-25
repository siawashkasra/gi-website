import { MediaSlotEditor } from "@/components/admin/media-slot-editor";
import { adminHeroFallbackByRoute, adminHomeMobileHeroFallback } from "@/lib/admin/media-slot-defaults";
import { heroMobilePlacementKey, heroPlacementKey, heroRoutes } from "@/lib/media/placement-keys";
import { fetchPlacementMap } from "@/lib/media/queries";

const labels: Record<(typeof heroRoutes)[number], string> = {
  home: "Home (main hero)",
  company: "Company page",
  jobs: "Jobs page",
  events: "Events page",
  projectsIndex: "Projects index",
};

export default function AdminHeroesPage() {
  const placements = fetchPlacementMap();
  const mobileHeroKey = heroMobilePlacementKey();
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-gi-navy">Page heroes</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Full-width hero images. Home also has an optional mobile image.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {heroRoutes.map((route) => {
          const k = heroPlacementKey(route);
          return <MediaSlotEditor key={route} label={labels[route]} placementKey={k} current={placements.get(k) ?? null} fallbackImage={adminHeroFallbackByRoute[route]} />;
        })}
        <MediaSlotEditor label="Home — mobile hero (optional)" placementKey={mobileHeroKey} current={placements.get(mobileHeroKey) ?? null} fallbackImage={adminHomeMobileHeroFallback} />
      </div>
    </div>
  );
}
