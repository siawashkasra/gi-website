import Link from "next/link";
import { cn } from "@/lib/utils";

export function AdminPageHeader({ title, description, breadcrumbs }: { title: string; description?: string; breadcrumbs?: { label: string; href?: string }[] }) {
  return (
    <header className="mb-8 border-b border-border/70 pb-6">
      {breadcrumbs?.length ? (
        <nav className="mb-2 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          {breadcrumbs.map((b, i) => (
            <span key={`${b.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 ? <span aria-hidden>/</span> : null}
              {b.href ? (
                <Link href={b.href} className="hover:text-primary">
                  {b.label}
                </Link>
              ) : (
                <span className="text-foreground">{b.label}</span>
              )}
            </span>
          ))}
        </nav>
      ) : null}
      <h1 className="font-heading text-2xl font-semibold tracking-tight text-gi-navy sm:text-3xl">{title}</h1>
      {description ? <p className={cn("mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground")}>{description}</p> : null}
    </header>
  );
}
