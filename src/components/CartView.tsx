"use client";
import Link from "next/link";
import {
  ArrowRight,
  Flower2,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useStore } from "./StoreProvider";
import { getProduct, money } from "@/lib/catalog";
import { ButtonLink, Photo } from "./ui/Floral";
export function CartView() {
  const { cart, update, remove, ready } = useStore();
  const subtotal = cart.reduce(
    (total, item) =>
      total +
      ((getProduct(item.slug)?.price || 0) + (item.size === "grand" ? 30 : 0)) *
        item.quantity,
    0,
  );
  const delivery = subtotal >= 150 ? 0 : 12;
  if (!ready)
    return (
      <div className="loading-state" role="status">
        Opening your flower bag…
      </div>
    );
  if (!cart.length)
    return (
      <div className="empty-state">
        <ShoppingBag size={42} />
        <h2>Your bag is ready for a little beauty.</h2>
        <p>Find a bouquet you love and we’ll keep it here for you.</p>
        <ButtonLink href="/shop">Discover our bouquets</ButtonLink>
      </div>
    );
  return (
    <div className="cart-layout">
      <div className="cart-list">
        {cart.map((item, index) => {
          const product = getProduct(item.slug)!;
          return (
            <article
              className="cart-item"
              key={`${item.slug}-${item.size}-${index}`}
            >
              <Photo name={product.image} alt={product.name} sizes="155px" />
              <div className="cart-item-info">
                <Link href={`/product/${product.slug}`}>
                  <h2>{product.name}</h2>
                </Link>
                <p>
                  {item.size === "grand"
                    ? "Grand bouquet"
                    : "Signature bouquet"}{" "}
                  · {money(product.price + (item.size === "grand" ? 30 : 0))}
                </p>
                {item.message && (
                  <p className="gift-note">Your card: “{item.message}”</p>
                )}
                <div className="cart-item-controls">
                  <div className="quantity-control">
                    <button
                      aria-label={`Decrease ${product.name} quantity`}
                      disabled={item.quantity === 1}
                      onClick={() => update(index, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span
                      aria-label={`${product.name} quantity`}
                      aria-live="polite"
                    >
                      {item.quantity}
                    </span>
                    <button
                      aria-label={`Increase ${product.name} quantity`}
                      disabled={item.quantity === 20}
                      onClick={() => update(index, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    className="text-button"
                    onClick={() => remove(index)}
                    aria-label={`Remove ${product.name} from bag`}
                  >
                    <Trash2 size={12} />
                    Remove
                  </button>
                </div>
              </div>
              <strong className="cart-item-total">
                {money(
                  (product.price + (item.size === "grand" ? 30 : 0)) *
                    item.quantity,
                )}
              </strong>
            </article>
          );
        })}
        <Link
          className="text-link"
          style={{ alignSelf: "flex-start", marginTop: 12 }}
          href="/shop"
        >
          Keep exploring <ArrowRight size={16} />
        </Link>
      </div>
      <aside className="cart-summary">
        <h2>A Beautiful Little Bag</h2>
        <div className="free-delivery-note">
          {subtotal >= 150
            ? "Your flowers qualify for complimentary delivery ♡"
            : `You’re ${money(150 - subtotal)} away from complimentary delivery.`}
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
        <ButtonLink href="/checkout">Continue to checkout</ButtonLink>
        <p>
          Availability and delivery are confirmed by your florist.
          <br />
          All prices shown in USD.
        </p>
        <div className="mini-benefits">
          <Flower2 size={14} />
          Fresh blooms <span>·</span>
          <Heart size={14} />
          Thoughtfully wrapped
        </div>
      </aside>
    </div>
  );
}
