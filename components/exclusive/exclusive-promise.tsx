"use client";

import { motion } from "framer-motion";

export function ExclusivePromise() {
  return (
    <section
      className="relative bg-ink pt-20 pb-32 text-chalk md:pt-28 md:pb-44"
      aria-labelledby="exclusive-promise-heading"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center md:px-14">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-[10px] uppercase tracking-[0.38em] text-chalk/55"
        >
          The Promise of the House
        </motion.p>

        {/* Italic subhead */}
        <motion.h2
          id="exclusive-promise-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-light italic leading-[1.2] tracking-[0.005em] text-chalk"
        >
          Artistry without borders.
        </motion.h2>

        {/* Hairline divider */}
        <motion.span
          aria-hidden
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 block h-px w-14 origin-center bg-chalk/40"
        />

        {/* Body paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 max-w-xl space-y-7 text-[13px] leading-[1.95] text-chalk/80 md:text-[14px]"
        >
          <p>
            Conceived in India with a global perspective, LUXE EXCLUSIVE brings
            together artistic distinction and an exceptional standard of
            personal service.
          </p>
          <p>
            Each acquisition is guided by a dedicated relationship with our
            studio. From the individual selection of marble, chosen for its
            natural character and distinctive veining, to the final refinement
            of its sculptural form, the entire artistic process unfolds
            in-house, under our personal direction and through the skilled
            hands of our selected artisans.
          </p>
          <p>
            This dedication extends beyond the studio. Each sculpture is
            individually prepared, expertly protected and entrusted to
            specialised international delivery partners, with a level of care
            befitting its artistic distinction.
          </p>
          <p>
            With personal oversight throughout, from the inception of an order
            to its arrival, our clientele experiences the continuity and
            attention synonymous with the House.
          </p>
          <p>
            Wherever our pieces find their home, the standards of THE LUXE
            VERSION remain uncompromised.
          </p>
          <p>
            A name that stands as much for the integrity of its commitments as
            for the distinction of its art.
          </p>
        </motion.div>

        {/* Hairline above the signature lines */}
        <motion.span
          aria-hidden
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-20 block h-px w-14 origin-center bg-chalk/40 md:mt-28"
        />

        {/* Signature lines */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 text-[11px] uppercase tracking-[0.34em] text-chalk/85 md:text-[12px]"
        >
          Rooted in India. Destined for the world.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-[11px] uppercase tracking-[0.34em] text-chalk/70 md:text-[12px]"
        >
          Artistry. Intention. Legacy.
        </motion.p>
      </div>
    </section>
  );
}
