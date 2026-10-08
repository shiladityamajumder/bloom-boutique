import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Flower2,
  Gift,
  Heart,
  Leaf,
  ShieldCheck,
  Truck,
} from "lucide-react";
import type { ReactNode } from "react";
import { imagePath } from "@/lib/catalog";
export function Photo({
  name,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={imagePath(name)}
        alt={alt}
        fill
        sizes={sizes}
        quality={priority ? 85 : 75}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
}
export function ButtonLink({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      className={`button ${secondary ? "button--secondary" : "button--primary"} ${className}`}
      href={href}
    >
      {children}
      <ArrowRight size={18} />
    </Link>
  );
}
export function SectionTitle({
  eyebrow,
  title,
  children,
  centered = false,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={`section-title ${centered ? "centered" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
const benefits = [
  {
    icon: Truck,
    title: "Same-Day Delivery",
    text: "Fresh flowers, delivered with care",
  },
  { icon: Flower2, title: "Farm-Fresh Blooms", text: "Sourced with care" },
  {
    icon: Leaf,
    title: "A Kinder Tomorrow",
    text: "Thoughtful sourcing & packaging",
  },
  {
    icon: Gift,
    title: "Beautifully Packaged",
    text: "For life’s special moments",
  },
  {
    icon: ShieldCheck,
    title: "Secure Ordering",
    text: "A little peace of mind",
  },
];
export function Benefits({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`benefits ${compact ? "benefits--compact" : ""}`}>
      {benefits.slice(0, compact ? 3 : 5).map(({ icon: Icon, title, text }) => (
        <div className="benefit" key={title}>
          <span className="icon-circle">
            <Icon size={25} strokeWidth={1.4} />
          </span>
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map((item, i) => (
        <span key={i}>
          <span aria-hidden="true">›</span>
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function EditorialHero({
  eyebrow,
  title,
  children,
  image,
  alt,
  actions,
  quote,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  image: string;
  alt: string;
  actions?: ReactNode;
  quote?: string;
}) {
  return (
    <section
      className={`editorial-hero ${image === "wedding-hero" ? "editorial-hero--wedding" : ""}`}
    >
      <Photo
        name={image}
        alt={alt}
        priority
        sizes="100vw"
        className="editorial-hero__image"
      />
      <div className="editorial-hero__veil" />
      <div className="site-shell editorial-hero__content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{children}</p>
        {actions && <div className="button-row">{actions}</div>}
      </div>
      {quote && (
        <aside className="flower-note">
          <p>{quote}</p>
          <Heart size={20} />
          <span />
        </aside>
      )}
    </section>
  );
}
