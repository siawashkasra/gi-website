import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/data/projects";
import { projectTypeLabels } from "@/data/projects";
import { formatProjectStatusLabel } from "@/lib/project-status";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function statusPillClass(status: string) {
  const s = status.toLowerCase();
  if (s.includes("deliver")) return "border-[#2f6ea5]/55 bg-[#2f6ea5]/25 text-white";
  if (s.includes("develop")) return "border-white/35 bg-white/15 text-white";
  if (s.includes("operat")) return "border-white/30 bg-black/25 text-white";
  return "border-white/25 bg-black/25 text-white/95";
}

type ProjectListingCardProps = { project: Project; priority?: boolean };

export function ProjectListingCard({ project, priority }: ProjectListingCardProps) {
  const statusLabel = formatProjectStatusLabel(project.status);
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
      <Card className="relative h-full min-h-[24rem] overflow-hidden border border-border bg-primary py-0 shadow-xl ring-0 transition-all duration-500 ease-out hover:scale-100 hover:shadow-2xl sm:min-h-[26rem]">
        <div className="relative min-h-[20rem] flex-1 overflow-hidden sm:min-h-[22rem]">
          <Image src={project.image} alt={project.name} fill className="object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.08]" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" priority={priority} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f4e79]/72 from-38% via-[#1f4e79]/36 via-58% to-[#1f4e79]/10 to-100% transition-opacity duration-500 group-hover:from-[#1f4e79]/80 group-hover:via-[#1f4e79]/44" aria-hidden />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-5 sm:top-5">
            <span className="rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/95 backdrop-blur-md">{projectTypeLabels[project.type]}</span>
            <span className={cn("rounded-full border px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] backdrop-blur-md", statusPillClass(project.status))}>{statusLabel}</span>
          </div>
          <span className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 sm:right-5 sm:top-5">
            <ArrowUpRight className="size-5" aria-hidden />
          </span>
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <h3 className="font-serif text-xl font-semibold tracking-tight text-white sm:text-2xl sm:leading-tight md:text-[1.65rem]">{project.name}</h3>
            <p className="mt-2 flex items-center gap-2 text-sm text-white/85">
              <MapPin className="size-4 shrink-0 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" aria-hidden />
              <span>{project.location}</span>
            </p>
          </div>
        </div>
        <CardContent className="space-y-4 border-t border-border bg-muted p-6">
          <p className="text-xs font-normal tabular-nums text-muted-foreground">
            {formatProjectStatusLabel(project.status)} · {project.year}
            {project.area !== "—" ? ` · ${project.area}` : ""}
          </p>
          <p className="line-clamp-3 font-sans text-sm font-normal leading-relaxed text-foreground sm:text-[0.9375rem]">{project.excerpt}</p>
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary transition-colors group-hover:text-primary/90">
            View details
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
