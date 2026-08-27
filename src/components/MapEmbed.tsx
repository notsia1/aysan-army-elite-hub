import { CLUB_NAME, type PlaceData } from "@/lib/place";

export function MapEmbed({ place }: { place: PlaceData }) {
  // Keyless Google Maps embed — works in preview and on any domain.
  const query = place.placeId
    ? `place_id:${place.placeId}`
    : `${place.lat},${place.lng}`;
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&hl=tr&output=embed`;

  return (
    <div className="overflow-hidden rounded-lg border border-border/70 glow-soft">
      <iframe
        title={`${CLUB_NAME} konumu`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="aspect-[4/3] w-full border-0 md:aspect-[16/10]"
      />
    </div>
  );
}
