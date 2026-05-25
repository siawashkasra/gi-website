import { revalidatePath, revalidateTag } from "next/cache";

export function revalidateCmsContent() {
  revalidateTag("cms-content", "max");
  for (const locale of ["en", "fa-AF", "ps"] as const) revalidatePath(`/${locale}`);
}

export function revalidateProjects() {
  revalidateCmsContent();
  revalidatePath("/sitemap.xml");
  for (const locale of ["en", "fa-AF", "ps"] as const) {
    revalidatePath(`/${locale}/projects`);
    revalidatePath(`/${locale}`, "page");
  }
}
