import { ExternalLink } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Stars } from "@/components/Stars";
import type { PlaceData } from "@/lib/place";

export function Reviews({ place, limit }: { place: PlaceData; limit?: number }) {
  const reviews = limit ? place.reviews.slice(0, limit) : place.reviews;
  if (reviews.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal className="max-w-2xl">
        <p className="eyebrow text-accent">Google değerlendirmeleri</p>
        <h2 className="mt-4 text-4xl sm:text-5xl">Üyelerin kendi sözleriyle</h2>
        <p className="mt-5 text-muted-foreground">
          Aşağıdaki yorumlar Google Haritalar üzerinden alınmıştır ve değiştirilmemiştir.
          {place.rating != null && place.userRatingCount != null && (
            <>
              {" "}
              Kulübün güncel puanı {place.rating.toFixed(1)} / 5, toplam{" "}
              {place.userRatingCount} değerlendirme.
            </>
          )}
        </p>
      </Reveal>

      <ul className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((review, index) => (
          <Reveal as="li" key={review.id} delay={index * 90}>
            <figure className="flex h-full flex-col gap-5 rounded-lg border border-border/70 bg-card p-7 glow-soft">
              <div className="flex items-center gap-3">
                <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-muted font-display text-base text-foreground">
                  {review.authorName.charAt(0)}
                  {review.authorPhotoUrl && (
                    <img
                      src={review.authorPhotoUrl}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm text-foreground">
                    {review.authorName}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {review.relativeTime}
                  </span>
                </span>
              </div>

              {review.rating != null && <Stars rating={review.rating} />}

              <blockquote className="flex-1 font-sans text-sm leading-relaxed text-muted-foreground">
                “{review.text}”
              </blockquote>

              {review.reviewUri && (
                <figcaption>
                  <a
                    href={review.reviewUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Google&apos;da görüntüle
                    <ExternalLink size={12} aria-hidden />
                  </a>
                </figcaption>
              )}
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
