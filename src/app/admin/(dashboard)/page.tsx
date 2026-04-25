import Link from "next/link";

export default function AdminOverviewPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-gi-navy">Overview</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">Upload images and assign them to sections. Clearing an override restores the original file from the site codebase.</p>
      <ul className="mt-6 list-inside list-disc space-y-2 text-sm text-primary">
        <li>
          <Link href="/admin/heroes" className="underline-offset-2 hover:underline">
            Page heroes
          </Link>
        </li>
        <li>
          <Link href="/admin/home-sections" className="underline-offset-2 hover:underline">
            Home section images
          </Link>
        </li>
        <li>
          <Link href="/admin/projects" className="underline-offset-2 hover:underline">
            Project hero, gallery, listings
          </Link>
        </li>
        <li>
          <Link href="/admin/companies" className="underline-offset-2 hover:underline">
            Company logos
          </Link>
        </li>
        <li>
          <Link href="/admin/team" className="underline-offset-2 hover:underline">
            Team photos
          </Link>
        </li>
      </ul>
    </div>
  );
}
