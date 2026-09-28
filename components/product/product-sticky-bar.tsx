"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { useStore } from "@/components/store/store-provider";
import type { Product } from "@/lib/content";

// Sticky mini header — appears once the hero product panel has scrolled out
// of view. Mirrors Chanel's condensed bar: thumbnail · name/material · price
// · Enquire.
export function ProductStickyBar({ product }: { product: Product }) {
  const [visible, setVisible] = useState(false);
  const { addToCart, openDrawer } = useStore();
  const handleAddToBag = () => {
    addToCart(product.handle, 1);
    openDrawer("cart");
  };

  useEffect(() => {
    const hero = document.getElementById("product-hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      // Trigger when the hero has fully scrolled out of view. The previous
      // "-90% top" margin only worked when the hero was multi-viewport tall
      // (old scroll-spacer design). With the current one-viewport hero,
      // negative margins push the observer band past the hero, so it
      // wrongly reports the hero as already gone at scroll=0.
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-chalk/10 bg-ink/95 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-editorial items-center gap-4 px-6 py-4 md:gap-6 md:px-14">
            {/* Thumbnail */}
            <div className="relative h-14 w-11 shrink-0 overflow-hidden bg-onyx md:h-16 md:w-12">
              <SafeImage
                src={product.image}
                alt=""
                fallbackSeed={`${product.handle}-sticky`}
                fill
                sizes="60px"
                className="object-cover"
              />
            </div>

            {/* Name + material */}
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-chalk md:text-[13px]">
                {product.name}
              </p>
              {product.material && (
                <p className="mt-1 truncate text-[10px] uppercase tracking-[0.2em] text-chalk/55 md:text-[11px]">
                  {product.material}
                </p>
              )}
            </div>

            {/* Price — desktop only */}
            <div className="hidden shrink-0 text-right md:block">
              <p className="text-[13px] tracking-[0.02em] text-chalk">
                ₹ {product.price.inr.toLocaleString("en-IN")}
                <span className="text-chalk/50">*</span>
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-chalk/45">
                Retail suggested price
              </p>
            </div>

            {/* Add to bag */}
            <button
              type="button"
              onClick={handleAddToBag}
              className="shrink-0 bg-chalk px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink transition-opacity hover:opacity-90 md:px-8"
            >
              Add to bag
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
