import { test, expect, type Page } from "@playwright/test";
import { createHash } from "node:crypto";

async function verifyBouquetGalleries(page: Page, touch = false) {
  const owners = new Map<string, string>();
  for (const slug of [
    "blush-serenity",
    "sunlit-meadow",
    "everlasting-love",
    "pure-elegance",
    "happy-day",
    "sweet-romance",
    "cotton-cloud",
    "garden-bliss",
    "golden-hour",
    "petal-poetry",
    "morning-light",
    "blue-reverie",
  ]) {
    await page.goto(`/product/${slug}`);
    const thumbnails = page.locator(".product-thumbs button");
    expect(await thumbnails.count()).toBeGreaterThanOrEqual(2);
    const sources = await page
      .locator(".product-thumbs img")
      .evaluateAll((images) =>
        images.map((image) => {
          const url = new URL((image as HTMLImageElement).src);
          return url.searchParams.get("url") || url.pathname;
        }),
      );
    for (const source of sources) {
      expect(
        owners.get(source),
        `${slug} reuses another bouquet's photograph: ${source}`,
      ).toBeUndefined();
      owners.set(source, slug);
    }
    const rendered = new Set<string>();
    for (let index = 0; index < sources.length; index++) {
      if (touch) await thumbnails.nth(index).tap();
      else await thumbnails.nth(index).click();
      await expect(thumbnails.nth(index)).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      await expect
        .poll(() =>
          page
            .locator(".product-main-photo img")
            .evaluate((image) =>
              (image as HTMLImageElement).currentSrc
                ? new URL(
                    (image as HTMLImageElement).currentSrc,
                  ).searchParams.get("url")
                : null,
            ),
        )
        .toBe(sources[index]);
      await expect(page.locator(".product-main-photo")).toHaveAttribute(
        "aria-busy",
        "false",
      );
      await page.locator(".product-main-photo img").evaluate(async (image) => {
        await (image as HTMLImageElement).decode();
      });
      const pixels = createHash("sha256")
        .update(await page.locator(".product-main-photo > .photo").screenshot())
        .digest("hex");
      expect(
        rendered.has(pixels),
        `${slug}: thumbnail ${index + 1} still shows another image`,
      ).toBe(false);
      rendered.add(pixels);
      await expect(page.locator(".gallery-caption")).toContainText(
        `${String(index + 1).padStart(2, "0")} /`,
      );
    }
    expect(await page.locator(".bouquet-stem").count()).toBeGreaterThanOrEqual(
      3,
    );
    await page.getByRole("button", { name: "Enlarge bouquet photo" }).click();
    await expect(
      page.getByRole("dialog", { name: "Enlarged bouquet photo" }),
    ).toBeVisible();
    await expect
      .poll(() =>
        page
          .locator(".lightbox img")
          .evaluate((image) =>
            new URL((image as HTMLImageElement).src).searchParams.get("url"),
          ),
      )
      .toBe(sources[sources.length - 1]);
    await page
      .getByRole("button", { name: "Next enlarged photo", exact: true })
      .click();
    await expect
      .poll(() =>
        page
          .locator(".lightbox img")
          .evaluate((image) =>
            new URL((image as HTMLImageElement).src).searchParams.get("url"),
          ),
      )
      .toBe(sources[0]);
    await page
      .getByRole("button", { name: "Previous enlarged photo", exact: true })
      .click();
    await page.keyboard.press("Escape");
    await expect(page.locator(".lightbox")).toHaveCount(0);
  }
}

test("every bouquet displays every selected photo in its main gallery and zoom", async ({
  page,
}) => {
  await verifyBouquetGalleries(page);
  await page.goto("/product/blush-serenity");
  await page.locator(".product-thumbs button").last().click();
  await page
    .locator(".related-products")
    .getByRole("link", { name: "Sunlit Meadow", exact: true })
    .click();
  await expect(page).toHaveURL(/\/product\/sunlit-meadow$/);
  await expect(page.locator(".gallery-caption")).toContainText("01 / 02");
  await expect(page.locator(".product-thumbs button").first()).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test.describe("Touch galleries", () => {
  test.use({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });
  test("every bouquet thumbnail changes the displayed photograph on mobile", async ({
    page,
  }) => {
    await verifyBouquetGalleries(page, true);
  });
});

test("all designed routes render and have working images", async ({ page }) => {
  const failures: string[] = [];
  page.on("pageerror", (error) => failures.push(error.message));
  for (const path of [
    "/",
    "/shop",
    "/product/blush-serenity",
    "/occasions",
    "/wedding",
    "/about",
    "/contact",
    "/cart",
    "/wishlist",
    "/checkout",
    "/subscriptions",
    "/care",
    "/privacy",
    "/terms",
  ]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
    await page
      .locator("main img")
      .first()
      .waitFor({ state: "visible", timeout: 5000 })
      .catch(() => {});
    const broken = await page
      .locator("main img")
      .evaluateAll((images) =>
        images
          .filter(
            (i) =>
              (i as HTMLImageElement).complete &&
              (i as HTMLImageElement).naturalWidth === 0,
          )
          .map((i) => (i as HTMLImageElement).src),
      );
    expect(broken, path).toEqual([]);
  }
  expect(failures).toEqual([]);
});

test("filters, sorting and search change the catalogue", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.locator(".header-search input").fill("hydrangea");
  await page.locator(".header-search input").press("Enter");
  await expect(page).toHaveURL(/\/shop\?q=hydrangea/);
  await expect(page.locator(".product-card")).toHaveCount(4);
  await page.goto("/shop");
  await expect(page.locator(".product-card")).toHaveCount(12);
  await page.getByLabel("Anniversary", { exact: false }).check();
  await expect(page.locator(".product-card")).toHaveCount(4);
  await page.getByLabel("Filter by red").click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await expect(page.locator(".product-card h3")).toHaveText("Everlasting Love");
  await page.getByRole("button", { name: "Clear all", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(12);
  await page.getByLabel("Sort by").selectOption("price-low");
  await expect(page.locator(".product-card h3").first()).toHaveText(
    "Happy Day",
  );
  await page.getByRole("button", { name: "List view", exact: true }).click();
  await expect(page.locator(".catalog-grid")).toHaveClass(/catalog-grid--list/);
  await page.goto("/shop?q=unfindable");
  await expect(page.locator(".product-card")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "No blooms found just yet." }),
  ).toBeVisible();
  await page.goto("/shop?q=hydrangea");
  await expect(page.locator(".product-card")).toHaveCount(4);
});

test("bouquet options, wishlist and basket survive a reload", async ({
  page,
}) => {
  await page.goto("/product/blush-serenity");
  await page
    .getByRole("button", { name: "Add to wishlist", exact: true })
    .click();
  await page.getByLabel("Grand", { exact: false }).check();
  await page
    .getByRole("button", { name: "Increase quantity", exact: true })
    .click();
  await page.locator(".personal-message summary").click();
  await page
    .getByPlaceholder("A few words from your heart… (up to 300 characters)")
    .fill("A little beauty for your special day.");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.goto("/cart");
  await expect(page.locator(".cart-item-total")).toHaveText("$238.00");
  await expect(page.locator(".gift-note")).toContainText("A little beauty");
  await page.reload();
  await expect(page.locator(".cart-item-total")).toHaveText("$238.00");
  await page
    .getByRole("button", { name: "Decrease Blush Serenity quantity" })
    .click();
  await expect(page.locator(".cart-item-total")).toHaveText("$119.00");
  await page.goto("/wishlist");
  await expect(page.locator(".product-card h3")).toHaveText("Blush Serenity");
  await page.goto("/cart");
  await page
    .getByRole("button", { name: "Remove Blush Serenity from bag" })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Your bag is ready for a little beauty.",
    }),
  ).toBeVisible();
});

test("inquiries, newsletter and checkout save real server submissions", async ({
  page,
}) => {
  await page.goto("/contact?occasion=Wedding&package=The%20Signature");
  const inquiry = page.locator(".inquiry-form:visible");
  await expect(inquiry.getByRole("combobox", { name: /Occasion/ })).toHaveValue(
    "Wedding",
  );
  await inquiry.getByLabel("Full name").fill("Preview Visitor");
  await inquiry.locator("input[name=email]").fill("preview@example.test");
  await inquiry
    .getByLabel("Your message")
    .fill("Please tell me more about your beautiful wedding flowers.");
  await inquiry.locator("input[name=consent]").check();
  await page.getByRole("button", { name: "Send inquiry", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Your vision is in good hands." }),
  ).toBeVisible();
  await expect(page.locator(".reference")).toContainText("LDF-INQ-");
  await page.goto("/");
  await page
    .locator(".newsletter input[name=email]")
    .fill("preview@example.test");
  await page.locator(".newsletter input[name=consent]").check();
  await page.getByRole("button", { name: "Subscribe", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "You’re part of our flower journey." }),
  ).toBeVisible();
  await page.goto("/product/blush-serenity");
  await page.getByRole("button", { name: "Buy now", exact: true }).click();
  await expect(page).toHaveURL(/checkout/);
  for (const [name, value] of Object.entries({
    name: "Preview Visitor",
    email: "preview@example.test",
    phone: "+33 1 42 56 78 90",
    recipient: "Preview Recipient",
    address: "123 Preview Street",
    postalCode: "75007",
    date: "2099-12-10",
  }))
    await page.locator(`.checkout-form input[name=${name}]`).fill(value);
  await page.locator(".checkout-form input[name=consent]").check();
  await page.getByRole("button", { name: "Request my flowers" }).click();
  await expect(
    page.getByRole("heading", { name: "A Beautiful Beginning." }),
  ).toBeVisible();
  await expect(page.locator(".reference")).toContainText("LDF-ORD-");
  await expect(page.locator(".checkout-success")).toContainText(
    "no payment has been taken",
  );
  await page.goto("/cart");
  await expect(page.locator(".cart-item")).toHaveCount(0);
});

test("API rejects invalid requests, calculates totals and prevents duplicate orders", async ({
  request,
}) => {
  const headers = { "x-forwarded-for": "preview-api-tests" };
  const bad = await request.post("/api/inquiries", {
    headers,
    data: {
      name: "A",
      email: "invalid",
      occasion: "Wedding",
      message: "Hello",
      consent: "on",
    },
  });
  expect(bad.status()).toBe(400);
  const noConsent = await request.post("/api/newsletter", {
    headers,
    data: { email: "preview@example.test", consent: false },
  });
  expect(noConsent.status()).toBe(400);
  const foreign = await request.post("/api/newsletter", {
    headers: { ...headers, Origin: "https://example.invalid" },
    data: { email: "preview@example.test", consent: true },
  });
  expect(foreign.status()).toBe(403);
  const id = crypto.randomUUID();
  const order = {
    name: "API Preview",
    email: "api-preview@example.test",
    phone: "+33142567890",
    recipient: "Recipient Preview",
    address: "123 Preview Street",
    city: "Paris",
    postalCode: "75007",
    date: "2099-12-10",
    consent: "on",
    estimatedTotal: 1,
    items: [
      {
        slug: "blush-serenity",
        quantity: 2,
        size: "grand",
        message: "",
        unitPrice: 1,
      },
    ],
  };
  const first = await request.post("/api/orders", {
    headers: { ...headers, "Idempotency-Key": id },
    data: order,
  });
  expect(first.status()).toBe(201);
  const result = await first.json();
  expect(result.estimatedTotal).toBe(238);
  const duplicate = await request.post("/api/orders", {
    headers: { ...headers, "Idempotency-Key": id },
    data: order,
  });
  expect(duplicate.status()).toBe(201);
  expect((await duplicate.json()).reference).toBe(result.reference);
  const invalid = await request.post("/api/orders", {
    headers,
    data: { ...order, items: [{ ...order.items[0], quantity: -1 }] },
  });
  expect(invalid.status()).toBe(400);
  const past = await request.post("/api/orders", {
    headers,
    data: { ...order, date: "2020-01-01" },
  });
  expect(past.status()).toBe(400);
});

test("mobile pages fit the screen and navigation works", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of [
    "/",
    "/shop",
    "/product/blush-serenity",
    "/occasions",
    "/wedding",
    "/about",
    "/contact",
    "/cart",
    "/subscriptions",
  ]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const width = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
    }));
    expect(width.scroll, path).toBeLessThanOrEqual(width.viewport + 1);
  }
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /Occasions/ })
    .click();
  await expect(page).toHaveURL(/occasions/);
  await expect(page.locator(".mobile-menu")).toHaveCount(0);
  await page.goto("/shop");
  await page.getByRole("button", { name: "Filters", exact: true }).click();
  await expect(page.locator(".shop-filters")).toBeVisible();
  await page.getByLabel("Anniversary", { exact: false }).check();
  await expect(page.locator(".product-card")).toHaveCount(4);
});
