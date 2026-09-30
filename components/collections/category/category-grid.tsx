"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { productHref, type Product } from "@/lib/content";

// Single-category product grid — no chip toolbar (the current category is
// implicit in the URL). When the grid is split around an interstitial section
// (e.g. savoir-faire), pass `showToolbar={false}` on the trailing half and
// `totalCount` so the count still reflects all pieces in the category.
export function CategoryGrid({
  products,
  showToolbar = true,
  totalCount
}: {
  products: Product[];
  showToolbar?: boolean;
  totalCount?: number;
}) {
  const count = totalCount ?? products.length;
  return (
    <>
      {showToolbar && (
        <div className="border-t border-chalk/10 bg-ink">
          <div className="mx-auto flex max-w-editorial items-center justify-between px-6 py-5 md:px-14 md:py-6">
            <button
              type="button"
              className="hidden shrink-0 items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-chalk/85 transition-colors hover:text-chalk md:inline-flex"
              aria-label="Open filters"
            >
              <FilterIcon />
              Filters
            </button>
            <p className="ml-auto text-[11px] uppercase tracking-[0.28em] text-chalk/60">
              {count} {count === 1 ? "piece" : "pieces"}
            </p>
          </div>
          <div className="h-px w-full bg-chalk/10" />
        </div>
      )}

      <section className="relative bg-ink py-20 text-chalk md:py-28">
        <div className="mx-auto max-w-editorial px-6 md:px-14">
          {products.length === 0 ? (
            <p className="text-center text-[13px] uppercase tracking-[0.28em] text-chalk/50">
              No pieces in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 md:gap-x-12 md:gap-y-28 lg:grid-cols-3 lg:gap-x-16">
              {products.map((p, i) => (
                <ProductCard key={p.handle} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.9,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group"
    >
      <Link href={productHref(product)} className="block text-center">
        <div className="relative mb-8 aspect-[4/5] w-full overflow-hidden bg-onyx">
          <SafeImage
            src={product.image}
            alt={product.name}
            fallbackSeed={product.handle}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.04]"
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-[10px] uppercase tracking-[0.32em] text-chalk/55">
            {product.category}
          </p>
          <h3 className="font-display text-[15px] font-semibold uppercase leading-[1.15] tracking-[0.005em] md:text-[16px]">
            {product.name}
          </h3>
          <p className="line-clamp-4 max-w-[36ch] text-[13px] leading-[1.6] text-chalk/70">
            {product.description}
          </p>
          <p className="mt-1 text-[13px] tracking-[0.02em] text-chalk/85">
            ₹ {product.price.inr.toLocaleString("en-IN")}
            <span className="text-chalk/50">*</span>
          </p>
          <span className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-chalk underline underline-offset-[6px] decoration-chalk/50 transition-colors group-hover:decoration-chalk">
            View details
            <span aria-hidden>›</span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

function FilterIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M0.5 3h8M10.5 3h3M0.5 7h2.5M4.5 7h9M0.5 11h8M10.5 11h3"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="9.5" cy="3" r="1.2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="3.5" cy="7" r="1.2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="9.5" cy="11" r="1.2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
