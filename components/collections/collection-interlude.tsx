"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function CollectionInterlude() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  // Slow parallax — image drifts as the band scrolls past.
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="index"
      ref={ref}
      className="relative h-[80vh] w-full overflow-hidden bg-ink md:h-[100vh]"
      aria-hidden="true"
    >
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.15]">
        <Image
          src="/images/new-banner/studio41.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
    </section>
  );
}
