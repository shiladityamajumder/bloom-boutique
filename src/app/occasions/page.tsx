import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Benefits,
  ButtonLink,
  EditorialHero,
  Photo,
} from "@/components/ui/Floral";
import { occasions } from "@/lib/catalog";
import { Testimonials } from "@/components/Testimonials";
export const metadata: Metadata = { title: "Flowers for Every Occasion" };
export default function Occasions() {
  return (
    <main>
      <EditorialHero
        eyebrow="Life’s moments, made brighter"
        title={
          <>
            Flowers for
            <br />
            <em>Every Occasion</em>
          </>
        }
        image="home-hero"
        alt="A joyful pastel bouquet in a sunlit floral atelier"
        quote="Different moments. The same beautiful feeling."
      >
        Thoughtfully designed bouquets for life’s most special moments — because
        every occasion deserves flowers.
      </EditorialHero>
      <section className="site-shell occasion-grid">
        {occasions.map((o) => (
          <Link
            key={o.name}
            className="occasion-card"
            href={`/shop?occasion=${encodeURIComponent(o.name)}`}
          >
            <Photo
              name={o.image}
              alt={`${o.name} bouquet`}
              sizes="(max-width: 800px) 50vw, 25vw"
            />
            <div>
              <h2>
                {o.name}
                <br />
                Flowers
              </h2>
              <p>{o.text}</p>
              <span className="small-button">
                Shop{" "}
                {o.name === "Love & Romance" ? "romance" : o.name.toLowerCase()}
                <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </section>
      <section className="site-shell gifting-banner">
        <div>
          <p className="eyebrow">Need a little inspiration?</p>
          <h2>
            Find the <em>Perfect Gift</em>
          </h2>
          <p>
            Not sure which bouquet fits the moment? Tell us a little about the
            person you’re celebrating. Our florists will help you choose
            something truly special.
          </p>
        </div>
        <ButtonLink href="/contact?occasion=Gifting%20Help">
          Get gifting help
        </ButtonLink>
      </section>
      <div className="site-shell editorial-benefits">
        <Benefits />
      </div>
      <Testimonials />
    </main>
  );
}
