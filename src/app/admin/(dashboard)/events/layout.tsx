import { Suspense } from "react";
import { EventsEditorShell } from "@/components/admin/events-editor-shell";

export default function EventsEditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
        <EventsEditorShell />
      </Suspense>
      {children}
    </>
  );
}
