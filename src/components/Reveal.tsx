import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "figure";
  /** Movement direction for the reveal. */
  from?: "up" | "left" | "right" | "none";
};

const offsets = {
  up: { y: 34, x: 0 },
  left: { y: 0, x: -34 },
  right: { y: 0, x: 34 },
  none: { y: 0, x: 0 },
} as const;

/** Slow, weighted scroll reveal — gallery-like, never bouncy. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  from = "up",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;
  const offset = offsets[from];

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: offset.y, x: offset.x, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: 1,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Tag>
  );
}
