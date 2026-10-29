# Michimax 🐾

**El streaming de telenovelas felinas en formato vertical.** Capítulos cortitos, villanas con bigotes y amores imposibles entre croquetas.

Michimax es un sitio ficticio creado para el taller de integración continua con CircleCI. Ningún gato fue maltratado durante su producción.

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
  telenovelas/[slug]/ Detalle con el reproductor vertical
  solicitudes/        Funcionalidades para el taller
components/           Componentes con su CSS Module
lib/                  Datos y utilidades
public/videos/        Capítulos (mp4 9:16) y subtítulos (WebVTT)
public/posters/       Pósters de cada capítulo
tests/unit/           Pruebas unitarias
scripts/              Generador de videos y pósters
```

## Notas

- **Agregar dependencias:** npm 10.9 (el que trae Node 22) falla al resolver algunas dependencias de este proyecto. Usa `npx npm@11 install <paquete>`. `npm ci` funciona con cualquier versión.
- **Regenerar los videos:** `npm run media` (requiere `ffmpeg` y `npx playwright install chromium`).
