import type { Locale } from "../../../i18n";

const ARABIC_EXT_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"] as const;

export function numberFormatLocale(locale: Locale): string {
  if (locale === "fa-AF") return "fa-AF-u-nu-arabext";
  if (locale === "ps") return "ps-AF-u-nu-arabext";
  return locale;
}

export function localizeNumeralsInText(text: string, locale: Locale): string {
  if (locale === "en" || !text) return text;
  return text.replace(/[0-9]/g, (d) => ARABIC_EXT_DIGITS[Number(d)] ?? d);
}

export function formatDate(value: Date | string | number, locale: Locale, options?: Intl.DateTimeFormatOptions) {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(numberFormatLocale(locale), options ?? { year: "numeric", month: "long", day: "numeric" }).format(date);
}

export function formatNumber(value: number, locale: Locale, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(numberFormatLocale(locale), options).format(value);
}

export function formatCurrencyUsd(value: number, locale: Locale) {
  return new Intl.NumberFormat(numberFormatLocale(locale), { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}
