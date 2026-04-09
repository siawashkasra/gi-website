export type TestimonialItem = { quote: string; attribution: string; context: string };

export const testimonials: TestimonialItem[] = [
  {
    quote: "Professional handover standards and responsive facilities management set a benchmark we rarely see in the market.",
    attribution: "Corporate occupier",
    context: "Office portfolio, Kabul",
  },
  {
    quote: "The retail mix and footfall planning reflected a serious understanding of how mixed-use assets perform over the long term.",
    attribution: "Retail partner",
    context: "Flagship development",
  },
  {
    quote: "Clear documentation and steady execution from masterplan through delivery — rare consistency at this scale.",
    attribution: "Development advisor",
    context: "Regional project",
  },
];

export type MilestoneItem = { year: string; title: string; detail: string };

export const milestones: MilestoneItem[] = [
  { year: "2006", title: "Foundation", detail: "Privately held Afghan investment and development company established; headquarters Kabul, international affiliation United Arab Emirates." },
  { year: "Urban flagship", title: "Gulbahar Center", detail: "Large-scale mixed-use development in central Kabul — integrated residential, commercial retail, and structured parking valued at approximately USD 120 million." },
  { year: "Diversification", title: "Infrastructure & industry", detail: "Extension into energy (gas-fired power, grid alignment with DABS) and cement production — largest cement manufacturing capacity in Afghanistan with phased tonnage expansion." },
  { year: "Today", title: "Integrated platform", detail: "Residential, commercial, energy, and cement under a centralized governance framework with measured expansion across urban and industrial sectors." },
];

export type StandardPillar = { title: string; description: string };

export const standardPillars: StandardPillar[] = [
  {
    title: "Technology & infrastructure",
    description: "Structured electricity and backup power, managed water supply, CCTV and controlled access, centralized climate systems including VRF where applicable, and coordinated core building services.",
  },
  {
    title: "Sustainability & community",
    description: "Energy-efficient systems, solar and wastewater treatment where applicable, consolidated housing and retail in central districts, employment across construction and operations, and Gulbahar Foundation initiatives in education and healthcare.",
  },
  {
    title: "Governance",
    description: "Centralized governance with Board strategic oversight and executive delivery; transparent escalation aligned with group standards.",
  },
];
