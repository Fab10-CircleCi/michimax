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
  nodes: { node: AxeNode; page: string }[];
};

export const REPRODUCE_COMMAND = "npm run test:a11y";

/** Agrupa por regla: la misma violación en varias páginas se reporta una sola vez. */
function groupByRule(results: PageViolations[]): RuleGroup[] {
  const groups = new Map<string, RuleGroup>();

  for (const { page, violations } of results) {
    for (const violation of violations) {
      const group = groups.get(violation.id) ?? { violation, pages: [], nodes: [] };
      if (!group.pages.includes(page)) group.pages.push(page);
      for (const node of violation.nodes) {
        const key = `${formatTarget(node.target)}|${node.html}`;
        if (!group.nodes.some((known) => `${formatTarget(known.node.target)}|${known.node.html}` === key)) {
          group.nodes.push({ node, page });
        }
      }
      groups.set(violation.id, group);
    }
  }

  return [...groups.values()];
}

function formatGroup({ violation, pages, nodes }: RuleGroup, index: number): string {
  const shown = nodes.slice(0, MAX_NODES_PER_RULE);
  const summaries = new Set(shown.map(({ node }) => node.failureSummary ?? ""));
  const sharedSummary = summaries.size === 1 ? [...summaries][0] : null;

  const nodeLines = shown.map(({ node, page }) => {
    const lines = [
      `• Página: ${page}`,
      `  Selector: ${formatTarget(node.target)}`,
      `  HTML: ${truncate(node.html, MAX_HTML_LENGTH)}`,
    ];
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

  const footer = `Reprodúcelo localmente con: ${REPRODUCE_COMMAND}`;
  return [header, ...groups.map(formatGroup), footer].join("\n\n");
}

/** Reglas que axe no pudo decidir (por ejemplo, texto sobre video o capas encimadas). No bloquean. */
export function summarizeIncomplete(results: { page: string; incomplete: AxeViolation[] }[]): string | null {
  const counts = new Map<string, number>();
  for (const { incomplete } of results) {
    for (const rule of incomplete) {
      counts.set(rule.id, (counts.get(rule.id) ?? 0) + rule.nodes.length);
    }
  }
  if (counts.size === 0) return null;
  return [...counts].map(([rule, count]) => `${rule} (${count})`).join(", ");
}
