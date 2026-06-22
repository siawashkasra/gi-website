import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutSection } from "@/components/home/about-section";
import { CeoMessageSection } from "@/components/home/ceo-message-section";
import { HeroSection } from "@/components/home/hero-section";
import { MilestonesSection } from "@/components/home/milestones-section";
import { getResolvedHomeSectionMedia } from "@/lib/media/merge";
import { mergePageMetadata } from "@/lib/seo/page-metadata";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  return mergePageMetadata(locale, "", {
    title: { absolute: t("title") },
    description: t("description"),
    openGraph: { title: t("title"), description: t("description"), images: [{ url: siteConfig.openGraphImage, alt: t("title") }] },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description"), images: [siteConfig.openGraphImage] },
  });
}

export default async function HomePage() {
  const homeMedia = await getResolvedHomeSectionMedia();
  return (
    <>
      <HeroSection />
      <AboutSection imageSrc={homeMedia.about?.src} imageAlt={homeMedia.about?.alt} />
      <MilestonesSection imageSrc={homeMedia.milestones?.src} imageAlt={homeMedia.milestones?.alt} />
      <CeoMessageSection portraitSrc={homeMedia.ceo?.src} portraitAlt={homeMedia.ceo?.alt} showPortrait={false} />
    </>
  );
}
