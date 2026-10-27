import type { Metadata } from "next";
import { InfoPageHero } from "@/components/info/info-page-hero";
import { InfoPageProse } from "@/components/info/info-page-prose";

export const metadata: Metadata = {
  title: "Payment Policy — The Luxe Version",
  description:
    "The payment methods accepted, how prices and taxes are handled, and the security standards that apply to every transaction."
};

export default function PaymentPolicyPage() {
  return (
    <>
      <InfoPageHero
        kicker="How Payment Works"
        title="Payment Policy"
        lede="The methods we accept, how prices and taxes are shown, and the security standards that govern every transaction."
        image="/images/banners/decorative-object.png"
      />
      <InfoPageProse
        lastUpdated="October 2026"
        sections={[
          {
            heading: "Accepted Methods",
            bullets: [
              {
                label: "Credit & Debit Cards",
                body:
                  "Visa, Mastercard, American Express, RuPay, and Diners Club — processed through a PCI-DSS compliant payment gateway. The house never sees or stores the card number; only a tokenised reference is held for refund processing."
              },
              {
                label: "UPI",
                body:
                  "For purchases within India up to INR 1,00,000. Supported across all UPI-enabled apps."
              },
              {
                label: "Net Banking",
                body:
                  "Direct net-banking payments supported across all major Indian banks."
              },
              {
                label: "Bank Transfer (NEFT / RTGS / Wire)",
                body:
                  "Required for pieces above INR 1,00,000 and for international purchases. Bank details are issued after the piece is confirmed; the order is held for three working days to allow the transfer to clear."
              },
              {
                label: "Wallets",
                body:
                  "Paytm, PhonePe, Google Pay and other major wallets supported at checkout within India."
              }
            ]
          },
          {
            heading: "Pricing",
            paragraphs: [
              "Prices are quoted in Indian Rupees (INR) and United States Dollars (USD) on every piece. The amount charged is the amount displayed in your selected currency — no conversion margin is added by the house.",
              "GST at the applicable rate is included in the Indian Rupee price. For international orders, the price displayed is exclusive of customs duties and local taxes, which are the responsibility of the recipient at destination.",
              "The price displayed at the moment you confirm your order is the price that applies to that order, regardless of any subsequent change."
            ]
          },
          {
            heading: "Two-Part Payment for High-Value & Bespoke Pieces",
            paragraphs: [
              "For bespoke commissions and pieces above INR 2,00,000, the house offers a two-part structure: 50% at order confirmation, 50% before dispatch.",
              "The studio writes to you after a brief conversation to confirm the arrangement; no amount is drawn down until you confirm. The first instalment is non-refundable once production begins."
            ]
          },
          {
            heading: "Currency & International Payments",
            paragraphs: [
              "International bank transfers are received in USD at the exchange rate displayed on your piece page at the time of order. Card payments are processed in the currency selected at checkout.",
              "Your card issuer may apply a foreign-transaction fee. This is set by your bank, not by the house, and is not refundable through us."
            ]
          },
          {
            heading: "Receipts, Invoices & GST",
            paragraphs: [
              "A tax invoice is sent by email the moment payment clears. A printed certificate of provenance accompanies every piece on dispatch.",
              "For business purchases, enter the GSTIN at checkout to receive a GST-compliant invoice with input credit eligibility. Changes to invoice details after dispatch cannot be made."
            ]
          },
          {
            heading: "Payment Security",
            paragraphs: [
              "The checkout runs on PCI-DSS compliant infrastructure provided by a certified payment gateway. All card data is tokenised; the house holds only the reference needed to process refunds.",
              "The site uses TLS encryption end-to-end. Payment pages run under HTTPS without exception. The house will never ask for your full card details, OTP, or UPI PIN by phone, email, or chat."
            ]
          },
          {
            heading: "Failed & Duplicate Payments",
            paragraphs: [
              "If a payment is deducted from your account but the order does not confirm, the amount is auto-reversed by the gateway within three to five working days. If it does not reach you within that window, write to clientcare@theluxeversion.com with the transaction reference and we will trace it with the gateway.",
              "Duplicate payments made due to a page refresh or network error are refunded in full within seven working days of being flagged."
            ]
          },
          {
            heading: "Refunds",
            paragraphs: [
              "Refunds are returned to the original payment method within seven to ten working days of being approved. For bank transfers, the refund is wired to the account from which the original payment was received.",
              "Gateway charges, where levied by the processor on cross-border or non-standard transactions, are not refundable. The underlying piece price is always refunded in full where a refund is due."
            ]
          },
          {
            heading: "Fraud Prevention",
            paragraphs: [
              "The house reserves the right to request additional verification — ID, address, or source of funds — for high-value orders or where the gateway flags a transaction as elevated risk. Orders failing verification are cancelled and refunded in full within ten working days."
            ]
          }
        ]}
        closing={{
          body:
            "A question about a payment, a refund in progress, or a bespoke payment arrangement? Write with your reference number.",
          ctaLabel: "Write to the studio",
          ctaHref: "/contact"
        }}
      />
    </>
  );
}
