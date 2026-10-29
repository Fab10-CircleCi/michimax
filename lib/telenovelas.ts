export type Caption = {
  start: number;
  end: number;
  text: string;
};

export type Episode = {
  number: number;
  title: string;
  captions: Caption[];
};

export type CastMember = {
  name: string;
  role: string;
  breed: string;
  bio: string;
};

export type Palette = {
  background: string;
  accent: string;
  fur: string;
};

export type Telenovela = {
  slug: string;
  title: string;
  tagline: string;
  synopsis: string;
  genre: string;
  year: number;
  palette: Palette;
  episodes: Episode[];
  cast: CastMember[];
};

export const EPISODE_SECONDS = 6;

export const telenovelas: Telenovela[] = [
  {
    slug: "michimar",
    title: "Michimar",
    tagline: "Una gatita de la playa, un gato de alcurnia y un amor imposible.",
    synopsis:
      "Michimar vive en una palapa de Puerto Escondido y solo tiene a su fiel cangrejo Pulgoso. Cuando Sergio Santibáñez, heredero de la Hacienda Croquetas, la rescata de una ola traicionera, nace un amor que su madrastra Angélica jura destruir.",
    genre: "Romance",
    year: 2026,
    palette: { background: "#0e4d64", accent: "#f8c291", fur: "#f6e3c5" },
    episodes: [
      {
        number: 1,
        title: "La gatita de la playa",
        captions: [
          { start: 0, end: 2, text: "[Música dramática]" },
          { start: 2, end: 4, text: "Michimar: ¡Yo no necesito croquetas finas para ser feliz!" },
          { start: 4, end: 6, text: "Sergio: Pues yo te las daré todas." },
        ],
      },
      {
        number: 2,
        title: "El collar de conchitas",
        captions: [
          { start: 0, end: 3, text: "Angélica: Esa gata pulgosa no entra a mi hacienda." },
          { start: 3, end: 6, text: "Michimar: ¡Pulgosa su abuela, señora!" },
        ],
      },
      {
        number: 3,
        title: "La venganza de Michimar",
        captions: [
          { start: 0, end: 2, text: "[Truenos]" },
          { start: 2, end: 6, text: "Michimar: Volví, Angélica. Y ahora soy dueña de la pescadería." },
        ],
      },
    ],
    cast: [
      {
        name: "Michimar",
        role: "Protagonista",
        breed: "Calicó criolla",
        bio: "Humilde, soñadora y con un maullido que derrite corazones.",
      },
      {
        name: "Sergio Santibáñez",
        role: "Galán",
        breed: "Azul ruso",
        bio: "Heredero de la Hacienda Croquetas; jamás ha cazado un ratón.",
      },
      {
        name: "Angélica Bigotes",
        role: "Villana",
        breed: "Persa blanca",
        bio: "Madrastra de Sergio. Odia la arena, la humildad y a Michimar.",
      },
    ],
  },
  {
    slug: "michi-la-del-barrio",
    title: "Michi la del Barrio",
    tagline: "De recoger croquetas en el mercado a heredera de la mansión.",
    synopsis:
      "Michi sobrevive en el mercado de La Merced vendiendo bolitas de estambre. Don Fernando de la Vega la adopta y la convierte en una dama, pero su sobrina Soraya hará lo imposible para que vuelva al barrio.",
    genre: "Drama",
    year: 2025,
    palette: { background: "#5b2245", accent: "#f6b93b", fur: "#3d3d3d" },
    episodes: [
      {
        number: 1,
        title: "Bolitas de estambre",
        captions: [
          { start: 0, end: 3, text: "Michi: ¡Llévele, llévele, el estambre más suavecito!" },
          { start: 3, end: 6, text: "Don Fernando: Esa gatita tiene algo especial." },
        ],
      },
      {
        number: 2,
        title: "La dama del tapete",
        captions: [
          { start: 0, end: 3, text: "Soraya: Una gata de barrio nunca será una dama." },
          { start: 3, end: 6, text: "Michi: Pero sí sabe dónde esconder sus pantuflas." },
        ],
      },
      {
        number: 3,
        title: "El secreto del sofá",
        captions: [
          { start: 0, end: 2, text: "[Música de suspenso]" },
          { start: 2, end: 6, text: "Don Fernando: Michi... tú eres mi nieta perdida." },
        ],
      },
    ],
    cast: [
      {
        name: "Michi",
        role: "Protagonista",
        breed: "Negra de ojos verdes",
        bio: "Ágil, orgullosa y experta en dormir en cajas de cartón.",
      },
      {
        name: "Don Fernando de la Vega",
        role: "Patriarca",
        breed: "Maine coon",
        bio: "Millonario de corazón noble y bigotes canosos.",
      },
      {
        name: "Soraya",
        role: "Villana",
        breed: "Sphynx",
        bio: "Sobrina ambiciosa que no tolera un solo pelo en el sillón.",
      },
    ],
  },
  {
    slug: "rubi-la-siamesa",
    title: "Rubí, la Siamesa",
    tagline: "Belleza, ambición y un collar de diamantes.",
    synopsis:
      "Rubí nació en una vecindad, pero sus ojos azules la llevan a las pasarelas de Polanco. Entre su mejor amiga Maribel y el veterinario Alejandro, Rubí elegirá siempre el cojín más caro.",
    genre: "Intriga",
    year: 2026,
    palette: { background: "#3c1053", accent: "#ff7675", fur: "#e9dcc9" },
    episodes: [
      {
        number: 1,
        title: "Los ojos más azules",
        captions: [
          { start: 0, end: 3, text: "Rubí: No nací para comer de lata." },
          { start: 3, end: 6, text: "Maribel: Rubí, la lata es lo que hay." },
        ],
      },
      {
        number: 2,
        title: "El cojín de terciopelo",
        captions: [
          { start: 0, end: 3, text: "Alejandro: Te amo aunque arañes mis cortinas." },
          { start: 3, end: 6, text: "Rubí: Las cortinas eran feas, mi amor." },
        ],
      },
      {
        number: 3,
        title: "Siete vidas, un collar",
        captions: [
          { start: 0, end: 2, text: "[Cristales rotos]" },
          { start: 2, end: 6, text: "Rubí: ¡Ese collar de diamantes es mío!" },
        ],
      },
    ],
    cast: [
      {
        name: "Rubí",
        role: "Protagonista",
        breed: "Siamesa",
        bio: "Hermosa y calculadora; su ronroneo es puro interés.",
      },
      {
        name: "Maribel",
        role: "Mejor amiga",
        breed: "Atigrada naranja",
        bio: "Leal a pesar de todo, aunque le roben el plato.",
      },
      {
        name: "Alejandro",
        role: "Galán",
        breed: "Bengalí",
        bio: "Veterinario idealista que cree en las segundas vidas.",
      },
    ],
  },
  {
    slug: "la-gata-usurpadora",
    title: "La Gata Usurpadora",
    tagline: "Dos gatas idénticas. Una buena. Una malvada.",
    synopsis:
      "Paola Michón, la gata más malvada de Coyoacán, descubre a su gemela perdida Paulina en una tintorería y la obliga a tomar su lugar en la mansión Bracho. Pero Paulina se enamora de la familia que Paola despreciaba.",
    genre: "Suspenso",
    year: 2024,
    palette: { background: "#1e272e", accent: "#ff3f34", fur: "#d2a679" },
    episodes: [
      {
        number: 1,
        title: "La gemela perdida",
        captions: [
          { start: 0, end: 3, text: "Paola: Tú serás yo, y yo seré libre." },
          { start: 3, end: 6, text: "Paulina: ¿Y quién cuidará la tintorería?" },
        ],
      },
      {
        number: 2,
        title: "Una gata en la mansión",
        captions: [
          { start: 0, end: 3, text: "Carlos Daniel: Paola, hoy maúllas diferente." },
          { start: 3, end: 6, text: "Paulina: Es que... tomé leche tibia." },
        ],
      },
      {
        number: 3,
        title: "¡Maldita lagartija!",
        captions: [
          { start: 0, end: 2, text: "[Música dramática]" },
          { start: 2, end: 6, text: "Paola: ¡Michi-maldita! ¡Mil veces michi-maldita!" },
        ],
      },
    ],
    cast: [
      {
        name: "Paola Michón",
        role: "Villana",
        breed: "Abisinia",
        bio: "Elegante, cruel y adicta al atún importado.",
      },
      {
        name: "Paulina",
        role: "Protagonista",
        breed: "Abisinia",
        bio: "Gemela bondadosa que plancha camisas con las patitas.",
      },
      {
        name: "Carlos Daniel",
        role: "Galán",
        breed: "Británico de pelo corto",
        bio: "Esposo de Paola; nota que algo cambió, pero no sabe qué.",
      },
    ],
  },
  {
    slug: "atun-con-aroma-de-gata",
    title: "Atún con Aroma de Gata",
    tagline: "Un romance que huele a mar en el puerto de Veracruz.",
    synopsis:
      "Gaviota llega al puerto de Veracruz a vender atún en el mercado. Sebastián Vallejo, heredero de la pescadería más grande del Golfo, cae rendido ante su aroma, para disgusto de su prometida Lucrecia.",
    genre: "Comedia romántica",
    year: 2025,
    palette: { background: "#0a3d62", accent: "#f8efba", fur: "#a0522d" },
    episodes: [
      {
        number: 1,
        title: "Llegó Gaviota",
        captions: [
          { start: 0, end: 3, text: "Gaviota: ¡Atún fresco, atún de hoy!" },
          { start: 3, end: 6, text: "Sebastián: Ese aroma... nunca lo olvidaré." },
        ],
      },
      {
        number: 2,
        title: "La prometida",
        captions: [
          { start: 0, end: 3, text: "Lucrecia: Sebastián, esa gata huele a pescado." },
          { start: 3, end: 6, text: "Sebastián: Precisamente por eso, Lucrecia." },
        ],
      },
      {
        number: 3,
        title: "Bajo la luna del puerto",
        captions: [
          { start: 0, end: 2, text: "[Olas del mar]" },
          { start: 2, end: 6, text: "Gaviota: Si me amas, ámame con todo y espinas." },
        ],
      },
    ],
    cast: [
      {
        name: "Gaviota",
        role: "Protagonista",
        breed: "Carey",
        bio: "Trabajadora, alegre y con el mejor olfato del Golfo.",
      },
      {
        name: "Sebastián Vallejo",
        role: "Galán",
        breed: "Noruego de bosque",
        bio: "Heredero de la pescadería; poeta en secreto.",
      },
      {
        name: "Lucrecia",
        role: "Villana",
        breed: "Angora turca",
        bio: "Prometida de Sebastián. Le tiene alergia al agua.",
      },
    ],
  },
  {
    slug: "teresa-bigotes",
    title: "Teresa Bigotes",
    tagline: "Nació en el callejón, pero sueña con el penthouse.",
    synopsis:
      "Teresa Bigotes es la gata más lista del callejón de Tepito. Usará su inteligencia, sus bigotes perfectos y a cualquier gato rico que se cruce en su camino para no volver jamás a dormir en una caja.",
    genre: "Drama",
    year: 2024,
    palette: { background: "#6f1e51", accent: "#fdcb6e", fur: "#b2bec3" },
    episodes: [
      {
        number: 1,
        title: "El callejón",
        captions: [
          { start: 0, end: 3, text: "Teresa: No pienso morir en una caja de cartón." },
          { start: 3, end: 6, text: "Mamá Refugio: Ay, Teresa, la ambición te va a perder." },
        ],
      },
      {
        number: 2,
        title: "El gato del penthouse",
        captions: [
          { start: 0, end: 3, text: "Arturo: ¿Y tú quién eres?" },
          { start: 3, end: 6, text: "Teresa: Tu futuro, guapo." },
        ],
      },
      {
        number: 3,
        title: "Bigotes de oro",
        captions: [
          { start: 0, end: 2, text: "[Aplausos]" },
          { start: 2, end: 6, text: "Teresa: Del callejón al penthouse, y sin despeinarme." },
        ],
      },
    ],
    cast: [
      {
        name: "Teresa Bigotes",
        role: "Protagonista",
        breed: "Gris atigrada",
        bio: "Brillante y ambiciosa; sus bigotes miden exactamente lo mismo.",
      },
      {
        name: "Arturo de Landa",
        role: "Galán",
        breed: "Ragdoll",
        bio: "Gato de penthouse que nunca ha pisado la calle.",
      },
      {
        name: "Mamá Refugio",
        role: "Madre",
        breed: "Criolla tricolor",
        bio: "Sabia del callejón; tiene un refrán para todo.",
      },
    ],
  },
];

export function getTelenovela(slug: string): Telenovela | undefined {
  return telenovelas.find((telenovela) => telenovela.slug === slug);
}

export function videoPath(slug: string, episodeNumber: number): string {
  return `/videos/${slug}-${episodeNumber}.mp4`;
}

export function captionsPath(slug: string, episodeNumber: number): string {
  return `/videos/${slug}-${episodeNumber}.vtt`;
}

export function posterPath(slug: string, episodeNumber = 1): string {
  return `/posters/${slug}-${episodeNumber}.jpg`;
}

function formatTimestamp(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `00:${String(minutes).padStart(2, "0")}:${rest.toFixed(3).padStart(6, "0")}`;
}

export function toWebVtt(captions: Caption[]): string {
  const cues = captions.map(
    (caption, index) =>
      `${index + 1}\n${formatTimestamp(caption.start)} --> ${formatTimestamp(caption.end)}\n${caption.text}`,
  );
  return `WEBVTT\n\n${cues.join("\n\n")}\n`;
}
