import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, EDITS, type Product } from "@/lib/content";
import { CategoryHero } from "@/components/collections/category/category-hero";
import { CategoryFilterableGrid } from "@/components/collections/category/category-filterable-grid";
import { CategorySavoirFaire } from "@/components/collections/category/category-savoir-faire";
import { CategoryEditorial } from "@/components/collections/category/category-editorial";
import {
  CategoryRelated,
  type RelatedCard
} from "@/components/collections/category/category-related";

type SavoirFaireConfig = {
  kicker: string;
  title: string;
  body: string;
  poster: string;
  posterAlt: string;
  videoSrc?: string;
  href?: string;
  ctaLabel?: string;
};

type EditorialConfig = {
  kicker: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  href: string;
  ctaLabel?: string;
  mirror?: boolean;
};

type CategoryConfig = {
  filter: Product["category"];
  title: string;
  kicker: string;
  description: string;
  image: string;
  imageAlt: string;
  // Optional mobile-only hero image. Falls back to `image` on md+ screens.
  mobileImage?: string;
  // Optional tablet-only (iPad range, md→lg) hero image. Falls back to
  // `image` on lg+ screens when present.
  tabletImage?: string;
  // Accept a single config OR an array when the category wants to highlight
  // more than one piece back-to-back (e.g. Sculptures highlighting both
  // Majesté and Sillage). The grid interstitial renders each entry stacked.
  savoirFaire?: SavoirFaireConfig | SavoirFaireConfig[];
  editorial?: EditorialConfig;
  related?: RelatedCard[];
};

const CATEGORIES: Record<string, CategoryConfig> = {
  sculptures: {
    filter: "Sculptures",
    title: "Sculptures",
    kicker: "The Collection · Objects",
    description:
      "Hand-carved and cast forms — the piece a room turns toward first. Walnut, travertine, cast bronze, each shaped to hold a corner or an entry.",
    image: "/images/banners/sculpture.png",
    mobileImage: "/Mobile-banners/Sculpture.png",
    tabletImage: "/Ipads-tabs/Sculpture.png",
    imageAlt: "A hand-carved walnut sculpture",
    savoirFaire: [
      {
        kicker: "The Savoir-faire",
        title: "Of The Luxe Version",
        body:
          "A study in quiet majesty. MAJESTÉ captures the profound stillness of the Buddha through a serene expression and intricately sculpted crown, while its time-worn patina lends the piece a sense of history, character and regal presence.",
        poster: "/images/sculptures/Majeste/Budha1.webp",
        posterAlt: "A hand-carved sculpture in a lived-in room",
        href: "/collections/sculptures/sculpture-majeste",
        ctaLabel: "DISCOVER MAJESTE"
        //videoSrc: "/images/living-room2.mp4"
      },
      {
        kicker: "The Savoir-faire",
        title: "A Line That Moves",
        body:
          "Monumental in scale, SILLAGE expresses an extravagance of form and gold, with a fluidity that seems to know no bounds. Its substantial metal construction gives the piece weight, solidity and commanding presence — a defining line for the room.",
        poster: "/images/sculptures/Sillage/Sillage-hero.webp",
        posterAlt: "The Sillage sculpture in a lived-in setting",
        href: "/collections/sculptures/sculpture-sillage",
        ctaLabel: "DISCOVER SILLAGE"
      }
    ],
    editorial: {
      kicker: "The Collection",
      title: "One Line, Held",
      body:
        "A sculpture is the piece a room turns toward first. Placed on a mantel or at the edge of an entry, it holds the eye without asking. The rest of the room arranges itself around it.",
      image: "/images/sculptures/Altesse/Altesse1.webp",
      imageAlt: "A carved sculpture in profile",
      href: "/collections/sculptures"
    },
    related: [
      {
        title: "Vases",
        image: "/images/vases/Vase-rivage/Rivage-craft.webp",
        imageAlt: "A ceramic vessel",
        href: "/collections/vases"
      }
    ]
  },
  vases: {
    filter: "Vases",
    title: "Vases",
    kicker: "The Collection · Objects",
    description:
      "Vessels in ceramic, stone and glass — sculpture that holds. Wheel-thrown, hand-blown, bronze-glazed; scaled for the console, the sideboard, the low table.",
    image: "/images/banners/vase.png",
    mobileImage: "/Mobile-banners/Vase.png.png",
    tabletImage: "/Ipads-tabs/Vase.png",
    imageAlt: "A ceramic vessel",
    savoirFaire: {
      kicker: "The Savoir-faire",
      title: "Vessels, By Hand",
      body:
        "Each vessel is wheel-thrown, hand-blown, or bronze-glazed in a single studio. No two share the same silhouette; each carries the small asymmetries of the hand that shaped it.",
      poster: "/images/vases/vase2.webp",
      posterAlt: "A hand-thrown ceramic vessel",
      videoSrc: "/images/dining-video.mp4"
    },
    editorial: {
      kicker: "The Collection",
      title: "Sculpture That Holds",
      body:
        "A vessel earns its place by presence, not use. Set on a console or a low table, it draws the light of the room to one held form — quiet, weighted, unrepeatable.",
      image: "/images/vases/Vase-rivage/Rivage-presence.webp",
      imageAlt: "A ceramic vase in a lived-in setting",
      href: "/collections/vases"
    },
    related: [
      {
        title: "Sculptures",
        image: "/images/sculptures/Majeste/Majeste.webp",
        imageAlt: "The Majesté sculpture in a lived-in setting",
        href: "/collections/sculptures"
      }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export function generateMetadata({
  params
}: {
  params: { category: string };
}): Metadata {
  const cfg = CATEGORIES[params.category];
  if (!cfg) return { title: "Not found — The Luxe Version" };
  return {
    title: `${cfg.title} — The Luxe Version`,
    description: cfg.description
  };
}

export default function CategoryPage({
  params
}: {
  params: { category: string };
}) {
  const cfg = CATEGORIES[params.category];
  if (!cfg) notFound();

  // On the Sculptures category only, hide pieces that are featured on the
  // /edit page — those pieces continue to live on /edit, but we don't want
  // them duplicated into the main sculpture grid. Other categories include
  // all their products unchanged.
  const editHandles = new Set(EDITS.flatMap((e) => e.handles));
  const products: Product[] = PRODUCTS.filter(
    (p) =>
      p.category === cfg.filter &&
      p.handle !== "sculpture-majeste" &&
      !(params.category === "sculptures" && editHandles.has(p.handle))
  );

  return (
    <>
      <CategoryHero
        kicker={cfg.kicker}
        title={cfg.title}
        description={cfg.description}
        image={cfg.image}
        imageAlt={cfg.imageAlt}
        mobileImage={cfg.mobileImage}
        tabletImage={cfg.tabletImage}
      />
      <CategoryFilterableGrid
        products={products}
        interstitial={
          cfg.savoirFaire
            ? (Array.isArray(cfg.savoirFaire)
                ? cfg.savoirFaire
                : [cfg.savoirFaire]
              ).map((sf, i) => (
                <CategorySavoirFaire key={`${sf.title}-${i}`} {...sf} />
              ))
            : null
        }
      />
      {cfg.editorial && <CategoryEditorial {...cfg.editorial} />}
      {cfg.related && cfg.related.length > 0 && (
        <CategoryRelated cards={cfg.related} />
      )}
    </>
  );
}
