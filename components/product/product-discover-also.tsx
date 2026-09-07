"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { productHref, type Product } from "@/lib/content";

// "Discover Also" — related pieces rail. Kept minimal: image + name only,
// no visible price (matches Chanel's editorial restraint).
export function ProductDiscoverAlso({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="relative bg-ink py-24 text-chalk md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold uppercase tracking-[0.06em] md:mb-20"
        >
          Discover Also
        </motion.h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:grid-cols-3 md:gap-x-14 lg:gap-x-20">
          {products.map((product, i) => (
            <RelatedCard key={product.handle} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 1,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group"
    >
      <Link href={productHref(product)} className="block text-center">
        <div className="relative mb-8 aspect-[4/5] w-full overflow-hidden bg-onyx">
          <SafeImage
            src={product.image}
            alt={product.name}
            fallbackSeed={`${product.handle}-related`}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            quality={68}
            className="object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.04]"
          />
        </div>

        <p className="text-[10px] uppercase tracking-[0.32em] text-chalk/55">
          {product.category}
        </p>
        <h3 className="mt-3 font-display text-[14px] font-semibold uppercase leading-[1.15] tracking-[0.02em] md:text-[15px]">
          {product.name}
        </h3>
      </Link>
    </motion.article>
  );
}
