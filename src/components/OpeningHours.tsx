import type { PlaceData } from "@/lib/place";

export function OpeningHours({ place }: { place: PlaceData }) {
  if (place.weekdayDescriptions.length === 0) return null;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="eyebrow text-muted-foreground">Çalışma saatleri</h2>
        {place.openNow != null && (
          <span
            className={
              place.openNow
                ? "inline-flex items-center gap-2 text-xs text-foreground"
                : "inline-flex items-center gap-2 text-xs text-muted-foreground"
            }
          >
            <span
              aria-hidden
              className={
                place.openNow
                  ? "h-1.5 w-1.5 rounded-full bg-accent"
                  : "h-1.5 w-1.5 rounded-full bg-border"
              }
            />
            {place.openNow ? "Şu anda açık" : "Şu anda kapalı"}
          </span>
        )}
      </div>
      <dl className="mt-5 divide-y divide-border/60 text-sm">
        {place.weekdayDescriptions.map((line) => {
          const [day, ...rest] = line.split(":");
          return (
            <div key={line} className="flex items-center justify-between gap-6 py-3">
              <dt className="text-muted-foreground">{day}</dt>
              <dd className="tabular-nums text-foreground">{rest.join(":").trim()}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
