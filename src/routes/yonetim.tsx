import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Check,
  Loader2,
  LogOut,
  Mail,
  Phone,
  RefreshCw,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/yonetim")({
  head: () => ({
    meta: [
      { title: "Yönetim Paneli — Aysan Army Elite Training Club" },
      {
        name: "description",
        content:
          "Kulüp yetkilileri için iletişim ve üyelik taleplerinin görüntülendiği yönetim paneli.",
      },
      { property: "og:title", content: "Yönetim Paneli — Aysan Army" },
      { property: "og:description", content: "İletişim taleplerini görüntüleyin ve yönetin." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});

type ContactRequest = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  interest: string | null;
  message: string | null;
  handled: boolean;
  created_at: string;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Admin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filter, setFilter] = useState<"all" | "open" | "handled">("all");

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      if (!data.session) {
        navigate({ to: "/giris" });
        return;
      }
      setSignedIn(true);
      setEmail(data.session.user.email ?? null);

      const { data: claimed } = await supabase.rpc("claim_first_admin");
      if (!active) return;
      setIsAdmin(Boolean(claimed));
      setReady(true);
    }

    bootstrap();
    return () => {
      active = false;
    };
  }, [navigate]);

  const requests = useQuery({
    queryKey: ["contact-requests"],
    enabled: ready && isAdmin,
    queryFn: async (): Promise<ContactRequest[]> => {
      const { data, error } = await supabase
        .from("contact_requests")
        .select("id,name,phone,email,interest,message,handled,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ContactRequest[];
    },
  });

  const toggleHandled = useMutation({
    mutationFn: async ({ id, handled }: { id: string; handled: boolean }) => {
      const { error } = await supabase.from("contact_requests").update({ handled }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact-requests"] }),
    onError: () => toast.error("Güncellenemedi."),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contact_requests").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Talep silindi.");
      queryClient.invalidateQueries({ queryKey: ["contact-requests"] });
    },
    onError: () => toast.error("Silinemedi."),
  });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/giris" });
  }

  if (!signedIn || !ready) {
    return (
      <main className="flex min-h-[100svh] items-center justify-center">
        <Loader2 className="animate-spin text-accent" aria-hidden />
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="mx-auto flex min-h-[100svh] max-w-md flex-col justify-center px-5 py-32 text-center">
        <h1 className="font-display text-4xl">Yetkiniz yok</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Bu hesap ({email}) yönetici olarak tanımlı değil. Kulüp yöneticisiyle iletişime geçin.
        </p>
        <button
          type="button"
          onClick={signOut}
          className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm"
        >
          <LogOut size={15} aria-hidden /> Çıkış yap
        </button>
        <Link to="/" className="mt-4 text-sm text-muted-foreground underline underline-offset-4">
          Siteye dön
        </Link>
      </main>
    );
  }

  const list = (requests.data ?? []).filter((item) =>
    filter === "all" ? true : filter === "handled" ? item.handled : !item.handled,
  );
  const openCount = (requests.data ?? []).filter((item) => !item.handled).length;

  return (
    <main className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-accent">Yönetim</p>
          <h1 className="mt-3 font-display text-5xl">Gelen talepler</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {email} · toplam {requests.data?.length ?? 0} talep, {openCount} tanesi bekliyor.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => requests.refetch()}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-accent/40"
          >
            <RefreshCw size={14} className={requests.isFetching ? "animate-spin" : ""} aria-hidden />
            Yenile
          </button>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-accent/40"
          >
            <LogOut size={14} aria-hidden /> Çıkış
          </button>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {(
          [
            ["all", "Tümü"],
            ["open", "Bekleyen"],
            ["handled", "Tamamlanan"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-full px-5 py-2 text-sm transition-colors ${
              filter === value
                ? "bg-honey text-ink"
                : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {requests.isLoading ? (
        <div className="mt-16 flex justify-center">
          <Loader2 className="animate-spin text-accent" aria-hidden />
        </div>
      ) : list.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-border/70 bg-card/60 p-12 text-center">
          <ShieldCheck size={24} className="mx-auto text-accent" aria-hidden />
          <p className="mt-4 text-sm text-muted-foreground">Bu filtrede talep yok.</p>
        </div>
      ) : (
        <ul className="mt-10 space-y-4">
          {list.map((item) => (
            <li
              key={item.id}
              className={`rounded-2xl border bg-card/60 p-6 backdrop-blur-sm transition-colors ${
                item.handled ? "border-border/50 opacity-70" : "border-border/80"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl">{item.name}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">{formatDate(item.created_at)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      toggleHandled.mutate({ id: item.id, handled: !item.handled })
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs transition-colors hover:border-accent/40"
                  >
                    <Check size={13} aria-hidden />
                    {item.handled ? "Bekleyene al" : "Tamamlandı"}
                  </button>
                  <button
                    type="button"
                    onClick={() => remove.mutate(item.id)}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
                    aria-label="Talebi sil"
                  >
                    <Trash2 size={13} aria-hidden />
                  </button>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                <a
                  href={`tel:${item.phone.replace(/[^\d+]/g, "")}`}
                  className="inline-flex items-center gap-2 text-foreground hover:text-accent"
                >
                  <Phone size={14} aria-hidden /> {item.phone}
                </a>
                {item.email && (
                  <a
                    href={`mailto:${item.email}`}
                    className="inline-flex items-center gap-2 text-foreground hover:text-accent"
                  >
                    <Mail size={14} aria-hidden /> {item.email}
                  </a>
                )}
                {item.interest && (
                  <span className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground">
                    {item.interest}
                  </span>
                )}
              </div>

              {item.message && (
                <p className="mt-5 whitespace-pre-line border-t border-border/50 pt-5 text-sm leading-relaxed text-muted-foreground">
                  {item.message}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
