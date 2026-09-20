import { CompaniesEditorShell } from "@/components/admin/companies-editor-shell";
import { fetchPlacementMap } from "@/lib/media/queries";

export default function CompaniesEditorLayout({ children }: { children: React.ReactNode }) {
  const placements = fetchPlacementMap();
  return (
    <>
      <CompaniesEditorShell placements={placements} />
      {children}
    </>
  );
}
