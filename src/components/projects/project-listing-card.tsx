import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { projectTypeLabels } from "@/data/projects";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function statusStyles(status: string) {
  const s = status.toLowerCase();
  if (s.includes("deliver")) return "border-primary/35 bg-primary/[0.1] text-foreground";
  if (s.includes("develop")) return "border-foreground/12 bg-muted text-foreground";
  if (s.includes("operat")) return "border-border bg-foreground/[0.06] text-foreground";
  return "border-border bg-muted/80 text-muted-foreground";
}

type ProjectListingCardProps = { project: Project; priority?: boolean };

export function ProjectListingCard({ project, priority }: ProjectListingCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
      <Card className="relative h-full overflow-hidden border-border/60 bg-card py-0 shadow-md transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_28px_56px_-16px_rgba(0,0,0,0.22)] hover:shadow-primary/[0.08]">
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[5/3]">
          <Image src={project.image} alt={project.name} fill className="object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.05] group-hover:brightness-[1.03]" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" priority={priority} />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent opacity-95 transition-opacity duration-500 group-hover:from-foreground/75" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <span className="inline-flex rounded-full border border-white/25 bg-black/30 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/95 backdrop-blur-md">{projectTypeLabels[project.type]}</span>
            <h3 className="mt-3 font-serif text-xl font-medium tracking-tight text-white sm:text-2xl sm:leading-tight">{project.name}</h3>
          </div>
          <span className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 sm:size-11">
            <ArrowUpRight className="size-5" aria-hidden />
          </span>
        </div>
        <CardContent className="space-y-4 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-semibold", statusStyles(project.status))}>{project.status}</span>
          </div>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem] sm:leading-relaxed">{project.excerpt}</p>
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-colors group-hover:text-primary/80">
            View details
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
