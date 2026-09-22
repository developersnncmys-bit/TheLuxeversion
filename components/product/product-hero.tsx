"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { useStore } from "@/components/store/store-provider";
import type { Product } from "@/lib/content";

type Props = {
  product: Product;
  ref_: string;
};

// Chanel-style split hero:
//   Desktop — image column (left) shows one shot at a time via sticky
//     display + crossfade; invisible scroll spacers (one per gallery image)
//     drive the active index. Right column has the sticky product panel.
//     Dots overlay the image, centred vertically, and always in the visible
//     frame because they live inside the sticky container.
//   Mobile — images stack naturally, panel appears after them.
export function ProductHero({ product, ref_ }: Props) {
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const [activeIndex, setActiveIndex] = useState(0);
  // Only mount images that have been (or are about to be) shown. Starts with
  // {0} and expands as the user scrolls into each gallery spacer. Prevents
  // the browser from downloading every gallery shot on first paint, which is
  // the main cause of slow hero-image loads.
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]));
  const spacerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { addToCart, openDrawer, toggleWishlist, isInWishlist } = useStore();
  const saved = isInWishlist(product.handle);
  const handleAddToBag = () => {
    addToCart(product.handle, 1);
    openDrawer("cart");
  };

  // Track which desktop spacer is centred in the viewport → drives which
  // image is shown in the sticky display. Also pre-mounts the neighbour
  // (idx-1 & idx+1) so the crossfade never has to wait on a fresh download.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            if (!Number.isNaN(idx)) {
              setActiveIndex(idx);
              setMounted((prev) => {
                if (prev.has(idx) && prev.has(idx + 1) && prev.has(idx - 1)) {
                  return prev;
                }
                const next = new Set(prev);
                next.add(idx);
                if (idx + 1 < gallery.length) next.add(idx + 1);
                if (idx - 1 >= 0) next.add(idx - 1);
                return next;
              });
            }
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    spacerRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [gallery.length]);

  const scrollToIndex = (i: number) => {
    spacerRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id="product-hero"
      // Section starts at top:0 — the fixed white navbar sits over the top
      // of the hero image cleanly, no visible black band between them. The
      // sticky panel + spacers still use top-36 so their content lands
      // BELOW the navbar rather than behind it.
      className="relative bg-ink text-chalk"
      aria-labelledby="product-heading"
    >
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Left column — 6 cols. Desktop: sticky image display + invisible
            spacers for scroll length. Mobile: stacked images. */}
        <div className="relative md:col-span-6">
          {/* Desktop: sticky image display */}
          <div className="hidden md:block md:sticky md:top-36 md:h-[calc(100svh-9rem)]">
            <div className="relative h-full w-full overflow-hidden bg-onyx">
              {gallery.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className={clsx(
                    "absolute inset-0 transition-opacity duration-700 ease-silk",
                    i === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0"
                  )}
                >
                  {mounted.has(i) && (
                    <SafeImage
                      src={src}
                      alt={`${product.name} — view ${i + 1}`}
                      fallbackSeed={`${product.handle}-${i}`}
                      fill
                      priority={i === 0}
                      sizes="50vw"
                      quality={i === 0 ? 78 : 70}
                      className="object-cover"
                    />
                  )}
                </div>
              ))}

              {/* Vertical dot indicator — overlaid on image, centred. */}
              <div className="absolute left-6 top-1/2 z-20 -translate-y-1/2">
                <ul className="flex flex-col gap-3">
                  {gallery.map((_, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => scrollToIndex(i)}
                        aria-label={`Go to image ${i + 1} of ${gallery.length}`}
                        className={clsx(
                          "block h-2 w-2 rounded-full border transition-all duration-500",
                          i === activeIndex
                            ? "border-chalk bg-chalk"
                            : "border-chalk/40 bg-transparent hover:border-chalk/70"
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Desktop: invisible scroll spacers — one per gallery image. Each
              is a viewport-tall block that the IntersectionObserver watches
              to determine which image should be active. */}
          <div className="hidden md:block" aria-hidden>
            {gallery.map((_, i) => (
              <div
                key={`spacer-${i}`}
                ref={(el) => {
                  spacerRefs.current[i] = el;
                }}
                data-idx={i}
                className="h-[calc(100svh-9rem)]"
              />
            ))}
          </div>

          {/* Mobile: images stacked vertically. No `priority` here even on
              the first image — desktop first already carries the preload; a
              second one for the 100vw mobile variant would double-download
              on desktop viewports. The mobile first image still loads fast
              because it's the first in-viewport <img>, which browsers
              natively prioritise. */}
          <div className="flex flex-col md:hidden">
            {gallery.map((src, i) => (
              <div
                key={`mobile-${src}-${i}`}
                className="relative aspect-[4/5] w-full overflow-hidden bg-onyx"
              >
                <SafeImage
                  src={src}
                  alt={`${product.name} — view ${i + 1}`}
                  fallbackSeed={`${product.handle}-${i}`}
                  fill
                  sizes="100vw"
                  loading={i === 0 ? "eager" : "lazy"}
                  quality={i === 0 ? 78 : 70}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right column — sticky product panel. 6 cols. Since the left
            column is (gallery.length × viewport) tall via spacers, the grid
            cells share that height and this sticky panel stays pinned for
            the entire gallery scroll. */}
        <aside className="relative md:col-span-6">
          <div className="md:sticky md:top-36 md:flex md:h-[calc(100svh-9rem)] md:items-center">
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

      {/* Mobile dot pagination — sits under the stacked images. */}
      <div className="flex justify-center gap-2 border-t border-chalk/10 py-6 md:hidden">
        {gallery.map((_, i) => (
          <span
            key={i}
            className={clsx(
              "h-1.5 w-1.5 rounded-full transition-colors",
              i === activeIndex ? "bg-chalk" : "bg-chalk/30"
            )}
            aria-hidden
          />
        ))}
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
