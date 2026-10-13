// Bridges the backend's product shape with the storefront's Product type.
//
// The backend stores products the way the admin panel edits them —
// lowercase category slugs, a single price number, admin-generated
// handles like "lv-721405", and a different vocabulary for editorial
// fields. The storefront was authored with capitalized categories, split
// INR/USD pricing, hand-chosen handles and its own set of detail-page
// fields.
//
// `fetchProducts()` pulls from the backend and runs each row through
// `adaptBackendProduct` to produce the Product shape the UI already
// knows how to render. If the backend is unreachable (dev without a
// running API, misconfigured env, etc.) we fall back to the hardcoded
// PRODUCTS array so pages still render.

import { apiFetch, ApiError } from "./api";
import { PRODUCTS, type Product } from "./content";

type BackendDimensions = {
  main?: string;
  base?: string;
  weight?: string;
};

type BackendProduct = {
  id: string;
  reference: string;
  handle: string;
  name: string;
  category: string;
  editTag?: string;
  price: number;
  mrp?: number;
  stock?: number;
  status?: string;
  materials?: string;
  materialTags?: string[];
  dimensions?: BackendDimensions;
  description?: string;
  moreDetails?: string;
  bespoke?: boolean;
  image?: string;
  images?: string[];
};

type ListResponse = { items: BackendProduct[]; total: number };

// Rough INR→USD conversion for display when the backend only stores INR.
// Not for anything financial — the real checkout should pull a live rate.
const INR_PER_USD = 83;

const CATEGORY_LABEL: Record<string, Product["category"]> = {
  sculptures: "Sculptures",
  vases: "Vases",
  tabletop: "Tabletop",
  lighting: "Lighting"
};

function toStorefrontCategory(slug: string): Product["category"] | null {
  return CATEGORY_LABEL[slug.toLowerCase()] ?? null;
}

function adaptBackendProduct(src: BackendProduct): Product | null {
  const category = toStorefrontCategory(src.category);
  if (!category) return null; // skip rows whose category the UI doesn't know

  const inr = Math.round(src.price);
  const usd = Math.round(src.price / INR_PER_USD);

  const gallery = (src.images && src.images.length ? src.images : [src.image])
    .filter((x): x is string => typeof x === "string" && x.length > 0);

  return {
    handle: src.handle,
    name: src.name,
    category,
    description: src.description || "",
    price: { inr, usd },
    // SafeImage falls back to a picsum placeholder when the string is empty,
    // which is useful while the admin hasn't uploaded any photos yet.
    image: src.image || gallery[0] || "",
    aspect: "portrait",
    material: src.materials,
    gallery: gallery.length ? gallery : undefined,
    body: src.moreDetails || src.description
  };
}

export async function fetchProducts(params: { category?: string; limit?: number } = {}): Promise<Product[]> {
  const qs = new URLSearchParams();
  if (params.category) qs.set("category", params.category);
  if (params.limit) qs.set("limit", String(params.limit));
  const path = `/api/products${qs.toString() ? `?${qs}` : ""}`;

  try {
    const data = await apiFetch<ListResponse>(path);
    const mapped = data.items.map(adaptBackendProduct).filter((p): p is Product => p !== null);
    // Backend empty (e.g. seed hasn't run yet) → use hardcoded data so the
    // page is never blank.
    return mapped.length ? mapped : PRODUCTS;
  } catch (err) {
    if (err instanceof ApiError) {
      console.warn(`[products-api] backend returned ${err.status}: ${err.message} — using fallback`);
    } else {
      console.warn(`[products-api] backend unreachable (${(err as Error).message}) — using fallback`);
    }
    return PRODUCTS;
  }
}
