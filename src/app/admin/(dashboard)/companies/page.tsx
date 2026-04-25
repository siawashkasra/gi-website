import { MediaSlotEditor } from "@/components/admin/media-slot-editor";
import { companies } from "@/data/companies";
import { companyLogoKey } from "@/lib/media/placement-keys";

export default function AdminCompaniesPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-gi-navy">Companies</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Logo images used on the home grid and company profile pages. Slug must match the site data.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((c) => (
          <MediaSlotEditor key={c.slug} label={c.name} placementKey={companyLogoKey(c.slug)} />
        ))}
      </div>
    </div>
  );
}
