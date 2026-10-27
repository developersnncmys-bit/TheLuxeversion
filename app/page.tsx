import { Hero } from "@/components/home/hero";
import { ChapterRoom } from "@/components/home/chapter-room";
import { ChapterLook } from "@/components/home/chapter-look";
import { ChapterObject } from "@/components/home/chapter-object";
import { ChapterFilm } from "@/components/home/chapter-film";
import { Interlude } from "@/components/home/interlude";
import { Collection } from "@/components/home/collection";
import { JournalTeaser } from "@/components/home/journal";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Bounded runway for Chapter Room's sticky. Fragment inside = section
          (100vh sticky) + tracker (50vh). Runway = 200vh → sticky pins for 100vh
          and slides up cleanly just before ChapterFilm scrolls into view. */}
      <div className="relative h-[100vh]">
        <ChapterRoom />
      </div>
      {/* Sequential flow after chapter-room — no more reveal-behind so that
          ChapterFilm can sit between chapter-room and the Living Room reveal. */}
      <div className="relative bg-ink">
        <ChapterFilm />
        <div className="relative h-[200vh]">
          <ChapterLook
            pinned
            eyebrow="Shop the Room"
            title={"The\nSculpted\nRoom"}
            cover="/images/collection-home.png"
            // Video thumbnail cards temporarily hidden — pass empty array.
            thumbnails={[]}
            // thumbnails={[
            //   {
            //     src: "/images/Living-room1.png",
            //     label: "Chapter I",
            //     videoSrc: "images/living-room1.mp4"
            //   },
            //   {
            //     src: "/images/living-room2.png",
            //     label: "Chapter II",
            //     videoSrc: "/images/living-room2.mp4"
            //   }
            // ]}
          />
        </div>
        <ChapterObject />
        {/* <Interlude /> */}
        <Collection />
        <JournalTeaser />
      </div>
    </>
  );
}
