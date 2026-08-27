import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";

const interests = [
  "Ring / boks antrenmanı",
  "Pilates / reformer",
  "Kuvvet antrenmanı",
  "Henüz emin değilim",
] as const;

const inputClass =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const interest = String(data.get("interest") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2 || phone.length < 7) {
      toast.error("Lütfen adınızı ve telefon numaranızı eksiksiz yazın.");
      return;
    }

    setStatus("sending");
    const { error } = await supabase.from("contact_requests").insert({
      name: name.slice(0, 120),
      phone: phone.slice(0, 40),
      email: email ? email.slice(0, 200) : null,
      interest: interest ? interest.slice(0, 80) : null,
      message: message ? message.slice(0, 2000) : null,
    });

    if (error) {
      console.error(error);
      setStatus("idle");
      toast.error("Mesaj gönderilemedi. Lütfen telefonla ulaşmayı deneyin.");
      return;
    }

    form.reset();
    setStatus("sent");
    toast.success("Mesajınız iletildi.");
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-border/70 bg-card/70 backdrop-blur-sm lift p-10 text-center glow-soft">
        <h3 className="font-display text-3xl text-foreground">Mesajınız bize ulaştı</h3>
        <p className="mt-4 text-sm text-muted-foreground">
          En kısa sürede size dönüş yapılacaktır. Acele bir durum varsa telefondan da
          ulaşabilirsiniz.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Yeni mesaj yaz
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border/70 bg-card/70 backdrop-blur-sm lift p-7 glow-soft sm:p-9"
    >
      <h2 className="font-display text-3xl text-foreground">Bize yazın</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Kısa bir not bırakın, size dönüş yapalım.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs text-muted-foreground">Ad Soyad *</span>
          <input name="name" required maxLength={120} className={inputClass} placeholder="Adınız" />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs text-muted-foreground">Telefon *</span>
          <input
            name="phone"
            required
            maxLength={40}
            inputMode="tel"
            className={inputClass}
            placeholder="05xx xxx xx xx"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs text-muted-foreground">E-posta</span>
          <input
            name="email"
            type="email"
            maxLength={200}
            className={inputClass}
            placeholder="ornek@eposta.com"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs text-muted-foreground">İlgilendiğiniz alan</span>
          <select name="interest" defaultValue="" className={inputClass}>
            <option value="">Seçiniz</option>
            {interests.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-xs text-muted-foreground">Mesajınız</span>
          <textarea
            name="message"
            rows={4}
            maxLength={2000}
            className={`${inputClass} resize-none`}
            placeholder="Nasıl yardımcı olabiliriz?"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-walnut px-8 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" && <Loader2 size={15} className="animate-spin" aria-hidden />}
        Gönder
      </button>
    </form>
  );
}
