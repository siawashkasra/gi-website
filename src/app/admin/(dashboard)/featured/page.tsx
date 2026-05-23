import { redirect } from "next/navigation";

export default function AdminFeaturedRedirectPage() {
  redirect("/admin/home/featured");
}
