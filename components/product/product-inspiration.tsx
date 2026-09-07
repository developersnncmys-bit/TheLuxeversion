"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import type { Product, ProductInspirationReason } from "@/lib/content";

// "Inspiration" — a full-bleed in-situ shot followed by a numbered
// three-column rationale grid: the reasons a buyer would want to live with
// this specific piece. Sits between the Material/Craft macros and the
// pull-quote. Distinct from every other section on the detail page — no
// other section uses a numbered reasons grid — so it registers as its own
// beat in the page's narrative.
//
// Falls back gracefully:
//   - No `inspiration` at all         → the section renders nothing.
//   - `inspiration.reasons` missing   → falls back to `body` paragraph.
//   - `inspiration.image` missing     → falls back to `lifestyleImage` /
//                                        `product.image`.

export function ProductInspiration({ product }: { product: Product }) {
  const inspiration = product.inspiration;
  if (!inspiration) return null;

  const image = inspiration.image ?? product.lifestyleImage ?? product.image;
  const eyebrow = inspiration.eyebrow ?? "Why This Piece";
  const reasons = inspiration.reasons ?? [];

  return (
    <section
      className="relative bg-ink text-chalk"
      aria-labelledby={`inspiration-${product.handle}`}
    >
      {/* Full-bleed cinematic image with cursor-follow parallax + zoom.
          The image lives inside its own sub-component so the parallax
          hooks aren't affected by the early-return upstream. */}
      <ParallaxImage
        src={image}
        alt={`${product.name} — ${eyebrow}`}
        seed={`${product.handle}-inspiration`}
      />

      <div className="mx-auto max-w-editorial px-6 py-20 md:px-14 md:py-28">
        {/* Header — eyebrow + display title, centred. Restrained. */}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10px] uppercase tracking-[0.32em] text-chalk/70"
          >
            {eyebrow}
          </motion.p>

          <motion.h2
            id={`inspiration-${product.handle}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold uppercase leading-[1.15] tracking-[0.04em]"
          >
            {inspiration.title}
          </motion.h2>

          {/* Thin gold-standard rule beneath the title — a hairline that
              separates header from the numbered grid. */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="block h-px w-16 origin-center bg-chalk/40"
          />

          {inspiration.body && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-[13px] leading-[1.85] text-chalk/80 md:text-[14px]"
            >
              {inspiration.body}
            </motion.p>
          )}
        </div>

        {/* Numbered rationale grid — three columns on desktop, single
            stack on mobile. Each card leads with an OVERSIZED italic serif
            numeral that acts as the visual anchor (magazine-editorial
            treatment), then a growing hairline, kicker, and body. Every
            element enters with its own scroll-triggered animation so the
            three cards read as a choreographed sequence, not a static
            wall. Hover on each card intensifies the numeral and extends
            the rule — subtle but present. */}
        {reasons.length > 0 && (
          <ul className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-x-10 gap-y-20 md:mt-28 md:grid-cols-3 md:gap-x-16">
            {reasons.map((reason, i) => (
              <ReasonCard key={reason.label} index={i} reason={reason} />
            ))}
          </ul>
        )}

        {inspiration.ctaLabel && inspiration.ctaHref && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 flex justify-center md:mt-24"
          >
            <Link href={inspiration.ctaHref} className="cta-rule text-chalk">
              {inspiration.ctaLabel}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Inspiration image with cursor-follow parallax + zoom. On pointer enter
// the image scales up ~6%; as the cursor moves within the frame, the image
// translates OPPOSITE to the cursor (classic "peek" parallax — feels like
// the frame is a viewport onto a larger image behind it, so different edges
// of the piece are revealed depending on where you look). Springs smooth
// the motion so it never jitters. Pointer leave returns to rest.
//
// The scroll-triggered fade-in lives on the outer container; the parallax
// transforms live on an inner motion.div so opacity and transform don't
// compete for the same style slot. The bottom scrim sits outside the
// parallax container so it stays anchored to the frame edge, not the
// image.
function ParallaxImage({
  src,
  alt,
  seed
}: {
  src: string;
  alt: string;
  seed: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Normalised cursor position (-1 to 1 in each axis) + scale target.
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const scale = useMotionValue(1);

  // Spring config — snappier than a default spring so the image tracks
  // the cursor closely, but still damped enough that quick flicks don't
  // overshoot. Lighter mass = faster response.
  const springConfig = { stiffness: 160, damping: 18, mass: 0.25 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const springScale = useSpring(scale, {
    stiffness: 140,
    damping: 20,
    mass: 0.3
  });

  // Map cursor position to translation. Inverted (positive cursor → negative
  // translate) so the image reveals the edge you're pointing towards — the
  // "peek behind" effect rather than "drag along". Amplitude bumped so the
  // movement is unmistakably visible during interaction.
  const translateX = useTransform(springX, [-1, 1], ["6%", "-6%"]);
  const translateY = useTransform(springY, [-1, 1], ["6%", "-6%"]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    cursorX.set(nx);
    cursorY.set(ny);
  };

  const handlePointerEnter = () => {
    scale.set(1.1);
  };

  const handlePointerLeave = () => {
    cursorX.set(0);
    cursorY.set(0);
    scale.set(1);
  };

  // Wheel-to-zoom while hovering. Scroll up = zoom in further, scroll down
  // = zoom out below the resting scale (< 1 shows letterbox against the
  // onyx background — that's the "wider view" state). Clamped so it never
  // gets absurdly big or vanishes to a dot.
  //
  // React 17+ makes onWheel passive by default, so preventDefault via the
  // synthetic handler is ignored. Attaching natively with { passive: false }
  // is the reliable way to stop the page from scrolling while zooming.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const current = scale.get();
      const next = Math.max(0.85, Math.min(1.35, current - e.deltaY * 0.0015));
      scale.set(next);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [scale]);

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[4/5] w-full overflow-hidden bg-onyx md:aspect-[21/9]"
    >
      <motion.div
        style={{ x: translateX, y: translateY, scale: springScale }}
        className="absolute inset-0 will-change-transform"
      >
        <SafeImage
          src={src}
          alt={alt}
          fallbackSeed={seed}
          fill
          sizes="100vw"
          quality={68}
          className="object-cover"
        />
      </motion.div>
      {/* Scrim stays anchored to the frame edge — not translated with the
          parallax layer, so it never lifts off the bottom. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/60 to-transparent"
      />
    </motion.div>
  );
}

// Single rationale card — the modern editorial treatment:
//   1. Oversized italic-serif numeral acts as the visual anchor, mask-
//      revealed from below on scroll so it "rises" into view.
//   2. Vertical hairline to the right of the numeral grows top-to-bottom,
//      like a paragraph rule in a magazine spread.
//   3. Horizontal hairline draws in from the left before the label.
//   4. Kicker + body fade up sequentially.
//   5. On hover: the numeral warms from chalk/12 to chalk/30 and the
//      horizontal rule extends — small tactile cue that the card is a
//      focused unit, not a passive block.
//
// Each element is staggered by `index * 0.12s` so the three cards read as
// a left-to-right sweep across the row rather than firing all at once.
function ReasonCard({
  reason,
  index
}: {
  reason: ProductInspirationReason;
  index: number;
}) {
  const stagger = index * 0.12;

  return (
    <motion.li
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="group relative flex flex-col text-left"
    >
      {/* Top row — oversized numeral on the left, thin vertical rule
          growing down its right edge. */}
      <div className="relative flex items-start gap-6">
        {/* Numeral in a mask-reveal: overflow-hidden container + a span
            translated 100% down at rest, sliding up to 0 on inView. */}
        <div className="relative overflow-hidden leading-[0.8]">
          <motion.span
            aria-hidden
            variants={{
              hidden: { y: "100%" },
              visible: { y: "0%" }
            }}
            transition={{
              duration: 1.1,
              delay: 0.1 + stagger,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="block font-[family-name:var(--font-serif-display)] text-[clamp(2.5rem,3.6vw,3.75rem)] font-light italic leading-[0.85] text-chalk/25 transition-colors duration-700 ease-silk group-hover:text-chalk/45"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
        </div>

        {/* Vertical hairline — grows from the top down, matches the
            numeral's height. Extends visually into the numeral column. */}
        <motion.span
          aria-hidden
          variants={{
            hidden: { scaleY: 0 },
            visible: { scaleY: 1 }
          }}
          transition={{
            duration: 0.9,
            delay: 0.45 + stagger,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="mt-2 block h-[clamp(2rem,3vw,2.75rem)] w-px origin-top bg-chalk/30 transition-colors duration-500 group-hover:bg-chalk/60"
        />
      </div>

      {/* Horizontal hairline — draws in from the left, then extends
          further on hover. This is the "hinge" between the numeral row
          and the copy below. */}
      <motion.span
        aria-hidden
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1 }
        }}
        transition={{
          duration: 0.9,
          delay: 0.55 + stagger,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="mt-8 block h-px w-12 origin-left bg-chalk/50 transition-[width] duration-500 ease-silk group-hover:w-20"
      />

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{
          duration: 0.9,
          delay: 0.65 + stagger,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-chalk"
      >
        {reason.label}
      </motion.p>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{
          duration: 1,
          delay: 0.75 + stagger,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="mt-4 text-[13px] leading-[1.75] text-chalk/75 md:text-[14px]"
      >
        {reason.body}
      </motion.p>
    </motion.li>
  );
}
