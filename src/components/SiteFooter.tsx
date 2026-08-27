import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Phone } from "lucide-react";

import { wordmarkUrl } from "@/lib/photos";
import { INSTAGRAM_URL } from "@/lib/instagram";
import { CLUB_NAME, toDialable, type PlaceData } from "@/lib/place";

export function SiteFooter({ place }: { place: PlaceData | null }) {
  const dialable = toDialable(place?.nationalPhone ?? null);
  const year = 2026;

  return (
    <footer className="relative overflow-hidden border-t border-border/60 wood-panel">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-honey/50 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <img
            src={wordmarkUrl}
            alt={`${CLUB_NAME} logosu`}
            className="h-28 w-auto object-contain sm:h-36"
          />
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-plaster/70">
            Çekmeköy&apos;de ring, pilates ve kuvvet alanlarını tek çatı altında toplayan
            özel bir antrenman kulübü.
          </p>
          {place?.rating != null && place.userRatingCount != null && (
            <p className="mt-5 text-xs tracking-[0.22em] text-plaster/55 uppercase">
              Google {place.rating.toFixed(1)} · {place.userRatingCount} değerlendirme
            </p>
          )}
        </div>

        <div className="mt-16 grid gap-12 border-t border-plaster/10 pt-12 sm:grid-cols-3">
          <nav aria-label="Alt menü">
            <h2 className="eyebrow text-plaster/50">Sayfalar</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { to: "/", label: "Ana Sayfa" },
                { to: "/tesis", label: "Tesis" },
                { to: "/galeri", label: "Galeri" },
                { to: "/iletisim", label: "İletişim" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-plaster/70 transition-colors hover:text-honey"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-plaster/50">İletişim</h2>
            <ul className="mt-5 space-y-4 text-sm text-plaster/70">
              {place?.address && (
                <li className="flex gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-honey" aria-hidden />
                  <a
                    href={place.googleMapsUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-honey"
                  >
                    {place.address}
                  </a>
                </li>
              )}
              {dialable && place?.nationalPhone && (
                <li className="flex gap-3">
                  <Phone size={16} className="mt-0.5 shrink-0 text-honey" aria-hidden />
                  <a href={`tel:${dialable}`} className="transition-colors hover:text-honey">
                    {place.nationalPhone}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-plaster/50">Takip edin</h2>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-plaster/20 px-5 py-2.5 text-sm text-plaster/80 transition-colors hover:border-honey/60 hover:text-honey"
            >
              <Instagram size={16} aria-hidden />
              @aysanarmytraining
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-plaster/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-plaster/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} {CLUB_NAME}
          </p>
          <p>Adres, çalışma saatleri ve değerlendirmeler Google Haritalar&apos;dan alınır.</p>
        </div>
      </div>
    </footer>
  );
}
