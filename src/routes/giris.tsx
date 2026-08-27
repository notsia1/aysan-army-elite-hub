import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/giris")({
  head: () => ({
    meta: [
      { title: "Yönetim Girişi — Aysan Army Elite Training Club" },
      {
        name: "description",
        content:
          "Aysan Army Elite Training Club yönetim paneli girişi. Sadece kulüp yetkilileri içindir.",
      },
      { property: "og:title", content: "Yönetim Girişi — Aysan Army" },
      { property: "og:description", content: "Kulüp yetkilileri için yönetim paneli girişi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SignIn,
});

const inputClass =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent";

function SignIn() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/yonetim" });
    });
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    if (!email || password.length < 6) {
      toast.error("E-posta ve en az 6 karakterli şifre girin.");
      return;
    }

    setBusy(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/yonetim` },
      });
      setBusy(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Hesap oluşturuldu. Giriş yapabilirsiniz.");
      setMode("signin");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      toast.error("Giriş yapılamadı. Bilgileri kontrol edin.");
      return;
    }
    navigate({ to: "/yonetim" });
  }

  return (
    <main className="mx-auto flex min-h-[100svh] max-w-md flex-col justify-center px-5 py-32">
      <div className="rounded-lg border border-border/70 bg-card/70 p-8 backdrop-blur-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-secondary/50 text-accent">
          <Lock size={20} strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 font-display text-4xl">Yönetim girişi</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Bu alan yalnızca kulüp yetkilileri içindir. Formdan gelen üyelik taleplerini buradan
          görebilirsiniz.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-xs text-muted-foreground">E-posta</span>
            <input name="email" type="email" required className={inputClass} autoComplete="email" />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs text-muted-foreground">Şifre</span>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className={inputClass}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-honey px-8 py-3.5 text-sm font-semibold text-ink transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy && <Loader2 size={15} className="animate-spin" aria-hidden />}
            {mode === "signin" ? "Giriş yap" : "Hesap oluştur"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          {mode === "signin" ? "Yetkili hesabı oluştur" : "Zaten hesabım var"}
        </button>
      </div>
    </main>
  );
}
