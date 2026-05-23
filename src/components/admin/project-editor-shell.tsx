"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { AdminEditorLayout } from "@/components/admin/admin-editor-layout";
import { AdminSectionPreviewPanel } from "@/components/admin/admin-section-preview-panel";
import { CmsSectionPreview } from "@/components/admin/cms-section-preview";
import { CmsDocumentProvider, useCmsDocumentContext } from "@/components/admin/cms-document-provider";
import { CmsEditorToolbar } from "@/components/admin/cms-editor-toolbar";
import { ProjectSectionFields } from "@/components/admin/project-section-fields";
import { ProjectMediaAdmin } from "@/components/admin/project-media-admin";
import { ProjectHeroSidebarAdmin } from "@/components/admin/project-hero-sidebar-admin";
import { ProjectListingsAdmin } from "@/components/admin/project-listings-admin";
import { ProjectSidebarPreview } from "@/components/admin/previews/project-sidebar-preview";
import { LocaleTabs, type CmsLocaleId } from "@/components/admin/locale-tabs";
import { buildProjectEditorSections } from "@/lib/admin/editor-sections";
import { getProjectBySlug } from "@/data/projects";
import { isUnitListingAdminProject } from "@/lib/media/unit-listing-projects";
import type { MediaSlotCurrent } from "@/components/admin/media-slot-editor";
import type { ResolvedHeroSidebar } from "@/lib/project-hero-sidebar-types";

function ProjectCmsEditorInner({ projectSlug, section, placements, listingOptions }: { projectSlug: string; section: string; placements: Record<string, MediaSlotCurrent>; listingOptions: { slug: string; name: string }[] }) {
  const ctx = useCmsDocumentContext();
  const project = getProjectBySlug(projectSlug);
  if (!project) return null;
  const sections = buildProjectEditorSections(projectSlug, isUnitListingAdminProject(projectSlug));
  const preview = <CmsSectionPreview domain="project" section={section} locale={ctx.locale} data={ctx.data} sections={sections} />;
  const fields = <ProjectSectionFields section={section} project={project} placements={placements} listingOptions={listingOptions} />;
  return (
    <AdminEditorLayout pageTitle={project.name} pageDescription="Review current copy, then edit and save per language." sections={sections} activeSlug={section} preview={preview} toolbar={<><Link href="/admin/projects" className="mb-4 inline-block text-sm text-primary hover:underline">← All projects</Link><CmsEditorToolbar locale={ctx.locale} onLocaleChange={ctx.setLocale} completeness={ctx.completeness} onCopyFromEnglish={ctx.copyFromEnglish} source={ctx.source} error={ctx.error} feedback={ctx.feedback} dirty={ctx.dirty} busy={ctx.busy} loading={ctx.loading} onSave={() => ctx.save((p) => p as Record<string, unknown>)}>{fields}</CmsEditorToolbar></>} />
  );
}

function ProjectAuxEditorInner({ projectSlug, section, listingOptions }: { projectSlug: string; section: string; listingOptions: { slug: string; name: string }[] }) {
  const project = getProjectBySlug(projectSlug);
  if (!project) return null;
  const sections = buildProjectEditorSections(projectSlug, isUnitListingAdminProject(projectSlug));
  const [locale, setLocale] = useState<CmsLocaleId>("en");
  const [sidebarResolved, setSidebarResolved] = useState<ResolvedHeroSidebar | null>(null);
  const preview = section === "sidebar" ? (
    <AdminSectionPreviewPanel locale={locale} sectionLabel="Hero sidebar" publicHref={`/${locale}/projects/${projectSlug}`} empty={!sidebarResolved?.intro.title?.trim()}>
      <ProjectSidebarPreview resolved={sidebarResolved} />
    </AdminSectionPreviewPanel>
  ) : (
    <AdminSectionPreviewPanel locale={locale} sectionLabel="Unit listings" publicHref={`/${locale}/projects/${projectSlug}#available-units`} empty={false}>
      <p className="text-muted-foreground">Unit cards use translated labels where set. Type and availability labels come from site translations.</p>
    </AdminSectionPreviewPanel>
  );
  const editor = (
    <>
      <Link href="/admin/projects" className="mb-4 inline-block text-sm text-primary hover:underline">← All projects</Link>
      {section === "sidebar" ? <ProjectHeroSidebarAdmin fixedProjectSlug={project.slug} projectOptions={[{ slug: project.slug, name: project.name }]} locale={locale} onLocaleChange={setLocale} onResolvedChange={setSidebarResolved} /> : <ProjectListingsAdmin fixedProjectSlug={project.slug} projectOptions={listingOptions} />}
    </>
  );
  return <AdminEditorLayout pageTitle={project.name} pageDescription="Review content for this language, then edit and save." sections={sections} activeSlug={section} preview={preview} toolbar={editor} />;
}

export function ProjectEditorShell({ placements, listingOptions }: { placements: Record<string, MediaSlotCurrent>; listingOptions: { slug: string; name: string }[] }) {
  const params = useParams();
  const projectSlug = typeof params.slug === "string" ? params.slug : "";
  const section = typeof params.section === "string" ? params.section : "basics";
  const project = getProjectBySlug(projectSlug);
  if (!project) notFound();
  const sections = buildProjectEditorSections(projectSlug, isUnitListingAdminProject(projectSlug));
  if (!sections.some((s) => s.slug === section)) notFound();
  const cmsSections = new Set(["basics", "overview", "mission", "timeline", "features"]);
  if (cmsSections.has(section)) {
    return (
      <CmsDocumentProvider entityType="project" entityKey={projectSlug} merge onSaveTransform={(p) => p as Record<string, unknown>}>
        <ProjectCmsEditorInner projectSlug={projectSlug} section={section} placements={placements} listingOptions={listingOptions} />
      </CmsDocumentProvider>
    );
  }
  if (section === "media") {
    const project = getProjectBySlug(projectSlug)!;
    const sections = buildProjectEditorSections(projectSlug, isUnitListingAdminProject(projectSlug));
    return (
      <AdminEditorLayout pageTitle={project.name} pageDescription="Hero and gallery images for this project." sections={sections} activeSlug={section} preview={<CmsSectionPreview domain="project" section="media" locale="en" sections={sections} />} toolbar={<><Link href="/admin/projects" className="mb-4 inline-block text-sm text-primary hover:underline">← All projects</Link><ProjectMediaAdmin fixedProjectSlug={project.slug} slugs={[{ slug: project.slug, name: project.name }]} meta={{ [project.slug]: { galleryLength: Math.max(project.gallery.length, 1) } }} placements={placements} projects={[project]} /></>} />
    );
  }
  return <ProjectAuxEditorInner projectSlug={projectSlug} section={section} listingOptions={listingOptions} />;
}
