import type { Metadata } from "next";
import {
  Benefits,
  ButtonLink,
  EditorialHero,
  Photo,
  SectionTitle,
} from "@/components/ui/Floral";
export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Meet the heart behind L’Âme des Fleurs. Thoughtful floristry, meaningful gifting and a brighter tomorrow.",
};
export default function About() {
  return (
    <main>
      <EditorialHero
        eyebrow="About us"
        title={
          <>
            Our Story
            <br />
            <em>
              Blooms with a<br />
              Deeper Meaning
            </em>
          </>
        }
        image="about-hero"
        alt="A florist creating a bouquet in the L’Âme des Fleurs atelier"
        quote="Flowers make ordinary days extraordinary."
        actions={<ButtonLink href="/shop">Explore our collections</ButtonLink>}
      >
        L’Âme des Fleurs was born from a simple belief — flowers have the power
        to make ordinary days extraordinary. We create thoughtful, artful
        bouquets to celebrate love, life and every meaningful moment.
      </EditorialHero>
      <div className="site-shell editorial-benefits">
        <Benefits />
      </div>
      <section className="site-shell story-grid">
        <article className="story-card story-card--blue">
          <Photo
            name="craft"
            alt="Careful hands arranging pink roses and fresh hydrangeas"
          />
          <div>
            <p className="eyebrow">Our craft</p>
            <h2>
              From Petal to
              <br />
              <em>Perfect Moment</em>
            </h2>
            <p>
              Every bouquet is a harmony of nature’s finest blooms and our
              florist’s artistic touch. We handpick each stem, thoughtfully
              arrange every detail, and wrap with care — because beauty lives in
              the details.
            </p>
            <ButtonLink href="/contact?occasion=Custom%20Bouquet">
              Create something personal
            </ButtonLink>
          </div>
        </article>
        <article className="story-card" id="sourcing">
          <Photo
            name="sustainable"
            alt="A thoughtfully wrapped bouquet with a kraft paper gift tag"
          />
          <div>
            <p className="eyebrow">Thoughtfully sourced blooms</p>
            <h2>
              A Kinder Tomorrow
              <br />
              in Every Bouquet
            </h2>
            <p>
              Our aim is simple: choose with care and waste less. We favor
              seasonal blooms, build lasting relationships with growers, and
              look for thoughtful packaging choices. It’s a journey we keep
              growing into, one bouquet at a time.
            </p>
            <ButtonLink href="/care#flower-care">
              Make your blooms last
            </ButtonLink>
          </div>
        </article>
      </section>
      <section className="site-shell story-belief">
        <div>
          <p className="eyebrow">Why we create</p>
          <h2>
            Flowers for a<br />
            <em>More Beautiful World</em>
          </h2>
          <p>
            We create flowers to celebrate people, to mark life’s moments, and
            to spread more kindness and beauty in the world. Every bouquet is a
            small reminder to slow down, appreciate the present, and find joy in
            the little things.
          </p>
          <p>
            Love. People. Moments.
            <br />A kinder tomorrow.
          </p>
          <ButtonLink href="/shop">Find a little beauty</ButtonLink>
        </div>
        <Photo
          name="rose-detail"
          alt="The delicate petals of a blush pink garden rose"
        />
      </section>
      <section className="journey">
        <div className="site-shell">
          <SectionTitle eyebrow="Our journey" title="A Story in Bloom" />
          <div className="timeline">
            {[
              {
                year: "The beginning",
                title: "A Simple Belief",
                text: "A love of flowers and a dream to spread more joy.",
              },
              {
                year: "Our craft",
                title: "Growing Together",
                text: "An eye for beauty, a passion for detail and flowers for every moment.",
              },
              {
                year: "Our promise",
                title: "A Kinder Tomorrow",
                text: "Thoughtful choices, seasonal blooms and an ever-growing commitment to care.",
              },
              {
                year: "What’s next",
                title: "Still Blooming",
                text: "More stories to tell. More moments to make beautiful.",
              },
            ].map((item) => (
              <div key={item.year}>
                <span className="year">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
