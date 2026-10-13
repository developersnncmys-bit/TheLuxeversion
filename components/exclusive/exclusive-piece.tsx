"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import type { ExclusivePiece } from "@/lib/content";

// A single made-to-order piece — image on one side, caption on the other,
// vertically centred so they read as one object. Pieces alternate sides.
// Negative space comes from column proportions and section padding, not
// from stacking the caption below the image.
export function ExclusivePiece({
  piece,
  index
}: {
  piece: ExclusivePiece;
  index: number;
}) {
  const mirror = index % 2 === 1;

  return (
    <section
      id={`piece-${piece.number.toLowerCase()}`}
      aria-labelledby={`piece-${piece.slug}-heading`}
      className="relative bg-ink text-chalk"
    >
      <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-12 md:gap-12 md:px-14 md:py-36 lg:gap-20">
        {/* Image column */}
        <motion.figure
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className={
            mirror
              ? "relative aspect-[4/5] w-full md:col-span-6 md:col-start-7 md:aspect-[3/4]"
              : "relative aspect-[4/5] w-full md:col-span-6 md:col-start-1 md:aspect-[3/4]"
          }
        >
          <SafeImage
            src={piece.image}
            alt={`${piece.name} — ${piece.discipline}`}
            fallbackSeed={`exclusive-${piece.slug}`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            quality={72}
            className="object-contain"
          />
        </motion.figure>

        {/* Caption column */}
        <div
          className={
            mirror
              ? "min-w-0 md:col-span-6 md:col-start-1 md:row-start-1 md:pr-4"
              : "min-w-0 md:col-span-6 md:col-start-7 md:row-start-1 md:pl-4"
          }
        >
          <motion.span
            aria-hidden
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="block font-[family-name:var(--font-serif-display)] text-[clamp(3rem,5vw,4.5rem)] font-light italic leading-[0.85] text-chalk/20"
          >
            {piece.number}
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-[10px] uppercase tracking-[0.38em] text-chalk/55"
          >
            {piece.discipline}
          </motion.p>

          <motion.h2
            id={`piece-${piece.slug}-heading`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-light uppercase leading-[1.1] tracking-[0.01em]"
          >
            {piece.name}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[clamp(0.95rem,1.1vw,1.05rem)] italic text-chalk/70"
          >
            {piece.intro}
          </motion.p>

          <motion.span
            aria-hidden
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 block h-px w-10 origin-left bg-chalk/35"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-[13px] leading-[1.85] text-chalk/75 md:text-[14px]"
          >
            {piece.body}
          </motion.p>

          {/* Spec rail */}
          <motion.dl
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 divide-y divide-chalk/10 border-y border-chalk/10"
          >
            {[
              { label: "Material", value: piece.material },
              { label: "Dimensions", value: piece.dimensions },
              { label: "Lead time", value: piece.leadTime },
              { label: "Edition", value: piece.edition }
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-6 py-3"
              >
                <dt className="text-[10px] uppercase tracking-[0.3em] text-chalk/50">
                  {row.label}
                </dt>
                <dd className="text-right text-[12px] tracking-[0.04em] text-chalk/85">
                  {row.value}
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1.1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <a
              href={`/studio/appointment?piece=${piece.slug}`}
              className="inline-flex items-center justify-center border border-chalk bg-chalk px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink transition-colors duration-500 ease-silk hover:bg-transparent hover:text-chalk"
            >
              Request to Order
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
