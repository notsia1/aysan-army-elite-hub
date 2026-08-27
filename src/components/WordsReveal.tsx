import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Masked, per-word rise. `inView` switches the trigger from page load to the
 * moment the line scrolls into the viewport.
 */
export function WordsReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.075,
  inView = false,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  inView?: boolean;
}) {
  const words = text.split(" ");
  const animation = { y: "0%", opacity: 1, rotate: 0 };

  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="mr-[0.28em] inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            initial={{ y: "110%", opacity: 0, rotate: 1.5 }}
            {...(inView
              ? { whileInView: animation, viewport: { once: true, amount: 0.4 } }
              : { animate: animation })}
            transition={{
              duration: 1.05,
              delay: delay + index * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
