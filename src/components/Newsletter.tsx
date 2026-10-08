"use client";
import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import { Photo } from "./ui/Floral";
export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please try again.");
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Please try again.");
      setStatus("idle");
    }
  }
  return (
    <section
      className="newsletter newsletter--reference"
      aria-label="Stay in bloom"
    >
      <Photo
        name="newsletter-floral-corner"
        alt=""
        className="newsletter__flowers"
        sizes="(max-width: 800px) 300px, 600px"
      />
      <div className="site-shell newsletter__inner">
        <div>
          <p className="eyebrow">Stay in bloom</p>
          <h2>
            Join Our <em>Flower Journey</em>
          </h2>
          <p>
            Be the first to discover new collections, seasonal blooms and
            special offers — because beautiful moments are always in season.
          </p>
        </div>
        {status === "done" ? (
          <div className="newsletter-success" role="status">
            <Check />
            <h3>You’re part of our flower journey.</h3>
            <p>Thank you. Your subscription has been saved.</p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="newsletter-field">
              <Mail size={21} />
              <input
                name="email"
                type="email"
                required
                placeholder="Your email address"
                aria-label="Email address"
              />
              <button
                className="button button--primary"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Joining…" : "Subscribe"}
                <ArrowRight size={18} />
              </button>
            </div>
            <label className="consent">
              <input name="consent" type="checkbox" required />
              Yes, I’d like to receive floral inspiration, exclusive offers and
              more from L’Âme des Fleurs.
            </label>
            <input
              className="honeypot"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
