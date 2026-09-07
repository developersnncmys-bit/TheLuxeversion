import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  PRODUCTS,
  categorySlug,
  productRef,
  getRelatedProducts
} from "@/lib/content";
import { ProductHero } from "@/components/product/product-hero";
import { ProductStickyBar } from "@/components/product/product-sticky-bar";
import { ProductInfo } from "@/components/product/product-info";
import { ProductQuote } from "@/components/product/product-quote";
import { ProductDetails } from "@/components/product/product-details";
import { ProductInspiration } from "@/components/product/product-inspiration";
import { ProductDiscoverAlso } from "@/components/product/product-discover-also";
import { ProductCollection } from "@/components/product/product-collection";
import { ProductServices } from "@/components/product/product-services";
import { ProductBoutique } from "@/components/product/product-boutique";
import { ProductBreadcrumb } from "@/components/product/product-breadcrumb";

type Params = { category: string; handle: string };

// Rendered on demand. We deliberately don't declare generateStaticParams
// here — the parent [category] segment already enumerates the categories,
// and adding a nested generator triggers a known Next 14 dev-mode webpack
// hiccup when descendant client components pull in framer-motion.

export function generateMetadata({ params }: { params: Params }): Metadata {
  const product = PRODUCTS.find((p) => p.handle === params.handle);
  if (!product) return { title: "Not found — The Luxe Version" };
  return {
    title: `${product.name} — The Luxe Version`,
    description: product.description
  };
}

export default function ProductDetailPage({ params }: { params: Params }) {
  const product = PRODUCTS.find((p) => p.handle === params.handle);
  // Guard against slug mismatch (e.g., product moved category) — 404 rather
  // than silently rendering under the wrong category URL.
  if (!product || categorySlug(product.category) !== params.category) {
    notFound();
  }

  const related = getRelatedProducts(product, 3);
  const ref_ = productRef(product);

  return (
    <>
      <ProductStickyBar product={product} />
      <ProductHero product={product} ref_={ref_} />
      <ProductInfo product={product} />
      <ProductDetails product={product} />
      <ProductInspiration product={product} />
      <ProductQuote product={product} />
      <ProductDiscoverAlso products={related} />
      <ProductCollection product={product} />
      <ProductServices />
      <ProductBoutique />
      <ProductBreadcrumb product={product} />
    </>
  );
}
