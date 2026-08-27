import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Instagram, MapPin, Phone } from "lucide-react";

import { wordmarkUrl } from "@/lib/photos";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/instagram";
import { CLUB_NAME, toDialable, type PlaceData } from "@/lib/place";

const pages = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/tesis", label: "Tesis" },
  { to: "/galeri", label: "Galeri" },
  { to: "/iletisim", label: "İletişim" },
] as const;

export function SiteFooter({ place }: { place: PlaceData | null }) {
  const dialable = toDialable(place?.nationalPhone ?? null);
  const year = 2026;

  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-honey/40 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Call to action row */}
        <div className="flex flex-col gap-8 border-b border-plaster/10 py-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-honey">Çekmeköy, İstanbul</p>
            <h2 className="mt-4 max-w-lg text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] text-plaster">
              Kulübü görmek için uygun bir saat seçelim.
            </h2>
          </div>
          <Link
            to="/iletisim"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-honey px-7 py-3.5 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            İletişime geç
            <ArrowUpRight
              size={16}
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Info grid */}
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img
              src={wordmarkUrl}
              alt={`${CLUB_NAME} logosu`}
              className="h-16 w-auto object-contain sm:h-20"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-plaster/60">
              Ring, pilates ve kuvvet alanlarını tek çatı altında toplayan özel bir
              antrenman kulübü.
            </p>
          </div>

          <nav aria-label="Alt menü">
            <h2 className="eyebrow text-plaster/40">Sayfalar</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {pages.map((item) => (
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
            <h2 className="eyebrow text-plaster/40">İletişim</h2>
            <ul className="mt-5 space-y-4 text-sm text-plaster/70">
              {place?.address && (
                <li className="flex gap-3">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-honey" aria-hidden />
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
                  <Phone size={15} className="mt-0.5 shrink-0 text-honey" aria-hidden />
                  <a href={`tel:${dialable}`} className="transition-colors hover:text-honey">
                    {place.nationalPhone}
                  </a>
                </li>
              )}
              <li className="flex gap-3">
                <Instagram size={15} className="mt-0.5 shrink-0 text-honey" aria-hidden />
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-honey"
                >
                  @{INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-plaster/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-plaster/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} {CLUB_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
