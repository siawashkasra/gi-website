import type { Locale } from "@/lib/i18n/locales";

const ARABIC_EXT_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"] as const;
const LTR_ISOLATE_START = "\u2066";
const LTR_ISOLATE_END = "\u2069";

export function wrapLtrIsolate(text: string): string {
  if (!text) return text;
  return `${LTR_ISOLATE_START}${text}${LTR_ISOLATE_END}`;
}

function isPhoneLike(text: string): boolean {
  const t = text.trim();
  return t.startsWith("+") || /^[\d+\s()-]+$/.test(t);
}

function isEmailLike(text: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim());
}

function isNumericMetric(text: string): boolean {
  const t = text.trim();
  if (!/[0-9۰-۹]/.test(t)) return false;
  if (/^[0-9۰-۹]{1,4}$/.test(t)) return true;
  if (/^[+\d۰-۹٬,\.\s%$€£-]+$/u.test(t)) return true;
  if (/^©\s*[0-9۰-۹٬,\.\s]+$/u.test(t)) return true;
  return false;
}

export function numberFormatLocale(locale: Locale): string {
  if (locale === "fa-AF") return "fa-AF-u-nu-arabext";
  if (locale === "ps") return "ps-AF-u-nu-arabext";
  return locale;
}

export function localizeNumeralsInText(text: string, locale: Locale): string {
  if (locale === "en" || !text) return text;
  if (isPhoneLike(text) || isEmailLike(text)) return wrapLtrIsolate(text.trim());
  const localized = text.replace(/[0-9]/g, (d) => ARABIC_EXT_DIGITS[Number(d)] ?? d);
  if (isNumericMetric(localized)) return wrapLtrIsolate(localized);
  return localized;
}

export function formatPhoneDisplay(phone: string, locale: Locale): string {
  const raw = phone.trim();
  if (locale === "en") return raw;
  const localized = raw.replace(/[0-9]/g, (d) => ARABIC_EXT_DIGITS[Number(d)] ?? d);
  return wrapLtrIsolate(localized);
}

export function formatEmailDisplay(email: string, locale: Locale): string {
  const raw = email.trim();
  if (locale === "en") return raw;
  return wrapLtrIsolate(raw);
}

export function formatDate(value: Date | string | number, locale: Locale, options?: Intl.DateTimeFormatOptions) {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(numberFormatLocale(locale), options ?? { year: "numeric", month: "long", day: "numeric" }).format(date);
}

export function formatNumber(value: number, locale: Locale, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(numberFormatLocale(locale), options).format(value);
}

export function formatInteger(value: number, locale: Locale) {
  return formatNumber(value, locale, { useGrouping: false, maximumFractionDigits: 0 });
}

export function formatYear(value: number, locale: Locale) {
  return formatInteger(value, locale);
}

export function formatCurrencyUsd(value: number, locale: Locale) {
  const amount = formatInteger(value, locale);
  if (locale === "fa-AF") return `${wrapLtrIsolate(amount)} دلار`;
  if (locale === "ps") return `${wrapLtrIsolate(amount)} امریکایی ډالر`;
  return new Intl.NumberFormat(numberFormatLocale(locale), { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function formatCopyrightNotice(name: string, year: number, locale: Locale): string {
  const y = formatInteger(year, locale);
  if (locale === "en") return `© ${y} ${name}`;
  return `${name} · ${wrapLtrIsolate(`© ${y}`)}`;
}
