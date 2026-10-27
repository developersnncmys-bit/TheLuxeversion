import type { Metadata } from "next";
import { InfoPageHero } from "@/components/info/info-page-hero";
import { InfoPageProse } from "@/components/info/info-page-prose";

export const metadata: Metadata = {
  title: "Shipping Policy — The Luxe Version",
  description:
    "How pieces are crated, shipped, insured, and delivered — within India and internationally."
};

export default function ShippingPolicyPage() {
  return (
    <>
      <InfoPageHero
        kicker="How a Piece Travels"
        title="Shipping Policy"
        lede="Every piece leaves the studio in a crate built for it, insured end-to-end, and placed in the room where it is to live."
        image="/images/banners/figurine.png"
      />
      <InfoPageProse
        lastUpdated="October 2026"
        sections={[
          {
            heading: "Order Processing",
            paragraphs: [
              "Orders are processed within one to two working days of payment clearance. Dispatch windows begin after processing and are calculated separately for each piece based on its origin studio and destination.",
              "A dispatch confirmation with tracking details is emailed the day the piece leaves the studio."
            ]
          },
          {
            heading: "Delivery — Within India",
            bullets: [
              {
                label: "Metro Cities",
                body:
                  "Mumbai, Delhi NCR, Bengaluru, Chennai, Hyderabad, Pune, Kolkata, Ahmedabad — white-glove delivery in five to seven working days. Complimentary on orders above INR 50,000."
              },
              {
                label: "Tier 2 & 3 Cities",
                body:
                  "Seven to twelve working days by insured carrier. Rates are calculated at checkout — between INR 1,500 and INR 6,000 depending on piece scale and distance."
              },
              {
                label: "Remote Pin Codes",
                body:
                  "The studio ships to every serviceable pin code in India. Pieces to remote regions may take an additional three to five working days; the studio writes with the exact timeline before dispatch."
              },
              {
                label: "In-Room Placement",
                body:
                  "For mirrors, chandeliers and heavy sculpture, our team unwraps and positions the piece in the room — complimentary in metro cities, charged at carrier rates elsewhere."
              }
            ]
          },
          {
            heading: "Delivery — International",
            bullets: [
              {
                label: "By Air",
                body:
                  "Ten to fourteen working days to any country we currently ship to. Rate is quoted per piece and shown before you confirm the order."
              },
              {
                label: "By Sea",
                body:
                  "For large or heavy pieces where air freight is impractical — six to ten weeks door-to-door, at substantially lower cost. Quoted individually by the studio."
              },
              {
                label: "Customs, Duties & Taxes",
                body:
                  "Charged by the destination country to the recipient on arrival. The studio prepares all export paperwork; any permits or certificates required at destination are the recipient's responsibility."
              },
              {
                label: "Serviceable Countries",
                body:
                  "We currently ship to the United States, Canada, the United Kingdom, the European Union, Singapore, the UAE, Australia, and Japan. Other destinations are quoted individually — write to the studio before you order."
              }
            ]
          },
          {
            heading: "Crating & Packaging",
            paragraphs: [
              "Every piece is crated by hand at the studio: foam-cut interior shaped to the piece, hardwood exterior frame, climate-stable lining for stone, glass, and ceramic.",
              "The crate is yours to keep. It's engineered to be re-used for storage, future transport, or resale documentation."
            ]
          },
          {
            heading: "Insurance",
            paragraphs: [
              "Transit is fully insured at the declared value of the piece from the moment it leaves the studio to the moment it is placed in your room. Insurance covers damage, loss, and theft during transit.",
              "Claims for in-transit damage must be raised with photographs of both the piece and the outer crate within forty-eight hours of delivery — see the Return, Refund & Replacement Policy for process."
            ]
          },
          {
            heading: "Tracking",
            paragraphs: [
              "A tracking link is issued the day of dispatch, along with a direct line to the carrier's dedicated handler for your consignment. The studio remains on the thread until the piece is unwrapped and signed off."
            ]
          },
          {
            heading: "Delivery Windows & Delays",
            paragraphs: [
              "Delivery timelines are indicative, not guaranteed. Factors beyond the house's control — customs holds, weather events, carrier network disruptions — may add working days to the stated window. The studio will write to you proactively if a material delay is identified."
            ]
          },
          {
            heading: "Failed Delivery & Reattempts",
            paragraphs: [
              "The carrier attempts delivery up to three times at the address provided. If no one is available to receive, the piece is held at the nearest carrier hub for seven working days before being returned to the studio.",
              "Return-to-studio charges and re-dispatch rates are billable to the customer in such cases. The studio will write to coordinate before any further action is taken."
            ]
          },
          {
            heading: "Address Changes",
            paragraphs: [
              "Delivery address changes can be made free of charge until the dispatch confirmation is issued. After dispatch, the carrier may permit a redirect for an additional fee — the studio will coordinate directly with the carrier on your behalf where possible."
            ]
          }
        ]}
        closing={{
          body:
            "A specific delivery window, a non-serviced country, or an installation requirement? Write to the studio before you order and we'll quote and coordinate accordingly.",
          ctaLabel: "Write to the studio",
          ctaHref: "/contact"
        }}
      />
    </>
  );
}
