# L’Âme des Fleurs implementation

The nine root reference PNGs are design references. All interfaces are real HTML, CSS and React components; no full-page screenshots are used as an interface. The original root images and the source `assets` directory have not been edited or deleted.

## Pages

| URL                  | Experience                                                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `/`                  | Floral hero, featured bouquets, occasion cards, custom bouquets, subscriptions, brand craft, customer stories and newsletter |
| `/shop`              | 12 bouquets; search, occasion/color/price/flower/collection filters, same-day toggle, sorting and grid/list views            |
| `/product/[slug]`    | Individual product page, photo gallery and zoom, two bouquet sizes, gift message, quantity, wishlist, add to bag and buy now |
| `/occasions`         | Eight shoppable occasion collections and gifting help                                                                        |
| `/wedding`           | Bridal/reception/ceremony/consultation services, inspiration gallery, three package inquiries and wedding process            |
| `/about`             | Brand story, craft, sourcing aspirations and brand journey                                                                   |
| `/contact`           | Custom bouquet, wedding, subscription and general inquiries; contact information and FAQ accordion                           |
| `/wishlist`          | Persistent saved bouquets                                                                                                    |
| `/cart`              | Persistent basket, quantities, removal, handwritten messages and estimated delivery                                          |
| `/checkout`          | Validated order request; florist confirmation required; no payment taken                                                     |
| `/subscriptions`     | Three subscription plans and three delivery cadences; inquiries carry the selection into the contact form                    |
| `/care`              | Delivery, returns guidance, care instructions and FAQs                                                                       |
| `/privacy`, `/terms` | Implementation-specific policy starter pages                                                                                 |

## Structure

- `src/app`: App Router pages, loading/error/not-found states and three server route handlers.
- `src/components`: Shared layout, floral imagery, product cards, forms and commerce components.
- `src/components/ProductGallery.tsx`: Keyed main photographs, thumbnail and arrow navigation, loading/retry feedback and a native zoom dialog. Product changes reset the selection.
- `src/components/layout/Footer.tsx`: Global newsletter and reference footer; social destinations can be configured through public environment variables. Cookie preferences explain the essential local storage and offer links to manage saved items.
- `src/lib/catalog.ts`: Typed product/occasion data and pricing.
- `src/lib/submissions.ts`: Validation, request size limit, origin checks, rate limit, private persistence or configurable webhook.
- `src/app/globals.css`: Design tokens, editorial styling, responsive layouts, visible keyboard focus and reduced-motion support.
- `src/app/reference.css`: Footer styling matched to reference four and responsive gallery/dialog controls.
- `assets`: 45 descriptively named supplied PNG copies and 15 generated standalone photographs; sheets and moodboards are reference-only. The parent originals remain unchanged.
- `public/images`: 51 complete standalone WebP images in categorized folders, resolved through `src/lib/images.ts`. Preparation uses the internal asset library without cropping image regions. See [IMAGE_ASSETS.md](IMAGE_ASSETS.md) for sources and prompts.
- `tests/storefront.spec.ts`: Browser and API tests for real customer journeys.
- `tests/mobile.spec.ts`: Touch navigation, responsive layouts, forms, shopping and mobile accessibility checks.
- `tests/footer.spec.ts`: Footer layout and controls at seven widths, social destinations, inquiry links and accessibility.
- `docs/screenshots`: Nine real desktop/mobile previews embedded or linked in the README.
- `artifacts`: Desktop and mobile screenshots from browser review.

## Content and integrations

Catalogue prices, customer-story quotations, package pricing, boutique address and telephone follow or extend the supplied design. Treat them as sample content until the business owner verifies them. All twelve bouquets have distinct primary photographs and separate galleries. See [PREMIUM_REFINEMENT.md](PREMIUM_REFINEMENT.md) for the latest design refinements and generated photography.

The working checkout saves an **order request**, not a paid order. The server recalculates prices from its catalogue, validates quantities and delivery dates, and uses idempotency keys to avoid duplicate request files. There is no payment provider, live inventory system, courier booking or automatic email delivery.

In local development, submitted JSON records are saved privately in `.data/inquiries`, `.data/newsletter` and `.data/orders`. Browser-test records are saved separately in `.test-data` when the server is launched with that environment setting. None of these directories is publicly served or committed.

For production, configure `SUBMISSIONS_DIR` to persistent private storage **or** configure `SUBMISSIONS_WEBHOOK_URL` and optional `SUBMISSIONS_WEBHOOK_TOKEN`. A successful webhook response must mean the submission was durably accepted. The service must deduplicate orders using the supplied `Idempotency-Key`. If storage or the webhook is unavailable, the form returns an error rather than claiming success. Use a monitored notification service for order requests, inquiries and newsletter fulfillment.

Set `SITE_ORIGIN` to the actual public HTTPS origin before building. It controls social metadata, origin validation and sitemap URLs. The in-process rate limit is a basic safeguard; use a trusted reverse proxy and shared rate-limit storage if deploying multiple instances.

Confirm commercial content and complete business-specific legal policies, retention rules and payment integration before accepting paid orders. Fonts are self-hosted; there are no advertising trackers or analytics scripts.

## Verification

Footer and gallery refinement: all 21 browser/API tests passed against the production build, along with ESLint, strict TypeScript and four desktop accessibility scans with zero violations. The suite verifies every one of the 26 gallery photographs across all twelve products on desktop and touch devices, comparing selected file URLs and rendered image pixels, checking zoom navigation and resetting selection between products. Footer controls and overflow are checked at 320, 390, 768, 1024, 1200, 1440 and 1672 px. Nine production screenshots were refreshed for the README. Checksums confirmed all 45 supplied originals and internal copies unchanged; all 51 served images preserve source proportions within integer pixel rounding.

- `npm run lint`: ESLint including Next.js and TypeScript rules.
- `npx tsc --noEmit`: Strict type checking.
- `npm run build`: Production compilation and static product pages.
- `npm test`: Browser/API journeys against a running server, including unique gallery verification for all twelve bouquets and the mobile suite. The checked-in configuration uses locally installed Microsoft Edge; set the channel to `chrome` or install Playwright Chromium on systems without Edge.
- `npm run test:mobile`: All 14 page types at five portrait widths (320–768 px) and 844 × 390 px landscape, plus touch interactions and automated accessibility scans.
- `npm run screenshots`: Refresh the nine README previews against the running production site.
- `npm audit --omit=dev`: Production dependency audit.
- `npm run test:a11y`: Automated WCAG A/AA scans on home, shop, product and contact pages, plus 320 px viewport overflow checks. Reports are saved to `artifacts/accessibility-report.json`.

Premium design verification: production build, strict TypeScript and ESLint passed; the original seven browser/API tests passed; four automated accessibility scans reported no violations. Checksums confirmed all 45 supplied originals and their copies unchanged, all 50 delivery files preserve source proportions, and all twelve primary bouquet photos are distinct.

Mobile audit: all 19 browser/API tests passed, including all 14 page types at 320, 360, 390, 430 and 768 px, and 844 × 390 px landscape. Touch journeys cover every menu destination, header shortcuts, search, rotation, browser history, catalogue filters, galleries, wishlist, persistent bag, checkout, subscription inquiries, FAQs and newsletter forms. Mobile WCAG scans cover four pages and the open menu. Menu and search are mutually exclusive; navigation restores scrolling and focus; obsolete panels close on route and breakpoint changes. Mobile sorting has an accessible name, menu numbers meet contrast requirements, and controls/form text are easier to use on a phone. Seven actual production previews are stored in `docs/screenshots` and shown or linked in the README. Browser emulation and automated scans complement screenshot review; physical-device testing and comprehensive accessibility review remain separate checks.

At implementation time the production dependency audit reported no vulnerabilities. The development-only Next ESLint dependency chain reports a `braces` advisory; the registry has no newer fixed `braces` release. Avoid npm’s proposed Next ESLint downgrade. Revisit the advisory when a patched upstream version is available.
