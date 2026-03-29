import type { Metadata } from "next";
import { CtaSection } from "@/components/home/cta-section";
import { AboutSection } from "@/components/home/about-section";
import { CeoMessageSection } from "@/components/home/ceo-message-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { HeroSection } from "@/components/home/hero-section";
import { MissionVisionSection } from "@/components/home/mission-vision-section";
import { OurCompaniesSection } from "@/components/home/our-companies-section";
import { TeamSection } from "@/components/home/team-section";
import { StatsSection } from "@/components/home/stats-section";
import { ValuesSection } from "@/components/home/values-section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.name },
  description: siteConfig.description,
  openGraph: { title: siteConfig.name, description: siteConfig.description, url: siteConfig.url, images: [{ url: siteConfig.openGraphImage, alt: siteConfig.name }] },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: [siteConfig.openGraphImage] },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <StatsSection />
      <AboutSection />
      <MissionVisionSection />
      <CeoMessageSection />
      <TeamSection />
      <OurCompaniesSection />
      <ValuesSection />
      <CtaSection />
    </>
  );
}
