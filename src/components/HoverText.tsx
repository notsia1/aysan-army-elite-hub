import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Hover-reactive headline. Each letter lifts, brightens and picks up a honey
 * glow under the cursor; the entrance is a soft per-word fade so nothing
 * competes with the interaction itself.
 */
export function HoverText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  let index = -1;

  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, wordIndex) => (
        <motion.span
          key={`${word}-${wordIndex}`}
          className="mr-[0.26em] inline-flex"
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.9,
            delay: delay + wordIndex * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word.split("").map((char) => {
            index += 1;
            return (
              <span
                key={`${char}-${index}`}
                className="hover-letter inline-block"
                aria-hidden={false}
              >
                {char}
              </span>
            );
          })}
        </motion.span>
      ))}
    </span>
  );
}
