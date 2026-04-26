"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/heroes", label: "Page heroes" },
  { href: "/admin/home-sections", label: "Home sections" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/hero-sidebar", label: "Hero sidebar" },
  { href: "/admin/units", label: "Unit listings" },
  { href: "/admin/companies", label: "Companies" },
  { href: "/admin/team", label: "Team" },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <header className="flex h-14 shrink-0 items-center justify-end border-b border-border bg-card px-6">
        <button type="button" onClick={logout} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
          Sign out
        </button>
      </header>
      <div className="flex min-h-0 flex-1">
        <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-card">
          <div className="border-b border-border p-4">
            <p className="font-heading font-semibold text-gi-navy">GI media</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
          <nav className="flex flex-1 flex-col gap-0.5 p-2">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={cn("rounded-md px-3 py-2 text-sm font-medium", pathname === l.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted")}>
                {l.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="min-w-0 flex-1 p-8">{children}</div>
      </div>
    </div>
  );
}
