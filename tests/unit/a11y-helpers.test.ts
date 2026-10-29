import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { formatReport, summarizeIncomplete, type AxeViolation } from "../a11y/axe-report";
import { discoverStaticRoutes, toInternalPage } from "../a11y/routes";

function page(dir: string, ...segments: string[]) {
  const folder = join(dir, ...segments);
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, "page.tsx"), "export default function Page() {}");
}

describe("discoverStaticRoutes", () => {
  it("encuentra rutas estáticas e ignora grupos, slots y segmentos dinámicos", () => {
    const app = mkdtempSync(join(tmpdir(), "michimax-app-"));
    page(app);
    page(app, "solicitudes");
    page(app, "(marketing)", "acerca");
    page(app, "titulos", "[slug]");
    page(app, "@modal", "login");
    page(app, "_privado");

    expect(discoverStaticRoutes(app)).toEqual(["/", "/acerca", "/solicitudes"]);
  });
});

describe("toInternalPage", () => {
  const origin = "http://localhost:3000";

  it("normaliza enlaces internos", () => {
    expect(toInternalPage("/titulos/the-midnight-prowler#reparto", origin)).toBe("/titulos/the-midnight-prowler");
    expect(toInternalPage("/solicitudes/?x=1", origin)).toBe("/solicitudes");
    expect(toInternalPage("http://localhost:3000/", origin)).toBe("/");
  });

  it("descarta enlaces externos y archivos", () => {
    expect(toInternalPage("https://circleci.com", origin)).toBeNull();
    expect(toInternalPage("/titulos/meowcha/clip.mp4", origin)).toBeNull();
    expect(toInternalPage("/_next/static/chunk", origin)).toBeNull();
  });
});

describe("formatReport", () => {
  const violation = {
    id: "color-contrast",
    impact: "serious",
    help: "Elements must meet minimum color contrast ratio thresholds",
    helpUrl: "https://dequeuniversity.com/rules/axe/4.14/color-contrast",
    nodes: [
      {
        target: [".contador"],
        html: '<span class="contador">\n  1.2k\n</span>',
        failureSummary: "Fix any of the following:\n  Element has insufficient color contrast of 2.15",
      },
    ],
  } as unknown as AxeViolation;

  it("resume regla, páginas, selector, HTML y cómo arreglarlo", () => {
    const report = formatReport([{ page: "/titulos/the-midnight-prowler", violations: [violation] }], "movil");

    expect(report).toContain("1 regla con violaciones de accesibilidad en 1 página (movil)");
    expect(report).toContain("[color-contrast] impacto: serious");
    expect(report).toContain("Páginas: /titulos/the-midnight-prowler");
    expect(report).toContain("Selector: .contador");
    expect(report).toContain('HTML: <span class="contador"> 1.2k </span>');
    expect(report).toContain("insufficient color contrast of 2.15");
    expect(report).toContain("https://dequeuniversity.com/rules/axe/4.14/color-contrast");
    expect(report).toContain("Reprodúcelo localmente con: npm run test:a11y");
  });

  it("agrupa la misma violación de varias páginas en una sola entrada", () => {
    const report = formatReport(
      [
        { page: "/titulos/the-midnight-prowler", violations: [violation] },
        { page: "/titulos/meowcha", violations: [violation] },
      ],
      "escritorio",
    );

    expect(report).toContain("1 regla con violaciones de accesibilidad en 2 páginas");
    expect(report).toContain("Páginas: /titulos/the-midnight-prowler, /titulos/meowcha");
    expect(report).toContain("Elementos afectados: 1 distintos");
    expect(report.match(/Selector:/g)).toHaveLength(1);
    expect(report).toContain("• Página: /titulos/the-midnight-prowler");
  });
});

describe("summarizeIncomplete", () => {
  it("cuenta los elementos que axe no pudo decidir por regla", () => {
    const incomplete = [{ id: "color-contrast", nodes: [{}, {}] }] as unknown as AxeViolation[];

    expect(summarizeIncomplete([{ page: "/", incomplete }])).toBe("color-contrast (2)");
    expect(summarizeIncomplete([{ page: "/", incomplete: [] }])).toBeNull();
  });
});
