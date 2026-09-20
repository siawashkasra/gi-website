import type { CmsLocale } from "@/lib/i18n/locales";
import faRules from "../../../messages/localize-replacements.fa-AF.json";
import psRules from "../../../messages/localize-replacements.ps.json";

export type LocalizeRule = [from: string, to: string];

export function applyLocalizeRules(text: string, rules: LocalizeRule[]): string {
  let out = text;
  for (const [from, to] of rules) out = out.split(from).join(to);
  return out;
}

export function getLocalizeRulesForLocale(locale: CmsLocale): LocalizeRule[] {
  if (locale === "fa-AF") return faRules as LocalizeRule[];
  if (locale === "ps") return psRules as LocalizeRule[];
  return [];
}

export function localizeStringForLocale(text: string, locale: CmsLocale): string {
  if (locale === "en") return text;
  return applyLocalizeRules(text, getLocalizeRulesForLocale(locale));
}

export function localizeJsonStrings(value: unknown, locale: CmsLocale): unknown {
  if (locale === "en") return value;
  if (typeof value === "string") return localizeStringForLocale(value, locale);
  if (Array.isArray(value)) return value.map((item) => localizeJsonStrings(item, locale));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) out[key] = localizeJsonStrings(child, locale);
    return out;
  }
  return value;
}
