import type { Metadata } from "next";
import { Benefits, EditorialHero, SectionTitle } from "@/components/ui/Floral";
import { SubscriptionPlans } from "@/components/SubscriptionPlans";
export const metadata: Metadata = { title: "Flower Subscriptions" };
export default function Subscriptions() {
  return (
    <main>
      <EditorialHero
        eyebrow="A little beauty, on repeat"
        title={
          <>
            Fresh Flowers
            <br />
            <em>All Year Round</em>
          </>
        }
        image="subscription"
        alt="A seasonal pastel bouquet in a signature floral vase"
      >
        Welcome the changing seasons with fresh flowers, thoughtfully selected
        and arranged just for you. Choose your bouquet and your rhythm — we’ll
        help with the rest.
      </EditorialHero>
      <section className="site-shell subscription-plans">
        <SectionTitle
          eyebrow="Your flowers. Your rhythm."
          title="Find Your Kind of Beautiful"
          centered
        >
          Three lovely ways to make room for flowers in your everyday.
        </SectionTitle>
        <SubscriptionPlans />
      </section>
      <div className="site-shell editorial-benefits">
        <Benefits />
      </div>
    </main>
  );
}
