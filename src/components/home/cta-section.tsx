import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/contact";

export function CtaSection() {
  return (
    <section id="contact-cta" className="ds-section border-t border-border bg-primary text-primary-foreground">
      <div className="ds-container">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            <h2 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">Get in touch</h2>
            <p className="mt-5 font-sans text-lg font-normal leading-relaxed text-white/85">Serious inquiries about projects, partnerships, or services — reach us directly or send a message.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={contact.mailtoHref} className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/15">
                <Mail className="size-4 shrink-0 text-white/90" aria-hidden />
                Email
              </a>
              <a href={contact.telHref} className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/15">
                <Phone className="size-4 shrink-0 text-white/90" aria-hidden />
                Mobile
              </a>
              <a href={contact.telLandlineHref} className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/15">
                <Phone className="size-4 shrink-0 text-white/90" aria-hidden />
                Landline
              </a>
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-[#25D366]/50 bg-[#25D366]/20 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-[#25D366]/35">
                <MessageCircle className="size-4 shrink-0" aria-hidden />
                WhatsApp
              </a>
            </div>
            <p className="mt-8 font-sans text-sm text-white/70">
              Hiring? See open roles on our{" "}
              <Link href="/jobs" className="font-semibold text-white underline-offset-4 transition-colors hover:text-[#7eb8e8] hover:underline">
                Jobs
              </Link>{" "}
              page.
            </p>
            <Button render={<Link href="/contact" />} nativeButton={false} variant="outline" size="sm" className="mt-6 h-10 border-white/35 bg-transparent text-white hover:bg-white/10 hover:text-white">
              Full contact page & map
            </Button>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white p-6 text-foreground shadow-2xl sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Send a message</p>
            <ContactForm compact />
          </div>
        </div>
      </div>
    </section>
  );
}
