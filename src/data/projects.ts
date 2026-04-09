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
  featured?: boolean;
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
    featured: true,
    excerpt: "Flagship mixed-use complex in central Kabul — residential, marketplace retail, and structured parking at approximately USD 120 million scale.",
    description:
      "Gulbahar Center is a flagship mixed-use urban development in central Kabul integrating residential apartments, commercial market areas, and structured parking in a single multi-level complex. It represents an early large-scale private-sector urban initiative in the capital, providing an integrated residential and commercial environment in a prime location with organized retail and structured residential living.",
    location: "Charahi Malik Asghar, Kabul",
    status: "Delivered",
    year: "2018",
    area: "17 floors · ~USD 120M",
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
    keyStats: { units: "317", shops: "1,172", facilities: "10+" },
    features: [
      { icon: "layers", title: "Vertical mixed-use", description: "Seventeen floors combining residential apartments and four floors of commercial retail marketplace." },
      { icon: "car", title: "Multi-level parking", description: "Dedicated commercial and residential parking across structured levels." },
      { icon: "shield", title: "24/7 security & CCTV", description: "Continuous monitoring and controlled building operations." },
      { icon: "zap", title: "3.3 MW emergency power", description: "Backup power system supporting continuity of critical services." },
      { icon: "sparkles", title: "Building services", description: "Central heating and cooling, 24-hour water, supermarket, mosque, gym and family facilities, high-speed internet." },
    ],
    unitsInfo: {
      apartments: { count: "317", title: "Residential apartments", subtitle: "225 standard and 92 VIP apartments." },
      shops: { count: "1,172", title: "Commercial retail units", subtitle: "Across four dedicated marketplace floors." },
    },
    listings: [
      { id: "gc-a-12e", priceUsd: 198000, sizeSqm: 112, type: "apartment", availability: "available", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80", label: "Tower A · 12 East" },
      { id: "gc-a-09w", priceUsd: 245000, sizeSqm: 138, type: "apartment", availability: "reserved", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80", label: "Tower A · 09 West" },
      { id: "gc-s-g12", priceUsd: 92000, sizeSqm: 48, type: "shop", availability: "available", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80", label: "Ground · Arcade G12" },
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
    featured: true,
    excerpt: "Nineteen residential blocks near key government institutions — total investment exceeding USD 80 million.",
    description:
      "Gulbahar Towers is a large-scale residential and commercial complex comprising nineteen independent blocks with total investment exceeding USD eighty million. Located in District 16, Pul-e-Mahmood Khan, near key governmental and administrative institutions, it contributes to structured residential expansion in a strategic urban zone and combines residential, retail, and community services in a consolidated complex.",
    location: "District 16, Pul-e-Mahmood Khan, Kabul",
    status: "Operational",
    year: "—",
    area: "19 blocks · USD 80M+",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=85",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=85",
    ],
    timeline: [
      { label: "Master planning", value: "Multi-phase" },
      { label: "Residential blocks", value: "19" },
      { label: "Commercial retail", value: "211 units" },
      { label: "Operations", value: "Ongoing" },
    ],
    keyStats: { units: "697", shops: "211", facilities: "8+" },
    features: [
      { icon: "building2", title: "Nineteen blocks", description: "Independent residential blocks with consolidated services and parking." },
      { icon: "shield", title: "24/7 security", description: "Coordinated security systems across the complex." },
      { icon: "landmark", title: "Mosque, school, clinic", description: "Mosque, school and kindergarten, clinic and pharmacy on site." },
      { icon: "store", title: "F&B & fitness", description: "Restaurants, fitness center, and commercial access alongside residences." },
      { icon: "zap", title: "Utilities", description: "Twenty-four-hour electricity and water supply; commercial and residential parking." },
    ],
    unitsInfo: {
      apartments: { count: "697", title: "Residential apartments", subtitle: "Across nineteen blocks with multi-level parking." },
      shops: { count: "211", title: "Commercial retail units", subtitle: "Retail integrated with the residential environment." },
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
    category: "Mixed-use",
    type: "mixed-use",
    featured: true,
    excerpt: "Airport Road corridor — twenty-five-floor tower, shopping center, underground parking, and planned hospitality at ~USD 60 million.",
    description:
      "Gulbahar Plaza is a large-scale mixed-use development along one of Kabul’s primary commercial corridors at Airport Road, Macroryan 4th Square. It includes a twenty-five-floor residential tower, a four-floor commercial shopping center, four underground parking levels, and a planned hospitality component, with estimated investment of approximately USD sixty million. Proximity to Kabul International Airport and major commercial districts supports residential, retail, hospitality, and business demand in a high-growth corridor.",
    location: "Airport Road, Macroryan 4th Square, Kabul",
    status: "Operational",
    year: "—",
    area: "25 floors · ~USD 60M",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=85",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=85",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=85",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=85",
    ],
    timeline: [
      { label: "Tower & retail", value: "Delivered core" },
      { label: "Parking levels", value: "4 underground" },
      { label: "Hospitality", value: "Planned" },
      { label: "Corridor position", value: "Airport Road" },
    ],
    keyStats: { units: "342+", shops: "179+", facilities: "10+" },
    features: [
      { icon: "layers", title: "Smart access", description: "Smart building access systems and twenty-four-hour security and surveillance." },
      { icon: "car", title: "Underground parking", description: "Four levels of structured underground parking." },
      { icon: "sparkles", title: "Amenities", description: "Central heating, gym, kindergarten, supermarket, clinic and pharmacy; hotel with dedicated security systems." },
      { icon: "wifi", title: "High-growth corridor", description: "Positioned for residential, retail, hospitality, and business demand near the airport." },
    ],
    unitsInfo: {
      apartments: { count: "342+", title: "Residential units", subtitle: "Twenty-five-floor residential tower." },
      shops: { count: "179+", title: "Retail & office units", subtitle: "Four-floor commercial shopping center plus office capacity." },
    },
    listings: [
      { id: "gp-l1-101", priceUsd: 145000, sizeSqm: 86, type: "shop", availability: "available", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80", label: "Level 1 · 101 corner" },
      { id: "gp-l1-118", priceUsd: 98000, sizeSqm: 58, type: "shop", availability: "available", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80", label: "Level 1 · 118" },
      { id: "gp-gf-k02", priceUsd: 42000, sizeSqm: 22, type: "shop", availability: "reserved", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80", label: "Ground · kiosk K02" },
      { id: "gp-l2-205", priceUsd: 112000, sizeSqm: 64, type: "shop", availability: "available", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80", label: "Level 2 · 205" },
      { id: "gp-gf-a01", priceUsd: 265000, sizeSqm: 142, type: "shop", availability: "sold", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80", label: "Ground · anchor A01" },
      { id: "gp-l1-092", priceUsd: 76000, sizeSqm: 44, type: "shop", availability: "available", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80", label: "Level 1 · 092" },
    ],
  },
  {
    slug: "gulbahar-power",
    name: "Gulbahar Power",
    category: "Energy",
    type: "commercial",
    excerpt: "Gas-fired power development in northern Afghanistan — grid integration with DABS and alignment with national energy priorities.",
    description:
      "Gulbahar Energy develops power generation projects in Afghanistan using local energy resources to support the national grid. A gas-fired power project in northern Afghanistan is advanced in coordination with government authorities to increase domestic generation and reduce reliance on imported electricity. The platform emphasizes high efficiency, reliability, and safety, with engineering solutions to synchronize domestic power with the national DABS network and strategic alignment with the Ministry of Water and Energy and the Ministry of Mines and Petroleum.",
    location: "Northern Afghanistan",
    status: "Operational / development",
    year: "—",
    area: "—",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=85",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1600&q=85",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1600&q=85",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=85",
    ],
    timeline: [
      { label: "Strategic development", value: "End-to-end" },
      { label: "Technology focus", value: "Gas-to-power" },
      { label: "Grid integration", value: "DABS alignment" },
      { label: "Coordination", value: "MoWE / MoMP" },
    ],
    keyStats: { units: "—", shops: "—", facilities: "Thermal power" },
    features: [
      { icon: "zap", title: "Thermal expertise", description: "High-efficiency gas-to-power technology utilizing local Afghan resources." },
      { icon: "layers", title: "Project development", description: "End-to-end management from design through commissioning." },
      { icon: "shield", title: "Reliability & safety", description: "Operations aligned with high efficiency, reliability, and safety standards." },
      { icon: "landmark", title: "Resource optimization", description: "Reducing energy imports by maximizing domestic natural gas and related resources." },
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
    excerpt: "Afghanistan’s largest cement manufacturing platform — phased capacity to 12,000 tons per day; founded 2023.",
    description:
      "Gulbahar Cement supplies high-quality grey and white cement for residential, commercial, and infrastructure projects using advanced technologies and strong raw materials. Established in 2023, it is positioned as the largest cement manufacturer in Afghanistan, with phased production capacity of four thousand tons per day in the first phase and eight thousand in the second phase — twelve thousand tons per day total — and a workforce target exceeding five thousand direct roles. The operation prioritizes sustainable development, environmental responsibility, energy efficiency, and continuous product improvement.",
    location: "Afghanistan",
    status: "Operational",
    year: "2023",
    area: "12,000 t/day (phased)",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&q=85",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=85",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=85",
    ],
    timeline: [
      { label: "Establishment", value: "2023" },
      { label: "Phase 1 capacity", value: "4,000 t/day" },
      { label: "Phase 2 capacity", value: "8,000 t/day" },
      { label: "Total target", value: "12,000 t/day" },
    ],
    keyStats: { units: "—", shops: "—", facilities: "Full cement line" },
    features: [
      { icon: "building2", title: "Integrated plant", description: "Quarry through raw mill, kiln and clinker, grinding, silos, packing, dispatch, utilities, and quality control laboratory." },
      { icon: "trees", title: "Environmental focus", description: "Optimizing production to reduce environmental impact; dust collection and responsible resource use." },
      { icon: "zap", title: "Energy efficiency", description: "Resource and energy efficiency across kiln, grinding, and supporting systems." },
      { icon: "users", title: "Employment scale", description: "Direct employment target exceeding five thousand people across extraction, production, and logistics." },
    ],
    unitsInfo: {},
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

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
