export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  flowers: string;
  color: string;
  occasions: string[];
  sameDay: boolean;
  collection: string;
  description: string;
};
export const products: Product[] = [
  {
    slug: "blush-serenity",
    name: "Blush Serenity",
    price: 89,
    image: "blush-serenity",
    flowers: "Roses, Hydrangeas & Baby’s Breath",
    color: "pink",
    occasions: ["Birthday", "Thank You", "Just Because", "Wedding"],
    sameDay: true,
    collection: "Best Sellers",
    description:
      "A graceful blend of pastel roses, cloud-soft hydrangeas and delicate seasonal blooms. Blush Serenity celebrates love, kindness and life’s most beautiful moments, wrapped in our signature blush ribbon.",
  },
  {
    slug: "sunlit-meadow",
    name: "Sunlit Meadow",
    price: 79,
    image: "sunlit-meadow",
    flowers: "Roses, Delphinium & Chamomile",
    color: "peach",
    occasions: ["Birthday", "Congratulations", "Get Well Soon", "Thank You"],
    sameDay: true,
    collection: "Best Sellers",
    description:
      "A little sunshine, beautifully gathered. Apricot roses meet sky-blue delphinium and playful daisies in an arrangement that brings the warmth of a summer meadow indoors.",
  },
  {
    slug: "everlasting-love",
    name: "Everlasting Love",
    price: 99,
    image: "everlasting-love",
    flowers: "Premium Roses & Seasonal Greens",
    color: "red",
    occasions: ["Anniversary", "Love & Romance"],
    sameDay: true,
    collection: "Luxury Collection",
    description:
      "Deep crimson and soft pink roses tell a timeless love story. Generous, romantic and thoughtfully arranged, this bouquet says everything the heart wants to say.",
  },
  {
    slug: "pure-elegance",
    name: "Pure Elegance",
    price: 85,
    image: "pure-elegance",
    flowers: "Lilies, Roses & Eucalyptus",
    color: "white",
    occasions: ["Sympathy", "Thank You", "Wedding"],
    sameDay: true,
    collection: "Signature Bouquets",
    description:
      "Elegant white lilies, creamy roses and fragrant eucalyptus. A serene expression of thoughtfulness, beautifully composed for the moments that call for quiet grace.",
  },
  {
    slug: "happy-day",
    name: "Happy Day",
    price: 69,
    image: "happy-day",
    flowers: "Gerberas, Roses & Daisies",
    color: "peach",
    occasions: ["Birthday", "Congratulations", "Get Well Soon"],
    sameDay: true,
    collection: "New Arrivals",
    description:
      "Joy in full bloom. Cheerful gerberas and peach roses mingle with delicate garden flowers, making this the sweetest way to brighten someone’s day.",
  },
  {
    slug: "sweet-romance",
    name: "Sweet Romance",
    price: 95,
    image: "sweet-romance",
    flowers: "Roses, Carnations & Eucalyptus",
    color: "pink",
    occasions: ["Anniversary", "Love & Romance", "Just Because"],
    sameDay: false,
    collection: "Luxury Collection",
    description:
      "Lush pink roses, ruffled carnations and delicate daisies, finished with fresh eucalyptus. A tender gesture for anniversaries, love notes and spontaneous little celebrations.",
  },
  {
    slug: "cotton-cloud",
    name: "Cotton Cloud",
    price: 92,
    image: "cotton-cloud",
    flowers: "Hydrangeas, Roses & Lisianthus",
    color: "white",
    occasions: ["Wedding", "Sympathy", "Thank You"],
    sameDay: false,
    collection: "Luxury Collection",
    description:
      "Soft as a cloud and full of quiet beauty. Ivory hydrangeas, delicate lisianthus and pale blush roses create a dreamy arrangement for your most cherished moments.",
  },
  {
    slug: "garden-bliss",
    name: "Garden Bliss",
    price: 78,
    image: "garden-bliss",
    flowers: "Hydrangeas, Roses & Delphinium",
    color: "blue",
    occasions: ["Just Because", "Birthday", "Congratulations"],
    sameDay: true,
    collection: "New Arrivals",
    description:
      "Fresh from a storybook garden. Blue delphinium and pastel roses nestle among airy hydrangeas, bringing a little wonder to the everyday.",
  },
  {
    slug: "golden-hour",
    name: "Golden Hour",
    price: 82,
    image: "golden-hour",
    flowers: "Garden Roses, Daisies & Seasonal Blooms",
    color: "yellow",
    occasions: ["Congratulations", "Get Well Soon", "Thank You"],
    sameDay: true,
    collection: "Signature Bouquets",
    description:
      "The golden glow of afternoon light, captured in flowers. Buttery roses, sunny daisies and fresh greens make an uplifting gift for new beginnings.",
  },
  {
    slug: "petal-poetry",
    name: "Petal Poetry",
    price: 109,
    image: "petal-poetry",
    flowers: "Garden Roses & Seasonal Pastel Blooms",
    color: "pink",
    occasions: ["Wedding", "Anniversary", "Love & Romance"],
    sameDay: false,
    collection: "Luxury Collection",
    description:
      "An abundant gathering of blush garden roses, mauve lisianthus and lavender sweet peas, accented with delicate astrantia. Designed with an artist’s eye and a florist’s heart for moments worth remembering.",
  },
  {
    slug: "morning-light",
    name: "Morning Light",
    price: 75,
    image: "morning-light",
    flowers: "Cream Roses, Daisies & Eucalyptus",
    color: "yellow",
    occasions: ["Get Well Soon", "Just Because", "Thank You"],
    sameDay: true,
    collection: "New Arrivals",
    description:
      "A breath of fresh air. Cream roses and daisies create a light, natural bouquet that feels like opening the windows on a beautiful spring morning.",
  },
  {
    slug: "blue-reverie",
    name: "Blue Reverie",
    price: 115,
    image: "blue-reverie",
    flowers: "Delphinium, Hydrangeas & Premium Roses",
    color: "blue",
    occasions: ["Birthday", "Wedding", "Anniversary"],
    sameDay: false,
    collection: "Luxury Collection",
    description:
      "A dreamy composition of powder-blue hydrangeas, periwinkle delphinium and ivory premium roses. Generous in size and delicate in detail, this signature arrangement makes a lasting impression.",
  },
];
export const occasions = [
  {
    name: "Birthday",
    image: "happy-day",
    text: "Brighten their special day with fresh blooms.",
  },
  {
    name: "Anniversary",
    image: "everlasting-love",
    text: "Celebrate your journey with timeless flowers.",
  },
  {
    name: "Love & Romance",
    image: "sweet-romance",
    text: "Say it with flowers, today and always.",
  },
  {
    name: "Thank You",
    image: "sunlit-meadow",
    text: "Express gratitude with a meaningful gift.",
  },
  {
    name: "Sympathy",
    image: "pure-elegance",
    text: "A thoughtful way to show you care.",
  },
  {
    name: "Congratulations",
    image: "golden-hour",
    text: "Celebrate new beginnings and big achievements.",
  },
  {
    name: "Get Well Soon",
    image: "morning-light",
    text: "Send smiles, comfort and brighter days.",
  },
  {
    name: "Just Because",
    image: "blush-serenity",
    text: "Because every day is a good day for flowers.",
  },
];
export const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value,
  );
export { imagePath } from "./images";
export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
