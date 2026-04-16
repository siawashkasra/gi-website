import type { Metadata } from "next";
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
import { Button } from "@/components/ui/button";
import { companyValues } from "@/data/company-profile";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Company | ${siteConfig.name}`,
  description: "Governance, sectors, competitive strengths, and international presence for Gulbahar Investment.",
  openGraph: { title: `Company | ${siteConfig.name}`, description: "Governance, sectors, competitive strengths, and international presence.", url: `${siteConfig.url}/company`, images: [{ url: siteConfig.openGraphImage, alt: siteConfig.name }] },
};

export default function CompanyPage() {
  return (
    <main>
      <section className="border-b border-border/60 bg-primary py-20 text-primary-foreground sm:py-24">
        <div className="ds-container max-w-4xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#2f6ea5]">Company</p>
          <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">Gulbahar Investment</h1>
          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/85 sm:text-lg">Privately held Afghan investment and development group — real estate, infrastructure, energy, and cement — with disciplined governance and long-term capital orientation.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button render={<Link href="/projects" />} nativeButton={false} size="lg" className="h-12 rounded-xl border-0 bg-white px-8 font-semibold text-primary hover:bg-[#f5f7fa]">
              View projects
            </Button>
            <Button render={<Link href="/contact" />} nativeButton={false} variant="outline" size="lg" className="h-12 rounded-xl border-white/40 bg-white/5 px-8 font-semibold text-white hover:bg-white/10">
              Contact
            </Button>
          </div>
        </div>
      </section>
      <CompanySnapshotFull />
      <CompanyAboutFull />
      <CompanyMissionVisionBlock />
      <section className="ds-section border-b border-border/60 bg-white" aria-labelledby="values-company-heading">
        <div className="ds-container max-w-4xl">
          <h2 id="values-company-heading" className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Core values
          </h2>
          <ul className="mt-8 grid gap-4 font-sans sm:grid-cols-2">
            {companyValues.map((v) => (
              <li key={v.title} className="rounded-2xl border border-border/60 bg-muted/20 p-5 text-sm leading-relaxed text-foreground sm:text-base">
                <span className="font-semibold text-primary">{v.title}:</span> {v.body}
              </li>
            ))}
          </ul>
        </div>
      </section>
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
