"use client";

import { useLocale, useTranslations } from "next-intl";
import { buildWhatsappUrl } from "@/lib/i18n/contact-channels";
import { formatEmailDisplay, formatPhoneDisplay } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/locales";
import { siteConfig } from "@/lib/site";

export function useSiteContact() {
  const locale = useLocale() as Locale;
  const tSite = useTranslations("site");
  const tContact = useTranslations("contact");
  const address = tSite("address");
  const emailRaw = tSite("email", { default: siteConfig.email });
  const phoneRaw = tSite("phone", { default: siteConfig.phone });
  const phoneLandlineRaw = tSite("phoneLandline", { default: siteConfig.phoneLandline });
  const email = formatEmailDisplay(emailRaw, locale);
  const phoneDisplay = formatPhoneDisplay(phoneRaw, locale);
  const phoneLandlineDisplay = formatPhoneDisplay(phoneLandlineRaw, locale);
  const whatsappUrl = buildWhatsappUrl(tContact("whatsappDefault", { name: tSite("name") }));
  const telHref = `tel:${phoneRaw.replace(/\s/g, "")}`;
  const telLandlineHref = `tel:${phoneLandlineRaw.replace(/\s/g, "")}`;
  const mailtoHref = `mailto:${emailRaw}`;
  const mapsQuery = encodeURIComponent(address);
  const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&z=15&output=embed`;
  const mapsOpenUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  return { mapsEmbedUrl, mapsOpenUrl, telHref, telLandlineHref, mailtoHref, email, phoneDisplay, phoneLandlineDisplay, address, whatsappUrl };
}
