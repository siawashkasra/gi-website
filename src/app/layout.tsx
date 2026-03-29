import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: ["Gulbahar", "investment", "real estate", "Afghanistan", "Kabul", "development"],
  authors: [{ name: siteConfig.name }],
  openGraph: { type: "website", locale: "en_US", siteName: siteConfig.name, url: siteConfig.url, images: [{ url: siteConfig.openGraphImage, alt: siteConfig.name }] },
  twitter: { card: "summary_large_image", images: [siteConfig.openGraphImage] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#1f4e79" }, { media: "(prefers-color-scheme: dark)", color: "#1f4e79" }], width: "device-width", initialScale: 1 };

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full scroll-smooth`}>
      <body className="flex min-h-full flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
