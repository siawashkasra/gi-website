import type { Metadata } from "next";
import { CtaSection } from "@/components/home/cta-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { HeroSection } from "@/components/home/hero-section";
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
      <ValuesSection />
      <CtaSection />
    </>
  );
}
