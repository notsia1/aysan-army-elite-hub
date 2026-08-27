import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export function Stars({
  rating,
  className,
  size = 14,
}: {
  rating: number;
  className?: string;
  size?: number;
}) {
  const rounded = Math.round(rating);
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`${rating} / 5 yıldız`}
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <Star
          key={index}
          size={size}
          strokeWidth={1.5}
          className={cn(
            index < rounded ? "fill-accent text-accent" : "text-border",
          )}
          aria-hidden
        />
      ))}
    </span>
  );
}
