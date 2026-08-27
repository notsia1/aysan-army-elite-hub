import { useEffect } from "react";

/**
 * Inertial (smooth) page scrolling. Lenis is loaded only in the browser so the
 * SSR pass never touches window.
 */
export function SmoothScroll() {
  useEffect(() => {


    let destroy: (() => void) | undefined;
    let frame = 0;

    void (async () => {
      const { default: Lenis } = await import("lenis");
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        wheelMultiplier: 0.9,
        touchMultiplier: 1.6,
      });

      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      destroy = () => {
        cancelAnimationFrame(frame);
        lenis.destroy();
      };
    })();

    return () => destroy?.();
  }, []);

  return null;
}
