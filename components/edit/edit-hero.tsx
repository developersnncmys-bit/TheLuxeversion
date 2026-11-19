"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function EditHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-ink text-chalk grain"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="/images/new-banner/edit-hero.webp"
          alt="The Edit — a curated selection of pieces"
          fill
          priority
          sizes="100vw"
          className="object-cover [object-position:center_15%]"
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute inset-x-0 bottom-10 z-10 flex justify-center md:bottom-14"
      >
        <Link href="#statement" className="cta-rule text-chalk">
          Begin the selection
        </Link>
      </motion.div>
    </section>
  );
}
