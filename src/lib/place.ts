/**
 * Shared, browser-safe types and constants for the club's Google Maps place
 * record. Verified from the shared Google Maps link:
 * https://maps.app.goo.gl/nDPd9NEV24cjBFSw8
 */

export const PLACE_ID = "ChIJsdZShV_PyhQRngHbTiO1dcs";
export const MAPS_SHORT_URL = "https://maps.app.goo.gl/nDPd9NEV24cjBFSw8";
export const PLACE_LAT = 41.0452857;
export const PLACE_LNG = 29.1806379;
export const CLUB_NAME = "Aysan Army Elite Training Club";

export type PlaceReview = {
  id: string;
  rating: number | null;
  text: string;
  authorName: string;
  authorPhotoUrl: string | null;
  authorUri: string | null;
  relativeTime: string | null;
  publishTime: string | null;
  reviewUri: string | null;
};

export type PlaceData = {
  name: string;
  address: string | null;
  nationalPhone: string | null;
  internationalPhone: string | null;
  websiteUri: string | null;
  rating: number | null;
  userRatingCount: number | null;
  openNow: boolean | null;
  weekdayDescriptions: string[];
  googleMapsUri: string;
  primaryType: string | null;
  reviews: PlaceReview[];
  photoUrls: string[];
  lat: number;
  lng: number;
};

/** Digits-only phone for tel:/wa.me links. */
export function toDialable(phone: string | null): string | null {
  if (!phone) return null;
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.length >= 10 ? digits : null;
}

/** Always returns a wa.me link; normalises Turkish local formats to +90. */
export function toWhatsApp(phone: string | null): string {
  const dialable = toDialable(phone);
  let digits = (dialable ?? "").replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `90${digits.slice(1)}`;
  else if (digits.length === 10) digits = `90${digits}`;
  return `https://wa.me/${digits || "905437800768"}`;
}

