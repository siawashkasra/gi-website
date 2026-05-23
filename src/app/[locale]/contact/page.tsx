import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactSection } from "@/components/contact/contact-section";
import { mergePageMetadata } from "@/lib/seo/page-metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { buildLocalBusinessJsonLd } from "@/lib/seo/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  const site = await getTranslations({ locale, namespace: "site" });
  return mergePageMetadata(locale, "/contact", {
    title: t("title"),
    description: t("description"),
    openGraph: { title: `${t("title")} | ${site("name")}`, description: t("description") },
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const site = await getTranslations({ locale, namespace: "site" });
  const localBusinessJsonLd = buildLocalBusinessJsonLd({ name: site("name"), description: site("description"), address: site("address"), locale });
  return (
    <div className="border-b border-border/60">
      <JsonLd data={localBusinessJsonLd} />
      <div className="ds-container bg-white pt-0 pb-20 sm:pb-28 lg:pb-32">
        <ContactSection />
      </div>
    </div>
  );
}
