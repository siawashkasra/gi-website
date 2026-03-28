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
    <div className={cn("space-y-16 lg:space-y-20", className)}>
      {showHeading ? (
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Contact" title="Begin a private conversation" description="Share your objectives and a director will respond to qualified inquiries." />
            <dl className="mt-12 space-y-6 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Address</dt>
                <dd className="mt-1 text-foreground">{contact.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</dt>
                <dd className="mt-1">
                  <a href={contact.mailtoHref} className="text-primary underline-offset-4 hover:underline">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</dt>
                <dd className="mt-1">
                  <a href={contact.telHref} className="text-primary underline-offset-4 hover:underline">
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <ContactForm />
        </div>
      )}
      <div className="grid gap-10 md:grid-cols-2 md:items-stretch">
        <div className="flex flex-col justify-center rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">WhatsApp</p>
          <p className="mt-2 text-sm text-muted-foreground">Prefer chat? Reach us on WhatsApp for a quick reply during business hours.</p>
          <Button
            render={<a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 sm:w-auto" />}
            nativeButton={false}
            className="h-11 border-0 bg-[#25D366] px-8 text-sm font-semibold text-white shadow-none hover:bg-[#20BD5A] hover:text-white"
          >
            <MessageCircle className="size-5 shrink-0" aria-hidden />
            Message on WhatsApp
          </Button>
        </div>
        <ContactMap />
      </div>
    </div>
  );
}
