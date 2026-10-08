import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const destination = path.resolve("docs/screenshots");
await mkdir(destination, { recursive: true });
const browser = await chromium.launch({
  channel: process.env.BROWSER_CHANNEL || "msedge",
});

async function prepare(page, route) {
  await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.mouse.move(0, 0);
}

async function capture(page, filename, options = {}) {
  await page.locator("img:visible").evaluateAll(async (images) => {
    await Promise.all(
      images.map((image) => {
        const bounds = image.getBoundingClientRect();
        return bounds.top < innerHeight && bounds.bottom > 0
          ? image.decode().catch(() => {})
          : Promise.resolve();
      }),
    );
  });
  await page.screenshot({
    path: path.join(destination, filename),
    animations: "disabled",
    ...options,
  });
  console.log(`Captured docs/screenshots/${filename}`);
}

async function captureFooter(page, filename, viewport) {
  await page.setViewportSize(viewport);
  await prepare(page, "/");
  const footer = page.locator(".footer-region");
  await footer.scrollIntoViewIfNeeded();
  await footer.locator("img").evaluateAll(async (images) => {
    await Promise.all(images.map((image) => image.decode().catch(() => {})));
  });
  await footer.screenshot({
    path: path.join(destination, filename),
    animations: "disabled",
    style:
      ".site-header, .skip-link, nextjs-portal { visibility: hidden !important; }",
  });
  console.log(`Captured docs/screenshots/${filename}`);
}

try {
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await desktop.newPage();
  await prepare(page, "/");
  await capture(page, "home-desktop.png");
  await prepare(page, "/shop");
  // Warm lazy images before capturing the complete catalogue page.
  await page.evaluate(async () => {
    for (
      let top = 0;
      top < document.documentElement.scrollHeight;
      top += innerHeight
    ) {
      window.scrollTo({ top, behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
    await Promise.all(
      Array.from(document.images).map((image) =>
        image.decode().catch(() => {}),
      ),
    );
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await capture(page, "shop-desktop.png", { fullPage: true });
  await prepare(page, "/product/blush-serenity");
  await capture(page, "bouquet-desktop.png");
  await captureFooter(page, "footer-desktop.png", {
    width: 1672,
    height: 1200,
  });
  await desktop.close();

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1,
  });
  const phone = await mobile.newPage();
  await prepare(phone, "/");
  await capture(phone, "home-mobile.png");
  await phone
    .getByRole("button", { name: "Open navigation", exact: true })
    .tap();
  await capture(phone, "navigation-mobile.png");
  await prepare(phone, "/shop");
  await phone.locator(".catalog-toolbar").evaluate((toolbar) => {
    const headerHeight = document
      .querySelector("header")
      .getBoundingClientRect().height;
    window.scrollTo({
      top: scrollY + toolbar.getBoundingClientRect().top - headerHeight,
      behavior: "instant",
    });
  });
  await capture(phone, "shop-mobile.png");
  await prepare(phone, "/product/blush-serenity");
  await capture(phone, "bouquet-mobile.png");
  await captureFooter(phone, "footer-mobile.png", { width: 390, height: 2400 });
  await mobile.close();
} finally {
  await browser.close();
}
