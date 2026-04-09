import { siteConfig } from "@/lib/site";

const whatsappE164 = "93786009797";

const defaultWhatsAppText = `Hello — I would like to connect regarding ${siteConfig.name}.`;

export const contact = {
  whatsappUrl: `https://wa.me/${whatsappE164}?text=${encodeURIComponent(defaultWhatsAppText)}`,
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Gulbahar+Center,+Charahi+Malik+Asghar,+Kabul,+Afghanistan&z=15&output=embed",
  mapsOpenUrl: "https://www.google.com/maps/search/?api=1&query=Gulbahar+Center+Charahi+Malik+Asghar+Kabul+Afghanistan",
  telHref: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  telLandlineHref: `tel:${siteConfig.phoneLandline.replace(/\s/g, "")}`,
  mailtoHref: `mailto:${siteConfig.email}`,
  address: siteConfig.address,
  email: siteConfig.email,
  phoneDisplay: siteConfig.phone,
  phoneLandlineDisplay: siteConfig.phoneLandline,
} as const;
