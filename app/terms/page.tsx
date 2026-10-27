import type { Metadata } from "next";
import { InfoPageHero } from "@/components/info/info-page-hero";
import { InfoPageProse } from "@/components/info/info-page-prose";

export const metadata: Metadata = {
  title: "Terms & Conditions — The Luxe Version",
  description:
    "The terms that govern the use of this website and the purchase of pieces from The Luxe Version."
};

export default function TermsPage() {
  return (
    <>
      <InfoPageHero
        kicker="The Fine Print"
        title="Terms & Conditions"
        lede="The understanding between the house and the person placing an order. Written plainly; applies to every piece sold through this site."
        image="/images/banners/sculpture.png"
      />
      <InfoPageProse
        lastUpdated="October 2026"
        sections={[
          {
            heading: "Acceptance of Terms",
            paragraphs: [
              "By accessing this website or placing an order through it, you agree to be bound by these terms. If any part is unacceptable to you, please do not use the site or place an order.",
              "These terms sit alongside the Privacy Policy, Shipping Policy, Payment Policy, Return, Refund & Replacement Policy, and Cancellation Policy — each linked in the footer and incorporated here by reference."
            ]
          },
          {
            heading: "The House",
            paragraphs: [
              "The site is operated by The Luxe Version Private Limited, incorporated in India with its registered office at 5th Floor, Unit N° 505, UB City, 24 Vittal Mallya Road, Bengaluru 560001. GSTIN and CIN appear on every tax invoice we issue.",
              "Communication regarding these terms should be directed to legal@theluxeversion.com or in writing to the registered office."
            ]
          },
          {
            heading: "Eligibility",
            paragraphs: [
              "You must be at least 18 years of age and capable of entering into a legally binding contract under the laws of your jurisdiction to place an order through this site.",
              "If you are placing an order on behalf of a company or firm, you confirm that you are authorised to bind that entity to these terms."
            ]
          },
          {
            heading: "Account & Access",
            bullets: [
              {
                label: "Credentials",
                body:
                  "If you create an account, you are responsible for keeping your sign-in details confidential and for any activity under your account."
              },
              {
                label: "Accuracy",
                body:
                  "You agree that the information you provide — name, delivery address, contact details — is accurate and current. Orders delayed or returned due to incorrect details are not the house's responsibility."
              },
              {
                label: "Suspension",
                body:
                  "The house may suspend or close an account where it is used in breach of these terms, or where fraudulent or abusive activity is suspected."
              }
            ]
          },
          {
            heading: "Products & Pricing",
            paragraphs: [
              "Every piece is photographed, described, and dimensioned as accurately as possible. Handmade pieces vary slightly from the photograph; this is noted on the piece page and is a feature of the work, not a defect.",
              "Prices are quoted in Indian Rupees and United States Dollars. The price displayed at the moment you confirm the order is the price that applies to that order, inclusive of GST. Shipping, duties, and taxes outside India are charged separately."
            ]
          },
          {
            heading: "Order Confirmation",
            paragraphs: [
              "Submitting a checkout constitutes an offer to purchase, not a confirmed contract. The contract is formed only when the studio issues an order confirmation by email — within one working day.",
              "The house reserves the right to decline or cancel an order where the piece is sold out, mispriced due to an evident error, or where fulfilment is not possible. In every such case, any amount paid is refunded in full within ten working days."
            ]
          },
          {
            heading: "Intellectual Property",
            paragraphs: [
              "Every photograph, drawing, piece of writing, and the designs of the pieces themselves are the property of The Luxe Version Private Limited or the maker commissioned to create them.",
              "You may share the house's editorial writing and photography with a credit and a link to the source. Reproduction for commercial use, resale, catalogues, or training generative models requires a written licence from the house."
            ]
          },
          {
            heading: "Permitted Use",
            bullets: [
              "The site may be used for personal, non-commercial browsing and ordering only.",
              "You agree not to scrape, mirror, disassemble, or reverse-engineer any part of the site.",
              "You agree not to upload malicious code, attempt to disrupt the site, or circumvent its security measures.",
              "Automated access, aggregation of listings, or republication of pricing data is prohibited without written consent."
            ]
          },
          {
            heading: "Limitation of Liability",
            paragraphs: [
              "The house's liability for any single order is limited to the amount paid for that order. The house is not liable for indirect, incidental, or consequential loss — including loss of profit, data, or goodwill — arising from the use of this site or the pieces sold through it.",
              "Nothing in these terms excludes liability for death or personal injury caused by negligence, or any other liability that cannot be excluded under applicable law."
            ]
          },
          {
            heading: "Indemnity",
            paragraphs: [
              "You agree to indemnify The Luxe Version Private Limited against any third-party claim arising from your breach of these terms or your misuse of the site."
            ]
          },
          {
            heading: "Force Majeure",
            paragraphs: [
              "Neither party is liable for delay or non-performance caused by an event beyond its reasonable control — including natural disaster, war, civil unrest, strike, government action, or any failure of common carriers or utilities."
            ]
          },
          {
            heading: "Governing Law & Jurisdiction",
            paragraphs: [
              "These terms and any order placed through this site are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts of Bengaluru."
            ]
          },
          {
            heading: "Changes to These Terms",
            paragraphs: [
              "The house may revise these terms from time to time. The current version is always the one published at this URL; the last-updated stamp above records when it was last changed. Continued use of the site after a change constitutes acceptance of the revised terms."
            ]
          }
        ]}
        closing={{
          body:
            "A question about these terms, a licensing enquiry, or a legal notice? Write to legal@theluxeversion.com or through the Contact page.",
          ctaLabel: "Write to the studio",
          ctaHref: "/contact"
        }}
      />
    </>
  );
}
