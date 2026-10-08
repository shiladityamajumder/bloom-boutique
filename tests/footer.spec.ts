import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ hasTouch: true });

test("reference footer stays responsive and its links and privacy controls work", async ({
  page,
}) => {
  for (const width of [1672, 1440, 1200, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 940 });
    await page.goto("/product/blush-serenity");
    await expect(page.locator(".newsletter")).toHaveCount(1);
    await page.locator(".footer-region").scrollIntoViewIfNeeded();
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      `${width}px footer`,
    ).toBeLessThanOrEqual(width);
    await expect(page.locator(".footer-connect a")).toHaveCount(4);
    await expect(page.locator(".payment-mark")).toHaveCount(5);
    const button = page.getByRole("button", {
      name: "Cookie Preferences",
      exact: true,
    });
    await button.tap();
    const dialog = page.getByRole("dialog", {
      name: "Cookie Preferences",
      exact: true,
    });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText(
      "no optional analytics or advertising cookies",
    );
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(button).toBeFocused();
  }
  const footer = page.locator(".site-footer");
  await expect(
    footer.getByRole("link", { name: "Instagram", exact: true }),
  ).toHaveAttribute("href", "https://www.instagram.com/");
  await footer
    .getByRole("link", { name: "Track Your Order", exact: true })
    .tap();
  await expect(page).toHaveURL(/\/care#tracking$/);
  await expect(
    page.getByRole("heading", { name: "Track your order", exact: true }),
  ).toBeVisible();
  await page
    .locator(".site-footer")
    .getByRole("link", { name: "Corporate & Events", exact: true })
    .tap();
  await expect(
    page.locator(".inquiry-form:visible").getByLabel("Your message"),
  ).toHaveValue(/Corporate & Events/);
  const results = await new AxeBuilder({ page })
    .include(".footer-region")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
