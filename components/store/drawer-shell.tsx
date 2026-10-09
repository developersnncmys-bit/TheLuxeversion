"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

type Tone = "dark" | "light";

// Shared right-slide drawer chrome — used by cart + wishlist + account. Handles
// scrim, body-scroll lock, Escape-to-close, animation. Overlay content composes
// on top of this. The `tone` prop flips the panel between the house dark
// palette (default) and the light shopping-bag palette.
export function DrawerShell({
  open,
  onClose,
  title,
  children,
  footer,
  tone = "dark"
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  tone?: Tone;
}) {
  const panelBg = tone === "light" ? "bg-chalk text-ink" : "bg-ink text-chalk";
  const borderColor = tone === "light" ? "border-ink/10" : "border-chalk/10";
  const closeColor =
    tone === "light"
      ? "text-ink/70 hover:text-ink"
      : "text-chalk/70 hover:text-chalk";
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink/70"
            aria-hidden="true"
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={clsx(
              "fixed right-0 top-0 z-[70] flex h-full w-[440px] max-w-[92vw] flex-col",
              panelBg
            )}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <div
              className={clsx(
                "flex items-center justify-between border-b px-6 py-6 md:px-8",
                borderColor
              )}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em]">
                {title}
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label={`Close ${title}`}
                className={clsx("transition-colors", closeColor)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 2l12 12M14 2L2 14"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">{children}</div>

            {footer && (
              <div className={clsx("border-t", borderColor)}>{footer}</div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
