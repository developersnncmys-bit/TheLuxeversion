"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { IconPlay } from "@/components/ui/icons";

export function HouseFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // Belt-and-braces muted autoplay — same pattern used elsewhere in the site.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    const attempt = el.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => void 0);
    }
  }, []);

  return (
    <section
      className="relative bg-ink py-12 text-chalk md:py-16"
      aria-labelledby="house-film-heading"
    >
      <div className="mx-auto max-w-editorial px-6 md:px-14">
        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="group relative mx-auto aspect-[16/9] w-full max-w-5xl overflow-hidden bg-onyx"
        >
          <video
            ref={videoRef}
            src="/images/dining-video.mp4"
            poster="/images/house-hero.png"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="A film from the house"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="h-full w-full object-cover"
          />

          {/* Bottom gradient so the caption reads on any footage */}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />

          {/* Play glyph — fades out once playback begins */}
          <span
            className={clsx(
              "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-silk",
              playing ? "opacity-0" : "opacity-100"
            )}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink/30 ring-1 ring-chalk/70 backdrop-blur-md md:h-16 md:w-16">
              <IconPlay />
            </span>
          </span>

          {/* Overlaid caption — bottom-centered */}
          <figcaption className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-center text-chalk md:bottom-10">
            <h3
              id="house-film-heading"
              className="font-display text-[clamp(0.875rem,1.4vw,1.375rem)] font-bold uppercase tracking-[0.04em]"
            >
              The Room, Composed
            </h3>
            <p className="text-[9px] uppercase tracking-[0.28em] text-chalk/80 md:text-[10px]">
              Chapter I · A Film
            </p>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
