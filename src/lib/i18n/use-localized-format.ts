"use client";

import { useLocale } from "next-intl";
import type { Locale } from "../../../i18n";
import { formatCurrencyUsd, formatNumber, localizeNumeralsInText } from "@/lib/i18n/format";

export function useLocalizedFormat() {
  const locale = useLocale() as Locale;
  return {
    locale,
    formatNumber: (value: number, options?: Intl.NumberFormatOptions) => formatNumber(value, locale, options),
    formatCurrencyUsd: (value: number) => formatCurrencyUsd(value, locale),
    localizeText: (text: string) => localizeNumeralsInText(text, locale),
  };
}
