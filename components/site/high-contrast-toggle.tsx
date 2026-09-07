"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

/**
 * Toggle for the site's high-contrast accessibility mode. Renders as an
 * icon + switch pill — the sliding knob makes the on/off state unmistakable.
 * Sets `document.documentElement.dataset.highContrast` and persists the
 * choice to localStorage. Global CSS overrides key off the
 * [data-high-contrast] attribute (see globals.css).
 */
export function HighContrastToggle({ className }: { className?: string }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    try {
      setOn(localStorage.getItem("highContrast") === "true");
    } catch {}
  }, []);

  useEffect(() => {
    if (on) {
      document.documentElement.dataset.highContrast = "true";
    } else {
      delete document.documentElement.dataset.highContrast;
    }
    try {
      localStorage.setItem("highContrast", String(on));
    } catch {}
  }, [on]);

  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      aria-label={on ? "Disable high contrast" : "Enable high contrast"}
      title={on ? "High contrast: on" : "High contrast: off"}
      className={clsx(
        "group flex items-center gap-2 p-1.5 transition-opacity hover:opacity-70",
        className
      )}
    >
      <ContrastGlyph />
      {/* Switch pill — the ON state uses a fixed champagne fill so the state
          is legible regardless of whether the nav bar is currently dark or
          white. OFF state adapts to the current text colour. */}
      <span
        aria-hidden
        className={clsx(
          "relative inline-block h-[14px] w-[26px] rounded-full border transition-colors duration-300",
          on
            ? "border-champagne bg-champagne"
            : "border-current/60 bg-transparent"
        )}
      >
        <span
          className={clsx(
            "absolute top-1/2 h-[8px] w-[8px] -translate-y-1/2 rounded-full transition-all duration-300",
            on ? "left-[calc(100%-11px)] bg-ink" : "left-[3px] bg-current"
          )}
        />
      </span>
    </button>
  );
}

function ContrastGlyph() {
  // Classic contrast icon — circle with left half filled.
  return (
    <svg
      viewBox="0 0 20 20"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden
    >
      <circle cx="10" cy="10" r="7.25" />
      <path
        d="M10 2.75 A7.25 7.25 0 0 0 10 17.25 Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
