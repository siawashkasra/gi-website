import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MediaLibraryAdmin } from "@/components/admin/media-library-admin";

export default function AdminLibraryPage() {
  return (
    <div>
      <AdminPageHeader title="Media library" description="Browse recently uploaded images." />
      <MediaLibraryAdmin />
    </div>
  );
}
