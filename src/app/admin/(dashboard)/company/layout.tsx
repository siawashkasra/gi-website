import { CompanyEditorShell } from "@/components/admin/company-editor-shell";

export default function CompanyEditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CompanyEditorShell />
      {children}
    </>
  );
}
