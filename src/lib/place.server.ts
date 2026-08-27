import {
  CLUB_NAME,
  MAPS_SHORT_URL,
  PLACE_ID,
  PLACE_LAT,
  PLACE_LNG,
  type PlaceData,
  type PlaceReview,
} from "./place";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";
const FIELD_MASK = [
  "id",
  "displayName",
  "formattedAddress",
  "location",
  "rating",
  "userRatingCount",
  "nationalPhoneNumber",
  "internationalPhoneNumber",
  "websiteUri",
  "regularOpeningHours",
  "reviews",
  "photos",
  "googleMapsUri",
  "primaryTypeDisplayName",
].join(",");

const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
let cache: { at: number; data: PlaceData } | null = null;

/** Minimal fallback: only facts verified from the shared Google Maps link. */
function fallback(): PlaceData {
  return {
    name: CLUB_NAME,
    address: null,
    nationalPhone: null,
    internationalPhone: null,
    websiteUri: null,
    rating: null,
    userRatingCount: null,
    openNow: null,
    weekdayDescriptions: [],
    googleMapsUri: MAPS_SHORT_URL,
    primaryType: null,
    reviews: [],
    photoUrls: [],
    lat: PLACE_LAT,
    lng: PLACE_LNG,
  };
}

type RawReview = {
  name?: string;
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
  googleMapsUri?: string;
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

function describeGatewayFailure(status: number, body: string): string {
  if (status === 403) {
    return `Google Maps isteği reddedildi (403). ${body}`;
  }
  return `Google Maps isteği başarısız [${status}]: ${body}`;
}

async function gatewayFetch(path: string, init: RequestInit): Promise<Response> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const connectionKey = process.env["GOOGLE_MAPS_API_KEY"];
  if (!lovableKey || !connectionKey) {
    throw new Error("Google Maps bağlantı bilgileri eksik");
  }
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${lovableKey}`);
  headers.set("X-Connection-Api-Key", connectionKey);
  return fetch(`${GATEWAY_URL}${path}`, { ...init, headers });
}

async function resolvePhotoUrls(photoNames: string[]): Promise<string[]> {
  const urls: string[] = [];
  for (const photoName of photoNames) {
    try {
      const response = await gatewayFetch(
        `/places/v1/${photoName}/media?maxWidthPx=1600&skipHttpRedirect=true`,
        { method: "GET" },
      );
      if (!response.ok) {
        console.error(
          describeGatewayFailure(response.status, await response.text()),
        );
        continue;
      }
      const payload = (await response.json()) as { photoUri?: string };
      if (payload.photoUri) urls.push(payload.photoUri);
    } catch (error) {
      console.error("Google fotoğrafı alınamadı", error);
    }
  }
  return urls;
}

export async function loadPlaceData(): Promise<PlaceData> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.data;

  try {
    const response = await gatewayFetch(`/places/v1/places/${PLACE_ID}`, {
      method: "GET",
      headers: {
        "X-Goog-FieldMask": FIELD_MASK,
        "Accept-Language": "tr",
      },
    });

    if (!response.ok) {
      console.error(describeGatewayFailure(response.status, await response.text()));
      return cache?.data ?? fallback();
    }

    const place = (await response.json()) as {
      displayName?: { text?: string };
      formattedAddress?: string;
      location?: { latitude?: number; longitude?: number };
      rating?: number;
      userRatingCount?: number;
      nationalPhoneNumber?: string;
      internationalPhoneNumber?: string;
      websiteUri?: string;
      regularOpeningHours?: { openNow?: boolean; weekdayDescriptions?: string[] };
      reviews?: RawReview[];
      photos?: { name?: string }[];
      googleMapsUri?: string;
      primaryTypeDisplayName?: { text?: string };
    };

    const reviews: PlaceReview[] = (place.reviews ?? [])
      .map((review, index): PlaceReview => {
        const text = review.text?.text ?? review.originalText?.text ?? "";
        return {
          id: review.name ?? `review-${index}`,
          rating: review.rating ?? null,
          text,
          authorName: review.authorAttribution?.displayName ?? "Google kullanıcısı",
          authorPhotoUrl: review.authorAttribution?.photoUri ?? null,
          authorUri: review.authorAttribution?.uri ?? null,
          relativeTime: review.relativePublishTimeDescription ?? null,
          publishTime: review.publishTime ?? null,
          reviewUri: review.googleMapsUri ?? null,
        };
      })
      .filter((review) => review.text.length > 0);

    const photoNames = (place.photos ?? [])
      .map((photo) => photo.name)
      .filter((name): name is string => Boolean(name))
      .slice(0, 6);

    const data: PlaceData = {
      name: place.displayName?.text ?? CLUB_NAME,
      address: place.formattedAddress ?? null,
      nationalPhone: place.nationalPhoneNumber ?? null,
      internationalPhone: place.internationalPhoneNumber ?? null,
      websiteUri: place.websiteUri ?? null,
      rating: place.rating ?? null,
      userRatingCount: place.userRatingCount ?? null,
      openNow: place.regularOpeningHours?.openNow ?? null,
      weekdayDescriptions: place.regularOpeningHours?.weekdayDescriptions ?? [],
      googleMapsUri: place.googleMapsUri ?? MAPS_SHORT_URL,
      primaryType: place.primaryTypeDisplayName?.text ?? null,
      reviews,
      photoUrls: await resolvePhotoUrls(photoNames),
      lat: place.location?.latitude ?? PLACE_LAT,
      lng: place.location?.longitude ?? PLACE_LNG,
    };

    cache = { at: Date.now(), data };
    return data;
  } catch (error) {
    console.error("Google Maps yer verisi alınamadı", error);
    return cache?.data ?? fallback();
  }
}
