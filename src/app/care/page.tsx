import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Floral";
import { faqs } from "@/lib/faqs";
export const metadata: Metadata = { title: "Flower Care & Customer Help" };
export default function Care() {
  return (
    <main className="site-shell">
      <div className="page-heading">
        <Breadcrumb items={[{ label: "Customer care" }]} />
        <p className="eyebrow">A little care goes a long way</p>
        <h1>
          Here for <em>You & Your Blooms.</em>
        </h1>
        <p>
          Helpful answers, thoughtful delivery and flowers that last a little
          longer.
        </p>
      </div>
      <div className="prose-layout">
        <nav className="prose-nav" aria-label="Customer care topics">
          <a href="#tracking">Track your order</a>
          <a href="#delivery">Delivery information</a>
          <a href="#returns">Returns & concerns</a>
          <a href="#flower-care">Flower care guide</a>
          <a href="#faqs">Frequently asked questions</a>
        </nav>
        <div className="prose">
          <section id="tracking">
            <h2>Track your order</h2>
            <p>
              For an update on your flowers, share your order reference with our
              florists. They can confirm your request, arrangement and delivery
              details.
            </p>
            <p>
              <Link href="/contact?occasion=Delivery%20Question&service=Order%20update">
                Ask about your order
              </Link>{" "}
              or call <a href="tel:+33142567890">+33 1 42 56 78 90</a>.
            </p>
          </section>
          <section id="delivery">
            <h2>A Thoughtful Delivery</h2>
            <p>
              Our catalogue is designed for delivery in Paris and nearby areas.
              Same-day delivery can be requested for eligible bouquets before 1
              PM, Paris time, subject to availability. Made-to-order bouquets
              need at least 48 hours. A florist must confirm your address,
              delivery date and flower availability before any order is final.
            </p>
            <p>
              Estimated delivery is $12, or complimentary when the bouquet
              subtotal is $150 or more. Prices are shown in USD to follow the
              supplied design; your final quote confirms the currency and any
              applicable charges. Contact us for wedding installations or
              deliveries outside our usual area.
            </p>
            <p>
              This website currently saves order requests. It does not take
              payment, book couriers or guarantee a delivery slot.{" "}
              <Link href="/contact?occasion=Delivery%20Question">
                Ask us about your delivery.
              </Link>
            </p>
          </section>
          <section id="returns">
            <h2>Every Bloom Matters</h2>
            <p>
              If your flowers arrive damaged or something is wrong, contact us
              as soon as possible with your order reference and photographs so
              we can review the concern. Flowers are perishable and cannot be
              returned like ordinary goods; any proposed replacement or refund
              will be discussed individually, subject to your applicable
              consumer rights.
            </p>
            <p>
              For an order request that has not yet been confirmed, simply
              contact us to change or withdraw it. Changes after confirmation
              depend on preparation and delivery progress.
            </p>
          </section>
          <section id="flower-care">
            <h2>Keep Your Blooms Beautiful</h2>
            <ol>
              <li>
                Unwrap your bouquet gently. Choose a clean vase with fresh,
                room-temperature water.
              </li>
              <li>
                Trim 1–2 cm from each stem at an angle using clean, sharp
                scissors.
              </li>
              <li>
                Remove leaves below the waterline. Use the flower food supplied
                with your bouquet.
              </li>
              <li>
                Refresh the water and rinse the vase every two days. Give the
                stems another small trim.
              </li>
              <li>
                Choose a cool place away from direct sunlight, heat, draughts
                and ripening fruit.
              </li>
              <li>
                Remove fading blooms as they appear so the rest of your flowers
                stay fresh.
              </li>
            </ol>
            <p>
              Keep flowers and flower food out of reach of children and pets.
              Some flowers, especially lilies, are unsafe for cats. Tell your
              florist if your bouquet is going to a home with pets so we can
              help you choose an appropriate arrangement.
            </p>
          </section>
          <section id="faqs">
            <h2>A Few Quick Answers</h2>
            <div className="faq-list">
              {faqs.map((f) => (
                <details key={f.question}>
                  <summary>{f.question}</summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
