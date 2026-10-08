# L’Âme des Fleurs — implementation map

Implemented. See [IMPLEMENTATION.md](IMPLEMENTATION.md) for the completed route map, architecture and integration notes. The plan below records the original scaffold’s intended build sequence.

The generated visual mockups are design references. The real website will be built from reusable Next.js components rather than using screenshots as page backgrounds.

## Route map

- `/` — Home
- `/shop` — Product catalogue / filters
- `/product/[slug]` — Product detail
- `/occasions` — Occasion landing page
- `/wedding` — Wedding floral services
- `/about` — Brand story
- `/contact` — Contact + custom bouquet inquiry
- `/wishlist` — Saved bouquets
- `/cart` — Shopping cart

## Planned image families

- `public/images/brand` — logo assets, marks, wordmarks, favicon sources
- `public/images/home` — home hero and promotional editorial imagery
- `public/images/products` — clean reusable product photography and detail shots
- `public/images/occasions` — occasion-specific bouquet imagery
- `public/images/wedding` — bride, ceremonies, centerpieces, venue florals
- `public/images/about` — florist atelier, handcraft, sourcing imagery
- `public/images/contact` — bouquet/contact hero and boutique/store imagery
- `public/images/decorative` — petals, botanical overlays, subtle backgrounds

## Build order

1. Foundation, routes, design tokens, shared header/footer.
2. Brand logo system and core image library.
3. Homepage section by section.
4. Shop + product detail components/data model.
5. Occasion landing and collection filtering.
6. Wedding page.
7. About and contact pages.
8. Cart/wishlist interactions.
9. Motion, responsive polish, accessibility and performance pass.
