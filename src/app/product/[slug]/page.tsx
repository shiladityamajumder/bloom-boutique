import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/lib/catalog";
import { Breadcrumb, SectionTitle } from "@/components/ui/Floral";
import { ProductDetails } from "@/components/ProductDetails";
import { ProductCard } from "@/components/ProductCard";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return {
    title: product?.name || "Bouquet not found",
    description: product?.description,
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return (
    <main className="site-shell product-page">
      <Breadcrumb
        items={[{ label: "Bouquets", href: "/shop" }, { label: product.name }]}
      />
      <ProductDetails key={product.slug} product={product} />
      <section className="related-products">
        <SectionTitle
          eyebrow="A little more to love"
          title="You May Also Adore"
        />
        <div className="related-grid">
          {products
            .filter((p) => p.slug !== product.slug)
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
        </div>
      </section>
    </main>
  );
}
