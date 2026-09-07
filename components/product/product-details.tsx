"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import type { Product, ProductDetail } from "@/lib/content";

// "Details of the Piece" — two macro shots side by side, each with a
// small caption block underneath. Mirrors Chanel's DIAMONDS / MATERIAL grid.
export function ProductDetails({ product }: { product: Product }) {
  const details = product.details ?? [];
  if (details.length === 0) return null;

  return (
    <section className="relative bg-ink py-24 text-chalk md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-14">
        <div className="mb-14 flex flex-col items-center gap-6 text-center md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold uppercase tracking-[0.06em]"
          >
            Details of the Piece
          </motion.h2>

          <Link
            href="/journal/the-case-for-unlacquered-brass"
            className="text-[11px] uppercase tracking-[0.24em] text-chalk/70 underline underline-offset-[6px] decoration-chalk/40 transition-colors hover:text-chalk hover:decoration-chalk/80"
          >
            Care instructions
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-20">
          {details.map((detail, i) => (
            <DetailCard key={detail.label} detail={detail} index={i} seed={`${product.handle}-detail-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailCard({
  detail,
  index,
  seed
}: {
  detail: ProductDetail;
  index: number;
  seed: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <div className="relative aspect-[2/1] w-full overflow-hidden bg-onyx">
        <SafeImage
          src={detail.image}
          alt={detail.label}
          fallbackSeed={seed}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          quality={72}
          className="object-cover"
        />
      </div>

      <div className="mt-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-chalk">
          {detail.label}
        </p>
        <p className="mt-5 max-w-md text-[13px] leading-[1.75] text-chalk/75">
          {detail.body}
        </p>
      </div>
    </motion.article>
  );
}
