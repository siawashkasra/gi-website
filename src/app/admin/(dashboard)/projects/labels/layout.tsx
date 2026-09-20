import { ProjectsLabelsEditorShell } from "@/components/admin/projects-labels-editor-shell";

export default function ProjectsLabelsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectsLabelsEditorShell />
      {children}
    </>
  );
}
