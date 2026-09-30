import type { Metadata } from "next";
import { PRODUCTS, type Product } from "@/lib/content";
import { CollectionHero } from "@/components/collections/collection-hero";
import { CollectionManifesto } from "@/components/collections/collection-manifesto";
import { CollectionInterlude } from "@/components/collections/collection-interlude";
import { CategorySection } from "@/components/collections/category-section";
import { CollectionClosing } from "@/components/collections/collection-closing";

export const metadata: Metadata = {
  title: "The Collection — The Luxe Version",
  description:
    "Objects and lighting — the pieces you keep."
};

// Taxonomy mirrors the navbar sublinks. Empty categories are filtered out at
// render time so the page never shows a hollow section, and re-populate
// automatically once matching products land in `content.ts`.
const CATEGORY_CONFIG: Array<{
  id: string;
  label: Product["category"];
  intro: string;
}> = [
  {
    id: "sculptures",
    label: "Sculptures",
    intro:
      "Hand-carved and cast forms — the piece a room turns toward first."
  },
  {
    id: "vases",
    label: "Vases",
    intro:
      "Vessels in ceramic, stone and glass — sculpture that holds."
  },
  {
    id: "tabletop",
    label: "Tabletop",
    intro:
      "Vessels and forms scaled for the dining table — service as composition."
  },
  {
    id: "lighting",
    label: "Lighting",
    intro:
      "Chandeliers, pendants and lamps — light that draws a room together."
  }
];

export default function CollectionsPage() {
  const active = CATEGORY_CONFIG
    .map((c) => ({
      ...c,
      // Cap at 3 per category — the collections overview is a taste of each
      // category, not the full grid; the dedicated /collections/{slug} page
      // shows every piece.
      products: PRODUCTS.filter((p) => p.category === c.label).slice(0, 3)
    }))
    .filter((c) => c.products.length > 0);

  return (
    <>
      <CollectionHero />
      <CollectionManifesto />
      <CollectionInterlude />
      {active.map((c, i) => (
        <CategorySection
          key={c.id}
          id={c.id}
          number={String(i + 1).padStart(2, "0")}
          kicker="The House"
          title={c.label}
          intro={c.intro}
          products={c.products}
          mirror={i % 2 === 1}
        />
      ))}
      <CollectionClosing />
    </>
  );
}
