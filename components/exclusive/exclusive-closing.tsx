"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function ExclusiveClosing() {
  return (
    <section
      className="relative bg-ink pt-24 pb-28 text-chalk md:pt-36 md:pb-36"
      aria-labelledby="exclusive-closing-heading"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center md:px-14">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-[10px] uppercase tracking-[0.38em] text-chalk/55"
        >
          Private Commissions
        </motion.p>

        <motion.h2
          id="exclusive-closing-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[40px] font-light uppercase leading-[1.05] tracking-[0.03em]"
        >
          A piece of your own
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-md text-[13px] leading-[1.9] text-chalk/70 md:text-[14px]"
        >
          In addition to the pieces featured within Luxe Exclusive, our studio
          undertakes private commissions tailored to individual requirements.
          From artistic concepts and reference images to specific dimensions and
          finishes, each piece is developed in close consultation with the client
          and crafted entirely in-house by our selected artisans.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14"
        >
          <Link href="/studio/appointment" className="cta-outline text-chalk">
            Enquire with the studio
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
