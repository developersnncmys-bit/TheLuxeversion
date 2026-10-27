import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/content";
import { CategoryHero } from "@/components/collections/category/category-hero";
import { ObjectsCatalog } from "@/components/collections/objects/objects-catalog";

export const metadata: Metadata = {
  title: "Objects — The Luxe Version",
  description:
    "Sculptures and vases — the objects that finish a room."
};

export default function ObjectsPage() {
  return (
    <>
      <CategoryHero
        kicker="The Collection"
        title="Objects"
        description="Sculptural and quiet — the objects that finish a room. Sculptures in hand-carved wood and cast bronze, vessels wheel-thrown in stoneware and glass. Each conceived as a composition, sized to be lived with."
        image="/images/banners/Objectsbanner.png"
        imageAlt="An arrangement of objects — a curated composition"
      />
      <ObjectsCatalog products={PRODUCTS} />
    </>
  );
}
