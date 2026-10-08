// Source indexes refer to the read-only inventory of the supplied assets.
// Each served image comes from a complete standalone source, never a board crop.
export const suppliedAssets = [
  ["brand/floral-wordmark", "floral-wordmark"],
  ["home/sunlit-atelier", "atelier-background"],
  ["products/pastel-signature-bouquet", "hero-bouquet"],
  ["decorative/botanical-outline", "botanical-outline"],
  ["decorative/rose-petal-scatter", "rose-petal-scatter"],
  ["products/blush-serenity-studio", "blush-serenity-studio"],
  ["products/sunlit-meadow-studio", "sunlit-meadow-studio"],
  ["products/everlasting-love-studio", "everlasting-love-studio"],
  ["products/pure-elegance-studio", "pure-elegance-studio"],
  ["products/pastel-flower-hatbox", "pastel-flower-hatbox"],
  ["about/florist-at-work", "about-hero"],
  ["contact/paris-flower-boutique", "boutique"],
  ["wedding/bride-with-pastel-bouquet", "wedding-hero"],
  ["home/pastel-bouquet-hero", "home-hero"],
  ["home/seasonal-flower-subscription", "subscription"],
  ["about/handcrafted-floral-arrangement", "craft"],
  ["about/thoughtfully-wrapped-bouquet", "sustainable"],
  ["wedding/seaside-ceremony-flowers", "ceremony"],
  ["wedding/floral-design-consultation", "consultation"],
  ["products/pastel-garden-bouquet", "pastel-garden-bouquet"],
  ["products/blush-serenity", "blush-serenity"],
  ["products/everlasting-love", "everlasting-love"],
  ["products/pure-elegance", "pure-elegance"],
  ["products/sunlit-meadow", "sunlit-meadow"],
  ["products/happy-day", "happy-day"],
  ["products/sweet-romance", "sweet-romance"],
  ["products/cotton-cloud", "cotton-cloud"],
  ["products/garden-bliss", "garden-bliss"],
  ["wedding/candlelit-reception-centerpieces", "reception"],
  ["wedding/romantic-seaside-floral-arch", "wedding-arch"],
  ["brand/primary-wordmark", "brand-logo"],
  ["brand/stacked-wordmark", "stacked-wordmark"],
  ["brand/botanical-crest", "brand-mark"],
  ["brand/blush-flower-app-icon", "blush-flower-app-icon"],
  ["reference-only/icon-sheets/service-icons"],
  ["reference-only/icon-sheets/navigation-icons"],
  ["reference-only/icon-sheets/social-icons"],
  ["decorative/pink-botanical-corner", "botanical-corner"],
  ["decorative/floating-rose-petals", "petals"],
  ["reference-only/moodboards/floral-asset-board"],
  ["reference-only/moodboards/floral-collection-board"],
  ["reference-only/moodboards/editorial-asset-moodboard"],
  ["reference-only/moodboards/floral-brand-moodboard"],
  ["reference-only/moodboards/pastel-brand-gallery"],
  ["reference-only/moodboards/pastel-commerce-moodboard"],
].map(([name, key], index) => ({
  index,
  source: `${name}.png`,
  key,
  referenceOnly: !key,
}));

export const generatedAssets = [
  {
    source: "decorative/newsletter-floral-corner.png",
    key: "newsletter-floral-corner",
  },
  { source: "products/details/blush-garden-rose.png", key: "rose-detail" },
  { source: "products/details/blush-satin-ribbon.png", key: "ribbon-detail" },
  ...["golden-hour", "petal-poetry", "morning-light", "blue-reverie"].map(
    (key) => ({ source: `products/${key}.png`, key }),
  ),
  ...[
    "happy-day",
    "sweet-romance",
    "cotton-cloud",
    "garden-bliss",
    "golden-hour",
    "petal-poetry",
    "morning-light",
    "blue-reverie",
  ].map((slug) => ({
    source: `products/details/${slug}-detail.png`,
    key: `${slug}-detail`,
  })),
];

// Aliases intentionally reuse complete photographs, without extracting regions.
export const imageAliases = {
  "custom-bouquet": "home-hero",
};
