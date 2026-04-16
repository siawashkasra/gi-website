import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Project } from "@/data/projects";
import { formatProjectStatusLabel } from "@/lib/project-status";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ProjectCardProps = { project: Project; priority?: boolean; className?: string };

export function ProjectCard({ project, priority, className }: ProjectCardProps) {
  const statusLabel = formatProjectStatusLabel(project.status);
  return (
    <Link href={`/projects/${project.slug}`} className={cn("group block h-full min-h-[26rem] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-[30rem]", className)}>
      <Card className="relative h-full min-h-[inherit] overflow-hidden border border-border bg-primary py-0 shadow-xl ring-0 transition-all duration-500 ease-out hover:scale-100 hover:shadow-2xl">
        <Image src={project.image} alt={project.name} fill className="object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-110" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" priority={priority} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f4e79]/78 from-35% via-[#1f4e79]/44 via-55% to-[#1f4e79]/12 to-100% transition-opacity duration-500 group-hover:from-[#1f4e79]/86 group-hover:via-[#1f4e79]/52 group-hover:to-[#1f4e79]/16" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(47,110,165,0.12),transparent_55%)] opacity-70 transition-opacity duration-500 group-hover:opacity-90" aria-hidden />
        <div className="absolute left-5 top-5 flex flex-wrap gap-2 sm:left-6 sm:top-6">
          <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">{project.category}</span>
          <span className="rounded-full border border-[#2f6ea5]/55 bg-[#2f6ea5]/25 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">{statusLabel}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
          <h3 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-[1.75rem]">{project.name}</h3>
          <p className="mt-3 flex items-start gap-2 font-sans text-sm font-medium text-white/85 sm:text-base">
            <MapPin className="mt-0.5 size-4 shrink-0 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" aria-hidden />
            <span>{project.location}</span>
          </p>
          <p className="mt-2 text-xs font-medium tabular-nums tracking-wide text-white/65">
            {project.year}
            {project.area !== "—" ? ` · ${project.area}` : ""}
          </p>
          <p className="mt-4 max-h-0 overflow-hidden font-sans text-sm font-normal leading-relaxed text-white/75 opacity-0 transition-all duration-500 ease-out group-hover:max-h-24 group-hover:opacity-100">{project.excerpt}</p>
          <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-5 transition-colors duration-300 group-hover:border-white/25">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/90">View project</span>
            <span className="flex size-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-[#2f6ea5] group-hover:bg-[#2f6ea5]">
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
