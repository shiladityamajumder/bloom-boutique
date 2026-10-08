"use client";
import { Heart } from "lucide-react";
import { useStore } from "./StoreProvider";
import { products } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";
import { ButtonLink } from "./ui/Floral";
export function WishlistView() {
  const { wishlist, ready } = useStore();
  if (!ready)
    return (
      <div className="loading-state" role="status">
        Gathering your favorites…
      </div>
    );
  const saved = products.filter((p) => wishlist.includes(p.slug));
  return saved.length ? (
    <div className="wishlist-grid">
      {saved.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  ) : (
    <div className="empty-state">
      <Heart size={42} />
      <h2>A Place for Your Favorite Blooms</h2>
      <p>Tap the little heart on a bouquet to save it here.</p>
      <ButtonLink href="/shop">Find something to love</ButtonLink>
    </div>
  );
}
