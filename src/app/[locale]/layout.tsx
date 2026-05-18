import type { Metadata, Viewport } from "next";
import { Manrope, Vazirmatn } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "@/styles/globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { locales, type Locale } from "../../../i18n";
import { getMergedProjects } from "@/lib/media/merge";
import { localizeMergedProjects } from "@/lib/i18n/localized-data";
import { siteConfig } from "@/lib/site";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });
const vazirmatn = Vazirmatn({ subsets: ["arabic"], weight: ["300", "400", "500", "600", "700", "800"], variable: "--font-vazirmatn", display: "swap", preload: true });

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const site = await getTranslations({ locale, namespace: "site" });
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: site("name"), template: `%s | ${site("name")}` },
    description: site("description"),
    keywords: t.raw("keywords") as string[],
    authors: [{ name: site("name") }],
    openGraph: { type: "website", locale: locale === "en" ? "en_US" : locale === "fa-AF" ? "fa_AF" : "ps_AF", siteName: site("name"), url: siteConfig.url, images: [{ url: siteConfig.openGraphImage, alt: site("name") }] },
    twitter: { card: "summary_large_image", images: [siteConfig.openGraphImage] },
    robots: { index: true, follow: true },
    alternates: { languages: { en: "/en", "fa-AF": "/fa-AF", ps: "/ps" } },
  };
}

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#1a3a6b" }, { media: "(prefers-color-scheme: dark)", color: "#0d1b3e" }], width: "device-width", initialScale: 1 };

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const menuProjects = localizeMergedProjects(messages as Parameters<typeof localizeMergedProjects>[0], await getMergedProjects());
  const t = await getTranslations({ locale, namespace: "site" });
  const jsonLd = { "@context": "https://schema.org", "@type": "Organization", name: t("name"), description: t("description"), url: siteConfig.url, logo: `${siteConfig.url.replace(/\/$/, "")}${siteConfig.openGraphImage}`, foundingDate: "2006", email: siteConfig.email, telephone: `${siteConfig.phoneLandline}, ${siteConfig.phone}`, address: { "@type": "PostalAddress", streetAddress: t("address"), addressCountry: "AF" } };
  const isEn = locale === "en";
  return (
    <html lang={locale} dir={isEn ? "ltr" : "rtl"} className={`${isEn ? manrope.variable : vazirmatn.variable} h-full scroll-smooth`} suppressHydrationWarning>
      <body id="gi-root" className="flex min-h-full flex-col" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <SiteHeader menuProjects={menuProjects} />
          <main className="flex-1 pt-[4.25rem]">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
