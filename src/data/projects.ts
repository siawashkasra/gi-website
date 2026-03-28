import type { PropertyListing } from "@/lib/property-listings";

export type ProjectType = "residential" | "commercial" | "mixed-use";

export type ProjectTimelinePhase = { label: string; value: string };

export type ProjectKeyStats = { units: string; shops: string; facilities: string };

export type ProjectFeatureIcon =
  | "building2"
  | "car"
  | "shield"
  | "sparkles"
  | "trees"
  | "dumbbell"
  | "zap"
  | "users"
  | "store"
  | "layers"
  | "wifi"
  | "landmark";

export type ProjectFeatureItem = { icon: ProjectFeatureIcon; title: string; description: string };

export type ProjectUnitBlock = { count: string; title: string; subtitle: string };

export type ProjectUnitsInfo = { apartments?: ProjectUnitBlock; shops?: ProjectUnitBlock; offices?: ProjectUnitBlock };

export type Project = {
  slug: string;
  name: string;
  category: string;
  type: ProjectType;
  excerpt: string;
  description: string;
  location: string;
  status: string;
  year: string;
  area: string;
  image: string;
  gallery: string[];
  timeline: ProjectTimelinePhase[];
  keyStats: ProjectKeyStats;
  features: ProjectFeatureItem[];
  unitsInfo: ProjectUnitsInfo;
  listings?: PropertyListing[];
};

export const projects: Project[] = [
  {
    slug: "gulbahar-center",
    name: "Gulbahar Center",
    category: "Mixed-use",
    type: "mixed-use",
    excerpt: "Flagship business and retail destination in the heart of the capital.",
    description:
      "Gulbahar Center anchors our portfolio as a contemporary mixed-use landmark. Premium office floors, curated retail, and hospitality-grade circulation create an address where businesses and visitors meet at the highest standard.",
    location: "Malik Azghar Square, Kabul",
    status: "Delivered",
    year: "2018",
    area: "45,000 m²",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=85",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85",
    ],
    timeline: [
      { label: "Masterplan", value: "2014" },
      { label: "Construction", value: "2015 — 2017" },
      { label: "Handover", value: "2018" },
      { label: "Operations", value: "Ongoing" },
    ],
    keyStats: { units: "280+", shops: "85+", facilities: "12+" },
    features: [
      { icon: "layers", title: "Integrated podium", description: "Retail, dining, and services across a connected ground and mezzanine experience." },
      { icon: "car", title: "Structured parking", description: "Multi-level parking with clear circulation and dedicated visitor access." },
      { icon: "shield", title: "Secure access", description: "Controlled entry points, CCTV coverage, and 24-hour building operations." },
      { icon: "wifi", title: "Smart-ready cores", description: "Infrastructure prepared for high-capacity telecom and tenant IT requirements." },
      { icon: "landmark", title: "Prime address", description: "Visible corner position with strong frontage and pedestrian connectivity." },
    ],
    unitsInfo: {
      apartments: { count: "180+", title: "Residences", subtitle: "Studios to three-bedroom layouts with city and courtyard aspects." },
      shops: { count: "85+", title: "Retail & F&B", subtitle: "From anchor units to boutique frontage along active arcades." },
      offices: { count: "42", title: "Office floors", subtitle: "Grade-A workspace with flexible floorplates and natural light." },
    },
    listings: [
      { id: "gc-a-12e", priceUsd: 198000, sizeSqm: 112, type: "apartment", availability: "available", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80", label: "Tower A · 12 East" },
      { id: "gc-a-09w", priceUsd: 245000, sizeSqm: 138, type: "apartment", availability: "reserved", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80", label: "Tower A · 09 West" },
      { id: "gc-s-g12", priceUsd: 92000, sizeSqm: 48, type: "shop", availability: "available", image: "https://images.unsplash.com/photo-1555529908-51e7457bc3aa?w=900&q=80", label: "Ground · Arcade G12" },
      { id: "gc-s-m03", priceUsd: 134000, sizeSqm: 72, type: "shop", availability: "available", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80", label: "Mezzanine · M03" },
      { id: "gc-a-22p", priceUsd: 312000, sizeSqm: 168, type: "apartment", availability: "sold", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80", label: "Penthouse · 22" },
      { id: "gc-s-g08", priceUsd: 78000, sizeSqm: 38, type: "shop", availability: "reserved", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80", label: "Ground · G08" },
    ],
  },
  {
    slug: "gulbahar-towers",
    name: "Gulbahar Towers",
    category: "Residential",
    type: "residential",
    excerpt: "Elevated living with panoramic views and private amenities.",
    description:
      "Twin towers designed for discerning residents: generous layouts, secure access, and landscaped podium levels. Gulbahar Towers sets a new benchmark for residential comfort and long-term value in the region.",
    location: "Central Kabul",
    status: "In development",
    year: "2026",
    area: "32,000 m²",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=85",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=85",
    ],
    timeline: [
      { label: "Launch", value: "2021" },
      { label: "Foundation", value: "2023" },
      { label: "Structure", value: "2024 — 2025" },
      { label: "Target completion", value: "2026" },
    ],
    keyStats: { units: "420+", shops: "24+", facilities: "15+" },
    features: [
      { icon: "sparkles", title: "Sky amenities", description: "Residents’ lounge, landscaped terraces, and dedicated wellness zones." },
      { icon: "trees", title: "Podium gardens", description: "Green relief at podium level with seating and family-friendly outdoor rooms." },
      { icon: "dumbbell", title: "Fitness & pool", description: "Indoor training studios and a temperature-controlled leisure pool." },
      { icon: "shield", title: "Private lobby", description: "Dual-tower access control with concierge-style arrival sequences." },
      { icon: "car", title: "Resident parking", description: "Allocated bays with EV-ready provisions on selected levels." },
    ],
    unitsInfo: {
      apartments: { count: "420+", title: "Apartments", subtitle: "One to four-bedroom homes with premium finishes and storage." },
      shops: { count: "24+", title: "Neighbourhood retail", subtitle: "Daily conveniences and curated café frontage at tower base." },
      offices: { count: "8", title: "Sky offices", subtitle: "Limited crown-level workspaces with dedicated lift access." },
    },
    listings: [
      { id: "gt-t1-18b", priceUsd: 285000, sizeSqm: 124, type: "apartment", availability: "available", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80", label: "Tower 1 · 18B" },
      { id: "gt-t1-24a", priceUsd: 352000, sizeSqm: 156, type: "apartment", availability: "available", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80", label: "Tower 1 · 24A" },
      { id: "gt-t2-08c", priceUsd: 198000, sizeSqm: 96, type: "apartment", availability: "reserved", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80", label: "Tower 2 · 08C" },
      { id: "gt-t2-32p", priceUsd: 520000, sizeSqm: 210, type: "apartment", availability: "available", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80", label: "Tower 2 · Sky suite" },
      { id: "gt-r-04", priceUsd: 118000, sizeSqm: 52, type: "shop", availability: "available", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80", label: "Retail podium · R04" },
      { id: "gt-t1-05d", priceUsd: 175000, sizeSqm: 88, type: "apartment", availability: "sold", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80", label: "Tower 1 · 05D" },
    ],
  },
  {
    slug: "gulbahar-plaza",
    name: "Gulbahar Plaza",
    category: "Retail",
    type: "commercial",
    excerpt: "High-footfall retail plaza with modern infrastructure.",
    description:
      "A vibrant retail environment with clear wayfinding, ample parking, and flexible unit formats. Gulbahar Plaza supports national and international brands in a setting built for growth.",
    location: "Kabul",
    status: "Delivered",
    year: "2020",
    area: "18,000 m²",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=85",
      "https://images.unsplash.com/photo-1555529908-51e7457bc3aa?w=1600&q=85",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=85",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85",
      "https://images.unsplash.com/photo-1441984918414-12bbae855374?w=1600&q=85",
    ],
    timeline: [
      { label: "Design", value: "2017" },
      { label: "Build", value: "2018 — 2019" },
      { label: "Opening", value: "2020" },
      { label: "Leasing", value: "Active" },
    ],
    keyStats: { units: "—", shops: "120+", facilities: "8+" },
    features: [
      { icon: "store", title: "Flexible bays", description: "Modular shop depths to suit fashion, F&B, services, and anchors." },
      { icon: "car", title: "Visitor parking", description: "Structured parking with intuitive entry and peak-hour queuing relief." },
      { icon: "wifi", title: "Services backbone", description: "Tenant-ready power and data allowances for modern retail operations." },
      { icon: "users", title: "High footfall", description: "Designed for visibility, dwell time, and event-ready public spaces." },
    ],
    unitsInfo: {
      shops: { count: "120+", title: "Shops & kiosks", subtitle: "From double-height flagship to compact specialty units." },
      offices: { count: "18", title: "Upper offices", subtitle: "Light-filled workspace suites above the retail podium — ideal for HQ and professional services." },
    },
    listings: [
      { id: "gp-l1-101", priceUsd: 145000, sizeSqm: 86, type: "shop", availability: "available", image: "https://images.unsplash.com/photo-1441984918414-12bbae855374?w=900&q=80", label: "Level 1 · 101 corner" },
      { id: "gp-l1-118", priceUsd: 98000, sizeSqm: 58, type: "shop", availability: "available", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80", label: "Level 1 · 118" },
      { id: "gp-gf-k02", priceUsd: 42000, sizeSqm: 22, type: "shop", availability: "reserved", image: "https://images.unsplash.com/photo-1555529908-51e7457bc3aa?w=900&q=80", label: "Ground · kiosk K02" },
      { id: "gp-l2-205", priceUsd: 112000, sizeSqm: 64, type: "shop", availability: "available", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80", label: "Level 2 · 205" },
      { id: "gp-gf-a01", priceUsd: 265000, sizeSqm: 142, type: "shop", availability: "sold", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80", label: "Ground · anchor A01" },
      { id: "gp-l1-092", priceUsd: 76000, sizeSqm: 44, type: "shop", availability: "available", image: "https://images.unsplash.com/photo-1441984918414-12bbae855374?w=900&q=80", label: "Level 1 · 092" },
    ],
  },
  {
    slug: "gulbahar-power",
    name: "Gulbahar Power",
    category: "Infrastructure",
    type: "commercial",
    excerpt: "Reliable energy infrastructure supporting industrial growth.",
    description:
      "Strategic investment in power generation and distribution assets that underpin industrial and urban expansion. Gulbahar Power aligns technical excellence with national development priorities.",
    location: "Regional hub",
    status: "Operational",
    year: "2022",
    area: "—",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=85",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1600&q=85",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1600&q=85",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=85",
    ],
    timeline: [
      { label: "Feasibility", value: "2018" },
      { label: "Construction", value: "2019 — 2021" },
      { label: "Commissioning", value: "2022" },
      { label: "Operations", value: "24/7" },
    ],
    keyStats: { units: "—", shops: "—", facilities: "4 sites" },
    features: [
      { icon: "zap", title: "Grid support", description: "Assets sized for baseload contribution and peak shaving where configured." },
      { icon: "shield", title: "Safety systems", description: "Engineered protection, monitoring, and maintenance protocols." },
      { icon: "layers", title: "Scalable design", description: "Room for phased upgrades as demand and technology evolve." },
      { icon: "users", title: "Skilled teams", description: "Round-the-clock technical staffing and contractor coordination." },
    ],
    unitsInfo: {
      offices: { count: "6", title: "Control & admin", subtitle: "Operations centre suites and engineering support spaces on site." },
    },
  },
  {
    slug: "gulbahar-cement",
    name: "Gulbahar Cement",
    category: "Industrial",
    type: "commercial",
    excerpt: "Large-scale cement production for construction nationwide.",
    description:
      "Gulbahar Cement supplies critical building materials with scale, quality control, and environmental stewardship. The facility supports major public and private construction programs.",
    location: "Regional plant",
    status: "Operational",
    year: "2019",
    area: "—",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85",
      "https://images.unsplash.com/photo-1581092160562-40aa08e66837?w=1600&q=85",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=85",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=85",
    ],
    timeline: [
      { label: "Land acquisition", value: "2015" },
      { label: "Plant build", value: "2016 — 2018" },
      { label: "Production", value: "2019" },
      { label: "Expansion studies", value: "Active" },
    ],
    keyStats: { units: "—", shops: "—", facilities: "9 lines" },
    features: [
      { icon: "building2", title: "Production scale", description: "Kiln and grinding assets tuned for consistent output and quality." },
      { icon: "shield", title: "QC laboratories", description: "Batch testing and certification aligned with engineering specifications." },
      { icon: "zap", title: "Energy efficiency", description: "Process heat recovery and load management across major equipment." },
      { icon: "trees", title: "Environmental care", description: "Dust control, monitoring, and land rehabilitation programs." },
    ],
    unitsInfo: {
      offices: { count: "14", title: "Plant offices", subtitle: "Engineering, logistics, HSE, and executive facilities on campus." },
      shops: { count: "4", title: "On-site services", subtitle: "Canteen, clinic, and vendor pavilions for workforce support." },
    },
  },
];

export const projectTypeLabels: Record<ProjectType, string> = {
  residential: "Residential",
  commercial: "Commercial",
  "mixed-use": "Mixed-use",
};

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.slug);
}
