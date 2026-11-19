"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IconPlay } from "@/components/ui/icons";
import { SafeImage } from "@/components/ui/safe-image";

type Thumbnail = {
  src: string;
  label?: string;
  videoSrc?: string;
  isVideo?: boolean; // retained for backwards compat; all thumbnails are chapter videos now
};

type LookProps = {
  eyebrow?: string;
  title: string;
  cover: string;
  thumbnails: Thumbnail[];
  captionOnImage?: string;
  filmSrc?: string;
  pinned?: boolean; // when true, section pins at top-0 while following sections reveal over it
};

const DEFAULT_FILM_SRC =
  "https://assets.mixkit.co/videos/4488/4488-720.mp4";

export function ChapterLook({
  eyebrow,
  title,
  cover,
  thumbnails,
  captionOnImage,
  filmSrc = DEFAULT_FILM_SRC,
  pinned = false
}: LookProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "8%"]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeThumb = activeIdx !== null ? thumbnails[activeIdx] : null;
  const activeIsVideo = !!activeThumb?.videoSrc;
  const activeSrc = activeThumb?.videoSrc ?? filmSrc;
  const anyThumbHasVideo = thumbnails.some((t) => !!t.videoSrc);

  useEffect(() => {
    if (activeIdx === null) return;
    setProgress(0);
    if (!activeIsVideo) {
      setPlaying(false);
      return;
    }
    // Force-play on the next tick to survive React's mount timing across browsers.
    const t = window.setTimeout(() => {
      const el = videoRef.current;
      if (!el) return;
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }, 0);
    return () => window.clearTimeout(t);
  }, [activeIdx, activeIsVideo]);

  const selectThumb = (i: number) => {
    const t = thumbnails[i];
    const isVideo = !!t?.videoSrc;
    if (activeIdx === i) {
      if (!isVideo) return; // image thumb — clicking again is a no-op
      const el = videoRef.current;
      if (!el) return;
      if (el.paused) el.play().catch(() => {});
      else el.pause();
      return;
    }
    setActiveIdx(i);
  };

  const toggleFilm = () => {
    if (activeIdx === null) {
      setActiveIdx(0);
      return;
    }
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  return (
    <section
      ref={ref}
      className={`${pinned ? "sticky top-0 z-0" : "relative"} h-screen w-full overflow-hidden bg-ink text-chalk`}
    >
      {/* stage — cover image until a chapter is selected, then the chapter video.
          Right side reserves ~7rem for the vertical filmstrip rail on md+. */}
      <motion.div style={{ y }} className="absolute inset-0">
        {activeThumb && !activeIsVideo ? (
          <SafeImage
            key={activeThumb.src}
            src={activeThumb.src}
            alt={activeThumb.label ?? title}
            fallbackSeed={`look-${activeThumb.src}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
        ) : activeIdx !== null ? (
          <video
            ref={videoRef}
            key={activeSrc}
            src={activeSrc}
            poster={activeThumb?.src ?? cover}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            preload="auto"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(e) => {
              const d = e.currentTarget.duration;
              if (d) setProgress(e.currentTarget.currentTime / d);
            }}
            onEnded={() => setPlaying(false)}
            onError={() => console.error("[ChapterLook] video failed:", activeSrc)}
          />
        ) : (
          <SafeImage
            src={cover}
            alt={title}
            fallbackSeed={`look-${title}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
        )}
        {/* Very subtle diagonal wash — a whisper of darkness in the bottom-
            left to seat the title, the rest of the frame reads near-unaltered. */}
        <div className="absolute inset-0 bg-gradient-to-tr from-ink/60 via-ink/15 to-transparent" />
      </motion.div>

      {/* Title cluster — bottom-left corner */}
      <div className="absolute bottom-10 left-6 z-10 max-w-xl md:bottom-14 md:left-10">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-[10px] uppercase tracking-[0.28em] text-chalk/70"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(1.125rem,1.75vw,1.75rem)] font-bold uppercase leading-[1.05] tracking-[0.02em] whitespace-pre-line"
        >
          {title}
        </motion.h2>
        <motion.button
          type="button"
          onClick={toggleFilm}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`group mt-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-chalk/90 hover:text-chalk ${anyThumbHasVideo ? "" : "hidden"}`}
        >
          <span className="flex h-3 w-3 items-center justify-center">
            {playing ? (
              <svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor">
                <rect x="2.5" y="1.5" width="2" height="9" />
                <rect x="7.5" y="1.5" width="2" height="9" />
              </svg>
            ) : (
              <IconPlay />
            )}
          </span>
          {playing ? "Pause the film" : "Watch the film"}
          <span className="ml-2 hidden h-px w-10 bg-chalk/40 transition-[width] duration-500 group-hover:w-16 md:block" aria-hidden />
        </motion.button>
      </div>

      {/* Right rail — clean stacked landscape cards, no console chrome (Chanel treatment).
          Suppressed entirely when no thumbnails are provided, so the counter
          doesn't linger as "00 / 00" on empty configurations. */}
      <motion.aside
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute right-6 bottom-10 z-10 hidden flex-col items-end gap-4 md:right-10 md:bottom-14 ${thumbnails.length > 0 ? "md:flex" : ""}`}
        aria-label="Film chapters"
      >
        {/* counter — subtle, no chrome */}
        <div className="flex flex-col items-center gap-2 pr-2 text-[10px] uppercase tracking-[0.28em] text-chalk/70">
          <span className="text-chalk">
            {(activeIdx === null ? 0 : activeIdx + 1).toString().padStart(2, "0")}
          </span>
          <span className="block h-6 w-px bg-chalk/30" aria-hidden />
          <span>{thumbnails.length.toString().padStart(2, "0")}</span>
        </div>

        {/* landscape cards stacked vertically */}
        {thumbnails.map((t, i) => (
          <ThumbCard
            key={i}
            thumb={t}
            index={i}
            title={title}
            src={t.videoSrc ?? filmSrc}
            active={activeIdx === i}
            playing={activeIdx === i && playing}
            progress={activeIdx === i ? progress : 0}
            onSelect={() => selectThumb(i)}
            variant="vertical"
          />
        ))}
      </motion.aside>

      {/* Mobile-only horizontal filmstrip along the bottom */}
      <div className="absolute right-6 bottom-6 left-6 z-10 flex items-end justify-end gap-3 md:hidden">
        {thumbnails.map((t, i) => (
          <ThumbCard
            key={i}
            thumb={t}
            index={i}
            title={title}
            src={t.videoSrc ?? filmSrc}
            active={activeIdx === i}
            playing={activeIdx === i && playing}
            progress={activeIdx === i ? progress : 0}
            onSelect={() => selectThumb(i)}
            variant="horizontal"
          />
        ))}
      </div>

      {/* Big cropped caption on image, bottom right — Chanel signature "type-hugging-image" */}
      {captionOnImage && (
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute right-0 bottom-16 z-10 hidden font-display text-[clamp(3rem,7vw,7rem)] font-bold uppercase leading-none tracking-tight text-chalk md:block"
        >
          {captionOnImage}
        </motion.p>
      )}
    </section>
  );
}

function ThumbCard({
  thumb,
  index,
  title,
  src,
  active,
  playing,
  progress,
  onSelect,
  variant = "horizontal"
}: {
  thumb: Thumbnail;
  index: number;
  title: string;
  src: string;
  active: boolean;
  playing: boolean;
  progress: number;
  onSelect: () => void;
  variant?: "horizontal" | "vertical";
}) {
  const sizeClass =
    variant === "vertical"
      ? "h-[155px] w-[260px] lg:h-[175px] lg:w-[290px]"
      : "h-20 w-28";
  const isVideo = !!thumb.videoSrc;
  const miniRef = useRef<HTMLVideoElement>(null);

  // Pause the mini preview when it scrolls out of view — keeps the second
  // chapter section from burning bandwidth before the user reaches it.
  useEffect(() => {
    if (!isVideo) return;
    const el = miniRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isVideo]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 1, delay: 0.4 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${sizeClass}`}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
        aria-label={
          active
            ? playing
              ? `Pause ${thumb.label ?? `chapter ${index + 1}`}`
              : `Resume ${thumb.label ?? `chapter ${index + 1}`}`
            : `Play ${thumb.label ?? `chapter ${index + 1}`}`
        }
        className="group relative block h-full w-full cursor-pointer overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-chalk/60"
      >
        {/* mini preview — video if the chapter has a videoSrc, otherwise a still image */}
        {isVideo ? (
          <video
            ref={miniRef}
            src={src}
            poster={thumb.src}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-105"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => console.error("[ThumbCard] mini video failed:", src)}
          />
        ) : (
          <SafeImage
            src={thumb.src}
            alt={thumb.label ?? `chapter ${index + 1}`}
            fallbackSeed={`thumb-${thumb.src}`}
            fill
            sizes="120px"
            className="object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-105"
          />
        )}

        {/* dim un-selected chapters so the active one reads as "on stage" */}
        <span
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
            active ? "opacity-0" : "bg-ink/40 group-hover:bg-ink/20"
          }`}
        />

        {/* play/pause badge — hidden for image-only chapters */}
        {isVideo && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/50 text-chalk backdrop-blur-sm transition-colors group-hover:bg-chalk group-hover:text-ink">
              {active && playing ? (
                <svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor">
                  <rect x="2.5" y="1.5" width="2" height="9" />
                  <rect x="7.5" y="1.5" width="2" height="9" />
                </svg>
              ) : (
                <IconPlay />
              )}
            </span>
          </span>
        )}
      </div>

      {/* hairline perimeter progress — only on the active chapter card, tracks its own mini video */}
      {active && isVideo && (
        <PerimeterProgress
          progress={progress}
          className="pointer-events-none absolute inset-0"
        />
      )}
    </motion.div>
  );
}

function PerimeterProgress({
  progress,
  className
}: {
  progress: number;
  className?: string;
}) {
  const P = 400; // perimeter of a 100x100 viewBox rect
  const clamped = Math.max(0, Math.min(1, progress));
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {/* faint background track — signals the card is the active chapter */}
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        fill="none"
        stroke="rgba(245,241,232,0.35)"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
      {/* progress trace — starts at top-left, sweeps clockwise as the film plays */}
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        fill="none"
        stroke="rgba(245,241,232,1)"
        strokeWidth={2}
        strokeDasharray={P}
        strokeDashoffset={P * (1 - clamped)}
        vectorEffect="non-scaling-stroke"
        style={{
          transition: "stroke-dashoffset 120ms linear",
          filter: "drop-shadow(0 0 3px rgba(245,241,232,0.5))"
        }}
      />
    </svg>
  );
}
