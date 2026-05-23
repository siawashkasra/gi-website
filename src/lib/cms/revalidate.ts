import { revalidatePath, revalidateTag } from "next/cache";

export function revalidateCmsContent() {
  revalidateTag("cms-content", "max");
  for (const locale of ["en", "fa-AF", "ps"] as const) revalidatePath(`/${locale}`);
}
