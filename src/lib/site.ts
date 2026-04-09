export const siteConfig = {
  name: "Gulbahar Investment",
  tagline: "Real estate, commercial infrastructure, energy, and cement — Afghanistan",
  openGraphImage: "/logos/gulbahar-investment.png",
  description:
    "Privately held Afghan investment and development company established in 2006, operating across real estate, infrastructure, and industrial sectors. Headquarters Kabul; international affiliation United Arab Emirates.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gi.com.af",
  email: "info@gi.com.af",
  phone: "+93 78 600 9797",
  phoneLandline: "+93 20 11 12 13",
  address: "Gulbahar Center, Charahi Malik Asghar, Kabul, Afghanistan",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
  },
};
