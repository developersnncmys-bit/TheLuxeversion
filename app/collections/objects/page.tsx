import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/content";
import { CategoryHero } from "@/components/collections/category/category-hero";
import { ObjectsCatalog } from "@/components/collections/objects/objects-catalog";

export const metadata: Metadata = {
  title: "Objects — The Luxe Version",
  description:
    "Sculptures, vases and tabletop — the objects that finish a room."
};

export default function ObjectsPage() {
  // All non-lighting products belong to the Objects umbrella.
  const objects = PRODUCTS.filter((p) => p.category !== "Lighting");

  return (
    <>
      <CategoryHero
        kicker="The Collection"
        title="Objects"
        description="Sculptural and quiet — the objects that finish a room. Sculptures in hand-carved wood and cast bronze, vessels wheel-thrown in stoneware and glass, and tabletop pieces for the dining table. Each conceived as a composition, sized to be lived with."
        image="/images/product-banners/allobjects-banner.png"
        imageAlt="An arrangement of objects — a curated composition"
      />
      <ObjectsCatalog products={objects} />
    </>
  );
}
