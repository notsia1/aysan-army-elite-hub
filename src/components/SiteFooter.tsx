import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Phone } from "lucide-react";

import { logoUrl } from "@/lib/photos";
import { CLUB_NAME, toDialable, type PlaceData } from "@/lib/place";

export function SiteFooter({ place }: { place: PlaceData | null }) {
  const dialable = toDialable(place?.nationalPhone ?? null);
  const year = 2026;

  return (
    <footer className="grain border-t border-border/60 bg-plaster">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <span className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-walnut">
              <img src={logoUrl} alt="" aria-hidden className="h-7 w-7 object-contain" />
            </span>
            <span className="font-display text-2xl text-foreground">Aysan Army</span>
          </span>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {CLUB_NAME} — Çekmeköy&apos;de ring, pilates ve kuvvet alanlarını tek çatı
            altında toplayan özel antrenman kulübü.
          </p>
          {place?.rating != null && place.userRatingCount != null && (
            <p className="mt-4 text-sm text-muted-foreground">
              Google puanı{" "}
              <span className="text-foreground">{place.rating.toFixed(1)}</span> ·{" "}
              {place.userRatingCount} değerlendirme
            </p>
          )}
        </div>

        <nav aria-label="Alt menü">
          <h2 className="eyebrow text-muted-foreground">Sayfalar</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              { to: "/tesis", label: "Tesis" },
              { to: "/hizmetler", label: "Antrenman Alanları" },
              { to: "/galeri", label: "Galeri" },
              { to: "/iletisim", label: "İletişim" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-muted-foreground">İletişim</h2>
          <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
            {place?.address && (
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <a
                  href={place.googleMapsUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {place.address}
                </a>
              </li>
            )}
            {dialable && place?.nationalPhone && (
              <li className="flex gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <a
                  href={`tel:${dialable}`}
                  className="transition-colors hover:text-foreground"
                >
                  {place.nationalPhone}
                </a>
              </li>
            )}
            {place?.websiteUri && (
              <li className="flex gap-3">
                <Instagram size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <a
                  href={place.websiteUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} {CLUB_NAME}
          </p>
          <p>Adres, çalışma saatleri ve değerlendirmeler Google Haritalar&apos;dan alınır.</p>
        </div>
      </div>
    </footer>
  );
}
