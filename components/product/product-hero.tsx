"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { useStore } from "@/components/store/store-provider";
import type { Product } from "@/lib/content";

type Props = {
  product: Product;
  ref_: string;
};

// Product hero — Tridhavarnam-style layout:
//   Desktop — thumbnails on the LEFT (vertical column), main image in the
//     centre, product panel on the right. Clicking a thumbnail switches the
//     main image via crossfade — no scroll pin, no spacers. Info panel is a
//     normal column that scrolls with the page.
//   Mobile  — main image on top, horizontal thumb strip below it, then the
//     product panel underneath.
//
// Preload behaviour is preserved from the previous scroll-driven version:
// only the images the user has actually landed on (plus their neighbours)
// get mounted, so the browser doesn't fetch every gallery shot on first
// paint.
export function ProductHero({ product, ref_ }: Props) {
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]));
  const thumbStripRef = useRef<HTMLDivElement>(null);

  // Hover-zoom on the main image. Cursor position (as a % of the frame)
  // drives transform-origin so moving the mouse pans the zoomed view.
  const [zooming, setZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const handleZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const scrollThumbs = (dir: 1 | -1) => {
    const el = thumbStripRef.current;
    if (!el) return;
    // Scroll by roughly one thumbnail's height so each click advances the
    // strip by one row rather than a fixed pixel amount.
    const step = el.clientHeight * 0.35;
    el.scrollBy({ top: step * dir, behavior: "smooth" });
  };

  const { addToCart, openDrawer, toggleWishlist, isInWishlist } = useStore();
  const saved = isInWishlist(product.handle);
  const handleAddToBag = () => {
    addToCart(product.handle, 1);
    openDrawer("cart");
  };

  const selectImage = (i: number) => {
    setActiveIndex(i);
    setMounted((prev) => {
      if (prev.has(i) && prev.has(i + 1) && prev.has(i - 1)) return prev;
      const next = new Set(prev);
      next.add(i);
      if (i + 1 < gallery.length) next.add(i + 1);
      if (i - 1 >= 0) next.add(i - 1);
      return next;
    });
  };

  return (
    <section
      id="product-hero"
      className="relative bg-ink text-chalk"
      aria-labelledby="product-heading"
    >
      {/* Top padding clears the fixed nav (h-20 main bar + top-5 pill panel
          on desktop). Without this the hero's first row of content sits
          behind the nav. Value matches the old design's `top-36` offset. */}
      <div className="grid grid-cols-1 pt-24 md:grid-cols-12 md:pt-36">
        {/* ── DESKTOP THUMBNAIL COLUMN ────────────────────────────────────
            Kalki-style: narrow strip on the left with up/down chevrons
            that advance the selected image. Thumbnails hold a fixed
            portrait aspect and scroll vertically inside the column if
            there are more than fit; overflow bar is hidden. */}
        <div className="hidden md:col-span-1 md:flex md:h-[80svh] md:flex-col md:items-stretch md:py-2 md:pl-4 md:pr-2">
          <button
            type="button"
            onClick={() => scrollThumbs(-1)}
            aria-label="Scroll thumbnails up"
            className="mb-2 flex h-6 w-full items-center justify-center text-chalk/60 transition-colors hover:text-chalk"
          >
            <Chevron dir="up" />
          </button>

          <div
            ref={thumbStripRef}
            className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {gallery.map((src, i) => (
              <button
                key={`thumb-${src}-${i}`}
                type="button"
                onClick={() => selectImage(i)}
                aria-label={`View image ${i + 1} of ${gallery.length}`}
                aria-current={i === activeIndex}
                className={clsx(
                  "relative aspect-[4/5] w-full flex-shrink-0 overflow-hidden bg-onyx transition-all duration-500 ease-silk",
                  i === activeIndex
                    ? "opacity-100 ring-1 ring-chalk/40"
                    : "opacity-60 hover:opacity-100"
                )}
              >
                <SafeImage
                  src={src}
                  alt=""
                  fallbackSeed={`${product.handle}-thumb-${i}`}
                  fill
                  sizes="8vw"
                  quality={55}
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollThumbs(1)}
            aria-label="Scroll thumbnails down"
            className="mt-2 flex h-6 w-full items-center justify-center text-chalk/60 transition-colors hover:text-chalk"
          >
            <Chevron dir="down" />
          </button>
        </div>

        {/* ── MAIN IMAGE ─────────────────────────────────────────────────
            Kalki-style: edge-to-edge fill via object-cover, decorative
            zoom glyph pinned top-right. Images crossfade in place; only
            the active + neighbours are mounted so the browser doesn't
            preload the whole gallery on first paint. */}
        <div
          className={clsx(
            "relative bg-onyx overflow-hidden aspect-[4/5] md:col-span-6",
            "md:h-[600px] md:w-[600px] md:aspect-auto md:cursor-zoom-in"
          )}
          onMouseEnter={() => setZooming(true)}
          onMouseLeave={() => setZooming(false)}
          onMouseMove={handleZoomMove}
        >
          {gallery.map((src, i) => (
            <div
              key={`main-${src}-${i}`}
              className={clsx(
                "absolute inset-0 transition-opacity duration-700 ease-silk",
                i === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0"
              )}
              style={
                i === activeIndex
                  ? {
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transform: zooming ? "scale(2)" : "scale(1)",
                      transition: zooming
                        ? "transform 0.15s ease-out"
                        : "transform 0.4s ease-out, opacity 0.7s cubic-bezier(0.22,1,0.36,1)"
                    }
                  : undefined
              }
            >
              {mounted.has(i) && (
                <SafeImage
                  src={src}
                  alt={`${product.name} — view ${i + 1}`}
                  fallbackSeed={`${product.handle}-${i}`}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  quality={i === 0 ? 78 : 74}
                  className="object-cover"
                />
              )}
            </div>
          ))}

          <div
            className={clsx(
              "pointer-events-none absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-chalk/40 bg-ink/40 text-chalk backdrop-blur-sm transition-opacity duration-300",
              zooming ? "opacity-0" : "opacity-100"
            )}
          >
            <ZoomGlyph />
          </div>
        </div>

        {/* ── MOBILE THUMBNAIL STRIP ─────────────────────────────────────
            Horizontal row below the main image on mobile. Scrolls
            horizontally if the gallery is wide enough. Hidden on desktop
            (thumbnails live in the left column instead). */}
        <div className="flex gap-2 overflow-x-auto px-4 py-4 md:hidden">
          {gallery.map((src, i) => (
            <button
              key={`thumb-mobile-${src}-${i}`}
              type="button"
              onClick={() => selectImage(i)}
              aria-label={`View image ${i + 1} of ${gallery.length}`}
              aria-current={i === activeIndex}
              className={clsx(
                "relative aspect-[4/5] w-16 flex-shrink-0 overflow-hidden bg-onyx transition-all duration-500 ease-silk",
                i === activeIndex
                  ? "opacity-100 ring-1 ring-chalk/40"
                  : "opacity-60"
              )}
            >
              <SafeImage
                src={src}
                alt=""
                fallbackSeed={`${product.handle}-thumb-mobile-${i}`}
                fill
                sizes="64px"
                quality={50}
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* ── PRODUCT PANEL ──────────────────────────────────────────────
            Right-hand column on desktop, stacked below on mobile. No
            sticky positioning — the hero is now a single-viewport section
            that scrolls with the page. Panel content is unchanged from
            the previous design. */}
        <aside className="relative md:col-span-5">
          <div className="md:flex md:min-h-[80svh] md:items-center">
            <div className="w-full px-6 py-16 md:px-14 md:py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-sm"
              >
                <h1
                  id="product-heading"
                  className="font-display text-[clamp(1.125rem,1.6vw,1.5rem)] font-bold uppercase leading-[1.2] tracking-[0.02em]"
                >
                  {product.name}
                </h1>

                <div className="mt-5 h-px w-52 bg-chalk/40" aria-hidden />

                {product.material && (
                  <p className="mt-6 text-[13px] leading-[1.55] text-chalk/85">
                    {product.material}
                  </p>
                )}

                <a
                  href="#product-info"
                  className="mt-2 inline-block text-[12px] text-chalk/75 underline underline-offset-[5px] decoration-chalk/40 transition-colors hover:text-chalk hover:decoration-chalk/80"
                >
                  More details
                </a>

                <p className="mt-10 text-[12px] text-chalk/45">
                  Ref. {ref_}
                </p>

                <div className="mt-10 flex items-baseline gap-2">
                  <p className="text-[14px] tracking-[0.01em] text-chalk">
                    ₹ {product.price.inr.toLocaleString("en-IN")}
                    <span className="text-chalk/50">*</span>
                  </p>
                  <p className="text-[11px] text-chalk/45">
                    Retail suggested price
                  </p>
                </div>

                <div className="mt-10 flex w-full max-w-sm items-stretch gap-3">
                  <button
                    type="button"
                    onClick={handleAddToBag}
                    className="flex-1 bg-chalk py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink transition-opacity hover:opacity-90"
                  >
                    Add to bag
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.handle)}
                    aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
                    aria-pressed={saved}
                    className={clsx(
                      "flex h-auto w-12 shrink-0 items-center justify-center border transition-colors",
                      saved
                        ? "border-chalk bg-chalk/10 text-chalk"
                        : "border-chalk/40 text-chalk/80 hover:border-chalk hover:text-chalk"
                    )}
                  >
                    <HeartGlyph filled={saved} />
                  </button>
                </div>

                <p className="mt-8 text-[11px] text-chalk/40">
                  *MRP (inclusive of all taxes).{" "}
                  <a
                    href="#product-info"
                    className="underline underline-offset-[4px] decoration-chalk/30 transition-colors hover:text-chalk/70 hover:decoration-chalk/60"
                  >
                    More information
                  </a>
                </p>
              </motion.div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function HeartGlyph({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="18"
      height="18"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 16.5S3.5 13 3.5 8.25a3.25 3.25 0 0 1 6.5-.5 3.25 3.25 0 0 1 6.5.5C16.5 13 10 16.5 10 16.5Z" />
    </svg>
  );
}

function Chevron({ dir }: { dir: "up" | "down" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={dir === "down" ? "rotate-180" : undefined}
    >
      <path d="M5 12l5-5 5 5" />
    </svg>
  );
}

function ZoomGlyph() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="8.5" cy="8.5" r="5" />
      <path d="M12.5 12.5l3.5 3.5" />
      <path d="M8.5 6.5v4M6.5 8.5h4" />
    </svg>
  );
}
