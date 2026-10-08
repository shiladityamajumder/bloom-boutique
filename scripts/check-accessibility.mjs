import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({
  channel: process.env.BROWSER_CHANNEL || "msedge",
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const reports = [];
try {
  for (const route of ["/", "/shop", "/product/blush-serenity", "/contact"]) {
    await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    const report = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    reports.push({ route, violations: report.violations });
    console.log(
      JSON.stringify({
        route,
        violations: report.violations.map((v) => ({
          id: v.id,
          targets: v.nodes.map((n) => n.target),
        })),
      }),
    );
  }
  await page.setViewportSize({ width: 320, height: 780 });
  for (const route of ["/", "/shop", "/product/blush-serenity", "/contact"]) {
    await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    const widths = await page.evaluate(() => ({
      page: document.documentElement.scrollWidth,
      viewport: innerWidth,
    }));
    console.log(JSON.stringify({ route, narrowViewport: widths }));
    if (widths.page > widths.viewport) process.exitCode = 1;
  }
  await mkdir("artifacts", { recursive: true });
  await writeFile(
    "artifacts/accessibility-report.json",
    JSON.stringify(reports, null, 2),
  );
  if (reports.some((r) => r.violations.length)) process.exitCode = 1;
} finally {
  await browser.close();
}
