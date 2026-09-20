import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BrandAdmin } from "@/components/admin/brand-admin";
import { fetchPlacementMap } from "@/lib/media/queries";

export default function AdminBrandPage() {
  const placements = fetchPlacementMap();
  return (
    <div>
      <AdminPageHeader title="Brand & logos" description="Site logo for header and footer, social preview image, and guidance for company logos." />
      <BrandAdmin placements={placements} />
    </div>
  );
}
