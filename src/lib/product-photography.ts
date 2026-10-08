import type { Product } from "./catalog";

export type GalleryPhoto = {
  image: string;
  label: string;
  description: string;
};
type Stem = { name: string; note: string };
type BouquetPhotography = { extras: GalleryPhoto[]; stems: Stem[] };

// Every gallery belongs to its named bouquet. No shared craft or packaging shots.
const photography: Record<string, BouquetPhotography> = {
  "blush-serenity": {
    extras: [
      {
        image: "blush-serenity-studio",
        label: "atelier portrait",
        description:
          "Pink roses, white hydrangeas and blue delphinium, in our pastel wrapping",
      },
      {
        image: "rose-detail",
        label: "rose detail",
        description: "The soft layered petals of a blush garden rose",
      },
      {
        image: "ribbon-detail",
        label: "ribbon detail",
        description: "A blush satin bow and pastel tissue wrapping",
      },
    ],
    stems: [
      { name: "Blush roses", note: "Love & tenderness" },
      { name: "Hydrangeas", note: "Cloud-soft petals" },
      { name: "Baby’s breath", note: "Delicate finishing" },
      { name: "Eucalyptus", note: "Fresh greenery" },
    ],
  },
  "sunlit-meadow": {
    extras: [
      {
        image: "sunlit-meadow-studio",
        label: "atelier portrait",
        description:
          "Apricot roses, blue delphinium and chamomile in a hand-tied bouquet",
      },
    ],
    stems: [
      { name: "Apricot roses", note: "A little warmth" },
      { name: "Delphinium", note: "Sky-blue accents" },
      { name: "Chamomile", note: "Meadow charm" },
    ],
  },
  "everlasting-love": {
    extras: [
      {
        image: "everlasting-love-studio",
        label: "atelier portrait",
        description:
          "Deep crimson and pink premium roses with seasonal greenery",
      },
    ],
    stems: [
      { name: "Crimson roses", note: "Timeless romance" },
      { name: "Pink roses", note: "Love & gratitude" },
      { name: "Seasonal greens", note: "Natural texture" },
    ],
  },
  "pure-elegance": {
    extras: [
      {
        image: "pure-elegance-studio",
        label: "atelier portrait",
        description:
          "White lilies, soft roses and silver eucalyptus in ivory wrapping",
      },
    ],
    stems: [
      { name: "White lilies", note: "Quiet grace" },
      { name: "Soft roses", note: "Thoughtful beauty" },
      { name: "Eucalyptus", note: "Fresh greenery" },
    ],
  },
  "happy-day": {
    extras: [
      {
        image: "happy-day-detail",
        label: "floral detail",
        description:
          "Golden gerberas, apricot roses and white daisies in Happy Day",
      },
    ],
    stems: [
      { name: "Gerberas", note: "Joy in full bloom" },
      { name: "Apricot roses", note: "A warm gesture" },
      { name: "Daisies", note: "A cheerful touch" },
    ],
  },
  "sweet-romance": {
    extras: [
      {
        image: "sweet-romance-detail",
        label: "floral detail",
        description:
          "Blush roses, pink carnations and delicate daisies in Sweet Romance",
      },
    ],
    stems: [
      { name: "Pink roses", note: "Love & tenderness" },
      { name: "Carnations", note: "Soft ruffled petals" },
      { name: "Eucalyptus", note: "Fresh greenery" },
    ],
  },
  "cotton-cloud": {
    extras: [
      {
        image: "cotton-cloud-detail",
        label: "floral detail",
        description:
          "Ivory hydrangeas, lisianthus and pale blush roses in Cotton Cloud",
      },
    ],
    stems: [
      { name: "Hydrangeas", note: "Soft as a cloud" },
      { name: "Blush roses", note: "A gentle gesture" },
      { name: "Lisianthus", note: "Delicate ivory petals" },
    ],
  },
  "garden-bliss": {
    extras: [
      {
        image: "garden-bliss-detail",
        label: "floral detail",
        description:
          "Blue delphinium, white hydrangeas and pink roses in Garden Bliss",
      },
    ],
    stems: [
      { name: "Hydrangeas", note: "A little abundance" },
      { name: "Pink roses", note: "Garden romance" },
      { name: "Delphinium", note: "Sky-blue wonder" },
    ],
  },
  "golden-hour": {
    extras: [
      {
        image: "golden-hour-detail",
        label: "floral detail",
        description:
          "Buttery golden roses, white daisies and sage-green foliage in Golden Hour",
      },
    ],
    stems: [
      { name: "Golden roses", note: "Afternoon warmth" },
      { name: "Daisies", note: "A sunny touch" },
      { name: "Seasonal greens", note: "Naturally beautiful" },
    ],
  },
  "petal-poetry": {
    extras: [
      {
        image: "petal-poetry-detail",
        label: "floral detail",
        description:
          "Blush garden roses, mauve lisianthus and lavender sweet peas in Petal Poetry",
      },
    ],
    stems: [
      { name: "Garden roses", note: "Romantic ruffles" },
      { name: "Lisianthus", note: "Soft mauve petals" },
      { name: "Sweet peas", note: "Lavender accents" },
    ],
  },
  "morning-light": {
    extras: [
      {
        image: "morning-light-detail",
        label: "floral detail",
        description:
          "Cream roses, white daisies and silver eucalyptus in Morning Light",
      },
    ],
    stems: [
      { name: "Cream roses", note: "Gentle beginnings" },
      { name: "Daisies", note: "A breath of fresh air" },
      { name: "Eucalyptus", note: "Natural texture" },
    ],
  },
  "blue-reverie": {
    extras: [
      {
        image: "blue-reverie-detail",
        label: "floral detail",
        description:
          "Powder-blue hydrangeas, periwinkle delphinium and ivory roses in Blue Reverie",
      },
    ],
    stems: [
      { name: "Hydrangeas", note: "Powder-blue clouds" },
      { name: "Delphinium", note: "Periwinkle spires" },
      { name: "Ivory roses", note: "Quiet elegance" },
    ],
  },
};

export function getBouquetPhotography(product: Product) {
  const entry = photography[product.slug];
  if (!entry) throw new Error(`Missing bouquet photography: ${product.slug}`);
  return {
    gallery: [
      {
        image: product.image,
        label: "bouquet",
        description: `${product.name} — ${product.flowers}`,
      },
      ...entry.extras,
    ],
    stems: entry.stems,
  };
}
