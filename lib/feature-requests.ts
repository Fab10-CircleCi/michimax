export const UPSTREAM_REPO_URL = "https://github.com/Fab10-CircleCi/michimax";

export type FeatureRequest = {
  id: string;
  number: number;
  title: string;
  summary: string;
  branch: string;
  fallbackBranch: string;
  prompt: string;
};

const PROJECT_CONTEXT = `Contexto del proyecto (Michimax, streaming de telenovelas felinas en formato vertical):
- Next.js 16 (App Router) con React 19 y TypeScript.
- Estilos con CSS Modules nativo (un archivo *.module.css junto a cada componente) y variables de diseño en app/globals.css. No uses Tailwind ni librerías de componentes.
- Todo el contenido visible va en español de México.
- Datos de telenovelas, capítulos y reparto en lib/telenovelas.ts.
- Componentes en components/. La página de detalle es app/telenovelas/[slug]/page.tsx y usa el reproductor vertical components/EpisodePlayer.tsx.
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
    summary:
      "Botones flotantes estilo TikTok sobre el reproductor vertical para reaccionar a cada capítulo.",
    branch: "feat/reacciones",
    fallbackBranch: "fallback/01-reacciones",
    prompt: buildPrompt(
      "Botonera de reacciones",
      "Como fan de las telenovelas felinas quiero reaccionar a cada capítulo desde el reproductor vertical, como en TikTok, para mostrar cuánto me hizo sufrir.",
      [
        "En components/EpisodePlayer.tsx, sobre el lado derecho del video, agrega una columna vertical flotante con 4 botones: «Me encanta» (corazón), «Comentarios» (globo de diálogo), «Compartir» (flecha) y «Guardar» (marcador).",
        "Diseño del equipo de marca: botones circulares de 48px que muestran solo el ícono en SVG inline, sin texto visible, para no tapar el video.",
        "Debajo de cada botón va su contador dentro de una pastilla con fondo sólido #2A1424 y texto en el color de marca «vino» #7A3B63, a 12px.",
        "«Me encanta» alterna entre activo e inactivo y suma o resta 1 a su contador. El corazón activo se pinta de #FF7EB3.",
        "«Compartir» copia al portapapeles la URL de la telenovela.",
        "Los contadores iniciales salen de un archivo nuevo lib/reacciones.ts con valores ficticios por telenovela y capítulo; al cambiar de capítulo se muestran los del capítulo actual.",
        "La botonera debe verse desde que carga la página (en celular no hay hover).",
      ],
      "feat/reacciones",
    ),
  },
  {
    id: "galeria-reparto",
    number: 2,
    title: "Galería del reparto",
    summary: "Tarjetas con foto para conocer y seguir a los gatos protagonistas de cada telenovela.",
    branch: "feat/galeria-reparto",
    fallbackBranch: "fallback/02-galeria-reparto",
    prompt: buildPrompt(
      "Galería del reparto",
      "Como fan quiero conocer al reparto de cada telenovela con fotos y seguir a mis gatos favoritos.",
      [
        "Reemplaza la lista del reparto (components/CastList.tsx) por una galería en cuadrícula: 2 columnas en celular y 3 en escritorio.",
        "Cada tarjeta es vertical (proporción 3:4) y usa como foto de fondo el póster del capítulo 1 de la telenovela (función posterPath de lib/telenovelas.ts).",
        "El nombre del gato va en una etiqueta en la esquina inferior con fondo dorado de marca #F5C518 y texto blanco #FFFFFF en negritas a 16px.",
        "Usa para el nombre el estilo «Título 5» del manual de marca, es decir, una etiqueta <h5>.",
        "Debajo del nombre, el rol y la raza en texto pequeño.",
        "Cada tarjeta tiene un botón «Seguir» que cambia a «Siguiendo» al pulsarlo; guarda los gatos seguidos en localStorage.",
        "Al tocar la tarjeta se despliega la biografía del gato debajo de la foto; al tocarla otra vez se oculta.",
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
    fallbackBranch: "fallback/03-boletin",
    prompt: buildPrompt(
      "Boletín «El Chisme Felino»",
      "Como fan quiero suscribirme al boletín semanal de chismes felinos para enterarme de estrenos, intrigas y traiciones.",
      [
        "En components/SiteFooter.tsx agrega un formulario de suscripción, visible en todas las páginas.",
        "Campos: correo electrónico, telenovela favorita (lista desplegable con las telenovelas de lib/telenovelas.ts) y una casilla para aceptar recibir chismes.",
        "Diseño minimalista de marca: sin etiquetas visibles. Los campos muestran solo un placeholder («tu@correo.com», «Telenovela favorita») y la casilla va acompañada únicamente de un ícono de sobre en lugar de texto.",
        "Botón «Suscribirme» con el dorado de marca.",
        "Debajo del formulario, un texto legal a 12px con el color #6E4A62: «Al suscribirte aceptas recibir chismes, intrigas y traiciones cada viernes. Puedes darte de baja cuando quieras.»",
        "Sin backend: al enviar, valida el correo y reemplaza el formulario por el mensaje «¡Bienvenida al chisme!».",
      ],
      "feat/boletin",
    ),
  },
  {
    id: "para-ti",
    number: 4,
    title: "Feed «Para ti»",
    summary:
      "Un feed vertical a pantalla completa, tipo TikTok, con todos los capítulos de Michimax.",
    branch: "feat/para-ti",
    fallbackBranch: "fallback/04-para-ti",
    prompt: buildPrompt(
      "Feed «Para ti»",
      "Como fan quiero un feed vertical tipo TikTok con todos los capítulos de Michimax para descubrir telenovelas nuevas deslizando con el dedo.",
      [
        "Nueva página /para-ti (app/para-ti/page.tsx) y un enlace «Para ti» en la navegación principal (components/NavLinks.tsx).",
        "Feed a pantalla completa con desplazamiento vertical que encaja un capítulo por pantalla. Incluye todos los capítulos de todas las telenovelas, mezclados.",
        "Cada capítulo se reproduce automáticamente en silencio cuando ocupa la pantalla y se pausa al salir. Agrega un control para activar o silenciar el sonido.",
        "Encima del video: título de la telenovela, número y nombre del capítulo, y un enlace «Ver telenovela».",
        "Barra de progreso del capítulo en la parte inferior del video.",
        "Doble toque sobre el video para dar «me encanta», con una animación de corazón.",
        "Panel inferior deslizable de comentarios con comentarios ficticios y un formulario para agregar uno nuevo (solo en el cliente).",
        "En escritorio el feed se centra con un ancho máximo de 420px y tiene flechas para ir al capítulo anterior o siguiente.",
        "Que se sienta fluido y moderno, como una app de video corto.",
      ],
      "feat/para-ti",
    ),
  },
];

export function fallbackCommand(request: FeatureRequest): string {
  return `git fetch ${UPSTREAM_REPO_URL}.git ${request.fallbackBranch} && git switch -c ${request.branch} FETCH_HEAD && git push -u origin ${request.branch}`;
}
