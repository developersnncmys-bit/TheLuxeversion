"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HouseHero() {
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
      className="relative h-[100svh] w-full overflow-hidden bg-ink text-chalk grain"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="/images/new-banner/sculptures-stone.webp"
          alt="The House — the studio at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Heavier bottom wash so the title has weight; deliberately quieter than /collections */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/20 to-ink/70" />
      </motion.div>

      {/* Bottom-anchored title cluster — commented out; hero shows image + cta only.
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 z-10 flex items-end px-6 pb-24 md:px-14 md:pb-32"
      >
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-chalk/75"
          >
            <span className="inline-block h-px w-10 bg-chalk/60" />
            The Luxe Version · Est. 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-display-lg font-semibold uppercase text-chalk"
          >
            The House
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-md text-[11px] uppercase leading-[1.8] tracking-[0.18em] text-chalk/85 md:text-[12px]"
          >
            A house of decorative objects — a point of view, a craft, a way of keeping.
          </motion.p>
        </div>
      </motion.div>
      */}

      <motion.div
        style={{ opacity }}
        className="absolute inset-x-0 bottom-10 z-10 flex justify-center md:bottom-14"
      >
        <Link href="#point-of-view" className="cta-rule text-chalk">
          Enter the house
        </Link>
      </motion.div>
    </section>
  );
}
