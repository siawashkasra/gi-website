import { redirect } from "next/navigation";
import { companies } from "@/data/companies";

export default function AdminCompaniesIndexPage() {
  redirect(`/admin/companies/${companies[0]?.slug ?? "gulbahar-center"}`);
}
