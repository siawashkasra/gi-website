"use client";

import { useLocale } from "next-intl";
import type { Locale } from "@/lib/i18n/locales";
import { formatCopyrightNotice, formatCurrencyUsd, formatInteger, formatNumber, formatYear, localizeNumeralsInText } from "@/lib/i18n/format";

export function useLocalizedFormat() {
  const locale = useLocale() as Locale;
  return {
    locale,
    formatNumber: (value: number, options?: Intl.NumberFormatOptions) => formatNumber(value, locale, options),
    formatInteger: (value: number) => formatInteger(value, locale),
    formatYear: (value: number) => formatYear(value, locale),
    formatCurrencyUsd: (value: number) => formatCurrencyUsd(value, locale),
    formatCopyrightNotice: (name: string, year: number) => formatCopyrightNotice(name, year, locale),
    localizeText: (text: string) => localizeNumeralsInText(text, locale),
  };
}
