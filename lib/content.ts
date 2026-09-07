export type ProductDetail = {
  label: string;
  body: string;
  image: string;
};

// The "Inspiration" editorial block — a full-bleed in-situ shot followed by
// a numbered three-column rationale grid: the reasons the buyer would want
// to live with this piece. `image` falls back to lifestyleImage /
// product.image; `body` is an optional intro paragraph above the grid.
export type ProductInspirationReason = {
  label: string;
  body: string;
};
export type ProductInspiration = {
  eyebrow?: string;
  title: string;
  body?: string;
  reasons?: ProductInspirationReason[];
  image?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type Product = {
  handle: string;
  name: string;
  category:
    | "Sculptures"
    | "Vases"
    | "Figurines"
    | "Decorative Objects"
    | "Tabletop"
    | "Lighting";
  description: string;
  price: { inr: number; usd: number };
  image: string;
  aspect: "portrait" | "landscape" | "square";
  // Detail-page fields — optional so the type stays permissive; the product
  // detail page falls back gracefully when a field is missing.
  material?: string;
  gallery?: string[];
  body?: string;
  details?: ProductDetail[];
  pullQuote?: string;
  lifestyleImage?: string;
  inspiration?: ProductInspiration;
};

// URL slug for a product's category page. Kept in sync with the CATEGORIES
// keys in app/collections/[category]/page.tsx.
export function categorySlug(category: Product["category"]): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

// Canonical product URL. All product-card call sites should use this.
export function productHref(product: Product): string {
  return `/collections/${categorySlug(product.category)}/${product.handle}`;
}

// Reference number displayed on the detail page — derived from handle so we
// don't have to author a SKU per product.
export function productRef(product: Product): string {
  const hash = product.handle
    .split("")
    .reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 0);
  return `LV-${String(hash).slice(0, 6).padStart(6, "0")}`;
}

// Related pieces for the "Discover Also" rail: same category first, then
// other pieces from the house. Excludes the current product.
export function getRelatedProducts(current: Product, limit = 3): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === current.category && p.handle !== current.handle
  );
  const rest = PRODUCTS.filter(
    (p) => p.category !== current.category && p.handle !== current.handle
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

// Every image path below is scoped to a category folder under public/images.
// Do not reference stock imagery (Pexels/Unsplash) or root-level images from
// this data — the folders are the single source of truth.
export const PRODUCTS: Product[] = [
  {
    handle: "chandelier-verre",
    name: "Chandelier — Verre",
    category: "Lighting",
    description:
      "A hand-blown glass chandelier in warm brass. Suspended presence for the dining table or a double-height entry.",
    price: { inr: 328000, usd: 4050 },
    image: "/images/lighting/light1.png",
    aspect: "portrait",
    material: "Hand-blown glass, unlacquered brass",
    body:
      "A chandelier of many small glass forms, each shaped by hand and suspended in warm, unlacquered brass. Scaled for the dining table or the double-height entry — a slow, held presence that reads as jewellery for the room. The brass is left raw; it warms and deepens with time, so the piece belongs more fully to the house each year.",
    gallery: [
      "/images/lighting/light1.png",
      "/images/lighting/light2.png",
      "/images/lighting/light3.png",
      "/images/lighting/light4.png"
    ],
    details: [
      {
        label: "Material",
        body:
          "Unlacquered brass frame with hand-blown clear glass leaves. Finished by hand; the brass warms with time. Weight: 12 kg. Overall drop: 90–140 cm, made to order.",
        image: "/images/materials/glass.png"
      },
      {
        label: "Craft",
        body:
          "Each leaf is shaped by a single glassblower in a small studio outside Firozabad. Assembly, wiring and finishing take four to six weeks per piece.",
        image: "/images/lighting/light6.png"
      }
    ],
    pullQuote:
      "One fixture that holds the whole room together — hung once, lived with for decades.",
    lifestyleImage: "/images/lighting/light4.png",
    inspiration: {
      title: "The piece the room is built around",
      reasons: [
        {
          label: "Craftsmanship",
          body:
            "Each glass leaf is shaped by a single glassblower in a small studio outside Firozabad. No two Verre chandeliers are identical."
        },
        {
          label: "Made to your ceiling",
          body:
            "Four to six weeks per piece. Drop, wiring and rose fitted to the exact height your room asks for."
        },
        {
          label: "Living surface",
          body:
            "The brass is unlacquered — it warms and darkens with every year in the house. Fixtures at this scale are typically inherited, not bought."
        }
      ]
    }
  },
  {
    handle: "table-lamp-alba",
    name: "Table Lamp — Alba",
    category: "Lighting",
    description:
      "A brass table lamp with an ivory linen shade. Warm enough to read by — for the side table or the console.",
    price: { inr: 68000, usd: 840 },
    image: "/images/lighting/light2.png",
    aspect: "portrait",
    material: "Turned brass, ivory linen shade",
    body:
      "A turned brass table lamp with a hand-sewn ivory linen shade. Warm enough to read by, quiet enough to leave on all evening. Sized for the side table, the console, the writing desk that wants a single warm light.",
    gallery: [
      "/images/lighting/light2.png",
      "/images/lighting/light3.png",
      "/images/lighting/light4.png",
      "/images/lighting/light5.png"
    ],
    details: [
      {
        label: "Material",
        body:
          "Solid turned brass base with a hand-sewn linen shade. E27 fitting, dimmable. 52 cm overall height, 30 cm shade diameter.",
        image: "/images/materials/metal.png"
      },
      {
        label: "Craft",
        body:
          "The base is turned and hand-finished in a small workshop. Each shade is cut, sewn and trimmed to order — no two identical.",
        image: "/images/lighting/light1.png"
      }
    ],
    pullQuote: "The lamp you leave on until the last of the guests have gone.",
    lifestyleImage: "/images/lighting/light5.png",
    inspiration: {
      title: "The lamp you stop replacing",
      reasons: [
        {
          label: "Solid brass",
          body:
            "Turned from solid stock — not plated, not lacquered. Nothing thin to chip; the finish gets better with age."
        },
        {
          label: "Shade to order",
          body:
            "Each linen shade is cut, sewn and trimmed by hand. Small variations are inherent — no two are identical."
        },
        {
          label: "Generational",
          body:
            "Buy this once at forty; hand it down at seventy. Replaces the whole cycle of disposable side-table lamps."
        }
      ]
    }
  },
  {
    handle: "sculpture-ondu",
    name: "Sculpture — Ondu",
    category: "Sculptures",
    description:
      "A hand-carved walnut sculpture in a dark oil finish. A single graphic form — for a mantel, an entry, or a corner that wants a line.",
    price: { inr: 96000, usd: 1180 },
    image: "/images/sculptures/scu8.png",
    aspect: "portrait",
    material: "Hand-carved walnut, dark oil finish",
    body:
      "A sculpture carved from a single billet of walnut and finished in a dark, hand-rubbed oil that deepens over time. A graphic vertical form — for the mantel, the entry table, or the corner of a room that wants one held line.",
    gallery: [
      "/images/sculptures/scu1.png",
      "/images/sculptures/scu2.png",
      "/images/sculptures/scu3.png",
      "/images/sculptures/scu4.png"
    ],
    details: [
      {
        label: "Material",
        body:
          "Solid walnut, single billet — no joins, no laminate. Dark oil finish, hand-rubbed. 72 cm tall.",
        image: "/images/materials/wood.png"
      },
      {
        label: "Craft",
        body:
          "Carved by a single hand from a single piece of wood. Forty hours per sculpture; signed and dated at the base.",
        image: "/images/sculptures/scu6.png"
      }
    ],
    pullQuote: "One line, held. The room finds it first, and returns to it.",
    lifestyleImage: "/images/sculptures/scu4.png",
    inspiration: {
      title: "Forty hours in one piece of walnut",
      reasons: [
        {
          label: "Single billet",
          body:
            "Carved from one solid piece of walnut. No joins, no laminate, no shortcuts."
        },
        {
          label: "One pair of hands",
          body:
            "Forty hours of hand-carving per sculpture — signed and dated at the base by the carver."
        },
        {
          label: "Improves with age",
          body:
            "Dark, hand-rubbed oil that deepens with every year in the room. The silhouette can be copied. The hand behind it cannot."
        }
      ]
    }
  },
  {
    handle: "pendant-lume",
    name: "Pendant — Lume",
    category: "Lighting",
    description:
      "A single-drop pendant in unlacquered brass. Reads as jewellery for the room — above a console, a bar, or a corner reading chair.",
    price: { inr: 84000, usd: 1040 },
    image: "/images/lighting/light3.png",
    aspect: "portrait",
    material: "Unlacquered brass, single drop",
    body:
      "A single-drop pendant in unlacquered brass — a small, held light that reads as jewellery for the room. Hung low over a console, a bar corner, or a reading chair. The brass is raw; it warms and darkens with time.",
    gallery: [
      "/images/lighting/light3.png",
      "/images/lighting/light4.png",
      "/images/lighting/light5.png",
      "/images/lighting/light6.png"
    ],
    details: [
      {
        label: "Material",
        body:
          "Unlacquered brass shade and stem. E14 fitting, 2m black fabric cord, brass ceiling rose.",
        image: "/images/materials/metal.png"
      },
      {
        label: "Craft",
        body:
          "Spun and hand-finished in the same brass workshop as the Verre chandelier. Made to order; drop height specified at purchase.",
        image: "/images/lighting/light2.png"
      }
    ],
    pullQuote: "Jewellery, hung.",
    lifestyleImage: "/images/lighting/light6.png",
    inspiration: {
      title: "The small piece with real provenance",
      reasons: [
        {
          label: "Same maker",
          body:
            "Spun and finished in the same brass workshop that shapes the Verre chandelier — same hands, same brass."
        },
        {
          label: "Cut to your drop",
          body:
            "Drop height set at purchase. No standard length; every Lume is fitted to a specific ceiling."
        },
        {
          label: "Ages upward",
          body:
            "Unlacquered brass warms into the walls over years. The finish improves rather than fades."
        }
      ]
    }
  },
  {
    handle: "objet-sillon",
    name: "Objet — Sillon",
    category: "Sculptures",
    description:
      "A sculpted seated form in cast bronze. For the console, the mantelpiece, or the low bookshelf that needs one thing done well.",
    price: { inr: 128000, usd: 1580 },
    image: "/images/sculptures/scu7.png",
    aspect: "portrait",
    material: "Cast bronze, hand-patinated",
    body:
      "A sculpted seated form, sand-cast in bronze and patinated by hand. For the console, the mantelpiece, the low bookshelf that wants one thing done well. A year from clay maquette to finished bronze.",
    gallery: [
      "/images/sculptures/scu2.png",
      "/images/sculptures/scu3.png",
      "/images/sculptures/scu4.png",
      "/images/sculptures/scu5.png"
    ],
    details: [
      {
        label: "Material",
        body:
          "Solid bronze, sand-cast. Hand-patinated finish that deepens with handling. 22 cm tall, 3.8 kg.",
        image: "/images/materials/metal.png"
      },
      {
        label: "Craft",
        body:
          "Modelled first in clay, then cast and finished in a small foundry outside Jaipur. Each piece signed and numbered.",
        image: "/images/sculptures/scu1.png"
      }
    ],
    pullQuote: "A figure at rest — the room quiets around it.",
    lifestyleImage: "/images/sculptures/scu5.png",
    inspiration: {
      title: "One year from clay maquette to finished bronze",
      reasons: [
        {
          label: "Modelled first",
          body:
            "Sculpted in clay before it's ever cast in metal. The bronze is the final translation of a much longer process."
        },
        {
          label: "Small foundry",
          body:
            "Sand-cast and hand-patinated at a small foundry outside Jaipur. Signed and numbered on the base."
        },
        {
          label: "Appreciates with age",
          body:
            "Bronze at this scale doesn't lose value — it acquires it. The patina deepens through decades of handling."
        }
      ]
    }
  },
  {
    handle: "mirror-solis",
    name: "Mirror — Solis",
    category: "Decorative Objects",
    description:
      "A tall arched mirror framed in unlacquered brass — the kind that warms with time. For entryways and dressing rooms.",
    price: { inr: 96000, usd: 1180 },
    image: "/images/decorative-objects/deco1.png",
    aspect: "portrait",
    material: "Unlacquered brass, antique-effect glass",
    body:
      "A tall arched mirror framed in unlacquered brass, glazed with slightly warm, antique-effect glass. For entryways and dressing rooms — the piece that opens a wall without cluttering it. The brass is raw and warms into the room.",
    gallery: [
      "/images/decorative-objects/deco1.png",
      "/images/decorative-objects/deco2.png",
      "/images/decorative-objects/deco3.png",
      "/images/decorative-objects/deco4.png"
    ],
    details: [
      {
        label: "Material",
        body:
          "Hand-shaped brass frame with antique-effect glass. 170 × 85 cm; wall-mounted, cleats included.",
        image: "/images/materials/metal.png"
      },
      {
        label: "Craft",
        body:
          "Frame welded and finished by hand. Glass poured to old specification for a soft, warm reflection.",
        image: "/images/decorative-objects/deco6.png"
      }
    ],
    pullQuote: "A mirror that lengthens a room without shouting for the credit.",
    lifestyleImage: "/images/decorative-objects/deco4.png",
    inspiration: {
      title: "The mirror that sets the pitch of the house",
      reasons: [
        {
          label: "Poured glass",
          body:
            "Not float glass. Poured to a nineteenth-century specification — soft, slightly warm, with a reflection the machine cannot fake."
        },
        {
          label: "Hand-welded frame",
          body:
            "Unlacquered brass, welded and finished by hand. Warms into the walls over decades rather than chipping against them."
        },
        {
          label: "First impression",
          body:
            "First piece seen coming into the house; often the piece guests remember most. Sets the tone at the door."
        }
      ]
    }
  },
  {
    handle: "objet-vestige",
    name: "Objet — Vestige",
    category: "Vases",
    description:
      "A vessel in hand-thrown ceramic with a matte oxide glaze. Reads as sculpture on a shelf, quiet on a low table.",
    price: { inr: 74000, usd: 910 },
    image: "/images/vases/vase1.png",
    aspect: "portrait",
    material: "Hand-thrown ceramic, matte iron-oxide glaze",
    body:
      "A vessel thrown by hand and finished in a matte iron-oxide glaze. Reads as sculpture on a shelf, quiet on a low table. One of a small kiln-fired series — no two exactly alike.",
    gallery: [
      "/images/vases/vase1.png",
      "/images/vases/vase2.png",
      "/images/vases/vase3.png",
      "/images/vases/vase4.png"
    ],
    details: [
      {
        label: "Material",
        body: "Stoneware clay, matte iron-oxide glaze. 34 cm tall, 18 cm mouth.",
        image: "/images/materials/ceramic.png"
      },
      {
        label: "Craft",
        body:
          "Thrown, glazed and fired in a small studio in Auroville. Each piece signed and dated at the foot.",
        image: "/images/vases/vase6.png"
      }
    ],
    pullQuote:
      "Sculpture that also holds — the honest, ancient trick of the vessel.",
    lifestyleImage: "/images/vases/vase4.png",
    inspiration: {
      title: "Part of a series of forty. Signed at the foot.",
      reasons: [
        {
          label: "Small batch",
          body:
            "Wheel-thrown in a small Auroville studio. Fired in batches of no more than forty pieces at a time."
        },
        {
          label: "Two objects in one",
          body:
            "Reads as sculpture on the shelf. Holds a dry branch when you want a vessel. Both roles included."
        },
        {
          label: "Signed by the maker",
          body:
            "Each piece signed and dated where the foot meets the wheel. Studio provenance, not stock ceramic."
        }
      ]
    }
  },
  {
    handle: "mirror-halo",
    name: "Mirror — Halo",
    category: "Decorative Objects",
    description:
      "A circular mirror set in a slim brass rim. Reads as a drawing on the wall — a single line, a held moment of light.",
    price: { inr: 82000, usd: 1010 },
    image: "/images/decorative-objects/deco2.png",
    aspect: "portrait",
    material: "Slim brass rim, mirrored glass",
    body:
      "A circular mirror set in a slim brass rim — a single drawn line on the wall, a held moment of light. Above a console, a low sideboard, or the quiet end of a hall.",
    gallery: [
      "/images/decorative-objects/deco2.png",
      "/images/decorative-objects/deco3.png",
      "/images/decorative-objects/deco4.png",
      "/images/decorative-objects/deco5.png"
    ],
    details: [
      {
        label: "Material",
        body: "Brass rim, mirrored glass. 80 cm diameter; wall-mounted.",
        image: "/images/materials/glass.png"
      },
      {
        label: "Craft",
        body:
          "Rim spun and finished by hand. The brass is unlacquered and will warm and darken with time.",
        image: "/images/decorative-objects/deco1.png"
      }
    ],
    pullQuote: "A drawn line, held on the wall.",
    lifestyleImage: "/images/decorative-objects/deco5.png",
    inspiration: {
      title: "One drawn line. No ornament.",
      reasons: [
        {
          label: "Restrained design",
          body:
            "No filigree, no ornament, no competition. The mirror to buy when every other piece in the room is already doing its work."
        },
        {
          label: "Spun by hand",
          body:
            "Rim spun from a single strip of unlacquered brass. The whole piece is essentially one drawn line."
        },
        {
          label: "Deepens with time",
          body:
            "The brass warms into the plaster over years. The finish is the material — nothing to peel or fade."
        }
      ]
    }
  },
  {
    handle: "mirror-lune",
    name: "Mirror — Lune",
    category: "Decorative Objects",
    description:
      "A freestanding cheval mirror in blackened oak, hand-oiled. For the dressing corner, the bedroom, the quiet end of a hall.",
    price: { inr: 138000, usd: 1700 },
    image: "/images/decorative-objects/deco3.png",
    aspect: "portrait",
    material: "Blackened oak, hand-oiled",
    body:
      "A freestanding cheval mirror in solid, blackened oak — hand-oiled to a slow satin finish. For the dressing corner, the bedroom, the quiet end of a hall.",
    gallery: [
      "/images/decorative-objects/deco3.png",
      "/images/decorative-objects/deco4.png",
      "/images/decorative-objects/deco5.png",
      "/images/decorative-objects/deco6.png"
    ],
    details: [
      {
        label: "Material",
        body:
          "Solid blackened oak frame, hand-oiled. Cast brass pivots. 180 × 65 cm freestanding.",
        image: "/images/materials/wood.png"
      },
      {
        label: "Craft",
        body:
          "Frame joined by traditional mortise-and-tenon; oak sourced from a single European mill. Assembled and oiled by hand.",
        image: "/images/decorative-objects/deco2.png"
      }
    ],
    pullQuote: "The mirror you dress in front of, and no other.",
    lifestyleImage: "/images/decorative-objects/deco6.png",
    inspiration: {
      title: "Joinery built to last a century",
      reasons: [
        {
          label: "Traditional joinery",
          body:
            "Mortise-and-tenon frame — the technique that keeps three-hundred-year-old doors on their hinges. No glue, no fasteners."
        },
        {
          label: "Single-source oak",
          body:
            "Wood from a single European mill; blackened, hand-oiled to a slow satin. Cast brass pivots."
        },
        {
          label: "Freestanding",
          body:
            "Not fixed to a wall. The mirror travels with you between rooms, houses, decades."
        }
      ]
    }
  },
  {
    handle: "sculpture-monolith",
    name: "Sculpture — Monolith",
    category: "Sculptures",
    description:
      "A carved travertine column, upright and quiet. A single vertical gesture — for a corner, an entry, or the room that wants a still figure.",
    price: { inr: 148000, usd: 1820 },
    image: "/images/sculptures/scu3.png",
    aspect: "portrait",
    material: "Carved travertine, honed finish",
    body:
      "A carved travertine column, upright and quiet. A single vertical gesture — for a corner, an entry, or a room that wants one still figure. Honed to a soft, matte surface that catches low light.",
    gallery: [
      "/images/sculptures/scu3.png",
      "/images/sculptures/scu4.png",
      "/images/sculptures/scu5.png",
      "/images/sculptures/scu6.png"
    ],
    details: [
      {
        label: "Material",
        body:
          "Solid Italian travertine. Honed matte finish. 92 cm tall, 28 kg.",
        image: "/images/materials/stone.png"
      },
      {
        label: "Craft",
        body:
          "Carved from a single block by a stonemason in Tuscany, then honed and sealed by hand. Six to eight weeks per piece.",
        image: "/images/sculptures/scu2.png"
      }
    ],
    pullQuote: "A still figure, standing. The room composes itself around it.",
    lifestyleImage: "/images/sculptures/scu6.png",
    inspiration: {
      title: "Gallery-grade stone, without gallery pricing",
      reasons: [
        {
          label: "Single block",
          body:
            "Carved from one block of Italian travertine. No composite, no filler, no laminate."
        },
        {
          label: "Tuscan mason",
          body:
            "Six to eight weeks of hand work by a stonemason in Tuscany. Honed to a matte surface that never glares."
        },
        {
          label: "Permanent",
          body:
            "Twenty-eight kilos of solid stone. Doesn't move, doesn't date, doesn't lose value."
        }
      ]
    }
  },
  {
    handle: "vase-ondule",
    name: "Vase — Ondulé",
    category: "Vases",
    description:
      "A rippled stoneware vase, wheel-thrown and unglazed. For the console, the sideboard, the shelf that wants weight and quiet.",
    price: { inr: 58000, usd: 720 },
    image: "/images/vases/vase2.png",
    aspect: "portrait",
    material: "Wheel-thrown stoneware, unglazed",
    body:
      "A rippled stoneware vase, thrown on the wheel and left unglazed — the clay body reads directly, warm and matte. For the console, the sideboard, the shelf that wants weight and quiet.",
    gallery: [
      "/images/vases/vase2.png",
      "/images/vases/vase3.png",
      "/images/vases/vase4.png",
      "/images/vases/vase5.png"
    ],
    details: [
      {
        label: "Material",
        body: "Stoneware clay, unglazed. Sealed interior for water use. 42 cm tall.",
        image: "/images/materials/ceramic.png"
      },
      {
        label: "Craft",
        body:
          "Thrown, ribbed and fired in a single studio. Each ripple pulled by hand — the rhythm varies piece to piece.",
        image: "/images/vases/vase1.png"
      }
    ],
    pullQuote: "Weight and quiet — the shelf finally at rest.",
    lifestyleImage: "/images/vases/vase5.png",
    inspiration: {
      title: "Every ripple pulled by one pair of hands",
      reasons: [
        {
          label: "No mould",
          body:
            "Thrown on the wheel and ribbed entirely by hand. The rhythm shifts piece by piece — no two vessels move the same way."
        },
        {
          label: "Unglazed",
          body:
            "Left bare so the stoneware reads warm and direct. The clay itself is the finish."
        },
        {
          label: "A specific afternoon",
          body:
            "What you're buying isn't a shape. It's a particular afternoon in a particular studio, held in the surface."
        }
      ]
    }
  },
  {
    handle: "vase-obra",
    name: "Vase — Obra",
    category: "Vases",
    description:
      "A tall bronze-glazed vessel with a narrow throat. Reads sculptural empty; holds a single stem beautifully.",
    price: { inr: 96000, usd: 1180 },
    image: "/images/vases/vase3.png",
    aspect: "portrait",
    material: "Stoneware, bronze glaze",
    body:
      "A tall bronze-glazed vessel with a narrow throat. Reads sculptural when empty; holds a single stem — a branch, a long tulip — beautifully.",
    gallery: [
      "/images/vases/vase3.png",
      "/images/vases/vase4.png",
      "/images/vases/vase5.png",
      "/images/vases/vase6.png"
    ],
    details: [
      {
        label: "Material",
        body:
          "Stoneware body, layered bronze glaze fired to cone 10. 46 cm tall, 6 cm mouth.",
        image: "/images/materials/ceramic.png"
      },
      {
        label: "Craft",
        body:
          "Thrown and glazed by hand. Bronze fluctuates in the kiln — no two vessels take the light identically.",
        image: "/images/vases/vase2.png"
      }
    ],
    pullQuote: "One stem, held. The rest of the room composes itself.",
    lifestyleImage: "/images/vases/vase6.png",
    inspiration: {
      title: "The kiln decides how each one looks",
      reasons: [
        {
          label: "Unpredictable glaze",
          body:
            "Bronze glaze at cone 10 is unstable by nature. The potter loads the piece; the kiln decides the finish."
        },
        {
          label: "No duplicates",
          body:
            "No two vessels reflect light the same way. There is no way to order a matching pair."
        },
        {
          label: "Two objects in one",
          body:
            "Holds a single tall stem beautifully. Empty, it is a sculpture. Neither role requires the other."
        }
      ]
    }
  },
  {
    handle: "figurine-fauna",
    name: "Figurine — Fauna",
    category: "Figurines",
    description:
      "A small bronze animal figure, patinated by hand. For the shelf edge, the desk, the bookcase that wants a single occupant.",
    price: { inr: 42000, usd: 520 },
    image: "/images/figurines/figurine1.png",
    aspect: "portrait",
    material: "Cast bronze, hand-patinated",
    body:
      "A small bronze animal figure, cast and patinated by hand. For the shelf edge, the writing desk, the bookcase that wants one single quiet occupant.",
    gallery: [
      "/images/figurines/figurine1.png",
      "/images/figurines/figurine2.png",
      "/images/figurines/figurine3.png",
      "/images/figurines/figurine4.png"
    ],
    details: [
      {
        label: "Material",
        body: "Solid bronze, sand-cast. Hand-patinated. 14 cm.",
        image: "/images/materials/metal.png"
      },
      {
        label: "Craft",
        body:
          "Modelled from life, cast in a small foundry, patinated by hand. Each piece signed and numbered on the base.",
        image: "/images/figurines/figurine6.png"
      }
    ],
    pullQuote: "The shelf's quiet occupant — patient, undemanding, present.",
    lifestyleImage: "/images/figurines/figurine4.png",
    inspiration: {
      title: "Modelled from life. Numbered on the base.",
      reasons: [
        {
          label: "From life",
          body:
            "Sculpted from live observation, not from photographs or stock reference. The animal comes first, the object second."
        },
        {
          label: "Small foundry",
          body:
            "Sand-cast in solid bronze at a small foundry. Patinated and signed by hand."
        },
        {
          label: "Collector piece",
          body:
            "Fourteen centimetres with the provenance of a piece ten times its size. Collectible art at accessible cost."
        }
      ]
    }
  },
  {
    handle: "figurine-anima",
    name: "Figurine — Anima",
    category: "Figurines",
    description:
      "A hand-carved alabaster form — a small figure, softly modelled. Casts a low interior light when placed near a lamp.",
    price: { inr: 54000, usd: 670 },
    image: "/images/figurines/figurine2.png",
    aspect: "portrait",
    material: "Hand-carved alabaster",
    body:
      "A hand-carved alabaster form — a small figure, softly modelled. When placed near a lamp the stone catches the light from within, casting a low interior glow.",
    gallery: [
      "/images/figurines/figurine2.png",
      "/images/figurines/figurine3.png",
      "/images/figurines/figurine4.png",
      "/images/figurines/figurine5.png"
    ],
    details: [
      {
        label: "Material",
        body:
          "Solid alabaster, hand-carved and polished. Translucent under light. 18 cm.",
        image: "/images/materials/stone.png"
      },
      {
        label: "Craft",
        body:
          "Carved by a single hand from a single block. Alabaster sourced from a single quarry in Rajasthan.",
        image: "/images/figurines/figurine1.png"
      }
    ],
    pullQuote: "Stone that holds light — a small, interior sun.",
    lifestyleImage: "/images/figurines/figurine5.png",
    inspiration: {
      title: "Stone that catches light from within",
      reasons: [
        {
          label: "Rare material",
          body:
            "Rajasthani alabaster from a single quarry — dense enough to hold a shape, translucent enough to glow near a lamp."
        },
        {
          label: "One hand, one block",
          body:
            "Cut, carved and polished by a single hand from a single block of stone. Never machine-finished."
        },
        {
          label: "Interior light",
          body:
            "Placed near any lamp, the stone holds the warmth. Changes how the room reads after dark — no electricity required."
        }
      ]
    }
  },
  {
    handle: "figurine-perle",
    name: "Figurine — Perle",
    category: "Figurines",
    description:
      "A porcelain pear on a low walnut plinth. A quiet gift for a bedside, an entry table, a writing desk.",
    price: { inr: 38000, usd: 470 },
    image: "/images/figurines/figurine3.png",
    aspect: "portrait",
    material: "Hand-slipped porcelain, walnut plinth",
    body:
      "A porcelain pear rested on a low walnut plinth. A quiet gift for a bedside, an entry table, a writing desk — the object that says the room has been thought about.",
    gallery: [
      "/images/figurines/figurine3.png",
      "/images/figurines/figurine4.png",
      "/images/figurines/figurine5.png",
      "/images/figurines/figurine6.png"
    ],
    details: [
      {
        label: "Material",
        body:
          "Slip-cast porcelain, matte white glaze. Solid walnut plinth, hand-oiled. 12 cm overall.",
        image: "/images/materials/ceramic.png"
      },
      {
        label: "Craft",
        body:
          "Cast, finished and glazed by hand. Plinth turned separately and hand-fitted to each piece.",
        image: "/images/figurines/figurine2.png"
      }
    ],
    pullQuote: "The small, exact gift — a fruit that never turns.",
    lifestyleImage: "/images/figurines/figurine6.png",
    inspiration: {
      title: "A small object, considered like a large one",
      reasons: [
        {
          label: "Two materials",
          body:
            "Slip-cast porcelain paired with a hand-turned walnut plinth — two makers, two crafts, one small object."
        },
        {
          label: "Fitted piece by piece",
          body:
            "Each plinth turned separately and fitted to its pear. No two pears sit on their base exactly the same way."
        },
        {
          label: "Small enough to gift",
          body:
            "Small enough to give as a gift; considered enough to keep for decades. Both readings work."
        }
      ]
    }
  },
  {
    handle: "charger-terra",
    name: "Charger — Terra",
    category: "Tabletop",
    description:
      "A wide stoneware charger in matte oxide. Sits under the dinner plate; reads as a low sculpture the rest of the day.",
    price: { inr: 32000, usd: 400 },
    image: "/images/table-top/table1.png",
    aspect: "portrait",
    material: "Stoneware, matte iron-oxide glaze",
    body:
      "A wide stoneware charger finished in matte iron-oxide glaze. Sits beneath the dinner plate at supper; reads as a low sculpture on the sideboard the rest of the day.",
    gallery: [
      "/images/table-top/table1.png",
      "/images/table-top/table2.png",
      "/images/table-top/table3.png",
      "/images/table-top/table4.png"
    ],
    details: [
      {
        label: "Material",
        body: "Stoneware clay, matte iron-oxide glaze. 32 cm diameter. Dishwasher-safe.",
        image: "/images/materials/ceramic.png"
      },
      {
        label: "Craft",
        body:
          "Wheel-thrown and glazed in the same Auroville studio as the Vestige vessels. Signed at the foot.",
        image: "/images/table-top/table6.png"
      }
    ],
    pullQuote: "Under the plate at eight; low sculpture by ten.",
    lifestyleImage: "/images/table-top/table4.png",
    inspiration: {
      title: "China for people who don't own china",
      reasons: [
        {
          label: "Made to be used",
          body:
            "Dishwasher-safe stoneware. Meant to sit on the table, not in a cabinet behind glass."
        },
        {
          label: "Dual life",
          body:
            "Under the plate at supper. On the sideboard as low sculpture the rest of the day. Two roles, one piece."
        },
        {
          label: "Signed studio piece",
          body:
            "Wheel-thrown and signed at the foot. The provenance of a studio ceramic, at the price of dinnerware."
        }
      ]
    }
  },
  {
    handle: "carafe-verre",
    name: "Carafe — Verre",
    category: "Tabletop",
    description:
      "A hand-blown water carafe with a slightly gathered neck. For the dinner table, the desk, the bedside.",
    price: { inr: 28000, usd: 350 },
    image: "/images/table-top/table2.png",
    aspect: "portrait",
    material: "Hand-blown clear glass",
    body:
      "A hand-blown water carafe with a slightly gathered neck. For the dinner table, the writing desk, the bedside — the piece that makes even water feel considered.",
    gallery: [
      "/images/table-top/table2.png",
      "/images/table-top/table3.png",
      "/images/table-top/table4.png",
      "/images/table-top/table5.png"
    ],
    details: [
      {
        label: "Material",
        body:
          "Hand-blown clear glass, 1L capacity. Sold as a piece; a matching tumbler set is available separately.",
        image: "/images/materials/glass.png"
      },
      {
        label: "Craft",
        body:
          "Blown by the same glassblowers who shape the Verre chandelier. Small bubbles and slight asymmetries are inherent to the process.",
        image: "/images/table-top/table1.png"
      }
    ],
    pullQuote: "Even water, held with intent.",
    lifestyleImage: "/images/table-top/table5.png",
    inspiration: {
      title: "The everyday piece, from the same hands as the chandelier",
      reasons: [
        {
          label: "Same makers",
          body:
            "Blown by the same glassblowers who shape the Verre chandelier. Same studio, same lungs, same rods."
        },
        {
          label: "No duplicates",
          body:
            "Small bubbles and slight asymmetries are inherent to the process. No two carafes are identical."
        },
        {
          label: "A daily ritual",
          body:
            "Turns pouring water — an act you'll repeat thousands of times — into something worth doing well."
        }
      ]
    }
  },
  {
    handle: "runner-bruma",
    name: "Runner — Bruma",
    category: "Tabletop",
    description:
      "A long linen runner in undyed flax, hand-hemmed. Softens the wood, holds the plates, wears in with use.",
    price: { inr: 24000, usd: 300 },
    image: "/images/table-top/table3.png",
    aspect: "portrait",
    material: "Undyed European flax, hand-hemmed",
    body:
      "A long linen runner in undyed flax, hand-hemmed at both ends. Softens the wood, holds the plates, wears in with use — the older it gets, the better it looks.",
    gallery: [
      "/images/table-top/table3.png",
      "/images/table-top/table4.png",
      "/images/table-top/table5.png",
      "/images/table-top/table6.png"
    ],
    details: [
      {
        label: "Material",
        body:
          "100% European flax, undyed. 240 × 45 cm. Machine-washable cold; line-dry.",
        image: "/images/materials/wood.png"
      },
      {
        label: "Craft",
        body:
          "Woven in a small Belgian mill and hand-hemmed. The flax softens and pales with each wash.",
        image: "/images/table-top/table2.png"
      }
    ],
    pullQuote: "Softens the wood, holds the plates, wears in like a favourite shirt.",
    lifestyleImage: "/images/table-top/table6.png",
    inspiration: {
      title: "Better after fifty washes than the day it arrived",
      reasons: [
        {
          label: "Undyed flax",
          body:
            "One hundred percent European flax. No dye to fade, no synthetics blended in for stretch."
        },
        {
          label: "Single mill",
          body:
            "Woven at one small Belgian mill and hand-hemmed at both ends. Traceable end to end."
        },
        {
          label: "Ages upward",
          body:
            "Most textiles cost more when new. This one is at its best after fifty washes. Rare in linen; rarer elsewhere."
        }
      ]
    }
  },
  {
    handle: "sconce-fumo",
    name: "Sconce — Fumo",
    category: "Lighting",
    description:
      "A brass wall sconce with a small hand-sewn linen shade. Warm to sit beside, quiet on the wall.",
    price: { inr: 46000, usd: 570 },
    image: "/images/lighting/light4.png",
    aspect: "portrait",
    material: "Turned brass, linen shade",
    body:
      "A brass wall sconce with a small hand-sewn linen shade. Hung on either side of a bed, a mantel, or a corridor — warm to sit beside, quiet on the wall."
  },
  {
    handle: "floor-lamp-colonne",
    name: "Floor Lamp — Colonne",
    category: "Lighting",
    description:
      "A tall column lamp in unlacquered brass. A single warm light for a reading corner or the edge of a sofa.",
    price: { inr: 118000, usd: 1450 },
    image: "/images/lighting/light5.png",
    aspect: "portrait",
    material: "Unlacquered brass, silk shade",
    body:
      "A slim brass column with a hand-sewn silk shade. Placed at the end of a sofa or beside a reading chair — one warm light, sized to last a lifetime."
  },
  {
    handle: "chandelier-prisme",
    name: "Chandelier — Prisme",
    category: "Lighting",
    description:
      "A faceted glass chandelier on a blackened bronze frame. For the low-ceilinged room that still wants presence.",
    price: { inr: 268000, usd: 3300 },
    image: "/images/lighting/light6.png",
    aspect: "portrait",
    material: "Cut glass, blackened bronze",
    body:
      "A compact chandelier of faceted glass panels on a blackened bronze frame. Sized for a lower ceiling — the dining nook, the entry, the small hall that still wants presence."
  },
  {
    handle: "sculpture-vela",
    name: "Sculpture — Vela",
    category: "Sculptures",
    description:
      "A leaning travertine form, softly weathered. For an entry, a bay window, a corner that wants a held pause.",
    price: { inr: 174000, usd: 2150 },
    image: "/images/sculptures/scu4.png",
    aspect: "portrait",
    material: "Carved travertine, weathered finish",
    body:
      "A leaning travertine form, softly weathered by hand. For an entry, a bay window, a corner that wants a held pause — the piece the light finds first each morning."
  },
  {
    handle: "objet-rive",
    name: "Objet — Rive",
    category: "Sculptures",
    description:
      "A low bronze form, patinated to a soft green. For the coffee table, the low shelf, the object that wants weight.",
    price: { inr: 112000, usd: 1380 },
    image: "/images/sculptures/scu5.png",
    aspect: "portrait",
    material: "Cast bronze, verdigris patina",
    body:
      "A low, curled bronze form, cast solid and finished with a hand-applied verdigris patina. Small enough to hold; heavy enough to anchor a shelf or a low table."
  },
  {
    handle: "sculpture-passage",
    name: "Sculpture — Passage",
    category: "Sculptures",
    description:
      "A double-arched walnut form in dark oil. Reads as one line seen from either side of a room.",
    price: { inr: 132000, usd: 1620 },
    image: "/images/sculptures/scu6.png",
    aspect: "portrait",
    material: "Hand-carved walnut, dark oil",
    body:
      "A double-arched walnut sculpture carved from a single billet and finished in a dark, hand-rubbed oil. Reads as one continuous line from either side of the room."
  },
  {
    handle: "tray-perche",
    name: "Tray — Perche",
    category: "Decorative Objects",
    description:
      "A long unlacquered-brass tray for the entry console. Holds keys, a bowl, the small things the house needs.",
    price: { inr: 42000, usd: 520 },
    image: "/images/decorative-objects/deco4.png",
    aspect: "portrait",
    material: "Hand-turned unlacquered brass",
    body:
      "A long brass tray, hand-turned and left unlacquered. Sits on the entry console; holds keys, a bowl, a folded letter — the small things the house needs at hand."
  },
  {
    handle: "bowl-onda",
    name: "Bowl — Onda",
    category: "Decorative Objects",
    description:
      "A shallow stone bowl in soft grey travertine. For the low table, the sideboard, the shelf that wants one form.",
    price: { inr: 58000, usd: 720 },
    image: "/images/decorative-objects/deco5.png",
    aspect: "portrait",
    material: "Hand-carved travertine",
    body:
      "A shallow bowl carved from a single piece of soft grey travertine, honed to a matte finish. For the low table, the sideboard, the shelf that wants one form."
  },
  {
    handle: "frame-silhouette",
    name: "Frame — Silhouette",
    category: "Decorative Objects",
    description:
      "A slim blackened-oak frame, hand-mitred. For a single print, a photograph, a piece worth setting apart.",
    price: { inr: 36000, usd: 440 },
    image: "/images/decorative-objects/deco6.png",
    aspect: "portrait",
    material: "Blackened oak, museum glass",
    body:
      "A slim blackened-oak frame, hand-mitred and finished in a soft satin oil. For a single print, a photograph, a piece worth setting apart on the wall."
  },
  {
    handle: "vase-colline",
    name: "Vase — Colline",
    category: "Vases",
    description:
      "A rounded stoneware vase in a warm ochre glaze. Wide enough for branches, quiet enough to stand empty.",
    price: { inr: 62000, usd: 770 },
    image: "/images/vases/vase4.png",
    aspect: "portrait",
    material: "Stoneware, ochre glaze",
    body:
      "A rounded stoneware vase finished in a warm, hand-mixed ochre glaze. Wide enough for a bough of leaves; quiet enough to stand alone on a low table."
  },
  {
    handle: "vessel-argile",
    name: "Vessel — Argile",
    category: "Vases",
    description:
      "A hand-pinched terracotta vessel, unglazed. The clay reads warm and matte — a shelf object first, a vase second.",
    price: { inr: 44000, usd: 540 },
    image: "/images/vases/vase5.png",
    aspect: "portrait",
    material: "Hand-pinched terracotta, unglazed",
    body:
      "A hand-pinched terracotta vessel, left unglazed so the clay reads directly. A shelf object first, a vase second — the shape carries even when empty."
  },
  {
    handle: "vase-sable",
    name: "Vase — Sable",
    category: "Vases",
    description:
      "A tall glass vase in a soft sand tint. Reads sculptural in daylight, holds a single tall stem beautifully.",
    price: { inr: 78000, usd: 960 },
    image: "/images/vases/vase6.png",
    aspect: "portrait",
    material: "Hand-blown tinted glass",
    body:
      "A tall glass vase, hand-blown with a soft sand tint pulled through the wall. Reads sculptural in daylight; holds a single tall stem — a branch, a lily — beautifully."
  },
  {
    handle: "figurine-souche",
    name: "Figurine — Souche",
    category: "Figurines",
    description:
      "A small carved-walnut animal on a low base. A quiet occupant for the desk, the shelf, the entry.",
    price: { inr: 34000, usd: 420 },
    image: "/images/figurines/figurine4.png",
    aspect: "portrait",
    material: "Hand-carved walnut",
    body:
      "A small walnut animal, carved from a single block and set on a low base. A quiet occupant for the desk, the shelf, the entry — the object that acknowledges the room."
  },
  {
    handle: "figurine-echo",
    name: "Figurine — Écho",
    category: "Figurines",
    description:
      "A pair of small porcelain forms — sold together, sit together. A study in near-symmetry.",
    price: { inr: 46000, usd: 570 },
    image: "/images/figurines/figurine5.png",
    aspect: "portrait",
    material: "Slip-cast porcelain, matte white",
    body:
      "A pair of small porcelain forms — sold together, meant to sit together. A study in near-symmetry; each piece cast slightly differently from the other."
  },
  {
    handle: "figurine-petite",
    name: "Figurine — Petite",
    category: "Figurines",
    description:
      "A miniature bronze form on a marble plinth. Small enough for a bedside; considered enough to keep.",
    price: { inr: 48000, usd: 590 },
    image: "/images/figurines/figurine6.png",
    aspect: "portrait",
    material: "Cast bronze, marble plinth",
    body:
      "A miniature bronze form set on a small marble plinth. Small enough for a bedside table; considered enough to be a piece that stays with a person for years."
  },
  {
    handle: "salt-cellar-sel",
    name: "Salt Cellar — Sel",
    category: "Tabletop",
    description:
      "A small pinch-pot in matte white porcelain. For the dinner table, for the kitchen counter, for close at hand.",
    price: { inr: 12000, usd: 150 },
    image: "/images/table-top/table4.png",
    aspect: "portrait",
    material: "Hand-thrown porcelain, matte glaze",
    body:
      "A small hand-thrown porcelain pinch-pot for salt. Left on the table between meals; kept beside the stove the rest of the time — the small vessel the kitchen keeps returning to."
  },
  {
    handle: "pitcher-cara",
    name: "Pitcher — Cara",
    category: "Tabletop",
    description:
      "A stoneware pitcher in matte cream. Wide-mouthed for water, milk, a bough of herbs in warmer months.",
    price: { inr: 26000, usd: 320 },
    image: "/images/table-top/table5.png",
    aspect: "portrait",
    material: "Wheel-thrown stoneware, matte cream glaze",
    body:
      "A wide-mouthed stoneware pitcher, wheel-thrown and finished in a soft matte cream glaze. Water at supper, milk at breakfast, a small bough of herbs the rest of the time."
  },
  {
    handle: "board-planche",
    name: "Board — Planche",
    category: "Tabletop",
    description:
      "A long walnut serving board, hand-oiled. For bread, cheese, the long lunch that runs into afternoon.",
    price: { inr: 22000, usd: 270 },
    image: "/images/table-top/table6.png",
    aspect: "portrait",
    material: "Solid walnut, hand-oiled",
    body:
      "A long walnut serving board finished with a slow, hand-rubbed oil. For bread and cheese, for the long lunch that runs into the afternoon; the wood deepens with each use."
  }
];

// Editorial curation layer — reorderable seasonal picks. A given category can
// appear in more than one edit; the edit page rotates through products in
// that category so each edit shows a different piece.
export type EditSelection = {
  slug: string;
  number: string;
  title: string;
  intro: string;
  categories: Product["category"][];
};

export const EDITS: EditSelection[] = [
  {
    slug: "statement",
    number: "01",
    title: "Statement pieces",
    intro:
      "The pieces that command a room — a chandelier, a mirror, a sculpted form scaled to be seen.",
    categories: ["Lighting", "Sculptures", "Decorative Objects"]
  },
  {
    slug: "new",
    number: "02",
    title: "New pieces",
    intro:
      "This season's new work — recent arrivals from the studio floor.",
    categories: ["Lighting", "Sculptures", "Vases"]
  },
  {
    slug: "limited",
    number: "03",
    title: "Limited pieces",
    intro:
      "Small editions and one-of-one commissions — signed, numbered, brief.",
    categories: ["Lighting", "Sculptures"]
  },
  {
    slug: "designer",
    number: "04",
    title: "Designer pieces",
    intro:
      "Signature works from the studio — the pieces the house is known for.",
    categories: ["Sculptures", "Lighting", "Decorative Objects"]
  }
];

export const JOURNAL_ENTRIES = [
  {
    slug: "on-the-brass-lamp",
    kicker: "Guide",
    title: "On the brass lamp",
    excerpt:
      "Which brass lamp fits which reading chair — scale, arm reach, and shade height.",
    image: "/images/lighting/light1.png"
  },
  {
    slug: "on-the-mantel-object",
    kicker: "Guide",
    title: "On the mantel object",
    excerpt:
      "Choosing one sculptural piece for the mantel — proportion, weight, and the shadow it casts at dusk.",
    image: "/images/sculptures/scu1.png"
  },
  {
    slug: "at-the-ceramics-kiln",
    kicker: "Studio",
    title: "At the ceramics kiln",
    excerpt:
      "A morning inside the small studio where our vessels are thrown, glazed and fired.",
    image: "/images/vases/vase1.png"
  },
  {
    slug: "on-the-wall-piece",
    kicker: "Guide",
    title: "On the wall piece",
    excerpt:
      "How to choose one sculptural piece that anchors the wall — without competing with the room below it.",
    image: "/images/sculptures/scu2.png"
  },
  {
    slug: "a-house-in-the-hills",
    kicker: "Interior",
    title: "A house in the hills",
    excerpt:
      "The Verre chandelier at rest — a long lens on the room that first commissioned it.",
    image: "/images/lighting/light2.png"
  },
  {
    slug: "on-the-dining-chandelier",
    kicker: "Guide",
    title: "On the dining chandelier",
    excerpt:
      "Choosing a chandelier for the dining table — length, drop height, and the light it should give at eight.",
    image: "/images/lighting/light3.png"
  },
  {
    slug: "the-case-for-unlacquered-brass",
    kicker: "Craft",
    title: "The case for unlacquered brass",
    excerpt:
      "On the finish that ages with the room instead of resisting it — and why we choose it every time.",
    image: "/images/table-top/table1.png"
  },
  {
    slug: "the-making-of-the-sillon",
    kicker: "Object",
    title: "The making of the Sillon",
    excerpt:
      "From clay maquette to cast bronze — the year-long path of a single sculpted seat.",
    image: "/images/sculptures/scu3.png"
  },
  {
    slug: "in-the-workshop-with-louis",
    kicker: "Conversation",
    title: "In the workshop with Louis",
    excerpt:
      "A morning with the glassblower who shapes every leaf of the Verre chandelier by hand.",
    image: "/images/vases/vase2.png"
  }
];
