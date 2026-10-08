import type { Metadata } from "next";
import { WishlistView } from "@/components/WishlistView";
import { Breadcrumb } from "@/components/ui/Floral";
export const metadata: Metadata = { title: "Your Wishlist" };
export default function Wishlist() {
  return (
    <main className="site-shell">
      <div className="page-heading">
        <Breadcrumb items={[{ label: "Wishlist" }]} />
        <p className="eyebrow">Keep a little beauty close</p>
        <h1>
          Your <em>Favorite Blooms</em>
        </h1>
        <p>For a coming celebration. For a little daydream. For you.</p>
      </div>
      <WishlistView />
    </main>
  );
}
