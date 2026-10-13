import type { Metadata } from "next";
import { EXCLUSIVE_PIECES } from "@/lib/content";
import { ExclusiveHero } from "@/components/exclusive/exclusive-hero";
import { ExclusiveIntro } from "@/components/exclusive/exclusive-intro";
import { ExclusivePiece } from "@/components/exclusive/exclusive-piece";
import { ExclusiveClosing } from "@/components/exclusive/exclusive-closing";

export const metadata: Metadata = {
  title: "Luxe Exclusive — The Luxe Version",
  description:
    "A small line of in-house pieces, made to order and finished by hand at the studio."
};

export default function ExclusivePage() {
  return (
    <>
      <ExclusiveHero />
      <ExclusiveIntro />
      {EXCLUSIVE_PIECES.map((piece, i) => (
        <ExclusivePiece key={piece.slug} piece={piece} index={i} />
      ))}
      <ExclusiveClosing />
    </>
  );
}
