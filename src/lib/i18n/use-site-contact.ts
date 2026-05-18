"use client";

import { useTranslations } from "next-intl";
import { buildWhatsappUrl, contactChannels } from "@/lib/i18n/contact-channels";

export function useSiteContact() {
  const tSite = useTranslations("site");
  const tContact = useTranslations("contact");
  const address = tSite("address");
  const whatsappUrl = buildWhatsappUrl(tContact("whatsappDefault", { name: tSite("name") }));
  return { ...contactChannels, address, whatsappUrl };
}
