"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { PRODUCTS, productHref } from "@/lib/content";
import { useStore } from "./store-provider";

export function SearchOverlay() {
  const { drawer, closeDrawer } = useStore();
  const open = drawer === "search";
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset the query on close, focus on open, lock scroll + Escape while open.
  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 150);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeDrawer]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter((p) => {
      const haystack = [
        p.name,
        p.category,
        p.material ?? "",
        p.description
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    }).slice(0, 8);
  }, [query]);

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
            onClick={closeDrawer}
            className="fixed inset-0 z-[60] bg-ink/70"
            aria-hidden="true"
          />
          <motion.div
            key="panel"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-[70] max-h-[90vh] overflow-y-auto bg-ink text-chalk"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <div className="mx-auto max-w-editorial px-6 pb-10 pt-10 md:px-14 md:pb-16 md:pt-14">
              <div className="flex items-center justify-between gap-6 border-b border-chalk/20 pb-4">
                <label className="flex flex-1 items-center gap-4">
                  <SearchGlyph />
                  <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a piece, a material, a room…"
                    className="w-full bg-transparent py-2 text-[16px] text-chalk placeholder:text-chalk/40 focus:outline-none md:text-[18px]"
                    aria-label="Search products"
                  />
                </label>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="shrink-0 text-[11px] uppercase tracking-[0.28em] text-chalk/70 transition-colors hover:text-chalk"
                >
                  Close
                </button>
              </div>

              <div className="mt-10">
                {!query.trim() ? (
                  <SuggestedList onSelect={closeDrawer} />
                ) : results.length === 0 ? (
                  <p className="py-16 text-center text-[13px] uppercase tracking-[0.24em] text-chalk/50">
                    No matches for &ldquo;{query}&rdquo;
                  </p>
                ) : (
                  <>
                    <p className="mb-6 text-[10px] uppercase tracking-[0.32em] text-chalk/55">
                      {results.length}{" "}
                      {results.length === 1 ? "result" : "results"}
                    </p>
                    <ul className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                      {results.map((p) => (
                        <li key={p.handle}>
                          <Link
                            href={productHref(p)}
                            onClick={closeDrawer}
                            className="group block"
                          >
                            <div className="relative aspect-[4/5] w-full overflow-hidden bg-onyx">
                              <SafeImage
                                src={p.image}
                                alt={p.name}
                                fallbackSeed={`${p.handle}-search`}
                                fill
                                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 100vw"
                                className="object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.04]"
                              />
                            </div>
                            <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-chalk/55">
                              {p.category}
                            </p>
                            <p className="mt-1 font-display text-[13px] font-semibold uppercase tracking-[0.02em] text-chalk">
                              {p.name}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SuggestedList({ onSelect }: { onSelect: () => void }) {
  const suggestions = [
    { label: "Chandeliers", href: "/collections/lighting" },
    { label: "Vases", href: "/collections/vases" },
    { label: "Sculptures", href: "/collections/sculptures" },
    { label: "Tabletop", href: "/collections/tabletop" }
  ];
  return (
    <div>
      <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-chalk/55">
        Suggested
      </p>
      <ul className="flex flex-wrap gap-x-6 gap-y-3">
        {suggestions.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              onClick={onSelect}
              className="text-[13px] uppercase tracking-[0.22em] text-chalk/85 underline underline-offset-[6px] decoration-chalk/30 transition-colors hover:text-chalk hover:decoration-chalk/70"
            >
              {s.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SearchGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      className="shrink-0 text-chalk/70"
      aria-hidden
    >
      <circle
        cx="9"
        cy="9"
        r="6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M13.5 13.5 L17 17"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
