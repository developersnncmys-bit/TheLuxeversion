"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";

export function HouseStory() {
  return (
    <section
      className="relative bg-ink py-32 text-chalk md:py-48"
      aria-labelledby="story-heading"
    >
      <div className="mx-auto max-w-editorial px-6 md:px-14">
        {/* Centred section header — eyebrow + title, matching POV / Art-of-Objects rhythm */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-chalk/55"
          >
            <span className="inline-block h-px w-10 bg-chalk/50" />
            The Mind Behind the House
            <span className="inline-block h-px w-10 bg-chalk/50" />
          </motion.p>

          <motion.h2
            id="story-heading"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-display-md font-semibold uppercase leading-[1.02] tracking-[0.06em]"
          >
            L&rsquo;Auteur
          </motion.h2>
        </div>

        {/* Two-column body — biography left, portrait right. Stacks on mobile. */}
        <div className="mt-20 grid grid-cols-12 items-center gap-10 md:mt-28 md:gap-20">
          {/* ── LEFT · Biography ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 space-y-7 text-[14px] leading-[1.95] text-chalk/80 md:col-span-7 md:text-[15px]"
          >
            <p className="font-display text-[clamp(1.25rem,1.9vw,1.75rem)] font-light italic leading-[1.35] text-chalk/90">
              &ldquo;We started with one sculpture and a small studio. The rest of
              the house grew around it.&rdquo;
            </p>
            <p>
              The Luxe Version began the way most quiet things do — with a single
              piece, made carefully, that other rooms wanted. A sculpture, carved
              by hand, placed on the studio&rsquo;s own mantel. Then a vessel. Then
              a form in bronze that did not need explaining.
            </p>
            <p>
              The house was opened because there was no place to buy these pieces
              from. The luxury stores were noisy. The design shops were dense.
              Both were full of things that had never been asked to earn their
              room.
            </p>
            <p>
              The measure here is different — fewer pieces, more time, makers we
              know. Objects chosen not for what they say about a room, but for
              what they let the room say back.
            </p>
          </motion.div>

          {/* ── RIGHT · Portrait card ── */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-onyx">
              {/* TODO: drop the actual founder portrait at /public/images/founder.png.
                  Until then, SafeImage falls back to a picsum editorial still. */}
              <SafeImage
                src="/images/founder.png"
                alt="Portrait of the founder, in the studio"
                fallbackSeed="luxe-founder"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-5 text-center">
              <p className="font-display text-[15px] font-semibold uppercase tracking-[0.08em] text-chalk md:text-[16px]">
                L&rsquo;Auteur
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.32em] text-chalk/55">
                Founder &amp; Curator · The Luxe Version
              </p>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
