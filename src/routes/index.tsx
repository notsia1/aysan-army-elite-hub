import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { motion } from "motion/react";


import { ArchPhoto } from "@/components/ArchPhoto";
import { GoogleRating } from "@/components/GoogleRating";
import { Reveal } from "@/components/Reveal";
import { WebGLImage } from "@/components/WebGLImage";
import { WordsReveal } from "@/components/WordsReveal";
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
    body: "Tam ölçekli ring, ağır kum torbaları ve boks çalışması için ayrılmış özel bir kat. Teknik çalışmadan kondisyona kadar her seviyeye açık.",
    photo: clubPhotos.ring,
    to: "/tesis" as const,
  },
  {
    title: "Pilates Stüdyosu",
    body: "Reformer ve cadillac ekipmanlarıyla donatılmış, gün ışığı alan sakin bir stüdyo. Duruş, esneklik ve kontrollü güç için birebir çalışma alanı.",
    photo: clubPhotos.pilates,
    to: "/tesis" as const,
  },
  {
    title: "Kuvvet Alanı",
    body: "Eksiksiz dambıl seti, kablo istasyonu ve serbest çalışma alanı. Kalabalık salon karmaşası olmadan, düzenli ve ferah bir kuvvet bölümü.",
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
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <WebGLImage src={clubPhotos.ring.url} alt={clubPhotos.ring.alt} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-24 pt-36 sm:px-8">
          <motion.img
            src={logoUrl}
            alt="Aysan Army Elite Training Club logosu"
            className="float-slow h-20 w-auto object-contain sm:h-28"
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          <h1 className="mt-10 max-w-4xl text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] text-plaster">
            <WordsReveal text="Boks, pilates ve kuvvet" delay={0.25} />
            <WordsReveal
              text="aynı çatı altında"
              className="mt-1"
              wordClassName="shine-text"
              delay={0.55}
            />
          </h1>

          <motion.p
            className="mt-8 max-w-xl text-base leading-relaxed text-plaster/85"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            Çekmeköy&apos;ün merkezinde, kalabalık zincir salonların aksine sınırlı sayıda
            üyeyle çalışan özel bir antrenman kulübü. Ferah alanlar, bakımlı ekipman ve
            sakin bir atmosfer — antrenmana odaklanmak için tasarlanmış bir kulüp.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/iletisim"
              className="pulse-ring group inline-flex items-center gap-2 rounded-full bg-honey px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Bize ulaşın
              <ArrowUpRight
                size={16}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-plaster/40 px-7 py-3.5 text-sm font-medium text-plaster transition-colors hover:bg-secondary/10"
              >
                WhatsApp
              </a>
            )}
            <GoogleRating place={place} className="border-plaster/30 bg-ink/40 text-plaster" />
          </motion.div>
        </div>
      </section>



      {/* Animated brand band */}
      <div className="relative flex overflow-hidden border-b border-border/60 bg-ink/60 py-4 backdrop-blur-md">
        <div className="marquee-track flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="flex items-center gap-10">
              {["RING", "PILATES", "KUVVET", "ELITE TRAINING CLUB", "ÇEKMEKÖY"].map((word) => (
                <span key={`${group}-${word}`} className="eyebrow text-plaster/55">
                  {word}
                  <span className="ml-10 text-accent">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Facts strip — Google-sourced only */}
      <section className="border-y border-border/60 bg-secondary/40 backdrop-blur-md">
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
            Üç ayrı disiplin, üç ayrı alan; hepsi aynı özenle kurulmuş tek bir kulübün
            parçası. Hangi alanda çalışırsanız çalışın, ekipman ve düzen aynı standartta.
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
              Gelin, kulübü kendiniz görün
            </h2>
            <p className="mt-5 max-w-lg text-plaster/80">
              Kulübü gezmek, alanları görmek ve size uygun programı konuşmak için kapımız
              açık. Adres, çalışma saatleri ve iletişim kanallarının tamamı iletişim
              sayfasında.
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
