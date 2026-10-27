"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { productHref, type Product } from "@/lib/content";

type Props = {
  id: string;
  number: string;
  title: string;
  intro: string;
  products: Product[];
  mirror?: boolean;
};

export function EditSection({
  id,
  number,
  title,
  intro,
  products,
  mirror = false
}: Props) {
  return (
    <section
      id={id}
      className="relative bg-ink py-28 text-chalk md:py-40"
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-editorial px-6 md:px-14">
        {/* `lg:gap-24` (96px × 11 = 1056px) exceeds the 1032px iPad content
            area and squeezes columns to near-zero width. Hold at a tablet-
            safe gap through lg, promote to the wider editorial gap at xl+
            where the viewport can actually afford it. */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10 xl:gap-16">
          {/* Text panel — sticky pin per section, positioned so the pinned
              block sits around the vertical centre of the viewport.
              Placement flips on `mirror` for editorial rhythm. */}
          <div
            className={clsx(
              "md:col-span-4 md:sticky md:top-[32vh] md:self-start",
              mirror ? "md:col-start-9" : "md:col-start-1"
            )}
          >
            <motion.h2
              id={`${id}-heading`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-display-md font-semibold uppercase leading-[1.02] tracking-[0.005em]"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-sm text-[11px] uppercase leading-[1.9] tracking-[0.18em] text-chalk/80 md:text-[12px]"
            >
              {intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10"
            >
              <span
                aria-hidden
                className="text-[10px] uppercase tracking-[0.32em] text-chalk/40"
              >
                {String(products.length).padStart(2, "0")}{" "}
                {products.length === 1 ? "piece" : "pieces"} in this edit
              </span>
            </motion.div>
          </div>

          {/* Product stack — narrower column with capped image width for strong
              negative space around each piece. */}
          <div
            className={clsx(
              "flex flex-col gap-20 md:col-span-5 md:gap-32",
              mirror ? "md:col-start-1 md:row-start-1" : "md:col-start-8"
            )}
          >
            {products.map((p) => (
              <EditCard key={p.handle} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EditCard({ product }: { product: Product }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="group mx-auto w-full max-w-md"
    >
      <Link href={productHref(product)} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-onyx">
          <SafeImage
            src={product.image}
            alt={product.name}
            fallbackSeed={product.handle}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.04]"
          />
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <h3 className="font-display text-[clamp(1.25rem,2vw,1.75rem)] font-semibold uppercase leading-[1.1] tracking-[0.005em]">
            {product.name}
          </h3>
          <p className="max-w-[46ch] text-[13px] leading-[1.7] text-chalk/75">
            {product.description}
          </p>
          <span className="mt-2 inline-block text-[11px] font-semibold uppercase tracking-[0.24em] text-chalk underline underline-offset-[6px] decoration-chalk/50 transition-colors group-hover:decoration-chalk">
            Discover the piece
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
