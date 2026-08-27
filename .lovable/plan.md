# Siteyi Kendi Bilgisayarınızda Çalıştırma — Neden Boş Görünüyor ve Çözümü

## Sorunun nedeni (doğrulandı)

Site GitHub'dan indirilip `bun dev` / `npm run dev` ile kendi bilgisayarınızda çalıştırılınca canlı veri gelmiyor. Sebep kod hatası değil — anahtarların eksik olması:

- **Google Haritalar verisi** (adres, puan, 114 değerlendirme, Google fotoğrafları) Lovable'ın güvenli ağ geçidi üzerinden geliyor. Bunun için `LOVABLE_API_KEY` ve `GOOGLE_MAPS_API_KEY` gerekiyor. Bu ikisi **sadece Lovable sunucularında çalışırken otomatik sağlanıyor**; GitHub'daki koda dahil değiller (güvenlik gereği böyle olması doğru).
- **İletişim formu ve yönetim paneli** Lovable Cloud veritabanına bağlı. Yerel çalıştırmada veritabanı adresi/anahtarı tanımlı olmadığı için form ve giriş ekranı çalışmıyor.
- Tasarım, fotoğraflar, sayfalar ve animasyonlar yine de çalışır — bozuk olan sadece canlı veri kısımları.

Yani site Lovable'da yayınlandığı sürece her şey çalışır; sorun sadece "yerelde aynı canlı veriyi görme" meselesi.

## Yapılacaklar

### 1. Yerel geliştirme için `.env.example` ve kurulum kılavuzu (README)

- Projenin köküne `.env.example` eklenecek: hangi ortam değişkenlerinin gerektiği, hangilerinin Lovable'a özel olduğu açıklamalı.
- `README.md`'ye Türkçe bir "Kendi bilgisayarımda çalıştırma" bölümü: `bun install` → `.env` oluşturma → `bun dev` adımları ve "canlı Google/veritabanı verisi yerelde neden gelmez" açıklaması.

### 2. Yerelde eksik anahtarları zarifçe karşılama

- Anahtarlar yoksa site çökmek yerine doğrulanmış sabit bilgilerle (isim, koordinat, Google Maps bağlantısı) çalışacak şekilde mevcut yedek (fallback) davranışı korunacak ve tutarlı hale getirilecek.
- İletişim formu, veritabanı bağlantısı yoksa kullanıcıya net bir "şu anda alınamıyor, lütfen WhatsApp ile ulaşın" mesajı gösterecek — sessizce hata vermeyecek.

### 3. İsteğe bağlı: yerelde de canlı Google verisi

İsterseniz kendi Google Cloud hesabınızdan ücretsiz bir **Places API anahtarı** alıp yerel `.env`'ye koyma yolunu da kılavuza eklerim. Böylece yerelde de değerlendirmeler ve Google fotoğrafları gelir. (Bu anahtar kendi Google hesabınıza ait olur; koda işlenmez.)

## Teknik notlar

- Kod değişikliği minimal: `README.md`, `.env.example`, `src/lib/place.server.ts` ve `src/components/ContactForm.tsx` içinde küçük sağlamlaştırma.
- Mevcut Lovable yayını ve önizlemesi hiç etkilenmez.
- Hiçbir gizli anahtar depoya yazılmaz; `.env.example` sadece isimleri listeler.

## Açık soru

3. adımdaki "kendi Google API anahtarıyla yerelde canlı veri" kısmını da ister misiniz, yoksa kılavuz + sağlam yedek davranış yeterli mi? (Plan onayında belirtebilirsiniz; belirtmezseniz kılavuzda "isteğe bağlı bölüm" olarak yer alır.)
