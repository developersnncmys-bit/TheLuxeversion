import type { Metadata } from "next";
import { CartReview } from "@/components/cart/cart-review";

export const metadata: Metadata = {
  title: "Shopping Bag — The Luxe Version",
  description: "Review the pieces in your shopping bag before checkout."
};

export default function CartPage() {
  return <CartReview />;
}
