import { cn } from "@/lib/utils";

export function AdminBanner({ tone, children }: { tone: "success" | "error" | "info"; children: React.ReactNode }) {
  return (
    <p role="status" className={cn("rounded-lg px-3 py-2 text-sm leading-relaxed", tone === "success" ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300" : tone === "info" ? "bg-sky-50 text-sky-950 dark:bg-sky-950/40 dark:text-sky-200" : "bg-destructive/10 text-destructive")}>
      {children}
    </p>
  );
}
