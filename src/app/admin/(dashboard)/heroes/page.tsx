import { redirect } from "next/navigation";

export default function AdminHeroesIndexPage() {
  redirect("/admin/heroes/home");
}
