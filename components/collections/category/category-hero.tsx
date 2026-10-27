"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

type Props = {
  kicker: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  // Optional mobile-only art-direction. When present, this image renders on
  // screens below the `md` breakpoint; `image` continues to drive md+ views.
  mobileImage?: string;
  // Optional tablet-only art-direction (md → lg range, roughly 768–1023px).
  // When present, this image renders on iPad-sized screens while `image`
  // continues to drive true desktop (lg+) views.
  tabletImage?: string;
};

export function CategoryHero({
  kicker,
  title,
  description,
  image,
  imageAlt,
  mobileImage,
  tabletImage
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section ref={ref} className="relative bg-ink text-chalk">
      {/* Full-bleed hero — image spans the viewport width; kicker + title sit
          in a left-aligned overlay over a soft left-side scrim for legibility. */}
      <div className="relative min-h-[100svh] md:min-h-[90svh] w-full overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          {/* Art-directed stack. Each tier is only rendered when provided; the
              desktop `image` picks up whatever range the other two don't cover.
                mobile  → < md     (if mobileImage)
                tablet  → md..<lg  (if tabletImage)
                desktop → always, hidden explicitly in ranges covered by the
                           tiers above. */}
          {mobileImage && (
            <Image
              src={mobileImage}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover md:hidden"
            />
          )}
          {tabletImage && (
            <Image
              src={tabletImage}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              // iPad Pro 13 sits at ~1032px, which Tailwind treats as `lg`.
              // Extending the tablet range through `xl-1` (up to 1279px) so
              // iPad-sized screens actually get the tablet art.
              className="hidden object-cover md:block xl:hidden"
            />
          )}
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className={clsx(
              "object-cover",
              mobileImage && "hidden md:block",
              tabletImage && "md:hidden xl:block"
            )}
          />
        </motion.div>

        {/* Left-weighted scrim — keeps the text readable without darkening the
            image where it doesn't need to be. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/30 to-transparent md:from-ink/60 md:via-ink/15 md:to-transparent lg:w-3/5"
        />

        <div className="relative z-10 flex min-h-[100svh] md:min-h-[90svh] items-start px-6 pb-20 pt-36 md:px-14 md:pb-28 md:pt-[22vh] xl:items-end xl:px-20 xl:pb-36 xl:pt-40">
          <div className="mx-auto max-w-xl text-center xl:mx-0 xl:text-left">
            {/* Hero text uses `animate` (fires on mount) rather than
                `whileInView`. When the text sits near the top of the hero
                on mobile it falls inside the `-15% 0px` viewport margin's
                excluded band and never triggers — so the eyebrow would
                stay invisible. The hero is always on-screen at page load,
                so a mount-time animation is the right trigger. */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 text-[10px] uppercase tracking-[0.32em] text-chalk/70"
            >
              {kicker}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-display-md font-semibold uppercase leading-[1.02] tracking-[0.02em]"
            >
              {title}
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 text-center md:px-14 md:py-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[14px] leading-[1.8] text-chalk/80 md:text-[15px]"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
