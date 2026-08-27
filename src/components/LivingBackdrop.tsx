/**
 * Site-wide living background: drifting honey aurora, slow moving grid and a
 * fine grain layer, so no section ever sits on a flat, plain surface.
 * Purely decorative — fixed, behind all content, pointer-events none.
 */
export function LivingBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="bg-grid absolute inset-0 opacity-70" />

      <div
        className="aurora-blob left-[-15%] top-[-10%] h-[46vw] w-[46vw] bg-accent/25"
        style={{ animationDuration: "28s" }}
      />
      <div
        className="aurora-blob right-[-12%] top-[20%] h-[40vw] w-[40vw] bg-accent/12"
        style={{ animationDuration: "34s", animationDelay: "-8s" }}
      />
      <div
        className="aurora-blob bottom-[-18%] left-[25%] h-[52vw] w-[52vw] bg-walnut/60"
        style={{ animationDuration: "40s", animationDelay: "-16s" }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,transparent_35%,var(--background)_100%)]" />
      <div className="grain absolute inset-0 opacity-90" />
    </div>
  );
}
