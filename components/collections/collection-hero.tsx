"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function CollectionHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-ink text-chalk grain"
    >
      {/* Parallax cover — one still image; the drama comes from scale + wash, not autoplay */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="/images/new-banner/product.webp"
          alt="The Collection — a composed interior at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover [object-position:center_15%]"
        />
        {/* Diagonal wash — heavier bottom so the title sits comfortably on darker ground */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/15 via-transparent to-ink/40" />
      </motion.div>

      {/* Bottom-centered cta-rule — signature Chanel-style scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-x-0 bottom-10 z-10 flex justify-center md:bottom-14"
      >
        <Link href="#index" className="cta-rule text-chalk">
          Discover the pieces
        </Link>
      </motion.div>
    </section>
  );
}
