import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { wordmarkUrl } from "@/lib/photos";
import { CLUB_NAME, toDialable } from "@/lib/place";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/tesis", label: "Tesis" },
  { to: "/galeri", label: "Galeri" },
  { to: "/iletisim", label: "İletişim" },
] as const;

export function SiteHeader({ phone }: { phone: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialable = toDialable(phone);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-plaster/10 bg-ink/90 backdrop-blur-xl"
          : "bg-gradient-to-b from-ink/60 to-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          to="/"
          className="flex items-center transition-transform duration-500 hover:scale-[1.03]"
          onClick={() => setOpen(false)}
        >
          <img
            src={wordmarkUrl}
            alt={`${CLUB_NAME} logosu`}
            className="h-14 w-auto object-contain sm:h-16"
          />
        </Link>


        <nav className="hidden items-center gap-8 lg:flex" aria-label="Ana menü">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-plaster after:scale-x-100" }}
              className="relative py-1 font-display text-base tracking-[0.12em] text-plaster/65 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-honey after:transition-transform after:duration-500 hover:text-plaster hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {dialable && (
            <a
              href={`tel:${dialable}`}
              className="hidden items-center gap-2 rounded-full bg-honey px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
            >
              <Phone size={15} aria-hidden />
              {phone}
            </a>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full border border-plaster/30 text-plaster lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-plaster/10 bg-ink/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-8" aria-label="Mobil menü">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-honey" }}
                className="border-b border-plaster/10 py-3.5 font-display text-2xl tracking-[0.1em] text-plaster/70 last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

    </header>
  );
}
