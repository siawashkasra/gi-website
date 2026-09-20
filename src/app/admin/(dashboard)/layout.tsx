import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminPage } from "@/lib/admin/require-admin";

export default async function AdminDashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireAdminPage();
  return <AdminShell>{children}</AdminShell>;
}
