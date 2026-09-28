"use client";

import { useMemo, useState, type ReactNode } from "react";
import { CategoryGrid } from "./category-grid";
import {
  FilterDrawer,
  FilterIcon,
  applyProductFilters,
  getAvailableMaterials
} from "@/components/collections/filters/product-filters";
import type { Product } from "@/lib/content";

// Owns filter state and the interstitial split. The parent page passes a
// pre-filtered set of products (by category) and, optionally, an interstitial
// block (savoir-faire) that appears between the two halves of the grid.
export function CategoryFilterableGrid({
  products,
  interstitial
}: {
  products: Product[];
  interstitial?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<Set<string>>(
    () => new Set()
  );
  const [selectedPrices, setSelectedPrices] = useState<Set<string>>(
    () => new Set()
  );

  const availableMaterials = useMemo(
    () => getAvailableMaterials(products),
    [products]
  );

  const filtered = useMemo(
    () => applyProductFilters(products, selectedMaterials, selectedPrices),
    [products, selectedMaterials, selectedPrices]
  );

  // Split around the interstitial. Round the midpoint up to the nearest
  // multiple of the desktop column count (3) so the first-half grid always
  // ends on a full row — otherwise a lone product dangles next to the
  // interstitial with two empty grid cells beside it.
  const rawMidpoint = Math.ceil(filtered.length / 2);
  const midpoint = Math.min(
    Math.ceil(rawMidpoint / 3) * 3,
    filtered.length
  );
  const firstHalf = filtered.slice(0, midpoint);
  const secondHalf = filtered.slice(midpoint);
  const activeCount = selectedMaterials.size + selectedPrices.size;

  const toggleMaterial = (kw: string) =>
    setSelectedMaterials((prev) => {
      const next = new Set(prev);
      next.has(kw) ? next.delete(kw) : next.add(kw);
      return next;
    });

  const togglePrice = (key: string) =>
    setSelectedPrices((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const clearAll = () => {
    setSelectedMaterials(new Set());
    setSelectedPrices(new Set());
  };

  return (
    <>
      <div className="border-t border-chalk/10 bg-ink">
        <div className="mx-auto flex max-w-editorial items-center justify-between px-6 py-5 md:px-14 md:py-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex shrink-0 items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-chalk/85 transition-colors hover:text-chalk"
            aria-label="Open filters"
          >
            <FilterIcon />
            Filters
            {activeCount > 0 && (
              <span className="text-chalk/60">({activeCount})</span>
            )}
          </button>
          <p className="ml-auto text-[11px] uppercase tracking-[0.28em] text-chalk/60">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
        <div className="h-px w-full bg-chalk/10" />
      </div>

      {filtered.length === 0 ? (
        <section className="bg-ink py-32 text-center text-chalk md:py-40">
          <p className="text-[11px] uppercase tracking-[0.28em] text-chalk/50">
            No pieces match these filters.
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-8 text-[11px] uppercase tracking-[0.28em] text-chalk underline underline-offset-[6px] decoration-chalk/50 transition-colors hover:decoration-chalk"
          >
            Clear filters
          </button>
        </section>
      ) : (
        <>
          <CategoryGrid products={firstHalf} showToolbar={false} />
          {interstitial && secondHalf.length > 0 && interstitial}
          {secondHalf.length > 0 && (
            <CategoryGrid products={secondHalf} showToolbar={false} />
          )}
        </>
      )}

      <FilterDrawer
        open={open}
        onClose={() => setOpen(false)}
        materials={availableMaterials}
        selectedMaterials={selectedMaterials}
        toggleMaterial={toggleMaterial}
        selectedPrices={selectedPrices}
        togglePrice={togglePrice}
        onClear={clearAll}
        resultCount={filtered.length}
      />
    </>
  );
}
