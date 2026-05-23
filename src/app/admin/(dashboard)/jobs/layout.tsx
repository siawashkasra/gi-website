import { Suspense } from "react";
import { JobsEditorShell } from "@/components/admin/jobs-editor-shell";

export default function JobsEditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
        <JobsEditorShell />
      </Suspense>
      {children}
    </>
  );
}
