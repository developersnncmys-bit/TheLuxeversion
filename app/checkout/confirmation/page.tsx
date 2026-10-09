import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/cart/order-confirmation";

export const metadata: Metadata = {
  title: "Order confirmed — The Luxe Version",
  description: "Your order has been placed."
};

export default function ConfirmationPage() {
  return <OrderConfirmation />;
}
