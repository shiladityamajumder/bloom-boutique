"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { SectionTitle } from "./ui/Floral";
// Customer-story copy supplied in the reference design. Verify before a commercial launch.
const stories = [
  {
    name: "Sophia L.",
    location: "New York, NY",
    initials: "SL",
    text: "Absolutely stunning flowers! The bouquet was even more beautiful in person and arrived fresh and right on time.",
  },
  {
    name: "Daniel M.",
    location: "Los Angeles, CA",
    initials: "DM",
    text: "The most elegant arrangement I’ve ever received. L’Âme des Fleurs never fails to impress!",
  },
  {
    name: "Emily R.",
    location: "Chicago, IL",
    initials: "ER",
    text: "Beautiful flowers, amazing service, and such thoughtful attention to detail. Truly a premium experience.",
  },
];
export function Testimonials() {
  const [first, setFirst] = useState(0);
  const visible = stories.map((_, i) => stories[(first + i) % stories.length]);
  return (
    <section className="site-shell testimonials">
      <SectionTitle
        eyebrow="Kind words"
        title={
          <>
            Loved by
            <br />
            Our Customers
          </>
        }
      >
        Real moments. Small smiles. Beautiful flowers.
      </SectionTitle>
      <div className="testimonial-grid" aria-live="polite">
        {visible.map((story) => (
          <article className="testimonial-card" key={story.name}>
            <span className="testimonial-quote" aria-hidden="true">
              “
            </span>
            <div
              className="review-stars"
              role="img"
              aria-label="5 out of 5 stars"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <Star size={11} key={i} fill="currentColor" />
              ))}
            </div>
            <blockquote>{story.text}</blockquote>
            <div className="testimonial-author">
              <span>{story.initials}</span>
              <div>
                <strong>{story.name}</strong>
                <small>{story.location}</small>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="testimonial-controls">
        <button
          className="arrow-circle"
          aria-label="Previous customer story"
          onClick={() =>
            setFirst((i) => (i + stories.length - 1) % stories.length)
          }
        >
          <ArrowLeft size={18} />
        </button>
        <button
          className="arrow-circle"
          aria-label="Next customer story"
          onClick={() => setFirst((i) => (i + 1) % stories.length)}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
