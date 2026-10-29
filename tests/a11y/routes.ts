import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const PAGE_FILES = ["page.tsx", "page.ts", "page.jsx", "page.js", "page.mdx"];

function isRouteGroup(name: string): boolean {
  return name.startsWith("(") && name.endsWith(")") && !name.startsWith("(.");
}

function isSkipped(name: string): boolean {
  // Carpetas privadas (_x), slots paralelos (@x), rutas interceptadas ((.)x) y segmentos dinámicos ([x]).
  // Los segmentos dinámicos se descubren navegando los enlaces del sitio.
  return name.startsWith("_") || name.startsWith("@") || name.startsWith("(.") || name.startsWith("[");
}

/** Rutas estáticas del App Router a partir de las carpetas con page.tsx. */
export function discoverStaticRoutes(appDir: string, segments: string[] = []): string[] {
  const routes: string[] = [];
  const dir = join(appDir, ...segments);

  if (PAGE_FILES.some((file) => existsSync(join(dir, file)))) {
    const urlSegments = segments.filter((segment) => !isRouteGroup(segment));
    routes.push(`/${urlSegments.join("/")}`);
  }

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && !isSkipped(entry.name)) {
      routes.push(...discoverStaticRoutes(appDir, [...segments, entry.name]));
    }
  }

  return [...new Set(routes)].sort();
}

/** Normaliza un enlace a una ruta interna del sitio, o null si no es una página interna. */
export function toInternalPage(href: string, origin: string): string | null {
  let url: URL;
  try {
    url = new URL(href, origin);
  } catch {
    return null;
  }

  if (url.origin !== origin) return null;
  // Archivos estáticos (videos, imágenes, subtítulos) y rutas internas de Next.
  if (/\.[a-z0-9]+$/i.test(url.pathname) || url.pathname.startsWith("/_next/")) return null;

  const pathname = url.pathname.replace(/\/+$/, "");
  return pathname === "" ? "/" : pathname;
}
