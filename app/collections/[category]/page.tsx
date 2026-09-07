import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, type Product } from "@/lib/content";
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
  savoirFaire?: SavoirFaireConfig;
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
    imageAlt: "A hand-carved walnut sculpture",
    savoirFaire: {
      kicker: "The Savoir-faire",
      title: "Of The Luxe Version",
      body:
        "Every sculpture begins as a single billet — walnut, travertine, or cast bronze — worked by a single hand until one line remains. Forty hours per piece; signed and dated at the base.",
      poster: "/images/sculptures/scu4.png",
      posterAlt: "A hand-carved sculpture in a lived-in room",
      videoSrc: "/images/living-room2.mp4"
    },
    editorial: {
      kicker: "The Collection",
      title: "One Line, Held",
      body:
        "A sculpture is the piece a room turns toward first. Placed on a mantel or at the edge of an entry, it holds the eye without asking. The rest of the room arranges itself around it.",
      image: "/images/sculptures/scu3.png",
      imageAlt: "A carved sculpture in profile",
      href: "/collections/sculptures"
    },
    related: [
      {
        title: "Vases",
        image: "/images/vases/vase1.png",
        imageAlt: "A ceramic vessel",
        href: "/collections/vases"
      },
      {
        title: "Decorative Objects",
        image: "/images/decorative-objects/deco1.png",
        imageAlt: "An arched mirror",
        href: "/collections/decorative-objects"
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
    imageAlt: "A ceramic vessel",
    savoirFaire: {
      kicker: "The Savoir-faire",
      title: "Vessels, By Hand",
      body:
        "Each vessel is wheel-thrown, hand-blown, or bronze-glazed in a single studio. No two share the same silhouette; each carries the small asymmetries of the hand that shaped it.",
      poster: "/images/vases/vase2.png",
      posterAlt: "A hand-thrown ceramic vessel",
      videoSrc: "/images/dining-video.mp4"
    },
    editorial: {
      kicker: "The Collection",
      title: "Sculpture That Holds",
      body:
        "A vessel earns its place by presence, not use. Set on a console or a low table, it draws the light of the room to one held form — quiet, weighted, unrepeatable.",
      image: "/images/vases/vase3.png",
      imageAlt: "A ceramic vase in profile",
      href: "/collections/vases"
    },
    related: [
      {
        title: "Sculptures",
        image: "/images/sculptures/scu1.png",
        imageAlt: "A hand-carved sculpture",
        href: "/collections/sculptures"
      },
      {
        title: "Tabletop",
        image: "/images/table-top/table1.png",
        imageAlt: "A stoneware charger",
        href: "/collections/tabletop"
      }
    ]
  },
  figurines: {
    filter: "Figurines",
    title: "Figurines",
    kicker: "The Collection · Objects",
    description:
      "Small representational forms — quiet punctuation on a shelf. Bronze, alabaster, porcelain — the object at the edge of the bookcase, the desk, the bedside.",
    image: "/images/banners/figurine.png",
    imageAlt: "A small figurine",
    savoirFaire: {
      kicker: "The Savoir-faire",
      title: "Cast, Carved, Held",
      body:
        "Bronze poured in lost-wax molds, alabaster worked by hand, porcelain fired in small batches. A figurine is a study, sized for the shelf and made to be lived with.",
      poster: "/images/figurines/figurine4.png",
      posterAlt: "A small hand-worked figurine"
    },
    editorial: {
      kicker: "The Collection",
      title: "Quiet Punctuation",
      body:
        "The figurine belongs at the edge — the corner of the bookcase, the writing desk, the bedside table. Small enough to hold in one hand; large enough in feeling to change a shelf.",
      image: "/images/figurines/figurine5.png",
      imageAlt: "A figurine at the edge of a shelf",
      href: "/collections/figurines"
    },
    related: [
      {
        title: "Sculptures",
        image: "/images/sculptures/scu2.png",
        imageAlt: "A hand-carved sculpture",
        href: "/collections/sculptures"
      },
      {
        title: "Decorative Objects",
        image: "/images/decorative-objects/deco2.png",
        imageAlt: "An arched mirror",
        href: "/collections/decorative-objects"
      }
    ]
  },
  "decorative-objects": {
    filter: "Decorative Objects",
    title: "Decorative Objects",
    kicker: "The Collection · Objects",
    description:
      "Mirrors, trays and the quiet objects that finish the surfaces of a room. Framed in brass, blackened oak, or unlacquered edges that warm with time.",
    image: "/images/banners/decorative-object.png",
    imageAlt: "An arched mirror",
    savoirFaire: {
      kicker: "The Savoir-faire",
      title: "The Finish of a Room",
      body:
        "Mirrors framed in blackened oak, trays hand-turned in unlacquered brass — each object made to sit against a wall or a surface and belong there for decades.",
      poster: "/images/decorative-objects/deco2.png",
      posterAlt: "An arched mirror against a lived-in wall"
    },
    editorial: {
      kicker: "The Collection",
      title: "The Room, Completed",
      body:
        "A mirror hung against plaster, a brass tray on the entry console, a bowl on the low table. These are the pieces that finish a room — small in scale, large in what they hold together.",
      image: "/images/decorative-objects/deco3.png",
      imageAlt: "A decorative object on a low table",
      href: "/collections/decorative-objects"
    },
    related: [
      {
        title: "Sculptures",
        image: "/images/sculptures/scu1.png",
        imageAlt: "A hand-carved sculpture",
        href: "/collections/sculptures"
      },
      {
        title: "Vases",
        image: "/images/vases/vase2.png",
        imageAlt: "A ceramic vessel",
        href: "/collections/vases"
      }
    ]
  },
  tabletop: {
    filter: "Tabletop",
    title: "Tabletop",
    kicker: "The Collection · Objects",
    description:
      "Vessels and forms scaled for the dining table — service as composition. Stoneware chargers, hand-blown carafes, undyed linen runners.",
    image: "/images/banners/table-top.png",
    imageAlt: "A stoneware charger",
    savoirFaire: {
      kicker: "The Savoir-faire",
      title: "Service as Composition",
      body:
        "Stoneware chargers thrown by a single potter, carafes hand-blown in warm glass, linens undyed and hand-hemmed. A table set from a single hand reads as one thought.",
      poster: "/images/table-top/table2.png",
      posterAlt: "A composed dining table",
      videoSrc: "/images/dining-video.mp4"
    },
    editorial: {
      kicker: "The Collection",
      title: "One Thought, Set",
      body:
        "The dining table is the most-used sculpture in the house. Set with pieces from one hand — chargers, carafe, glass — it composes rather than serves.",
      image: "/images/table-top/table4.png",
      imageAlt: "A composed dining setting",
      href: "/collections/tabletop"
    },
    related: [
      {
        title: "Vases",
        image: "/images/vases/vase1.png",
        imageAlt: "A ceramic vessel",
        href: "/collections/vases"
      },
      {
        title: "Lighting",
        image: "/images/lighting/light1.png",
        imageAlt: "A sculptural chandelier",
        href: "/collections/lighting"
      }
    ]
  },
  lighting: {
    filter: "Lighting",
    title: "Lighting",
    kicker: "The Collection",
    description:
      "Chandeliers, pendants and lamps — light that draws a room together. Hand-blown glass, unlacquered brass, warm to read by.",
    image: "/images/banners/lighting.png",
    imageAlt: "A sculptural chandelier",
    savoirFaire: {
      kicker: "The Savoir-faire",
      title: "Jewellery for the Room",
      body:
        "Every leaf of glass is shaped by a single hand outside Firozabad. Frames turned in unlacquered brass; wiring and finishing take four to six weeks per fixture.",
      poster: "/images/lighting/light4.png",
      posterAlt: "A chandelier in a lived-in room",
      videoSrc: "/images/living-room1.mp4"
    },
    editorial: {
      kicker: "The Collection",
      title: "Hung Once, Lived With",
      body:
        "One fixture holds a whole room together. Hung low over the dining table, or the double-height entry, it becomes the piece the house is arranged around.",
      image: "/images/lighting/light5.png",
      imageAlt: "A chandelier over a stairwell",
      href: "/collections/lighting"
    },
    related: [
      {
        title: "Decorative Objects",
        image: "/images/decorative-objects/deco1.png",
        imageAlt: "An arched mirror",
        href: "/collections/decorative-objects"
      },
      {
        title: "Sculptures",
        image: "/images/sculptures/scu1.png",
        imageAlt: "A hand-carved sculpture",
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

  const products = PRODUCTS.filter((p) => p.category === cfg.filter);

  return (
    <>
      <CategoryHero
        kicker={cfg.kicker}
        title={cfg.title}
        description={cfg.description}
        image={cfg.image}
        imageAlt={cfg.imageAlt}
      />
      <CategoryFilterableGrid
        products={products}
        interstitial={
          cfg.savoirFaire ? <CategorySavoirFaire {...cfg.savoirFaire} /> : null
        }
      />
      {cfg.editorial && <CategoryEditorial {...cfg.editorial} />}
      {cfg.related && cfg.related.length > 0 && (
        <CategoryRelated cards={cfg.related} />
      )}
    </>
  );
}
