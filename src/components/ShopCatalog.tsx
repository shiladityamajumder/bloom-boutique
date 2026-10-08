"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  Grid2X2,
  List,
  Search,
  SlidersHorizontal,
  Truck,
  X,
} from "lucide-react";
import Link from "next/link";
import { products, occasions } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";
const colors = [
  { name: "pink", hex: "#eb99b3" },
  { name: "red", hex: "#bc3152" },
  { name: "peach", hex: "#f4b989" },
  { name: "white", hex: "#fffdfa" },
  { name: "blue", hex: "#9bbcd8" },
  { name: "yellow", hex: "#e6ca7c" },
];
export function ShopCatalog() {
  const urlParams = useSearchParams();
  const source = urlParams.toString();
  const [selection, setSelection] = useState({ source, value: source });
  // Keep controls immediate while the URL updates, and reconcile browser navigation.
  if (selection.source !== source) setSelection({ source, value: source });
  const params = new URLSearchParams(
    selection.source === source ? selection.value : source,
  );
  const [filtersOpen, setFiltersOpen] = useState(false);
  const selected = params.getAll("occasion");
  const color = params.get("color");
  const max = Number(params.get("max") || 200);
  const sameDay = params.get("sameDay") === "true";
  const query = params.get("q") || "";
  const collection = params.get("collection") || "";
  const sort = params.get("sort") || "featured";
  const list = params.get("view") === "list";
  function change(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    setQuery(next);
  }
  function toggleOccasion(name: string) {
    const next = new URLSearchParams(params.toString());
    next.delete("occasion");
    (selected.includes(name)
      ? selected.filter((s) => s !== name)
      : [...selected, name]
    ).forEach((s) => next.append("occasion", s));
    setQuery(next);
  }
  function setQuery(next: URLSearchParams) {
    setSelection({ source, value: next.toString() });
    window.history.replaceState(
      null,
      "",
      `/shop${next.size ? `?${next}` : ""}`,
    );
  }
  const filtered = products
    .filter(
      (p) =>
        (!selected.length || selected.some((s) => p.occasions.includes(s))) &&
        (!color || p.color === color) &&
        p.price <= max &&
        (!sameDay || p.sameDay) &&
        (!collection || p.collection === collection) &&
        (!params.get("flower") ||
          p.flowers
            .toLowerCase()
            .includes(params.get("flower")!.toLowerCase())) &&
        (!query ||
          `${p.name} ${p.flowers} ${p.occasions.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase())),
    )
    .sort((a, b) =>
      sort === "price-low"
        ? a.price - b.price
        : sort === "price-high"
          ? b.price - a.price
          : sort === "name"
            ? a.name.localeCompare(b.name)
            : 0,
    );
  const active =
    selected.length +
    Number(!!color) +
    Number(max < 200) +
    Number(sameDay) +
    Number(!!collection) +
    Number(!!query) +
    Number(!!params.get("flower"));
  return (
    <section className="site-shell shop-layout">
      <button
        className="button button--secondary filter-toggle"
        onClick={() => setFiltersOpen(!filtersOpen)}
        aria-expanded={filtersOpen}
        aria-controls="catalog-filters"
      >
        <SlidersHorizontal size={18} />
        Filters {active > 0 && `(${active})`}
      </button>
      <aside
        id="catalog-filters"
        className={`shop-filters ${filtersOpen ? "is-open" : ""}`}
        aria-label="Product filters"
      >
        <div className="filter-heading">
          <h2>Filters</h2>
          <button
            className="text-button"
            onClick={() => setQuery(new URLSearchParams())}
          >
            Clear all
          </button>
        </div>
        <details open>
          <summary>Occasion</summary>
          <div className="filter-options">
            {occasions.map((o) => (
              <label key={o.name}>
                <input
                  type="checkbox"
                  checked={selected.includes(o.name)}
                  onChange={() => toggleOccasion(o.name)}
                />
                {o.name}
                <span>
                  ({products.filter((p) => p.occasions.includes(o.name)).length}
                  )
                </span>
              </label>
            ))}
          </div>
        </details>
        <details open>
          <summary>Color</summary>
          <div className="color-options">
            {colors.map((c) => (
              <button
                key={c.name}
                style={{ backgroundColor: c.hex }}
                className={color === c.name ? "selected" : ""}
                onClick={() =>
                  change("color", color === c.name ? null : c.name)
                }
                aria-label={`Filter by ${c.name}`}
                aria-pressed={color === c.name}
              />
            ))}
          </div>
        </details>
        <details open>
          <summary>Price range</summary>
          <label className="range-label" htmlFor="price-range">
            Up to ${max}
          </label>
          <input
            id="price-range"
            type="range"
            min="60"
            max="200"
            step="5"
            value={max}
            onChange={(e) => change("max", e.target.value)}
          />
          <div className="range-labels">
            <span>$60</span>
            <span>$200</span>
          </div>
        </details>
        <details>
          <summary>Flower type</summary>
          <select
            aria-label="Filter by flower type"
            value={params.get("flower") || ""}
            onChange={(e) => change("flower", e.target.value)}
          >
            <option value="">All flowers</option>
            {["Roses", "Hydrangeas", "Lilies", "Delphinium", "Peonies"].map(
              (f) => (
                <option key={f}>{f}</option>
              ),
            )}
          </select>
        </details>
        <details open>
          <summary>Same-day delivery</summary>
          <label className="check-label">
            <input
              type="checkbox"
              checked={sameDay}
              onChange={(e) =>
                change("sameDay", e.target.checked ? "true" : null)
              }
            />
            Available for same-day
          </label>
        </details>
        <details>
          <summary>Collection</summary>
          <select
            aria-label="Filter by collection"
            value={collection}
            onChange={(e) => change("collection", e.target.value)}
          >
            <option value="">All collections</option>
            {[
              "Best Sellers",
              "Luxury Collection",
              "New Arrivals",
              "Signature Bouquets",
            ].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </details>
        <div className="filter-help">
          <HeartIcon />
          <h3>A little help choosing?</h3>
          <p>Our florists are here for you.</p>
          <Link className="text-link" href="/contact">
            Let’s talk flowers <ArrowRight size={15} />
          </Link>
        </div>
      </aside>
      <div className="shop-results">
        <div className="same-day-banner">
          <span className="icon-circle">
            <Truck size={26} strokeWidth={1.4} />
          </span>
          <div>
            <h2>Beautiful moments shouldn’t wait.</h2>
            <p>
              Fresh flowers. Same-day delivery in Paris, subject to
              availability.
            </p>
          </div>
          <button
            className="small-button"
            onClick={() => change("sameDay", sameDay ? null : "true")}
          >
            {sameDay ? "Show all bouquets" : "Shop same-day"}
            <ArrowRight size={15} />
          </button>
        </div>
        <div className="catalog-toolbar">
          <p>
            <strong>{filtered.length}</strong> beautiful bouquet
            {filtered.length === 1 ? "" : "s"}
            {query && <> for “{query}”</>}
          </p>
          <div>
            <label htmlFor="sort">Sort by</label>
            <select
              id="sort"
              aria-label="Sort by"
              value={sort}
              onChange={(e) => change("sort", e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A–Z</option>
            </select>
            <button
              className={`view-button ${!list ? "active" : ""}`}
              onClick={() => change("view", null)}
              aria-label="Grid view"
              aria-pressed={!list}
            >
              <Grid2X2 size={18} />
            </button>
            <button
              className={`view-button ${list ? "active" : ""}`}
              onClick={() => change("view", "list")}
              aria-label="List view"
              aria-pressed={list}
            >
              <List size={20} />
            </button>
          </div>
        </div>
        {active > 0 && (
          <div className="filter-chips">
            {selected.map((s) => (
              <button key={s} onClick={() => toggleOccasion(s)}>
                {s}
                <X size={13} />
              </button>
            ))}
            {color && (
              <button onClick={() => change("color", null)}>
                {color}
                <X size={13} />
              </button>
            )}
            {collection && (
              <button onClick={() => change("collection", null)}>
                {collection}
                <X size={13} />
              </button>
            )}
            {query && (
              <button onClick={() => change("q", null)}>
                “{query}”<X size={13} />
              </button>
            )}
          </div>
        )}
        {filtered.length ? (
          <div className={`catalog-grid ${list ? "catalog-grid--list" : ""}`}>
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={35} />
            <h2>No blooms found just yet.</h2>
            <p>
              Try another search or give your filters a little room to grow.
            </p>
            <button
              className="button button--primary"
              onClick={() => setQuery(new URLSearchParams())}
            >
              Explore all bouquets
              <ArrowRight size={18} />
            </button>
          </div>
        )}
        <div className="catalog-end">
          <span>Thoughtfully gathered. Beautifully given.</span>
          <span>✿</span>
        </div>
      </div>
    </section>
  );
}
function HeartIcon() {
  return <span className="filter-help__flower">✿</span>;
}
