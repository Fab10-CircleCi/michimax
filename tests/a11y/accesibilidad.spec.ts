import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { join } from "node:path";
import { formatReport, type AxeViolation, type PageViolations } from "./axe-report";
import { discoverStaticRoutes, toInternalPage } from "./routes";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];
const MAX_CRAWLED_PAGES = 60;

const staticRoutes = discoverStaticRoutes(join(process.cwd(), "app"));

async function scan(page: Page, route: string): Promise<AxeViolation[]> {
  const response = await page.goto(route, { waitUntil: "load" });
  expect(response?.status(), `La página ${route} respondió con error`).toBeLessThan(400);
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  return results.violations;
}

async function internalLinks(page: Page, origin: string): Promise<string[]> {
  const hrefs = await page.locator("a[href]").evaluateAll((anchors) =>
    anchors.map((anchor) => anchor.getAttribute("href") ?? ""),
  );
  return hrefs.map((href) => toInternalPage(href, origin)).filter((route) => route !== null);
}

test.describe("Accesibilidad (axe-core)", () => {
  for (const route of staticRoutes) {
    test(`página ${route}`, async ({ page }, testInfo) => {
      const violations = await scan(page, route);
      const report = formatReport([{ page: route, violations }], testInfo.project.name);
      expect(violations.length, report).toBe(0);
    });
  }

  test("páginas descubiertas por enlaces", async ({ page, baseURL }, testInfo) => {
    const origin = new URL(baseURL ?? "http://localhost:3000").origin;
    const queue = [...staticRoutes];
    const seen = new Set(staticRoutes);
    const results: PageViolations[] = [];

    while (queue.length > 0 && seen.size <= MAX_CRAWLED_PAGES) {
      const route = queue.shift()!;

      if (staticRoutes.includes(route)) {
        // Las rutas estáticas ya tienen su propia prueba; aquí solo se leen sus enlaces.
        await page.goto(route, { waitUntil: "load" });
      } else {
        results.push({ page: route, violations: await scan(page, route) });
      }

      for (const link of await internalLinks(page, origin)) {
        if (!seen.has(link)) {
          seen.add(link);
          queue.push(link);
        }
      }
    }

    testInfo.annotations.push({ type: "páginas escaneadas", description: String(results.length) });
    expect(results.length, "No se descubrió ninguna página dinámica para revisar").toBeGreaterThan(0);

    const failing = results.filter((result) => result.violations.length > 0);
    expect(failing.length, formatReport(failing, testInfo.project.name)).toBe(0);
  });
});
