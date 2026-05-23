export const locales = ["en", "fa-AF", "ps"] as const;
export type Locale = (typeof locales)[number];
export type CmsLocale = Locale;
export const defaultLocale: Locale = "en";
