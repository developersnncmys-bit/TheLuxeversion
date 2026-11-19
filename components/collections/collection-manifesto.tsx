"use client";

import { motion } from "framer-motion";

export function CollectionManifesto() {
  return (
    <section
      className="relative bg-ink py-16 text-chalk md:py-44"
      aria-labelledby="manifesto-heading"
    >
      {/* Chanel-style centred cluster: small kicker → wide display heading → narrow
          uppercase micro body. Everything stacks on the vertical axis, symmetrical. */}
      <div className="mx-auto flex max-w-editorial flex-col items-center px-6 text-center md:px-14">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-chalk/60"
        >
          <span className="inline-block h-px w-10 bg-chalk/50" />
          An Introduction
          <span className="inline-block h-px w-10 bg-chalk/50" />
        </motion.p>

        <motion.h2
          id="manifesto-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(1.625rem,3vw,2.75rem)] font-semibold uppercase leading-[1.05] tracking-[0.005em]"
        >
          The collection is made of few things
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 max-w-xl text-[14px] leading-[1.9] text-chalk/80 md:text-[15px]"
        >
          Every piece here is made to be lived with — not styled around.
          A sculpture, a vessel, a quiet form on a shelf. Small in number,
          precise in intent, each object has a life longer than the room
          it enters. The Luxe Version is a house for those pieces.
        </motion.p>
      </div>
    </section>
  );
}
