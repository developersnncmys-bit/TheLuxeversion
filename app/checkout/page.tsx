import type { Metadata } from "next";
import { CheckoutForm } from "@/components/cart/checkout-form";

export const metadata: Metadata = {
  title: "Checkout — The Luxe Version",
  description: "Complete your purchase."
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
