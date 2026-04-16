"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectType } from "@/data/projects";
import { projectTypeLabels } from "@/data/projects";
import { ProjectListingCard } from "@/components/projects/project-listing-card";
import { cn } from "@/lib/utils";

type FilterId = "all" | ProjectType;

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "All projects" },
  { id: "residential", label: projectTypeLabels.residential },
  { id: "commercial", label: projectTypeLabels.commercial },
  { id: "mixed-use", label: projectTypeLabels["mixed-use"] },
];

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<FilterId>("all");
  const counts = useMemo(() => {
    const byType: Record<ProjectType, number> = { residential: 0, commercial: 0, "mixed-use": 0 };
    for (const p of projects) byType[p.type] += 1;
    return { all: projects.length, ...byType };
  }, [projects]);
  const filtered = useMemo(() => (active === "all" ? projects : projects.filter((p) => p.type === active)), [active, projects]);
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span>
          {active !== "all" ? <span className="text-muted-foreground"> {filtered.length === 1 ? "project" : "projects"}</span> : <span className="text-muted-foreground"> developments</span>}
        </p>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by project type">
          {filters.map((f) => {
            const count = f.id === "all" ? counts.all : counts[f.id];
            const pressed = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={pressed}
                aria-controls="projects-grid"
                id={`tab-${f.id}`}
                onClick={() => setActive(f.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300",
                  pressed
                    ? "border-primary bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_var(--color-primary)]"
                    : "border-border/80 bg-background text-foreground hover:border-primary/35 hover:bg-muted/50"
                )}
              >
                {f.label}
                <span
                  className={cn(
                    "flex min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[0.7rem] font-semibold tabular-nums",
                    pressed ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div id="projects-grid" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-10">
        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border/80 bg-muted/20 py-16 text-center text-muted-foreground">No projects in this category yet.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <div key={`${active}-${p.slug}`} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: `${Math.min(i, 5) * 45}ms` }}>
                <ProjectListingCard project={p} priority={i < 3} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
