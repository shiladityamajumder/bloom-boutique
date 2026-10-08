import type { Metadata } from "next";
import { imagePath } from "@/lib/images";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StoreProvider } from "@/components/StoreProvider";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "./globals.css";
import "./premium.css";
import "./reference.css";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_ORIGIN || "http://localhost:3000"),
  title: {
    default: "L’Âme des Fleurs — Flowers for Meaningful Moments",
    template: "%s | L’Âme des Fleurs",
  },
  description:
    "Thoughtfully handcrafted bouquets, wedding flowers and seasonal blooms. A little Parisian beauty for life’s meaningful moments.",
  applicationName: "L’Âme des Fleurs",
  openGraph: {
    title: "L’Âme des Fleurs",
    description: "Fresh flowers. Brighter days.",
    images: [{ url: imagePath("home-hero"), width: 1672, height: 941 }],
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=floral-2", sizes: "16x16 32x32 48x48" },
      { url: "/favicon-32.png?v=floral-2", type: "image/png", sizes: "32x32" },
      { url: "/icon.svg?v=floral-2", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/favicon.ico?v=floral-2",
    apple: {
      url: "/apple-touch-icon.png?v=floral-2",
      sizes: "180x180",
      type: "image/png",
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <Header />
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
