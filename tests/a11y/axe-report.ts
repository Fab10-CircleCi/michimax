import type AxeBuilder from "@axe-core/playwright";

export type AxeViolation = Awaited<ReturnType<AxeBuilder["analyze"]>>["violations"][number];

export const MAX_NODES_PER_RULE = 3;
const MAX_HTML_LENGTH = 300;

function truncate(value: string, max: number): string {
  const singleLine = value.replace(/\s+/g, " ").trim();
  return singleLine.length > max ? `${singleLine.slice(0, max)}…` : singleLine;
}

function indent(text: string, spaces: number): string {
  const pad = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => `${pad}${line}`)
    .join("\n");
}

function formatTarget(target: AxeViolation["nodes"][number]["target"]): string {
  return target.map((part) => (Array.isArray(part) ? part.join(" >>> ") : part)).join(" ");
}

export function formatViolations(violations: AxeViolation[], page: string): string {
  const total = violations.reduce((sum, violation) => sum + violation.nodes.length, 0);
  const header =
    `axe-core encontró ${violations.length} ${violations.length === 1 ? "regla" : "reglas"} ` +
    `con violaciones de accesibilidad (${total} ${total === 1 ? "elemento" : "elementos"}) en ${page}.`;

  const sections = violations.map((violation, index) => {
    const shown = violation.nodes.slice(0, MAX_NODES_PER_RULE);
    const nodes = shown.map((node) =>
      [
        `• Selector: ${formatTarget(node.target)}`,
        `  HTML: ${truncate(node.html, MAX_HTML_LENGTH)}`,
        `  Cómo arreglarlo:`,
        indent(node.failureSummary ?? "Revisa la regla en la documentación.", 4),
      ].join("\n"),
    );

    return [
      `${index + 1}. [${violation.id}] impacto: ${violation.impact ?? "desconocido"}`,
      `   Problema: ${violation.help}`,
      `   Documentación: ${violation.helpUrl}`,
      `   Elementos afectados: ${violation.nodes.length} (se muestran ${shown.length})`,
      indent(nodes.join("\n"), 3),
    ].join("\n");
  });

  return [header, ...sections].join("\n\n");
}
