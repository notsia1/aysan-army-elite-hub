import { useRef } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Dumbbell, MapPin, Ruler, ScanLine, Sparkles, Swords, Timer } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import { PhotoFrame } from "@/components/PhotoFrame";
import { OpeningHours } from "@/components/OpeningHours";
import { MapEmbed } from "@/components/MapEmbed";
import { Reveal } from "@/components/Reveal";
import { HoverText } from "@/components/HoverText";
import { clubPhotos, clubPhotoList } from "@/lib/photos";
import { placeQueryOptions } from "@/lib/place-query";
import { toWhatsApp } from "@/lib/place";

export const Route = createFileRoute("/tesis")({
  loader: ({ context }) => context.queryClient.ensureQueryData(placeQueryOptions),
  head: () => ({
    meta: [
      { title: "Tesis — Aysan Army Elite Training Club" },
      {
        name: "description",
        content:
          "Ring salonu, pilates stüdyosu ve kuvvet alanı: Aysan Army Elite Training Club'ın Çekmeköy'deki tesisini fotoğraflarla gezin.",
      },
      { property: "og:title", content: "Tesis — Aysan Army Elite Training Club" },
      {
        property: "og:description",
        content: "Ring salonu, pilates stüdyosu ve kuvvet alanı fotoğraflarla.",
      },
    ],
  }),
  component: Facility,
});

const rooms = [
  {
    eyebrow: "01 — Ring",
    title: "Ring salonu",
    body: "Salonun kalbinde, ölçüsü tam bir ring duruyor. Etrafında ağır kum torbaları ve zincirli askılar; sıcak tonlu aydınlatma ve klasik detaylarla kurulmuş, çalışırken insanı içine alan bir alan. Teknik ders, birebir çalışma ya da kendi temponuzda kondisyon için yeterince geniş.",
    photo: clubPhotos.ring,
  },
  {
    eyebrow: "02 — Pilates",
    title: "Pilates stüdyosu",
    body: "Ahşap gövdeli reformer ve cadillac ekipmanları geniş bir zemine rahatça yayılmış; sıkışık, sıra bekleyen bir stüdyo değil. Yumuşak ışık, sade duvarlar ve bitkiler; duruş, esneklik ve kontrollü güç çalışmasına odaklanmayı kolaylaştıran sakin bir oda.",
    photo: clubPhotos.pilates,
  },
  {
    eyebrow: "03 — Kuvvet",
    title: "Kuvvet alanı",
    body: "Paslanmaz çelik dambıllar ağırlıklarına göre tek tek dizili, her şey yerinde ve bakımlı. Kablo istasyonu, ahşap raflar ve boy aynalarıyla düzenli bir kuvvet bölümü — ekipman aramakla değil, çalışmakla geçen bir antrenman.",
    photo: clubPhotos.strength,
  },
];

const features = [
  {
    icon: Swords,
    title: "Tam ölçekli ring",
    body: "Salonun kalbinde profesyonel ölçülerde ring; etrafında kum torbaları ve teknik çalışma alanları.",
  },
  {
    icon: Sparkles,
    title: "Klasik detaylar",
    body: "Köşelerdeki klasik büstler, kemerli aynalar ve sıcak tonlu LED aydınlatma; antrenmana ciddiyet katan bir atmosfer.",
  },
  {
    icon: Dumbbell,
    title: "Paslanmaz dambıl seti",
    body: "Ağırlıklarına göre düzenlenmiş paslanmaz çelik dambıllar ve serbest çalışma alanı.",
  },
  {
    icon: Timer,
    title: "Reformer & cadillac",
    body: "Ahşap gövdeli reformer ve cadillac ekipmanlarıyla donatılmış sakin bir pilates stüdyosu.",
  },
  {
    icon: Ruler,
    title: "Geniş zemin",
    body: "Ekipmanlar arasında hareket alanı bırakan, sıkışık olmayan bir düzen.",
  },
  {
    icon: Mirror,
    title: "Ayna detayları",
    body: "Kemerli ve arkadan aydınlatmalı aynalar; hem fonksiyonel hem estetik.",
  },
];

function Facility() {
  const { data: place } = useSuspenseQuery(placeQueryOptions);
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const whatsapp = toWhatsApp(place.internationalPhone ?? place.nationalPhone);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden bg-ink">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <img
            src={clubPhotos.ring.url}
            alt={clubPhotos.ring.alt}
            loading="eager"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/40 to-transparent" />
        </motion.div>

        <div className="relative mx-auto flex min-h-[80svh] max-w-7xl flex-col justify-end px-5 pb-20 pt-36 sm:min-h-[85svh] sm:px-8 sm:pb-28">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="h-px w-12 bg-honey/70" aria-hidden />
            <span className="eyebrow text-plaster/70">Çekmeköy · İstanbul</span>
          </motion.div>

          <h1 className="mt-6 max-w-4xl text-[clamp(3rem,9vw,7rem)] leading-[0.9] text-plaster">
            <HoverText text="TESİS" delay={0.25} />
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-plaster/85"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Ferah alanlar, özenle seçilmiş ekipman ve antrenmana odaklanan bir atmosfer. Her köşe,
            aynı kulübün aynı disipliniyle düşünüldü.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
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
          </motion.div>

          <motion.div
            className="mt-14 flex items-center gap-3 text-plaster/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <span className="scroll-line h-10 w-px overflow-hidden bg-plaster/20" aria-hidden />
            <span className="eyebrow text-[0.6rem]">Keşfedin</span>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-5 pb-8 pt-24 sm:px-8 sm:pt-32">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-accent">Tesis</p>
          <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] leading-[1]">
            Antrenmanın hakkını veren bir tesis
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            Kulübü kurarken tek bir şeye baktık: insan buraya girdiğinde çalışmak istesin.
            Aydınlatmadan zemine, ekipman düzeninden ferahlığa kadar her alan bu yüzden ayrı ayrı
            düşünüldü.
          </p>
        </Reveal>
      </section>

      {/* Feature grid */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 90}>
              <div className="group wood-panel hairline relative overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-secondary/50 text-accent transition-colors duration-500 group-hover:border-accent/40">
                  <feature.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-xl">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
                <span className="pointer-events-none absolute right-5 top-5 font-display text-sm tracking-[0.2em] text-plaster/20 transition-colors duration-500 group-hover:text-accent/30">
                  0{index + 1}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Rooms */}
      <div className="mx-auto max-w-7xl space-y-28 px-5 py-16 sm:px-8">
        {rooms.map((room, index) => (
          <section
            key={room.title}
            className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
              index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Reveal>
              <PhotoFrame
                src={room.photo.url}
                alt={room.photo.alt}
                className="aspect-[4/5]"
              />
            </Reveal>
            <Reveal delay={140}>
              <p className="eyebrow text-accent">{room.eyebrow}</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">{room.title}</h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">{room.body}</p>
            </Reveal>
          </section>
        ))}
      </div>

      {/* Gallery */}
      <section className="border-y border-border/60 bg-secondary/20 py-24 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-accent">Galeri</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Kulüpten kareler</h2>
            <p className="mt-5 text-muted-foreground">
              Salonun kendi alanlarına ait fotoğraflar. Ringten pilates stüdyosuna, kuvvet
              bölümünden detaylara.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {clubPhotoList.map((photo, index) => (
              <Reveal key={photo.url} delay={index * 120}>
                <PhotoFrame src={photo.url} alt={photo.alt} className="aspect-[4/3]" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Location + hours */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-accent">Konum</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Burası Çekmeköy'de</h2>
            <div className="mt-6 flex items-start gap-3 text-muted-foreground">
              <MapPin size={18} className="mt-1 shrink-0 text-accent" aria-hidden />
              <p className="leading-relaxed">{place.address ?? "Çekmeköy, İstanbul"}</p>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border/70">
              <MapEmbed place={place} />
            </div>
            <a
              href={place.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              Google Haritalar'da aç
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </Reveal>

          <Reveal delay={120} className="flex flex-col justify-start">
            <OpeningHours place={place} />
            <div className="mt-10 rounded-2xl border border-border/60 bg-secondary/30 p-7">
              <h3 className="text-xl">Uğrayın, kahvenizi içerken gezdirelim</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Tesisleri yerinde görmek, ekipmanları denemek ve üyelik detaylarını konuşmak için
                iletişime geçin.
              </p>
              <Link
                to="/iletisim"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-walnut px-7 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                İletişim ve konum
                <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
