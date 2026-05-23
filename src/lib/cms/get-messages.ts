import "server-only";
import { unstable_cache } from "next/cache";
import en from "../../../messages/en.json";
import faAF from "../../../messages/fa-AF.json";
import ps from "../../../messages/ps.json";
import { applyContentOverlays, applySiteSettingsToMessages } from "@/lib/cms/apply-content-overlay";
import type { CmsLocale } from "@/lib/i18n/locales";
import { fetchContentDocumentsForLocale } from "@/lib/cms/content-documents-repo";
import { getSiteSettingsPayload } from "@/lib/cms/site-settings-repo";

const staticByLocale = { en, "fa-AF": faAF, ps } as const;

function buildMessages(locale: CmsLocale) {
  const base = structuredClone(staticByLocale[locale]) as Record<string, unknown>;
  const rows = fetchContentDocumentsForLocale(locale);
  applyContentOverlays(base, rows);
  applySiteSettingsToMessages(base, locale, getSiteSettingsPayload());
  return base;
}

export function getMessagesForLocale(locale: CmsLocale) {
  return unstable_cache(async () => buildMessages(locale), [`cms-messages-${locale}`], { tags: ["cms-content"] })();
}
