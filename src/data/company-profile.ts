export type CompanySnapshotRow = { label: string; value: string };

export type CompanyValueItem = { title: string; body: string; icon: "eye" | "gem" | "leaf" | "heartHandshake" | "lightbulb" | "shield" | "target" };

export type CoreBusinessArea = { title: string; body: string; projectSlugs: string[] };

export type CompetitiveStrength = { order: number; title: string; body: string };

export type MarketTheme = { title: string; body: string };

export type OrgStructureUnit =
  | { title: string; subtitle?: string; roles: string[] }
  | { title: string; pairs: [string, string][]; extraSingles?: string[] };

export const organizationalStructure = {
  sectionTitle: "Organizational structure",
  chairman: { name: "Gulbahar Habibi", title: "Chairman" },
  chiefExecutive: { name: "Ghulam Rabani Rabani", title: "CEO" },
  units: [
    { title: "GULBAHAR PLAZA", roles: ["Project Manager", "General Engineer", "MEP Designer", "Site Engineer", "Electrical Engineer", "Admin / Storekeeper"] },
    { title: "GULBAHAR TOWERS", roles: ["General Director", "Admin / HR Manager", "Maintenance Manager", "IT/CCTV Manager", "Finance Manager"] },
    {
      title: "GULBAHAR CENTER",
      pairs: [
        ["Senior Legal Advisor", "Chief Financial Officer"],
        ["HR Manager", "Civil Site Engineer"],
        ["Admin Manager", "Logistics & Proc. manager"],
        ["Sales & Marketing", "IT & CCTV Manager"],
      ],
      extraSingles: ["Electrical Manager"],
    },
    {
      title: "GULBAHAR CEMENT &",
      subtitle: "GULBAHAR ENERGY",
      roles: ["Liaison Manager", "Civil Site Engineer", "Power Engineer"],
    },
    { title: "GULBAHAR FOUNDATION", roles: ["General Manager", "Sr. Finance Officer"] },
  ] as OrgStructureUnit[],
};

export const companyHero = { eyebrow: "Welcome to", subtitle: "Privately held investment and development group since 2006 — real estate, commercial infrastructure, energy, and cement production aligned with Afghanistan’s urban and industrial growth." };

export const companySnapshot: CompanySnapshotRow[] = [
  { label: "Established", value: "2006" },
  { label: "Headquarters", value: "Kabul, Afghanistan" },
  { label: "International affiliation", value: "United Arab Emirates" },
  { label: "Business structure", value: "Privately held investment & development group" },
  { label: "Core business areas", value: "Real estate development, commercial infrastructure, energy, cement production" },
  { label: "Flagship developments", value: "Gulbahar Center, Gulbahar Towers, Gulbahar Plaza" },
  { label: "Industrial & infrastructure", value: "Gulbahar Cement, Gulbahar Power" },
  { label: "Development focus", value: "Mixed-use urban projects & integrated infrastructure" },
  { label: "Market orientation", value: "Residential, commercial & long-term asset development" },
];

export const companyAbout = {
  headline: "Privately held. Multi-sector platform since 2006.",
  paragraphs: [
    "Gulbahar Investment is a privately held Afghan investment and development company established in 2006. Since its establishment, the company has evolved into a multi-sector enterprise operating across real estate, infrastructure, and industrial activities within Afghanistan.",
    "The company has developed a recognized presence in Kabul through large-scale residential and commercial projects that contribute to the city’s expanding built environment. Its activities reflect a commitment to organized project execution and sustained capital investment within key metropolitan areas.",
    "Beyond real estate, Gulbahar has extended its platform into industrial and energy-related sectors, reinforcing its role within the broader construction and infrastructure landscape. This diversified presence enables the company to participate across multiple stages of development activity within the domestic market.",
    "Through measured expansion and disciplined project delivery, Gulbahar Investment continues to strengthen its institutional footprint within Afghanistan’s growing urban and infrastructure sectors.",
  ],
};

export const companyMission = "To invest in and develop structured residential, commercial, and infrastructure projects that create long-term value, support modern urban development, and contribute to national economic progress through responsible and disciplined execution.";

export const companyVision = "To be recognized as a leading investment and development group in Afghanistan, delivering quality projects that contribute to sustainable economic and urban growth.";

export const companyValues: CompanyValueItem[] = [
  { title: "Transparency", body: "Conducting business with clarity, accountability, and responsible financial and operational practices.", icon: "eye" },
  { title: "Quality", body: "Maintaining defined standards in planning, construction, and project delivery to ensure durability and long-term performance.", icon: "gem" },
  { title: "Sustainability", body: "Integrating energy efficiency, environmental responsibility, and resource-conscious development into core operations.", icon: "leaf" },
  { title: "Social responsibility", body: "Contributing to employment generation, community development, and social support initiatives.", icon: "heartHandshake" },
  { title: "Innovation", body: "Adopting modern technologies and smart infrastructure systems to enhance efficiency, security, and development standards.", icon: "lightbulb" },
  { title: "Integrity", body: "Upholding ethical conduct, contractual reliability, and professional responsibility in all partnerships and stakeholder relationships.", icon: "shield" },
  { title: "Long-term commitment", body: "Focusing on durable projects and sustained economic contribution rather than short-term gains.", icon: "target" },
];

export const governanceIntro = [
  "Gulbahar Investment operates under a centralized governance framework designed to ensure strategic oversight, operational coordination, and disciplined execution across its business sectors.",
  "Strategic direction and major investment decisions are guided by the Board of Directors, while executive management is responsible for operational leadership and project implementation.",
];

export const coreBusinessAreas: CoreBusinessArea[] = [
  {
    title: "Real estate development",
    body: "Gulbahar develops large-scale residential and mixed-use projects that combine housing, retail, and commercial components within planned environments. Developments are structured to deliver organized living spaces supported by commercial facilities and essential infrastructure, with a focus on prime urban locations, integrated project planning, and controlled execution from development through completion.",
    projectSlugs: ["gulbahar-center", "gulbahar-towers", "gulbahar-plaza"],
  },
  {
    title: "Commercial & mixed-use projects",
    body: "The company develops and operates commercial centers and multi-functional urban complexes designed to accommodate retail businesses, offices, and service providers, structured to support sustained commercial activity within organized and accessible environments. Commercial assets are developed as part of broader mixed-use frameworks to enhance operational stability and tenant diversity.",
    projectSlugs: ["gulbahar-center", "gulbahar-plaza"],
  },
  {
    title: "Cement & industrial production",
    body: "Gulbahar operates in cement production to support national construction demand and infrastructure expansion. The industrial division contributes to supply capacity within the local market and supports durable construction activity, strengthening the company’s position within the broader construction value chain.",
    projectSlugs: ["gulbahar-cement"],
  },
  {
    title: "Energy infrastructure",
    body: "Through its energy division, Gulbahar supports power generation and energy-related initiatives aligned with infrastructure development requirements, contributing to reliable operational support within major developments and broader infrastructure applications and participation in essential infrastructure sectors beyond real estate.",
    projectSlugs: ["gulbahar-power"],
  },
];

export const competitiveStrengths: CompetitiveStrength[] = [
  { order: 1, title: "Integrated development structure", body: "The company operates as both investor and developer, overseeing projects from planning through delivery. This model enables coordinated decision-making." },
  { order: 2, title: "Long-term capital orientation", body: "The company focuses on durable developments structured for sustained residential and commercial use rather than short-term construction turnover." },
  { order: 3, title: "Strategic location selection", body: "Major developments are positioned in high-access districts within Kabul, supporting residential demand and sustained commercial activity." },
  { order: 4, title: "Financial independence", body: "Operating as a self-financed entity, Gulbahar maintains internal capital flexibility aligned with its development objectives." },
  { order: 5, title: "Operational reliability", body: "Projects are developed with defined utility systems and controlled operational frameworks that support long-term building performance and service continuity." },
  { order: 6, title: "Responsible development approach", body: "Environmental considerations and operational discipline are incorporated into project planning and execution processes." },
];

export const technologyStandards = "Gulbahar Investment incorporates defined building systems and infrastructure technologies within its developments to support operational functionality and service continuity. Developments include structured electricity distribution, backup power systems, and managed water supply infrastructure designed to support continuous building operations. Centralized heating and cooling systems, including VRF technology where applicable, are integrated to maintain indoor environmental control across residential and commercial spaces. Projects incorporate CCTV surveillance, controlled entry mechanisms, and coordinated security monitoring to support resident and tenant safety. Core building services are aligned through structured infrastructure systems that support utility management and internal service coordination.";

export const sustainabilityStandards = "Gulbahar Investment incorporates environmental and social considerations within its ongoing development and operational activities. Energy-efficient systems, including solar integration and wastewater treatment mechanisms, are incorporated within applicable projects. Utility management practices are applied to support responsible resource use within residential and commercial properties. Major developments provide consolidated residential housing, retail services, and community facilities within central districts of Kabul, contributing to organized access to housing and commercial services. Through construction, industrial operations, and facility management activities, the company supports direct and indirect employment across multiple sectors. The Gulbahar Foundation provides educational assistance, healthcare support, and humanitarian contributions within the local community.";

export const technologyStandardsCard = "Structured electricity, backup power, managed water supply, CCTV and controlled access, centralized climate systems including VRF where applicable, and coordinated core building services.";

export const sustainabilityStandardsCard = "Energy-efficient systems, solar and wastewater treatment where applicable, consolidated housing and retail in central districts, employment across construction and operations, and Gulbahar Foundation initiatives in education and healthcare.";

export const governanceStandardsPillar = "Centralized governance with Board strategic oversight and executive delivery; transparent escalation aligned with group standards.";

export const marketPositioning: MarketTheme[] = [
  {
    title: "Cement sector positioning",
    body: "Gulbahar Cement holds a leading position in the Afghan market as a primary supplier of high-quality cement products. Extensive production capacity and a robust distribution network support national construction demand and large-scale infrastructure projects, reinforcing a foundational industry partner role.",
  },
  {
    title: "Energy sector positioning",
    body: "In the energy sector, Gulbahar Power is positioned as a key provider of structured power solutions. Operations support major development projects and energy reliability across Afghanistan, contributing to essential infrastructure and long-term economic stability.",
  },
  {
    title: "Integrated infrastructure contribution",
    body: "A diversified portfolio across cement, power, and real estate allows synergistic market positioning, supporting integrated urban and industrial development through self-sufficient supply chains and operational expertise.",
  },
  {
    title: "Strategic market alignment",
    body: "Activities are strategically aligned with Afghanistan’s ongoing urban and industrial growth. By focusing on fundamental infrastructure, the group addresses core national development needs and contributes to resilient economic expansion.",
  },
];

export const growthOutlook = "Gulbahar Investment continues to advance its development platform through ongoing projects and sector expansion initiatives aligned with infrastructure and urban growth demand. The company’s forward orientation reflects measured development progression across its core sectors.";

export const internationalPresence = {
  uae: "The broader Gulbahar platform maintains a presence in the United Arab Emirates. This affiliation supports international connectivity and external engagement aligned with the group’s business activities.",
  regional: "The company has referenced engagement or activity links in countries including Germany, Russia, Iran, Pakistan, and selected European markets. These connections reflect extended business relationships and cross-border interaction beyond the domestic market.",
  crossBorder: "While primary operations remain focused within Afghanistan, external affiliations provide access to broader regional networks and international exposure, reflecting structured domestic development supported by regional connectivity.",
};

export const clientsPartners = { title: "Clients and partners", note: "Partnership and client references are maintained in line with active commercial relationships." };

export const ceoProfile = {
  quote: "We at Gulbahar Investment have always focused on excellent services to give a good experience to our customers. Our history reflects pioneering work in establishing such services. Our projects are designed by teams of experts and run by professionals to deliver our targeted quality products and services. We always strive to offer competitive products and services to our customers.",
  name: "Ghulam Rabani Rabani",
  title: "Chief Executive Officer",
};

export const portfolioTableRows = [
  { project: "Gulbahar Center", location: "Kabul", sector: "Mixed-use development" },
  { project: "Gulbahar Towers", location: "Kabul", sector: "Residential & commercial" },
  { project: "Gulbahar Plaza", location: "Kabul", sector: "Mixed-use development" },
  { project: "Gulbahar Cement", location: "Afghanistan", sector: "Industrial production" },
  { project: "Gulbahar Power", location: "Afghanistan", sector: "Energy infrastructure" },
];

export const homeHighlights = { aboutParagraphCount: 2, competitiveStrengthIndices: [0, 1, 2] as const, governanceTeaser: governanceIntro[0]!, companyCtaPath: "/company" as const, snapshotHomeCount: 6 };

export function leadFromBody(body: string, maxLen = 220) {
  const t = body.trim();
  if (t.length <= maxLen) return t;
  const cut = t.slice(0, maxLen);
  const last = cut.lastIndexOf(" ");
  return `${(last > 40 ? cut.slice(0, last) : cut).trim()}…`;
}
