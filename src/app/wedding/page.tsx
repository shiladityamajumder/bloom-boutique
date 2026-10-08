import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import {
  ButtonLink,
  EditorialHero,
  Photo,
  SectionTitle,
} from "@/components/ui/Floral";
export const metadata: Metadata = {
  title: "Wedding Flowers",
  description:
    "Bespoke bridal bouquets, ceremony styling and reception florals for your happily ever after.",
};
const services = [
  {
    title: "Bridal Bouquets",
    image: "blush-serenity",
    text: "Romantic, handcrafted bouquets designed to reflect your unique love story.",
  },
  {
    title: "Reception Centerpieces",
    image: "reception",
    text: "Elegant florals that transform your venue and set the perfect atmosphere.",
  },
  {
    title: "Ceremony Styling",
    image: "ceremony",
    text: "Breathtaking floral installations for your unforgettable “I do” moment.",
  },
  {
    title: "Custom Consultations",
    image: "consultation",
    text: "Bring your dream wedding to life with a personal floral design experience.",
  },
];
const packages = [
  {
    name: "The Essential",
    line: "Beautiful beginnings",
    price: "$2,500+",
    image: "blush-serenity",
    items: [
      "Bridal bouquet & boutonnière",
      "Ceremony floral accents",
      "Reception centerpieces (up to 8)",
      "Personal color palette consultation",
    ],
  },
  {
    name: "The Signature",
    line: "A more beautiful day",
    price: "$4,500+",
    image: "wedding-arch",
    items: [
      "Bridal party flowers",
      "Ceremony arch or installation",
      "Reception centerpieces (up to 15)",
      "Aisle, signage & accent florals",
    ],
  },
  {
    name: "The Bespoke",
    line: "Your love, uniquely yours",
    price: "$7,500+",
    image: "reception",
    items: [
      "Fully customized floral design",
      "Ceremony & reception styling",
      "Large-scale floral installations",
      "Premium blooms & rare varieties",
    ],
  },
];
export default function Wedding() {
  return (
    <main>
      <EditorialHero
        eyebrow="Wedding flowers · Love in full bloom"
        title={
          <>
            Wedding Flowers for
            <br />
            <em>Your Happily Ever After</em>
          </>
        }
        image="wedding-hero"
        alt="A bride holding a romantic pastel bouquet beneath a floral wedding arch"
        quote="Flowers turn moments into forever."
        actions={
          <>
            <ButtonLink href="/contact?occasion=Wedding">
              Book a floral consultation
            </ButtonLink>
            <ButtonLink href="#packages" secondary>
              View wedding packages
            </ButtonLink>
          </>
        }
      >
        From the aisle to the reception, we create breathtaking floral designs
        that tell your love story — with beauty, meaning and heart.
      </EditorialHero>
      <section className="site-shell wedding-services">
        {services.map((s) => (
          <article className="service-card" key={s.title}>
            <Photo
              name={s.image}
              alt={s.title}
              sizes="(max-width: 800px) 50vw, 25vw"
            />
            <div>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
              <Link
                className="text-link"
                href={`/contact?occasion=Wedding&service=${encodeURIComponent(s.title)}`}
              >
                Let’s dream together <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <section className="site-shell wedding-gallery" id="gallery">
        <div className="section-header">
          <SectionTitle
            eyebrow="A little wedding inspiration"
            title={
              <>
                Beautiful Flowers.
                <br />
                <em>Beautiful Love Stories.</em>
              </>
            }
          >
            A glimpse of the floral moments we can create together.
          </SectionTitle>
          <Link className="text-link" href="/contact?occasion=Wedding">
            Let’s imagine your day <ArrowRight size={17} />
          </Link>
        </div>
        <div className="gallery-grid">
          {[
            { image: "wedding-hero", alt: "Romantic bridal bouquet" },
            {
              image: "reception",
              alt: "Candlelit reception with pastel rose centerpieces",
            },
            {
              image: "wedding-arch",
              alt: "Flowers framing a seaside wedding ceremony",
            },
            {
              image: "ceremony",
              alt: "A floral wedding arch overlooking the sea",
            },
          ].map((g) => (
            <Photo
              key={g.image}
              name={g.image}
              alt={g.alt}
              sizes="(max-width: 600px) 50vw, 25vw"
            />
          ))}
        </div>
      </section>
      <section className="site-shell packages" id="packages">
        <SectionTitle
          eyebrow="Thoughtfully designed for your day"
          title="Wedding Floral Packages"
          centered
        >
          Beautiful starting points, with the freedom to make them entirely
          yours.
        </SectionTitle>
        <div className="packages-grid">
          {packages.map((p, i) => (
            <article
              className={`package-card ${i === 1 ? "featured" : ""}`}
              key={p.name}
            >
              <Photo
                name={p.image}
                alt={p.name + " wedding flowers"}
                sizes="(max-width: 600px) 100vw, 33vw"
              />
              {i === 1 && (
                <span className="package-label">Our signature experience</span>
              )}
              <div>
                <h3>{p.name}</h3>
                <p className="eyebrow">{p.line}</p>
                <p className="package-price">
                  {p.price} <small>starting from</small>
                </p>
                <ul>
                  {p.items.map((item) => (
                    <li key={item}>
                      <Check size={17} />
                      {item}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={`/contact?occasion=Wedding&package=${encodeURIComponent(p.name)}`}
                >
                  Enquire about this package
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
        <p className="form-note centered">
          Packages are starting estimates. Your final quote depends on date,
          venue, flower selection and scope.
        </p>
      </section>
      <section className="wedding-process">
        <div className="site-shell">
          <SectionTitle
            eyebrow="Your journey with us"
            title="From a Dream to ‘I Do’"
            centered
          />
          <div className="process-grid">
            {[
              {
                title: "Let’s get to know you",
                text: "Share your story, your date and the little details that matter to you.",
              },
              {
                title: "We dream in flowers",
                text: "Together, we shape your palette and create a floral proposal for your celebration.",
              },
              {
                title: "Your day, in full bloom",
                text: "We carefully arrange, deliver and style every detail, so you can enjoy the moment.",
              },
            ].map((p, i) => (
              <div key={p.title}>
                <span>0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
