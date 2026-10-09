"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { productHref } from "@/lib/content";
import { useStore } from "./store-provider";
import { DrawerShell } from "./drawer-shell";

export function CartDrawer() {
  const {
    cart,
    drawer,
    closeDrawer,
    removeFromCart,
    updateCartQty,
    cartSubtotal,
    productByHandle
  } = useStore();

  const open = drawer === "cart";
  const isEmpty = cart.length === 0;

  return (
    <DrawerShell
      open={open}
      onClose={closeDrawer}
      title="Shopping Bag"
      tone="light"
      footer={
        !isEmpty ? (
          <div className="px-6 py-6 md:px-8">
            <div className="mb-5 flex items-baseline justify-between">
              <p className="text-[11px] uppercase tracking-[0.28em] text-ink/70">
                Subtotal
              </p>
              <p className="text-[15px] tracking-[0.02em] text-ink">
                ₹ {cartSubtotal.toLocaleString("en-IN")}
                <span className="text-ink/50">*</span>
              </p>
            </div>
            <Link
              href="/cart"
              onClick={closeDrawer}
              className="block w-full bg-ink py-4 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-chalk transition-opacity hover:opacity-90"
            >
              Review bag & checkout
            </Link>
            <button
              type="button"
              onClick={closeDrawer}
              className="mt-4 w-full border border-ink/30 py-4 text-[11px] uppercase tracking-[0.28em] text-ink transition-colors hover:border-ink"
            >
              Continue shopping
            </button>

            {/* Need help — advisor contact block, Chanel-style. Compact so the
                drawer footer doesn't dominate the viewport on short screens. */}
            <div className="mt-6 border-t border-ink/10 pt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink">
                Need help?
              </p>
              <p className="mt-3 text-[12px] leading-[1.65] text-ink/70">
                Our advisors are available to answer all your questions.
              </p>
              <Link
                href="/faq"
                onClick={closeDrawer}
                className="mt-3 inline-block text-[11px] uppercase tracking-[0.28em] text-ink underline underline-offset-[6px] decoration-ink/40 transition-colors hover:decoration-ink"
              >
                Client care
              </Link>
            </div>

            <p className="mt-5 text-[10px] uppercase tracking-[0.24em] text-ink/50">
              *MRP inclusive of all taxes. Shipping and duties calculated at
              checkout.
            </p>
          </div>
        ) : null
      }
    >
      {isEmpty ? (
        <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-ink/55">
            Your bag is empty
          </p>
          <p className="mt-6 max-w-[24ch] text-[13px] leading-[1.7] text-ink/70">
            Add a piece from the collection and it will be held here for you.
          </p>
          <Link
            href="/collections/objects"
            onClick={closeDrawer}
            className="mt-10 text-[11px] uppercase tracking-[0.28em] text-ink underline underline-offset-[6px] decoration-ink/50 transition-colors hover:decoration-ink"
          >
            Browse the collection
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-ink/10">
          {cart.map((item) => {
            const product = productByHandle(item.handle);
            if (!product) return null;
            const lineTotal = product.price.inr * item.qty;
            return (
              <li key={item.handle} className="flex gap-4 px-6 py-6 md:px-8">
                <Link
                  href={productHref(product)}
                  onClick={closeDrawer}
                  className="relative h-24 w-20 shrink-0 overflow-hidden bg-ink/5"
                >
                  <SafeImage
                    src={product.image}
                    alt=""
                    fallbackSeed={`${product.handle}-cart`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={productHref(product)}
                      onClick={closeDrawer}
                      className="min-w-0 flex-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-ink/70"
                    >
                      {product.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.handle)}
                      aria-label={`Remove ${product.name}`}
                      className="shrink-0 text-ink/50 transition-colors hover:text-ink"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M1.5 1.5l9 9M10.5 1.5l-9 9"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                    </button>
                  </div>
                  {product.material && (
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ink/50">
                      {product.material}
                    </p>
                  )}

                  <div className="mt-4 flex items-end justify-between">
                    <div className="inline-flex items-center border border-ink/20">
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQty(item.handle, item.qty - 1)
                        }
                        aria-label="Decrease quantity"
                        className="flex h-7 w-7 items-center justify-center text-ink/70 transition-colors hover:text-ink"
                      >
                        −
                      </button>
                      <span className="w-7 text-center text-[12px] tracking-[0.08em] text-ink">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQty(item.handle, item.qty + 1)
                        }
                        aria-label="Increase quantity"
                        className="flex h-7 w-7 items-center justify-center text-ink/70 transition-colors hover:text-ink"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-[13px] tracking-[0.02em] text-ink">
                      ₹ {lineTotal.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </DrawerShell>
  );
}
