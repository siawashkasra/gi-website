import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

type LogoMarkProps = { className?: string; variant?: "light" | "dark" };

export function LogoMark({ className, variant = "dark" }: LogoMarkProps) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      <span
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold tracking-tight transition-colors",
          variant === "dark" ? "border-primary/30 bg-primary text-primary-foreground" : "border-white/25 bg-white/10 text-white"
        )}
        aria-hidden
      >
        GI
      </span>
      <span className={cn("flex flex-col leading-tight", variant === "dark" ? "text-primary" : "text-white")}>
        <span className="font-serif text-lg font-semibold tracking-tight">{siteConfig.name.split(" ")[0]}</span>
        <span
          className={cn(
            "text-[0.65rem] font-sans font-medium uppercase tracking-[0.2em] group-hover:opacity-90",
            variant === "dark" ? "text-muted-foreground group-hover:text-primary/80" : "text-white/65"
          )}
        >
          Investment
        </span>
      </span>
    </Link>
  );
}
