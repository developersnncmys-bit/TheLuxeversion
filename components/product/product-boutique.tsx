"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";

// "Find the piece in the House" — the equivalent of Chanel's boutique block.
// Full-bleed B&W-tone image, centred title + link beneath.
export function ProductBoutique() {
  return (
    <section id="enquire" className="relative bg-ink py-24 text-chalk md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[16/7] w-full overflow-hidden bg-onyx md:aspect-[21/8]"
        >
          <SafeImage
            src="/images/house-hero.png"
            alt="The house studio"
            fallbackSeed="product-boutique"
            fill
            sizes="100vw"
            quality={55}
            className="object-cover grayscale"
          />
        </motion.div>

        <div className="mt-16 flex flex-col items-center gap-8 text-center md:mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold uppercase tracking-[0.06em]"
          >
            See the Piece in the Studio
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md text-[13px] leading-[1.85] text-chalk/75"
          >
            Private viewings by appointment. Write to the house and we will
            reply within one working day.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            href="mailto:studio@theluxeversion.com"
            className="cta-outline text-chalk"
          >
            Write to the House
          </motion.a>
        </div>

        <p className="mx-auto mt-20 max-w-2xl text-center text-[11px] leading-[1.9] tracking-[0.02em] text-chalk/45 md:mt-24">
          **The information and descriptions of pieces on this site are as
          precise as possible. Being made by hand, each piece will vary slightly
          in dimension, finish and colour. Contact the house for detailed
          information on a specific piece.
        </p>
      </div>
    </section>
  );
}
