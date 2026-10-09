"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { BackToTop } from "./back-to-top";
import { AmbientAudio } from "./ambient-audio";
import { WhatsAppFloat } from "./whatsapp-float";

// Routes that keep the main Nav but drop the Footer and floating widgets —
// cart review, checkout flow, order confirmation. Keeping Nav gives visitors
// a familiar escape back to the collection; dropping the footer and floats
// keeps the transaction focused.
const FOCUSED_PREFIXES = ["/cart", "/checkout"];

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const focused = FOCUSED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  return (
    <>
      <Nav />
      <main>{children}</main>
      {!focused && (
        <>
          <Footer />
          <BackToTop />
          <AmbientAudio />
          <WhatsAppFloat />
        </>
      )}
    </>
  );
}
