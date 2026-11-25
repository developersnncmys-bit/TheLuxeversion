"use client";

import { motion } from "framer-motion";

export function ExclusivePromise() {
  return (
    <section
      className="relative bg-ink py-24 text-chalk md:py-40"
      aria-labelledby="exclusive-promise-heading"
    >
      {/* Chanel-style centred cluster — matches CollectionManifesto / EditIntro
          so the page reads in the same manifesto language as the rest of the
          house. Small kicker-with-hairlines → wide display heading → stacked
          body paragraphs → divider → signature lines. */}
      <div className="mx-auto flex max-w-editorial flex-col items-center px-6 text-center md:px-14">
        {/* Eyebrow with flanking hairlines */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-[12px] uppercase tracking-[0.3em] text-chalk/70 md:text-[14px]"
        >
          The Promise of the House
        </motion.p>

        {/* Display heading — same typographic treatment as the other manifestos */}
        <motion.h2
          id="exclusive-promise-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(1.625rem,3vw,2.75rem)] font-semibold uppercase leading-[1.05] tracking-[0.005em]"
        >
          Artistry without borders
        </motion.h2>

        {/* Body paragraphs — centred, narrow column, same scale as sibling
            manifestos (max-w-xl, 14/15 px, leading 1.9). Breathing room
            between paragraphs keeps the stack from feeling wall-of-text. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 max-w-3xl space-y-6 text-[14px] leading-[1.9] text-chalk/80 [text-wrap:pretty] md:text-[15px]"
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

        {/* Hairline separator before the signature lines */}
        <motion.span
          aria-hidden
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 block h-px w-14 origin-center bg-chalk/40 md:mt-20"
        />

        {/* Signature lines — close the section with brand mantra, same
            uppercase-tracked treatment as elsewhere on the page. */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 text-[11px] uppercase tracking-[0.34em] text-chalk/85 md:text-[12px]"
        >
          Rooted in India · Destined for the world
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-[11px] uppercase tracking-[0.34em] text-chalk/55 md:text-[12px]"
        >
          Artistry · Intention · Legacy
        </motion.p>
      </div>
    </section>
  );
}
