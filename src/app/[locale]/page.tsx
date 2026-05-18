import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutSection } from "@/components/home/about-section";
import { CeoMessageSection } from "@/components/home/ceo-message-section";
import { CompanySnapshotSection } from "@/components/home/company-snapshot-section";
import { CoreAreasHomeSection } from "@/components/home/core-areas-home-section";
import { StrengthsInternationalHomeSection } from "@/components/home/strengths-international-home-section";
import { CtaSection } from "@/components/home/cta-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { HeroSection } from "@/components/home/hero-section";
import { MilestonesSection } from "@/components/home/milestones-section";
import { MissionVisionSection } from "@/components/home/mission-vision-section";
import { OurCompaniesSection } from "@/components/home/our-companies-section";
import { StandardsSection } from "@/components/home/standards-section";
import { StatsSection } from "@/components/home/stats-section";
import { TeamSection } from "@/components/home/team-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ValuesSection } from "@/components/home/values-section";
import { getMergedCompanies, getMergedLeadershipTeam, getResolvedHomeSectionMedia } from "@/lib/media/merge";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  return {
    title: { absolute: t("title") },
    description: t("description"),
    openGraph: { title: t("title"), description: t("description"), url: siteConfig.url, images: [{ url: siteConfig.openGraphImage, alt: t("title") }] },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description"), images: [siteConfig.openGraphImage] },
  };
}

export default async function HomePage() {
  const homeMedia = await getResolvedHomeSectionMedia();
  const companies = await getMergedCompanies();
  const team = await getMergedLeadershipTeam();
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <StatsSection />
      <CompanySnapshotSection />
      <AboutSection imageSrc={homeMedia.about?.src} imageAlt={homeMedia.about?.alt} />
      <MilestonesSection imageSrc={homeMedia.milestones?.src} imageAlt={homeMedia.milestones?.alt} />
      <TestimonialsSection />
      <CoreAreasHomeSection />
      <MissionVisionSection />
      <CeoMessageSection portraitSrc={homeMedia.ceo?.src} portraitAlt={homeMedia.ceo?.alt} />
      <TeamSection members={team} />
      <OurCompaniesSection companies={companies} />
      <ValuesSection />
      <StrengthsInternationalHomeSection />
      <StandardsSection />
      <CtaSection />
    </>
  );
}
