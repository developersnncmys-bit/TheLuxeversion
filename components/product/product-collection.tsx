"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { categorySlug, type Product } from "@/lib/content";

// Per-category banner imagery. Drop matching files into
// public/images/product-banners/ and they'll appear automatically; missing
// files fall back to picsum via SafeImage.
const CATEGORY_BANNERS: Record<Product["category"], string> = {
  Sculptures: "/images/product-banners/sculpture-banner.png",
  Vases: "/images/product-banners/vase-banner.png",
  Tabletop: "/images/product-banners/tabletop-banner.png",
  Lighting: "/images/product-banners/lighting-banner.png"
};

// Collection tie-in — full-bleed image banner with the collection copy
// overlaid on either side. Sculpture pages anchor the copy on the LEFT (to
// preserve the composition of the sculpture-banner shot); every other
// category anchors on the RIGHT. The scrim direction flips to match, so
// the copy is always sitting over the darkened side of the image.
export function ProductCollection({ product }: { product: Product }) {
  const image = CATEGORY_BANNERS[product.category];
  const slug = categorySlug(product.category);
  const alignLeft = product.category === "Sculptures";

  return (
    <section className="relative bg-ink text-chalk">
      <div className="relative aspect-[21/9] w-full overflow-hidden md:aspect-[21/8]">
        <SafeImage
          src={image}
          alt={`${product.category} collection`}
          fallbackSeed={`${product.handle}-collection`}
          fill
          sizes="100vw"
          quality={62}
          className="object-cover"
        />

        {/* Scrim direction follows the copy side so the text is always
            over the darkened half of the image. */}
        <div
          aria-hidden
          className={clsx(
            "absolute inset-0 from-ink/80 via-ink/40 to-transparent",
            alignLeft ? "bg-gradient-to-r" : "bg-gradient-to-l"
          )}
        />

        {/* Copy — pinned to left OR right depending on category, vertically
            centred either way. Right-aligned pages get a wider gutter from
            the screen edge so the text doesn't crowd the viewport. */}
        <div
          className={clsx(
            "absolute inset-y-0 flex items-center px-6",
            alignLeft
              ? "left-0 md:px-14"
              : "right-0 md:px-20 lg:px-28"
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className={clsx(
              "max-w-sm md:max-w-md",
              alignLeft ? "text-left" : "text-right"
            )}
          >
            <p className="text-[10px] uppercase tracking-[0.32em] text-chalk/70">
              The Collection
            </p>

            <h2 className="mt-5 font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-semibold uppercase leading-[1.08] tracking-[0.02em]">
              {product.category}
            </h2>

            <p className="mt-6 text-[13px] leading-[1.75] text-chalk/80 md:text-[14px]">
              A small, tightly curated group of pieces from the studio floor.
              Each part of the same house — the same materials, the same
              language of quiet.
            </p>

            <div className="mt-8">
              <Link href={`/collections/${slug}`} className="cta-rule text-chalk">
                Discover the Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
