"use client";
import Link from "next/link";
import { Heart, Plus, ShoppingBag } from "lucide-react";
import { money, type Product } from "@/lib/catalog";
import { Photo } from "./ui/Floral";
import { useStore } from "./StoreProvider";
export function ProductCard({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const { add, wishlist, toggleWish, ready } = useStore();
  const saved = wishlist.includes(product.slug);
  return (
    <article className="product-card">
      <div className="product-card__visual">
        <Link
          href={`/product/${product.slug}`}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Photo
            name={product.image}
            alt={`${product.name} — ${product.flowers}`}
            sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw"
          />
        </Link>
        <button
          className={`wish-button ${saved ? "is-saved" : ""}`}
          aria-label={`${saved ? "Remove" : "Save"} ${product.name} ${saved ? "from" : "to"} wishlist`}
          aria-pressed={saved}
          disabled={!ready}
          onClick={() => toggleWish(product.slug)}
        >
          <Heart
            size={20}
            fill={saved ? "currentColor" : "none"}
            strokeWidth={1.5}
          />
        </button>
        {product.collection === "Best Sellers" && (
          <span className="product-tag">Bestseller</span>
        )}
        <Link href={`/product/${product.slug}`} className="product-quickview">
          Discover bouquet <Plus size={16} />
        </Link>
      </div>
      <div className="product-card__info">
        <Link href={`/product/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <p>{product.flowers}</p>
        <div className="product-card__bottom">
          <strong>{money(product.price)}</strong>
          <button
            className={compact ? "icon-circle add-circle" : "small-button"}
            onClick={() =>
              add({
                slug: product.slug,
                quantity: 1,
                size: "signature",
                message: "",
              })
            }
            aria-label={`Add ${product.name} to bag`}
            disabled={!ready}
          >
            <ShoppingBag size={16} />
            {!compact && <span>Add to bag</span>}
          </button>
        </div>
      </div>
    </article>
  );
}
