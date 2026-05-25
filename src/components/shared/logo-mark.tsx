"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { isUploadAssetPath } from "@/lib/media/is-upload-path";
import { cn } from "@/lib/utils";

type LogoMarkProps = { className?: string; variant?: "light" | "dark"; siteLogoUrl?: string | null; siteLogoAlt?: string };

export function LogoMark({ className, variant = "dark", siteLogoUrl, siteLogoAlt }: LogoMarkProps) {
  const tNav = useTranslations("nav");
  const tSite = useTranslations("site");
  const nameParts = tSite("name").split(" ");
  const alt = siteLogoAlt ?? tSite("name");
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      {siteLogoUrl ? (
        <span className="relative flex h-10 shrink-0 items-center">
          {siteLogoUrl.endsWith(".svg") ? (
            <img src={siteLogoUrl} alt={alt} className={cn("h-10 w-auto max-w-[10.5rem] object-contain object-left", variant === "light" ? "brightness-0 invert" : "")} />
          ) : (
            <Image src={siteLogoUrl} alt={alt} width={160} height={40} className={cn("h-10 w-auto max-w-[10.5rem] object-contain object-left", variant === "light" ? "brightness-0 invert" : "")} priority unoptimized={isUploadAssetPath(siteLogoUrl)} />
          )}
        </span>
      ) : (
        <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold tracking-tight transition-colors", variant === "dark" ? "border-primary/30 bg-primary text-primary-foreground" : "border-white/25 bg-white/10 text-white")} aria-hidden>
          GI
        </span>
      )}
      {!siteLogoUrl ? (
        <span className={cn("flex flex-col leading-tight", variant === "dark" ? "text-primary" : "text-white")}>
          <span className="font-serif text-lg font-semibold tracking-tight">{nameParts[0]}</span>
          <span className={cn("text-[0.65rem] font-sans font-semibold uppercase tracking-[0.2em] group-hover:opacity-90", variant === "dark" ? "text-muted-foreground group-hover:text-primary/80" : "text-white/65")}>
            {tNav("logoSubtitle")}
          </span>
        </span>
      ) : null}
    </Link>
  );
}
