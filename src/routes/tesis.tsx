import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { PhotoFrame } from "@/components/PhotoFrame";
import { OpeningHours } from "@/components/OpeningHours";
import { Reveal } from "@/components/Reveal";
import { clubPhotos } from "@/lib/photos";
import { placeQueryOptions } from "@/lib/place-query";

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

function Facility() {
  const { data: place } = useSuspenseQuery(placeQueryOptions);

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
        <Reveal>
          <p className="eyebrow text-accent">Tesis</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[1]">
            Antrenmanın hakkını veren bir tesis
          </h1>
          <p className="mt-7 max-w-xl text-muted-foreground">
            Kulübü kurarken tek bir şeye baktık: insan buraya girdiğinde çalışmak istesin.
            Aydınlatmadan zemine, ekipman düzeninden ferahlığa kadar her alan bu yüzden
            ayrı ayrı düşünüldü. Aşağıdaki fotoğraflar kulübün kendi alanlarına ait.
          </p>
        </Reveal>
      </section>

      <div className="mx-auto max-w-7xl space-y-28 px-5 pb-28 sm:px-8">
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

      <section className="border-t border-border/60 bg-secondary/40 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <OpeningHours place={place} />
          </Reveal>
          <Reveal delay={120} className="flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl">Uğrayın, kahvenizi içerken gezdirelim</h2>
            <p className="mt-5 text-muted-foreground">
              {place.address ?? "Çekmeköy, İstanbul"}
            </p>
            <Link
              to="/iletisim"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-walnut px-7 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              İletişim ve konum
              <ArrowUpRight size={16} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
