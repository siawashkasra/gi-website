import type { Metadata } from "next";
import { AboutSection } from "@/components/home/about-section";
import { CeoMessageSection } from "@/components/home/ceo-message-section";
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
      <MilestonesSection />
      <TestimonialsSection />
      <MissionVisionSection />
      <CeoMessageSection />
      <TeamSection />
      <OurCompaniesSection />
      <ValuesSection />
      <StandardsSection />
      <CtaSection />
    </>
  );
}
