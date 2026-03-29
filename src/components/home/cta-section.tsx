import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section id="contact-cta" className="ds-section border-t border-border/60 bg-foreground text-background">
      <div className="ds-container">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">Get in touch</h2>
            <p className="mt-4 text-background/70">Share your name, email, and message — we respond to serious inquiries about our projects and services.</p>
            <p className="mt-4 text-sm text-background/55">
              Hiring? See open roles on our{" "}
              <Link href="/jobs" className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary/90 hover:underline">
                Jobs
              </Link>{" "}
              page.
            </p>
          </div>
          <Button render={<Link href="/contact" />} nativeButton={false} size="lg" className="h-11 shrink-0 bg-primary text-primary-foreground hover:bg-primary/90">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
