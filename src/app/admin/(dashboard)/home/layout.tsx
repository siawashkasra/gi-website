import { HomeEditorShell } from "@/components/admin/home-editor-shell";
import { fetchPlacementMap } from "@/lib/media/queries";

export default function HomeEditorLayout({ children }: { children: React.ReactNode }) {
  const placements = fetchPlacementMap();
  return (
    <>
      <HomeEditorShell placements={placements} />
      {children}
    </>
  );
}
