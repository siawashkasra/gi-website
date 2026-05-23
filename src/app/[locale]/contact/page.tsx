import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactSection } from "@/components/contact/contact-section";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  const site = await getTranslations({ locale, namespace: "site" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: `${t("title")} | ${site("name")}` },
  };
}

export default function ContactPage() {
  return (
    <div className="border-b border-border/60">
      <div className="ds-container bg-white pt-0 pb-20 sm:pb-28 lg:pb-32">
        <ContactSection />
      </div>
    </div>
  );
}
