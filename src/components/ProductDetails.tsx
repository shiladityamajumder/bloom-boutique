"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Droplets,
  Gift,
  Heart,
  Leaf,
  MapPin,
  Minus,
  Plus,
  Share2,
  Sun,
  Truck,
} from "lucide-react";
import { money, type Product } from "@/lib/catalog";
import { getBouquetPhotography } from "@/lib/product-photography";
import { useStore } from "./StoreProvider";
import { Benefits, Photo } from "./ui/Floral";
import { ProductGallery } from "./ProductGallery";

export function ProductDetails({ product }: { product: Product }) {
  const { add, wishlist, toggleWish, toast, ready } = useStore();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<"signature" | "grand">("signature");
  const [message, setMessage] = useState("");
  const { gallery: photos, stems } = getBouquetPhotography(product);
  const saved = wishlist.includes(product.slug);
  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast("Bouquet link copied — share a little beauty.");
    } catch {
      toast("You can share this bouquet using the address in your browser.");
    }
  }
  function buy(now = false) {
    add({ slug: product.slug, quantity, size, message: message.trim() });
    if (now) router.push("/checkout");
  }
  return (
    <>
      <div className="product-detail">
        <ProductGallery
          key={product.slug}
          photos={photos}
          slug={product.slug}
        />
        <div className="product-info">
          <p className="eyebrow">
            {product.collection === "Best Sellers"
              ? "Bestseller"
              : "Handcrafted with care"}
          </p>
          <div className="product-title-row">
            <h1>{product.name}</h1>
            <div className="header-actions">
              <button
                className="icon-button"
                aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={saved}
                disabled={!ready}
                onClick={() => toggleWish(product.slug)}
              >
                <Heart
                  size={22}
                  color={saved ? "#b04c63" : undefined}
                  fill={saved ? "#b04c63" : "none"}
                />
              </button>
              <button
                className="icon-button"
                onClick={share}
                aria-label="Copy bouquet link"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
          <div className="product-subline">
            <Leaf size={14} />
            <span>Fresh seasonal blooms</span>
            <span>·</span>
            <span>Arranged by hand in Paris</span>
          </div>
          <p className="product-price">
            {money(product.price + (size === "grand" ? 30 : 0))}
          </p>
          <p className="product-description">{product.description}</p>
          <div className="product-ingredients">
            <h3>What’s in this bouquet?</h3>
            <div className="bouquet-composition">
              <Photo name={photos[1].image} alt="" sizes="85px" />
              <div className="bouquet-stems">
                {stems.map((stem) => (
                  <div className="bouquet-stem" key={stem.name}>
                    <span>{stem.name}</span>
                    <small>{stem.note}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <fieldset className="size-options">
            <legend>Choose your bouquet size</legend>
            {(["signature", "grand"] as const).map((s) => (
              <label
                className={`size-option ${size === s ? "selected" : ""}`}
                key={s}
              >
                <input
                  type="radio"
                  name="size"
                  checked={size === s}
                  onChange={() => setSize(s)}
                />
                {s === "signature" ? "Signature" : "Grand"}
                <span>
                  {s === "signature" ? "As pictured" : "+$30 · More blooms"}
                </span>
              </label>
            ))}
          </fieldset>
          <details className="personal-message">
            <summary>
              <Gift size={16} />
              Add a complimentary handwritten message <Plus size={14} />
            </summary>
            <label className="field">
              <span className="sr-only">Personal gift message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={300}
                rows={3}
                placeholder="A few words from your heart… (up to 300 characters)"
              />
            </label>
          </details>
          <div className="product-purchase">
            <div className="quantity-control">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity === 1}
                aria-label="Decrease quantity"
              >
                <Minus size={15} />
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                disabled={quantity === 20}
                aria-label="Increase quantity"
              >
                <Plus size={15} />
              </button>
            </div>
            <button
              className="button button--primary"
              onClick={() => buy()}
              disabled={!ready}
            >
              Add to bag
              <ArrowRight size={18} />
            </button>
            <button
              className="button button--secondary"
              onClick={() => buy(true)}
              disabled={!ready}
            >
              Buy now
            </button>
          </div>
          <Benefits compact />
        </div>
      </div>
      <div className="product-delivery">
        <div>
          <span className="icon-circle">
            <Truck size={25} strokeWidth={1.3} />
          </span>
          <div>
            <h3>
              {product.sameDay ? "Same-Day Delivery" : "Made Just for You"}
            </h3>
            <p>
              {product.sameDay
                ? "In Paris, for orders placed before 1 PM."
                : "Please allow 48 hours for this arrangement."}
            </p>
            <a href="/care#delivery" className="text-link">
              Delivery information <ArrowRight size={14} />
            </a>
          </div>
        </div>
        <div>
          <span className="icon-circle">
            <MapPin size={24} strokeWidth={1.3} />
          </span>
          <div>
            <h3>A Little Closer</h3>
            <p>Available in Paris and surrounding areas.</p>
            <a
              href="/contact?occasion=Delivery%20Question"
              className="text-link"
            >
              Check your delivery area <ArrowRight size={14} />
            </a>
          </div>
        </div>
        <div>
          <span className="icon-circle">
            <Gift size={24} strokeWidth={1.3} />
          </span>
          <div>
            <h3>Beautifully Packaged</h3>
            <p>Our signature wrapping. Your personal words.</p>
            <span className="text-link">
              A handwritten card, with our compliments
            </span>
          </div>
        </div>
      </div>
      <div className="care-strip">
        <div>
          <h2>Care Instructions</h2>
          <p>A little love keeps your blooms beautiful.</p>
        </div>
        <div className="care-tips">
          {[
            {
              icon: Droplets,
              title: "Fresh water",
              text: "Refresh your vase every two days.",
            },
            {
              icon: Leaf,
              title: "A fresh start",
              text: "Trim stems at an angle on arrival.",
            },
            {
              icon: Sun,
              title: "A gentle spot",
              text: "Keep away from heat & direct sun.",
            },
            {
              icon: Heart,
              title: "A little love",
              text: "Remove wilted petals as they appear.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
