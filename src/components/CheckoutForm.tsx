"use client";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, ShoppingBag } from "lucide-react";
import { useStore } from "./StoreProvider";
import { getProduct, money } from "@/lib/catalog";
import { ButtonLink } from "./ui/Floral";
export function CheckoutForm() {
  const { cart, ready, clear } = useStore();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const requestId = useRef("");
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const subtotal = cart.reduce(
    (total, item) =>
      total +
      (getProduct(item.slug)!.price + (item.size === "grand" ? 30 : 0)) *
        item.quantity,
    0,
  );
  const delivery = subtotal >= 150 ? 0 : 12;
  const advanceOnly = cart.some((i) => !getProduct(i.slug)!.sameDay);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");
    if (!requestId.current) requestId.current = crypto.randomUUID();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": requestId.current,
        },
        body: JSON.stringify({ ...data, items: cart }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please try again.");
      setConfirmation(result.reference);
      clear();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Your request could not be saved. Please try again.",
      );
    } finally {
      setSending(false);
    }
  }
  if (confirmation)
    return (
      <div className="checkout-success" role="status">
        <Check size={45} />
        <p className="eyebrow">Your flowers are one step closer</p>
        <h1>
          A <em>Beautiful Beginning.</em>
        </h1>
        <p>
          Your order request has been saved. This is a request for florist
          confirmation; no payment has been taken and delivery is not yet
          booked.
        </p>
        <div className="reference">
          Your reference: <strong>{confirmation}</strong>
        </div>
        <p>
          For an urgent request, contact{" "}
          <a className="text-link" href="mailto:hello@lamedesfleurs.com">
            hello@lamedesfleurs.com
          </a>
          .
        </p>
        <ButtonLink href="/shop">Keep the beauty blooming</ButtonLink>
      </div>
    );
  if (!ready)
    return <div className="loading-state">Preparing your checkout…</div>;
  if (!cart.length)
    return (
      <div className="empty-state">
        <ShoppingBag size={40} />
        <h2>Your flowers are waiting to be chosen.</h2>
        <p>Add a bouquet to your bag to begin.</p>
        <ButtonLink href="/shop">Explore bouquets</ButtonLink>
      </div>
    );
  return (
    <div className="checkout-layout">
      <form className="checkout-form" onSubmit={submit}>
        <div className="order-notice">
          This checkout sends an order request. Your florist will need to
          confirm availability, delivery and payment before your order is final.
          No payment is taken on this website.
        </div>
        <h2>A Few Thoughtful Details</h2>
        <div className="form-grid">
          <label className="field">
            <span>
              Your name <b>*</b>
            </span>
            <input
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
            />
          </label>
          <label className="field">
            <span>
              Email address <b>*</b>
            </span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
          <label className="field">
            <span>
              Phone number <b>*</b>
            </span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              minLength={6}
              maxLength={40}
            />
          </label>
          <label className="field">
            <span>
              Recipient’s name <b>*</b>
            </span>
            <input name="recipient" required minLength={2} maxLength={100} />
          </label>
          <label className="field field--full">
            <span>
              Delivery address <b>*</b>
            </span>
            <input
              name="address"
              autoComplete="street-address"
              required
              minLength={5}
              maxLength={300}
            />
          </label>
          <label className="field">
            <span>
              City <b>*</b>
            </span>
            <input
              name="city"
              autoComplete="address-level2"
              defaultValue="Paris"
              required
              maxLength={100}
            />
          </label>
          <label className="field">
            <span>
              Postal code <b>*</b>
            </span>
            <input
              name="postalCode"
              autoComplete="postal-code"
              required
              pattern="[0-9]{5}"
              placeholder="75007"
              title="Enter a 5-digit French postal code"
            />
          </label>
          <label className="field">
            <span>
              Preferred delivery date <b>*</b>
            </span>
            <input name="date" type="date" min={today} required />
          </label>
          <label className="field">
            <span>Delivery notes</span>
            <textarea
              name="notes"
              maxLength={1000}
              rows={2}
              placeholder="Door code, a little surprise…"
            />
          </label>
        </div>
        {advanceOnly && (
          <p className="form-note">
            Your bag includes made-to-order flowers. Please choose a date at
            least two days ahead.
          </p>
        )}
        <input
          className="honeypot"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <label className="consent">
          <input name="consent" type="checkbox" required />I agree to the{" "}
          <Link className="text-button" href="/terms">
            terms
          </Link>{" "}
          and{" "}
          <Link className="text-button" href="/privacy">
            privacy policy
          </Link>
          , and understand this is an order request.
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="button button--primary" disabled={sending}>
          {sending ? "Saving your request…" : "Request my flowers"}
          <ArrowRight size={18} />
        </button>
      </form>
      <aside className="cart-summary">
        <h2>Your Flower Bag</h2>
        <div className="checkout-items">
          {cart.map((item, index) => (
            <div key={index}>
              <span>
                {getProduct(item.slug)!.name}
                <br />
                {item.quantity} ×{" "}
                {item.size === "grand" ? "Grand" : "Signature"}
              </span>
              <strong>
                {money(
                  (getProduct(item.slug)!.price +
                    (item.size === "grand" ? 30 : 0)) *
                    item.quantity,
                )}
              </strong>
            </div>
          ))}
        </div>
        <div className="summary-row">
          <span>Subtotal</span>
          <strong>{money(subtotal)}</strong>
        </div>
        <div className="summary-row">
          <span>Estimated delivery</span>
          <strong>{delivery ? money(delivery) : "Complimentary"}</strong>
        </div>
        <div className="summary-row total">
          <span>Estimated total</span>
          <strong>{money(subtotal + delivery)}</strong>
        </div>
        <p>
          All prices in USD. Final price and delivery are confirmed before
          payment.
        </p>
        <Link href="/cart" className="text-link" style={{ marginTop: 20 }}>
          Edit your bag <ArrowRight size={16} />
        </Link>
      </aside>
    </div>
  );
}
