"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ExclusiveHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[90svh] w-full overflow-hidden bg-ink text-chalk grain"
      aria-labelledby="exclusive-hero-heading"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {/* Poster PNG paints instantly on first render; the mp4 takes over
            once the browser has enough bytes. autoPlay + muted + playsInline
            is the trio iOS requires to permit silent autoplay. */}
        <video
          src="/images/banners/Exclusive.mp4"
          poster="/images/banners/Exclusive1.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/30" />
      </motion.div>

      <div className="relative z-10 flex min-h-[90svh] flex-col items-start justify-center px-6 text-left md:px-14 lg:px-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-[10px] uppercase tracking-[0.38em] text-chalk/70"
        >
          Made to Order · In-House
        </motion.p>

        <motion.h1
          id="exclusive-hero-heading"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-light uppercase leading-[1.05] tracking-[0.03em]"
        >
          Luxe Exclusive
        </motion.h1>

        <motion.span
          aria-hidden
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 block h-px w-14 origin-left bg-chalk/60"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-sm text-[12px] leading-[1.85] text-chalk/80 md:text-[13px]"
        >
          An ode to the timeless beauty of marble. Each piece is brought to life
          by our chosen artisans in India.
        </motion.p>
      </div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-6 z-10 md:bottom-14 md:left-14 lg:left-20"
      >
        <Link href="#piece-i" className="cta-rule text-chalk">
          Begin the line
        </Link>
      </motion.div>
    </section>
  );
}
