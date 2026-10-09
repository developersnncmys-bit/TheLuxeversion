"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { CheckoutChrome } from "./checkout-chrome";

type OrderItem = {
  handle: string;
  name: string;
  image?: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
};

type Order = {
  id: string;
  placedAt: string;
  items: OrderItem[];
  extras: { wrapping: "essential" | "classic"; giftMessage: string };
  delivery: { method: "standard" | "express"; cost: number };
  contact: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  shipping: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal: string;
    country: string;
  };
  subtotal: number;
  total: number;
  gst: number;
};

export function OrderConfirmation() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("tlv:last-order");
      if (raw) setOrder(JSON.parse(raw) as Order);
    } catch {
      // Fall through — we show the generic no-order view below.
    }
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="min-h-svh bg-chalk pt-16 text-ink md:pt-32">
        <CheckoutChrome />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-svh bg-chalk pt-16 text-ink md:pt-32">
        <CheckoutChrome />
        <main className="mx-auto flex min-h-[60svh] max-w-xl flex-col items-center justify-center px-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink/55">
            No recent order found
          </p>
          <p className="mt-6 max-w-[32ch] text-[14px] leading-[1.7] text-ink/70">
            If you placed an order recently, your confirmation was sent by
            email. Browse the collection to begin another.
          </p>
          <Link
            href="/collections/objects"
            className="mt-10 text-[11px] uppercase tracking-[0.3em] text-ink underline underline-offset-[6px] decoration-ink/40 transition-colors hover:decoration-ink"
          >
            Browse the collection
          </Link>
        </main>
      </div>
    );
  }

  const placed = new Date(order.placedAt);
  const placedLabel = placed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  return (
    <div className="min-h-svh bg-chalk pt-16 text-ink md:pt-32">
      <CheckoutChrome />

      <main className="mx-auto max-w-3xl px-6 pb-32 pt-14 md:px-12 md:pt-20">
        <header className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink/60">
            Thank you
          </p>
          <h1 className="mt-6 font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold uppercase tracking-[0.02em]">
            Your order has been placed
          </h1>
          <p className="mx-auto mt-6 max-w-md text-[13px] leading-[1.8] text-ink/70">
            A confirmation has been sent to{" "}
            <span className="text-ink">{order.contact.email}</span>.
            <br />
            Our studio will reach out to confirm hand-over details.
          </p>
          <div className="mt-10 inline-flex flex-col gap-1 border-y border-ink/15 py-5 px-10 text-[11px] uppercase tracking-[0.26em]">
            <span className="text-ink/60">Order reference</span>
            <span className="text-[14px] tracking-[0.18em] text-ink">
              {order.id}
            </span>
            <span className="mt-2 text-[10px] text-ink/50">
              Placed {placedLabel}
            </span>
          </div>
        </header>

        <section className="mt-16">
          <h2 className="border-b border-ink/15 pb-5 text-[12px] font-semibold uppercase tracking-[0.26em]">
            Pieces
          </h2>
          <ul className="divide-y divide-ink/10">
            {order.items.map((item) => (
              <li
                key={item.handle}
                className="grid grid-cols-[80px_1fr_auto] items-start gap-5 py-6 md:gap-8"
              >
                <div className="relative h-24 w-20 overflow-hidden bg-ink/5">
                  {item.image && (
                    <SafeImage
                      src={item.image}
                      alt=""
                      fallbackSeed={`${item.handle}-conf`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.14em]">
                    {item.name}
                  </p>
                  <p className="mt-2 text-[12px] text-ink/60">
                    Qty {item.qty}
                  </p>
                </div>
                <p className="self-start text-[13px] tracking-[0.02em]">
                  ₹ {item.lineTotal.toLocaleString("en-IN")}.00
                </p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-ink/70">
              Shipping to
            </h3>
            <address className="mt-4 text-[13px] not-italic leading-[1.7] text-ink/80">
              {order.contact.firstName} {order.contact.lastName}
              <br />
              {order.shipping.line1}
              {order.shipping.line2 && (
                <>
                  <br />
                  {order.shipping.line2}
                </>
              )}
              <br />
              {order.shipping.city}, {order.shipping.state}{" "}
              {order.shipping.postal}
              <br />
              {order.shipping.country}
              {order.contact.phone && (
                <>
                  <br />
                  {order.contact.phone}
                </>
              )}
            </address>
          </section>

          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-ink/70">
              Totals
            </h3>
            <dl className="mt-4 space-y-2 text-[13px]">
              <Row
                label="Subtotal"
                value={`₹ ${order.subtotal.toLocaleString("en-IN")}.00`}
              />
              <Row
                label="Delivery"
                value={
                  order.delivery.cost === 0
                    ? "Complimentary"
                    : `₹ ${order.delivery.cost.toLocaleString("en-IN")}.00`
                }
              />
              <Row
                label="GST included"
                value={`₹ ${order.gst.toLocaleString("en-IN")}.00`}
              />
              <div className="mt-4 border-t border-ink/15 pt-4">
                <Row
                  label="Total paid"
                  value={`₹ ${order.total.toLocaleString("en-IN")}.00`}
                  strong
                />
              </div>
            </dl>
          </section>
        </div>

        <div className="mt-16 flex flex-col items-center gap-5">
          <Link
            href="/collections/objects"
            className="w-full max-w-sm bg-ink py-5 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-chalk transition-opacity hover:opacity-90"
          >
            Continue shopping
          </Link>
          <Link
            href="/"
            className="text-[11px] uppercase tracking-[0.26em] text-ink/70 underline underline-offset-[6px] decoration-ink/30 transition-colors hover:text-ink"
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}

function Row({
  label,
  value,
  strong
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div
      className={
        strong
          ? "flex items-baseline justify-between text-[15px] font-semibold uppercase tracking-[0.18em]"
          : "flex items-baseline justify-between"
      }
    >
      <dt
        className={
          strong ? "" : "uppercase tracking-[0.18em] text-ink/70"
        }
      >
        {label}
      </dt>
      <dd>{value}</dd>
    </div>
  );
}
