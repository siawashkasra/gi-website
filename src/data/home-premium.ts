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
  { year: "2006", title: "Foundation", detail: "Gulbahar Investment established to deliver real estate services nationwide." },
  { year: "2014–18", title: "Gulbahar Center", detail: "Masterplan through handover of the flagship mixed-use landmark." },
  { year: "Ongoing", title: "Portfolio expansion", detail: "Towers, plaza, power, and cement — scaling resilient infrastructure." },
  { year: "Today", title: "Thousands employed", detail: "Skills development and community impact alongside major assets." },
];

export type StandardPillar = { title: string; description: string };

export const standardPillars: StandardPillar[] = [
  {
    title: "Quality & discipline",
    description: "Designed and delivered by specialist teams with clear milestones, safety awareness, and rigorous oversight from concept to operations.",
  },
  {
    title: "Community & economy",
    description: "Projects are structured to support jobs, local supply chains, and long-term urban utility — not short-term speculation.",
  },
  {
    title: "Governance",
    description: "Transparent escalation aligned with group standards and Ministry registration.",
  },
];
