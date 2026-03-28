import type { Metadata } from "next";
import { CtaSection } from "@/components/home/cta-section";
import { AboutSection } from "@/components/home/about-section";
import { CeoMessageSection } from "@/components/home/ceo-message-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { HeroSection } from "@/components/home/hero-section";
import { MissionSection } from "@/components/home/mission-section";
import { VisionSection } from "@/components/home/vision-section";
import { OurCompaniesSection } from "@/components/home/our-companies-section";
import { StatsSection } from "@/components/home/stats-section";
import { ValuesSection } from "@/components/home/values-section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.name },
  description: siteConfig.description,
  openGraph: { title: siteConfig.name, description: siteConfig.description },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <AboutSection />
      <MissionSection />
      <VisionSection />
      <CeoMessageSection />
      <OurCompaniesSection />
      <StatsSection />
      <ValuesSection />
      <CtaSection />
    </>
  );
}
