import type { MetadataRoute } from "next";
import { getCompanyPageSlugs } from "@/data/companies";
import { projects } from "@/data/projects";
import { locales } from "../../i18n";
import { siteConfig } from "@/lib/site";

const paths = ["", "/company", "/projects", "/contact", "/jobs", "/events", ...projects.map((p) => `/projects/${p.slug}`), ...getCompanyPageSlugs().map((slug) => `/companies/${slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const last = new Date();
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: last,
      changeFrequency: path === "" ? ("monthly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path.startsWith("/projects/") ? 0.85 : 0.7,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}${path}`])) },
    })),
  );
}
