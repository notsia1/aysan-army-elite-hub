import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";

import { ArchPhoto } from "@/components/ArchPhoto";
import { GoogleRating } from "@/components/GoogleRating";
import { Reveal } from "@/components/Reveal";
import { Reviews } from "@/components/Reviews";
import { clubPhotos, logoUrl } from "@/lib/photos";
import { placeQueryOptions } from "@/lib/place-query";
import { toWhatsApp } from "@/lib/place";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(placeQueryOptions),
  head: () => ({
    meta: [
      { title: "Aysan Army Elite Training Club — Çekmeköy Özel Antrenman Kulübü" },
      {
        name: "description",
        content:
          "Çekmeköy'de ring, pilates ve kuvvet alanlarını bir arada sunan özel antrenman kulübü. Adres, çalışma saatleri ve Google değerlendirmeleri.",
      },
      {
        property: "og:title",
        content: "Aysan Army Elite Training Club — Çekmeköy Özel Antrenman Kulübü",
      },
      {
        property: "og:description",
        content:
          "Ring, pilates ve kuvvet alanları tek çatı altında. Çekmeköy, İstanbul.",
      },
    ],
  }),
  component: Home,
});

const areas = [
  {
    title: "Ring Salonu",
    body: "Halat kenarlıklı ring, duvar ve zincir kum torbaları; klasik büstlerle çevrili bir alan.",
    photo: clubPhotos.ring,
    to: "/tesis" as const,
  },
  {
    title: "Pilates Stüdyosu",
    body: "Ahşap reformer ve cadillac ekipmanları, kemerli ayna ve doğal ışık alan sakin bir oda.",
    photo: clubPhotos.pilates,
    to: "/tesis" as const,
  },
  {
    title: "Kuvvet Alanı",
    body: "Kemerli nişlerin altında sıralanmış paslanmaz çelik dambıl seti ve kablo istasyonu.",
    photo: clubPhotos.strength,
    to: "/tesis" as const,
  },
];

function Home() {
  const { data: place } = useSuspenseQuery(placeQueryOptions);
  const whatsapp = toWhatsApp(place.internationalPhone ?? place.nationalPhone);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={clubPhotos.ring.url}
            alt={clubPhotos.ring.alt}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-ink/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/45 to-ink/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-20 pt-36 sm:px-8">
          <Reveal>
            <img
              src={logoUrl}
              alt="Aysan Army Elite Training Club logosu"
              className="h-16 w-auto object-contain sm:h-20"
            />
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-8 max-w-4xl text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] text-plaster">
              Ring, pilates ve kuvvet
              <span className="block italic text-honey">tek çatı altında</span>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-plaster/85">
              Çekmeköy&apos;de, kemerli ışıklar ve klasik heykellerle kurgulanmış özel bir
              antrenman kulübü. {place.primaryType ? `Google’da ${place.primaryType.toLocaleLowerCase("tr")} olarak listelenir.` : ""}
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/iletisim"
                className="inline-flex items-center gap-2 rounded-full bg-honey px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
              >
                Bize ulaşın
                <ArrowUpRight size={16} aria-hidden />
              </Link>
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-plaster/40 px-7 py-3.5 text-sm font-medium text-plaster transition-colors hover:bg-plaster/10"
                >
                  WhatsApp
                </a>
              )}
              <GoogleRating place={place} className="border-plaster/30 bg-ink/40 text-plaster" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Facts strip — Google-sourced only */}
      <section className="border-y border-border/60 bg-plaster">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-3">
          {place.address && (
            <div className="flex gap-4">
              <MapPin size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <p className="text-sm leading-relaxed text-muted-foreground">{place.address}</p>
            </div>
          )}
          {place.weekdayDescriptions.length > 0 && (
            <div className="flex gap-4">
              <Clock size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Hafta içi {place.weekdayDescriptions[0]?.split(":").slice(1).join(":").trim()} ·
                hafta sonu {place.weekdayDescriptions[5]?.split(":").slice(1).join(":").trim()}
              </p>
            </div>
          )}
          {place.rating != null && place.userRatingCount != null && (
            <div className="text-sm text-muted-foreground">
              Google puanı{" "}
              <span className="font-display text-xl text-foreground">
                {place.rating.toFixed(1)}
              </span>{" "}
              · {place.userRatingCount} değerlendirme
            </div>
          )}
        </div>
      </section>

      {/* Areas */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-accent">Salonun içi</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Üç ayrı alan, tek bir kulüp</h2>
          <p className="mt-5 text-muted-foreground">
            Aşağıdakiler kulübün kendi fotoğraflarında görülen alanlardır.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {areas.map((area, index) => (
            <Reveal key={area.title} delay={index * 120}>
              <Link to={area.to} className="group block">
                <ArchPhoto
                  src={area.photo.url}
                  alt={area.photo.alt}
                  className="aspect-[3/4]"
                  imageClassName="transition-transform duration-1000 group-hover:scale-[1.04]"
                />
                <h3 className="mt-7 text-2xl text-foreground">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{area.body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Reviews place={place} limit={3} />

      {/* CTA */}
      <section className="grain border-t border-border/60 bg-walnut">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-24 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="max-w-2xl text-4xl text-plaster sm:text-5xl">
              Salonu görmek için uğrayın
            </h2>
            <p className="mt-5 max-w-lg text-plaster/80">
              Adres, çalışma saatleri ve iletişim bilgileri iletişim sayfasında güncel
              olarak yer alıyor.
            </p>
          </div>
          <Link
            to="/iletisim"
            className="inline-flex items-center gap-2 rounded-full bg-honey px-8 py-4 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            İletişim ve konum
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
