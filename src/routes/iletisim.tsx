import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";

import { ContactForm } from "@/components/ContactForm";
import { GoogleRating } from "@/components/GoogleRating";
import { MapEmbed } from "@/components/MapEmbed";
import { OpeningHours } from "@/components/OpeningHours";
import { Reveal } from "@/components/Reveal";
import { Reviews } from "@/components/Reviews";
import { placeQueryOptions } from "@/lib/place-query";
import { toDialable, toWhatsApp } from "@/lib/place";

export const Route = createFileRoute("/iletisim")({
  loader: ({ context }) => context.queryClient.ensureQueryData(placeQueryOptions),
  head: () => ({
    meta: [
      { title: "İletişim ve Konum — Aysan Army Elite Training Club" },
      {
        name: "description",
        content:
          "Aysan Army Elite Training Club'a ulaşın: Çekmeköy adresi, telefon, WhatsApp, çalışma saatleri ve harita.",
      },
      {
        property: "og:title",
        content: "İletişim ve Konum — Aysan Army Elite Training Club",
      },
      {
        property: "og:description",
        content: "Adres, telefon, WhatsApp, çalışma saatleri ve harita.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { data: place } = useSuspenseQuery(placeQueryOptions);
  const dialable = toDialable(place.nationalPhone);
  const whatsapp = toWhatsApp(place.internationalPhone ?? place.nationalPhone);

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-14 pt-36 sm:px-8 sm:pt-44">
        <Reveal>
          <p className="eyebrow text-accent">İletişim</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[1]">
            Çekmeköy&apos;de sizi bekliyoruz
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-8">
            <GoogleRating place={place} />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="space-y-10">
          <div className="space-y-5">
            {place.address && (
              <div className="flex gap-4">
                <MapPin size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <div>
                  <h2 className="eyebrow text-muted-foreground">Adres</h2>
                  <a
                    href={place.googleMapsUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-accent"
                  >
                    {place.address}
                    <ExternalLink size={13} aria-hidden />
                  </a>
                </div>
              </div>
            )}
            {dialable && (
              <div className="flex gap-4">
                <Phone size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <div>
                  <h2 className="eyebrow text-muted-foreground">Telefon</h2>
                  <a
                    href={`tel:${dialable}`}
                    className="mt-2 block text-foreground transition-colors hover:text-accent"
                  >
                    {place.nationalPhone}
                  </a>
                </div>
              </div>
            )}
            {whatsapp && (
              <div className="flex gap-4">
                <MessageCircle size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <div>
                  <h2 className="eyebrow text-muted-foreground">WhatsApp</h2>
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-foreground transition-colors hover:text-accent"
                  >
                    Mesaj gönderin
                  </a>
                </div>
              </div>
            )}
          </div>

          <OpeningHours place={place} />
          <MapEmbed place={place} />
        </Reveal>

        <Reveal delay={140}>
          <ContactForm />
        </Reveal>
      </section>

      <div className="border-t border-border/60 bg-secondary">
        <Reviews place={place} limit={6} />
      </div>
    </>
  );
}
