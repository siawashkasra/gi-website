import Link from "next/link";
import { LogoMark } from "@/components/shared/logo-mark";
import { Separator } from "@/components/ui/separator";
import { contact } from "@/lib/contact";
import { siteConfig } from "@/lib/site";
import { projects } from "@/data/projects";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-foreground text-background">
      <div className="ds-container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <LogoMark variant="light" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-background/70">{siteConfig.description}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Explore</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/" className="text-background/75 transition-colors hover:text-background">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-background/75 transition-colors hover:text-background">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-background/75 transition-colors hover:text-background">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/complaint" className="text-background/75 transition-colors hover:text-background">
                  Complaint
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-background/75 transition-colors hover:text-background">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Portfolio</p>
            <ul className="mt-4 space-y-3 text-sm">
              {projects.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className="text-background/75 transition-colors hover:text-background">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator className="my-10 bg-background/15" />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-sm text-background/65">
            <p>{contact.address}</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
              <a href={contact.mailtoHref} className="underline-offset-4 hover:underline">
                {contact.email}
              </a>
              <span className="text-background/40">·</span>
              <a href={contact.telLandlineHref} className="underline-offset-4 hover:underline">
                {contact.phoneLandlineDisplay}
              </a>
              <span className="text-background/40">·</span>
              <a href={contact.telHref} className="underline-offset-4 hover:underline">
                {contact.phoneDisplay}
              </a>
              <span className="text-background/40">·</span>
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                WhatsApp
              </a>
            </p>
          </div>
          <p className="text-xs text-background/50">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
