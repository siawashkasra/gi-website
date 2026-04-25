import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "@/styles/globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getMergedProjects } from "@/lib/media/merge";
import { siteConfig } from "@/lib/site";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: ["Gulbahar", "investment", "real estate", "Afghanistan", "Kabul", "development", "cement", "energy", "infrastructure"],
  authors: [{ name: siteConfig.name }],
  openGraph: { type: "website", locale: "en_US", siteName: siteConfig.name, url: siteConfig.url, images: [{ url: siteConfig.openGraphImage, alt: siteConfig.name }] },
  twitter: { card: "summary_large_image", images: [siteConfig.openGraphImage] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#1a3a6b" }, { media: "(prefers-color-scheme: dark)", color: "#0d1b3e" }], width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url.replace(/\/$/, "")}${siteConfig.openGraphImage}`,
  foundingDate: "2006",
  email: siteConfig.email,
  telephone: `${siteConfig.phoneLandline}, ${siteConfig.phone}`,
  address: { "@type": "PostalAddress", streetAddress: siteConfig.address, addressCountry: "AF" },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const menuProjects = await getMergedProjects();
  return (
    <html lang="en" className={`${manrope.variable} h-full scroll-smooth`} suppressHydrationWarning>
      <body id="gi-root" className="flex min-h-full flex-col" suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SiteHeader menuProjects={menuProjects} />
        <main className="flex-1 pt-[4.25rem]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
