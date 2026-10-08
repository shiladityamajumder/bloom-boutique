import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Terms of Service" };
export default function Terms() {
  return (
    <main className="site-shell">
      <div className="page-heading">
        <p className="eyebrow">A little clarity</p>
        <h1>
          Terms <em>of Service.</em>
        </h1>
        <p>Helpful information about enquiries, flowers and order requests.</p>
      </div>
      <div className="prose">
        <section>
          <h2>Inquiries and order requests</h2>
          <p>
            Submitting the checkout form creates an order request. It is not a
            confirmed purchase, payment or delivery booking. A florist needs to
            confirm availability, delivery, final pricing and payment
            arrangements before an order is accepted. No card details are
            collected or payment taken on this website.
          </p>
        </section>
        <section>
          <h2>Our bouquets</h2>
          <p>
            Flowers are seasonal, natural products. Photos illustrate the
            bouquet’s style, palette and size; individual stems can vary.
            Significant substitutions should be agreed with you. Catalogue
            prices are shown in USD and delivery charges are estimates until
            confirmed. Wedding package and subscription prices are starting
            estimates.
          </p>
        </section>
        <section>
          <h2>Delivery and changes</h2>
          <p>
            Same-day requests depend on the delivery address, submission time
            and stock. Made-to-order arrangements need advance notice. Contact
            the florist directly for urgent changes or cancellations. Applicable
            consumer rights are unaffected. See our{" "}
            <Link href="/care">customer care page</Link> for guidance.
          </p>
        </section>
        <section>
          <h2>Contact and business details</h2>
          <p>
            Contact information and boutique details follow the supplied design.
            The business operator must verify these details and complete its
            legal and commercial policies before launch. For enquiries, use the{" "}
            <Link href="/contact">contact form</Link> or{" "}
            <a href="mailto:hello@lamedesfleurs.com">hello@lamedesfleurs.com</a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
