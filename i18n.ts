import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import en from "./messages/en.json";
import { getMessagesForLocale } from "@/lib/cms/get-messages";
import { defaultLocale, locales, type CmsLocale, type Locale } from "@/lib/i18n/locales";

export { defaultLocale, locales, type Locale };

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!locale || !locales.includes(locale as Locale)) notFound();
  const messages = await getMessagesForLocale(locale as CmsLocale);
  return { locale, messages: messages as typeof en };
});
