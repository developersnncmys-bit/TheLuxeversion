"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Ambient background music — a single <audio loop> that lives in the root
// layout so it persists across route changes. A small speaker toggle in the
// bottom-left corner lets the visitor mute or resume.
//
// Autoplay policy:
//   Browsers block audio-with-sound from playing before the user has
//   interacted with the page. We honour that:
//     1. First visit — the site is silent by default. The toggle sits muted.
//        User taps → play() is called from within a click handler, which is
//        a valid gesture, so it plays.
//     2. Return visit with the preference stored as "on" — we still can't
//        legally autoplay, so we attach a one-shot pointerdown/keydown
//        listener and resume on the first genuine interaction of the session.
//     3. Missing audio file — play() rejects, the button stays muted, and
//        nothing else on the page breaks.
//
// Drop the ambient track at /public/audio/ambient.mp3 to activate it.

const STORAGE_KEY = "luxe:audio-enabled";
const AUDIO_SRC = "/audio/piano.mp3";

export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Read the stored preference once we're client-side. `mounted` also gates
  // the button render so it doesn't flash in with the wrong state.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    setEnabled(saved === "true");
    setMounted(true);
  }, []);

  // If the preference is "on", try to resume playback. play() will reject if
  // the browser hasn't seen a user gesture yet — in that case we wait for the
  // first pointerdown or keydown, then try again.
  useEffect(() => {
    if (!mounted || !enabled) return;
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;

    let cleanup: (() => void) | undefined;

    audio.play().catch(() => {
      const resume = () => {
        audio.play().catch(() => {
          // Still blocked — could be a missing file. Silent fallback.
        });
      };
      window.addEventListener("pointerdown", resume, { once: true });
      window.addEventListener("keydown", resume, { once: true });
      cleanup = () => {
        window.removeEventListener("pointerdown", resume);
        window.removeEventListener("keydown", resume);
      };
    });

    return () => cleanup?.();
  }, [mounted, enabled]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (enabled) {
      audio.pause();
      setEnabled(false);
      window.localStorage.setItem(STORAGE_KEY, "false");
    } else {
      // play() called synchronously inside the click handler — this is a
      // valid user gesture, so the browser will honour it (assuming the
      // audio file exists).
      audio
        .play()
        .then(() => {
          setEnabled(true);
          window.localStorage.setItem(STORAGE_KEY, "true");
        })
        .catch(() => {
          // Missing file or user cancelled — leave the state muted.
        });
    }
  };

  if (!mounted) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="metadata"
        aria-hidden
      />
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={enabled ? "Mute ambient sound" : "Play ambient sound"}
        aria-pressed={enabled}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        // Sits on the right, stacked above the BackToTop mark so the two
        // never overlap. mix-blend-difference keeps it legible over both
        // dark ink pages and the white client-services strip in the footer.
        className="group fixed bottom-20 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-current/40 text-chalk mix-blend-difference transition-[border-color] duration-500 hover:border-current md:bottom-24 md:right-10"
      >
        <SpeakerGlyph on={enabled} />
      </motion.button>
    </>
  );
}

function SpeakerGlyph({ on }: { on: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Speaker body — same in both states. */}
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      {on ? (
        <>
          {/* Two curved sound waves radiating right when playing. */}
          <path d="M16 8.5a4.5 4.5 0 0 1 0 7" />
          <path d="M19 5.5a8.5 8.5 0 0 1 0 13" />
        </>
      ) : (
        <>
          {/* Crossed lines forming a small X when muted. */}
          <line x1="16" y1="9" x2="21" y2="14" />
          <line x1="21" y1="9" x2="16" y2="14" />
        </>
      )}
    </svg>
  );
}
