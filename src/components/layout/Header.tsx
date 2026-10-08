"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useStore } from "@/components/StoreProvider";
import { occasions } from "@/lib/catalog";
const nav = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Occasions", href: "/occasions" },
  { label: "Wedding", href: "/wedding" },
  { label: "About", href: "/about" },
];
export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const immersive = pathname === "/";
  const { cart, wishlist } = useStore();
  const [panelState, setPanelState] = useState<{
    pathname: string;
    panel: "menu" | "search" | null;
  }>({ pathname, panel: null });
  if (panelState.pathname !== pathname) {
    setPanelState({ pathname, panel: null });
  }
  const panel = panelState.pathname === pathname ? panelState.panel : null;
  const open = panel === "menu";
  const search = panel === "search";
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const searchButton = useRef<HTMLButtonElement>(null);
  const closePanels = () => setPanelState({ pathname, panel: null });
  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = String(
      new FormData(event.currentTarget).get("q") || "",
    ).trim();
    closePanels();
    router.push(query ? `/shop?${new URLSearchParams({ q: query })}` : "/shop");
  }
  const count = cart.reduce((n, i) => n + i.quantity, 0);
  useEffect(() => {
    if (!panel) return;
    const trigger = open ? menuButton.current : searchButton.current;
    const previous = document.body.style.overflow;
    const background = Array.from(
      document.querySelectorAll<HTMLElement>("main, .footer-region"),
    ).map((element) => ({ element, inert: element.inert }));
    if (open) {
      document.body.style.overflow = "hidden";
      background.forEach(({ element }) => {
        element.inert = true;
      });
      menuRef.current
        ?.querySelector<HTMLAnchorElement>("a")
        ?.focus({ preventScroll: true });
    } else {
      headerRef.current
        ?.querySelector<HTMLInputElement>(".mobile-search input")
        ?.focus({ preventScroll: true });
    }
    const positionMenu = () => {
      if (menuRef.current && headerRef.current) {
        menuRef.current.style.top = `${headerRef.current.getBoundingClientRect().bottom}px`;
      }
    };
    positionMenu();
    const observer = new ResizeObserver(positionMenu);
    if (headerRef.current) observer.observe(headerRef.current);
    const breakpoint = window.matchMedia(
      open ? "(max-width: 800px)" : "(max-width: 1050px)",
    );
    const closeOnResize = () => {
      if (!breakpoint.matches) setPanelState({ pathname, panel: null });
    };
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setPanelState({ pathname, panel: null });
      }
      if (open && e.key === "Tab") {
        const controls = [headerRef.current, menuRef.current]
          .flatMap((region) =>
            Array.from(
              region?.querySelectorAll<HTMLElement>(
                "a[href], button:not([disabled]), input:not([disabled])",
              ) || [],
            ),
          )
          .filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    breakpoint.addEventListener("change", closeOnResize);
    window.addEventListener("resize", positionMenu);
    window.addEventListener("keydown", close);
    return () => {
      if (open) {
        document.body.style.overflow = previous;
        background.forEach(({ element, inert }) => {
          element.inert = inert;
        });
      }
      observer.disconnect();
      breakpoint.removeEventListener("change", closeOnResize);
      window.removeEventListener("resize", positionMenu);
      window.removeEventListener("keydown", close);
      trigger?.focus({ preventScroll: true });
    };
  }, [panel, open, pathname]);
  return (
    <>
      <header
        ref={headerRef}
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a"))
            closePanels();
        }}
        className={`site-header ${immersive ? "site-header--immersive" : ""}`}
      >
        <div className="site-shell site-header__inner">
          <BrandLogo />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {nav.map((item) => (
              <div className="nav-item" key={item.href}>
                <Link
                  className={`nav-link ${pathname === item.href ? "is-active" : ""}`}
                  href={item.href}
                >
                  {item.label}
                  {["Shop", "Occasions"].includes(item.label) && (
                    <ChevronDown size={12} />
                  )}
                </Link>
                {item.label === "Shop" && (
                  <div className="nav-dropdown">
                    <Link href="/shop">All bouquets</Link>
                    <Link href="/shop?collection=Best%20Sellers">
                      Best sellers
                    </Link>
                    <Link href="/shop?collection=Luxury%20Collection">
                      Luxury collection
                    </Link>
                    <Link href="/shop?sameDay=true">Same-day delivery</Link>
                    <Link href="/subscriptions">Flower subscriptions</Link>
                  </div>
                )}
                {item.label === "Occasions" && (
                  <div className="nav-dropdown">
                    {occasions.map((o) => (
                      <Link
                        key={o.name}
                        href={`/shop?occasion=${encodeURIComponent(o.name)}`}
                      >
                        {o.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="header-actions">
            <form
              action="/shop"
              onSubmit={submitSearch}
              role="search"
              className="header-search"
            >
              <Search size={17} />
              <input
                name="q"
                placeholder="Search flowers, occasions…"
                aria-label="Search flowers"
              />
            </form>
            <button
              ref={searchButton}
              className="icon-button mobile-search-button"
              aria-label={search ? "Close search" : "Open search"}
              aria-expanded={search}
              aria-controls="mobile-search"
              onClick={() =>
                setPanelState({ pathname, panel: search ? null : "search" })
              }
            >
              {search ? <X size={20} /> : <Search size={20} />}
            </button>
            <Link
              className="icon-button header-wishlist"
              href="/wishlist"
              aria-label={`Wishlist, ${wishlist.length} bouquets`}
            >
              <Heart size={22} strokeWidth={1.4} />
              {wishlist.length > 0 && (
                <span className="bag-count">{wishlist.length}</span>
              )}
            </Link>
            <Link
              className="icon-button"
              href="/cart"
              aria-label={`Shopping bag, ${count} items`}
            >
              <ShoppingBag size={23} strokeWidth={1.4} />
              {count > 0 && <span className="bag-count">{count}</span>}
            </Link>
            <button
              ref={menuButton}
              className="icon-button menu-button"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() =>
                setPanelState({ pathname, panel: open ? null : "menu" })
              }
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {search && (
          <form
            id="mobile-search"
            action="/shop"
            onSubmit={submitSearch}
            className="mobile-search"
            role="search"
          >
            <Search size={19} />
            <input
              autoFocus
              name="q"
              required
              placeholder="Find your perfect bouquet"
              aria-label="Search flowers"
            />
            <button className="small-button">Search</button>
          </form>
        )}
      </header>
      {open && (
        <div ref={menuRef} className="mobile-menu" id="mobile-navigation">
          <nav aria-label="Mobile navigation">
            {[
              ...nav,
              { label: "Contact & custom bouquets", href: "/contact" },
              { label: "Your wishlist", href: "/wishlist" },
            ].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closePanels}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                <span className="menu-number">0{i + 1}</span>
                {item.label}
                <span>↗</span>
              </Link>
            ))}
          </nav>
          <p>Flowers. Bouquets. A brighter tomorrow.</p>
        </div>
      )}
    </>
  );
}
