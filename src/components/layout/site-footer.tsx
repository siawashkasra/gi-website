import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { LogoMark } from "@/components/shared/logo-mark";
import { Separator } from "@/components/ui/separator";
import { contact } from "@/lib/contact";
import { siteConfig } from "@/lib/site";
import { projects } from "@/data/projects";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="ds-container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <LogoMark variant="light" />
            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-white/70">{siteConfig.description}</p>
          </div>
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">Explore</p>
            <ul className="mt-4 space-y-3 font-sans text-sm">
              <li>
                <Link href="/" className="text-white/75 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-white/75 transition-colors hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/company" className="text-white/75 transition-colors hover:text-white">
                  Company
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-white/75 transition-colors hover:text-white">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/complaint" className="text-white/75 transition-colors hover:text-white">
                  Complaint
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/75 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#2f6ea5]">Portfolio</p>
            <ul className="mt-4 space-y-3 font-sans text-sm">
              {projects.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className="text-white/75 transition-colors hover:text-white">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator className="my-10 bg-white/15" />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="font-sans text-sm text-white/65">
            <p>{contact.address}</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
              <a href={contact.mailtoHref} className="underline-offset-4 hover:underline">
                {contact.email}
              </a>
              <span className="text-white/40">·</span>
              <a href={contact.telLandlineHref} className="underline-offset-4 hover:underline">
                {contact.phoneLandlineDisplay}
              </a>
              <span className="text-white/40">·</span>
              <a href={contact.telHref} className="underline-offset-4 hover:underline">
                {contact.phoneDisplay}
              </a>
              <span className="text-white/40">·</span>
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#7eb8e8] underline-offset-4 hover:underline">
                WhatsApp
              </a>
            </p>
            {siteConfig.social.instagram || siteConfig.social.facebook ? (
              <p className="mt-4 flex flex-wrap items-center gap-4">
                {siteConfig.social.instagram ? (
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white">
                    <Instagram className="size-4" aria-hidden />
                    Instagram
                  </a>
                ) : null}
                {siteConfig.social.facebook ? (
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white">
                    <Facebook className="size-4" aria-hidden />
                    Facebook
                  </a>
                ) : null}
              </p>
            ) : null}
          </div>
          <p className="font-sans text-xs text-white/50 lg:text-right">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
