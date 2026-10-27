"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function HouseClosing() {
  return (
    <section
      className="relative bg-ink pt-24 pb-16 text-chalk md:pt-32 md:pb-20"
      aria-labelledby="house-closing-heading"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center md:px-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-[10px] uppercase tracking-[0.32em] text-chalk/55"
        >
          Continue
        </motion.p>

        <motion.h2
          id="house-closing-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-display-md font-semibold uppercase leading-[1.05] tracking-[0.005em]"
        >
          Meet the pieces
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-md text-[13px] leading-[1.8] text-chalk/70 md:text-[14px]"
        >
          The house sets the frame. The collection is where each piece lives —
          sculptures and vessels, one by one.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center gap-8 md:flex-row md:gap-10"
        >
          <Link href="/collections" className="cta-outline text-chalk">
            Enter the collection
          </Link>
          <Link href="/studio/appointment" className="cta-outline text-chalk">
            Book an appointment
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
