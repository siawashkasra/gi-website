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

export type ProjectKeyStatLabels = { units: string; shops: string; facilities: string };

export type ProjectMissionVision = { vision: string; mission: string; values: string[] };

export type MegaMenuKeyFact = { label: string; value: string };

export type Project = {
  slug: string;
  name: string;
  category: string;
  type: ProjectType;
  featured?: boolean;
  excerpt: string;
  description: string;
  detailOverviewTitle?: string;
  detailOverviewParagraphs?: string[];
  missionVision?: ProjectMissionVision;
  keyStatLabels?: ProjectKeyStatLabels;
  scaleSectionEyebrow?: string;
  scaleSectionTitle?: string;
  featuresSectionEyebrow?: string;
  featuresSectionTitle?: string;
  areaBadgePlain?: boolean;
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
  strategicPositioning?: string;
  keyComponentBullets?: string[];
  facilityBullets?: string[];
  /** Corporate mega menu: list line status + three-column preview facts */
  megaMenu?: {
    listStatus: string;
    facts: [MegaMenuKeyFact, MegaMenuKeyFact, MegaMenuKeyFact];
  };
};

export const projects: Project[] = [
  {
    slug: "gulbahar-center",
    name: "Gulbahar Center",
    category: "Mixed-use",
    type: "mixed-use",
    featured: true,
    megaMenu: {
      listStatus: "Completed",
      facts: [
        { label: "Investment", value: "USD 120M" },
        { label: "Scale", value: "17 floors" },
        { label: "Year", value: "2018" },
      ],
    },
    excerpt: "Flagship mixed-use complex in central Kabul — residential, marketplace retail, and structured parking at approximately USD 120 million scale.",
    description:
      "Gulbahar Center is a flagship mixed-use urban development in central Kabul integrating residential apartments, commercial market areas, and structured parking in a single multi-level complex. It represents an early large-scale private-sector urban initiative in the capital, providing an integrated residential and commercial environment in a prime location with organized retail and structured residential living.",
    location: "Charahi Malik Asghar, Kabul",
    status: "Delivered",
    year: "2018",
    area: "17 floors · ~USD 120M",
    image: "/images/projects/gulbahar-plaza/gulbahar-plaza-02.png",
    gallery: [
      "/images/projects/gulbahar-plaza/gulbahar-plaza-02.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-06.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-07.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-08.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-10.png",
    ],
    timeline: [
      { label: "Masterplan", value: "2014" },
      { label: "Construction", value: "2015 — 2017" },
      { label: "Handover", value: "2018" },
      { label: "Operations", value: "Ongoing" },
    ],
    keyStats: { units: "317", shops: "1,172", facilities: "10+" },
    strategicPositioning:
      "The project provides an integrated residential and commercial environment in a prime urban location, supporting organized retail activity and structured residential living within Kabul’s city center.",
    keyComponentBullets: [
      "17 floors",
      "1,172 commercial retail units across four floors",
      "225 standard residential apartments",
      "92 VIP residential apartments",
      "Multi-level commercial and residential parking",
    ],
    facilityBullets: [
      "24/7 security and CCTV monitoring",
      "3.3 MW emergency power system",
      "Central heating and cooling systems",
      "24-hour water supply",
      "Supermarket and retail services",
      "Mosque",
      "Gym and family facilities",
      "High-speed internet",
    ],
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
      { id: "gc-a-12e", priceUsd: 198000, sizeSqm: 112, type: "apartment", availability: "available", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-01.png", label: "Tower A · 12 East" },
      { id: "gc-a-09w", priceUsd: 245000, sizeSqm: 138, type: "apartment", availability: "reserved", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-03.png", label: "Tower A · 09 West" },
      { id: "gc-s-g12", priceUsd: 92000, sizeSqm: 48, type: "shop", availability: "available", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-04.png", label: "Ground · Arcade G12" },
      { id: "gc-s-m03", priceUsd: 134000, sizeSqm: 72, type: "shop", availability: "available", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-05.png", label: "Mezzanine · M03" },
      { id: "gc-a-22p", priceUsd: 312000, sizeSqm: 168, type: "apartment", availability: "sold", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-09.png", label: "Penthouse · 22" },
      { id: "gc-s-g08", priceUsd: 78000, sizeSqm: 38, type: "shop", availability: "reserved", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-11.png", label: "Ground · G08" },
    ],
  },
  {
    slug: "gulbahar-towers",
    name: "Gulbahar Towers",
    category: "Residential",
    type: "residential",
    featured: true,
    megaMenu: {
      listStatus: "Operational",
      facts: [
        { label: "Investment", value: "USD 80M+" },
        { label: "Scale", value: "19 blocks" },
        { label: "Year", value: "—" },
      ],
    },
    excerpt: "Nineteen residential blocks near key government institutions — total investment exceeding USD 80 million.",
    description:
      "Gulbahar Towers is a large-scale residential and commercial complex comprising nineteen independent blocks with total investment exceeding USD eighty million. Located in District 16, Pul-e-Mahmood Khan, near key governmental and administrative institutions, it contributes to structured residential expansion in a strategic urban zone and combines residential, retail, and community services in a consolidated complex.",
    location: "District 16, Pul-e-Mahmood Khan, Kabul",
    status: "Operational",
    year: "—",
    area: "19 blocks · USD 80M+",
    image: "/images/projects/gulbahar-plaza/gulbahar-plaza-03.png",
    gallery: [
      "/images/projects/gulbahar-plaza/gulbahar-plaza-03.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-04.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-05.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-06.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-11.png",
    ],
    timeline: [
      { label: "Master planning", value: "Multi-phase" },
      { label: "Residential blocks", value: "19" },
      { label: "Commercial retail", value: "211 units" },
      { label: "Operations", value: "Ongoing" },
    ],
    keyStats: { units: "697", shops: "211", facilities: "8+" },
    strategicPositioning:
      "Gulbahar Towers combines residential, retail, and community services within a consolidated urban complex, offering integrated living and commercial access in a central Kabul district.",
    keyComponentBullets: [
      "19 residential blocks",
      "697 residential apartments",
      "211 commercial retail units",
      "Multi-level parking facilities",
    ],
    facilityBullets: [
      "24/7 security system",
      "Mosque",
      "School and kindergarten",
      "Clinic and pharmacy",
      "Restaurants",
      "Fitness center",
      "24-hour electricity and water supply",
      "Commercial and residential parking",
    ],
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
      { id: "gt-t1-18b", priceUsd: 285000, sizeSqm: 124, type: "apartment", availability: "available", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-02.png", label: "Tower 1 · 18B" },
      { id: "gt-t1-24a", priceUsd: 352000, sizeSqm: 156, type: "apartment", availability: "available", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-04.png", label: "Tower 1 · 24A" },
      { id: "gt-t2-08c", priceUsd: 198000, sizeSqm: 96, type: "apartment", availability: "reserved", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-05.png", label: "Tower 2 · 08C" },
      { id: "gt-t2-32p", priceUsd: 520000, sizeSqm: 210, type: "apartment", availability: "available", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-07.png", label: "Tower 2 · Sky suite" },
      { id: "gt-r-04", priceUsd: 118000, sizeSqm: 52, type: "shop", availability: "available", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-08.png", label: "Retail podium · R04" },
      { id: "gt-t1-05d", priceUsd: 175000, sizeSqm: 88, type: "apartment", availability: "sold", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-10.png", label: "Tower 1 · 05D" },
    ],
  },
  {
    slug: "gulbahar-plaza",
    name: "Gulbahar Plaza",
    category: "Mixed-use",
    type: "mixed-use",
    featured: true,
    megaMenu: {
      listStatus: "Operational",
      facts: [
        { label: "Investment", value: "USD 60M" },
        { label: "Scale", value: "25 floors" },
        { label: "Year", value: "—" },
      ],
    },
    excerpt: "Airport Road corridor — twenty-five-floor tower, shopping center, underground parking, and planned hospitality at ~USD 60 million.",
    description:
      "Gulbahar Plaza is a large-scale mixed-use development along one of Kabul’s primary commercial corridors at Airport Road, Macroryan 4th Square. It includes a twenty-five-floor residential tower, a four-floor commercial shopping center, four underground parking levels, and a planned hospitality component, with estimated investment of approximately USD sixty million. Proximity to Kabul International Airport and major commercial districts supports residential, retail, hospitality, and business demand in a high-growth corridor.",
    location: "Airport Road, Macroryan 4th Square, Kabul",
    status: "Operational",
    year: "—",
    area: "25 floors · ~USD 60M",
    image: "/images/projects/gulbahar-plaza/gulbahar-plaza-01.png",
    gallery: [
      "/images/projects/gulbahar-plaza/gulbahar-plaza-01.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-02.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-03.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-04.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-05.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-06.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-07.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-08.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-09.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-10.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-11.png",
    ],
    timeline: [
      { label: "Tower & retail", value: "Delivered core" },
      { label: "Parking levels", value: "4 underground" },
      { label: "Hospitality", value: "Planned" },
      { label: "Corridor position", value: "Airport Road" },
    ],
    keyStats: { units: "342+", shops: "179+", facilities: "10+" },
    strategicPositioning:
      "Due to its location near Kabul International Airport and major commercial districts, Gulbahar Plaza is positioned to serve residential, retail, hospitality, and business demand within a high-growth urban corridor.",
    keyComponentBullets: [
      "25-floor residential tower",
      "342+ residential units",
      "179+ retail and office units",
      "4 underground parking levels",
      "Planned hospitality component",
    ],
    facilityBullets: [
      "24-hour security and surveillance",
      "Central heating system",
      "Smart building access systems",
      "Gym and recreational areas",
      "Kindergarten and family facilities",
      "Supermarket and retail services",
      "Clinic and pharmacy",
      "Hotel with dedicated security systems",
    ],
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
      { id: "gp-l1-101", priceUsd: 145000, sizeSqm: 86, type: "shop", availability: "available", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-02.png", label: "Level 1 · 101 corner" },
      { id: "gp-l1-118", priceUsd: 98000, sizeSqm: 58, type: "shop", availability: "available", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-03.png", label: "Level 1 · 118" },
      { id: "gp-gf-k02", priceUsd: 42000, sizeSqm: 22, type: "shop", availability: "reserved", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-04.png", label: "Ground · kiosk K02" },
      { id: "gp-l2-205", priceUsd: 112000, sizeSqm: 64, type: "shop", availability: "available", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-06.png", label: "Level 2 · 205" },
      { id: "gp-gf-a01", priceUsd: 265000, sizeSqm: 142, type: "shop", availability: "sold", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-07.png", label: "Ground · anchor A01" },
      { id: "gp-l1-092", priceUsd: 76000, sizeSqm: 44, type: "shop", availability: "available", image: "/images/projects/gulbahar-plaza/gulbahar-plaza-08.png", label: "Level 1 · 092" },
    ],
  },
  {
    slug: "gulbahar-power",
    name: "Gulbahar Energy",
    category: "Energy",
    type: "commercial",
    megaMenu: {
      listStatus: "Active",
      facts: [
        { label: "Capacity", value: "50–700 MW" },
        { label: "Type", value: "Gas-fired generation" },
        { label: "Integration", value: "DABS grid" },
      ],
    },
    excerpt: "Gas-fired power in northern Afghanistan — from 50 MW to 700 MW scale, DABS grid integration, and coordination with MoWE and MoMP.",
    description:
      "Gulbahar Energy is a private developer of power generation in Afghanistan, focused on local resources to produce electricity and support the national grid through gas-fired projects and public-private coordination.",
    detailOverviewTitle: "Power for the national grid",
    detailOverviewParagraphs: [
      "Gulbahar Energy is a private company engaged in the development of power generation projects in Afghanistan. The program focuses on utilizing local energy resources to produce electricity and support the national grid.",
      "Gulbahar Energy is currently developing a gas-fired power project in northern Afghanistan in coordination with relevant government authorities. The project aims to increase domestic power generation and reduce reliance on imported electricity. Through its investments, Gulbahar Energy seeks to contribute to the growth and stability of Afghanistan’s energy sector.",
      "Generation facilities are designed from a starting scale of 50 MW up to 700 MW, aligned with resource availability, grid requirements, and phased delivery.",
    ],
    missionVision: {
      vision: "Sustainable and future-focused leadership in providing sustainable energy — the most trusted and reliable energy generation company in the region.",
      mission:
        "Operating power plants with high efficiency, reliability, and safety standards. Providing uninterrupted, reliable power to support community and economic growth.",
      values: [
        "Safety – Protecting the health and safety of employees, equipment, and the community.",
        "Reliability – Providing a stable and continuous supply of electricity.",
        "Environmental responsibility – Minimizing environmental impact and supporting sustainable energy practices.",
        "Integrity – Acting honestly, ethically, and transparently in all business activities.",
        "Innovation – Adopting new technologies and improving power generation methods.",
        "Efficiency – Using resources effectively to produce electricity at the lowest reasonable cost.",
        "Teamwork – Encouraging cooperation and collaboration among employees.",
        "Customer focus – Ensuring customer satisfaction by providing dependable power services.",
      ],
    },
    keyStatLabels: { units: "Starting scale", shops: "Upper scale", facilities: "Primary technology" },
    scaleSectionEyebrow: "Scale",
    scaleSectionTitle: "Generation capacity",
    featuresSectionEyebrow: "Platform",
    featuresSectionTitle: "Key components",
    location: "Northern Afghanistan",
    status: "Operational / development",
    year: "—",
    area: "—",
    image: "/images/projects/gulbahar-plaza/gulbahar-plaza-09.png",
    gallery: [
      "/images/projects/gulbahar-plaza/gulbahar-plaza-09.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-11.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-05.png",
      "/images/projects/gulbahar-plaza/gulbahar-plaza-02.png",
    ],
    timeline: [
      { label: "Strategic development", value: "End-to-end" },
      { label: "Technology focus", value: "Gas-to-power" },
      { label: "Grid integration", value: "DABS alignment" },
      { label: "Coordination", value: "MoWE / MoMP" },
    ],
    keyStats: { units: "50 MW", shops: "700 MW", facilities: "Gas-fired" },
    strategicPositioning:
      "Gulbahar Energy is a private company engaged in the development of power generation projects in Afghanistan, focusing on utilizing local energy resources to produce electricity and support the national grid, including a gas-fired power project in northern Afghanistan coordinated with relevant government authorities.",
    features: [
      {
        icon: "layers",
        title: "Strategic project development",
        description: "End-to-end management of large-scale energy infrastructure from design to commissioning.",
      },
      {
        icon: "zap",
        title: "Thermal power expertise",
        description: "Specialized focus on high-efficiency gas-to-power technology utilizing local Afghan resources.",
      },
      {
        icon: "wifi",
        title: "Grid integration & stability",
        description: "Engineering solutions to synchronize domestic power with the national DABS network.",
      },
      {
        icon: "landmark",
        title: "Resource optimization",
        description: "Reducing energy imports by maximizing the use of Afghanistan’s natural gas and other domestic resources.",
      },
      {
        icon: "shield",
        title: "Public-private coordination",
        description: "Strategic alignment with the Ministry of Water and Energy and the Ministry of Mines and Petroleum.",
      },
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
      "Gulbahar Cement was established to provide high-quality cement products and innovative solutions in the construction industry. Founded in 2023, it is the largest cement manufacturer in Afghanistan, supplying residential, commercial, and infrastructure projects with premium raw materials and advanced technologies.",
    detailOverviewTitle: "National-scale cement production",
    detailOverviewParagraphs: [
      "Gulbahar Cement was established to provide high-quality cement products and innovative solutions in the construction industry. Founded in 2023, GC is the largest cement manufacturer in Afghanistan, offering high-quality cement for residential, commercial, and infrastructure projects using the best raw materials and advanced technologies.",
      "As a responsible company, we prioritize sustainable development and the environment, striving to optimize our production processes to minimize negative environmental impact. Gulbahar Cement continuously improves the quality of its products and works to meet the needs of its customers.",
      "Our core values include integrity, innovation, and customer satisfaction, which guide us in achieving our goals. Our aim is to deliver high-quality projects and professional services that contribute to the development of communities and businesses.",
      "The project includes investment in the extraction of raw materials and cement production, and will provide direct employment opportunities for more than 5,000 people. Production capacity in the first phase is 4,000 tons per day; in the second phase it will be 8,000 tons per day, for a total of 12,000 tons per day.",
    ],
    missionVision: {
      vision: "To be a pioneer — the first environmental and developmental choice in the cement industry.",
      mission:
        "Providing a variety of high-quality, eco-friendly grey and white cement products to meet customer needs through optimal utilization of resources and energy efficiency. Sustainable production and support for national job creation with continuous development.",
      values: ["Growth", "Transparency", "Participation and integration", "Quality", "Innovation and creativity"],
    },
    keyStatLabels: { units: "Direct employment target", shops: "Phase 1 capacity", facilities: "Total design capacity" },
    scaleSectionEyebrow: "Scale",
    scaleSectionTitle: "Production & employment",
    featuresSectionEyebrow: "Operations",
    featuresSectionTitle: "Key plant components",
    areaBadgePlain: true,
    megaMenu: {
      listStatus: "Active",
      facts: [
        { label: "Capacity", value: "12,000 t/day" },
        { label: "Employment", value: "5,000+ jobs" },
        { label: "Product", value: "Grey & white cement" },
      ],
    },
    location: "Afghanistan",
    status: "Operational",
    year: "2023",
    area: "12,000 t/day (phased)",
    image: "/images/projects/gulbahar-cement-plant.png",
    gallery: ["/images/projects/gulbahar-cement-plant.png", "/images/projects/gulbahar-cement-site.png"],
    timeline: [
      { label: "Establishment", value: "2023" },
      { label: "Phase 1 capacity", value: "4,000 t/day" },
      { label: "Phase 2 capacity", value: "8,000 t/day" },
      { label: "Total target", value: "12,000 t/day" },
    ],
    keyStats: { units: "5,000+", shops: "4,000 t/day", facilities: "12,000 t/day" },
    strategicPositioning:
      "Gulbahar Cement is positioned to meet national construction demand through phased production capacity, sustainable production practices, and direct employment at scale across extraction, production, and dispatch.",
    features: [
      {
        icon: "building2",
        title: "1. Raw material preparation",
        description:
          "Limestone quarry as the main feedstock; crushers to reduce rock size; raw material storage for limestone, clay, gypsum, and additives; raw mill grinding raw materials into fine powder (raw meal).",
      },
      {
        icon: "zap",
        title: "2. Clinker production system",
        description: "Preheater tower heating raw meal before the kiln; rotary kiln as the main furnace where raw meal is burned to clinker at around 1,450°C; clinker cooler reducing temperature after the kiln exit.",
      },
      {
        icon: "sparkles",
        title: "3. Cement grinding section",
        description: "Cement mill grinding clinker with gypsum and additives into cement; separators controlling fineness of the cement powder.",
      },
      {
        icon: "layers",
        title: "4. Storage and handling",
        description: "Clinker silos for produced clinker; cement silos for finished cement; conveyors and elevators moving materials between process sections.",
      },
      {
        icon: "store",
        title: "5. Packing and dispatch",
        description: "Packing plant for bagged cement (typically 25 kg or 50 kg); bulk loading into trucks or tankers; dedicated truck loading station.",
      },
      {
        icon: "shield",
        title: "6. Utilities and supporting systems",
        description:
          "Power supply and power plant; water supply; dust collection (bag filters and electrostatic precipitators) for environmental control; laboratory and quality control; control room with automation.",
      },
      {
        icon: "landmark",
        title: "7. Infrastructure",
        description: "Access roads and transport; maintenance workshop; administrative offices; worker facilities.",
      },
    ],
    unitsInfo: {},
  },
  {
    slug: "gulbahar-petroleum",
    name: "Gulbahar Petroleum",
    category: "Oil & gas",
    type: "commercial",
    megaMenu: {
      listStatus: "Active",
      facts: [
        { label: "Scope", value: "Downstream & logistics" },
        { label: "Footprint", value: "Afghanistan" },
        { label: "Stage", value: "Active" },
      ],
    },
    excerpt:
      "Integrated downstream and logistics programs supporting Afghanistan’s energy supply chain — storage, distribution, and institutional-grade operational standards.",
    description:
      "Gulbahar Petroleum represents the Group’s participation in oil and gas logistics and downstream infrastructure. Activities are structured around reliable supply, compliant operations, and long-term partnerships with Afghan institutions and international counterparties.",
    location: "Afghanistan",
    status: "Active",
    year: "—",
    area: "—",
    image: "/images/projects/gulbahar-plaza/gulbahar-plaza-10.png",
    gallery: ["/images/projects/gulbahar-plaza/gulbahar-plaza-10.png", "/images/projects/gulbahar-plaza/gulbahar-plaza-11.png"],
    timeline: [
      { label: "Platform", value: "Logistics-led" },
      { label: "Geography", value: "National" },
      { label: "Operations", value: "Ongoing" },
      { label: "Governance", value: "Institutional" },
    ],
    keyStats: { units: "National", shops: "Logistics", facilities: "Integrated" },
    strategicPositioning:
      "Gulbahar Petroleum focuses on secure supply-chain execution and operational discipline across downstream assets, aligned with national priorities and international compliance expectations.",
    features: [
      { icon: "layers", title: "Supply continuity", description: "Structured logistics programs supporting predictable deliveries and inventory discipline." },
      { icon: "shield", title: "Operational compliance", description: "Controls aligned with safety and documentation standards across handling and dispatch." },
      { icon: "landmark", title: "Institutional alignment", description: "Coordination with relevant ministries and regulators for permit-driven execution." },
    ],
    unitsInfo: {},
  },
  {
    slug: "gulbahar-foundation",
    name: "Gulbahar Foundation",
    category: "Social impact",
    type: "commercial",
    megaMenu: {
      listStatus: "Active",
      facts: [
        { label: "Focus", value: "Community & education" },
        { label: "Geography", value: "Afghanistan" },
        { label: "Programs", value: "Ongoing" },
      ],
    },
    excerpt: "Corporate social responsibility initiatives spanning education, community infrastructure, and long-term institutional partnerships across Afghanistan.",
    description:
      "Gulbahar Foundation channels private-sector resources into structured social programs with measurable outcomes. Priorities include education access, community facilities, and collaboration with public institutions to extend impact at scale.",
    location: "Afghanistan",
    status: "Active",
    year: "—",
    area: "—",
    image: "/images/projects/gulbahar-plaza/gulbahar-plaza-06.png",
    gallery: ["/images/projects/gulbahar-plaza/gulbahar-plaza-06.png", "/images/projects/gulbahar-plaza/gulbahar-plaza-07.png"],
    timeline: [
      { label: "Mission", value: "Social ROI" },
      { label: "Focus", value: "Education" },
      { label: "Delivery", value: "Partnerships" },
      { label: "Coverage", value: "National" },
    ],
    keyStats: { units: "National", shops: "Education", facilities: "Community" },
    strategicPositioning:
      "The Foundation aligns philanthropic and programmatic investment with Gulbahar Group priorities — transparent governance, accountable delivery, and sustainable community outcomes.",
    features: [
      { icon: "users", title: "Community programs", description: "Structured grants and projects designed for long-term institutional benefit." },
      { icon: "landmark", title: "Education access", description: "Support for schools, scholarships, and learning infrastructure where need is greatest." },
      { icon: "shield", title: "Governance", description: "Reporting and oversight consistent with international CSR practice." },
    ],
    unitsInfo: {},
  },
  {
    slug: "gulbahar-pharma",
    name: "Gulbahar Pharma",
    category: "Pharmaceuticals",
    type: "commercial",
    megaMenu: {
      listStatus: "Active",
      facts: [
        { label: "Focus", value: "Manufacturing & supply" },
        { label: "Compliance", value: "cGMP roadmap" },
        { label: "Registration", value: "In progress" },
      ],
    },
    excerpt: "Pharmaceutical manufacturing and distribution capability aligned with international quality systems — supporting national healthcare resilience.",
    description:
      "Gulbahar Pharma develops manufacturing and distribution capacity for essential medicines. The platform is designed around quality systems, regulatory registration, and reliable supply to Afghan healthcare providers.",
    location: "Afghanistan",
    status: "Active",
    year: "—",
    area: "—",
    image: "/images/projects/gulbahar-plaza/gulbahar-plaza-08.png",
    gallery: ["/images/projects/gulbahar-plaza/gulbahar-plaza-08.png", "/images/projects/gulbahar-plaza/gulbahar-plaza-09.png"],
    timeline: [
      { label: "Quality", value: "cGMP" },
      { label: "Scope", value: "Essential meds" },
      { label: "Market", value: "National" },
      { label: "Stage", value: "Development" },
    ],
    keyStats: { units: "cGMP", shops: "Essential", facilities: "National" },
    strategicPositioning:
      "Gulbahar Pharma positions the Group at the intersection of industrial capability and public health — quality-first manufacturing with transparent regulatory engagement.",
    features: [
      { icon: "shield", title: "Quality systems", description: "Documentation and controls aligned with international pharmaceutical manufacturing expectations." },
      { icon: "layers", title: "Supply reliability", description: "Distribution planning for critical medicines across urban and regional channels." },
      { icon: "sparkles", title: "Innovation", description: "Partnerships for technology transfer and capacity building." },
    ],
    unitsInfo: {},
  },
  {
    slug: "gulbahar-group-afghanistan",
    name: "Gulbahar Group Afghanistan",
    category: "Holding company",
    type: "commercial",
    megaMenu: {
      listStatus: "Active",
      facts: [
        { label: "Role", value: "Diversified holding" },
        { label: "Sectors", value: "Industrial & services" },
        { label: "HQ", value: "Kabul" },
      ],
    },
    excerpt: "The Gulbahar Group’s Afghanistan holding platform — coordinating capital allocation, governance, and cross-portfolio strategy across industrial and urban assets.",
    description:
      "Gulbahar Group Afghanistan provides central governance for the Group’s Afghan operating companies. Functions include strategy, capital planning, risk management, and alignment with national development priorities.",
    location: "Kabul, Afghanistan",
    status: "Active",
    year: "—",
    area: "—",
    image: "/images/projects/gulbahar-plaza/gulbahar-plaza-01.png",
    gallery: ["/images/projects/gulbahar-plaza/gulbahar-plaza-01.png", "/images/projects/gulbahar-plaza/gulbahar-plaza-02.png"],
    timeline: [
      { label: "Governance", value: "Central" },
      { label: "Portfolio", value: "Multi-sector" },
      { label: "Strategy", value: "Long-term" },
      { label: "Presence", value: "National" },
    ],
    keyStats: { units: "Multi-sector", shops: "National", facilities: "Integrated" },
    strategicPositioning:
      "The holding company ensures institutional-grade oversight across Gulbahar’s Afghan portfolio — from cement and energy to urban development and social programs.",
    features: [
      { icon: "layers", title: "Capital allocation", description: "Central planning for investment sequencing and balance-sheet discipline." },
      { icon: "landmark", title: "Stakeholder alignment", description: "Coordination with government and international partners on large-scale projects." },
      { icon: "wifi", title: "Portfolio integration", description: "Shared services and reporting across operating subsidiaries." },
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
