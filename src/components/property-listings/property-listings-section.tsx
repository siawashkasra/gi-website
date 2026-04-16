"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { PropertyListing, PropertyListingAvailability } from "@/lib/property-listings";
import {
  filterPropertyListings,
  getListingBounds,
  propertyListingAvailabilityLabels,
  propertyListingTypeLabels,
} from "@/lib/property-listings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function parseNum(s: string): number | null {
  const n = parseFloat(s.replace(/,/g, ""));
  return s.trim() === "" || Number.isNaN(n) ? null : n;
}

const availabilityOptions: (PropertyListingAvailability | "all")[] = ["all", "available", "reserved", "sold"];

function availabilityStyles(a: PropertyListingAvailability) {
  if (a === "available") return "border-primary/40 bg-primary/10 text-primary";
  if (a === "reserved") return "border-foreground/15 bg-muted text-foreground";
  if (a === "sold") return "border-border bg-foreground/[0.06] text-muted-foreground";
  return "border-border bg-muted/80 text-muted-foreground";
}

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

type PropertyListingsSectionProps = { projectName: string; listings: PropertyListing[] };

export function PropertyListingsSection({ projectName, listings }: PropertyListingsSectionProps) {
  const bounds = useMemo(() => getListingBounds(listings), [listings]);
  const [priceMinIn, setPriceMinIn] = useState("");
  const [priceMaxIn, setPriceMaxIn] = useState("");
  const [sizeMinIn, setSizeMinIn] = useState("");
  const [sizeMaxIn, setSizeMaxIn] = useState("");
  const [availability, setAvailability] = useState<PropertyListingAvailability | "all">("all");
  const filters = useMemo(
    () => ({
      priceMin: parseNum(priceMinIn),
      priceMax: parseNum(priceMaxIn),
      sizeMin: parseNum(sizeMinIn),
      sizeMax: parseNum(sizeMaxIn),
      availability,
    }),
    [priceMinIn, priceMaxIn, sizeMinIn, sizeMaxIn, availability]
  );
  const filtered = useMemo(() => filterPropertyListings(listings, filters), [listings, filters]);
  const reset = () => {
    setPriceMinIn("");
    setPriceMaxIn("");
    setSizeMinIn("");
    setSizeMaxIn("");
    setAvailability("all");
  };
  return (
    <section className="border-t border-border/60 bg-background py-16 sm:py-20 lg:py-24" aria-labelledby="listings-heading">
      <div className="ds-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-eyebrow">Listings</p>
            <h2 id="listings-heading" className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Available units · {projectName}
            </h2>
            <p className="mt-3 max-w-xl font-sans text-muted-foreground">Filter by budget, area, and status. Indicative pricing — confirm with sales.</p>
          </div>
          <div className="flex items-center gap-2 font-sans text-sm text-muted-foreground">
            <SlidersHorizontal className="size-4 text-primary" aria-hidden />
            <span>
              <span className="font-semibold text-foreground">{filtered.length}</span> of {listings.length} shown
            </span>
          </div>
        </div>
        <Card className="mt-10 border-border/70 shadow-sm">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Filters</p>
              <Button type="button" variant="ghost" size="sm" onClick={reset} className="self-start text-xs uppercase tracking-wider sm:self-auto">
                Reset all
              </Button>
            </div>
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-4">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Price (USD)</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Input type="number" inputMode="numeric" placeholder={`From · ${formatPrice(bounds.priceMin)}`} value={priceMinIn} onChange={(e) => setPriceMinIn(e.target.value)} className="h-10" aria-label="Minimum price USD" />
                  </div>
                  <div>
                    <Input type="number" inputMode="numeric" placeholder={`To · ${formatPrice(bounds.priceMax)}`} value={priceMaxIn} onChange={(e) => setPriceMaxIn(e.target.value)} className="h-10" aria-label="Maximum price USD" />
                  </div>
                </div>
              </div>
              <div className="space-y-3 lg:col-span-4">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Size (m²)</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Input type="number" inputMode="decimal" placeholder={`Min · ${bounds.sizeMin}`} value={sizeMinIn} onChange={(e) => setSizeMinIn(e.target.value)} className="h-10" aria-label="Minimum size square meters" />
                  </div>
                  <div>
                    <Input type="number" inputMode="decimal" placeholder={`Max · ${bounds.sizeMax}`} value={sizeMaxIn} onChange={(e) => setSizeMaxIn(e.target.value)} className="h-10" aria-label="Maximum size square meters" />
                  </div>
                </div>
              </div>
              <div className="space-y-3 lg:col-span-4">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Availability</Label>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by availability">
                  {availabilityOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAvailability(opt)}
                      className={cn(
                        "rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all",
                        availability === opt ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border bg-muted/40 text-muted-foreground hover:border-primary/30 hover:bg-muted"
                      )}
                    >
                      {opt === "all" ? "All" : propertyListingAvailabilityLabels[opt]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {filtered.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-dashed border-border/80 bg-muted/20 py-14 text-center text-muted-foreground">No units match these filters. Adjust ranges or reset.</p>
        ) : (
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((unit) => (
              <li key={unit.id}>
                <article className="group h-full overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={unit.image} alt={`${unit.label ?? unit.id} · ${propertyListingTypeLabels[unit.type]}`} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" sizes="(max-width:1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-80" aria-hidden />
                    <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white backdrop-blur-md">{propertyListingTypeLabels[unit.type]}</span>
                    <span className={cn("absolute right-4 top-4 rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider backdrop-blur-md", availabilityStyles(unit.availability))}>
                      {propertyListingAvailabilityLabels[unit.availability]}
                    </span>
                  </div>
                  <div className="space-y-3 p-6">
                    {unit.label ? <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{unit.label}</p> : null}
                    <p className="font-sans text-2xl font-semibold tabular-nums tracking-tight text-primary">{formatPrice(unit.priceUsd)}</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{unit.sizeSqm}</span> m² interior / lettable (indicative)
                    </p>
                    <Button render={<Link href={`/contact?interest=${encodeURIComponent(projectName)}&unit=${encodeURIComponent(unit.id)}`} />} nativeButton={false} variant="outline" size="sm" className="mt-2 w-full border-primary/25 hover:bg-primary/5">
                      Inquire about this unit
                    </Button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
