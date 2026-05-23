"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Briefcase, Building2, Calendar, ExternalLink, FolderKanban, Home, Image, LayoutDashboard, LogOut, Menu, Network, Palette, Settings, Users } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const overviewLinks = [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true }] as const;
const pageLinks = [
  { href: "/admin/home", label: "Home", icon: Home },
  { href: "/admin/company", label: "Company profile", icon: Building2 },
  { href: "/admin/companies", label: "Companies", icon: Network },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
] as const;
const mediaLinks = [
  { href: "/admin/heroes", label: "Page heroes", icon: Image },
  { href: "/admin/library", label: "Media library", icon: Image },
] as const;
const siteLinks = [
  { href: "/admin/brand", label: "Brand & logos", icon: Palette },
  { href: "/admin/settings", label: "Site settings", icon: Settings },
] as const;

function NavGroup({ title, links, pathname }: { title: string; links: readonly { href: string; label: string; icon: typeof Home; exact?: boolean }[]; pathname: string }) {
  return (
    <div className="px-3 py-2">
      <p className="px-3 pb-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground/90">{title}</p>
      <div className="flex flex-col gap-0.5">
        {links.map((l) => {
          const active = "exact" in l && l.exact ? pathname === l.href : pathname === l.href || pathname.startsWith(`${l.href}/`);
          const Icon = l.icon;
          return (
            <Link key={l.href} href={l.href} data-active={active} className="admin-nav-link flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-foreground/80">
              <Icon className="size-4 shrink-0 opacity-75" aria-hidden />
              {l.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SidebarNav({ pathname }: { pathname: string }) {
  return (
    <>
      <div className="admin-sidebar-brand px-5 py-6">
        <p className="font-heading text-lg font-semibold tracking-tight">Gulbahar CMS</p>
        <p className="mt-1 text-xs text-white/65">Content · Media · Brand</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-3">
        <NavGroup title="Overview" links={overviewLinks} pathname={pathname} />
        <NavGroup title="Pages" links={pageLinks} pathname={pathname} />
        <NavGroup title="Media" links={mediaLinks} pathname={pathname} />
        <NavGroup title="Site" links={siteLinks} pathname={pathname} />
      </nav>
      <div className="border-t border-border px-5 py-4 text-xs text-muted-foreground">
        <p>Changes publish instantly on save.</p>
      </div>
    </>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <div className="admin-cms flex min-h-screen flex-col bg-[var(--admin-surface)]">
      <header className="admin-topbar sticky top-0 z-40 flex h-[3.25rem] shrink-0 items-center justify-between px-4 text-white sm:px-6">
        <div className="flex items-center gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon-sm" className="text-white hover:bg-white/10 lg:hidden" aria-label="Open menu"><Menu className="size-5" /></Button>} />
            <SheetContent side="left" className="w-[var(--admin-sidebar)] p-0">
              <div className="admin-sidebar flex h-full flex-col">
                <SidebarNav pathname={pathname} />
              </div>
            </SheetContent>
          </Sheet>
          <span className="font-heading text-sm font-semibold lg:hidden">Gulbahar CMS</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-3">
          <div className="hidden items-center gap-1 rounded-lg bg-white/10 p-1 text-xs sm:flex">
            <Link href="/en" target="_blank" className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-white/80 hover:bg-white/10 hover:text-white">
              EN <ExternalLink className="size-3 opacity-70" />
            </Link>
            <Link href="/fa-AF" target="_blank" className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-white/80 hover:bg-white/10 hover:text-white">
              FA <ExternalLink className="size-3 opacity-70" />
            </Link>
            <Link href="/ps" target="_blank" className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-white/80 hover:bg-white/10 hover:text-white">
              PS <ExternalLink className="size-3 opacity-70" />
            </Link>
          </div>
          <button type="button" onClick={logout} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-white/85 hover:bg-white/10">
            <LogOut className="size-4" /> <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>
      <div className="flex min-h-0 flex-1">
        <aside className="admin-sidebar hidden w-[var(--admin-sidebar)] shrink-0 flex-col lg:flex">
          <SidebarNav pathname={pathname} />
        </aside>
        <main className={cn("mx-auto min-w-0 w-full flex-1 px-4 py-6 sm:px-8 sm:py-8", pathname === "/admin" ? "max-w-6xl" : pathname.startsWith("/admin/company") || pathname.startsWith("/admin/home") || pathname.startsWith("/admin/jobs") || pathname === "/admin/team" || pathname.startsWith("/admin/events") || pathname.startsWith("/admin/companies") || (pathname.startsWith("/admin/projects/") && pathname !== "/admin/projects") || pathname.startsWith("/admin/heroes") || pathname.startsWith("/admin/settings") ? "max-w-[100rem]" : "max-w-5xl xl:max-w-6xl")}>{children}</main>
      </div>
    </div>
  );
}
