import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="ds-section border-t border-border/60 bg-foreground text-background">
      <div className="ds-container">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">Discuss your next acquisition or partnership.</h2>
            <p className="mt-4 text-background/70">Our team responds to qualified inquiries regarding leasing, investment, and joint development.</p>
          </div>
          <Button render={<Link href="/contact" />} nativeButton={false} size="lg" className="h-11 shrink-0 bg-primary text-primary-foreground hover:bg-primary/90">
            Start a conversation
          </Button>
        </div>
      </div>
    </section>
  );
}
