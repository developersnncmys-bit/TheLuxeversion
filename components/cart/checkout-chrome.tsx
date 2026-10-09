"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Crumb = { label: string; href?: string };

// A slim breadcrumb strip sitting below the main Nav on /cart, /checkout and
// /checkout/confirmation. The site Nav already carries the wordmark and the
// escape routes back to the collection — this strip just orients the visitor
// within the checkout flow.
export function CheckoutChrome() {
  const pathname = usePathname() ?? "";
  const crumbs = resolveCrumbs(pathname);

  return (
    <div className="border-b border-ink/10 bg-chalk">
      <nav
        aria-label="Breadcrumb"
        className="mx-auto flex max-w-6xl items-center px-6 py-5 md:px-12"
      >
        <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.26em]">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={`${crumb.label}-${i}`} className="flex items-center gap-2">
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="text-ink/60 transition-colors hover:text-ink"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={isLast ? "text-ink" : "text-ink/60"}
                  >
                    {crumb.label}
                  </span>
                )}
                {!isLast && (
                  <span aria-hidden className="text-ink/30">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}

function resolveCrumbs(pathname: string): Crumb[] {
  if (pathname.startsWith("/checkout/confirmation")) {
    return [
      { label: "Home", href: "/" },
      { label: "Shopping Bag", href: "/cart" },
      { label: "Checkout", href: "/checkout" },
      { label: "Order Confirmed" }
    ];
  }
  if (pathname.startsWith("/checkout")) {
    return [
      { label: "Home", href: "/" },
      { label: "Shopping Bag", href: "/cart" },
      { label: "Checkout" }
    ];
  }
  // /cart (default)
  return [
    { label: "Home", href: "/" },
    { label: "Shopping Bag" }
  ];
}
