"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { JOURNAL_ENTRIES } from "@/lib/content";
import { SafeImage } from "@/components/ui/safe-image";

type Entry = (typeof JOURNAL_ENTRIES)[number];

// Per-slug HOME-ONLY image overrides. These shots live in
// /public/Home-studio-cover/ and are used ONLY on the home-page "From the
// Studio" teaser — the /the-studio index and individual entry pages
// continue to read entry.image from content.ts. Add a slug key here to
// swap the home tile without touching the shared journal data.
const HOME_IMAGE_OVERRIDE: Record<string, string> = {
  "a-heart-in-the-round": "/Home-studio-cover/Heart.png",
  "wings-raised": "/Home-studio-cover/Eagle.png",
  "the-landed-bird": "/Home-studio-cover/Pigeon.png",
  "the-water-bird-held": "/Home-studio-cover/Duck.png"
};

export function JournalTeaser() {
  const stripRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stripRef,
    offset: ["start end", "end start"]
  });

  return (
    <section
      className="relative bg-ink pt-20 pb-0 text-chalk md:pt-18"
      aria-labelledby="journal-heading"
    >
      {/* header — centered, matches Complete Collection rhythm */}
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <div className="mb-16 flex flex-col items-center text-center md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-chalk/80 md:text-[11px]"
          >
            Behind the Scenes
          </motion.p>
          <motion.h2
            id="journal-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(1.125rem,1.75vw,1.75rem)] font-bold uppercase leading-[1.05] tracking-[0.02em]"
          >
            From the Studio
          </motion.h2>
        </div>
      </div>

      {/* card strip — tall portraits with breathing room. Home teases only 4;
          full gallery lives at /the-studio. */}
      <div
        ref={stripRef}
        className="mx-auto grid max-w-editorial grid-cols-1 gap-6 px-6 md:grid-cols-2 md:gap-8 md:px-10 xl:grid-cols-4"
      >
        {JOURNAL_ENTRIES.slice(0, 4).map((entry, i) => (
          <JournalCard
            key={entry.slug}
            entry={entry}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* View-more CTA — signature cta-rule below the strip, linking to the
          full journal gallery. */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-16 flex justify-center md:mt-20"
      >
        <Link href="/the-studio" className="cta-rule text-chalk">
          View all notes
        </Link>
      </motion.div>
    </section>
  );
}

function JournalCard({
  entry,
  index,
  scrollYProgress
}: {
  entry: Entry;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  // index still used for parallax alternation and stagger delay below
  // Alternate parallax direction so adjacent cards drift opposite ways —
  // creates a subtle "breathing" rhythm across the strip.
  const parallaxRange: [string, string] =
    index % 2 === 0 ? ["8%", "-8%"] : ["-8%", "8%"];
  const y = useTransform(scrollYProgress, [0, 1], parallaxRange);

  return (
    <motion.article
      initial={{ opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration: 1.4,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <Link
        href={`/the-studio/${entry.slug}`}
        className="group relative block h-[55svh] w-full overflow-hidden bg-onyx md:h-[65svh]"
      >
        {/* Parallax image (extends past container so translate doesn't reveal empty edges) */}
        <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
          <SafeImage
            src={HOME_IMAGE_OVERRIDE[entry.slug] ?? entry.image}
            alt={entry.title}
            fallbackSeed={entry.slug}
            fill
            sizes="(min-width: 768px) 25vw, 100vw"
            quality={68}
            // Eagerly load the first card so it's decoded by the time the
            // section scrolls into view; the other three lazy-load normally.
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            className="object-cover object-center transition-transform duration-[1800ms] ease-silk group-hover:scale-[1.08]"
          />
        </motion.div>

        {/* Bottom gradient — deepens on hover so the reveal text reads cleanly */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent opacity-90 transition-opacity duration-700 ease-silk group-hover:opacity-100" />

        {/* Label stack — title + underline only, no chapter numbering or CTA text */}
        <div className="absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-3 px-4 md:bottom-14">
          <h3 className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-chalk transition-transform duration-[700ms] ease-silk group-hover:-translate-y-1 md:text-[12px]">
            {entry.title}
          </h3>

          <span
            aria-hidden
            className="block h-px w-10 bg-chalk/70 transition-[width,background-color] duration-[600ms] ease-silk group-hover:w-20 group-hover:bg-chalk"
          />
        </div>
      </Link>
    </motion.article>
  );
}
