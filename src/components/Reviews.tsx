import { ExternalLink, MapPin, Navigation, Quote } from "lucide-react";
import { motion } from "motion/react";

import { Reveal } from "@/components/Reveal";
import { Stars } from "@/components/Stars";
import { MapEmbed } from "@/components/MapEmbed";
import type { PlaceData } from "@/lib/place";

export function Reviews({
  place,
  limit,
  showMap = false,
}: {
  place: PlaceData;
  limit?: number;
  showMap?: boolean;
}) {
  const reviews = limit ? place.reviews.slice(0, limit) : place.reviews;
  if (reviews.length === 0) return null;

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8">
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

      <motion.ul
        className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      >
        {reviews.map((review) => (
          <motion.li
            key={review.id}
            variants={{
              hidden: { opacity: 0, y: 42, rotateX: 8, filter: "blur(8px)" },
              show: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                filter: "blur(0px)",
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="group [perspective:1000px]"
          >
            <figure className="relative flex h-full flex-col gap-5 overflow-hidden rounded-lg border border-border/70 bg-card/70 p-7 backdrop-blur-sm transition-colors duration-500 group-hover:border-accent/40">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-3 text-accent/10 transition-all duration-700 group-hover:text-accent/25 group-hover:-translate-y-1"
              >
                <Quote size={90} />
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-accent/70 to-transparent transition-transform duration-700 group-hover:scale-x-100"
              />

              <div className="relative flex items-center gap-3">
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

              <blockquote className="relative flex-1 font-sans text-sm leading-relaxed text-muted-foreground">
                “{review.text}”
              </blockquote>

              {review.reviewUri && (
                <figcaption className="relative">
                  <a
                    href={review.reviewUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-accent"
                  >
                    Google&apos;da görüntüle
                    <ExternalLink size={12} aria-hidden />
                  </a>
                </figcaption>
              )}
            </figure>
          </motion.li>
        ))}
      </motion.ul>

      {showMap && (
        <Reveal className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <div>
            <p className="eyebrow text-accent">Konum</p>
            <h3 className="mt-4 text-3xl sm:text-4xl">Kulüp burada</h3>
            {place.address && (
              <p className="mt-5 flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                {place.address}
              </p>
            )}
            <a
              href={place.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Yol tarifi al
              <Navigation size={15} aria-hidden />
            </a>
          </div>
          <MapEmbed place={place} />
        </Reveal>
      )}
    </section>
  );
}
