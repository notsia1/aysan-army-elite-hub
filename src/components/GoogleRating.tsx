import { ExternalLink } from "lucide-react";

import { Stars } from "@/components/Stars";
import type { PlaceData } from "@/lib/place";
import { cn } from "@/lib/utils";

export function GoogleRating({
  place,
  className,
}: {
  place: Pick<PlaceData, "rating" | "userRatingCount" | "googleMapsUri">;
  className?: string;
}) {
  if (place.rating == null) return null;

  return (
    <a
      href={place.googleMapsUri}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-3 rounded-full border border-border/70 bg-card/80 px-4 py-2 backdrop-blur transition-colors hover:border-accent/70",
        className,
      )}
    >
      <span className="font-display text-xl leading-none text-foreground">
        {place.rating.toFixed(1)}
      </span>
      <Stars rating={place.rating} />
      {place.userRatingCount != null && (
        <span className="text-xs text-muted-foreground">
          {place.userRatingCount} Google değerlendirmesi
        </span>
      )}
      <ExternalLink
        size={13}
        className="text-muted-foreground transition-transform group-hover:translate-x-0.5"
        aria-hidden
      />
    </a>
  );
}
