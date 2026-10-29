export type Idea = {
  title: string;
  description: string;
  /** Lo que hay que cuidar para que la funcionalidad siga siendo accesible. */
  accessibility: string;
};

/** Ideas para seguir construyendo después del taller. Cada una está pensada para 10–15 minutos con un agente. */
export const ideas: Idea[] = [
  {
    title: "Búsqueda en vivo",
    description: "Un campo en el encabezado que filtra los 30 títulos por nombre, categoría o reparto, con su página de resultados.",
    accessibility: "Etiqueta visible en el campo y el número de resultados anunciado en una región aria-live.",
  },
  {
    title: "Mi lista",
    description: "Botón «Agregar a Mi lista» en cada título y una página /mi-lista que guarde la selección en localStorage.",
    accessibility: "El botón anuncia si el título ya está en la lista (aria-pressed) y la página vacía explica qué hacer.",
  },
  {
    title: "Continuar viendo",
    description: "Recuerda en qué segundo se quedó cada clip y muestra una fila «Continuar viendo» en la portada.",
    accessibility: "La barra de progreso de cada tarjeta tiene nombre («Visto 40 % de …»).",
  },
  {
    title: "Páginas por categoría",
    description: "Una página /categorias/[id] con los títulos de cada categoría, enlazada desde la barra lateral.",
    accessibility: "Un solo h1 por página y la categoría actual marcada con aria-current en la barra.",
  },
  {
    title: "Control parental",
    description: "Un selector de clasificación máxima (de TV-G a TV-MA) que oculta los títulos que la superan.",
    accessibility: "Agrupa las opciones en un fieldset con legend y anuncia cuántos títulos quedaron ocultos.",
  },
  {
    title: "Top 10 en México",
    description: "Una fila con los diez títulos de mayor coincidencia, con su número de posición bien grande.",
    accessibility: "Usa una lista ordenada real: el número no puede existir solo como decoración visual.",
  },
  {
    title: "Reseñas con estrellas",
    description: "Califica cada título de 1 a 5 estrellas y muestra el promedio de las calificaciones guardadas.",
    accessibility: "Un grupo de radios con nombre en cada opción («4 de 5 estrellas»), no solo íconos.",
  },
  {
    title: "Atajos del reproductor",
    description: "Espacio pausa, las flechas avanzan o regresan 1 segundo y la M silencia, con una ayuda visible de los atajos.",
    accessibility: "Los atajos no deben activarse mientras el foco está en un campo de texto.",
  },
  {
    title: "Modo cine",
    description: "Un botón que agranda el reproductor y oscurece el resto de la página; Escape lo cierra.",
    accessibility: "El foco queda dentro del modo cine mientras está abierto y regresa al botón al cerrarlo.",
  },
  {
    title: "Tema claro",
    description: "Alterna entre tema claro y oscuro, empezando por la preferencia del sistema y recordando la elección.",
    accessibility: "Contraste AA en los dos temas: agrega una prueba de accesibilidad que también escanee el tema claro.",
  },
  {
    title: "Compartir título",
    description: "Un botón que copia el enlace del título y confirma con el mensaje «Enlace copiado».",
    accessibility: "El mensaje se anuncia con role=\"status\" sin mover el foco.",
  },
  {
    title: "«Porque viste…»",
    description: "Recomendaciones en cada título según las etiquetas que comparte con otros del catálogo.",
    accessibility: "La lógica vive en una función pura con pruebas unitarias de los casos borde (sin coincidencias, empates).",
  },
  {
    title: "Ordenar el catálogo",
    description: "Ordena los títulos de una categoría por coincidencia, año o nombre.",
    accessibility: "Un select con etiqueta, y el nuevo orden anunciado después de cambiarlo.",
  },
  {
    title: "Calendario de estrenos",
    description: "Una página con los próximos estrenos ficticios del mes y su fecha.",
    accessibility: "Una tabla con caption y encabezados (th con scope), no una cuadrícula de divs.",
  },
  {
    title: "Flechas en las filas",
    description: "Botones de anterior y siguiente para recorrer cada fila del catálogo en escritorio.",
    accessibility: "Cada botón dice qué fila mueve y se deshabilita al llegar a un extremo.",
  },
  {
    title: "Vista previa en las tarjetas",
    description: "Al pasar el mouse por una tarjeta se reproduce su clip en miniatura.",
    accessibility: "También funciona al enfocar con el teclado y no se reproduce si se pidió menos movimiento.",
  },
  {
    title: "Página 404 útil",
    description: "Cuando el título no existe, sugiere los tres títulos con el nombre más parecido a la URL.",
    accessibility: "Un h1 claro y la función de similitud cubierta con pruebas unitarias.",
  },
  {
    title: "Galería de fotogramas ampliable",
    description: "Al tocar un fotograma se abre en grande, con flechas para pasar al siguiente.",
    accessibility: "Un diálogo con nombre que se cierra con Escape y devuelve el foco a la miniatura.",
  },
  {
    title: "Aviso de estreno",
    description: "Un banner de estreno en la portada que se puede cerrar y no vuelve a aparecer.",
    accessibility: "El botón para cerrar tiene nombre y el banner no tapa contenido ni roba el foco.",
  },
  {
    title: "Comparar dos títulos",
    description: "Elige dos títulos y ve su categoría, año, clasificación y reparto lado a lado.",
    accessibility: "Una tabla con encabezados de fila y de columna, y los selectores con etiqueta.",
  },
];
