import type { MetadataRoute } from "next";
import { getCompanyPageSlugs } from "@/data/companies";
import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const last = new Date();
  return [
    { url: base, lastModified: last, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, lastModified: last, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: last, changeFrequency: "yearly", priority: 0.7 },
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: last, changeFrequency: "monthly" as const, priority: 0.85 })),
    ...getCompanyPageSlugs().map((slug) => ({ url: `${base}/companies/${slug}`, lastModified: last, changeFrequency: "monthly" as const, priority: 0.75 })),
  ];
}
