export type AdminEditorSection = { slug: string; label: string; href: string; previewPath: string; previewHash?: string; description: string };

export const companyEditorSections: AdminEditorSection[] = [
  { slug: "hero", label: "Hero", href: "/admin/company/hero", previewPath: "/company", description: "Subtitle under the company page hero." },
  { slug: "about", label: "About", href: "/admin/company/about", previewPath: "/company", previewHash: "#about-full", description: "Headline and body paragraphs." },
  { slug: "mission-vision", label: "Mission & vision", href: "/admin/company/mission-vision", previewPath: "/company", previewHash: "#mission-vision", description: "Mission and vision statements." },
  { slug: "snapshot", label: "Snapshot", href: "/admin/company/snapshot", previewPath: "/company", previewHash: "#snapshot-full", description: "Key facts table on the company page." },
  { slug: "values", label: "Core values", href: "/admin/company/values", previewPath: "/company", previewHash: "#values", description: "Value cards with icons." },
  { slug: "core-areas", label: "Business areas", href: "/admin/company/core-areas", previewPath: "/company", previewHash: "#core-areas", description: "Core business area blocks." },
  { slug: "strengths", label: "Strengths", href: "/admin/company/strengths", previewPath: "/company", previewHash: "#strengths", description: "Competitive strength items." },
  { slug: "governance", label: "Governance", href: "/admin/company/governance", previewPath: "/company", previewHash: "#governance", description: "Governance intro paragraphs." },
  { slug: "portfolio", label: "Portfolio", href: "/admin/company/portfolio", previewPath: "/company", previewHash: "#portfolio", description: "Portfolio overview table." },
  { slug: "ceo", label: "CEO profile", href: "/admin/company/ceo", previewPath: "/company", previewHash: "#ceo", description: "CEO quote, name, and title." },
  { slug: "growth-clients", label: "Growth & clients", href: "/admin/company/growth-clients", previewPath: "/company", previewHash: "#market", description: "Growth outlook and clients block." },
  { slug: "international", label: "International", href: "/admin/company/international", previewPath: "/company", previewHash: "#market", description: "UAE, regional, and cross-border copy." },
  { slug: "market", label: "Market positioning", href: "/admin/company/market", previewPath: "/company", previewHash: "#market", description: "Market theme cards." },
  { slug: "standards", label: "Tech & sustainability", href: "/admin/company/standards", previewPath: "/company", previewHash: "#standards-full", description: "Technology and sustainability narratives." },
  { slug: "org", label: "Organization", href: "/admin/company/org", previewPath: "/company", previewHash: "#org", description: "Org chart structure and roles." },
];

export const homeEditorSections: AdminEditorSection[] = [
  { slug: "testimonials", label: "Testimonials", href: "/admin/home/testimonials", previewPath: "/", previewHash: "#testimonials", description: "Partner quotes on the homepage." },
  { slug: "milestones", label: "Milestones", href: "/admin/home/milestones", previewPath: "/", previewHash: "#milestones", description: "Timeline on the homepage." },
  { slug: "standards", label: "Standards pillars", href: "/admin/home/standards", previewPath: "/", previewHash: "#standards", description: "Three standards cards." },
  { slug: "images", label: "Section images", href: "/admin/home/images", previewPath: "/", previewHash: "#about", description: "About, milestones, and CEO images." },
  { slug: "featured", label: "Featured projects", href: "/admin/home/featured", previewPath: "/", previewHash: "#featured-projects", description: "Projects highlighted on the home page." },
];

export const jobsEditorSections: AdminEditorSection[] = [
  { slug: "intro", label: "Page intro", href: "/admin/jobs/intro", previewPath: "/jobs", description: "Headlines, body, and contact labels." },
  { slug: "announcements", label: "Open roles", href: "/admin/jobs/announcements", previewPath: "/jobs", previewHash: "#open-roles", description: "Published job announcements on the careers page." },
  { slug: "announcement-edit", label: "Edit role", href: "/admin/jobs/announcement-edit", previewPath: "/jobs", previewHash: "#open-roles", description: "Title, location, and description per language." },
  { slug: "sectors", label: "Sectors", href: "/admin/jobs/sectors", previewPath: "/jobs", description: "Three sector cards." },
  { slug: "footnotes", label: "Footnotes", href: "/admin/jobs/footnotes", previewPath: "/jobs", description: "Footer notes on the jobs page." },
];

export const eventsEditorSections: AdminEditorSection[] = [
  { slug: "list", label: "All events", href: "/admin/events/list", previewPath: "/events", description: "Upcoming events on the public events page." },
  { slug: "edit", label: "Edit event", href: "/admin/events/edit", previewPath: "/events", description: "Title, date, location, and summary per language." },
];

export const heroesEditorSections: AdminEditorSection[] = [
  { slug: "home", label: "Home", href: "/admin/heroes/home", previewPath: "/", description: "Main homepage hero image." },
  { slug: "home-mobile", label: "Home mobile", href: "/admin/heroes/home-mobile", previewPath: "/", description: "Optional mobile hero for the homepage." },
  { slug: "company", label: "Company", href: "/admin/heroes/company", previewPath: "/company", description: "Company page hero." },
  { slug: "jobs", label: "Jobs", href: "/admin/heroes/jobs", previewPath: "/jobs", description: "Jobs page hero." },
  { slug: "events", label: "Events", href: "/admin/heroes/events", previewPath: "/events", description: "Events page hero." },
  { slug: "projectsIndex", label: "Projects index", href: "/admin/heroes/projectsIndex", previewPath: "/projects", description: "Projects listing page hero." },
];

export const projectsLabelsSection: AdminEditorSection = { slug: "labels", label: "Type labels", href: "/admin/projects/labels", previewPath: "/projects", description: "Filter labels on the projects index." };

export function buildCompanyDirectorySections(slugs: { slug: string; name: string }[]): AdminEditorSection[] {
  return slugs.map((c) => ({ slug: c.slug, label: c.name, href: `/admin/companies/${c.slug}`, previewPath: `/companies/${c.slug}`, description: "Name, industry, and description in each language." }));
}

export function buildProjectEditorSections(projectSlug: string, includeListings: boolean): AdminEditorSection[] {
  const base: AdminEditorSection[] = [
    { slug: "basics", label: "Basics", href: `/admin/projects/${projectSlug}/basics`, previewPath: `/projects/${projectSlug}`, description: "Name, location, status, year, area, and excerpt." },
    { slug: "overview", label: "Overview", href: `/admin/projects/${projectSlug}/overview`, previewPath: `/projects/${projectSlug}`, previewHash: "#overview", description: "Long description and overview paragraphs." },
    { slug: "mission", label: "Mission & vision", href: `/admin/projects/${projectSlug}/mission`, previewPath: `/projects/${projectSlug}`, description: "Vision, mission, values, and strategic positioning." },
    { slug: "timeline", label: "Timeline", href: `/admin/projects/${projectSlug}/timeline`, previewPath: `/projects/${projectSlug}`, description: "Project timeline rows." },
    { slug: "features", label: "Features & stats", href: `/admin/projects/${projectSlug}/features`, previewPath: `/projects/${projectSlug}`, description: "Feature cards and key statistics." },
    { slug: "media", label: "Images", href: `/admin/projects/${projectSlug}/media`, previewPath: `/projects/${projectSlug}`, description: "Hero and gallery images." },
    { slug: "sidebar", label: "Hero sidebar", href: `/admin/projects/${projectSlug}/sidebar`, previewPath: `/projects/${projectSlug}`, description: "Sticky sidebar on the project page." },
  ];
  if (includeListings) base.push({ slug: "listings", label: "Unit listings", href: `/admin/projects/${projectSlug}/listings`, previewPath: `/projects/${projectSlug}`, description: "Property units for this project." });
  return base;
}

export function findEditorSection(sections: AdminEditorSection[], slug: string) {
  return sections.find((s) => s.slug === slug);
}
