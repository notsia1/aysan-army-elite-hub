import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { ArchPhoto } from "@/components/ArchPhoto";
import { Reveal } from "@/components/Reveal";
import { clubPhotoList } from "@/lib/photos";
import { placeQueryOptions } from "@/lib/place-query";
import { CLUB_NAME } from "@/lib/place";

export const Route = createFileRoute("/galeri")({
  loader: ({ context }) => context.queryClient.ensureQueryData(placeQueryOptions),
  head: () => ({
    meta: [
      { title: "Galeri — Aysan Army Elite Training Club" },
      {
        name: "description",
        content:
          "Aysan Army Elite Training Club'ın ring salonu, pilates stüdyosu ve kuvvet alanından fotoğraflar; ayrıca Google Haritalar fotoğrafları.",
      },
      { property: "og:title", content: "Galeri — Aysan Army Elite Training Club" },
      {
        property: "og:description",
        content: "Kulübün ring, pilates ve kuvvet alanlarından fotoğraflar.",
      },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const { data: place } = useSuspenseQuery(placeQueryOptions);

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
        <Reveal>
          <p className="eyebrow text-accent">Galeri</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[1]">
            Kulübe içeriden bir bakış
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 sm:px-8 md:grid-cols-3">
        {clubPhotoList.map((photo, index) => (
          <Reveal key={photo.url} delay={index * 110}>
            <ArchPhoto
              src={photo.url}
              alt={photo.alt}
              className="aspect-[3/4]"
              deep={index === 1}
            />
          </Reveal>
        ))}
      </section>

      {place.photoUrls.length > 0 && (
        <section className="border-t border-border/60 bg-plaster">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <Reveal>
              <h2 className="eyebrow text-muted-foreground">Google Haritalar fotoğrafları</h2>
            </Reveal>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {place.photoUrls.map((url, index) => (
                <Reveal as="li" key={url} delay={index * 70}>
                  <img
                    src={url}
                    alt={`${CLUB_NAME} — Google Haritalar fotoğrafı ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full rounded-lg object-cover glow-soft"
                  />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
