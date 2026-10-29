import type AxeBuilder from "@axe-core/playwright";

export type AxeViolation = Awaited<ReturnType<AxeBuilder["analyze"]>>["violations"][number];
type AxeNode = AxeViolation["nodes"][number];

export type PageViolations = {
  page: string;
  violations: AxeViolation[];
};

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

function formatTarget(target: AxeNode["target"]): string {
  return target.map((part) => (Array.isArray(part) ? part.join(" >>> ") : part)).join(" ");
}

function plural(count: number, singular: string, pluralForm: string): string {
  return `${count} ${count === 1 ? singular : pluralForm}`;
}

type RuleGroup = {
  violation: AxeViolation;
  pages: string[];
  nodes: AxeNode[];
};

/** Agrupa por regla: la misma violación en varias páginas se reporta una sola vez. */
function groupByRule(results: PageViolations[]): RuleGroup[] {
  const groups = new Map<string, RuleGroup>();

  for (const { page, violations } of results) {
    for (const violation of violations) {
      const group = groups.get(violation.id) ?? { violation, pages: [], nodes: [] };
      if (!group.pages.includes(page)) group.pages.push(page);
      for (const node of violation.nodes) {
        const key = `${formatTarget(node.target)}|${node.html}`;
        if (!group.nodes.some((known) => `${formatTarget(known.target)}|${known.html}` === key)) {
          group.nodes.push(node);
        }
      }
      groups.set(violation.id, group);
    }
  }

  return [...groups.values()];
}

function formatGroup({ violation, pages, nodes }: RuleGroup, index: number): string {
  const shown = nodes.slice(0, MAX_NODES_PER_RULE);
  const summaries = new Set(shown.map((node) => node.failureSummary ?? ""));
  const sharedSummary = summaries.size === 1 ? [...summaries][0] : null;

  const nodeLines = shown.map((node) => {
    const lines = [`• Selector: ${formatTarget(node.target)}`, `  HTML: ${truncate(node.html, MAX_HTML_LENGTH)}`];
    if (!sharedSummary) {
      lines.push("  Cómo arreglarlo:", indent(node.failureSummary ?? "", 4));
    }
    return lines.join("\n");
  });

  const lines = [
    `${index + 1}. [${violation.id}] impacto: ${violation.impact ?? "desconocido"}`,
    `   Problema: ${violation.help}`,
    `   Páginas: ${pages.join(", ")}`,
    `   Documentación: ${violation.helpUrl}`,
    `   Elementos afectados: ${nodes.length} distintos (se muestran ${shown.length})`,
    indent(nodeLines.join("\n"), 3),
  ];
  if (sharedSummary) {
    lines.push("   Cómo arreglarlo:", indent(sharedSummary, 5));
  }
  return lines.join("\n");
}

export function formatReport(results: PageViolations[], context: string): string {
  const failing = results.filter((result) => result.violations.length > 0);
  const groups = groupByRule(failing);
  const header =
    `axe-core encontró ${plural(groups.length, "regla", "reglas")} con violaciones de accesibilidad ` +
    `en ${plural(failing.length, "página", "páginas")} (${context}).`;

  return [header, ...groups.map(formatGroup)].join("\n\n");
}
