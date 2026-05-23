import { redirect } from "next/navigation";
import { projects } from "@/data/projects";

export default function AdminHeroSidebarRedirectPage() {
  redirect(`/admin/projects/${projects[0]?.slug ?? ""}/sidebar`);
}
