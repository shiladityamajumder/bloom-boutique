import type { Metadata } from "next";
import { CartView } from "@/components/CartView";
import { Breadcrumb } from "@/components/ui/Floral";
export const metadata: Metadata = { title: "Your Shopping Bag" };
export default function Cart() {
  return (
    <main className="site-shell">
      <div className="page-heading">
        <Breadcrumb items={[{ label: "Your bag" }]} />
        <p className="eyebrow">Gathered with love</p>
        <h1>
          Your <em>Flower Bag</em>
        </h1>
        <p>A little beauty for you, or someone you love.</p>
      </div>
      <CartView />
    </main>
  );
}
