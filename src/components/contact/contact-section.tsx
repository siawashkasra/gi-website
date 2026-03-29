import { MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactMap } from "@/components/contact/contact-map";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { contact } from "@/lib/contact";
import { cn } from "@/lib/utils";

type ContactSectionProps = {
  showHeading?: boolean;
  className?: string;
};

export function ContactSection({ showHeading = true, className }: ContactSectionProps) {
  return (
    <div className={cn("space-y-20 lg:space-y-24", className)}>
      {showHeading ? (
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <div className="flex flex-col">
            <SectionHeading eyebrow="Contact" title="Get in touch" description="Reach us by phone, email, or the form — we respond to serious inquiries regarding projects, partnerships, and services." />
            <dl className="mt-12 space-y-8 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Address</dt>
                <dd className="mt-2 text-base text-foreground">{contact.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Email</dt>
                <dd className="mt-2">
                  <a href={contact.mailtoHref} className="text-base font-medium text-primary underline-offset-4 transition-colors hover:text-[#2f6ea5] hover:underline">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Phone</dt>
                <dd className="mt-2 space-y-2">
                  <a href={contact.telLandlineHref} className="block text-base font-medium text-primary underline-offset-4 transition-colors hover:text-[#2f6ea5] hover:underline">
                    {contact.phoneLandlineDisplay}
                  </a>
                  <a href={contact.telHref} className="block text-base font-medium text-primary underline-offset-4 transition-colors hover:text-[#2f6ea5] hover:underline">
                    Mobile · {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-10 rounded-2xl border border-border bg-muted p-6 shadow-inner sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">WhatsApp</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Prefer chat? Message us on WhatsApp for a quick reply during business hours.</p>
              <Button
                render={<a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl sm:w-auto" />}
                nativeButton={false}
                className="h-12 border-0 bg-[#25D366] px-8 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-[#20BD5A] hover:text-white hover:shadow-xl"
              >
                <MessageCircle className="size-5 shrink-0" aria-hidden />
                Message on WhatsApp
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-primary/5 sm:p-10">
            <ContactForm />
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl rounded-2xl border border-border/50 bg-white p-6 shadow-xl sm:p-10">
          <ContactForm />
        </div>
      )}
      <div className="overflow-hidden rounded-2xl border border-border/50 shadow-lg">
        <ContactMap />
      </div>
    </div>
  );
}
