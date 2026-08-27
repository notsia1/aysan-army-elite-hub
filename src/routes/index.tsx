import { useRef } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import { PhotoFrame } from "@/components/PhotoFrame";
import { GoogleRating } from "@/components/GoogleRating";
import { Reveal } from "@/components/Reveal";
import { WordsReveal } from "@/components/WordsReveal";
import { HoverText } from "@/components/HoverText";
import { Reviews } from "@/components/Reviews";
import { clubPhotos } from "@/lib/photos";
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
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(6px)"]);
  const whatsapp = toWhatsApp(place.internationalPhone ?? place.nationalPhone);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <img
            src={clubPhotos.ring.url}
            alt={clubPhotos.ring.alt}
            loading="eager"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/35 to-transparent" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, filter: heroBlur }}
          className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-24 pt-36 sm:px-8"
        >
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="h-px w-12 bg-honey/70" aria-hidden />
            <span className="eyebrow text-plaster/70">Çekmeköy · İstanbul</span>
          </motion.div>

          <h1 className="mt-6 max-w-5xl text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.88] text-plaster">
            <HoverText text="SINIRLI ÜYE" delay={0.25} />
            <HoverText text="SINIRSIZ ÖZEN." className="mt-1 text-accent" delay={0.55} />
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

          <motion.div
            className="mt-16 flex items-center gap-3 text-plaster/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <span className="scroll-line h-10 w-px overflow-hidden bg-plaster/20" aria-hidden />
            <span className="eyebrow text-[0.6rem]">Aşağı kaydırın</span>
          </motion.div>
        </motion.div>
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
      <section className="border-b border-border/60 bg-secondary/30 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl divide-y divide-border/60 px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0">
          {place.address && (
            <div className="flex gap-4 py-8 md:pr-10">
              <MapPin size={16} className="mt-1 shrink-0 text-accent" aria-hidden />
              <div>
                <p className="eyebrow text-[0.6rem] text-muted-foreground/70">Adres</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">{place.address}</p>
              </div>
            </div>
          )}
          {place.weekdayDescriptions.length > 0 && (
            <div className="flex gap-4 py-8 md:px-10">
              <Clock size={16} className="mt-1 shrink-0 text-accent" aria-hidden />
              <div>
                <p className="eyebrow text-[0.6rem] text-muted-foreground/70">Çalışma saatleri</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  Hafta içi {place.weekdayDescriptions[0]?.split(":").slice(1).join(":").trim()}
                  <br />
                  Hafta sonu {place.weekdayDescriptions[5]?.split(":").slice(1).join(":").trim()}
                </p>
              </div>
            </div>
          )}
          {place.rating != null && place.userRatingCount != null && (
            <div className="py-8 md:pl-10">
              <p className="eyebrow text-[0.6rem] text-muted-foreground/70">Google puanı</p>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-display text-4xl leading-none text-accent">
                  {place.rating.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {place.userRatingCount} değerlendirme
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Areas */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-accent">Salonun içi</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">
            <WordsReveal text="Üç ayrı alan, tek bir kulüp" inView stagger={0.06} />
          </h2>
          <p className="mt-5 text-muted-foreground">
            Üç ayrı disiplin, üç ayrı alan; hepsi aynı özenle kurulmuş tek bir kulübün
            parçası. Hangi alanda çalışırsanız çalışın, ekipman ve düzen aynı standartta.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {areas.map((area, index) => (
            <Reveal key={area.title} delay={index * 120}>
              <Link to={area.to} className="group block">
                <div className="relative">
                  <PhotoFrame
                    src={area.photo.url}
                    alt={area.photo.alt}
                    className="aspect-[3/4]"
                    imageClassName="transition-transform duration-1000 group-hover:scale-[1.05]"
                  />
                  <span className="pointer-events-none absolute left-5 top-5 font-display text-sm tracking-[0.2em] text-plaster/70">
                    0{index + 1}
                  </span>
                  <span className="pointer-events-none absolute inset-0 rounded-[1.25rem] ring-1 ring-inset ring-transparent transition-colors duration-500 group-hover:ring-accent/40" />
                </div>
                <div className="mt-7 flex items-center justify-between gap-4">
                  <h3 className="text-2xl text-foreground transition-colors duration-300 group-hover:text-accent">
                    {area.title}
                  </h3>
                  <ArrowUpRight
                    size={18}
                    aria-hidden
                    className="shrink-0 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </div>
                <span className="mt-4 block h-px w-full origin-left scale-x-100 bg-border transition-transform duration-500 group-hover:bg-accent/50" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{area.body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Reviews place={place} limit={4} showMap />
    </>
  );
}
