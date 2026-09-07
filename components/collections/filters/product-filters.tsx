"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import type { Product } from "@/lib/content";

// Fixed keyword vocabulary — matched substring-wise against a product's
// free-text `material` field. Keeps the filter UI stable as new products are
// added; new materials just need to be added here to become filterable.
export const MATERIAL_KEYWORDS = [
  "Brass",
  "Bronze",
  "Walnut",
  "Oak",
  "Ceramic",
  "Stoneware",
  "Porcelain",
  "Glass",
  "Travertine",
  "Alabaster",
  "Marble",
  "Linen"
];

export type PriceBucket = {
  key: string;
  label: string;
  min: number;
  max: number;
};

export const PRICE_BUCKETS: PriceBucket[] = [
  { key: "under-50k", label: "Under ₹50,000", min: 0, max: 50000 },
  { key: "50-100k", label: "₹50,000 – ₹1,00,000", min: 50000, max: 100000 },
  { key: "100-200k", label: "₹1,00,000 – ₹2,00,000", min: 100000, max: 200000 },
  {
    key: "over-200k",
    label: "Over ₹2,00,000",
    min: 200000,
    max: Number.POSITIVE_INFINITY
  }
];

// Only surface material keywords that at least one product in the input set
// actually has — avoids showing filters that would always return zero.
export function getAvailableMaterials(products: Product[]): string[] {
  const set = new Set<string>();
  for (const p of products) {
    const material = (p.material || "").toLowerCase();
    for (const kw of MATERIAL_KEYWORDS) {
      if (material.includes(kw.toLowerCase())) set.add(kw);
    }
  }
  return Array.from(set).sort();
}

export function applyProductFilters(
  products: Product[],
  selectedMaterials: Set<string>,
  selectedPrices: Set<string>
): Product[] {
  return products.filter((p) => {
    if (selectedMaterials.size > 0) {
      const material = (p.material || "").toLowerCase();
      const matches = Array.from(selectedMaterials).some((kw) =>
        material.includes(kw.toLowerCase())
      );
      if (!matches) return false;
    }
    if (selectedPrices.size > 0) {
      const price = p.price.inr;
      const inBucket = Array.from(selectedPrices).some((key) => {
        const bucket = PRICE_BUCKETS.find((b) => b.key === key);
        return bucket ? price >= bucket.min && price < bucket.max : false;
      });
      if (!inBucket) return false;
    }
    return true;
  });
}

export function FilterDrawer({
  open,
  onClose,
  materials,
  selectedMaterials,
  toggleMaterial,
  selectedPrices,
  togglePrice,
  onClear,
  resultCount
}: {
  open: boolean;
  onClose: () => void;
  materials: string[];
  selectedMaterials: Set<string>;
  toggleMaterial: (kw: string) => void;
  selectedPrices: Set<string>;
  togglePrice: (key: string) => void;
  onClear: () => void;
  resultCount: number;
}) {
  const lenis = useLenis();

  // Lock page scroll + close on Escape while drawer is open. The site runs
  // Lenis (smooth-scroll library) which manages scroll itself, so body
  // overflow alone won't stop the page — we also have to stop Lenis.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, lenis]);

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
            className="fixed inset-0 z-40 bg-ink/70"
            aria-hidden="true"
          />
          <motion.aside
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 top-0 z-50 flex h-full w-[380px] max-w-[90vw] flex-col bg-ink text-chalk"
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
          >
            <div className="flex items-center justify-between border-b border-chalk/10 px-8 py-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em]">
                Filters
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close filters"
                className="text-chalk/70 transition-colors hover:text-chalk"
              >
                <CloseIcon />
              </button>
            </div>

            <div
              data-lenis-prevent
              className="flex-1 space-y-12 overflow-y-auto overscroll-contain px-8 py-8"
            >
              {materials.length > 0 && (
                <FilterSection title="Material">
                  {materials.map((m) => (
                    <FilterCheckbox
                      key={m}
                      label={m}
                      checked={selectedMaterials.has(m)}
                      onChange={() => toggleMaterial(m)}
                    />
                  ))}
                </FilterSection>
              )}
              <FilterSection title="Price">
                {PRICE_BUCKETS.map((b) => (
                  <FilterCheckbox
                    key={b.key}
                    label={b.label}
                    checked={selectedPrices.has(b.key)}
                    onChange={() => togglePrice(b.key)}
                  />
                ))}
              </FilterSection>
            </div>

            <div className="grid grid-cols-2 border-t border-chalk/10">
              <button
                type="button"
                onClick={onClear}
                className="py-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-chalk/75 transition-colors hover:text-chalk"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-chalk py-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink"
              >
                Result{resultCount > 0 ? ` (${resultCount})` : ""}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function FilterSection({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-chalk/55">
        {title}
      </p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function FilterCheckbox({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-3">
      <span
        className={`inline-flex h-[14px] w-[14px] shrink-0 items-center justify-center border transition-colors ${
          checked
            ? "border-chalk bg-chalk text-ink"
            : "border-chalk/40 group-hover:border-chalk/70"
        }`}
        aria-hidden="true"
      >
        {checked && <CheckIcon />}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="text-[13px] text-chalk/85 transition-colors group-hover:text-chalk">
        {label}
      </span>
    </label>
  );
}

export function FilterIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M0.5 3h8M10.5 3h3M0.5 7h2.5M4.5 7h9M0.5 11h8M10.5 11h3"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="9.5" cy="3" r="1.2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="3.5" cy="7" r="1.2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="9.5" cy="11" r="1.2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function CloseIcon() {
  return (
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
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d="M1.5 5l2.5 2.5L8.5 2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
