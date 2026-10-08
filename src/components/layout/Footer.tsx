import Link from "next/link";
import {
  Clock3,
  Flower2,
  Gift,
  Leaf,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Truck,
} from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { PaymentMarks, SocialMark } from "@/components/brand/FooterMarks";
import { Newsletter } from "@/components/Newsletter";
import { FooterPreferences } from "./FooterPreferences";

const groups = [
  {
    title: "Shop",
    links: [
      { label: "All Flowers", href: "/shop" },
      { label: "Bouquets", href: "/shop" },
      {
        label: "Luxury Collection",
        href: "/shop?collection=Luxury%20Collection",
      },
      { label: "Same-Day Delivery", href: "/shop?sameDay=true" },
      {
        label: "Plants & Gifts",
        href: "/contact?occasion=Gifting%20Help&service=Plants%20%26%20Gifts",
      },
      { label: "Best Sellers", href: "/shop?collection=Best%20Sellers" },
      { label: "New Arrivals", href: "/shop?collection=New%20Arrivals" },
      { label: "Flower Subscriptions", href: "/subscriptions" },
    ],
  },
  {
    title: "Occasions",
    links: [
      ...[
        "Birthday",
        "Anniversary",
        "Love & Romance",
        "Thank You",
        "Congratulations",
        "Get Well Soon",
        "Just Because",
      ].map((label) => ({
        label,
        href: "/shop?occasion=" + encodeURIComponent(label),
      })),
      { label: "Wedding Flowers", href: "/wedding" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Track Your Order", href: "/care#tracking" },
      { label: "Delivery Information", href: "/care#delivery" },
      { label: "Returns & Refunds", href: "/care#returns" },
      { label: "Flower Care Guide", href: "/care#flower-care" },
      { label: "FAQs", href: "/care#faqs" },
      { label: "Contact Us", href: "/contact" },
      {
        label: "Corporate & Events",
        href: "/contact?occasion=Other&service=Corporate%20%26%20Events",
      },
    ],
  },
];
const socials = [
  {
    name: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/",
  },
  {
    name: "Facebook",
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/",
  },
  {
    name: "Pinterest",
    href: process.env.NEXT_PUBLIC_PINTEREST_URL || "https://www.pinterest.com/",
  },
  {
    name: "YouTube",
    href: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/",
  },
];
const promises = [
  { icon: Truck, title: "Same-Day Delivery", text: "Freshness guaranteed" },
  { icon: Flower2, title: "Farm-Fresh Blooms", text: "Sourced with care" },
  { icon: Leaf, title: "Sustainable Practices", text: "A kinder tomorrow" },
  {
    icon: Gift,
    title: "Beautifully Packaged",
    text: "For life’s special moments",
  },
];

export function Footer() {
  return (
    <div className="footer-region">
      <Newsletter />
      <footer className="site-footer site-footer--reference">
        <div className="site-shell footer-grid">
          <div className="footer-brand">
            <BrandLogo mark="crest" />
            <p>
              Fresh flowers, artfully arranged to celebrate love, life and every
              special moment — delivered with care.
            </p>
            <nav
              className="footer-connect"
              aria-label="Follow our flower journey"
            >
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <SocialMark name={social.name} />
                </a>
              ))}
            </nav>
          </div>
          {groups.map((group) => (
            <nav
              className="footer-link-group"
              key={group.title}
              aria-label={group.title + " links"}
            >
              <h3>{group.title}</h3>
              <ul className="footer-links">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>
              <MapPin />
              <span>
                123 Blossom Lane
                <br />
                Paris, FR 75007
              </span>
            </p>
            <a href="tel:+33142567890">
              <Phone />
              <span>
                +33 1 42 56 78 90<small>Mon – Sat, 9:00 AM – 7:00 PM</small>
              </span>
            </a>
            <a href="mailto:hello@lamedesfleurs.com">
              <Mail />
              <span>hello@lamedesfleurs.com</span>
            </a>
            <p>
              <Clock3 />
              <span>
                Customer Support<small>Mon – Sun, 8:00 AM – 8:00 PM</small>
              </span>
            </p>
          </div>
        </div>
        <div className="site-shell footer-assurances">
          {promises.map(({ icon: Icon, title, text }) => (
            <div className="footer-promise" key={title}>
              <span className="footer-promise__icon">
                <Icon size={27} strokeWidth={1.35} />
              </span>
              <div>
                <p>{title}</p>
                <small>{text}</small>
              </div>
            </div>
          ))}
          <div className="footer-payments">
            <h3>
              <LockKeyhole size={25} strokeWidth={1.4} /> Secure Payments
            </h3>
            <PaymentMarks />
            <small>Payment arranged after florist confirmation.</small>
          </div>
        </div>
        <div className="site-shell footer-bottom">
          <span>
            © {new Date().getFullYear()} L’Âme des Fleurs. All rights reserved.
          </span>
          <div>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <FooterPreferences />
            <select aria-label="Site language" defaultValue="en">
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </footer>
    </div>
  );
}
