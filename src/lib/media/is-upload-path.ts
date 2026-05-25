export function isUploadAssetPath(src: string): boolean {
  return src.startsWith("/uploads/");
}
