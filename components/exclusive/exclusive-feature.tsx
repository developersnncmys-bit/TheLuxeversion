"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { useStore } from "@/components/store/store-provider";
import type { ExclusivePiece as ExclusivePieceType } from "@/lib/content";

// The featured piece of the Luxe Exclusive line — a single centred vitrine.
// Loud only in the sense that everything is axis-aligned around it: image in
// the centre of the viewport, caption stacked beneath, generous negative
// space top and bottom so the piece reads as a hero exhibit.
export function ExclusiveFeature({ piece }: { piece: ExclusivePieceType }) {
  const { addToCart, openDrawer } = useStore();
  const handleAddToBag = () => {
    addToCart(piece.slug, 1);
    openDrawer("cart");
  };

  return (
    <section
      aria-labelledby={`feature-${piece.slug}-heading`}
      className="relative bg-ink text-chalk"
    >
      <div className="mx-auto flex max-w-editorial flex-col items-center px-6 pt-16 pb-20 text-center md:px-14 md:pt-20 md:pb-24">
        {/* Eyebrow — the only thing above the piece. Positions it as the one
            to look at. */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-[10px] uppercase tracking-[0.38em] text-champagne/80 md:mb-12"
        >
          The Featured Piece
        </motion.p>

        {/* Image — portrait, centred. Smaller than you'd expect; the air
            around it is the point. */}
        <motion.figure
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/4] w-[88%] overflow-hidden bg-onyx sm:w-[78%] md:w-[62%] lg:w-[54%]"
        >
          <Link href={`/exclusive/${piece.slug}`} aria-label={`Open ${piece.name}`} className="group block h-full w-full">
            <SafeImage
              src={piece.image}
              alt={`${piece.name} — ${piece.discipline}`}
              fallbackSeed={`feature-${piece.slug}`}
              fill
              sizes="(min-width: 1024px) 54vw, (min-width: 768px) 62vw, 88vw"
              quality={74}
              className="object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.04]"
            />
          </Link>
        </motion.figure>

        {/* Discipline + name — centred, with a hairline between the piece and
            the words so the caption feels placed rather than attached. */}
        <motion.span
          aria-hidden
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 block h-px w-14 origin-center bg-chalk/40"
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 text-[10px] uppercase tracking-[0.38em] text-chalk/55"
        >
          {piece.discipline}
        </motion.p>

        <motion.h2
          id={`feature-${piece.slug}-heading`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-light uppercase leading-[1.05] tracking-[0.03em]"
        >
          <Link href={`/exclusive/${piece.slug}`} className="transition-opacity hover:opacity-80">
            {piece.name}
          </Link>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 font-display text-[clamp(0.95rem,1.15vw,1.1rem)] italic text-chalk/70"
        >
          {piece.intro}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 text-[10px] uppercase tracking-[0.26em] text-chalk/45"
        >
          {piece.material} · {piece.dimensions} · Lead time {piece.leadTime}
        </motion.p>

        {/* Price + Add to Bag — centred, same button weight as the piece
            cards below. */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-6"
        >
          <p className="font-display text-[clamp(1.25rem,1.5vw,1.5rem)] font-light tracking-[0.02em] text-chalk">
            ₹ {piece.price.inr.toLocaleString("en-IN")}
            <span className="text-chalk/50">*</span>
          </p>

          <button
            type="button"
            onClick={handleAddToBag}
            className="inline-flex items-center justify-center border border-chalk bg-chalk px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink transition-colors duration-500 ease-silk hover:bg-transparent hover:text-chalk"
          >
            Add to Bag
          </button>

          <Link
            href={`/exclusive/${piece.slug}`}
            className="text-[10px] uppercase tracking-[0.3em] text-chalk/60 underline underline-offset-[6px] decoration-chalk/30 transition-colors hover:text-chalk hover:decoration-chalk/60"
          >
            View the piece
          </Link>

          <p className="text-[9px] uppercase tracking-[0.26em] text-chalk/40">
            {piece.edition}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
