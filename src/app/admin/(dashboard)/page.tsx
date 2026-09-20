import Link from "next/link";
import { Building2, Calendar, FolderKanban, Image, LayoutGrid, Palette, Sparkles, Users } from "lucide-react";
import { fetchDashboardStats } from "@/lib/admin/dashboard-stats";

const quickLinks = [
  { href: "/admin/brand", label: "Brand & logos", desc: "Site logo, social image, header preview", icon: Palette, accent: "from-amber-500/20 to-amber-600/5" },
  { href: "/admin/home", label: "Home page", desc: "Sections with content preview", icon: LayoutGrid, accent: "from-blue-500/15 to-blue-600/5" },
  { href: "/admin/companies", label: "Companies", desc: "Logos and directory copy", icon: Building2, accent: "from-violet-500/15 to-violet-600/5" },
  { href: "/admin/projects", label: "Projects", desc: "Content, media, unit listings", icon: FolderKanban, accent: "from-emerald-500/15 to-emerald-600/5" },
  { href: "/admin/team", label: "Team", desc: "Bios and portraits", icon: Users, accent: "from-rose-500/15 to-rose-600/5" },
  { href: "/admin/events", label: "Events", desc: "Calendar and programmes", icon: Calendar, accent: "from-cyan-500/15 to-cyan-600/5" },
  { href: "/admin/heroes", label: "Page heroes", desc: "Hero images per route", icon: Image, accent: "from-slate-500/15 to-slate-600/5" },
  { href: "/admin/settings", label: "Settings", desc: "Contact and social links", icon: Sparkles, accent: "from-gi-navy/10 to-gi-gold/10" },
];

export default function AdminOverviewPage() {
  const stats = fetchDashboardStats();
  return (
    <div>
      <div className="admin-page-hero mb-8 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gi-gold">Gulbahar CMS</p>
        <h1 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-gi-navy sm:text-3xl">Welcome back</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">Manage the full website from one place — copy, images, logos, and listings. Every save goes live immediately.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Projects", value: stats.projectsCount },
          { label: "Unit listings", value: stats.listingsCount },
          { label: "Custom images", value: stats.customPlacementsCount },
          { label: "Uploaded assets", value: stats.assetCount },
        ].map((s) => (
          <div key={s.label} className="admin-stat-card p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-heading text-3xl font-semibold text-gi-navy">{s.value}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-10 font-heading text-lg font-semibold text-gi-navy">Manage content</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {quickLinks.map((l) => {
          const Icon = l.icon;
          return (
            <Link key={l.href} href={l.href} className="admin-quick-card group flex gap-4 p-5">
              <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${l.accent}`}>
                <Icon className="size-5 text-gi-navy opacity-80" />
              </div>
              <div>
                <p className="font-medium text-gi-navy group-hover:text-primary">{l.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{l.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
