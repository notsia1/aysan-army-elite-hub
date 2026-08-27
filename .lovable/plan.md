# Aysan Army Elite Training Club — Website

Turkish-language site for the club, built around verified Google Maps data and the four uploaded assets. No invented trainers, certifications, statistics, medical claims, or result promises.

## Verified starting point

The shared link resolves to a real place record:

- Name: Aysan Army Elite Training Club
- Coordinates: 41.0452857, 29.1806379 (İstanbul)

Everything else shown on the site — full address, phone, opening hours, star rating, review count, review quotes, Google photos — is pulled live from that place record. Nothing is typed in by hand.

## Step 1: Connect Google Maps

I open the Google Maps connector card. Once it is linked, a server-side function fetches the place by ID and returns only: name, formatted address, phone, opening hours, rating, review count, review text/author/date, and coordinates. Results are cached so the page does not re-bill on every visit.

If a field is missing from Google, the site simply omits that block rather than filling it with a guess.

## Step 2: Assets

The three photographs (boxing ring with classical busts, pilates studio, dumbbell hall) and the white logo mark go to CDN storage and are used as hero, section, and gallery imagery. The photos define the visual language: warm cream plaster, arch forms, honey-toned indirect light, walnut floors, classical sculpture.

## Step 3: Design direction

Art direction pulled straight from the rooms, not from a generic gym template:

- Palette: cream/plaster background, walnut brown, warm honey light accent, deep charcoal ink for text. No neon, no black-and-red gym cliché.
- Type: a classical display serif for headlines (echoing the busts and the Ionic column), a clean grotesk for body — Turkish diacritics fully supported.
- Structure: arch motifs as an actual layout device — arched image masks, arched section dividers, a soft warm glow behind key imagery mirroring the LED-lit arches.
- Motion: slow, weighted reveals — images rising into their arches on scroll, a light-sweep on hover. Restrained, gallery-like, never bouncy.

## Step 4: Pages

Separate routes, each with its own Turkish metadata:

- `/` — hero with the ring photograph and logo, positioning line, the live Google rating badge, primary CTA
- `/tesis` — the facility told through the three photographs: ring hall, pilates studio, strength hall
- `/hizmetler` — training areas that the photos and place record actually evidence (boxing/ring training, pilates/reformer, strength training). Described as what the space offers, without promising outcomes.
- `/galeri` — full-bleed gallery of the club photography, plus Google-sourced photos when available
- `/iletisim` — live address, phone, hours, embedded map at the verified coordinates, contact form, and direct WhatsApp/call buttons
- Reviews section (on `/` and `/iletisim`): real Google reviews with reviewer name, rating, date, and an attribution link. No editing of review text.

## Step 5: Contact

Both paths, as requested:

- Direct WhatsApp and tel: buttons using the phone number from the place record
- A contact form storing submissions in Lovable Cloud (name, phone, message, preferred training area), with rate limiting and a confirmation state

This adds a database, so Lovable Cloud gets enabled in this step.

## Technical notes

- TanStack Start routes; Google Maps calls go through the connector gateway inside `createServerFn` handlers only — never from the browser, never with a raw key in client code.
- Place details fetched via Places API (New) `places/v1/places/{placeId}` with a narrow field mask (address, phone, hours, rating, review count, reviews, location) to keep quota use low; response cached, loaded through the route loader with `ensureQueryData`.
- Map embedded with the browser key at the verified coordinates.
- Design tokens (palette, arch radii, warm glow shadows, serif/grotesk families) defined in `src/styles.css` as semantic tokens; fonts loaded via `<link>` in the root route.
- Contact form: one Cloud table with insert-only public policy plus explicit grants; no public read of submissions.
- Turkish copy throughout, `lang="tr"`, responsive, accessible alt text on every photograph.

## Explicitly not included

No trainer bios, no certification badges, no "X kg lost" figures, no health/medical claims, no guarantees, no invented pricing or class schedule. If you want pricing or a schedule later, send me the real numbers and I will add them.
