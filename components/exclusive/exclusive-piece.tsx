"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { useStore } from "@/components/store/store-provider";
import type { ExclusivePiece as ExclusivePieceType } from "@/lib/content";

// A single made-to-order piece on the Luxe Exclusive page. Composition is
// a vitrine: a small, centred product image sitting inside a large black
// pocket, with the caption floating to its side. Negative space is the
// loudest element on the page — the piece is read as a precious object
// placed under a spotlight, not as a product-grid tile.
//
// Pieces alternate sides so the sequence sways softly down the page.
export function ExclusivePiece({
  piece,
  index
}: {
  piece: ExclusivePieceType;
  index: number;
}) {
  const mirror = index % 2 === 1;
  const { addToCart, openDrawer } = useStore();
  const handleAddToBag = () => {
    addToCart(piece.slug, 1);
    openDrawer("cart");
  };

  return (
    <section
      id={`piece-${piece.number.toLowerCase()}`}
      aria-labelledby={`piece-${piece.slug}-heading`}
      className="relative bg-ink text-chalk"
    >
      <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-16 px-6 py-16 md:grid-cols-12 md:gap-10 md:px-14 md:py-24 lg:py-28">
        {/* Image column — deliberately small: a quarter of the width on
            desktop, giving the surrounding black room to breathe. */}
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={
            mirror
              ? "relative mx-auto aspect-square w-[88%] overflow-hidden bg-onyx md:col-span-6 md:col-start-7 md:mx-0 md:w-full"
              : "relative mx-auto aspect-square w-[88%] overflow-hidden bg-onyx md:col-span-6 md:col-start-1 md:mx-0 md:w-full"
          }
        >
          <Link href={`/exclusive/${piece.slug}`} aria-label={`Open ${piece.name}`} className="group block h-full w-full">
            <SafeImage
              src={piece.image}
              alt={`${piece.name} — ${piece.discipline}`}
              fallbackSeed={`exclusive-${piece.slug}`}
              fill
              sizes="(min-width: 768px) 50vw, 88vw"
              quality={72}
              className="object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.04]"
            />
          </Link>
        </motion.figure>

        {/* Caption column — sparse, centred vertically against the image.
            Numeral is a quiet gold marker; name is the loudest word on the
            page; everything else sits beneath a hairline. */}
        <div
          className={
            mirror
              ? "md:col-span-5 md:col-start-2 md:row-start-1"
              : "md:col-span-5 md:col-start-7 md:row-start-1"
          }
        >
          <motion.span
            aria-hidden
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="block font-[family-name:var(--font-serif-display)] text-[clamp(1.5rem,2vw,2rem)] font-light italic leading-[1] text-champagne/80"
          >
            {piece.number}
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[10px] uppercase tracking-[0.38em] text-chalk/55"
          >
            {piece.discipline}
          </motion.p>

          <motion.h2
            id={`piece-${piece.slug}-heading`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-light uppercase leading-[1.05] tracking-[0.03em]"
          >
            <Link href={`/exclusive/${piece.slug}`} className="transition-opacity hover:opacity-80">
              {piece.name}
            </Link>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[clamp(0.95rem,1.1vw,1.05rem)] italic text-chalk/70"
          >
            {piece.intro}
          </motion.p>

          <motion.span
            aria-hidden
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.5, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 block h-px w-10 origin-left bg-chalk/35"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-md text-[13px] leading-[1.85] text-chalk/70"
          >
            {piece.body}
          </motion.p>

          {/* Compact spec line — material · dimensions · lead time as one
              inline rail. Lower visual weight than the previous dl stack. */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.5, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-[10px] uppercase tracking-[0.26em] text-chalk/45"
          >
            {piece.material} · {piece.dimensions} · Lead time {piece.leadTime}
          </motion.p>

          {/* Price + Add to Bag — the resolution of the composition. */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.55, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6"
          >
            <div>
              <p className="font-display text-[clamp(1.1rem,1.3vw,1.25rem)] font-light tracking-[0.02em] text-chalk">
                ₹ {piece.price.inr.toLocaleString("en-IN")}
                <span className="text-chalk/50">*</span>
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.26em] text-chalk/40">
                {piece.edition}
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddToBag}
              className="inline-flex items-center justify-center border border-chalk bg-chalk px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink transition-colors duration-500 ease-silk hover:bg-transparent hover:text-chalk"
            >
              Add to Bag
            </button>

            <Link
              href={`/exclusive/${piece.slug}`}
              className="text-[10px] uppercase tracking-[0.3em] text-chalk/60 underline underline-offset-[6px] decoration-chalk/30 transition-colors hover:text-chalk hover:decoration-chalk/60"
            >
              View the piece
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
