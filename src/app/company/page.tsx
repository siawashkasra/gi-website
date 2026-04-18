import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CompanyAboutFull } from "@/components/company/company-about-full";
import { CompanyCeoBlock } from "@/components/company/company-ceo-block";
import { CompanyClientsSection } from "@/components/company/company-clients-section";
import { CompanyCoreAreasFull } from "@/components/company/company-core-areas-full";
import { CompanyGovernanceSection } from "@/components/company/company-governance-section";
import { CompanyMarketGrowth } from "@/components/company/company-market-growth";
import { CompanyMissionVisionBlock } from "@/components/company/company-mission-vision-block";
import { OrganizationChartSection } from "@/components/company/organization-chart-section";
import { CompanyPortfolioTable } from "@/components/company/company-portfolio-table";
import { CompanySnapshotFull } from "@/components/company/company-snapshot-full";
import { CompanyStrengthsFull } from "@/components/company/company-strengths-full";
import { CompanyTechSustainability } from "@/components/company/company-tech-sustainability";
import { ValuesSection } from "@/components/home/values-section";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const companyHeroImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2400&q=90";

export const metadata: Metadata = {
  title: `Company | ${siteConfig.name}`,
  description: "Governance, sectors, competitive strengths, and international presence for Gulbahar Investment.",
  openGraph: { title: `Company | ${siteConfig.name}`, description: "Governance, sectors, competitive strengths, and international presence.", url: `${siteConfig.url}/company`, images: [{ url: siteConfig.openGraphImage, alt: siteConfig.name }] },
};

export default function CompanyPage() {
  return (
    <main>
      <div className="border-b border-border/60">
        <div className="relative min-h-[22rem] overflow-hidden border-b border-border bg-primary text-primary-foreground sm:min-h-[26rem] lg:min-h-[30rem]">
          <Image src={companyHeroImage} alt="" fill className="object-cover object-[center_32%]" sizes="100vw" priority />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1f4e79]/92 via-[#1f4e79]/78 to-[#1f4e79]/65" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_70%_-20%,rgba(47,110,165,0.28),transparent_52%)]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.06)_50%,transparent_65%)]" aria-hidden />
          <div className="relative ds-container py-20 sm:py-24 lg:py-28">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#2f6ea5]">Company</p>
            <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.02]">Gulbahar Investment</h1>
            <p className="mt-6 max-w-2xl font-sans text-base font-normal leading-relaxed text-white/80 sm:text-lg sm:leading-relaxed">Privately held Afghan investment and development group — real estate, infrastructure, energy, and cement — with disciplined governance and long-term capital orientation.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button render={<Link href="/projects" />} nativeButton={false} size="lg" className="h-12 rounded-xl border-0 bg-white px-8 font-semibold text-primary hover:bg-[#f5f7fa]">
                View projects
              </Button>
              <Button render={<Link href="/contact" />} nativeButton={false} variant="outline" size="lg" className="h-12 rounded-xl border-white/40 bg-white/5 px-8 font-semibold text-white hover:bg-white/10">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CompanySnapshotFull />
      <CompanyAboutFull />
      <CompanyMissionVisionBlock />
      <ValuesSection sectionId="values-company" headingId="values-company-heading" />
      <CompanyGovernanceSection />
      <OrganizationChartSection />
      <CompanyCoreAreasFull />
      <CompanyPortfolioTable />
      <CompanyStrengthsFull />
      <CompanyTechSustainability />
      <CompanyMarketGrowth />
      <CompanyClientsSection />
      <CompanyCeoBlock />
    </main>
  );
}
