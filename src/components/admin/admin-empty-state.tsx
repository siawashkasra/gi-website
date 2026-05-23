import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AdminEmptyState({ title, description, actionHref, actionLabel }: { title: string; description: string; actionHref?: string; actionLabel?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-8 py-14 text-center">
      <h3 className="font-heading text-lg font-semibold text-gi-navy">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      {actionHref && actionLabel ? (
        <Button render={<Link href={actionHref} />} nativeButton={false} className="mt-6" size="sm">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
