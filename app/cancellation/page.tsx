import type { Metadata } from "next";
import { InfoPageHero } from "@/components/info/info-page-hero";
import { InfoPageProse } from "@/components/info/info-page-prose";

export const metadata: Metadata = {
  title: "Cancellation Policy — The Luxe Version",
  description:
    "The window in which an order can be cancelled, what qualifies, and how a cancellation is handled from the first note to the refund."
};

export default function CancellationPage() {
  return (
    <>
      <InfoPageHero
        kicker="If You Change Your Mind"
        title="Cancellation Policy"
        lede="An order can be cancelled before the piece leaves the studio. The window is short because preparation begins the moment the order is confirmed."
        image="/images/banners/vase.png"
      />
      <InfoPageProse
        lastUpdated="October 2026"
        sections={[
          {
            heading: "The Window",
            paragraphs: [
              "Orders may be cancelled within twenty-four hours of order confirmation, provided the piece has not yet been dispatched. After this window, or once a dispatch notification has been sent, the Return, Refund & Replacement Policy applies instead.",
              "Made-to-order and bespoke commissions are not cancellable once production has begun — within forty-eight hours of order confirmation. The studio will write to confirm the production start date and the final cancellation deadline for your specific piece."
            ]
          },
          {
            heading: "How to Cancel",
            bullets: [
              {
                label: "01 · Write",
                body:
                  "Send a note to clientcare@theluxeversion.com or through the Contact page with your order reference number and a brief line on why you'd like to cancel."
              },
              {
                label: "02 · Confirmation",
                body:
                  "The studio responds within one working day confirming the cancellation and the refund amount. If the piece has already been dispatched, we'll let you know and redirect you to the returns process."
              },
              {
                label: "03 · Refund",
                body:
                  "The full purchase price is returned to the original payment method within seven to ten working days of cancellation confirmation. Transaction and gateway charges, where levied by the processor, are not refundable."
              }
            ]
          },
          {
            heading: "Cancellation by the House",
            paragraphs: [
              "The house reserves the right to cancel an order where a piece is sold out, mispriced due to an evident error, where fulfilment is not possible, or where fraud is suspected.",
              "In every such case, any amount paid is refunded in full within ten working days. The studio will write to you with the reason and, where possible, propose an alternative — a similar piece from the collection, a lead time for a reorder, or a bespoke commission."
            ]
          },
          {
            heading: "Partial Cancellation",
            paragraphs: [
              "Where an order contains multiple pieces, you may cancel one piece and keep the others. The refund covers the cancelled piece and its proportional share of any shipping charge. Write to the studio with the specific piece and reference number."
            ]
          },
          {
            heading: "Pieces Already in Transit",
            paragraphs: [
              "If a dispatch notification has been issued, the order cannot be cancelled — but it can be returned under the Return, Refund & Replacement Policy once it arrives. The studio will coordinate the collection and refund in the same way."
            ]
          },
          {
            heading: "Bespoke & Luxe Exclusive",
            paragraphs: [
              "Bespoke commissions and Luxe Exclusive pieces are conceived for a specific room or client and cannot be reassigned. These orders carry a stricter cancellation window — forty-eight hours from confirmation — after which the deposit (50% of the piece price) is non-refundable."
            ]
          }
        ]}
        closing={{
          body:
            "A cancellation request begins with a note — order reference number and a line on why. The studio handles the rest.",
          ctaLabel: "Write to the studio",
          ctaHref: "/contact"
        }}
      />
    </>
  );
}
