import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { formatViolations, type AxeViolation } from "../a11y/axe-report";
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
    page(app, "telenovelas", "[slug]");
    page(app, "@modal", "login");
    page(app, "_privado");

    expect(discoverStaticRoutes(app)).toEqual(["/", "/acerca", "/solicitudes"]);
  });
});

describe("toInternalPage", () => {
  const origin = "http://localhost:3000";

  it("normaliza enlaces internos", () => {
    expect(toInternalPage("/telenovelas/michimar#reparto", origin)).toBe("/telenovelas/michimar");
    expect(toInternalPage("/solicitudes/?x=1", origin)).toBe("/solicitudes");
    expect(toInternalPage("http://localhost:3000/", origin)).toBe("/");
  });

  it("descarta enlaces externos y archivos", () => {
    expect(toInternalPage("https://circleci.com", origin)).toBeNull();
    expect(toInternalPage("/videos/michimar-1.mp4", origin)).toBeNull();
    expect(toInternalPage("/_next/static/chunk", origin)).toBeNull();
  });
});

describe("formatViolations", () => {
  it("resume regla, selector, HTML y cómo arreglarlo", () => {
    const violation = {
      id: "color-contrast",
      impact: "serious",
      help: "Elements must meet minimum color contrast ratio thresholds",
      helpUrl: "https://dequeuniversity.com/rules/axe/4.11/color-contrast",
      nodes: [
        {
          target: [".contador"],
          html: '<span class="contador">\n  1.2k\n</span>',
          failureSummary: "Fix any of the following:\n  Element has insufficient color contrast of 2.15",
        },
      ],
    } as unknown as AxeViolation;

    const report = formatViolations([violation], "/telenovelas/michimar (movil)");

    expect(report).toContain("1 regla con violaciones de accesibilidad (1 elemento) en /telenovelas/michimar (movil)");
    expect(report).toContain("[color-contrast] impacto: serious");
    expect(report).toContain("Selector: .contador");
    expect(report).toContain('HTML: <span class="contador"> 1.2k </span>');
    expect(report).toContain("insufficient color contrast of 2.15");
    expect(report).toContain("https://dequeuniversity.com/rules/axe/4.11/color-contrast");
  });
});
