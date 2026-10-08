import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Breadcrumb } from "@/components/ui/Floral";
export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: true },
};
export default function Checkout() {
  return (
    <main className="site-shell">
      <div className="page-heading">
        <Breadcrumb
          items={[{ label: "Your bag", href: "/cart" }, { label: "Checkout" }]}
        />
        <p className="eyebrow">A thoughtful delivery</p>
        <h1>
          Almost <em>in Bloom.</em>
        </h1>
        <p>A few details to help your flowers find their way.</p>
      </div>
      <CheckoutForm />
    </main>
  );
}
