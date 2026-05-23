import { HeroesEditorShell } from "@/components/admin/heroes-editor-shell";
import { fetchPlacementMap } from "@/lib/media/queries";

export default function HeroesEditorLayout({ children }: { children: React.ReactNode }) {
  const placements = fetchPlacementMap();
  return (
    <>
      <HeroesEditorShell placements={placements} />
      {children}
    </>
  );
}
