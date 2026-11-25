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
    | "Vases";
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
// Luxe Exclusive pieces live on their own route — detect them by handle and
// return /exclusive/<slug> so cart links don't 404 against the catalogue.
export function productHref(product: Product): string {
  if (EXCLUSIVE_PIECES.some((e) => e.slug === product.handle)) {
    return `/exclusive/${product.handle}`;
  }
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
    handle: "sculpture-monogramme",
    name: "Sculpture — Monogramme",
    category: "Sculptures",
    description:
      "An everyday object carried in Carrara marble. MONOGRAMME reinterprets the carriall as a sculpted form — quilted motifs worked by hand into the stone, handles doubling into a single relaxed knot. Luxury rendered as study.",
    price: { inr: 184000, usd: 2260 },
    image: "/Edit/Bag/Bag-front.png",
    aspect: "portrait",
    material: "Hand-carved Carrara marble",
    body:
      "MONOGRAMME is a sculptural meditation on the everyday object. A carriall, pulled out of leather and into stone — the quilted repeats, the stitched seam, the looped handles all carved from a single block of white Carrara. Scaled for the console, the mantel, the shelf that asks for one considered object rather than many.",
    gallery: [
      "/Edit/Bag/Bag-front.png",
      "/Edit/Bag/Bag1.png",
      "/Edit/Bag/Bag3.png",
      "/Edit/Bag/Bag-left.png",
      "/Edit/Bag/Bag-right.png",
      "/Edit/Bag/Bag-back.png",
      "/Edit/Bag/Bag5.png",

    ],
    details: [
      {
        label: "Material",
        body:
          "Hand-carved Carrara marble, finished to a soft silk polish. Dimensions: 28 × 14 × 36 cm (11 × 5.5 × 14.2 in). Weight: 6.8 kg / 15 lb.",
        image: "/images/materials/marble.png"
      },
      {
        label: "Craft",
        body:
          "Carved from a single block of Carrara by hand. The quilted motif is incised into the surface rather than applied; the handles are shaped from the same stone and knotted in a single uninterrupted gesture. Each piece bears its own pattern of veining — no two Monogramme are alike.",
        image: "/Edit/Bag/Bag-craft.png"
      }
    ],
    pullQuote: "The everyday object, elevated to study — a carriall carved in marble.",
    lifestyleImage: "/Edit/Bag/Bag-presence.png",
    inspiration: {
      title: "An ordinary object, elevated to sculpture",
      reasons: [
        {
          label: "The familiar in stone",
          body:
            "A carriall rendered in marble — the softest everyday object translated into its most permanent material. The piece asks the room to look twice at what it already knew."
        },
        {
          label: "Carved as one",
          body:
            "Body, quilted motif and knotted handles are shaped from a single block of Carrara. The seam and the stitch are incised into the stone — no applied parts, no joinery."
        },
        {
          label: "Veined by the quarry",
          body:
            "Natural grey veining travels across each piece in its own pattern. The quarry writes the finish; no two Monogramme carry the same drift of grey through the stone."
        }
      ]
    }
  },
  {
    handle: "sculpture-couronne",
    name: "Sculpture — Couronne",
    category: "Sculptures",
    description:
      "A sculpted bodice crowned by rising peaks, carved in warm bronze-toned stone. The gathered folds hold light like a figure caught turning. Set on a block of dark marble as plinth.",
    price: { inr: 212000, usd: 2600 },
    image: "/Edit/Dress/dress1.png",
    aspect: "portrait",
    material: "Carved stone with aged bronze patina, dark marble plinth",
    body:
      "COURONNE translates a draped garment into carved stone — the deep vertical folds pulled upward into a sculpted collar, the surface finished in a warm aged bronze. A figure present and absent at once; the piece reads as a torso gathered, a presence held in the moment before it moves.",
    gallery: ["/Edit/Dress/dress1.png",
              "/Edit/Dress/Dress2.png",
              "/Edit/Dress/Dress4.png",
              "/Edit/Dress/Dress3.png"
    ],
    details: [
      {
        label: "Material",
        body:
          "Carved stone with an aged bronze patina, mounted directly onto a block of dark marble as plinth. Dimensions: 36 × 24 × 54 cm (14.2 × 9.4 × 21.3 in). Weight: 12.4 kg / 27.3 lb.",
        image: "/images/materials/metal.png"
      },
      {
        label: "Craft",
        body:
          "The folds are worked into the stone by hand, each pleat carried from the base of the skirt up into the crowned collar. The bronze patina is layered by hand — warm gold through to deep umber — so each piece carries its own weathered character.",
        image: "/Edit/Dress/Dress-presence.png"
      }
    ],
    pullQuote: "A figure held in the moment before it turns.",
    lifestyleImage: "/Edit/Dress/Dress-presence.png",
    inspiration: {
      title: "A garment in stone, a figure in gesture",
      reasons: [
        {
          label: "Drapery, carved",
          body:
            "Deep vertical folds carried from the hem to the crowned collar — every pleat worked by hand into solid stone. The piece holds the gesture of fabric in a material that cannot move."
        },
        {
          label: "Warmth through patina",
          body:
            "The bronze finish is layered by hand through warm gold and deep umber. The surface warms in evening light; no two Couronne catch a lamp the same way."
        },
        {
          label: "Weight of a figure",
          body:
            "At over twelve kilos on a block of dark marble, Couronne commands a mantel or an entry console. Present when the room is empty — the first thing a visitor meets."
        }
      ]
    }
  },
  {
    handle: "sculpture-silhouette",
    name: "Sculpture — Silhouette",
    category: "Sculptures",
    description:
      "A dress form carried in dark marble — the fluted skirt opening below the bodice, raised on a brass stem into a block of veined charcoal stone. Composed, present, deliberately faceless.",
    price: { inr: 196000, usd: 2410 },
    image: "/Edit/Girl/girl.png",
    aspect: "portrait",
    material: "Hand-carved dark marble, brass stem, marble plinth",
    body:
      "SILHOUETTE is a figure reduced to its clearest line — a torso, a cinched waist, a petalled skirt opening below. Carved in dark marble and raised on a slim brass stem. The piece is quiet, but a room reorganises itself around it; the absence of a face lets the viewer bring their own.",
    gallery: ["/Edit/Girl/girl.png"],
    details: [
      {
        label: "Material",
        body:
          "Hand-carved dark marble with brass stem, mounted on a veined charcoal marble plinth. Dimensions: 18 × 18 × 56 cm (7.1 × 7.1 × 22 in). Weight: 8.6 kg / 19 lb.",
        image: "/images/materials/marble.png"
      },
      {
        label: "Craft",
        body:
          "The torso is carved from a single block of dark marble; the fluted skirt is worked petal by petal into the lower form. A single brass stem raises the figure above the plinth — a quiet lift that gives the piece its sense of poise.",
        image: "/Edit/Girl/girl-presence.png"
      }
    ],
    pullQuote: "A figure present, a figure absent — the room completes the face.",
    lifestyleImage: "/Edit/Girl/girl-presence.png",
    inspiration: {
      title: "The figure, reduced to its clearest line",
      reasons: [
        {
          label: "Faceless on purpose",
          body:
            "No portrait, no gaze, no gesture. The absence is the invitation — the viewer brings the face. Every room reads Silhouette slightly differently."
        },
        {
          label: "Petalled skirt",
          body:
            "The fluted lower form is carved petal by petal into the dark stone. From across the room it reads as a single bell; up close, each petal takes the light on its own curve."
        },
        {
          label: "Lifted, not planted",
          body:
            "A single brass stem raises the torso above the plinth. The piece hovers rather than sits — a quiet composure that lets the figure feel almost weightless."
        }
      ]
    }
  },
  {
    handle: "sculpture-feline",
    name: "Sculpture — Féline",
    category: "Sculptures",
    description:
      "An abstracted feline in white Carrara marble — ears carried high, body curling into a single stem. Mounted on a block of veined marble. Ancient in reference, modern in gesture.",
    price: { inr: 224000, usd: 2740 },
    image: "/Edit/Horse/Horse-front.png",
    aspect: "portrait",
    material: "Hand-carved Carrara marble, brass mount, marble plinth",
    body:
      "FÉLINE carries the watchful quiet of an animal held still. Carved from a single block of Carrara, the body is pared back to its essential curve — the head alert, the ears tipped forward, the lower form resolving into a single sinuous line that meets the brass. Reads as a modern piece from one angle, as a temple cat from another.",
    gallery: [
      "/Edit/Horse/Horse-front.png",
      "/Edit/Horse/Horse-left.png",
      "/Edit/Horse/Horse4.png",
      "/Edit/Horse/Horse-45l.png",
      "/Edit/Horse/Horse5.png",
      "/Edit/Horse/Horse-back.png",
      "/Edit/Horse/Horse6.png",
      "/Edit/Horse/Horse7.png"
     
    ],
    details: [
      {
        label: "Material",
        body:
          "Hand-carved Carrara marble, brass mount, veined marble plinth. Dimensions: 16 × 16 × 58 cm (6.3 × 6.3 × 22.8 in). Weight: 9.2 kg / 20.3 lb.",
        image: "/images/materials/marble.png"
      },
      {
        label: "Craft",
        body:
          "Carved from a single block of Carrara by hand. The ears, the brow and the sweep of the body are the maker's decisions in the moment — no model, no cast. Each piece bears its own fall of veining through the stone.",
        image: "/Edit/Horse/Horse-craft.png"
      }
    ],
    pullQuote: "The watchful quiet of a carved animal — temple in reference, modern in gesture.",
    lifestyleImage: "/Edit/Horse/Horse-presence.png",
    inspiration: {
      title: "Ancient in reference, modern in gesture",
      reasons: [
        {
          label: "A single line",
          body:
            "The body resolves into one uninterrupted curve from the ears to the brass — the whole animal expressed as a gesture rather than a figure. A silhouette the eye follows in one pass."
        },
        {
          label: "Different from every side",
          body:
            "From the front, the gaze. From the back, the arch of the shoulder. From the side, the silhouette of a seated cat. The piece reads differently from each angle — a true study in the round."
        },
        {
          label: "Carrara, not polished away",
          body:
            "The marble is finished to a soft silk — the grey veining left visible, not sanded flat. The quarry writes the final character of each piece."
        }
      ]
    }
  },

  {
    handle: "sculpture-ardor",
    name: "Sculpture — Ardor",
    category: "Sculptures",
    description:
      "A rare sculpture captures strength and momentum. Its sweeping horns and grounded stance convey an unmistakable sense of power and resolve.",
    price: { inr: 96000, usd: 1180 },
    image: "/images/sculptures/Ardor/Ardor-first.webp",
    aspect: "portrait",
    material: "Metal, textured bronze finish",
    body:
      "Defined by its richly textured surface and sculptural weight, the piece captures the bull's muscularity with striking depth. Sweeping horns, a lowered stance and pronounced contours heighten its sense of movement, while the nuanced bronze finish accentuates the character of the piece.",
    gallery: [
      "/images/sculptures/Ardor/Ardor2.webp",
       "/images/sculptures/Ardor/Ardor1.webp",
      "/images/sculptures/Ardor/Ardor3.webp",
      "/images/sculptures/Ardor/Ardor5.webp",
      "/images/sculptures/Ardor/Ardor0.webp"
    ],
    details: [
      {
        label: "Material",
        body:
          "Cast metal with a textured bronze finish. Weight: 1.49 kg / 3.3 lb.",
        image: "/images/materials/metal.png"
      },
      {
        label: "Craft",
        body:
          "Cast in metal and hand-finished in a textured bronze patina. The surface catches light differently at every angle; every casting bears its own tonal variations — no two Ardor read exactly the same way.",
        image: "/images/sculptures/Ardor/Ardor-craft.webp"
      }
    ],
    pullQuote: "Momentum captured in bronze — a study in strength and resolve.",
    lifestyleImage: "/images/sculptures/Ardor/The-Ardor1.webp",
    inspiration: {
      title: "Strength and momentum, held in bronze",
      reasons: [
        {
          label: "Muscularity in bronze",
          body:
            "The textured bronze captures the bull's musculature with striking depth. Sculptural weight rather than decoration — the piece reads as a study in animal form."
        },
        {
          label: "Movement, held still",
          body:
            "Sweeping horns and a lowered stance suggest a moment of gathered force. The sculpture is at rest, but never passive — the room reads it first."
        },
        {
          label: "Character in every contour",
          body:
            "Pronounced contours and the nuanced bronze finish give ARDOR its individual presence. No two castings catch the light the same way."
        }
      ]
    }
  },

  {
    handle: "sculpture-cadence",
    name: "Sculpture — Cadence",
    category: "Sculptures",
    description:
      "A study in rhythm, form and restraint. Sculpted in textured wood, CADENCE pairs a bowed silhouette with a deeply textured black finish, carrying a quiet yet commanding presence.",
    price: { inr: 128000, usd: 1580 },
    image: "/images/sculptures/Cadence/Cadence1.webp",
    aspect: "portrait",
    material: "Textured wood, textured black finish",
    body:
      "Defined by its graphic equine silhouette, CADENCE balances the solidity of carved wood with the visual lightness of slender metal supports. The raised composition gives the sculpture an architectural quality, while the textured surface brings depth to its monochromatic form.",
    gallery: [
      
      "/images/sculptures/Cadence/Cadence1.webp",
      "/images/sculptures/Cadence/Cadence2.webp",
      "/images/sculptures/Cadence/Cadence5.webp",
      "/images/sculptures/Cadence/Cadence4.webp",
      "/images/sculptures/Cadence/Cadence3.webp",
      "/images/sculptures/Cadence/Cadence6.webp",
      "/images/sculptures/Cadence/Cadence7.webp",
      "/images/sculptures/Cadence/Cadence8.webp",
      "/images/sculptures/Cadence/Cadence9.webp"
    ],
    details: [
      {
        label: "Material",
        body:
          "Textured wood with a textured black finish. Dimensions: 44 × 9 × 43 cm (17.3 × 3.5 × 16.9 in). Weight: 4.0 kg / 8.7 lb.",
        image: "/images/materials/wood.png"
      },
      {
        label: "Craft",
        body:
          "Hand-carved from solid wood, the equine silhouette shaped by successive cuts. The textured black finish is worked into the surface by hand — deepening the grain rather than covering it. Signed at the base.",
        image: "/images/sculptures/Cadence/cadence-craft.webp"
      }
    ],
    pullQuote: "Rhythm and restraint, carved in wood.",
    lifestyleImage: "/images/sculptures/Cadence/candecehover.webp",
    inspiration: {
      title: "A study in rhythm, form and restraint",
      reasons: [
        {
          label: "Carved by hand",
          body:
            "Shaped from solid wood by successive cuts. The textured black finish deepens the grain rather than covering it — each piece bears its own pattern of light."
        },
        {
          label: "Solidity meets lightness",
          body:
            "Substantial carved wood set on slender metal supports. The pairing lets the piece hold weight while reading as though it hovers."
        },
        {
          label: "Bowed, not bent",
          body:
            "The equine silhouette curves gently forward — a moment of restraint held still. Quiet in expression, commanding in presence."
        }
      ]
    }
  },
  {
    handle: "vase-auren",
    name: "Vase — Auren",
    category: "Vases",
    description:
      "A sculptural vase defined by sweeping vertical contours and a dramatic petal-like crown. AUREN is a study of scale and texture, with a quiet presence.",
    price: { inr: 74000, usd: 910 },
    image: "/images/vases/Auren/Vase-Auren1.webp",
    aspect: "portrait",
    material: "Ceramic, textured grey glaze",
    body:
      "A substantial ceramic vase defined by its broad proportions and sculptural, foliage-inspired silhouette. Deep vertical ridges travel across the surface into curved, rising edges, giving AUREN a distinct architectural character.",
    gallery: [
      "/images/vases/Auren/Vase-Auren1.webp",
      "/images/vases/Auren/Auren2.webp",
      "/images/vases/Auren/Auren3.webp",
      "/images/vases/Auren/Auren4.webp"
    ],
    details: [
      {
        label: "Material",
        body:
          "Ceramic with a textured grey glaze. Dimensions: 27 × 27 × 40 cm (10.6 × 10.6 × 15.7 in). Weight: 3.78 kg / 8.33 lb.",
        image: "/images/materials/ceramic.png"
      },
      {
        label: "Craft",
        body:
          "Thrown, glazed and fired in a small studio in Auroville. Each piece signed and dated at the foot.",
        image: "/images/vases/Auren/Auren-Craft.webp"
      }
    ],
    pullQuote:
      "Sculpture that also holds — the honest, ancient trick of the vessel.",
    lifestyleImage: "/images/vases/Auren/Vase-auren-presence.webp",
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
    handle: "vase-rivage",
    name: "Vase — Rivage",
    category: "Vases",
    description:
      "A sculptural ceramic form where colour moves like an abstract landscape. Sweeps of mineral blue, ivory, charcoal and muted rust travel across its broad silhouette, giving the piece the presence of a painted canvas.",
    price: { inr: 82000, usd: 1010 },
    image: "/images/vases/Vase-rivage/Rivage1.webp",
    aspect: "portrait",
    material: "Premium ceramic, hand-painted multitone finish",
    body:
      "RIVAGE transforms a vessel into an art object. Its generous proportions, tactile surface and expressive composition allow it to stand confidently on its own — commanding attention without excess.",
    gallery: [
      "/images/vases/Vase-rivage/Rivage1.webp",
      "/images/vases/Vase-rivage/Rivage2.webp",
      "/images/vases/Vase-rivage/Rivage3.webp",
      "/images/vases/Vase-rivage/Rivage4.webp"
      
    ],
    details: [
      {
        label: "Material",
        body:
          "Premium ceramic. Dimensions: 41 × 11 × 35 cm (16.1 × 4.3 × 13.8 in). Weight: 3.413 kg / 7.52 lb.",
        image: "/images/materials/ceramic.png"
      },
      {
        label: "Craft",
        body:
          "Hand-painted and hand-textured with a coarse, tactile finish and expressive multitone brushwork. Each piece bears its own composition — no two Rivages are alike.",
        image: "/images/vases/Vase-rivage/Rivage-craft.webp"
      }
    ],
    pullQuote: "Colour moves across the surface like an abstract landscape.",
    lifestyleImage: "/images/vases/Vase-rivage/Rivage-presence.webp",
    inspiration: {
      title: "A vessel transformed into a canvas",
      reasons: [
        {
          label: "Mediterranean coast",
          body:
            "Inspired by the Mediterranean coast of Spain — deep blue waters, sun-washed stone and earthy shores. The palette isn't decorative; it's referential."
        },
        {
          label: "Hand-painted, hand-textured",
          body:
            "Every sweep of colour is applied by hand; the coarse surface texture is worked in during shaping. Each piece bears its own composition — no two Rivages are alike."
        },
        {
          label: "Vessel as art object",
          body:
            "Generous proportions and expressive brushwork let RIVAGE stand alone. It reads as a ceramic form first, a vase second — a canvas on a shelf, not a container."
        }
      ]
    }
  },
  {
    handle: "vase-onde",
    name: "Vase — Onde",
    category: "Vases",
    description:
      "An open porcelain form with a fluid, irregular silhouette. Misty grey markings move across its ivory surface, while fine gold lines trace the rim and descend through the body.",
    price: { inr: 72000, usd: 890 },
    image: "/images/vases/Onde/Onde-1.webp",
    aspect: "portrait",
    material: "Porcelain, grey marbling with gold detailing",
    body:
      "Onde means \"wave\" in French. The piece evokes France's Atlantic shoreline: water moving over pale stone, with a trace of gold in the last light. The glossy interior catches light within each curve.",
    gallery: [
      "/images/vases/Onde/06.webp",
      "/images/vases/Onde/Onde5.webp",
      "/images/vases/Onde/Onde3.webp",
      "/images/vases/Onde/Onde4.webp",
      "/images/vases/Onde/Onde-2.webp"
    ],
    details: [
      {
        label: "Material",
        body:
          "Porcelain with grey marbling, a smooth lacquered sheen and gold detailing. Dimensions: 52 × 29 × 26 cm (20.5 × 11.4 × 10.2 in). Weight: 3.841 kg / 8.47 lb.",
        image: "/images/materials/marble.png"
      },
      {
        label: "Craft",
        body:
          "The grey marbling is worked into the porcelain by hand — every piece bears its own pattern of drift. Fine gold lines are applied last, tracing the rim and descending through the body.",
        image: "/images/vases/Onde/Vase-onde-craft.webp"
      }
    ],
    pullQuote:
      "Water moving over pale stone, with a trace of gold in the last light.",
    lifestyleImage: "/images/vases/Onde/Vase-onde-presence.webp",
    inspiration: {
      title: "A wave, held in porcelain",
      reasons: [
        {
          label: "Different from every angle",
          body:
            "The shifting profile offers a distinct view from every side. From above, the opening reveals an entirely new composition — the piece keeps giving new readings."
        },
        {
          label: "Complete when empty",
          body:
            "ONDE has presence even when left unfilled — silhouette, marbling and gold detailing do the work. A vessel that reads as sculpture first, container second."
        },
        {
          label: "Atlantic reference",
          body:
            "Named for the French word for wave, the piece evokes France's Atlantic shoreline — water moving over pale stone, with a trace of gold in the last light."
        }
      ]
    }
  },
  {
    handle: "sculpture-Rein",
    name: "Sculpture — Rein",
    category: "Sculptures",
    description:
      "A lowered gaze and flowing mane give REIN its composed presence. Carved in wood, its sculpted contours carry a weathered grey finish with bronze-painted accents. A black pedestal lends the form an architectural stance.",
    price: { inr: 136000, usd: 1620 },
    image: "/images/sculptures/Rein/Rein1.webp",
    aspect: "portrait",
    material: "Wood, Weathered grey with bronze-painted accents, mounted on a black base.",
    body:
      "The horse embodies strength guided by sensitivity. REIN captures that balance, bringing quiet authority to a console, study or collected interior.",
      
    gallery: [
      "/images/sculptures/Rein/Rein1.webp",
      "/images/sculptures/Rein/Rein4.webp",
      "/images/sculptures/Rein/Rein3.webp",
      "/images/sculptures/Rein/Rein2.webp",
      "/images/sculptures/Rein/Rein5.webp",
      "/images/sculptures/Rein/Rein6.webp"
      
    ],
    details: [
      {
        label: "Material",
        body:
          "Wood, Weathered grey with bronze-painted accents, mounted on a black base. Dimensions: 12.2 × 5.9 × 19.7 in (31 × 15 × 50 cm). Weight: 3.178 kg / 7.01 lb.",
        image: "/images/sculptures/Rein/Rein-decor.webp"
      },
      {
        label: "Craft",
        body:
          "The flowing mane, layered painted finish and precise black base create a measured balance of movement and stillness.",
        image: "/images/sculptures/Rein/Rein-Craft.webp"
      }
    ],
    pullQuote: "A STUDY IN STRENGTH, FORM AND TIME.",
    lifestyleImage: "/images/sculptures/Rein/Rein-presence.webp",
    inspiration: {
      title: "A STUDY IN STRENGTH AND STILLNESS",
      reasons: [
        {
          label: "TIME-WORN CHARACTER",
          body:
            "Weathered grey tones and bronze-painted accents give REIN a distinctive aged character, allowing the surface to carry a sense of depth and history."
        },
        {
          label: "EQUESTRIAN FORM",
          body:
            "A sculpted horse head captures the strength and presence of the animal through its elongated form, defined features and expressive silhouette."
        },
        {
          label: "QUIETLY MONUMENTAL",
          body:
            "Mounted on a black base, REIN transforms a familiar equestrian form into a striking sculptural object with a strong architectural presence."
        }
      ]
    }
  },
  {
    handle: "sculpture-majeste",
    name: "Sculpture — Majesté",
    category: "Sculptures",
    description:
      "A study in quiet majesty. MAJESTÉ captures the profound stillness of the Buddha through a serene expression and intricately sculpted crown, while its time-worn patina lends the piece a sense of history, character and regal presence.",
    price: { inr: 148000, usd: 1820 },
    image: "/images/sculptures/Majeste/Budha1.webp",
    aspect: "portrait",
    material: "Premium ceramic, textured aged patina finish",
    body:
      "Arched brows, elongated features and an intricately carved crown lend MAJESTÉ its distinctly regal character. A richly aged patina in warm earth, ivory and charcoal heightens its time-worn presence. Rising to 52 cm, its substantial scale and commanding form give the sculpture an almost monumental presence.",
    gallery: [
      "/images/sculptures/Majeste/Budha1.webp",
      "/images/sculptures/Majeste/Budha2.webp",
      "/images/sculptures/Majeste/Budha3.webp",
      "/images/sculptures/Majeste/Budha4.webp",
      "/images/sculptures/Majeste/Budha5.webp"
    ],
    details: [
      {
        label: "Material",
        body:
          "Premium ceramic with a textured, aged patina finish. Dimensions: 28 × 27 × 52 cm (11 × 10.6 × 20.5 in). Weight: 4.235 kg / 9.34 lb.",
        image: "/images/materials/ceramic.png"
      },
      {
        label: "Craft",
        body:
          "Hand-sculpted in ceramic, the crown and features shaped by hand. The aged patina is layered by hand — warm earth, ivory and charcoal — so each piece bears its own weathered character. No two Majesté age the same way.",
        image: "/images/sculptures/Majeste/majeste-craft.webp"
      }
    ],
    pullQuote: "A study in quiet majesty.",
    lifestyleImage: "/images/sculptures/Majeste/Majeste.webp",
    inspiration: {
      title: "A face carried by time",
      reasons: [
        {
          label: "Time-worn patina",
          body:
            "Warm earth, ivory and charcoal, worked into the surface by hand. The finish reads as history rather than decoration — the piece feels as though it was found, not made."
        },
        {
          label: "Regal features",
          body:
            "Arched brows, elongated eyes and an intricately sculpted crown. The face carries the profound stillness of the Buddha — quiet, but never small."
        },
        {
          label: "Monumental in presence",
          body:
            "Rising to 52 cm and weighing over four kilos, MAJESTÉ commands its space. Substantial scale in a single, held gesture."
        }
      ]
    }
  },
  {
    handle: "vase-Obre",
    name: "Vase — Obre",
    category: "Vases",
    description:
      "Defined by a continuous sweep of deep teal glass, Obre balances an elongated silhouette with a generous oval opening. Its substantial 1 cm thickness creates visual depth, while light traces the transition from the rising arch to the rounded body. A subtly lifted lip and clear glass base complete its architectural form.",
    price: { inr: 58000, usd: 720 },
    image: "/images/vases/Obre/Obre1.webp",
    aspect: "portrait",
    material: "Polished Deep Teal Glass",
    body:
      "A study in fullness and space. Obre brings fluid movement to architectural settings, its open centre allowing the surroundings to become part of the composition. Perfect for a candlelit cocktail bar or lounge setting, where soft light accentuates its deep teal curves.",
    gallery: [
      "/images/vases/Obre/Obre1.webp",
      "/images/vases/Obre/Obre3.webp",
      "/images/vases/Obre/Obre2.webp",
      "/images/vases/Obre/Obre4.webp",
      "/images/vases/Obre/Obre5.webp"
    ],
    details: [
      {
        label: "Material",
        body: "Polished deep teal glass with a clear glass base. Dimensions: 8.7 x 3.9 x 15.4 in ( 22 x 10 x 39 cm). Weight: 4.4445 Kg / 9.80 lb.",
        image: "/images/materials/glass.png"
      },
      {
        label: "Craft",
        body:
          "The interplay of substantial glass, fine elegance and flowing contours gives the piece a changing presence as light moves across it.",
        image: "/images/vases/Obre/Obre-craft.webp"
      }
    ],
    pullQuote: "A QUIET STATEMENT — WHERE DEEP TEAL GLASS MEETS FLOWING FORM.",
    lifestyleImage: "/images/vases/Obre/Obre-presence.webp",
    inspiration: {
      title: "EVERY CURVE HOLDS THE LIGHT",
      reasons: [
        {
          label: "CONTINUOUS FORM",
          body:
            "A single sweeping curve rises into an elongated arch before flowing into the rounded body, giving Obre its distinctive architectural presence."
        },
        {
          label: "DEEP TEAL GLASS",
          body:
            "Its substantial glass construction creates layers of depth within the deep teal surface, revealing changing tones and reflections as light moves across the form."
        },
        {
          label: "SPACE BECOMES PART OF THE FORM",
          body:
            "The generous oval opening gives Obre an airy quality, allowing its surroundings, light, and reflections to become part of the composition."
        }
      ]
    }
  },
  {
    handle: "vase-seve",
    name: "Vase — Sève",
    category: "Vases",
    description:
      "SÈVE expresses botanical grace through softened contours and an asymmetric silhouette. A finely veined gold leaf rests against its textured grey surface, creating a considered balance of warmth, depth and quiet presence.",
    price: { inr: 68000, usd: 840 },
    image: "/images/vases/Seve/Seve1.webp",
    aspect: "portrait",
    material: "Premium ceramic, textured surface with gold leaf detailing",
    body:
      "Named after the French word for sap, SÈVE evokes the life within nature. Its solitary leaf becomes a focal point, bringing an intimate sense of artistry to a console, library or thoughtfully composed living space.",
    gallery: [
      "/images/vases/Seve/Seve1.webp",
      "/images/vases/Seve/Seve2.webp",
      "/images/vases/Seve/Seve4.webp",
      "/images/vases/Seve/Seve5.webp",
      "/images/vases/Seve/Seve3.webp",
      "/images/vases/Seve/Seve6.webp"
    ],
    details: [
      {
        label: "Material",
        body:
          "Premium ceramic in grey with a gold leaf motif. Dimensions: 21 × 14 × 34 cm (8.3 × 5.5 × 13.4 in). Weight: 1.368 kg / 3.02 lb.",
        image: "/images/materials/ceramic.png"
      },
      {
        label: "Craft",
        body:
          "A textured grey surface is finished by hand, then detailed with a single finely veined gold leaf — applied individually, no two placements identical.",
        image: "/images/vases/Seve/Seve-craft.webp"
      }
    ],
    pullQuote: "A solitary leaf — the quietest way to speak of nature.",
    lifestyleImage: "/images/vases/Seve/Seve-presence.webp",
    inspiration: {
      title: "Named for the sap that moves inside a living thing",
      reasons: [
        {
          label: "Botanical grace",
          body:
            "Softened contours and an asymmetric silhouette draw from the shapes plants make when they are left to grow unchecked — never symmetrical, always balanced."
        },
        {
          label: "A single gold leaf",
          body:
            "One finely veined leaf, applied by hand against the textured grey. The piece needs no second gesture; the leaf alone carries it."
        },
        {
          label: "Intimate scale",
          body:
            "At 34 cm tall and 1.37 kg, SÈVE belongs on a console, library shelf or dining composition — close enough to be read, not so large it dominates."
        }
      ]
    }
  },
  {
    handle: "vase-fauve",
    name: "Vase — Fauve",
    category: "Vases",
    description:
      "Broad, rounded shoulders meet an elongated body in a sculptural study of form and proportion. A fine dull gold seam traces the textured grey surface, lending a quiet luminosity to its earthy character.",
    price: { inr: 72000, usd: 890 },
    image: "/images/vases/Fauve/Fauve1.webp",
    aspect: "portrait",
    material: "Premium ceramic, textured grey with dull gold seam",
    body:
      "FAUVE finds beauty in irregularity — the subtle shifts of tone, the expressive surface, the line that draws the eye. Its composed presence brings depth and character to a thoughtfully curated setting.",
    gallery: [
      "/images/vases/Fauve/Fauve1.webp",
      "/images/vases/Fauve/Fauve2.webp",
      "/images/vases/Fauve/Fauve3.webp"
    ],
    details: [
      {
        label: "Material",
        body:
          "Premium ceramic in grey with a dull gold seam. Dimensions: 19 × 11 × 38 cm (7.48 × 4.33 × 14.96 in). Weight: 2.276 kg / 5.02 lb.",
        image: "/images/materials/ceramic.png"
      },
      {
        label: "Craft",
        body:
          "The textured surface is worked by hand before firing; the fine gold seam is applied individually, following the natural line of each piece.",
        image: "/images/vases/Fauve/Fauve-craft.webp"
      }
    ],
    pullQuote: "Substantial form, restrained detail — the quiet finesse of a single line.",
    lifestyleImage: "/images/vases/Fauve/Fauve-presence.webp",
    inspiration: {
      title: "Where generous silhouette meets a single, considered line",
      reasons: [
        {
          label: "A single gold seam",
          body:
            "A generous silhouette balanced by a delicate dull gold seam. The contrast between substantial form and restrained detailing gives the piece its quiet finesse."
        },
        {
          label: "Beauty in irregularity",
          body:
            "Subtle shifts of tone and an expressive, hand-worked surface mean no two FAUVE vases read identically. The irregularity is the point, not a flaw to correct."
        },
        {
          label: "Weight that holds the room",
          body:
            "At 38 cm tall and over two kilos, FAUVE anchors a console or library shelf. Substantial enough to hold its own; composed enough never to shout."
        }
      ]
    }
  },

  {
    handle: "sculpture-sillage",
    name: "Sculpture — Sillage",
    category: "Sculptures",
    description:
      "A carved metal sculpture captured in motion. SILLAGE is conceived for a mantel, lounge or formal living that calls for a defining line.",
    price: { inr: 174000, usd: 2150 },
    image: "/images/sculptures/Sillage/Sillage1.webp",
    aspect: "portrait",
    material: "Metal, textured gold finish",
    body:
      "Monumental in scale, SILLAGE expresses an extravagance of form and gold, with a fluidity that seems to know no bounds. Its substantial metal construction gives the piece weight, solidity and commanding presence.",
    gallery: [
      "/images/sculptures/Sillage/Sillage-new1.webp",
      "/images/sculptures/Sillage/Sillage-new2.webp",
      "/images/sculptures/Sillage/Sillage-new3.webp",
      "/images/sculptures/Sillage/Sillage2.webp",
      "/images/sculptures/Sillage/Sillage-hero.webp"
    ],
    details: [
      {
        label: "Material",
        body:
          "Metal with a textured gold finish. Dimensions: 36 × 25 × 54 cm (14.2 × 9.8 × 21.3 in). Weight: 3.2 kg / 7.1 lb.",
        image: "/images/materials/metal.png"
      },
      {
        label: "Craft",
        body:
          "Cast in metal and hand-finished in textured gold. Each surface is layered to catch light differently at every angle; the tactile character emerges only when the piece is placed in a room.",
        image: "/images/sculptures/Sillage/Sillage-Craft.webp"
      }
    ],
    pullQuote:
      "An extravagance of form — a fluidity that seems to know no bounds.",
    lifestyleImage: "/images/sculptures/Sillage/Sillage-presence.webp",
    inspiration: {
      title: "A defining line for the room",
      reasons: [
        {
          label: "Captured in motion",
          body:
            "The form is carved as though caught mid-gesture — fluid, extravagant, refusing to sit still. A sculpture that reads as movement even at rest."
        },
        {
          label: "Monumental in scale",
          body:
            "Rising to 54 cm and weighing over three kilos, SILLAGE holds a mantel, lounge or formal living room in its full presence. Weight and scale are the piece."
        },
        {
          label: "Textured gold, not polished",
          body:
            "The gold finish is textured, not smooth — every surface catches light at a different angle. Reads as sculpture in daylight, as jewellery at dusk."
        }
      ]
    }
  },
  {
    handle: "sculpture-vestige",
    name: "Sculpture — Vestige",
    category: "Sculptures",
    description:
      "Ancient in spirit. Monumental in presence. VESTIGE rises in carved wood, its Egyptian-inspired form shaped by geometry, instinct and time.",
    price: { inr: 112000, usd: 1380 },
    image: "/images/sculptures/Vestige/Vestige.webp",
    aspect: "portrait",
    material: "Solid wood, distressed finish",
    body:
      "At over five feet, VESTIGE commands space without ornament. Deep incisions trace its elongated form, while the weathered surface reveals the natural character of solid wood. Primitive in expression, architectural in scale — an object with the presence of a discovered artefact.",
    gallery: [
      "/images/sculptures/Vestige/Vestige.webp",
      "/images/sculptures/Vestige/Vestige3.webp",
      "/images/sculptures/Vestige/Vestige5.webp",
      "/images/sculptures/Vestige/Vestige1.webp",
      "/images/sculptures/Vestige/Vestige6.webp"
    
    ],
    details: [
      {
        label: "Material",
        body:
          "Solid wood with a distressed finish. Height: 162.56 cm (64 inches). Weight: 14 kg / 30.9 lb.",
        image: "/images/materials/wood.png"
      },
      {
        label: "Craft",
        body:
          "Deep incisions trace the elongated form; each cut is worked by hand. The distressed finish preserves the natural character of the wood — grain, knots and the marks of shaping intact.",
        image: "/images/sculptures/Vestige/Vestige-Craft.webp"
      }
    ],
    pullQuote: "Ancient in spirit. Monumental in presence.",
    lifestyleImage: "/images/sculptures/Vestige/Vestige-presence.webp",
    inspiration: {
      title: "An object with the presence of a discovered artefact",
      reasons: [
        {
          label: "Egyptian in reference",
          body:
            "The form is drawn from ancient Egyptian sculpture — geometry, instinct and time worked into a single elongated line. The reference is ancient; the presence is monumental."
        },
        {
          label: "Architectural in scale",
          body:
            "At over five feet, VESTIGE commands the floor rather than the shelf. Freestanding, weighted, permanent — a piece that changes how a room reads from any angle."
        },
        {
          label: "Weathered, not finished",
          body:
            "The distressed surface reveals the natural character of solid wood — grain, incisions, the marks of shaping. Nothing polished away."
        }
      ]
    }
  },
  {
    handle: "object-enigme",
    name: "Object — Énigme",
    category: "Sculptures",
    description:
      "A study in abstraction and restraint. ÉNIGME reduces the human face to its most elemental lines, leaving expression deliberately unresolved.",
    price: { inr: 132000, usd: 1620 },
    image: "/images/sculptures/Engime/Engime1.webp",
    aspect: "portrait",
    material: "Metal, textured pale gold and charcoal finish",
    body:
      "Two faces, two scales, two finishes — held together by a singular sculptural language. Their quiet ambiguity invites interpretation rather than defining it.",
    gallery: [
      "/images/sculptures/Engime/Engime1.webp",
      "/images/sculptures/Engime/Engime1.2.webp",
      "/images/sculptures/Engime/Engime1.5.webp",
      "/images/sculptures/Engime/Engime1.4.webp",
      "/images/sculptures/Engime/Engime1.6.webp",
    ],
    details: [
      {
        label: "Material",
        body:
          "Metal with a textured pale gold and charcoal finish. Dimensions: 11 × 6 × 6 cm (4.3 × 2.4 × 2.4 in).",
        image: "/images/sculptures/Engime/engime-presence2.webp"
      },
      {
        label: "Craft",
        body:
          "Cast in metal, the pairing juxtaposes pale gold with deep charcoal. Textured surfaces temper the metallic finish, while carved contours give each face its individual presence.",
        image: "/images/sculptures/Engime/Engime-craft.webp"
      }
    ],
    pullQuote:
      "Two faces, one language — expression deliberately unresolved.",
    lifestyleImage: "/images/sculptures/Engime/Engime-presence.webp",
    inspiration: {
      title: "Two faces, one sculptural language",
      reasons: [
        {
          label: "A study in pairs",
          body:
            "Two faces, two scales, two finishes — held together by a singular sculptural language. The composition invites interpretation rather than defining it."
        },
        {
          label: "Cast in contrast",
          body:
            "Pale gold set against deep charcoal. Textured surfaces temper the metallic finish, letting the pairing read as sculpture rather than object."
        },
        {
          label: "Reduced to essentials",
          body:
            "The human face pared back to its elemental lines. Expression is deliberately unresolved — the eye completes what the sculpture leaves open."
        }
      ]
    }
  },
  {
    handle: "sculpture-fougue",
    name: "Sculpture — Fougue",
    category: "Sculptures",
    description:
      "An abstract interpretation of the horse, defined by elongated lines, sculptural geometry and a commanding stance. The contrasting metallic mane brings a quiet flash of opulence to its otherwise restrained form.",
    price: { inr: 118000, usd: 1450 },
    image: "/images/sculptures/Fouge/Fouge-new2.webp",
    aspect: "portrait",
    material: "Metal, aged patina with metallic mane",
    body:
      "FOUGUE embodies contained power — strong without heaviness, expressive without excess. Its poised silhouette and architectural proportions give it a striking presence from every angle.",
    gallery: [
      "/images/sculptures/Fouge/Fouge-new2.webp",
      "/images/sculptures/Fouge/Fouge-new1.webp",
      "/images/sculptures/Fouge/Fouge-new3.webp",
      "/images/sculptures/Fouge/Fouge-new4.webp",
      "/images/sculptures/Fouge/horse1.webp",
      "/images/sculptures/Fouge/horse2.webp"
    ],
    details: [
      {
        label: "Material",
        body:
          "Textured metal with a deep aged patina, contrasted by a muted metallic mane and set on a black base. Dimensions: 18 × 10 × 45 cm (7.1 × 3.9 × 17.7 in). Weight: 1.675 kg / 3.69 lb.",
        image: "/images/materials/metal.png"
      },
      {
        label: "Craft",
        body:
          "Tonal variations and an intentionally irregular surface texture lend depth and individual character to the piece. Each casting bears a slightly different pattern of light — no two Fougue read exactly the same way.",
        image: "/images/sculptures/Fouge/Fouge-craft.webp"
      }
    ],
    pullQuote:
      "Contained power — strong without heaviness, expressive without excess.",
    lifestyleImage: "/images/sculptures/Fouge/Fouge-presence.webp",
    inspiration: {
      title: "The horse, reduced to line and gesture",
      reasons: [
        {
          label: "Abstract in form",
          body:
            "Elongated lines and sculptural geometry — the horse expressed as a single held gesture rather than a literal figure. Contained power in an abstract silhouette."
        },
        {
          label: "A quiet flash of opulence",
          body:
            "The metallic mane sits against the aged patina like jewellery — restrained, but the piece asks for a second look because of it."
        },
        {
          label: "No two alike",
          body:
            "Tonal variations and an intentionally irregular surface finish mean every Fougue reads slightly differently under any light. Character is built into the casting."
        }
      ]
    }
  },
  {
    handle: "sculpture-linconnu",
    name: "Sculpture — L'Inconnu",
    category: "Sculptures",
    description:
      "A study of human instinct — what is concealed, what is sought, what is ultimately revealed. A fluid gesture veils the gaze, poised between shadow and awakening.",
    price: { inr: 168000, usd: 2060 },
    image: "/images/sculptures/Linconnu/Li1.webp",
    aspect: "portrait",
    material: "Textured metal with layered detailing, black marble base",
    body:
      "L'INCONNU explores the space between the visible and the unknown. Its raw, fragmented surface is interrupted by a fluid gesture across the gaze — creating a sculptural presence that feels both human and abstract.",
    gallery: [
      "/images/sculptures/Linconnu/Li1.webp",
      "/images/sculptures/Linconnu/Li2.webp",
      "/images/sculptures/Linconnu/Li3.webp",
      "/images/sculptures/Linconnu/Li4.webp",
       "/images/sculptures/Linconnu/Li5.webp",
      "/images/sculptures/Linconnu/Li6.webp",
      "/images/sculptures/Linconnu/Li7.webp",
      "/images/sculptures/Linconnu/Li8.webp",
      
    ],
    details: [
      {
        label: "Material",
        body:
          "Sculpted textured metal with layered metal detailing, mounted on a black marble base. Sculpture: 45 × 20 × 47 cm (17.7 × 8 × 18.5 in). Base: 32 × 16 × 3 cm (12.6 × 6.3 × 1.2 in). Weight: 13.8 kg / 30.4 lb.",
        image: "/images/materials/metal.png"
      },
      {
        label: "Craft",
        body:
          "Monumental in expression, L'Inconnu commands through elegance, texture and restraint — an enigmatic objet d'art conceived as a focal point. The metallic surfaces are layered by hand; every piece bears its own pattern of light.",
        image: "/images/sculptures/Linconnu/Li1.webp"
      }
    ],
    pullQuote:
      "As instinct yields to consciousness, light becomes revelation.",
    lifestyleImage: "/images/sculptures/Linconnu/Li1.webp",
    inspiration: {
      title: "The space between the visible and the unknown",
      reasons: [
        {
          label: "Human and abstract",
          body:
            "A raw, fragmented surface interrupted by a fluid gesture across the gaze. The piece reads as both figure and idea — recognisable, yet refusing to resolve."
        },
        {
          label: "Layered by hand",
          body:
            "Sculpted textured metal with layered detailing worked into the surface by hand. Every piece bears its own pattern of light — no two L'Inconnu look exactly alike."
        },
        {
          label: "Grounded on marble",
          body:
            "A black marble base — 32 × 16 × 3 cm — anchors nearly fourteen kilos of sculpted metal. Solidity beneath expression; the piece stays where you place it."
        }
      ]
    }
  },
  {
    handle: "sculpture-thalassa",
    name: "Sculpture — Thalassa",
    category: "Sculptures",
    description:
      "THALASSA reads like a jewel magnified into sculpture. Its clear, crystalline edge catches the light around a richly amber body, while dark striations travel into a sweeping, smoky crest. More than a foot across, the shell has impressive scale, yet its finely defined rim draws you in to look closer.",
    price: { inr: 148000, usd: 1820 },
    image: "/images/sculptures/Telassa/21.webp",
    aspect: "landscape",
    material: "Mouth-blown, hand-shaped glass",
    body:
      "Named for the sea, THALASSA calls to mind the Amalfi Coast: the movement of water against sculpted cliffs, the warmth of late sunlight and the glint of light along the shore. Its open spiral holds that sense of movement in glass, revealing new depths of amber and smoke from every angle.",
    gallery: [
      "/images/sculptures/Telassa/21.webp",
      "/images/sculptures/Telassa/22.webp",
      "/images/sculptures/Telassa/23.webp",
      "/images/sculptures/Telassa/24.webp",
      "/images/sculptures/Telassa/25.webp"
    ],
    details: [
      {
        label: "Material",
        body:
          "Mouth-blown, hand-shaped glass with a glossy, translucent amber and smoky grey body, a crystal-clear edge, dark striations and warm copper-toned flecks. Dimensions: 32 × 15 × 18 cm (12.6 × 5.9 × 7.1 in). Weight: 2.688 kg / 5.93 lb.",
        image: "/images/materials/glass.png"
      },
      {
        label: "Craft",
        body:
          "Selected for its generous scale, layered colour and exceptionally defined, jewel-like edge. Each piece is mouth-blown by hand — the spiral, the striations and the coppered flecks are the maker's decisions in the moment.",
        image: "/images/sculptures/Telassa/Telassa-craft.webp"
      }
    ],
    pullQuote:
      "The sea, held in glass — sunlight along the shore.",
    lifestyleImage: "/images/sculptures/Telassa/Telassa-presence.webp",
    inspiration: {
      title: "Selected for what a machine cannot make",
      reasons: [
        {
          label: "Jewel-like edge",
          body:
            "The exceptionally defined, crystal-clear rim is where THALASSA earns its selection — a hand-shaped edge, not a moulded one."
        },
        {
          label: "Amalfi light",
          body:
            "Named for the sea, evoking the Amalfi Coast: sunlight through amber, dark striations like water against cliff."
        },
        {
          label: "Mouth-blown, one hand",
          body:
            "Every piece is mouth-blown and hand-shaped — the layered colour and coppered flecks belong to that one moment."
        }
      ]
    }
  },
  {
    handle: "sculpture-altesse",
    name: "Sculpture — Altesse",
    category: "Sculptures",
    description:
      "ALTESSE captures the regal presence of an eagle in a magnificent study of scale and proportion. Its transparent wing rises like an architectural gesture, giving the silhouette striking movement. Free-flowing, seemingly unstoppable curves carry ivory, black, amber and touches of brown through the glass. The finesse lies in its watchful eye, defined beak and talons, and the changing light within the form.",
    price: { inr: 158000, usd: 1940 },
    image: "/images/sculptures/Altesse/Altesse1.webp",
    aspect: "portrait",
    material: "Glass",
    body:
      "Its scale makes it a focal point, yet its transparency allows the room to breathe. From a distance, the silhouette commands attention; up close, the layers of colour invite discovery.",
    gallery: [
      "/images/sculptures/Altesse/Altesse1.webp",
      "/images/sculptures/Altesse/Altesse5.webp",
      "/images/sculptures/Altesse/Altesse7.webp",
      "/images/sculptures/Altesse/Altesse2.webp",
      "/images/sculptures/Altesse/Altesse3.webp",
      "/images/sculptures/Altesse/Altesse4.webp",
      "/images/sculptures/Altesse/Altesse6.webp"
    ],
    details: [
      {
        label: "Material",
        body:
          "Transparent glass with black, ivory and brown detailing, and amber accents. Dimensions: 27 × 22 × 42 cm (10.6 × 8.7 × 16.5 in). Weight: 4.223 kg / 9.31 lb.",
        image: "/images/materials/glass.png"
      },
      {
        label: "Craft",
        body:
          "Selected for its architectural scale, balanced proportions and fluid layers of colour. The watchful eye, defined beak and talons are worked by hand — the finesse of the piece lives in those small marks against the sweep of the wing.",
        image: "/images/sculptures/Altesse/Altesse-carft.webp"
      }
    ],
    pullQuote:
      "A silhouette from across the room; layers of colour from close up.",
    lifestyleImage: "/images/sculptures/Altesse/Altesse-presence.webp",
    inspiration: {
      title: "Architecture in glass, watched over by an eye",
      reasons: [
        {
          label: "Architectural scale",
          body:
            "Forty-two centimetres tall — a focal point at real architectural scale, yet the transparency keeps the room breathing around it."
        },
        {
          label: "Balanced proportions",
          body:
            "The wing rises as one uninterrupted gesture; the body holds the counterweight. Balance is the whole reason the piece stands as it does."
        },
        {
          label: "Fluid layers of colour",
          body:
            "Ivory, black, amber and brown are carried through the glass in free-flowing bands — layers that reveal themselves only as the light changes."
        }
      ]
    }
  },
  {
    // Dimensions are estimated — confirm against finished piece before publishing.
    handle: "vase-elio",
    name: "Vase — Elio",
    category: "Vases",
    description:
      "Named for its association with Helios, the Greek sun god, ELIO evokes light and warmth. A serene facial profile emerges from this sculptural vase, its elongated form complemented by a white marble-effect finish with flowing grey veins — a poetic expression of presence and stillness.",
    price: { inr: 74000, usd: 910 },
    image: "/images/vases/Elios/Elio.webp",
    aspect: "portrait",
    material: "Ceramic and glass, white marble-effect finish with grey veining",
    body:
      "ELIO invites contemplation through a face only partly revealed. Its architectural proportions create a distinctive focal point, bringing quiet strength and individuality to a thoughtfully composed space.",
    gallery: [
      "/images/vases/Elios/Elio.webp",
      "/images/vases/Elios/Elio1.webp",
      "/images/vases/Elios/Elio2.webp",
      "/images/vases/Elios/Elio3.webp",
      "/images/vases/Elios/Elio4.webp"
    ],
    details: [
      {
        label: "Material",
        body:
          "Ceramic and glass with a white marble-effect finish and flowing grey veins. Dimensions: 18 × 14 × 45 cm (7.1 × 5.5 × 17.7 in). Weight: 2.83 kg / 6.24 lb.",
        image: "/images/materials/ceramic.png"
      },
      {
        label: "Craft",
        body:
          "The sculpted facial profile is modelled by hand; the marble veining is drawn across the surface individually, so the pattern of each piece is its own.",
        image: "/images/vases/Elios/Elios-craft.webp"
      }
    ],
    pullQuote: "A face only partly revealed — the rest, held in stillness.",
    lifestyleImage: "/images/vases/Elios/Elio-presence.webp",
    inspiration: {
      title: "Named for Helios — light and warmth, held in form",
      reasons: [
        {
          label: "A face, only partly revealed",
          body:
            "The profile emerges from the vessel rather than sitting on it. Half-sculpture, half-vase — the piece asks the room to look twice."
        },
        {
          label: "Marble-effect finish",
          body:
            "A white marble-effect surface with hand-drawn grey veining. The pattern of each piece is its own; no two ELIOs read identically."
        },
        {
          label: "Architectural proportions",
          body:
            "At 45 cm tall and under 3 kg, ELIO rises as a distinctive focal point — tall enough to command a console, quiet enough to let the room breathe around it."
        }
      ]
    }
  },
];

// Editorial curation layer — reorderable seasonal picks. A given category can
// appear in more than one edit; the edit page rotates through products in
// that category so each edit shows a different piece.
export type EditSelection = {
  slug: string;
  number: string;
  title: string;
  intro: string;
  // Explicit curation — each edit features a specific in-house piece by
  // handle. Resolved against PRODUCTS at render time; order below is the
  // order shown on /edit.
  handles: string[];
};

export const EDITS: EditSelection[] = [
  {
    slug: "statement",
    number: "01",
    title: "Statement pieces",
    intro:
      "An everyday object pulled out of leather and into Carrara — a carriall carved by hand, the quilted motif worked into the stone. The piece a room turns toward first.",
    handles: ["sculpture-monogramme"]
  },
  {
    slug: "new",
    number: "02",
    title: "New pieces",
    intro:
      "This season's new work — a bodice gathered into carved stone, crowned, and set on dark marble. A figure held in the moment before it moves.",
    handles: ["sculpture-couronne"]
  },
  {
    slug: "limited",
    number: "03",
    title: "Limited pieces",
    intro:
      "A figure reduced to its clearest line — torso, cinched waist, petalled skirt. Carved in dark marble and lifted on brass. Numbered, signed, brief.",
    handles: ["sculpture-silhouette"]
  },
  {
    slug: "designer",
    number: "04",
    title: "Designer pieces",
    intro:
      "The piece the house is known for — an abstracted feline in Carrara, carried in a single uninterrupted line. Ancient in reference, modern in gesture.",
    handles: ["sculpture-feline"]
  }
];

// In-house, made-to-order pieces — not part of the regular catalogue. Each
// is produced on request, with a quoted lead time. Shown on /exclusive as a
// slow, full-bleed procession rather than a grid.
export type ExclusivePiece = {
  slug: string;
  number: string;
  name: string;
  discipline: string;
  intro: string;
  body: string;
  material: string;
  dimensions: string;
  leadTime: string;
  edition: string;
  image: string;
  gallery?: string[];
  price: { inr: number; usd: number };
  inspiration?: ProductInspiration;
};

export const EXCLUSIVE_PIECES: ExclusivePiece[] = [
  {
    slug: "essor",
    number: "I",
    name: "ESSOR",
    discipline: "Monumental sculpture",
    intro: "The Art of Ascent.",
    body:
      "An expression of power, instinct and effortless grace. ESSOR captures the eagle in a moment of poised majesty, its wings unfolding through an intricate rhythm of sculpted feathers. The artistry lies in the extraordinary treatment of marble — each feather emerges with its own definition, meticulously carved in successive layers to create a remarkable sense of depth, texture and movement. A dialogue between strength and refinement, movement and stillness.",
    material: "White marble, hand-carved; granite plinth",
    dimensions: "H 580 · W 1120 · D 280 mm",
    leadTime: "18 – 24 weeks",
    edition: "Made to order · signed",
    image: "/Exclusive/Eagle/Eagle.png",
    gallery: [
      "/Exclusive/Eagle/Eagle.png",
      "/Exclusive/Eagle/Eagle3.png",
      "/Exclusive/Eagle/Eagle2.png",
      "/Exclusive/Eagle/Eagle4.png",
      "/Exclusive/Eagle/Eagle6.png",
      "/Exclusive/Eagle/Eagle7.png",
      "/Exclusive/Eagle/Eagle8.png",
      "/Exclusive/Eagle/Eagle5.png",


    ],
    price: { inr: 624000, usd: 7480 },
    inspiration: {
      eyebrow: "Why This Piece",
      title: "A singular presence, conceived to transcend the ordinary.",
      reasons: [
        {
          label: "Feathered in successive layers",
          body:
            "Each feather emerges with its own definition, meticulously carved in successive layers to create a remarkable sense of depth, texture and movement across the full breadth of the bird."
        },
        {
          label: "Light across the plumage",
          body:
            "Fine incisions trace the natural rhythm of the feathers, and the sculpted transitions between each layer catch the light as the day moves — revealing the intricacies of the artistry and the quiet sophistication of every detail."
        },
        {
          label: "Strength and refinement",
          body:
            "The delicate refinement of the feathered edges contrasts with the strength of the stone, giving the wings an almost weightless quality — solid marble read as seemingly effortless flight."
        }
      ]
    }
  },
  {
    slug: "nautile",
    number: "II",
    name: "Nautile",
    discipline: "Carved form",
    intro: "A shell, held mid-furl.",
    body:
      "Hand-carved from a single block of travertine and finished to a soft matte. Nautile is a study in slow movement — a spiralled shell opening into a long, sail-like crest, the full silhouette worked by hand over several weeks.",
    material: "Travertine, hand-carved",
    dimensions: "H 580 · W 1120 · D 220 mm",
    leadTime: "14 – 18 weeks",
    edition: "Made to order · numbered",
    image: "/Exclusive/Star/Star1.png",
    gallery: [
      "/Exclusive/Star/Star1.png",
      "/Exclusive/Star/Star2.png",
      "/Exclusive/Star/Star3.png",
      "/Exclusive/Star/Star4.png"


    ],
    price: { inr: 384000, usd: 4600 },
    inspiration: {
      eyebrow: "Why This Piece",
      title: "A spiral, held open",
      reasons: [
        {
          label: "Worked in travertine",
          body:
            "A stone with its own quiet weather — the warmth of the colour and the fine veining both carry through the carving. Nothing is applied; the finish is only polish."
        },
        {
          label: "A single line",
          body:
            "The shell and the sail-like crest are read as one gesture. The eye follows the spiral out, lifts along the crest, and resolves at the trailing edge — the composition rewards slow looking."
        },
        {
          label: "Scaled for a mantel",
          body:
            "Wider than tall, shallow in depth. Nautile sits on a mantel, a long console, or the top of a credenza without reaching for the room."
        }
      ]
    }
  },
  {
    slug: "cygne",
    number: "III",
    name: "Cygne",
    discipline: "Carved figure",
    intro: "A pair, held in white stone.",
    body:
      "Hand-carved from a single block of white marble and finished to a soft silk polish. Cygne is a quiet study in grace — two swans held in a single, unbroken line, feathering worked by hand across the full of the form.",
    material: "White marble, hand-carved",
    dimensions: "H 520 · W 420 · D 180 mm",
    leadTime: "16 – 20 weeks",
    edition: "Made to order · signed",
    image: "/Exclusive/Swan/Swan1.png",
    gallery: [
      "/Exclusive/Swan/Swan4.png",
      "/Exclusive/Swan/Swan1.png",
      "/Exclusive/Swan/Swan2.png",
      "/Exclusive/Swan/Swan3.png"

    ],
    price: { inr: 288000, usd: 3460 },
    inspiration: {
      eyebrow: "Why This Piece",
      title: "Two forms, one line",
      reasons: [
        {
          label: "A single block",
          body:
            "Both birds and the frame they share are drawn from one piece of white marble. The composition is held together by the stone itself — nothing is attached."
        },
        {
          label: "Feathered precisely",
          body:
            "The scaled plumage along the arch is cut by hand, overlapping cleanly from top to tail. The density of the carving changes along the curve so the eye can follow it."
        },
        {
          label: "A pair, unbroken",
          body:
            "The two swans meet without touching — a small negative shape between them is deliberately left. Cygne reads as a pair from any angle, but neither bird is the primary figure."
        }
      ]
    }
  }
  // {
  //   slug: "silence",
  //   number: "IV",
  //   name: "Silence",
  //   discipline: "Wall relief",
  //   intro: "A low relief, carved in a single pass.",
  //   body:
  //     "A hand-carved panel in cast plaster, finished to a soft matte. Silence hangs flush to the wall and shifts entirely with the hour of the day — read it in morning light, then again at dusk.",
  //   material: "Cast plaster, hand-finished",
  //   dimensions: "H 900 · W 1200 · D 45 mm",
  //   leadTime: "12 – 16 weeks",
  //   edition: "Made to order · one of one",
  //   image: "/images/sculptures/scu6.webp",
  //   price: { inr: 574000, usd: 6880 }
  // }
];

// Lookup an exclusive piece by handle (slug). Used by the store to make the
// cart work with pieces that live outside the main PRODUCTS catalogue.
export function exclusiveByHandle(handle: string): ExclusivePiece | undefined {
  return EXCLUSIVE_PIECES.find((p) => p.slug === handle);
}

// Adapter — reshapes an ExclusivePiece into the Product contract the detail
// page components (ProductHero / ProductInfo / ProductDiscoverAlso / etc.)
// consume. Category is a sentinel used by productHref + ProductBreadcrumb
// to route back to /exclusive.
export function exclusiveToProduct(piece: ExclusivePiece): Product {
  return {
    handle: piece.slug,
    name: piece.name,
    category: "Sculptures",
    description: `${piece.body} Material: ${piece.material}. Dimensions: ${piece.dimensions}. Lead time: ${piece.leadTime}. ${piece.edition}.`,
    body: piece.body,
    price: piece.price,
    image: piece.image,
    gallery: piece.gallery?.length ? piece.gallery : [piece.image],
    aspect: "portrait",
    material: piece.material,
    pullQuote: piece.intro,
    inspiration: piece.inspiration
  };
}

export function isExclusiveHandle(handle: string): boolean {
  return EXCLUSIVE_PIECES.some((p) => p.slug === handle);
}

export type JournalEntry = {
  slug: string;
  kicker: string;
  title: string;
  excerpt: string;
  image: string; // hero/primary image
  // Additional angles for the Studio portraits. Rendered as clickable
  // thumbnails below the text column; clicking swaps the hero in place.
  gallery?: string[];
  // How the hero + thumbnails fit their frame. Default "cover" (fills the
  // frame, may crop). Set to "contain" for landscape or environmental shots
  // that would read as cropped under cover — e.g. the spiral form.
  fit?: "cover" | "contain";
  // Hero container aspect ratio as a Tailwind arbitrary value (e.g. "4/5",
  // "16/9"). Default "4/5" (portrait). Set to match the source image's
  // native ratio when you want the frame to hug the photo without any
  // letterboxing.
  aspect?: string;
};

export const JOURNAL_ENTRIES: JournalEntry[] = [
  // ── Studio portraits — hand-carved marble, travertine and basalt pieces
  // photographed on a dark ground. Each entry's gallery holds the extra
  // angles that render as thumbnail swatches beside the hero. ──
  {
    slug: "a-heart-in-the-round",
    kicker: "Studio",
    title: "A HEART, IN THE ROUND",
    excerpt:
      "The simplest form, carved slowly. On the pieces that invite touch instead of distance.",
    image: "/Studio/Heart/Heart-Hero.webp",
    gallery: [
      "/Studio/Heart/H2.webp",
      "/Studio/Heart/H3.webp",
      "/Studio/Heart/H4.webp",
      "/Studio/Heart/H5.webp",
      "/Studio/Heart/H6.webp",
      "/Studio/Heart/H7.webp",
      "/Studio/Heart/H8.webp"
    ]
  },
  {
    slug: "wings-raised",
    kicker: "Object",
    title: "WINGS RAISED",
    excerpt:
      "A white marble eagle cut from a single block — the piece a mantel will arrange itself around.",
    image: "/Studio/Eagle/Eagle-hero.webp",
    gallery: [
      "/Studio/Eagle/Eagle2.webp",
      "/Studio/Eagle/Eagle3.webp",
      "/Studio/Eagle/Eagle4.webp",
      "/Studio/Eagle/Eagle5.webp",
      "/Studio/Eagle/Eagle6.webp",
      "/Studio/Eagle/Eagle7.webp",
      "/Studio/Eagle/Eagle8.webp"
    ]
  },
  {
    slug: "the-landed-bird",
    kicker: "Object",
    title: "THE LANDED BIRD",
    excerpt:
      "Caught at the end of a descent, not the middle of flight. On sculptures that anchor a room rather than lunge through it.",
    image: "/Studio/Pigeon/Pigeon-hero.webp",
    gallery: [
      "/Studio/Pigeon/Pigeon2.webp",
      "/Studio/Pigeon/Pigeon3.webp",
      "/Studio/Pigeon/Pigeon4.webp",
      "/Studio/Pigeon/Pigeon5.webp",
      "/Studio/Pigeon/Pigeon6.webp",
      "/Studio/Pigeon/Pigeon7.webp",
      "/Studio/Pigeon/Pigeon8.webp"
    ]
  },
  {
    slug: "the-water-bird-held",
    kicker: "Studio",
    title: "THE WATER BIRD, HELD",
    excerpt:
      "A stone cygnet caught between gestures — the fan of its tail unfurled across the full breadth of the base.",
    image: "/Studio/Duck/Duck-hero.webp",
    gallery: ["/Studio/Duck/Duck2.webp"]
  },
  {
    slug: "a-pair-unbroken",
    kicker: "Guide",
    title: "A PAIR, UNBROKEN",
    excerpt:
      "Two figures held in one line of stone — on reading a sculpture as a composition, not a count.",
    image: "/Studio/Figurines/Figurine-hero.webp"
  },
  {
    slug: "an-instrument-held",
    kicker: "Object",
    title: "AN INSTRUMENT, HELD",
    excerpt:
      "A dark-bodied guitar set upright on a weathered plinth — on objects that borrow the gravity of music without producing a note.",
    image: "/Studio/Guitar/Guitar-hero.webp",
    gallery: [
      "/Studio/Guitar/Guitar2.webp",
      "/Studio/Guitar/Guitar3.webp"
    ]
  },
  {
    slug: "a-guitar-in-stone",
    kicker: "Craft",
    title: "A GUITAR, IN STONE",
    excerpt:
      "An instrument carved from marble on a plinth of stacked stone — a studio exercise in the gravity of a thing that cannot be played.",
    // Stone-guitar folder has no explicit "hero" file — Stone-guitar1 reads
    // as the front elevation and lands as the primary.
    image: "/Studio/Stone-guitar/Stone-guitar1.webp",
    gallery: [
      "/Studio/Stone-guitar/Stone-guitar2.webp",
      "/Studio/Stone-guitar/Stone-guitar3.webp",
      "/Studio/Stone-guitar/Stone-guitar4.webp",
      "/Studio/Stone-guitar/Stone-guitar5.webp"
    ]
  },
  {
    slug: "the-seated-figure",
    kicker: "Portrait",
    title: "THE SEATED FIGURE",
    excerpt:
      "A reclining form in white marble — carved not to recline, but to hold the quiet of the room around it.",
    image: "/Studio/Human/Human-hero.webp",
    gallery: [
      "/Studio/Human/Human2.webp",
      "/Studio/Human/Human3.webp",
      "/Studio/Human/Human4.webp"
    ]
  },
  {
    slug: "a-face-in-fragments",
    kicker: "Portrait",
    title: "A FACE, IN FRAGMENTS",
    excerpt:
      "A profile carved in veined marble — set in three stepped planes that read as one eye at a distance.",
    image: "/Studio/man-scu/man-scu-hero.webp",
    gallery: [
      "/Studio/man-scu/man-scu2.webp",
      "/Studio/man-scu/man-scu3.webp"
    
    ]
  },
  {
    slug: "the-spiral-form",
    kicker: "Guide",
    title: "THE SPIRAL FORM",
    excerpt:
      "A shell held mid-furl, a sail-like crest — on reading a single line through two distinct silhouettes.",
    image: "/Studio/Star/Star-hero.webp",
    gallery: [
      "/Studio/Star/Star2.webp",
      "/Studio/Star/Star3.webp",
      "/Studio/Star/Star5.webp",
      "/Studio/Star/Star4.webp",
    ]
  },
  {
    slug: "the-swan-feathered",
    kicker: "Studio",
    title: "THE SWAN, FEATHERED",
    excerpt:
      "A long neck held against a feathered wing — carved as a single, continuous line through the stone.",
    image: "/Studio/Swan/swan-hero.webp",
    gallery: [
      "/Studio/Swan/Swan2.webp",
      "/Studio/Swan/Swan3.webp",
      "/Studio/Swan/Swan5.webp"
    ]
  },

  // ── Editorial notes tied to real products — placed last so they close the
  // procession as quieter single-image features. ──
  /*{
    slug: "AT THE CERAMIC STUDIO",
    kicker: "Guide",
    title: "AT THE CERAMIC STUDIO",
    excerpt:
      "A sculptural vessel shaped by layered colour and movement — Rivage brings a hand-painted character to quiet, considered interiors.",
    image: "/images/vases/Vase-rivage/Rivage-Studio.webp"
  },
  {
    slug: "ON THE SCULPTURAL PLINTH",
    kicker: "Guide",
    title: "ON THE SCULPTURAL PLINTH",
    excerpt:
      "A study in contrast and balance — ÉNIGME pairs textured pale gold with charcoal to create an object of quiet visual tension.",
    image: "/images/sculptures/Engime/Engime-Studio.webp"
  },
  {
    slug: "IN THE QUIET CORNER",
    kicker: "Guide",
    title: "IN THE QUIET CORNER",
    excerpt:
      "Carved from solid wood and marked by a distressed finish, VESTIGE carries the character of an object shaped by time",
    image: "/images/sculptures/Vestige/Vestige.webp"
  },
  {
    slug: "IN THE AMBIENT LIGHT",
    kicker: "Studio",
    title: "IN THE AMBIENT LIGHT",
    excerpt:
      "Defined by a fluid silhouette and deep teal glass, OBRE turns a simple vessel into a striking sculptural presence.",
    image: "/images/vases/Obre/Obre-studio.webp"
  }*/
];
