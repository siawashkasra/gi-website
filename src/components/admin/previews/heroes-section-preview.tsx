"use client";

export function HeroesSectionPreview({ imageUrl, label }: { imageUrl?: string | null; label?: string }) {
  if (!imageUrl) return <p className="text-muted-foreground">No custom image yet — the site uses the default hero.</p>;
  return (
    <div className="space-y-2">
      <img src={imageUrl} alt="" className="aspect-[16/9] w-full rounded-lg object-cover" />
      {label ? <p className="text-xs text-muted-foreground">{label}</p> : null}
    </div>
  );
}
