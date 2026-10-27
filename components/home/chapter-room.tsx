"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue
} from "framer-motion";
import { useEffect, useRef } from "react";

const BODY_TEXT =
  "A room is finished with a light, a mirror, a sculpted form. Over the years, only some pieces stay — the brass lamp, the arched mirror, the carved object that never dates. This is the house for those pieces. The ones you keep.";

const WORDS = BODY_TEXT.split(" ");

const SCRUB_START = 0.05;
const SCRUB_END = 0.30;

export function ChapterRoom() {
  const trackerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const inner = innerRef.current;
    const tracker = trackerRef.current;
    if (!inner || !tracker) return;

    let rafId = 0;

    const update = () => {
      const rect = tracker.getBoundingClientRect();
      const vh = window.innerHeight;
      // Denominator = vh (was 2*vh) so raw hits 1 at the moment the sticky
      // unpins under the shorter 200vh runway (pin duration = 100vh).
      const raw = (vh - rect.top) / vh;
      const progress = Math.max(0, Math.min(1, raw));
      // Slide runs 0.65 → 1.0 (~scroll 65-100vh), which lands right after the
      // word-scrub finishes and completes cleanly just before ChapterFilm
      // scrolls into view.
      const slideProgress = Math.max(
        0,
        Math.min(1, (progress - 0.65) / (1.0 - 0.65))
      );
      const y = slideProgress * -100;
      inner.style.transform = `translateY(${y}%)`;
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      {/* Section = pure sticky. Taller now (90svh) so content sits comfortably
          vertically-centered, while a small strip of Living Room still peeks
          below during pin. Inner div gets the direct transform mutation. */}
      <section
        className="pointer-events-none sticky top-0 z-40 h-auto pt-24 pb-16 md:pt-56 md:pb-32"
        aria-labelledby="chapter-room-heading"
      >
        <div
          ref={innerRef}
          style={{ willChange: "transform" }}
          className="pointer-events-auto flex h-full w-full items-center justify-center bg-ink text-chalk"
        >
          <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center md:px-10">
            <motion.h2
              id="chapter-room-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold uppercase leading-[1.05] tracking-[0.005em]"
            >
              More than just a piece — the one that defines the room
            </motion.h2>

            <p
              aria-label={BODY_TEXT}
              className="mt-8 max-w-md text-[10px] uppercase leading-[1.7] tracking-[0.16em] text-chalk md:mt-12 md:text-[11px]"
            >
              {WORDS.map((word, i) => (
                <ScrubWord
                  key={i}
                  word={word}
                  index={i}
                  total={WORDS.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* Tracker — drives both the word-scrub AND the section slide-up. */}
      <div ref={trackerRef} aria-hidden className="h-[100vh]" />
    </>
  );
}

function ScrubWord({
  word,
  index,
  total,
  scrollYProgress
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const range = SCRUB_END - SCRUB_START;
  const perWord = range / total;
  const wordStart = SCRUB_START + index * perWord;
  const wordEnd = Math.min(SCRUB_END, wordStart + perWord * 2.2);

  const opacity = useTransform(
    scrollYProgress,
    [wordStart, wordEnd],
    [0.18, 1]
  );

  return (
    <>
      <motion.span style={{ opacity }}>{word}</motion.span>
      {index < total - 1 && " "}
    </>
  );
}
