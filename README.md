# Michimax 🐾

**Streaming felino en formato vertical.** Treinta series, películas, documentales y realities protagonizados por gatos, en diez categorías: de *The Midnight Prowler* a *The Crown Jewels*.

Michimax es una plataforma ficticia creada para el taller de integración continua con CircleCI. Ningún gato fue maltratado durante su producción.

## Requisitos

- Node.js 22 o superior (`nvm use` toma la versión de `.nvmrc`)
- npm
- Una cuenta de GitHub y una de CircleCI

## Empezar

```bash
npm ci
npm run dev
```

Abre <http://localhost:3000>. Las funcionalidades para construir durante el taller están en <http://localhost:3000/solicitudes>.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm run start` | Sirve la compilación de producción |
| `npm run lint` | ESLint |
| `npm run typecheck` | Revisión de tipos con TypeScript |
| `npm test` | Pruebas unitarias con Vitest |
| `npm run media` | Optimiza el material original del catálogo (ver abajo) |
| `npm run brand` | Genera los íconos y la imagen para compartir a partir de los logos originales |

## Taller: paso a paso

1. **Haz fork** de este repositorio en tu cuenta de GitHub.
2. **Conecta tu fork a CircleCI**: en CircleCI ve a *Projects*, busca tu fork de `michimax`, elige *Set Up Project* y usa el archivo `.circleci/config.yml` que ya existe en la rama `main`.
3. **Espera tu primer pipeline en verde** en `main`. Si no queda en verde, avisa antes de seguir.
4. **Clona tu fork** y arranca el sitio con `npm ci && npm run dev`.
5. **Elige una solicitud** en <http://localhost:3000/solicitudes>, copia su prompt y pégalo en tu agente de IA.
6. **Revisa tu pipeline** en CircleCI cuando el agente suba la rama a tu fork.

¿Sin tiempo para construir? Cada solicitud trae un comando para copiar una rama de respaldo ya construida.

## Estructura

```
app/                  Páginas (App Router)
  page.tsx            Portada: título destacado y una fila por categoría
  titulos/[slug]/     Página de cada título con el reproductor vertical
  solicitudes/        Funcionalidades para el taller
components/           Componentes con su CSS Module
lib/catalog.ts        Los 30 títulos y sus 10 categorías
lib/                  Otras utilidades
public/titulos/       Clip (mp4 9:16, sin audio) y tres fotogramas (WebP) por título
tests/unit/           Pruebas unitarias
scripts/              Optimizador del material del catálogo
```

## El catálogo

- Cada título tiene una sinopsis, su reparto, un clip vertical de 6 segundos y tres fotogramas. Los textos están en español de México; los nombres de los títulos van en inglés.
- Los clips no tienen audio: cada uno trae una descripción en texto y cada fotograma su texto alternativo, en `lib/catalog.ts`.
- Las imágenes y los clips se generaron con IA. Año, clasificación, porcentaje de coincidencia y reparto son inventados.

## Notas

- **Agregar dependencias:** npm 10.9 (el que trae Node 22) falla al resolver algunas dependencias de este proyecto. Usa `npx npm@11 install <paquete>`. `npm ci` funciona con cualquier versión.
- **Logos:** los originales (generados con IA) no se versionan. `npm run brand -- <carpeta>` genera `app/icon.png`, `app/apple-icon.png`, `app/opengraph-image.jpg` y `public/brand/michimax-simbolo.png`.
- **Material original:** las imágenes PNG y los clips sin comprimir (~340 MB) no se versionan. Para regenerar `public/titulos/`, coloca la carpeta original (una subcarpeta `NN-slug/` por título) en la raíz y corre `npm run media -- <carpeta>`. Requiere `ffmpeg`.
