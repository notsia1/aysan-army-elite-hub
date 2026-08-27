import { CLUB_NAME, type PlaceData } from "@/lib/place";

export function MapEmbed({ place }: { place: PlaceData }) {
  const browserKey = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"];

  if (!browserKey) {
    return (
      <a
        href={place.googleMapsUri}
        target="_blank"
        rel="noopener noreferrer"
        className="grid aspect-[4/3] w-full place-items-center rounded-lg border border-border/70 bg-muted text-sm text-muted-foreground"
      >
        Haritayı Google Haritalar&apos;da aç
      </a>
    );
  }

  const src = `https://www.google.com/maps/embed/v1/view?key=${browserKey}&center=${place.lat},${place.lng}&zoom=16&language=tr&region=TR`;

  return (
    <div className="overflow-hidden rounded-lg border border-border/70 glow-soft">
      <iframe
        title={`${CLUB_NAME} konumu`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-[4/3] w-full border-0 md:aspect-[16/10]"
      />
    </div>
  );
}
