import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import en from "./messages/en.json";
import faAF from "./messages/fa-AF.json";
import ps from "./messages/ps.json";

export const locales = ["en", "fa-AF", "ps"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const messagesByLocale = { en, "fa-AF": faAF, ps } satisfies Record<Locale, typeof en>;

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!locale || !locales.includes(locale as Locale)) notFound();
  return { locale, messages: messagesByLocale[locale as Locale] };
});
