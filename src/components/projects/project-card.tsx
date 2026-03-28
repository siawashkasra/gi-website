import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ProjectCardProps = { project: Project; priority?: boolean; className?: string };

export function ProjectCard({ project, priority, className }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className={cn("group block h-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", className)}>
      <Card className="relative h-full overflow-hidden border-border/70 bg-card py-0 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-primary/25 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)] hover:shadow-primary/5">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={project.image} alt={project.name} fill className="object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.06] group-hover:brightness-[1.02]" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" priority={priority} />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-foreground/15 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
          <Badge className="absolute left-4 top-4 border border-white/20 bg-black/35 text-[0.65rem] font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-black/45" variant="secondary">
            {project.category}
          </Badge>
        </div>
        <CardContent className="relative gap-0 p-0">
          <div className="space-y-3 p-6 pb-5">
            <h3 className="font-serif text-xl font-medium tracking-tight text-card-foreground transition-colors duration-300 group-hover:text-primary sm:text-[1.35rem]">{project.name}</h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{project.excerpt}</p>
            <div className="flex items-center gap-2 pt-1 text-sm text-foreground/85">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/18">
                <MapPin className="size-3.5" aria-hidden />
              </span>
              <span className="font-medium">{project.location}</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-6 py-4 transition-colors duration-300 group-hover:border-primary/15 group-hover:bg-primary/[0.04]">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground">View Project</span>
            <span className="flex size-9 items-center justify-center rounded-full border border-border/80 bg-background text-primary transition-all duration-300 group-hover:border-primary/35 group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
