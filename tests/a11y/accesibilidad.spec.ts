import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { join } from "node:path";
import { formatReport, summarizeIncomplete, type AxeViolation, type PageViolations } from "./axe-report";
import { discoverStaticRoutes, toInternalPage } from "./routes";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];
const MAX_CRAWLED_PAGES = 60;

const staticRoutes = discoverStaticRoutes(join(process.cwd(), "app"));

type ScanResult = PageViolations & { incomplete: AxeViolation[] };

async function scan(page: Page, route: string): Promise<ScanResult> {
  const response = await page.goto(route, { waitUntil: "load" });
  expect(response?.status(), `La página ${route} respondió con error`).toBeLessThan(400);
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  return { page: route, violations: results.violations, incomplete: results.incomplete };
}

function noteIncomplete(results: ScanResult[], annotations: { type: string; description?: string }[]) {
  const summary = summarizeIncomplete(results);
  if (summary) {
    annotations.push({ type: "revisión manual (axe no pudo decidir)", description: summary });
  }
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
      const result = await scan(page, route);
      noteIncomplete([result], testInfo.annotations);
      expect(result.violations.length, formatReport([result], testInfo.project.name)).toBe(0);
    });
  }

  test("páginas descubiertas por enlaces", async ({ page, baseURL }, testInfo) => {
    const origin = new URL(baseURL!).origin;
    const queue = [...staticRoutes];
    const seen = new Set(staticRoutes);
    const results: ScanResult[] = [];

    while (queue.length > 0) {
      expect(results.length, `Se alcanzó el límite de ${MAX_CRAWLED_PAGES} páginas escaneadas`).toBeLessThan(
        MAX_CRAWLED_PAGES,
      );
      const route = queue.shift()!;

      if (staticRoutes.includes(route)) {
        // Las rutas estáticas ya tienen su propia prueba; aquí solo se leen sus enlaces.
        await page.goto(route, { waitUntil: "load" });
      } else {
        results.push(await scan(page, route));
      }

      for (const link of await internalLinks(page, origin)) {
        if (!seen.has(link)) {
          seen.add(link);
          queue.push(link);
        }
      }
    }

    testInfo.annotations.push({ type: "páginas escaneadas", description: String(results.length) });
    noteIncomplete(results, testInfo.annotations);
    expect(results.length, "No se descubrió ninguna página dinámica para revisar").toBeGreaterThan(0);

    const failing = results.filter((result) => result.violations.length > 0);
    expect(failing.length, formatReport(failing, testInfo.project.name)).toBe(0);
  });
});
