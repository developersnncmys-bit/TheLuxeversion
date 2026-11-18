"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
// useEffect kept commented alongside the disabled slider interval below.
import { useRef, useState } from "react";

const SLIDES = [
  {
    src: "/images/new-banner/home.png",
    alt: "The Luxe Version — sculptural pieces composed in a quiet interior"
  }
];

// const SLIDE_DURATION_MS = 4000; // slider disabled

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [active] = useState(0);

  // Slider auto-rotation disabled for now — first slide only.
  // useEffect(() => {
  //   const id = window.setInterval(() => {
  //     setActive((i) => (i + 1) % SLIDES.length);
  //   }, SLIDE_DURATION_MS);
  //   return () => window.clearInterval(id);
  // }, []);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-ink text-chalk grain"
    >
      {/* Outer parallax wrapper — scroll drives y + scale for cinematic exit. */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {/* Stacked slides, crossfade via AnimatePresence. No Ken-Burns zoom —
            the image holds still while it's visible. */}
        <AnimatePresence>
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[active].src}
              alt={SLIDES[active].alt}
              fill
              priority={active === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/70" />
      </motion.div>

      {/* Bottom-centered "cta-rule" — the tiny uppercase text sitting above a short vertical line */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-x-0 bottom-10 z-10 flex justify-center md:bottom-14"
      >
        <a href="#collection" className="cta-rule text-chalk">
          Discover the new collection
        </a>
      </motion.div>

      {/* Slide indicators — disabled while the slider is turned off.
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 right-6 z-10 flex items-center gap-2 md:bottom-14 md:right-10"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-[3px] transition-all duration-500 ease-silk ${
              i === active ? "w-8 bg-chalk" : "w-4 bg-chalk/40 hover:bg-chalk/70"
            }`}
          />
        ))}
      </motion.div>
      */}
    </section>
  );
}
