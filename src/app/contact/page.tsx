import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";
import { Benefits, Photo } from "@/components/ui/Floral";
import { faqs } from "@/lib/faqs";
export const metadata: Metadata = { title: "Contact & Custom Bouquets" };
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialOccasion =
    typeof params.occasion === "string" ? params.occasion : "";
  const extras = [
    params.package,
    params.service,
    params.plan,
    params.cadence,
  ].filter((v): v is string => typeof v === "string");
  const initialMessage = extras.length
    ? `I’d love to know more about ${extras.join(" · ")}. `
    : "";
  return (
    <main>
      <section className="contact-hero">
        <Photo
          name="home-hero"
          alt="Pastel roses and hydrangeas in our floral atelier"
          priority
          sizes="100vw"
        />
        <div className="site-shell contact-grid">
          <div className="contact-copy">
            <p className="eyebrow">Let’s create something beautiful</p>
            <h1>
              Contact Us or
              <em>
                Request a<br />
                Custom Bouquet
              </em>
            </h1>
            <p className="lead">
              Have a special moment in mind? We’d love to bring your floral
              vision to life. Get in touch with our team, and we’ll create
              something truly meaningful, just for you.
            </p>
            <Benefits compact />
          </div>
          <InquiryForm
            initialOccasion={initialOccasion}
            initialMessage={initialMessage}
          />
        </div>
      </section>
      <section className="site-shell contact-details">
        <div className="contact-info">
          <p className="eyebrow">Get in touch</p>
          <h2>
            We’re Here
            <br />
            for You
          </h2>
          <p>
            Questions, special requests or a little floral inspiration — we’re
            always happy to help.
          </p>
          {[
            {
              icon: Phone,
              title: "+33 1 42 56 78 90",
              text: "Mon–Sat, 9 AM–7 PM",
              href: "tel:+33142567890",
            },
            {
              icon: Mail,
              title: "hello@lamedesfleurs.com",
              text: "For all your floral questions",
              href: "mailto:hello@lamedesfleurs.com",
            },
            {
              icon: MapPin,
              title: "123 Blossom Lane",
              text: "Paris, FR 75007",
            },
            {
              icon: Clock3,
              title: "Boutique hours",
              text: "Mon–Sat: 9 AM–7 PM · Sun: 10 AM–5 PM",
            },
          ].map(({ icon: Icon, title, text, href }) => (
            <div className="contact-line" key={title}>
              <span className="icon-circle">
                <Icon />
              </span>
              <div>
                {href ? (
                  <a href={href}>
                    <strong>{title}</strong>
                  </a>
                ) : (
                  <p>
                    <strong>{title}</strong>
                  </p>
                )}
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
        <Photo
          name="boutique"
          alt="The blush pink L’Âme des Fleurs boutique surrounded by flowering branches"
          className="boutique-photo"
        />
        <div className="faq-panel">
          <p className="eyebrow">Frequently asked questions</p>
          <h2>Quick Answers</h2>
          {faqs.slice(0, 3).map((f) => (
            <details key={f.question}>
              <summary>{f.question}</summary>
              <p>{f.answer}</p>
            </details>
          ))}
          <Link className="text-link" href="/care#faqs">
            View all questions <span>→</span>
          </Link>
        </div>
      </section>
      <div className="site-shell editorial-benefits">
        <Benefits />
      </div>
    </main>
  );
}
