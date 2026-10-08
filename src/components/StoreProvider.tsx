"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Check, X } from "lucide-react";
import { getProduct } from "@/lib/catalog";
export type CartItem = {
  slug: string;
  quantity: number;
  size: "signature" | "grand";
  message: string;
};
type Store = {
  cart: CartItem[];
  wishlist: string[];
  ready: boolean;
  toast: (message: string) => void;
  add: (item: CartItem) => void;
  update: (index: number, quantity: number) => void;
  remove: (index: number) => void;
  clear: () => void;
  toggleWish: (slug: string) => void;
};
const Context = createContext<Store | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const stored: unknown = JSON.parse(
          localStorage.getItem("fleurs-cart") || "[]",
        );
        if (Array.isArray(stored))
          setCart(
            stored
              .filter(
                (i): i is CartItem =>
                  !!i &&
                  typeof i.slug === "string" &&
                  !!getProduct(i.slug) &&
                  Number.isInteger(i.quantity) &&
                  i.quantity > 0 &&
                  i.quantity <= 20 &&
                  ["signature", "grand"].includes(i.size) &&
                  typeof i.message === "string",
              )
              .map((i) => ({ ...i, message: i.message.slice(0, 300) })),
          );
        const saved: unknown = JSON.parse(
          localStorage.getItem("fleurs-wishlist") || "[]",
        );
        if (Array.isArray(saved))
          setWishlist([
            ...new Set(
              saved.filter(
                (s): s is string => typeof s === "string" && !!getProduct(s),
              ),
            ),
          ]);
      } catch {
        /* Browser storage may be disabled. */
      }
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem("fleurs-cart", JSON.stringify(cart));
        localStorage.setItem("fleurs-wishlist", JSON.stringify(wishlist));
      } catch {
        /* Shopping still works in memory. */
      }
    }
  }, [cart, wishlist, ready]);
  useEffect(() => {
    if (notice) {
      const timer = setTimeout(() => setNotice(""), 3500);
      return () => clearTimeout(timer);
    }
  }, [notice]);
  function add(item: CartItem) {
    setCart((old) => {
      const index = old.findIndex(
        (i) =>
          i.slug === item.slug &&
          i.size === item.size &&
          i.message === item.message,
      );
      return index < 0
        ? [...old, { ...item, quantity: Math.min(20, item.quantity) }]
        : old.map((i, n) =>
            n === index
              ? { ...i, quantity: Math.min(20, i.quantity + item.quantity) }
              : i,
          );
    });
    setNotice(`${getProduct(item.slug)?.name} added to your bag`);
  }
  function toggleWish(slug: string) {
    setWishlist((old) =>
      old.includes(slug) ? old.filter((s) => s !== slug) : [...old, slug],
    );
  }
  return (
    <Context.Provider
      value={{
        cart,
        wishlist,
        ready,
        toast: setNotice,
        add,
        toggleWish,
        clear: () => setCart([]),
        update: (index, quantity) =>
          setCart((old) =>
            old.map((i, n) =>
              n === index
                ? { ...i, quantity: Math.max(1, Math.min(20, quantity)) }
                : i,
            ),
          ),
        remove: (index) => setCart((old) => old.filter((_, n) => n !== index)),
      }}
    >
      {children}
      {notice && (
        <div className="toast" role="status">
          <Check size={19} />
          <span>{notice}</span>
          <button
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </Context.Provider>
  );
}
export function useStore() {
  const context = useContext(Context);
  if (!context) throw new Error("StoreProvider is required");
  return context;
}
