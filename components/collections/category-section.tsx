"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { productHref, type Product } from "@/lib/content";

type Props = {
  id: string;
  number: string;
  kicker: string;
  title: string;
  intro: string;
  products: Product[];
  mirror?: boolean;
};

export function CategorySection({
  id,
  number,
  kicker,
  title,
  intro,
  products,
  mirror = false
}: Props) {
  return (
    <section
      id={id}
      className="relative bg-ink py-16 text-chalk md:py-28"
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-editorial px-6 md:px-14">
        {/* Section header — Chanel pattern: small centered eyebrow → big centered
            heading → narrow centered intro. `mirror` no longer flips alignment. */}
        <div className="mx-auto mb-20 flex max-w-3xl flex-col items-center text-center md:mb-28">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 text-[10px] uppercase tracking-[0.32em] text-chalk/55"
          >
            {number} · {kicker}
          </motion.p>

          <motion.h2
            id={`${id}-heading`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-display-md font-semibold uppercase leading-[1.02] tracking-[0.06em]"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-md text-[11px] uppercase leading-[1.9] tracking-[0.18em] text-chalk/80 md:mt-10 md:text-[12px]"
          >
            {intro}
          </motion.p>
        </div>

        {/* Product grid — three columns, evenly aligned (Chanel row).
            Narrower container + wide gaps for generous negative space around each tile.
            Each tile: eyebrow + big name ABOVE image, description + CTA below. */}
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-3 md:gap-x-16 md:gap-y-24 lg:gap-x-24">
          {products.map((p, i) => (
            <CategoryProduct key={p.handle} product={p} index={i} />
          ))}
        </div>

        {/* Category CTA — signature cta-rule under the grid, linking to the
            dedicated category page (/collections/showpieces, etc.). */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 flex justify-center md:mt-32"
        >
          <Link href={`/collections/${id}`} className="cta-rule text-chalk">
            View all {title}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CategoryProduct({
  product,
  index
}: {
  product: Product;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 1.1,
        delay: (index % 3) * 0.12,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group flex flex-col"
    >
      <Link href={productHref(product)} className="flex flex-col">
        {/* Chanel pattern: category eyebrow + product name sit ABOVE the image. */}
        <p className="text-[10px] uppercase tracking-[0.32em] text-chalk/55">
          {product.category}
        </p>
        <h3 className="mt-3 font-display text-[clamp(0.95rem,1.15vw,1.15rem)] font-semibold uppercase leading-[1.1] tracking-[0.08em]">
          {product.name}
        </h3>

        <div className="relative mt-6 aspect-[4/5] w-full overflow-hidden bg-onyx">
          <SafeImage
            src={product.image}
            alt={product.name}
            fallbackSeed={product.handle}
            fill
            sizes="(min-width: 768px) 30vw, 100vw"
            className="object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.04]"
          />
        </div>

        <p className="mt-8 text-[13px] leading-[1.7] text-chalk/75">
          {product.description}
        </p>
        <span className="mt-6 inline-block self-start text-[11px] font-semibold uppercase tracking-[0.24em] text-chalk underline underline-offset-[6px] decoration-chalk/50 transition-colors group-hover:decoration-chalk">
          Shop Now
        </span>
      </Link>
    </motion.article>
  );
}
