export type PropertyListingType = "apartment" | "shop";

export type PropertyListingAvailability = "available" | "reserved" | "sold";

export type PropertyListing = {
  id: string;
  priceUsd: number;
  sizeSqm: number;
  type: PropertyListingType;
  availability: PropertyListingAvailability;
  image: string;
  label?: string;
  featured?: boolean;
};

export type PropertyListingFilters = {
  priceMin: number | null;
  priceMax: number | null;
  sizeMin: number | null;
  sizeMax: number | null;
  availability: PropertyListingAvailability | "all";
};

export function filterPropertyListings(listings: PropertyListing[], f: PropertyListingFilters): PropertyListing[] {
  return listings.filter((l) => {
    if (f.availability !== "all" && l.availability !== f.availability) return false;
    if (f.priceMin != null && l.priceUsd < f.priceMin) return false;
    if (f.priceMax != null && l.priceUsd > f.priceMax) return false;
    if (f.sizeMin != null && l.sizeSqm < f.sizeMin) return false;
    if (f.sizeMax != null && l.sizeSqm > f.sizeMax) return false;
    return true;
  });
}

export function getListingBounds(listings: PropertyListing[]) {
  if (listings.length === 0) return { priceMin: 0, priceMax: 0, sizeMin: 0, sizeMax: 0 };
  const prices = listings.map((l) => l.priceUsd);
  const sizes = listings.map((l) => l.sizeSqm);
  return { priceMin: Math.min(...prices), priceMax: Math.max(...prices), sizeMin: Math.min(...sizes), sizeMax: Math.max(...sizes) };
}

export const propertyListingTypeLabels: Record<PropertyListingType, string> = {
  apartment: "Apartment",
  shop: "Shop",
};

export const propertyListingAvailabilityLabels: Record<PropertyListingAvailability, string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
};
