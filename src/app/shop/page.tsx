import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopCatalog } from "@/components/ShopCatalog";
import { Breadcrumb, Photo } from "@/components/ui/Floral";
export const metadata: Metadata = {
  title: "Shop Bouquets",
  description:
    "Explore handcrafted bouquets. Find flowers by occasion, color, collection and same-day availability.",
};
export default function Shop() {
  return (
    <main>
      <section className="shop-hero">
        <Photo
          name="home-hero"
          alt="Soft pink roses in our sunlit floral atelier"
          className="shop-hero__image"
          priority
          sizes="100vw"
        />
        <div className="site-shell">
          <Breadcrumb items={[{ label: "Shop" }]} />
          <h1>
            Shop <em>Bouquets</em>
          </h1>
          <p>
            Handcrafted with the freshest blooms.
            <br />
            Designed to make every moment more beautiful.
          </p>
        </div>
      </section>
      <Suspense
        fallback={
          <div className="site-shell loading-state">
            Gathering your flowers…
          </div>
        }
      >
        <ShopCatalog />
      </Suspense>
    </main>
  );
}
