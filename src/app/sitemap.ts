import type { MetadataRoute } from "next";
import { getCompanyPageSlugs } from "@/data/companies";
import { defaultLocale, locales } from "@/lib/i18n/locales";
import { getAllProjectSlugs } from "@/lib/projects-data";
import { siteConfig } from "@/lib/site";

const paths = ["", "/company", "/projects", "/contact", "/jobs", "/events", ...getAllProjectSlugs().map((slug) => `/projects/${slug}`), ...getCompanyPageSlugs().map((slug) => `/companies/${slug}`)];

function buildLanguageAlternates(path: string) {
  const languages = Object.fromEntries(locales.map((l) => [l, `${siteConfig.url.replace(/\/$/, "")}/${l}${path}`])) as Record<string, string>;
  languages["x-default"] = `${siteConfig.url.replace(/\/$/, "")}/${defaultLocale}${path}`;
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/projects/") ? 0.85 : 0.7,
      alternates: { languages: buildLanguageAlternates(path) },
    })),
  );
}
