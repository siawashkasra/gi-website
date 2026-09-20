"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { AdminEditorLayout } from "@/components/admin/admin-editor-layout";
import { AdminSectionPreviewPanel } from "@/components/admin/admin-section-preview-panel";
import { CmsSectionPreview } from "@/components/admin/cms-section-preview";
import { CmsDocumentProvider, useCmsDocumentContext } from "@/components/admin/cms-document-provider";
import { CmsEditorToolbar } from "@/components/admin/cms-editor-toolbar";
import { useProjectPublish } from "@/components/admin/project-publish-bar";
import { ProjectSectionFields } from "@/components/admin/project-section-fields";
import { ProjectMediaAdmin } from "@/components/admin/project-media-admin";
import { ProjectHeroSidebarAdmin } from "@/components/admin/project-hero-sidebar-admin";
import { ProjectListingsAdmin } from "@/components/admin/project-listings-admin";
import { ProjectSidebarPreview } from "@/components/admin/previews/project-sidebar-preview";
import { LocaleTabs, type CmsLocaleId } from "@/components/admin/locale-tabs";
import { buildProjectEditorSections } from "@/lib/admin/editor-sections";
import type { Project } from "@/data/projects";
import type { MediaSlotCurrent } from "@/components/admin/media-slot-editor";
import type { ResolvedHeroSidebar } from "@/lib/project-hero-sidebar-types";

type RegistryPublish = { isRegistry: true; published: boolean };

function ProjectBackLink() {
  return <Link href="/admin/projects" className="mb-4 inline-block text-sm text-primary hover:underline">← All projects</Link>;
}

function usePublishHeader(registryPublish: RegistryPublish | null, slug: string) {
  const publish = useProjectPublish(slug, registryPublish?.published ?? false);
  if (!registryPublish) return { headerAction: undefined, headerBelow: undefined };
  return { headerAction: publish.controls, headerBelow: publish.feedbackBanner };
}

function ProjectCmsEditorInner({ project, section, placements, listingOptions, supportsUnitListings, registryPublish }: { project: Project; section: string; placements: Record<string, MediaSlotCurrent>; listingOptions: { slug: string; name: string }[]; supportsUnitListings: boolean; registryPublish: RegistryPublish | null }) {
  const ctx = useCmsDocumentContext();
  const { headerAction, headerBelow } = usePublishHeader(registryPublish, project.slug);
  const sections = buildProjectEditorSections(project.slug, supportsUnitListings);
  const preview = <CmsSectionPreview domain="project" section={section} locale={ctx.locale} data={ctx.data} sections={sections} />;
  const fields = <ProjectSectionFields section={section} project={project} placements={placements} listingOptions={listingOptions} />;
  return (
    <AdminEditorLayout pageTitle={project.name} pageDescription="Review current copy, then edit and save per language." sections={sections} activeSlug={section} preview={preview} headerAction={headerAction} headerBelow={headerBelow} toolbar={<><ProjectBackLink /><CmsEditorToolbar locale={ctx.locale} onLocaleChange={ctx.setLocale} completeness={ctx.completeness} onCopyFromEnglish={ctx.copyFromEnglish} source={ctx.source} error={ctx.error} feedback={ctx.feedback} dirty={ctx.dirty} busy={ctx.busy} loading={ctx.loading} onSave={() => ctx.save((p) => p as Record<string, unknown>)}>{fields}</CmsEditorToolbar></>} />
  );
}

function ProjectAuxEditorInner({ project, section, listingOptions, supportsUnitListings, registryPublish }: { project: Project; section: string; listingOptions: { slug: string; name: string }[]; supportsUnitListings: boolean; registryPublish: RegistryPublish | null }) {
  const { headerAction, headerBelow } = usePublishHeader(registryPublish, project.slug);
  const sections = buildProjectEditorSections(project.slug, supportsUnitListings);
  const [locale, setLocale] = useState<CmsLocaleId>("en");
  const [sidebarResolved, setSidebarResolved] = useState<ResolvedHeroSidebar | null>(null);
  const preview = section === "sidebar" ? (
    <AdminSectionPreviewPanel locale={locale} sectionLabel="Hero sidebar" publicHref={`/${locale}/projects/${project.slug}`} empty={!sidebarResolved?.intro.title?.trim()}>
      <ProjectSidebarPreview resolved={sidebarResolved} />
    </AdminSectionPreviewPanel>
  ) : (
    <AdminSectionPreviewPanel locale={locale} sectionLabel="Unit listings" publicHref={`/${locale}/projects/${project.slug}#available-units`} empty={false}>
      <p className="text-muted-foreground">Unit cards use translated labels where set. Type and availability labels come from site translations.</p>
    </AdminSectionPreviewPanel>
  );
  const editor = (
    <>
      <ProjectBackLink />
      {section === "sidebar" ? <ProjectHeroSidebarAdmin fixedProjectSlug={project.slug} projectOptions={[{ slug: project.slug, name: project.name }]} locale={locale} onLocaleChange={setLocale} onResolvedChange={setSidebarResolved} /> : <ProjectListingsAdmin fixedProjectSlug={project.slug} projectOptions={listingOptions} />}
    </>
  );
  return <AdminEditorLayout pageTitle={project.name} pageDescription="Review content for this language, then edit and save." sections={sections} activeSlug={section} preview={preview} headerAction={headerAction} headerBelow={headerBelow} toolbar={editor} />;
}

function ProjectMediaEditorInner({ project, section, placements, supportsUnitListings, registryPublish }: { project: Project; section: string; placements: Record<string, MediaSlotCurrent>; supportsUnitListings: boolean; registryPublish: RegistryPublish | null }) {
  const { headerAction, headerBelow } = usePublishHeader(registryPublish, project.slug);
  const sections = buildProjectEditorSections(project.slug, supportsUnitListings);
  return (
    <AdminEditorLayout pageTitle={project.name} pageDescription="Hero and gallery images for this project." sections={sections} activeSlug={section} preview={<CmsSectionPreview domain="project" section="media" locale="en" sections={sections} />} headerAction={headerAction} headerBelow={headerBelow} toolbar={<><ProjectBackLink /><ProjectMediaAdmin fixedProjectSlug={project.slug} slugs={[{ slug: project.slug, name: project.name }]} placements={placements} projects={[project]} /></>} />
  );
}

export function ProjectEditorShell({ project, placements, listingOptions, supportsUnitListings, registryPublish }: { project: Project; placements: Record<string, MediaSlotCurrent>; listingOptions: { slug: string; name: string }[]; supportsUnitListings: boolean; registryPublish: RegistryPublish | null }) {
  const params = useParams();
  const projectSlug = typeof params.slug === "string" ? params.slug : "";
  const section = typeof params.section === "string" ? params.section : "basics";
  if (project.slug !== projectSlug) notFound();
  const sections = buildProjectEditorSections(projectSlug, supportsUnitListings);
  if (!sections.some((s) => s.slug === section)) notFound();
  const cmsSections = new Set(["basics", "overview", "mission", "timeline", "features"]);
  if (cmsSections.has(section)) {
    return (
      <CmsDocumentProvider entityType="project" entityKey={projectSlug} merge onSaveTransform={(p) => p as Record<string, unknown>}>
        <ProjectCmsEditorInner project={project} section={section} placements={placements} listingOptions={listingOptions} supportsUnitListings={supportsUnitListings} registryPublish={registryPublish} />
      </CmsDocumentProvider>
    );
  }
  if (section === "media") {
    return <ProjectMediaEditorInner project={project} section={section} placements={placements} supportsUnitListings={supportsUnitListings} registryPublish={registryPublish} />;
  }
  return <ProjectAuxEditorInner project={project} section={section} listingOptions={listingOptions} supportsUnitListings={supportsUnitListings} registryPublish={registryPublish} />;
}
