import "server-only";
import { and, asc, eq } from "drizzle-orm";
import { eventTranslations, events, jobPostingTranslations, jobPostings } from "@/db/schema";
import { getDb } from "@/db/index";
import { getSiteSettingsPayload } from "@/lib/cms/site-settings-repo";
import { siteConfig } from "@/lib/site";

type JsonLd = Record<string, unknown>;

function siteBaseUrl() {
  return siteConfig.url.replace(/\/$/, "");
}

function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteBaseUrl()}${normalized}`;
}

function absoluteAssetUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return absoluteUrl(path);
}

function collectSameAs() {
  const settings = getSiteSettingsPayload();
  const urls = [siteConfig.social.instagram, siteConfig.social.facebook, settings.social?.instagram, settings.social?.facebook].filter((url): url is string => !!url && url.trim().length > 0);
  return [...new Set(urls)];
}

export function buildOrganizationJsonLd(input: { name: string; description: string; address: string; logoPath: string }): JsonLd {
  const sameAs = collectSameAs();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.name,
    description: input.description,
    url: siteBaseUrl(),
    logo: absoluteAssetUrl(input.logoPath),
    foundingDate: "2006",
    email: getSiteSettingsPayload().email ?? siteConfig.email,
    telephone: `${getSiteSettingsPayload().phoneLandline ?? siteConfig.phoneLandline}, ${getSiteSettingsPayload().phone ?? siteConfig.phone}`,
    address: { "@type": "PostalAddress", streetAddress: input.address, addressCountry: "AF" },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function buildWebSiteJsonLd(input: { name: string; locale: string }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: input.name,
    url: absoluteUrl(`/${input.locale}`),
    inLanguage: input.locale,
    publisher: { "@type": "Organization", name: input.name, url: siteBaseUrl() },
  };
}

export function buildLocalBusinessJsonLd(input: { name: string; description: string; address: string; locale: string }): JsonLd {
  const sameAs = collectSameAs();
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: input.name,
    description: input.description,
    url: absoluteUrl(`/${input.locale}/contact`),
    email: getSiteSettingsPayload().email ?? siteConfig.email,
    telephone: getSiteSettingsPayload().phone ?? siteConfig.phone,
    address: { "@type": "PostalAddress", streetAddress: input.address, addressCountry: "AF" },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function buildProjectJsonLd(input: { locale: string; slug: string; name: string; description: string; image: string; location?: string }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: input.name,
    description: input.description,
    url: absoluteUrl(`/${input.locale}/projects/${input.slug}`),
    image: absoluteAssetUrl(input.image),
    ...(input.location ? { address: { "@type": "PostalAddress", addressLocality: input.location, addressCountry: "AF" } } : {}),
  };
}

export function buildJobPostingsJsonLd(locale: string, siteName: string): JsonLd | null {
  const db = getDb();
  const jobs = db.select().from(jobPostings).where(eq(jobPostings.published, 1)).orderBy(asc(jobPostings.sortOrder), asc(jobPostings.createdAt)).all();
  const items: JsonLd[] = [];
  for (const job of jobs) {
    const tr =
      db.select().from(jobPostingTranslations).where(and(eq(jobPostingTranslations.jobId, job.id), eq(jobPostingTranslations.locale, locale))).get() ??
      db.select().from(jobPostingTranslations).where(and(eq(jobPostingTranslations.jobId, job.id), eq(jobPostingTranslations.locale, "en"))).get();
    if (!tr) continue;
    items.push({
      "@type": "JobPosting",
      title: tr.title,
      description: tr.summary,
      datePosted: new Date(job.createdAt).toISOString(),
      hiringOrganization: { "@type": "Organization", name: siteName, sameAs: siteBaseUrl() },
      jobLocation: { "@type": "Place", name: tr.location, address: { "@type": "PostalAddress", addressCountry: "AF" } },
      url: absoluteUrl(`/${locale}/jobs`),
    });
  }
  if (!items.length) return null;
  return { "@context": "https://schema.org", "@type": "ItemList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, item })) };
}

export function buildEventsJsonLd(locale: string): JsonLd | null {
  const db = getDb();
  const evs = db.select().from(events).where(eq(events.published, 1)).orderBy(asc(events.sortOrder), asc(events.createdAt)).all();
  const items: JsonLd[] = [];
  for (const event of evs) {
    const tr =
      db.select().from(eventTranslations).where(and(eq(eventTranslations.eventId, event.id), eq(eventTranslations.locale, locale))).get() ??
      db.select().from(eventTranslations).where(and(eq(eventTranslations.eventId, event.id), eq(eventTranslations.locale, "en"))).get();
    if (!tr) continue;
    items.push({
      "@type": "Event",
      name: tr.title,
      description: `${tr.dateLabel}. ${tr.summary}`,
      location: { "@type": "Place", name: tr.location, address: { "@type": "PostalAddress", addressCountry: "AF" } },
      url: absoluteUrl(`/${locale}/events`),
    });
  }
  if (!items.length) return null;
  return { "@context": "https://schema.org", "@type": "ItemList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, item })) };
}

export function serializeJsonLd(data: JsonLd | JsonLd[]) {
  return JSON.stringify(data);
}
