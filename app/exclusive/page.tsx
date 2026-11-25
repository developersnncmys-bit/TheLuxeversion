import type { Metadata } from "next";
import { EXCLUSIVE_PIECES } from "@/lib/content";
import { ExclusiveHero } from "@/components/exclusive/exclusive-hero";
import { ExclusiveIntro } from "@/components/exclusive/exclusive-intro";
import { ExclusiveFeature } from "@/components/exclusive/exclusive-feature";
import { ExclusivePiece } from "@/components/exclusive/exclusive-piece";
import { ExclusiveClosing } from "@/components/exclusive/exclusive-closing";
import { ExclusivePromise } from "@/components/exclusive/exclusive-promise";

export const metadata: Metadata = {
  title: "Luxe Exclusive — The Luxe Version",
  description:
    "A small line of in-house pieces, made to order and finished by hand at the studio."
};

export default function ExclusivePage() {
  // First piece is treated as the featured hero of the line; the rest fall
  // into the alternating procession below.
  const [featured, ...rest] = EXCLUSIVE_PIECES;

  return (
    <>
      <ExclusiveHero />
      <ExclusiveIntro />
      {featured && <ExclusiveFeature piece={featured} />}
      {rest.map((piece, i) => (
        <ExclusivePiece key={piece.slug} piece={piece} index={i} />
      ))}
      <ExclusiveClosing />
      <ExclusivePromise />
    </>
  );
}
