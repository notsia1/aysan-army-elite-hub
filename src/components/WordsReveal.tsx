import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Headline animation: each word rises out of its own mask with a staggered,
 * weighted easing — no bouncing, no letter-by-letter noise.
 */
export function WordsReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.075,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="mr-[0.28em] inline-block overflow-hidden pb-[0.06em] align-bottom"
        >
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            initial={{ y: "110%", opacity: 0, rotate: 2 }}
            animate={{ y: "0%", opacity: 1, rotate: 0 }}
            transition={{
              duration: 1.1,
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
