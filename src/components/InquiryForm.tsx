"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { occasions } from "@/lib/catalog";
export function InquiryForm({
  initialOccasion = "",
  initialMessage = "",
}: {
  initialOccasion?: string;
  initialMessage?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Please try again.");
      setReference(result.reference);
      setStatus("done");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Your inquiry could not be saved. Please try again.",
      );
      setStatus("idle");
    }
  }
  const options = [
    ...occasions.map((o) => o.name),
    "Wedding",
    "Custom Bouquet",
    "Subscription",
    "Gifting Help",
    "Delivery Question",
    "Other",
  ];
  if (status === "done")
    return (
      <div className="form-success" role="status">
        <Check />
        <p className="eyebrow">A beautiful beginning</p>
        <h2>Your vision is in good hands.</h2>
        <p>
          Your inquiry has been saved. Keep your reference below, or reach us
          directly for a time-sensitive request.
        </p>
        <p className="reference">Inquiry reference: {reference}</p>
        <a className="text-link" href="mailto:hello@lamedesfleurs.com">
          hello@lamedesfleurs.com
          <ArrowRight size={17} />
        </a>
      </div>
    );
  return (
    <form className="inquiry-form" onSubmit={submit}>
      <p className="eyebrow">Custom bouquet inquiry</p>
      <h2>
        Tell Us About Your
        <br />
        Dream Bouquet
      </h2>
      <div className="form-grid">
        <label className="field">
          <span>
            Full name <b>*</b>
          </span>
          <input
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            placeholder="Your full name"
          />
        </label>
        <label className="field">
          <span>
            Email address <b>*</b>
          </span>
          <input
            type="email"
            name="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>
        <label className="field">
          <span>Phone number</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            maxLength={40}
            placeholder="+33 …"
          />
        </label>
        <label className="field">
          <span>
            Occasion <b>*</b>
          </span>
          <select
            name="occasion"
            required
            defaultValue={
              options.includes(initialOccasion) ? initialOccasion : ""
            }
          >
            <option value="" disabled>
              Select an occasion
            </option>
            {options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="field field--full">
          <span>Floral preferences</span>
          <input
            name="preferences"
            maxLength={500}
            placeholder="Roses, peonies, pastel colors, wildflowers…"
          />
        </label>
        <label className="field">
          <span>Preferred delivery or event date</span>
          <input type="date" name="date" min={today} />
        </label>
        <label className="field">
          <span>
            Your message <b>*</b>
          </span>
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={3000}
            rows={3}
            defaultValue={initialMessage}
            placeholder="Tell us about your vision, budget or a special detail…"
          />
        </label>
      </div>
      <input
        className="honeypot"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <label className="consent">
        <input name="consent" type="checkbox" required />I agree to the{" "}
        <Link href="/privacy" className="text-button">
          privacy policy
        </Link>{" "}
        and the use of my details to respond to this inquiry.
      </label>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button
        className="button button--primary"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending your inquiry…" : "Send inquiry"}
        <ArrowRight size={18} />
      </button>
      <p className="form-note">
        No payment or commitment is required to start a conversation.
      </p>
    </form>
  );
}
