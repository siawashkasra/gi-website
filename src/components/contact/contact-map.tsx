import { contact } from "@/lib/contact";
import { cn } from "@/lib/utils";

type ContactMapProps = { className?: string };

export function ContactMap({ className }: ContactMapProps) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border/60 bg-muted/20 shadow-sm ring-1 ring-gi-navy/[0.08]", className)}>
      <div className="aspect-[16/10] w-full min-h-[200px] sm:min-h-[240px]">
        <iframe title={`Office location — ${contact.address}`} src={contact.mapsEmbedUrl} className="h-full w-full border-0 grayscale-[0.15] contrast-[1.02]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border/60 bg-card/80 px-4 py-3 sm:px-5">
        <p className="text-xs leading-snug text-muted-foreground">{contact.address}</p>
        <a href={contact.mapsOpenUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-xs font-semibold uppercase tracking-wider text-primary underline-offset-4 hover:underline">
          Open map
        </a>
      </div>
    </div>
  );
}
