import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { ArchPhoto } from "@/components/ArchPhoto";
import { Reveal } from "@/components/Reveal";
import { clubPhotos } from "@/lib/photos";
import { placeQueryOptions } from "@/lib/place-query";
import { toWhatsApp } from "@/lib/place";

export const Route = createFileRoute("/hizmetler")({
  loader: ({ context }) => context.queryClient.ensureQueryData(placeQueryOptions),
  head: () => ({
    meta: [
      { title: "Antrenman Alanları — Aysan Army Elite Training Club" },
      {
        name: "description",
        content:
          "Ring ve boks çalışması, reformer pilates ve kuvvet antrenmanı: Çekmeköy'deki Aysan Army Elite Training Club'ın antrenman alanları.",
      },
      {
        property: "og:title",
        content: "Antrenman Alanları — Aysan Army Elite Training Club",
      },
      {
        property: "og:description",
        content: "Ring, reformer pilates ve kuvvet antrenmanı alanları.",
      },
    ],
  }),
  component: Services,
});

const areas = [
  {
    title: "Ring & boks çalışması",
    photo: clubPhotos.ring,
    points: [
      "Halat kenarlıklı ring",
      "Duvar ve zincir kum torbaları",
      "Serbest hareket alanı",
    ],
  },
  {
    title: "Reformer pilates",
    photo: clubPhotos.pilates,
    points: ["Ahşap reformer", "Cadillac / kule ünitesi", "Sessiz, ayrı stüdyo"],
  },
  {
    title: "Kuvvet antrenmanı",
    photo: clubPhotos.strength,
    points: ["Geniş dambıl seti", "Kablo istasyonu", "Ayna duvarı"],
  },
];

function Services() {
  const { data: place } = useSuspenseQuery(placeQueryOptions);
  const whatsapp = toWhatsApp(place.internationalPhone ?? place.nationalPhone);

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
        <Reveal>
          <p className="eyebrow text-accent">Antrenman alanları</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[1]">
            Ne çalışmak isterseniz, alanı hazır
          </h1>
          <p className="mt-7 max-w-xl text-muted-foreground">
            Program, seans içeriği ve üyelik detayları için doğrudan kulüple iletişime
            geçmeniz en doğrusu — güncel bilgiyi orada alırsınız.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-28 sm:px-8 lg:grid-cols-3">
        {areas.map((area, index) => (
          <Reveal key={area.title} delay={index * 120} as="article">
            <ArchPhoto src={area.photo.url} alt={area.photo.alt} className="aspect-[4/5]" />
            <h2 className="mt-8 text-3xl text-foreground">{area.title}</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {area.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 h-1 w-4 shrink-0 bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>

      <section className="grain border-t border-border/60 bg-walnut">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-24 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-2xl text-4xl text-plaster sm:text-5xl">
            Size uygun olanı birlikte planlayalım
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/iletisim"
              className="inline-flex items-center gap-2 rounded-full bg-honey px-8 py-4 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              İletişim
              <ArrowUpRight size={16} aria-hidden />
            </Link>
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-plaster/40 px-8 py-4 text-sm font-medium text-plaster transition-colors hover:bg-plaster/10"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
