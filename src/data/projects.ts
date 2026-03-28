export type ProjectType = "residential" | "commercial" | "mixed-use";

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
    location: "Kabul",
    status: "Delivered",
    year: "2018",
    area: "45,000 m²",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
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
    location: "Kabul",
    status: "In development",
    year: "2026",
    area: "32,000 m²",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
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
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
      "https://images.unsplash.com/photo-1555529908-51e7457bc3aa?w=1200&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
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
    location: "Regional",
    status: "Operational",
    year: "2022",
    area: "—",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&q=80",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&q=80",
    ],
  },
  {
    slug: "gulbahar-cement",
    name: "Gulbahar Cement",
    category: "Industrial",
    type: "commercial",
    excerpt: "Large-scale cement production for construction nationwide.",
    description:
      "Gulbahar Cement supplies critical building materials with scale, quality control, and environmental stewardship. The facility supports major public and private construction programs.",
    location: "Regional",
    status: "Operational",
    year: "2019",
    area: "—",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
      "https://images.unsplash.com/photo-1581092160562-40aa08e66837?w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
    ],
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
