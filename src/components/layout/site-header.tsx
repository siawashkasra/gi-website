"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { LogoMark } from "@/components/shared/logo-mark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { projects } from "@/data/projects";

const navLinkClass = "text-sm font-medium text-foreground/80 transition-colors hover:text-foreground";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 shadow-sm shadow-primary/5 backdrop-blur-xl supports-[backdrop-filter]:bg-background/90">
      <div className="ds-container flex h-[4.25rem] items-center justify-between gap-4">
        <LogoMark />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          <Link href="/" className={`${navLinkClass} rounded-lg px-3 py-2`}>
            Home
          </Link>
          <NavigationMenu>
            <NavigationMenuList className="gap-0">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9 bg-transparent px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground data-open:bg-muted/80">
                  Projects
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid min-w-[260px] gap-0.5 p-2">
                    <li>
                      <NavigationMenuLink href="/projects" className="font-medium" closeOnClick>
                        All projects
                      </NavigationMenuLink>
                    </li>
                    {projects.map((p) => (
                      <li key={p.slug}>
                        <NavigationMenuLink href={`/projects/${p.slug}`} closeOnClick>
                          <span className="font-medium">{p.name}</span>
                          <span className="block text-xs font-normal text-muted-foreground">{p.category}</span>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Link href="/jobs" className={`${navLinkClass} rounded-lg px-3 py-2`}>
            Jobs
          </Link>
          <Link href="/complaint" className={`${navLinkClass} rounded-lg px-3 py-2`}>
            Complaint
          </Link>
          <Link href="/contact" className={`${navLinkClass} rounded-lg px-3 py-2`}>
            Contact
          </Link>
        </nav>
        <div className="hidden md:block">
          <Button render={<Link href="/contact" />} nativeButton={false} size="sm" className="h-10 rounded-xl px-5 font-semibold">
            Inquire
          </Button>
        </div>
        <Sheet>
          <SheetTrigger className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-muted md:hidden" aria-label="Open menu">
            <Menu className="size-4" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(100%,20rem)]">
            <SheetHeader>
              <SheetTitle className="font-serif text-left">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4 pb-6" aria-label="Mobile">
              <Link href="/" className="rounded-lg px-3 py-3 text-base font-medium hover:bg-muted">
                Home
              </Link>
              <Link href="/projects" className="rounded-lg px-3 py-3 text-base font-medium hover:bg-muted">
                Projects
              </Link>
              {projects.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="rounded-lg px-3 py-2.5 pl-6 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                  {p.name}
                </Link>
              ))}
              <Link href="/jobs" className="rounded-lg px-3 py-3 text-base font-medium hover:bg-muted">
                Jobs
              </Link>
              <Link href="/complaint" className="rounded-lg px-3 py-3 text-base font-medium hover:bg-muted">
                Complaint
              </Link>
              <Link href="/contact" className="rounded-lg px-3 py-3 text-base font-medium hover:bg-muted">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
