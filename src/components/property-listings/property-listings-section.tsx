"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ChevronLeft, ChevronRight, SlidersHorizontal, Star } from "lucide-react";
import type { PropertyListing, PropertyListingAvailability } from "@/lib/property-listings";
import {
  filterPropertyListings,
  getListingBounds,
} from "@/lib/property-listings";
import { useLocalizedFormat } from "@/lib/i18n/use-localized-format";
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

type PropertyListingsSectionProps = { projectName: string; listings: PropertyListing[] };

const PAGE_SIZE = 9;

export function PropertyListingsSection({ projectName, listings }: PropertyListingsSectionProps) {
  const t = useTranslations("projects.listings");
  const { formatNumber, formatCurrencyUsd, localizeText } = useLocalizedFormat();
  const bounds = useMemo(() => getListingBounds(listings), [listings]);
  const formatPrice = (n: number) => formatCurrencyUsd(n);
  const typeLabel = (type: PropertyListing["type"]) => t(`types.${type}`);
  const availabilityLabel = (a: PropertyListingAvailability) => t(`availabilityLabels.${a}`);
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
  const sortedFiltered = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return arr;
  }, [filtered]);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(sortedFiltered.length / PAGE_SIZE));
  const pageSafe = Math.min(Math.max(1, page), totalPages);
  const pageItems = sortedFiltered.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);
  const prevPageSafeRef = useRef<number | null>(null);
  useEffect(() => {
    if (prevPageSafeRef.current === null) {
      prevPageSafeRef.current = pageSafe;
      return;
    }
    if (prevPageSafeRef.current === pageSafe) return;
    prevPageSafeRef.current = pageSafe;
    document.getElementById("available-units")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pageSafe]);
  const reset = () => {
    setPriceMinIn("");
    setPriceMaxIn("");
    setSizeMinIn("");
    setSizeMaxIn("");
    setAvailability("all");
    setPage(1);
  };
  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-gradient-to-b from-white to-gi-navy/[0.02] py-16 sm:py-20 lg:py-24" aria-labelledby="listings-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gi-gold/22 to-transparent" aria-hidden />
      <div className="ds-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="size-1 shrink-0 rounded-full bg-gi-gold/70 shadow-[0_0_12px_rgba(201,168,76,0.35)]" aria-hidden />
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-gi-navy/55">{t("title")}</p>
            </div>
            <h2 id="listings-heading" className="mt-4 font-heading text-[clamp(1.65rem,3.2vw,2.35rem)] font-semibold leading-tight tracking-tight text-gi-navy">
              {t("available", { project: projectName })}
            </h2>
          </div>
          <div className="flex items-center gap-2 font-sans text-sm text-muted-foreground">
            <SlidersHorizontal className="size-4 text-gi-navy" aria-hidden />
            <span>
              {t("filterSummary", { shown: formatNumber(sortedFiltered.length), total: formatNumber(listings.length) })}
              {sortedFiltered.length > PAGE_SIZE ? ` · ${t("page", { page: formatNumber(pageSafe), total: formatNumber(totalPages) })}` : null}
            </span>
          </div>
        </div>
        <Card className="mt-10 rounded-2xl border border-gi-navy/[0.1] bg-white/95 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.96),0_24px_56px_-36px_rgba(13,27,62,0.12)]">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("filters")}</p>
              <Button type="button" variant="ghost" size="sm" onClick={reset} className="self-start text-xs uppercase tracking-wider sm:self-auto">
                {t("reset")}
              </Button>
            </div>
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-4">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">{t("price")}</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Input type="number" inputMode="numeric" placeholder={t("priceFrom", { value: formatPrice(bounds.priceMin) })} value={priceMinIn} onChange={(e) => { setPriceMinIn(e.target.value); setPage(1); }} className="h-10" aria-label={t("priceMinAria")} />
                  </div>
                  <div>
                    <Input type="number" inputMode="numeric" placeholder={t("priceTo", { value: formatPrice(bounds.priceMax) })} value={priceMaxIn} onChange={(e) => { setPriceMaxIn(e.target.value); setPage(1); }} className="h-10" aria-label={t("priceMaxAria")} />
                  </div>
                </div>
              </div>
              <div className="space-y-3 lg:col-span-4">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">{t("size")}</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Input type="number" inputMode="decimal" placeholder={t("sizeMin", { value: formatNumber(bounds.sizeMin) })} value={sizeMinIn} onChange={(e) => { setSizeMinIn(e.target.value); setPage(1); }} className="h-10" aria-label={t("sizeMinAria")} />
                  </div>
                  <div>
                    <Input type="number" inputMode="decimal" placeholder={t("sizeMax", { value: formatNumber(bounds.sizeMax) })} value={sizeMaxIn} onChange={(e) => { setSizeMaxIn(e.target.value); setPage(1); }} className="h-10" aria-label={t("sizeMaxAria")} />
                  </div>
                </div>
              </div>
              <div className="space-y-3 lg:col-span-4">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">{t("availability")}</Label>
                <div className="flex flex-wrap gap-2" role="group" aria-label={t("availabilityFilterAria")}>
                  {availabilityOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => { setAvailability(opt); setPage(1); }}
                      className={cn(
                        "rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all",
                        availability === opt ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border bg-muted/40 text-muted-foreground hover:border-primary/30 hover:bg-muted"
                      )}
                    >
                      {opt === "all" ? t("all") : availabilityLabel(opt)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {sortedFiltered.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-dashed border-border/80 bg-muted/20 py-14 text-center text-muted-foreground">{t("empty")}</p>
        ) : (
          <>
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((unit) => (
                <li key={unit.id}>
                  <article className={cn("group h-full overflow-hidden rounded-2xl border bg-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.92),0_16px_48px_-28px_rgba(13,27,62,0.1)] transition-all duration-500 hover:-translate-y-1 hover:border-gi-gold/35 hover:shadow-[0_24px_56px_-32px_rgba(13,27,62,0.14)]", unit.featured ? "border-gi-gold/50 ring-2 ring-gi-gold/25" : "border-gi-navy/[0.08]")}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={unit.image} alt={t("unitImageAlt", { label: unit.label ?? unit.id, type: typeLabel(unit.type) })} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" sizes="(max-width:1024px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-80" aria-hidden />
                      {unit.featured ? (
                        <span className="absolute start-4 top-4 flex items-center gap-1 rounded-full border border-gi-gold/50 bg-gi-gold/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-gi-navy shadow-sm">
                          <Star className="size-3 fill-gi-navy text-gi-navy" aria-hidden />
                          {t("featured")}
                        </span>
                      ) : null}
                      <span className={cn("absolute rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white backdrop-blur-md", unit.featured ? "start-4 top-14" : "start-4 top-4")}>{typeLabel(unit.type)}</span>
                      <span className={cn("absolute end-4 top-4 rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider backdrop-blur-md", availabilityStyles(unit.availability))}>
                        {availabilityLabel(unit.availability)}
                      </span>
                    </div>
                  <div className="space-y-3 p-6">
                    {unit.label ? <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{localizeText(unit.label)}</p> : null}
                    <p className="font-sans text-2xl font-semibold tabular-nums tracking-tight text-gi-navy">{formatPrice(unit.priceUsd)}</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{formatNumber(unit.sizeSqm)}</span> {t("interior")} / {t("lettable")}
                    </p>
                    <Button render={<Link href={`/contact?interest=${encodeURIComponent(projectName)}&unit=${encodeURIComponent(unit.id)}`} />} nativeButton={false} variant="outline" size="sm" className="mt-2 w-full rounded-xl border-gi-navy/20 font-semibold text-gi-navy hover:border-gi-navy/35 hover:bg-gi-navy/[0.04]">
                      {t("inquire")}
                    </Button>
                  </div>
                </article>
                </li>
              ))}
            </ul>
            {totalPages > 1 ? (
              <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label={t("paginationAria")}>
                <Button type="button" variant="outline" size="sm" className="gap-1" disabled={pageSafe <= 1} onClick={() => setPage(pageSafe - 1)}>
                  <ChevronLeft className="size-4 rtl:scale-x-[-1]" aria-hidden />
                  {t("prev")}
                </Button>
                <span className="px-3 text-sm text-muted-foreground">
                  {t("page", { page: formatNumber(pageSafe), total: formatNumber(totalPages) })}
                </span>
                <Button type="button" variant="outline" size="sm" className="gap-1" disabled={pageSafe >= totalPages} onClick={() => setPage(pageSafe + 1)}>
                  {t("next")}
                  <ChevronRight className="size-4 rtl:scale-x-[-1]" aria-hidden />
                </Button>
              </nav>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
