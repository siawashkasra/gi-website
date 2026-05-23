import type { Metadata } from "next";
import { defaultLocale, locales } from "@/lib/i18n/locales";
import { siteConfig } from "@/lib/site";

function normalizePath(path: string) {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function buildLocalePath(locale: string, path: string) {
  const normalized = normalizePath(path);
  return `/${locale}${normalized}`;
}

export function buildLocaleAlternates(locale: string, path: string): Metadata["alternates"] {
  const normalized = normalizePath(path);
  const languages = Object.fromEntries(locales.map((l) => [l, buildLocalePath(l, normalized)])) as Record<string, string>;
  languages["x-default"] = buildLocalePath(defaultLocale, normalized);
  return { canonical: buildLocalePath(locale, normalized), languages };
}

export function buildOpenGraphUrl(locale: string, path: string) {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}${buildLocalePath(locale, path)}`;
}

export function mergePageMetadata(locale: string, path: string, metadata: Metadata): Metadata {
  const alternates = buildLocaleAlternates(locale, path);
  const ogUrl = buildOpenGraphUrl(locale, path);
  return {
    ...metadata,
    alternates: { ...alternates, ...metadata.alternates },
    openGraph: metadata.openGraph ? { ...metadata.openGraph, url: metadata.openGraph.url ?? ogUrl } : { url: ogUrl },
  };
}
