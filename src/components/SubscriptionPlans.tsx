"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { ButtonLink, Photo } from "./ui/Floral";
const plans = [
  {
    name: "A Little Joy",
    price: 59,
    image: "sunlit-meadow",
    text: "A sweet seasonal gathering to brighten a little corner of your world.",
    items: [
      "A petite seasonal bouquet",
      "Freshly selected by your florist",
      "Our signature wrap & care guide",
    ],
  },
  {
    name: "The Everyday Beautiful",
    price: 89,
    image: "blush-serenity",
    text: "Our signature bouquet, for making ordinary days feel extraordinary.",
    items: [
      "A generous signature bouquet",
      "An evolving seasonal color palette",
      "Complimentary handwritten gift card",
    ],
  },
  {
    name: "The Grand Gesture",
    price: 119,
    image: "blue-reverie",
    text: "An abundant arrangement, filled with the most beautiful blooms of the season.",
    items: [
      "A grand seasonal arrangement",
      "Premium flowers & rich textures",
      "A beautiful gift, or a gift to yourself",
    ],
  },
];
export function SubscriptionPlans() {
  const [cadence, setCadence] = useState("Monthly");
  return (
    <>
      <fieldset className="size-options subscription-cadence">
        <legend>How often would you like a little beauty?</legend>
        {["Weekly", "Fortnightly", "Monthly"].map((c) => (
          <label
            key={c}
            className={`size-option ${cadence === c ? "selected" : ""}`}
          >
            <input
              type="radio"
              name="cadence"
              checked={cadence === c}
              onChange={() => setCadence(c)}
            />
            {c}
          </label>
        ))}
      </fieldset>
      <div className="packages-grid">
        {plans.map((p, i) => (
          <article
            key={p.name}
            className={`package-card ${i === 1 ? "featured" : ""}`}
          >
            <Photo
              name={p.image}
              alt={p.name + " subscription bouquet"}
              sizes="(max-width: 600px) 100vw, 33vw"
            />
            {i === 1 && (
              <span className="package-label">Our signature choice</span>
            )}
            <div>
              <h3>{p.name}</h3>
              <p className="package-price">
                ${p.price} <small>/ delivery</small>
              </p>
              <p>{p.text}</p>
              <ul>
                {p.items.map((item) => (
                  <li key={item}>
                    <Check size={16} />
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={`/contact?occasion=Subscription&plan=${encodeURIComponent(p.name)}&cadence=${cadence}`}
              >
                Enquire about this plan
              </ButtonLink>
            </div>
          </article>
        ))}
      </div>
      <p className="form-note centered">
        Plans are confirmed personally. Delivery is quoted separately. No
        automatic payment or commitment is made on this website.
      </p>
    </>
  );
}
