import { cn } from "@/lib/utils";

/** Arched, honey-lit image frame echoing the club's LED archways. */
export function ArchPhoto({
  src,
  alt,
  className,
  imageClassName,
  deep = false,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  deep?: boolean;
  eager?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-3 glow-honey opacity-60",
          deep ? "arch-deep" : "arch",
        )}
      />
      <div
        className={cn(
          "absolute inset-0 light-sweep bg-muted",
          deep ? "arch-deep" : "arch",
        )}
      >
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={cn("h-full w-full object-cover", imageClassName)}
        />
      </div>
    </div>
  );
}
