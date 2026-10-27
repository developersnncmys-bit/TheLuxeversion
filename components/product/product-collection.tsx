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
  Vases: "/images/product-banners/vase-banner.png"
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
      {/* Parent: natural flow on mobile (image above copy); fixed-aspect banner
          on desktop (image + copy overlay). */}
      <div className="relative md:aspect-[21/8] md:overflow-hidden">
        {/* Image box — takes natural 16:10 aspect on mobile; absolute full-bleed on desktop. */}
        <div className="relative aspect-[16/10] w-full overflow-hidden md:absolute md:inset-0 md:aspect-auto">
          <SafeImage
            src={image}
            alt={`${product.category} collection`}
            fallbackSeed={`${product.handle}-collection`}
            fill
            sizes="100vw"
            quality={62}
            className="object-cover"
          />

          {/* Directional scrim — only on desktop where copy overlays the image.
              Mobile has copy below the image so no scrim is needed. */}
          <div
            aria-hidden
            className={clsx(
              "absolute inset-0 hidden from-ink/80 via-ink/40 to-transparent md:block",
              alignLeft ? "md:bg-gradient-to-r" : "md:bg-gradient-to-l"
            )}
          />
        </div>

        {/* Copy — block flow below image on mobile; absolute overlay on desktop. */}
        <div
          className={clsx(
            "px-6 py-12 md:absolute md:inset-y-0 md:flex md:items-center md:py-0",
            alignLeft
              ? "md:left-0 md:px-14"
              : "md:right-0 md:px-20 lg:px-28"
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className={clsx(
              "mx-auto max-w-sm text-center md:mx-0 md:max-w-md",
              alignLeft ? "md:text-left" : "md:text-right"
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
