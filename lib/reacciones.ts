export type Reacciones = {
  meEncanta: number;
  comentarios: number;
  compartidos: number;
  guardados: number;
};

function semilla(texto: string): number {
  let hash = 0;
  for (const letra of texto) {
    hash = (hash * 31 + letra.charCodeAt(0)) % 100_000;
  }
  return hash;
}

export function getReacciones(slug: string): Reacciones {
  const base = semilla(slug);
  return {
    meEncanta: 1_000 + (base % 9_000),
    comentarios: 50 + (base % 900),
    compartidos: 20 + (base % 400),
    guardados: 10 + (base % 300),
  };
}

export function formatearContador(valor: number): string {
  if (valor >= 1_000) {
    return `${(valor / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(valor);
}
