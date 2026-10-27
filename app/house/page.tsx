import type { Metadata } from "next";
import { HouseHero } from "@/components/house/house-hero";
import { HousePointOfView } from "@/components/house/house-point-of-view";
import { HouseFilm } from "@/components/house/house-film";
import { HouseArtOfObjects } from "@/components/house/house-art-of-objects";
import { HouseMaterials } from "@/components/house/house-materials";
import { HouseCraft } from "@/components/house/house-craft";
import { HouseStory } from "@/components/house/house-story";
import { HouseClosing } from "@/components/house/house-closing";

export const metadata: Metadata = {
  title: "The House — The Luxe Version",
  description:
    "The Luxe Version is a house of decorative objects — sculptures and vessels, curated for a life lived slowly."
};

export default function HousePage() {
  return (
    <>
      <HouseHero />
      <HousePointOfView />
      <HouseFilm />
      <HouseArtOfObjects />
      <HouseMaterials />
      <HouseCraft />
      <HouseStory />
      <HouseClosing />
    </>
  );
}
