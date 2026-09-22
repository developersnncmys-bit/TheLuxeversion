import type { Metadata } from "next";
import { Inter, Inter_Tight, Noto_Serif_Display } from "next/font/google";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { BackToTop } from "@/components/site/back-to-top";
import { AmbientAudio } from "@/components/site/ambient-audio";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { ScrollTopOnRoute } from "@/components/site/scroll-top-on-route";
import { Preloader } from "@/components/ui/preloader";
import { StoreProvider } from "@/components/store/store-provider";
import { StoreMount } from "@/components/store/store-mount";
import "./globals.css";

const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap"
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap"
});

const serifDisplay = Noto_Serif_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "THE LUXE VERSION — SHOWPIECES & LIGHT, REDEFINED.",
  description:
    "A house of decorative showpieces, lighting and mirrors — pieces conceived as compositions.",
  metadataBase: new URL("https://theluxeversion.example"),
  openGraph: {
    title: "THE LUXE VERSION",
    description: "Showpieces & light, redefined.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${serifDisplay.variable}`}>
      <body className="font-sans bg-ink text-chalk antialiased">
        <Preloader />
        <StoreProvider>
          <SmoothScroll>
            <ScrollTopOnRoute />
            <Nav />
            <main>{children}</main>
            <Footer />
            <BackToTop />
            <AmbientAudio />
            <WhatsAppFloat />
          </SmoothScroll>
          <StoreMount />
        </StoreProvider>
      </body>
    </html>
  );
}
