import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: { absolute: siteConfig.name },
  description: siteConfig.description,
  openGraph: { title: siteConfig.name, description: siteConfig.description, url: siteConfig.url, images: [{ url: siteConfig.openGraphImage, alt: siteConfig.name }] },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: [siteConfig.openGraphImage] },
};

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
