import { Hero } from "@/components/sections/Hero";
import { getResolvedPageHero } from "@/lib/media/merge";

export async function HeroSection() {
  const h = await getResolvedPageHero("home");
  const cmsHero = h ? { desktopSrc: h.desktop, mobileSrc: h.mobile, alt: h.alt } : null;
  return <Hero cmsHero={cmsHero} />;
}
