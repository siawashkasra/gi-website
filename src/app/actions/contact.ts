"use server";

import { getTranslations } from "next-intl/server";

export type ContactState = { ok?: boolean; message?: string };

export async function submitContact(_prev: ContactState | null, formData: FormData): Promise<ContactState> {
  const t = await getTranslations("contact.validation");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  if (!name) return { message: t("nameRequired") };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { message: t("emailInvalid") };
  if (!message) return { message: t("messageRequired") };
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true, message: t("success") };
}
