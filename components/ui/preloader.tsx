"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LOGO_REVEAL_DURATION = 1.1; // seconds — fade + slide-up of the logo
const HOLD_AFTER_REVEAL = 0.4; // seconds — dwell on fully-revealed logo
const EXIT_DURATION = 0.7;
const SESSION_KEY = "tlv:preloader:seen";

export function Preloader() {
  // Default hidden — flips to visible after the sessionStorage check on mount.
  // This prevents a flash of the preloader on repeat navigations within a
  // session (only the first visit sees it).
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // If the user has already seen the preloader this session, skip entirely.
    if (typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY)) {
      return;
    }

    setVisible(true);
    sessionStorage.setItem(SESSION_KEY, "1");

    // Lock scroll while the preloader occupies the viewport
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const totalWriteMs = (LOGO_REVEAL_DURATION + HOLD_AFTER_REVEAL) * 1000;
    const dismiss = window.setTimeout(() => {
      setVisible(false);
    }, totalWriteMs);

    return () => {
      window.clearTimeout(dismiss);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
      }}
    >
      {visible && (
        <motion.div
          key="preloader"
          exit={{ y: "-101%" }}
          transition={{ duration: EXIT_DURATION, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-ink"
          aria-hidden
        >
          <div className="relative flex items-center justify-center">
            {/* Subtle white halo behind the mark */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[60vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 35%, rgba(255,255,255,0) 65%)",
                filter: "blur(40px)"
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: LOGO_REVEAL_DURATION,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative z-10 select-none"
            >
              {/* Dark background → use the white-coloured mark */}
              <Image
                src="/dark-bg-logo.png"
                alt="The Luxe Version"
                width={2172}
                height={724}
                priority
                className="h-auto w-[min(70vw,28rem)]"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
