export const INSTAGRAM_HANDLE = "aysanarmytraining";
export const INSTAGRAM_URL = "https://www.instagram.com/aysanarmytraining";

/**
 * Reel permalinks shown in the gallery. Add the full URL of each reel
 * (e.g. "https://www.instagram.com/reel/Cxxxxxxxxxx/") and it renders as an
 * embedded, playable reel.
 */
export const reelUrls: string[] = [];

/** Instagram's official embed URL for a reel/post permalink. */
export function toEmbedUrl(url: string) {
  const clean = url.split("?")[0]?.replace(/\/$/, "") ?? url;
  return `${clean}/embed/captioned/`;
}
