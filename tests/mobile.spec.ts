import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});

const routes = [
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
];

async function expectScreenFits(page: Page, description: string) {
  await page.evaluate(() => document.fonts.ready);
  const dimensions = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(dimensions.content, description).toBeLessThanOrEqual(
    dimensions.viewport,
  );
}

for (const [width, height] of [
  [320, 844],
  [360, 844],
  [390, 844],
  [430, 844],
  [768, 844],
  [844, 390],
]) {
  test(`all 14 page types fit a ${width} × ${height}px touch viewport`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expectScreenFits(page, `${width}px: ${route}`);
      // Inspect the bottom too, after lazy images and long footer links appear.
      await page.locator(".site-footer").scrollIntoViewIfNeeded();
      await expectScreenFits(page, `${width}px footer: ${route}`);
    }
    expect(errors).toEqual([]);
  });
}

test("every mobile menu link opens its page and releases scrolling", async ({
  page,
}) => {
  await page.goto("/shop");
  for (const [label, path] of [
    ["Home", "/"],
    ["Shop", "/shop"],
    ["Occasions", "/occasions"],
    ["Wedding", "/wedding"],
    ["About", "/about"],
    ["Contact & custom bouquets", "/contact"],
    ["Your wishlist", "/wishlist"],
  ]) {
    await page
      .getByRole("button", { name: "Open navigation", exact: true })
      .tap();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    const header = await page.locator("header").boundingBox();
    const menu = await page.locator(".mobile-menu").boundingBox();
    expect(Math.abs(menu!.y - (header!.y + header!.height))).toBeLessThan(1);
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: label, exact: false })
      .tap();
    await expect.poll(() => new URL(page.url()).pathname).toBe(path);
    await expect(page.locator(".mobile-menu")).toHaveCount(0);
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    await expect(page.locator("main")).not.toHaveAttribute("inert", "");
  }
  // Header shortcuts also dismiss the open panel.
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .tap();
  await page.getByRole("link", { name: /Shopping bag/ }).tap();
  await expect(page).toHaveURL(/\/cart$/);
  await expect(page.locator(".mobile-menu")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .tap();
  await page.locator("header .brand-logo").tap();
  await expect.poll(() => new URL(page.url()).pathname).toBe("/");
  await expect(page.locator(".mobile-menu")).toHaveCount(0);
  // Browser history must not restore an obsolete open-menu state.
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .tap();
  await page.goBack();
  await expect(page.locator(".mobile-menu")).toHaveCount(0);
  await page.goForward();
  await expect(page.locator(".mobile-menu")).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("search, menu, keyboard dismissal and orientation changes work together", async ({
  page,
}) => {
  await page.goto("/");
  const openMenu = page.getByRole("button", {
    name: "Open navigation",
    exact: true,
  });
  await openMenu.tap();
  const menu = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(menu.getByRole("link").first()).toBeFocused();
  await menu.getByRole("link").last().focus();
  await page.keyboard.press("Tab");
  await expect(page.locator("header .brand-logo")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(openMenu).toBeFocused();
  await expect(page.locator(".mobile-menu")).toHaveCount(0);

  await page.getByRole("button", { name: "Open search", exact: true }).tap();
  await expect(page.locator(".mobile-search input")).toBeFocused();
  await page.getByRole("button", { name: "Close search", exact: true }).tap();
  await expect(page.locator(".mobile-search")).toHaveCount(0);
  await page.getByRole("button", { name: "Open search", exact: true }).tap();
  await openMenu.tap();
  await expect(page.locator(".mobile-search")).toHaveCount(0);
  await page.getByRole("button", { name: "Open search", exact: true }).tap();
  await expect(page.locator(".mobile-menu")).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await page.locator(".mobile-search input").fill("hydrangea");
  await page
    .locator(".mobile-search")
    .getByRole("button", { name: "Search", exact: true })
    .tap();
  await expect(page).toHaveURL(/\/shop\?q=hydrangea/);
  await expect(page.locator(".product-card")).toHaveCount(4);
  await expect(page.locator(".mobile-search")).toHaveCount(0);

  await openMenu.tap();
  await page.setViewportSize({ width: 780, height: 390 });
  await expectScreenFits(page, "landscape menu");
  await menu.getByRole("link", { name: /Your wishlist/ }).tap();
  await expect(page).toHaveURL(/\/wishlist$/);
  await openMenu.tap();
  await page.setViewportSize({ width: 1200, height: 900 });
  await expect(page.locator(".mobile-menu")).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open search", exact: true }).tap();
  await page.keyboard.press("Escape");
  await expect(page.locator(".mobile-search")).toHaveCount(0);
});

test("mobile filters, sorting and catalogue view buttons accept touch input", async ({
  page,
}) => {
  await page.goto("/shop");
  const toggle = page.getByRole("button", { name: /^Filters/ });
  await expect(page.locator(".shop-filters")).toBeHidden();
  await toggle.tap();
  await page.getByLabel("Anniversary", { exact: false }).tap();
  await expect(page.locator(".product-card")).toHaveCount(4);
  await page.getByLabel("Filter by red").tap();
  await expect(page.locator(".product-card h3")).toHaveText("Everlasting Love");
  await toggle.tap();
  await expect(page.locator(".shop-filters")).toBeHidden();
  await toggle.tap();
  await page.getByRole("button", { name: "Clear all", exact: true }).tap();
  await expect(page.locator(".product-card")).toHaveCount(12);
  await page.locator("#price-range").focus();
  await page.keyboard.press("Home");
  await expect(page.locator(".product-card")).toHaveCount(0);
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".product-card h3")).toHaveText("Happy Day");
  await page.getByRole("button", { name: "Clear all", exact: true }).tap();
  await page
    .locator(".shop-filters summary")
    .filter({ hasText: "Flower type" })
    .tap();
  await page.getByLabel("Filter by flower type").selectOption("Hydrangeas");
  await expect(page.locator(".product-card")).toHaveCount(4);
  await page.getByRole("button", { name: "Clear all", exact: true }).tap();
  await toggle.tap();
  await page.getByLabel("Sort by").selectOption("price-low");
  await expect(page.locator(".product-card h3").first()).toHaveText(
    "Happy Day",
  );
  await page.getByRole("button", { name: "List view", exact: true }).tap();
  await expect(page.locator(".catalog-grid")).toHaveClass(/catalog-grid--list/);
  await expectScreenFits(page, "mobile catalogue list");
  await page.getByRole("button", { name: "Grid view", exact: true }).tap();
  await expect(page.locator(".catalog-grid")).not.toHaveClass(
    /catalog-grid--list/,
  );
  await page.getByRole("button", { name: "Shop same-day", exact: false }).tap();
  await expect(page).toHaveURL(/sameDay=true/);
  await page
    .getByRole("button", { name: "Show all bouquets", exact: false })
    .tap();
  await expect(page.locator(".product-card")).toHaveCount(12);
  await page
    .getByRole("button", { name: "Save Happy Day to wishlist", exact: true })
    .tap();
  await expect(
    page.getByRole("button", {
      name: "Remove Happy Day from wishlist",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", { name: "Add Happy Day to bag", exact: true })
    .tap();
  await expect(
    page.getByRole("link", { name: "Shopping bag, 1 items", exact: true }),
  ).toBeVisible();
});

test("touch gallery, bouquet choices, wishlist, bag and checkout work at 320px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto("/product/blush-serenity");
  const thumbnails = page.locator(".product-thumbs button");
  for (let index = 0; index < (await thumbnails.count()); index++) {
    await thumbnails.nth(index).tap();
    await expect(thumbnails.nth(index)).toHaveAttribute("aria-pressed", "true");
  }
  await page.getByRole("button", { name: "Enlarge bouquet photo" }).tap();
  await expect(
    page.getByRole("dialog", { name: "Enlarged bouquet photo" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close enlarged photo" }).tap();
  await expect(page.locator(".lightbox")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Add to wishlist", exact: true })
    .tap();
  await page.getByLabel("Grand", { exact: false }).tap();
  await page
    .getByRole("button", { name: "Increase quantity", exact: true })
    .tap();
  await page.locator(".personal-message summary").tap();
  await page.getByLabel("Personal gift message").fill("A little mobile joy.");
  await page.getByRole("button", { name: "Add to bag", exact: true }).tap();
  await page.getByRole("link", { name: /Shopping bag/ }).tap();
  await expect(page.locator(".cart-item-total")).toHaveText("$238.00");
  await expect(page.locator(".gift-note")).toContainText(
    "A little mobile joy.",
  );
  await expectScreenFits(page, "populated narrow bag");
  await page
    .getByRole("button", { name: "Decrease Blush Serenity quantity" })
    .tap();
  await expect(page.locator(".cart-item-total")).toHaveText("$119.00");
  await page.reload();
  await expect(page.locator(".cart-item-total")).toHaveText("$119.00");
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .tap();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /Your wishlist/ })
    .tap();
  await expect(page.locator(".product-card h3")).toHaveText("Blush Serenity");
  await page.getByRole("link", { name: /Shopping bag/ }).tap();
  await page
    .getByRole("link", { name: "Continue to checkout", exact: false })
    .tap();
  await expectScreenFits(page, "populated narrow checkout");
  for (const [name, value] of Object.entries({
    name: "Mobile Preview",
    email: "mobile@example.test",
    phone: "+33142567890",
    recipient: "Mobile Recipient",
    address: "123 Preview Street",
    postalCode: "75007",
    date: "2099-12-10",
  }))
    await page.locator(`.checkout-form input[name=${name}]`).fill(value);
  await page.locator(".checkout-form input[name=consent]").tap();
  await page.getByRole("button", { name: "Request my flowers" }).tap();
  await expect(
    page.getByRole("heading", { name: "A Beautiful Beginning." }),
  ).toBeVisible();
  await expect(page.locator(".reference")).toContainText("LDF-ORD-");
  await page.getByRole("link", { name: /Shopping bag/ }).tap();
  await expect(page.locator(".cart-item")).toHaveCount(0);
  await page.goto("/product/blush-serenity");
  await page.getByRole("button", { name: "Buy now", exact: true }).tap();
  await expect(page).toHaveURL(/checkout/);
  await page.getByRole("link", { name: /Shopping bag/ }).tap();
  await page
    .getByRole("button", { name: "Remove Blush Serenity from bag" })
    .tap();
  await expect(page.locator(".cart-item")).toHaveCount(0);
});

test("mobile subscription links, inquiries, FAQs and newsletter work", async ({
  page,
}) => {
  await page.goto("/subscriptions");
  await page.getByLabel("Weekly", { exact: true }).tap();
  await page
    .getByRole("link", { name: "Enquire about this plan", exact: false })
    .first()
    .tap();
  await expect(page).toHaveURL(/cadence=Weekly/);
  const inquiry = page.locator(".inquiry-form:visible");
  await expect(inquiry.getByRole("combobox", { name: /Occasion/ })).toHaveValue(
    "Subscription",
  );
  await expect(inquiry.getByLabel("Your message")).toContainText("Weekly");
  await inquiry.getByLabel("Full name").fill("Mobile Preview");
  await inquiry.locator("input[name=email]").fill("mobile@example.test");
  await inquiry
    .getByLabel("Your message")
    .fill("Please arrange beautiful weekly flowers for my home.");
  await inquiry.locator("input[name=consent]").tap();
  await page.getByRole("button", { name: "Send inquiry", exact: true }).tap();
  await expect(
    page.getByRole("heading", { name: "Your vision is in good hands." }),
  ).toBeVisible();
  await expect(page.locator(".reference")).toContainText("LDF-INQ-");
  const faq = page.locator(".faq-panel details").first();
  await faq.locator("summary").tap();
  await expect(faq).toHaveAttribute("open", "");
  await faq.locator("summary").tap();
  await expect(faq).not.toHaveAttribute("open", "");
  await page.goto("/");
  await page
    .getByRole("button", { name: "Next customer story", exact: true })
    .tap();
  await expect(page.locator(".testimonial-author strong").first()).toHaveText(
    "Daniel M.",
  );
  await page
    .getByRole("button", { name: "Previous customer story", exact: true })
    .tap();
  await expect(page.locator(".testimonial-author strong").first()).toHaveText(
    "Sophia L.",
  );
  await page
    .locator(".newsletter input[name=email]")
    .fill("mobile@example.test");
  await page.locator(".newsletter input[name=consent]").tap();
  await page.getByRole("button", { name: "Subscribe", exact: true }).tap();
  await expect(
    page.getByRole("heading", { name: "You’re part of our flower journey." }),
  ).toBeVisible();
});

test("mobile pages and the open navigation pass automated accessibility checks", async ({
  page,
}) => {
  for (const route of ["/", "/shop", "/product/blush-serenity", "/contact"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations, route).toEqual([]);
  }
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .tap();
  const menu = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(menu.violations, "open mobile navigation").toEqual([]);
});
