import type { Metadata, Viewport } from "next";
import { siteFontManrope, siteFontVazirmatn } from "@/lib/site-fonts";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "@/styles/globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { locales, type Locale } from "@/lib/i18n/locales";
import { getMergedProjects } from "@/lib/media/merge";
import { resolveSiteBrand } from "@/lib/media/resolve-brand";
import { localizeMergedProjects } from "@/lib/i18n/localized-data";
import { JsonLd } from "@/components/seo/json-ld";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo/structured-data";
import { buildOpenGraphUrl } from "@/lib/seo/page-metadata";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const site = await getTranslations({ locale, namespace: "site" });
  const brand = resolveSiteBrand();
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: site("name"), template: `%s | ${site("name")}` },
    description: site("description"),
    keywords: t.raw("keywords") as string[],
    authors: [{ name: site("name") }],
    openGraph: { type: "website", locale: locale === "en" ? "en_US" : locale === "fa-AF" ? "fa_AF" : "ps_AF", siteName: site("name"), url: buildOpenGraphUrl(locale, ""), images: [{ url: brand.ogImagePath, alt: site("name") }] },
    twitter: { card: "summary_large_image", images: [brand.ogImagePath] },
    robots: { index: true, follow: true },
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
  };
}

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#1a3a6b" }, { media: "(prefers-color-scheme: dark)", color: "#0d1b3e" }], width: "device-width", initialScale: 1 };

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const menuProjects = localizeMergedProjects(messages as Parameters<typeof localizeMergedProjects>[0], await getMergedProjects());
  const brand = resolveSiteBrand();
  const t = await getTranslations({ locale, namespace: "site" });
  const organizationJsonLd = buildOrganizationJsonLd({ name: t("name"), description: t("description"), address: t("address"), logoPath: brand.ogImagePath });
  const websiteJsonLd = buildWebSiteJsonLd({ name: t("name"), locale });
  const isEn = locale === "en";
  return (
    <html lang={locale} dir={isEn ? "ltr" : "rtl"} className={`${isEn ? siteFontManrope.variable : siteFontVazirmatn.variable} h-full scroll-smooth`} suppressHydrationWarning>
      <body id="gi-root" className="flex min-h-full flex-col" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
          <SiteHeader menuProjects={menuProjects} siteLogoUrl={brand.siteLogoUrl} siteLogoAlt={brand.siteLogoAlt} />
          <main className="flex-1 pt-[4.25rem]">{children}</main>
          <SiteFooter siteLogoUrl={brand.siteLogoUrl} siteLogoAlt={brand.siteLogoAlt} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
