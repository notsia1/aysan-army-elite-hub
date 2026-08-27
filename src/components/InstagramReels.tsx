import { Instagram, Play } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, reelUrls, toEmbedUrl } from "@/lib/instagram";

/** Instagram reels wall. Falls back to a profile invitation when no reel is listed. */
export function InstagramReels() {
  return (
    <section className="border-t border-border/60 bg-ink/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-accent">Instagram</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Kulüpten görüntüler</h2>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-plaster/25 px-6 py-3 text-sm text-plaster/85 transition-colors hover:border-honey/60 hover:text-honey"
          >
            <Instagram size={16} aria-hidden />@{INSTAGRAM_HANDLE}
          </a>
        </Reveal>

        {reelUrls.length > 0 ? (
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {reelUrls.map((url, index) => (
              <Reveal key={url} delay={index * 110}>
                <div className="photo-frame aspect-[9/16] w-full">
                  <iframe
                    src={toEmbedUrl(url)}
                    title={`Instagram reel ${index + 1}`}
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={120}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-14 flex flex-col items-center gap-5 rounded-3xl border border-plaster/12 wood-panel px-8 py-20 text-center transition-colors hover:border-honey/45"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full border border-honey/40 text-honey transition-transform duration-500 group-hover:scale-110">
                <Play size={22} aria-hidden />
              </span>
              <span className="text-lg text-plaster">
                Antrenman videolarının tamamı Instagram hesabımızda
              </span>
              <span className="text-sm text-plaster/60">@{INSTAGRAM_HANDLE}</span>
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
