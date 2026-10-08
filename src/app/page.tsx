import Link from "next/link";
import { ArrowRight, Flower2, Heart, Leaf, Truck } from "lucide-react";
import {
  Photo,
  ButtonLink,
  Benefits,
  SectionTitle,
} from "@/components/ui/Floral";
import { ProductCard } from "@/components/ProductCard";
import { Testimonials } from "@/components/Testimonials";
import { products } from "@/lib/catalog";
export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <Photo
          name="home-hero"
          alt="An abundant pastel bouquet of pink roses, white hydrangeas and blue delphinium in a sunlit Parisian atelier"
          priority
          sizes="100vw"
          className="home-hero__image"
        />
        <div className="hero-wash" />
        <div className="site-shell home-hero__inner">
          <div className="home-hero__copy">
            <p className="eyebrow">Fresh flowers · Brighter days</p>
            <h1>
              Handcrafted
              <br />
              Bouquets for
              <br />
              <em>Meaningful Moments</em>
            </h1>
            <p className="lead">
              Fresh flowers, artfully arranged to celebrate love,
              <br className="desktop-break" /> life and every special moment —
              delivered with care.
            </p>
            <div className="button-row">
              <ButtonLink href="/shop">Shop bouquets</ButtonLink>
              <ButtonLink href="/shop?sameDay=true" secondary>
                <Truck size={21} />
                Same-day delivery
              </ButtonLink>
            </div>
            <div className="hero-values">
              {[
                {
                  icon: Leaf,
                  title: "Farm-fresh blooms",
                  text: "Sourced with care",
                },
                {
                  icon: Flower2,
                  title: "Custom bouquets",
                  text: "Designed for you",
                },
                {
                  icon: Heart,
                  title: "Wedding flowers",
                  text: "For your big day",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title}>
                  <span className="icon-circle">
                    <Icon size={25} strokeWidth={1.4} />
                  </span>
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <aside className="flower-note">
          <p>
            Flowers make
            <br />
            ordinary days
            <br />
            extraordinary.
          </p>
          <Heart size={20} />
          <span />
        </aside>
        <Link href="/shop?sameDay=true" className="delivery-seal">
          <Truck size={27} strokeWidth={1.3} />
          <span>
            Same-day
            <br />
            delivery
          </span>
          <ArrowRight size={20} />
        </Link>
        <div className="hero-press">
          <div className="site-shell">
            <span className="press-label">A world of inspiration</span>
            <span className="press-name">VOGUE</span>
            <span className="press-name elle">ELLE</span>
            <span className="press-name">Brides</span>
            <span className="press-name house">house beautiful</span>
          </div>
        </div>
      </section>
      <section className="site-shell featured-section" id="fresh-picks">
        <div className="featured-intro">
          <SectionTitle
            eyebrow="Our fresh picks"
            title={
              <>
                Featured
                <br />
                Bouquets
              </>
            }
          >
            Handcrafted with the freshest blooms, and a little of our heart.
            Made to make every moment more beautiful.
          </SectionTitle>
          <ButtonLink href="/shop">Shop all bouquets</ButtonLink>
        </div>
        <div className="featured-products">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} compact />
          ))}
        </div>
      </section>
      <section className="occasion-strip site-shell">
        <div>
          <p className="eyebrow">Flowers for every occasion</p>
          <h2>
            Make Every
            <br />
            Moment Bloom
          </h2>
          <p>
            Big celebrations.
            <br />
            Little just-because moments.
          </p>
        </div>
        {[
          {
            label: "Birthday blooms",
            image: "happy-day",
            href: "/shop?occasion=Birthday",
          },
          {
            label: "Anniversary flowers",
            image: "everlasting-love",
            href: "/shop?occasion=Anniversary",
          },
          { label: "Wedding flowers", image: "cotton-cloud", href: "/wedding" },
          {
            label: "Sympathy flowers",
            image: "pure-elegance",
            href: "/shop?occasion=Sympathy",
          },
          {
            label: "Everyday blooms",
            image: "garden-bliss",
            href: "/shop?occasion=Just%20Because",
          },
        ].map((o) => (
          <Link className="occasion-tile" key={o.label} href={o.href}>
            <Photo
              name={o.image}
              alt={o.label}
              sizes="(max-width: 600px) 60vw, 20vw"
            />
            <div>
              <h3>{o.label}</h3>
              <span className="arrow-circle">
                <ArrowRight size={19} />
              </span>
            </div>
          </Link>
        ))}
      </section>
      <section className="site-shell promo-grid">
        <article className="promo promo--custom">
          <Photo
            name="custom-bouquet"
            alt="A bespoke rose bouquet, tied with a blush satin ribbon"
            sizes="65vw"
          />
          <div className="promo-content">
            <p className="eyebrow">Custom bouquets</p>
            <h2>
              Designed
              <br />
              Just for You
            </h2>
            <p>
              Your vision. Our flowers.
              <br />A one-of-a-kind bouquet, thoughtfully
              <br />
              created for your special moment.
            </p>
            <ButtonLink href="/contact?occasion=Custom%20Bouquet">
              Create a custom bouquet
            </ButtonLink>
          </div>
        </article>
        <article className="promo promo--subscription">
          <Photo
            name="subscription"
            alt="Seasonal flowers in our signature keepsake vase"
            sizes="40vw"
          />
          <div className="promo-content">
            <p className="eyebrow">Flower subscription</p>
            <h2>
              Fresh Flowers
              <br />
              All Year Round
            </h2>
            <p>
              A little beauty, on repeat.
              <br />
              Seasonal blooms delivered
              <br />
              with care, whenever you like.
            </p>
            <ButtonLink href="/subscriptions">Explore subscriptions</ButtonLink>
          </div>
          <span className="price-seal">
            From<strong>$59</strong>/ delivery
          </span>
        </article>
      </section>
      <section className="site-shell why-section">
        <SectionTitle eyebrow="Why choose us" title="More than flowers">
          A more beautiful way to celebrate life.
        </SectionTitle>
        <Benefits />
      </section>
      <section className="site-shell craft-teaser">
        <Photo
          name="craft"
          alt="Our florist carefully arranging fresh pink roses by hand"
        />
        <div>
          <p className="eyebrow">A florist’s hands. An artist’s heart.</p>
          <h2>
            Every petal has
            <br />a little <em>purpose.</em>
          </h2>
          <p>
            We believe a bouquet should feel as special as the person receiving
            it. So we choose each stem with care, arrange it with intention, and
            send it with love.
          </p>
          <Link href="/about" className="text-link">
            Discover our story <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <Testimonials />
    </main>
  );
}
