export const UPSTREAM_REPO_URL = "https://github.com/Fab10-CircleCi/michimax";

export type FeatureRequest = {
  id: string;
  number: number;
  title: string;
  summary: string;
  /** Rama que crea el agente del asistente. */
  branch: string;
  /** Paso 2 del taller: la funcionalidad ya construida, rompiendo la accesibilidad. */
  brokenBranch: string;
  /** Paso 3 del taller: la misma funcionalidad, arreglada. */
  fixedBranch: string;
  prompt: string;
};

const PROJECT_CONTEXT = `Contexto del proyecto (Michimax, plataforma de streaming de series, películas y documentales felinos, con clips verticales 9:16):
- Next.js 16 (App Router) con React 19 y TypeScript.
- Estilos con CSS Modules nativo (un archivo *.module.css junto a cada componente) y variables de diseño en app/globals.css. No uses Tailwind ni librerías de componentes.
- Todo el contenido visible va en español de México (los nombres de los títulos van en inglés).
- Catálogo de 30 títulos en 10 categorías en lib/catalog.ts (sinopsis, reparto, clip y tres fotogramas por título).
- Componentes en components/. La portada es app/page.tsx (filas por categoría con components/CategoryRow.tsx). La página de cada título es app/titulos/[slug]/page.tsx y usa el reproductor vertical components/ShowPlayer.tsx.
- Pruebas unitarias con Vitest y Testing Library en tests/unit/.`;

function closing(branch: string): string {
  return `Al terminar:
1. Agrega o actualiza pruebas unitarias en tests/unit/ para lo que construiste.
2. Verifica que pasen \`npm run lint\`, \`npm run typecheck\` y \`npm test\`.
3. Crea la rama \`${branch}\`, haz commit con un mensaje descriptivo y haz push a \`origin\`. No hace falta abrir un pull request.`;
}

function buildPrompt(title: string, story: string, requirements: string[], branch: string): string {
  return [
    `Implementa la funcionalidad "${title}" en este repositorio.`,
    PROJECT_CONTEXT,
    `Historia de usuario:\n${story}`,
    `Requisitos:\n${requirements.map((requirement) => `- ${requirement}`).join("\n")}`,
    closing(branch),
  ].join("\n\n");
}

export const featureRequests: FeatureRequest[] = [
  {
    id: "reacciones",
    number: 1,
    title: "Botonera de reacciones",
    summary: "Botones flotantes estilo TikTok sobre el reproductor vertical para reaccionar a cada título.",
    branch: "feat/reacciones",
    brokenBranch: "02-feature-01-reacciones-BROKEN",
    fixedBranch: "03-feature-01-reacciones-FIXED",
    prompt: buildPrompt(
      "Botonera de reacciones",
      "Como fan de Michimax quiero reaccionar a cada título desde el reproductor vertical, como en TikTok, para mostrar qué tanto me gustó.",
      [
        "En components/ShowPlayer.tsx, sobre el lado derecho del clip, agrega una columna vertical flotante con 4 botones: «Me encanta» (corazón), «Comentarios» (globo de diálogo), «Compartir» (flecha) y «Mi lista» (marcador).",
        "Diseño del equipo de marca: botones circulares de 48px que muestran solo el ícono en SVG inline, sin texto visible, para no tapar el video.",
        "Debajo de cada botón va su contador dentro de una pastilla con fondo sólido #2A1424 y texto en el color de marca «vino» #7A3B63, a 12px.",
        "«Me encanta» alterna entre activo e inactivo y suma o resta 1 a su contador. El corazón activo se pinta de #FF7EB3.",
        "«Compartir» copia al portapapeles la URL del título.",
        "Los contadores iniciales salen de un archivo nuevo lib/reacciones.ts con valores ficticios por título.",
        "La botonera debe verse desde que carga la página (en celular no hay hover).",
      ],
      "feat/reacciones",
    ),
  },
  {
    id: "galeria-reparto",
    number: 2,
    title: "Galería del reparto",
    summary: "Tarjetas con foto para conocer y seguir a los gatos protagonistas de cada título.",
    branch: "feat/galeria-reparto",
    brokenBranch: "02-feature-02-galeria-BROKEN",
    fixedBranch: "03-feature-02-galeria-FIXED",
    prompt: buildPrompt(
      "Galería del reparto",
      "Como fan quiero conocer al reparto de cada título con fotos y seguir a mis gatos favoritos.",
      [
        "Reemplaza la lista del reparto (components/CastList.tsx) por una galería en cuadrícula: 2 columnas en celular y 3 en escritorio.",
        "Cada tarjeta es vertical (proporción 3:4) y usa como foto de fondo uno de los fotogramas del título (función stillPath de lib/catalog.ts), en orden.",
        "El nombre del gato va en una etiqueta en la esquina inferior con fondo dorado de marca #F5C518 y texto blanco #FFFFFF en negritas a 16px.",
        "Usa para el nombre el estilo «Título 5» del manual de marca, es decir, una etiqueta <h5>.",
        "Cada tarjeta tiene un botón «Seguir» que cambia a «Siguiendo» al pulsarlo; guarda los gatos seguidos en localStorage.",
        "Al tocar la tarjeta se despliega debajo de la foto la frase «Estrella de <título>»; al tocarla otra vez se oculta.",
      ],
      "feat/galeria-reparto",
    ),
  },
  {
    id: "boletin",
    number: 3,
    title: "Boletín «El Chisme Felino»",
    summary: "Formulario de suscripción al boletín semanal en el pie de página de todo el sitio.",
    branch: "feat/boletin",
    brokenBranch: "02-feature-03-boletin-BROKEN",
    fixedBranch: "03-feature-03-boletin-FIXED",
    prompt: buildPrompt(
      "Boletín «El Chisme Felino»",
      "Como fan quiero suscribirme al boletín semanal de Michimax para enterarme de estrenos, chismes y nuevas temporadas.",
      [
        "En components/SiteFooter.tsx agrega un formulario de suscripción, visible en todas las páginas.",
        "Campos: correo electrónico, título favorito (lista desplegable con los títulos de lib/catalog.ts) y una casilla para aceptar recibir el boletín.",
        "Diseño minimalista de marca: sin etiquetas visibles. Los campos muestran solo un placeholder («tu@correo.com», «Título favorito») y la casilla va acompañada únicamente de un ícono de sobre en lugar de texto.",
        "Botón «Suscribirme» con el dorado de marca.",
        "Debajo del formulario, un texto legal a 12px con el color #6E4A62: «Al suscribirte aceptas recibir estrenos, chismes y recomendaciones cada viernes. Puedes darte de baja cuando quieras.»",
        "Sin backend: al enviar, valida el correo y reemplaza el formulario por el mensaje «¡Bienvenida al chisme!».",
      ],
      "feat/boletin",
    ),
  },
  {
    id: "para-ti",
    number: 4,
    title: "Feed «Para ti»",
    summary: "Un feed vertical a pantalla completa, tipo TikTok, con los clips de todo el catálogo.",
    branch: "feat/para-ti",
    brokenBranch: "02-feature-04-parati-BROKEN",
    fixedBranch: "03-feature-04-parati-FIXED",
    prompt: buildPrompt(
      "Feed «Para ti»",
      "Como fan quiero un feed vertical tipo TikTok con los clips de todo Michimax para descubrir títulos nuevos deslizando con el dedo.",
      [
        "Nueva página /para-ti (app/para-ti/page.tsx) y un enlace «Para ti» en la navegación principal (components/NavLinks.tsx).",
        "Feed a pantalla completa con desplazamiento vertical que encaja un clip por pantalla. Incluye los clips de los 30 títulos, mezclando categorías.",
        "Cada clip se reproduce automáticamente cuando ocupa la pantalla y se pausa al salir.",
        "Encima del video: nombre del título, categoría, porcentaje de coincidencia y un enlace «Ver título».",
        "Barra de progreso del clip en la parte inferior del video.",
        "Doble toque sobre el video para dar «me encanta», con una animación de corazón.",
        "Panel inferior deslizable de comentarios con comentarios ficticios y un formulario para agregar uno nuevo (solo en el cliente).",
        "En escritorio el feed se centra con un ancho máximo de 420px y tiene flechas para ir al clip anterior o siguiente.",
        "Que se sienta fluido y moderno, como una app de video corto.",
      ],
      "feat/para-ti",
    ),
  },
];

/** Trae una rama del repositorio original a tu fork, con el mismo nombre. Se puede repetir sin error. */
export function branchCommand(branch: string): string {
  return `git fetch ${UPSTREAM_REPO_URL}.git ${branch} && git switch -C ${branch} FETCH_HEAD && git push -u origin ${branch}`;
}
