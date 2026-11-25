"use client";

import { motion } from "framer-motion";

export function ExclusiveIntro() {
  return (
    <section
      className="relative bg-ink pt-24 pb-16 text-chalk md:pt-32 md:pb-20"
      aria-labelledby="exclusive-intro-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center md:px-14">
        <motion.p
          id="exclusive-intro-heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-[10px] uppercase tracking-[0.38em] text-chalk/55"
        >
          A Note from the Studio
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(0.95rem,1.2vw,1.1rem)] font-light leading-[1.75] text-chalk/85 md:leading-[1.8]"
        >
          Each piece within Luxe Exclusive is made to order, tailored to
          individual preferences and specifications. Shaped by hand and finished
          with meticulous attention to detail, every sculpture reflects the
          artistry of our makers and the enduring aesthetic of the House.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-display text-[clamp(0.95rem,1.2vw,1.1rem)] font-light italic leading-[1.75] text-chalk/80 md:leading-[1.8]"
        >
          An art form in which time is as essential as craftsmanship.
        </motion.p>

        <motion.span
          aria-hidden
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 block h-px w-14 origin-center bg-chalk/40"
        />
      </div>
    </section>
  );
}
