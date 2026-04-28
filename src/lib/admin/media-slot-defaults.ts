import type { HeroRoute } from "@/lib/media/placement-keys";

export const adminHeroFallbackByRoute: Record<HeroRoute, { publicPath: string; alt: string }> = {
  home: { publicPath: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2880&q=92", alt: "" },
  company: { publicPath: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2400&q=90", alt: "" },
  jobs: { publicPath: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2400&q=90", alt: "" },
  events: { publicPath: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=2400&q=90", alt: "" },
  projectsIndex: { publicPath: "/images/projects/gulbahar-plaza/gulbahar-plaza-hero-page.png", alt: "" },
};

export const adminHomeMobileHeroFallback: { publicPath: string; alt: string } = { publicPath: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2880&q=92", alt: "" };

export const adminHomeSectionFallbacks = {
  about: { publicPath: "/images/home/about-multi-sector-platform.png", alt: "Gulbahar Plaza mixed-use development" },
  milestones: { publicPath: "/images/home/milestones-side.png", alt: "Gulbahar flagship development" },
  ceo: { publicPath: "/images/ghulam-rabani-rabani.png", alt: "Ghulam Rabani Rabani, Chief Executive Officer" },
} as const;
