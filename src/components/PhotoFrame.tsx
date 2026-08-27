import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Quiet-luxury photo frame: warm timber edge, thin gold hairline and a slow
 * scroll-synced parallax drift on the image itself.
 */
export function PhotoFrame({
  src,
  alt,
  className,
  imageClassName,
  eager = false,
  parallax = 8,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  eager?: boolean;
  parallax?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1.12]);

  return (
    <div ref={ref} className={cn("photo-frame", className)}>
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={{ y, scale }}
        className={cn("h-full w-full object-cover will-change-transform", imageClassName)}
      />
    </div>
  );
}
