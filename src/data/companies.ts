export type CompanyLinkTarget = "project" | "company";

export type Company = {
  name: string;
  industry: string;
  description: string;
  logo: string;
  slug: string;
  linkTo: CompanyLinkTarget;
};

export const companies: Company[] = [
  { name: "Gulbahar Center", industry: "Real Estate", description: "Flagship mixed-use business and retail destination in Kabul.", logo: "/logos/gulbahar-center.png", slug: "gulbahar-center", linkTo: "project" },
  { name: "Gulbahar Towers", industry: "Real Estate", description: "Premium residential towers with modern amenities and views.", logo: "/logos/gulbahar-towers.png", slug: "gulbahar-towers", linkTo: "project" },
  { name: "Gulbahar Plaza", industry: "Real Estate", description: "Retail and commercial plaza shaped for daily commerce and community.", logo: "/logos/gulbahar-plaza.png", slug: "gulbahar-plaza", linkTo: "project" },
  { name: "Gulbahar Pharma", industry: "Healthcare", description: "Pharmaceutical distribution supporting access to quality medicine.", logo: "/logos/gulbahar-pharma.png", slug: "gulbahar-pharma", linkTo: "company" },
  { name: "Gulbahar Foundation", industry: "Social impact", description: "Community initiatives and development programs across Afghanistan.", logo: "/logos/gulbahar-foundation.png", slug: "gulbahar-foundation", linkTo: "company" },
  { name: "Gulbahar Cement", industry: "Industrial", description: "Leading cement production strengthening national infrastructure.", logo: "/logos/gulbahar-cement.png", slug: "gulbahar-cement", linkTo: "project" },
  { name: "Gulbahar Power", industry: "Energy", description: "Power generation assets supporting industrial and urban growth.", logo: "/logos/gulbahar-power.png", slug: "gulbahar-power", linkTo: "project" },
  { name: "Gulbahar Petroleum", industry: "Energy", description: "Downstream petroleum operations with a focus on reliability.", logo: "/logos/gulbahar-petroleum.png", slug: "gulbahar-petroleum", linkTo: "company" },
  { name: "Gulbahar Group Afghanistan", industry: "Holding", description: "Parent group coordinating investment and operations nationwide.", logo: "/logos/gulbahar-group-afghanistan.png", slug: "gulbahar-group-afghanistan", linkTo: "company" },
  { name: "Gulbahar Investment", industry: "Investment", description: "Core investment platform for real estate and large-scale development.", logo: "/logos/gulbahar-investment.png", slug: "gulbahar-investment", linkTo: "company" },
];

export function companyHref(c: Company) {
  return c.linkTo === "project" ? `/projects/${c.slug}` : `/companies/${c.slug}`;
}

export function getCompanyBySlug(slug: string) {
  return companies.find((c) => c.slug === slug);
}

export function getCompanyPageSlugs() {
  return companies.filter((c) => c.linkTo === "company").map((c) => c.slug);
}

export function getCompanyForCompanyPage(slug: string) {
  const c = getCompanyBySlug(slug);
  if (!c || c.linkTo !== "company") return undefined;
  return c;
}
