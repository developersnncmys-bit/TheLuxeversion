import type { Metadata } from "next";
import { InfoPageHero } from "@/components/info/info-page-hero";
import { InfoPageProse } from "@/components/info/info-page-prose";

export const metadata: Metadata = {
  title: "Return, Refund & Replacement Policy — The Luxe Version",
  description:
    "How to return a piece, the window and conditions that apply, how refunds are issued, and when a replacement is offered in place of a refund."
};

export default function ReturnsPage() {
  return (
    <>
      <InfoPageHero
        kicker="If It Isn't Right"
        title="Return, Refund & Replacement Policy"
        lede="A piece is meant to live in a room before it is kept. Thirty days to decide; the studio handles the rest."
        image="/images/banners/table-top.png"
      />
      <InfoPageProse
        lastUpdated="October 2026"
        sections={[
          {
            heading: "The Return Window",
            paragraphs: [
              "You have thirty days from the day the piece arrives at your address to tell us it isn't right. Write within that window and the return is accepted; after thirty days, the piece is yours.",
              "Made-to-order, bespoke commissions, and Luxe Exclusive pieces are not returnable — they are conceived for a specific room and cannot be remade for another."
            ]
          },
          {
            heading: "Condition for Return",
            paragraphs: [
              "The piece must be returned in the same condition it arrived in, with its original packaging and documents. We photograph every piece before dispatch; small variations from that record are expected, visible wear is not."
            ],
            bullets: [
              "Original wrapping, crate, and documentation must accompany the return.",
              "The piece must not have been installed with permanent fixtures (e.g. drilled anchors, hard-wiring).",
              "The piece must not show evidence of use beyond initial placement and inspection.",
              "Luxe Exclusive, bespoke, and made-to-order pieces are final sale."
            ]
          },
          {
            heading: "How to Initiate a Return",
            bullets: [
              {
                label: "01 · Write",
                body:
                  "Send a note through the Contact page or to clientcare@theluxeversion.com with your reference number and a photograph of the piece in your room. We respond within two working days."
              },
              {
                label: "02 · Collection",
                body:
                  "The studio arranges white-glove collection at a time that suits you — anywhere in India within seven working days, international within fourteen."
              },
              {
                label: "03 · Inspection",
                body:
                  "On arrival at the studio, the piece is inspected against the pre-dispatch record within three working days. A note on the outcome is sent the same day."
              },
              {
                label: "04 · Refund",
                body:
                  "Once inspection is cleared, the full purchase price is returned to the original payment method within seven to ten working days. The original shipping charge, where separately itemised, is non-refundable."
              }
            ]
          },
          {
            heading: "Refunds",
            paragraphs: [
              "Approved refunds are returned to the original payment method within seven to ten working days of inspection clearance. For bank transfers, the refund is wired to the account from which the original payment was received.",
              "You will receive a refund confirmation email the moment the refund is initiated. Depending on your bank, the amount may take an additional three to five working days to reflect on your statement.",
              "Gateway charges levied by the payment processor on cross-border or non-standard transactions are not refundable."
            ]
          },
          {
            heading: "Replacements",
            paragraphs: [
              "A replacement is offered — in place of a refund — where a piece arrives damaged, has a verifiable manufacturing defect, or does not match the dispatched specification. Replacements are issued at no additional cost to the customer.",
              "Where the edition permits, the exact piece is replaced from the next available production run. Where it does not — for one-of-a-kind pieces — the studio proposes an equivalent from the current collection or arranges restoration by the original maker, at the customer's preference.",
              "Replacement lead times depend on the piece and are communicated at the point of approval. Where the lead time is not acceptable, a full refund is offered as an alternative."
            ]
          },
          {
            heading: "Damage in Transit",
            paragraphs: [
              "Report any damage within forty-eight hours of delivery with photographs of the piece and the outer crate, sent to clientcare@theluxeversion.com with your reference number.",
              "The studio arranges collection within seven working days (fourteen for international) and dispatches a replacement where the edition allows, or arranges restoration by the original maker where it does not. All in-transit damage is covered by insurance — no cost is passed to the customer."
            ]
          },
          {
            heading: "Manufacturing Defects",
            paragraphs: [
              "Pieces are inspected before dispatch and documented photographically. If a defect becomes apparent within the first thirty days of ownership, write with photographs and the reference number. Verified defects are addressed by replacement or by restoration at the house's choice; the customer bears no cost.",
              "Normal handmade variation — small asymmetries, patina, grain, firing marks — is a feature of the work and is not treated as a defect."
            ]
          },
          {
            heading: "Non-Returnable Items",
            bullets: [
              "Bespoke commissions.",
              "Made-to-order pieces (any piece produced to specification after your order was placed).",
              "Luxe Exclusive pieces.",
              "Pieces with permanent installation damage (drilled, wired, or anchored).",
              "Pieces returned after the thirty-day window."
            ]
          },
          {
            heading: "If the Studio Declines a Return",
            paragraphs: [
              "Returns may be declined where the piece does not meet the condition requirements above. In such cases the studio sends photographs of the condition on receipt and arranges return of the piece to the customer at the customer's cost.",
              "A declined return decision can be appealed in writing to clientcare@theluxeversion.com within seven working days — a second review by a senior member of the studio follows within five working days."
            ]
          }
        ]}
        closing={{
          body:
            "A return, refund, or replacement begins with a note — reference number, a photograph, a sentence on what isn't working. The studio handles the rest.",
          ctaLabel: "Write to the studio",
          ctaHref: "/contact"
        }}
      />
    </>
  );
}
