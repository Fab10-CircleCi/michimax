export type CategoryId =
  | "crimen"
  | "ciencia-ficcion"
  | "fantasia"
  | "epoca"
  | "terror"
  | "comedia"
  | "naturaleza"
  | "reality"
  | "anime"
  | "prestigio";

export type Category = {
  id: CategoryId;
  name: string;
};

export type Show = {
  slug: string;
  title: string;
  category: CategoryId;
  type: string;
  year: number;
  maturity: string;
  match: number;
  tags: string[];
  starring: string[];
  tagline: string;
  synopsis: string;
  /** Texto alternativo del clip (los clips no tienen audio). */
  clipDescription: string;
  /** Texto alternativo de cada fotograma, en orden. */
  stills: [string, string, string];
};

export const categories: Category[] = [
  { id: "crimen", name: "Crimen real y misterio" },
  { id: "ciencia-ficcion", name: "Ciencia ficción y cyberpunk" },
  { id: "fantasia", name: "Fantasía y aventura épica" },
  { id: "epoca", name: "Drama de época y romance" },
  { id: "terror", name: "Terror y suspenso" },
  { id: "comedia", name: "Comedia y sitcom" },
  { id: "naturaleza", name: "Documentales de naturaleza" },
  { id: "reality", name: "Reality y competencias" },
  { id: "anime", name: "Anime y animación" },
  { id: "prestigio", name: "Miniseries y drama histórico" },
];

export const shows: Show[] = [
  {
    slug: "the-midnight-prowler",
    title: "The Midnight Prowler",
    category: "crimen",
    type: "Serie · 2 temporadas",
    year: 2024,
    maturity: "TV-14",
    match: 98,
    tags: ["Crudo", "Lleno de suspenso", "Noir"],
    starring: ["Shadow", "Inspector Biscuit", "Lady Whiskers"],
    tagline: "La ciudad nunca duerme. Él tampoco.",
    synopsis:
      "Un gato negro detective recorre los callejones mojados de una ciudad donde cada pescadería guarda un secreto. Cuando una ola de robos de medianoche apunta a alguien dentro de la policía, tiene siete vidas para encontrar la verdad.",
    clipDescription:
      "Un gato negro detective con gabardina y sombrero camina en dos patas por un callejón lluvioso de noche, se detiene bajo un farol parpadeante, se levanta el sombrero con una pata y mira a la cámara con ojos amarillos.",
    stills: [
      "Gato negro detective con gabardina y sombrero, de pie sobre un muro de ladrillo con una lupa, frente a una enorme luna llena.",
      "Gato atigrado investigador con rompevientos de la policía y guantes, guardando una pista en una bolsa de evidencia bajo luces de patrulla.",
      "Gato persa blanco con traje de tweed y monóculo, sentado en un sillón de piel, mirando con el ceño fruncido un tablero de ajedrez tirado.",
    ],
  },
  {
    slug: "whisker-files",
    title: "Whisker Files",
    category: "crimen",
    type: "Serie · 3 temporadas",
    year: 2023,
    maturity: "TV-14",
    match: 95,
    tags: ["Conspiración", "Cerebral", "Retro"],
    starring: ["Agent Mulder-Paws", "Agent Scully-Mittens"],
    tagline: "La verdad está allá afuera. Debajo del sillón.",
    synopsis:
      "Dos agentes en una oficina olvidada del sótano investigan los casos que el Buró llama imposibles: puntos láser que desaparecen, carreras fantasma a las 3 a. m. y un hilo rojo que los conecta todos.",
    clipDescription:
      "Un gato atigrado agente del FBI con traje arrugado, sentado en un escritorio lleno de expedientes censurados, pasa una hoja con la pata y mira hacia la cámara oculta. Imagen granulada de vigilancia de los años setenta con tinte verde.",
    stills: [
      "Gato naranja malhumorado con traje setentero, sentado en un escritorio bajo una lámpara, sosteniendo un expediente marcado como secreto.",
      "Gato agente con lentes y cárdigan, de pie, clavando una foto en un pizarrón de corcho lleno de hilo rojo.",
      "Gato con camisa blanca y mangas arremangadas, sellando como clasificada una pila de carpetas del gobierno.",
    ],
  },
  {
    slug: "unsolved-meowsteries",
    title: "Unsolved Meowsteries",
    category: "crimen",
    type: "Docuserie · 1 temporada",
    year: 2025,
    maturity: "TV-MA",
    match: 92,
    tags: ["Inquietante", "De investigación", "Sobrenatural"],
    starring: ["Nefertiti", "Old Tom"],
    tagline: "Hay casos que es mejor no resolver.",
    synopsis:
      "Una investigadora paranormal Sphynx vuelve a su pueblo lleno de neblina para reabrir los casos que nadie más quiere tocar, empezando por la noche en que todos los gatos del pueblo miraron la misma esquina vacía.",
    clipDescription:
      "Una gata Sphynx con impermeable amarillo camina en dos patas por un bosque con neblina al amanecer, se detiene y levanta una linterna para asomarse a la oscuridad.",
    stills: [
      "Gata Sphynx investigadora paranormal con chamarra de campo, de pie con una linterna entre pinos altos cubiertos de neblina.",
      "Vista desde arriba de un gato detective con cárdigan arrodillado junto a una silueta de gis con forma de gato dormido, tomando notas.",
      "Gato en pijama con una vela en un pasillo oscuro; su sombra en la pared tiene forma de una criatura monstruosa.",
    ],
  },
  {
    slug: "neon-claws-2099",
    title: "Neon Claws 2099",
    category: "ciencia-ficcion",
    type: "Serie · 1 temporada",
    year: 2026,
    maturity: "TV-MA",
    match: 97,
    tags: ["Cyberpunk", "Oscuro", "Acción"],
    starring: ["Unit K-9 Lives", "Neko", "Byte"],
    tagline: "Siete vidas. Una actualización.",
    synopsis:
      "En una megaciudad de neón controlada por la Corporación Croqueta, un callejero cyborg con un ojo mecánico robado caza a los hackers que reprogramaron sus recuerdos.",
    clipDescription:
      "Un gato cyborg con un ojo mecánico brillante y abrigo largo de piel negra camina en dos patas hacia la cámara entre charcos, en una calle cyberpunk de noche con letreros de neón rosa y azul reflejados en el agua.",
    stills: [
      "Gato cyberpunk con chamarra reflejante y visor futurista, de pie bajo la lluvia de neón frente a rascacielos.",
      "Gato hacker con sudadera sentado frente a un teclado brillante, rodeado de pantallas holográficas.",
      "Gato con abrigo largo de pie sobre una gárgola de piedra, sobre una megaciudad futurista con autos voladores.",
    ],
  },
  {
    slug: "astro-paws",
    title: "Astro-Paws",
    category: "ciencia-ficcion",
    type: "Serie · 2 temporadas",
    year: 2025,
    maturity: "TV-PG",
    match: 96,
    tags: ["Espacio", "Para sentirse bien", "Aventura"],
    starring: ["Commander Fluff", "Dr. Ragdoll", "Cosmo"],
    tagline: "Un pequeño paso para un gato. Una gran siesta para la gatunidad.",
    synopsis:
      "La primera tripulación felina rumbo a Marte enfrenta la gravedad cero, las raciones de atún que se acaban y el reto más difícil de todos: una nave llena de botones que no deben tocar.",
    clipDescription:
      "Una gata Ragdoll astronauta con traje espacial blanco flota en gravedad cero dentro de una nave, tomando una burbuja de agua flotante; por la ventana se ve la Tierra.",
    stills: [
      "Gato astronauta con traje espacial completo y casco, de pie haciendo un saludo, con estrellas reflejadas en el visor.",
      "Gato astronauta en la superficie roja de Marte clavando una bandera con una huella de pata, con una colonia de fondo.",
      "Gato capitán con uniforme espacial sentado en la silla de mando de una nave blanca, con una nebulosa en la ventana.",
    ],
  },
  {
    slug: "the-quantum-feline",
    title: "The Quantum Feline",
    category: "ciencia-ficcion",
    type: "Serie limitada · 1 temporada",
    year: 2026,
    maturity: "TV-14",
    match: 91,
    tags: ["Alucinante", "Ciencia ficción", "Cerebral"],
    starring: ["Dr. Schrödinger", "Quark"],
    tagline: "Está en la caja. No está en la caja.",
    synopsis:
      "Un gato negro físico abre la caja equivocada y despierta en todos los universos posibles al mismo tiempo. Ahora debe encontrar el camino de regreso antes de que sus otras versiones se encuentren entre sí.",
    clipDescription:
      "Un gato negro científico con bata y goggles jala una palanca de una máquina brillante con las dos patas, y la habitación parpadea con copias transparentes de él que se desvanecen.",
    stills: [
      "Gato científico con bata frente a un pizarrón lleno de ecuaciones brillantes, con un gis en la pata.",
      "Gato con bata y lentes de seguridad levantando con cuidado la tapa de una caja de metal de la que sale luz.",
      "Gato en bata de baño lavándose los dientes frente a un espejo que refleja una galaxia en lugar del baño.",
    ],
  },
  {
    slug: "realm-of-the-lion",
    title: "Realm of the Lion",
    category: "fantasia",
    type: "Serie · 3 temporadas",
    year: 2023,
    maturity: "TV-14",
    match: 99,
    tags: ["Épica", "Fantasía", "Batallas"],
    starring: ["Sir Mane", "Queen Tabitha", "Grimclaw"],
    tagline: "Un reino necesita un rey. Un rey necesita una siesta.",
    synopsis:
      "Cuando cae el viejo Rey León del valle, un joven caballero Maine Coon debe unir a los clanes rivales de las Tierras Altas antes de que los Sabuesos del Norte crucen las montañas.",
    clipDescription:
      "Un gato Maine Coon caballero con armadura plateada, de pie al borde de un acantilado al atardecer, levanta una espada hacia el cielo mientras el viento mueve su pelo sobre un valle de fantasía.",
    stills: [
      "Majestuoso rey Maine Coon con capa de terciopelo y corona dorada, sentado en un trono de piedra con un cetro.",
      "Gato aventurero con túnica de cuero y capa con capucha, sosteniendo una espada mágica brillante en un bosque luminoso.",
      "Dos gatos caballeros, uno con armadura roja y otro con armadura azul, cruzando espadas en un campo de batalla bajo la tormenta.",
    ],
  },
  {
    slug: "dragonkin",
    title: "Dragonkin",
    category: "fantasia",
    type: "Serie · 2 temporadas",
    year: 2025,
    maturity: "TV-PG",
    match: 94,
    tags: ["Mágica", "De crecimiento", "Fantasía"],
    starring: ["Ember", "Old Scales", "Captain Raven"],
    tagline: "Todo dragón fue gatito alguna vez.",
    synopsis:
      "Una gatita huérfana criada en una cueva llena de oro descubre que puede hablar con los dragones, y que el último huevo de dragón del reino está escondido debajo de su cobija.",
    clipDescription:
      "Una gatita con una pequeña túnica de caballero, sentada sobre un montón de monedas de oro en una cueva oscura, abre un mapa antiguo con las patas y mira sorprendida mientras pasan chispas brillantes.",
    stills: [
      "Gato domador de dragones con chaleco de cuero, de pie en la torre de un castillo al anochecer, con un dragón pequeño en el brazo.",
      "Gata mamá con un chal tejido, sentada en una mecedora, sosteniendo en el regazo un huevo de dragón brillante.",
      "Gato con casco de aviador y goggles montando un cuervo gigante sobre una aldea medieval en llamas de noche.",
    ],
  },
  {
    slug: "spellbound-tails",
    title: "Spellbound Tails",
    category: "fantasia",
    type: "Serie · 2 temporadas",
    year: 2024,
    maturity: "TV-PG",
    match: 93,
    tags: ["Caprichosa", "Escuela de magia", "Acogedora"],
    starring: ["Midnight", "Professor Purrcival", "Hazel"],
    tagline: "Nunca tires una poción de la mesa.",
    synopsis:
      "En una academia de brujería felina, una alumna de primer año torpe y con la costumbre de tirar todo de las mesas desata por accidente un hechizo que pone la escuela de cabeza.",
    clipDescription:
      "Una gata negra bruja con sombrero puntiagudo y túnica morada mueve con una cuchara de madera un caldero burbujeante en un estudio iluminado por velas, y suben chispas moradas.",
    stills: [
      "Gato mago con túnica estrellada y sombrero puntiagudo leyendo un libro de hechizos que flota, rodeado de libros flotantes.",
      "Gato hechicero con túnica y capucha levantando las dos patas entre runas doradas brillantes que giran a su alrededor.",
      "Gato estudiante con túnica escolar y bufanda leyendo en lo alto de una escalera de biblioteca, con libros volando como pájaros.",
    ],
  },
  {
    slug: "the-feline-season",
    title: "The Feline Season",
    category: "epoca",
    type: "Serie · 2 temporadas",
    year: 2024,
    maturity: "TV-MA",
    match: 97,
    tags: ["Romántica", "Apasionada", "De época"],
    starring: ["Lady Pearl", "Lord Marmalade", "Lady Whistledown-Paws"],
    tagline: "El escándalo nunca había estado tan bien acicalado.",
    synopsis:
      "Comienza la temporada social y las mejores familias de Londres compiten por el gato soltero más codiciado. Una angora blanca se niega a seguir las reglas.",
    clipDescription:
      "En un salón de baile de la Regencia iluminado por velas, una gata blanca con collar de perlas y vestido de seda y un gato atigrado naranja con frac bailan un vals lento en dos patas bajo los candelabros.",
    stills: [
      "Pintura al óleo de una gata angora de pie con un lujoso vestido del siglo XVIII y un abanico de plumas, en tonos pastel.",
      "Dos gatos con ropa de la Regencia, una dama con sombrero y un caballero con frac, tomados de la pata en un jardín de rosas.",
      "Gata blanca con vestido de talle alto, sentada sola en un escritorio, escribiendo una carta con pluma a la luz de las velas.",
    ],
  },
  {
    slug: "pride-and-pawjudice",
    title: "Pride and Pawjudice",
    category: "epoca",
    type: "Serie limitada · 1 temporada",
    year: 2023,
    maturity: "TV-PG",
    match: 95,
    tags: ["Romántica", "Ingeniosa", "De época"],
    starring: ["Miss Elizabeth Paw", "Mr. Darcy-Whiskers"],
    tagline: "Es una verdad universalmente aceptada que un gato con fortuna necesita un regazo.",
    synopsis:
      "Una orgullosa heredera siamesa y un gato campirano desaliñado se juzgan mal en un baile, y pasan los siguientes seis episodios negándose a admitir lo que todos los demás ya ven.",
    clipDescription:
      "Un gato siamés con frac y sombrero de copa se aleja caminando en dos patas por un páramo inglés lluvioso y con neblina, se detiene y mira hacia atrás por encima del hombro, en cámara lenta.",
    stills: [
      "Gata con vestido victoriano sentada frente a un piano de cola en un salón con ventanales, mirando la lluvia.",
      "Gato caballero con chaleco de pie sobre empedrado mojado, sosteniendo una carta de amor rota, con una lágrima en el ojo.",
      "Gato rico y mayor con sombrero de copa y abrigo de piel, mirando con desdén desde la puerta a un gato callejero en la nieve.",
    ],
  },
  {
    slug: "samurai-whiskers",
    title: "Samurai Whiskers",
    category: "epoca",
    type: "Serie · 1 temporada",
    year: 2025,
    maturity: "TV-MA",
    match: 96,
    tags: ["Acción", "Histórica", "Estoica"],
    starring: ["Kuro", "Lady Sakura", "General Tora"],
    tagline: "Honor. Silencio. Premios.",
    synopsis:
      "En el Japón feudal, un gato samurái sin señor va de aldea en aldea defendiendo a los débiles, atormentado por el duelo que le costó su clan.",
    clipDescription:
      "Un gato Bobtail japonés samurái con armadura completa, de pie en un bosque de bambú, desenvaina lentamente una katana con las dos patas mientras caen pétalos de cerezo.",
    stills: [
      "Gato samurái con armadura ornamentada frente a una gran puerta torii roja, con una pata en la espada, entre neblina.",
      "Gato con kimono arrodillado pintando caligrafía en un pergamino de papel de arroz con un pincel.",
      "Dos gatos samuráis con armadura y katanas desenvainadas, frente a frente en un patio nevado.",
    ],
  },
  {
    slug: "the-hissing",
    title: "The Hissing",
    category: "terror",
    type: "Película · 1 h 38 min",
    year: 2025,
    maturity: "R",
    match: 89,
    tags: ["De miedo", "Lenta", "Psicológica"],
    starring: ["Pumpkin", "The Thing in the Corner"],
    tagline: "No bajes al sótano.",
    synopsis:
      "Una familia se muda a una casa vieja con un sótano perfecto y silencioso. Su gato se niega a acercarse. Hasta que una noche baja, y regresa diferente.",
    clipDescription:
      "Un gato con pijama de rayas baja en dos patas la escalera de un sótano oscuro con una linterna; la luz encuentra a otro gato parado en una esquina, de cara a la pared, completamente inmóvil.",
    stills: [
      "Primerísimo plano de un gato con gorro de dormir asomándose debajo de una cobija en la oscuridad, con un ojo brillante.",
      "Gato con bata de hospital sentado en una cama; su sombra en la pared tiene cuernos y alas.",
      "Gato botones con un carrito de servicio en un pasillo largo de hotel, con gatos inquietantes asomándose por cada puerta.",
    ],
  },
  {
    slug: "nine-lives-left",
    title: "Nine Lives Left",
    category: "terror",
    type: "Serie · 1 temporada",
    year: 2024,
    maturity: "TV-14",
    match: 92,
    tags: ["Gótica", "Comedia negra", "Espeluznante"],
    starring: ["Barnaby", "The Eight"],
    tagline: "Ya usó ocho. Que la última valga la pena.",
    synopsis:
      "Un gato cuidador de panteón en su novena y última vida debe ayudar a los fantasmas de sus ocho vidas pasadas a cerrar sus pendientes antes de la medianoche de Halloween.",
    clipDescription:
      "Un gato sepulturero con abrigo rasgado y sombrero de copa camina en dos patas por un panteón gótico con neblina a medianoche, con una linterna, y detrás flota un gato fantasma.",
    stills: [
      "Gato vampiro con capa negra de cuello alto sentado dentro de un ataúd, entre neblina verde.",
      "Gato en camisón con una vela mirando un reloj de pie a las 3 de la mañana, con calaveritas en lugar de números.",
      "Imagen en blanco y negro de cámara de seguridad: un gato guardia con linterna en un pasillo vacío de oficina.",
    ],
  },
  {
    slug: "purranoia",
    title: "Purranoia",
    category: "terror",
    type: "Película · 1 h 52 min",
    year: 2024,
    maturity: "R",
    match: 90,
    tags: ["Paranoica", "Suspenso", "Retro"],
    starring: ["Dash", "The Man in the Car"],
    tagline: "Que seas paranoico no significa que no estén vigilando el comedero de pájaros.",
    synopsis:
      "Un gato de departamento se convence de que el auto negro estacionado afuera es de quienes se llevaron a su antiguo dueño. Nadie le cree. No puede dejar de mirar entre las persianas.",
    clipDescription:
      "Un gato en bata de baño, de pie frente a la ventana oscura de un departamento, abre las persianas con una pata, mira un auto negro bajo un farol y retrocede lentamente.",
    stills: [
      "Gato de traje acomodándose la corbata frente a un espejo; su reflejo sonríe de forma siniestra mientras él se ve aterrado.",
      "Gato con gabardina sentado en un escritorio con el auricular de un teléfono de disco en la oreja, con los ojos muy abiertos.",
      "Gato con impermeable en la escalera oscura de un edificio iluminada por un solo foco, mirando hacia atrás.",
    ],
  },
  {
    slug: "the-feline-branch",
    title: "The Feline Branch",
    category: "comedia",
    type: "Serie · 9 temporadas",
    year: 2019,
    maturity: "TV-14",
    match: 99,
    tags: ["Falso documental", "De oficina", "Humor seco"],
    starring: ["Michael Scratch", "Jim Purrpert", "Pam Whiskers"],
    tagline: "El mismo escritorio. La misma taza. La misma orilla.",
    synopsis:
      "Un equipo de documentalistas sigue a los empleados de la sucursal felina de una empresa de papel, donde el gerente regional es un atigrado que se cree chistosísimo y nadie trabaja.",
    clipDescription:
      "En una oficina, un gato atigrado naranja con camisa y corbata escribe en el teclado, se detiene, mira a la cámara con cara de cansancio y empuja lentamente una taza de café fuera del escritorio.",
    stills: [
      "Gato con camisa de manga corta y corbata en un cubículo, con una pila de papeles y una taza de «el mejor jefe del mundo».",
      "Gato con camisa y corbata dormido sobre el teclado, con una nota adhesiva en la frente que recuerda una junta a las 3.",
      "Gato gerente de traje señalando una gráfica de pastel en un pizarrón, mientras otros gatos de oficina se ven aburridos.",
    ],
  },
  {
    slug: "cats-behaving-badly",
    title: "Cats Behaving Badly",
    category: "comedia",
    type: "Docuserie · 4 temporadas",
    year: 2022,
    maturity: "TV-G",
    match: 94,
    tags: ["Comedia física", "Para sentirse bien", "Familiar"],
    starring: ["Narrado por Sir Reginald Fluff"],
    tagline: "La gravedad es opcional. La dignidad, no.",
    synopsis:
      "Los mejores (peores) bloopers captados por cámaras caseras de todo el país: saltos fallidos, cabezas atoradas y todo tirado al piso, narrados por un gato que se avergüenza profundamente de todo.",
    clipDescription:
      "Un gato elegante con bata de seda cruza una cocina en dos patas con una charola de tazas, se tropieza con un tapete y cae en una canasta de ropa mientras las tazas salen volando.",
    stills: [
      "Gato con tutú captado en el aire en un salto de ballet torpe, con los ojos muy abiertos, en colores pop.",
      "Gato en bata de pie, enredado en papel de baño, con cara de ligera molestia.",
      "Dos gatos en pijama jalando dramáticamente la última rebanada de pizza.",
    ],
  },
  {
    slug: "my-roommate-is-a-menace",
    title: "My Roommate Is a Menace",
    category: "comedia",
    type: "Serie · 3 temporadas",
    year: 2023,
    maturity: "TV-PG",
    match: 96,
    tags: ["Pareja dispareja", "Sitcom", "Conmovedora"],
    starring: ["Chili", "Bruno the Great Dane"],
    tagline: "Tres kilos de pura actitud. El perro nunca tuvo oportunidad.",
    synopsis:
      "Un gatito diminuto y furioso se muda a la casa de un gran danés enorme y tranquilo, y de inmediato se declara el casero.",
    clipDescription:
      "En una sala cálida, un gatito con bata regaña moviendo una pata a un gran danés enorme dormido en el sillón; el perro abre un ojo.",
    stills: [
      "Imagen dividida: arriba un gato con cárdigan leyendo en un cuarto ordenado; abajo un gato con sudadera jugando videojuegos en un desorden.",
      "Gato con mandil de chef presentando con orgullo un plato con un solo insecto.",
      "Gato en pijama frente al refrigerador abierto de noche, comiendo mantequilla con una cuchara.",
    ],
  },
  {
    slug: "planet-paws",
    title: "Planet Paws",
    category: "naturaleza",
    type: "Docuserie · 1 temporada",
    year: 2025,
    maturity: "TV-G",
    match: 98,
    tags: ["Naturaleza", "Impresionante", "Educativa"],
    starring: ["Presentado por Sir David Catenborough"],
    tagline: "La criatura más salvaje de la Tierra duerme 16 horas al día.",
    synopsis:
      "Un presentador felino vestido de caqui susurra desde sabanas, selvas y montañas para revelar la extraordinaria vida secreta de los gatos en la naturaleza… y en el sillón.",
    clipDescription:
      "Un gato presentador con camisa y sombrero de safari, de pie entre pasto dorado de la sabana, le susurra a la cámara y señala algo a lo lejos con la pata.",
    stills: [
      "Gato explorador con poncho de lluvia en un aguacero en la selva, sacudiéndose el agua del pelo.",
      "Gato alpinista con chamarra acolchada y mochila en la cima de una montaña, con binoculares.",
      "Primer plano de un gato naturalista con lentes redondos examinando una flor con rocío con una lupa.",
    ],
  },
  {
    slug: "deep-blue-meow",
    title: "Deep Blue Meow",
    category: "naturaleza",
    type: "Docuserie · 1 temporada",
    year: 2024,
    maturity: "TV-G",
    match: 95,
    tags: ["Océano", "Aventura", "Visualmente impactante"],
    starring: ["Captain Finn", "Coral"],
    tagline: "Los gatos odian el agua. Estos no se enteraron.",
    synopsis:
      "Una expedición de gatos buzos explora por primera vez los arrecifes de coral y las profundidades del océano, y conoce a las criaturas marinas con las que sus ancestros solo soñaban… para comer.",
    clipDescription:
      "Bajo el agua, un gato buzo con traje de neopreno y casco redondo nada junto a un arrecife de coral colorido y saluda con la pata a una tortuga marina, entre rayos de sol.",
    stills: [
      "Gato buzo con traje y casco sentado en el fondo arenoso del mar, mirando medusas luminosas.",
      "Gato biólogo marino con traje de neopreno arrodillado en una roca, fotografiando una estrella de mar.",
      "Gato capitán con impermeable amarillo en la cubierta de un bote, con binoculares, mientras una ballena enorme sale a la superficie.",
    ],
  },
  {
    slug: "arctic-hunters",
    title: "Arctic Hunters",
    category: "naturaleza",
    type: "Docuserie · 1 temporada",
    year: 2026,
    maturity: "TV-PG",
    match: 93,
    tags: ["Supervivencia", "Naturaleza", "Helada"],
    starring: ["Blizzard", "Nanook"],
    tagline: "Cuarenta grados bajo cero. Más un gato muy decidido.",
    synopsis:
      "Un equipo de gatos exploradores polares pasa un año en la cima del mundo aprendiendo a cazar, pescar y sobrevivir donde el sol no se pone durante meses.",
    clipDescription:
      "Un gato blanco con parka y goggles, de pie en la nieve, pesca en un agujero en el hielo; jala el hilo con las dos patas y sale un pez entre destellos de nieve.",
    stills: [
      "Gato explorador polar con parka resistiendo una ventisca, con cristales de hielo en los bigotes.",
      "Gato con gorro de lana y bufanda sobre un bloque de hielo flotante, con un termo, bajo una aurora boreal verde y morada.",
      "Imagen de cámara térmica: la silueta roja y naranja de un gato acurrucado en un saco de dormir sobre la nieve.",
    ],
  },
  {
    slug: "the-great-cat-bake-off",
    title: "The Great Cat Bake Off",
    category: "reality",
    type: "Reality · 5 temporadas",
    year: 2021,
    maturity: "TV-G",
    match: 97,
    tags: ["Competencia", "Entrañable", "Acogedor"],
    starring: ["Judge Mary Purry", "Judge Paw Hollywood"],
    tagline: "En sus marcas. Listos. A amasar.",
    synopsis:
      "Doce gatos reposteros aficionados compiten en una carpa soleada por el título de Estrella de la Repostería. Habrá soufflés desplomados, pasteles con forma de pescado y dos jueces muy serios.",
    clipDescription:
      "En una carpa de repostería iluminada, un gato con mandil y gorrito de chef amasa en dos patas sobre una mesa enharinada, y la harina sale volando.",
    stills: [
      "Gato repostero orgulloso con mandil junto a un pastel de pisos con forma de pescado, con una manga pastelera.",
      "Gato repostero con guantes de cocina mirando devastado un soufflé desplomado.",
      "Dos gatos jueces con sacos de tweed probando un pan con muchísima seriedad, con banderines de colores atrás.",
    ],
  },
  {
    slug: "keeping-up-with-the-kittens",
    title: "Keeping Up With the Kittens",
    category: "reality",
    type: "Reality · 6 temporadas",
    year: 2020,
    maturity: "TV-14",
    match: 88,
    tags: ["Glamorosa", "Drama", "Placer culposo"],
    starring: ["Kitty", "Khloé-Paws", "Kourtney-Cat"],
    tagline: "Fama. Fortuna. Bolas de pelo.",
    synopsis:
      "Las cámaras siguen a la familia de gatos Sphynx más famosa de Hollywood entre alfombras rojas, pleitos por el caviar y la eterna pregunta de quién se queda con el lugar soleado.",
    clipDescription:
      "Una gata Sphynx famosa con lentes oscuros enormes, estola de piel y collar de diamantes camina en dos patas por la alfombra roja en cámara lenta, saludando mientras estallan los flashes.",
    stills: [
      "Gata influencer con top corto tomándose una selfie frente a un espejo alto, con el reflejo de un aro de luz en los ojos.",
      "Dos gatas glamorosas con vestidos de diseñador y collares de diamantes discutiendo por un tazón de caviar.",
      "Gata con bata de seda y antifaz recostada en un diván de terciopelo en una mansión recargada, con una copa de champaña.",
    ],
  },
  {
    slug: "survivor-litterbox-island",
    title: "Litterbox Island",
    category: "reality",
    type: "Reality · 3 temporadas",
    year: 2023,
    maturity: "TV-PG",
    match: 91,
    tags: ["Competencia", "Estrategia", "Isla"],
    starring: ["Host Jeff Purrbst"],
    tagline: "Más listo. Más resistente. Más dormilón.",
    synopsis:
      "Dieciséis gatos caseros quedan en una isla tropical con nada más que una bandana y un arenero. Se forman alianzas, se asan pescados y, uno a uno, la tribu decide.",
    clipDescription:
      "De noche en la playa, un gato desaliñado y agotado con camisa rota y bandana, sentado junto a una pequeña fogata, asa un pescado en una vara, mira a la cámara y suspira.",
    stills: [
      "Gato concursante con bandana y shorts rotos de pie de noche con una antorcha encendida, en una ceremonia de eliminación.",
      "Dos gatos concursantes con bandana detrás de una palmera, uno susurrándole al otro, en la selva al atardecer.",
      "Gato concursante sentado en un tronco a punto de comerse un insecto extraño de una hoja, con cara de asco pero decidido.",
    ],
  },
  {
    slug: "meowcha",
    title: "Meowcha!",
    category: "anime",
    type: "Serie de anime · 2 temporadas",
    year: 2025,
    maturity: "TV-14",
    match: 96,
    tags: ["Anime", "Acción", "Shonen"],
    starring: ["Meowcha", "Sakura-chan", "Captain Tabby"],
    tagline: "¡Su nivel de poder es de más de siete vidas!",
    synopsis:
      "Un gato callejero peleonero descubre un poder dorado oculto y se une a un equipo de héroes felinos para defender la ciudad de los Perros del Caos. Habrá golpes. Habrá siestas.",
    clipDescription:
      "Animación estilo anime: un gato héroe con uniforme de artes marciales se carga de poder con un aura dorada, el pelo se le agita y lanza un golpe heroico hacia la cámara.",
    stills: [
      "Ilustración anime de una gata con uniforme escolar de marinera y una varita mágica brillante, entre flores de cerezo.",
      "Ilustración anime de un gato con uniforme escolar en primer plano, con los ojos muy abiertos de sorpresa.",
      "Ilustración anime de cinco gatos héroes con trajes de batalla de colores posando en formación de V.",
    ],
  },
  {
    slug: "spirited-whiskers",
    title: "Spirited Whiskers",
    category: "anime",
    type: "Película de anime · 2 h 05 min",
    year: 2024,
    maturity: "PG",
    match: 99,
    tags: ["Anime", "Caprichosa", "Emotiva"],
    starring: ["Chihiro-Neko", "The Great Spirit Cat"],
    tagline: "Algunos viajes empiezan en una parada de autobús bajo la lluvia.",
    synopsis:
      "Una gatita sigue una linterna extraña hasta un mercado del mundo de los espíritus, donde debe trabajar en una casa de baños para dioses y recuperar el nombre de su familia.",
    clipDescription:
      "Anime estilo acuarela: una gatita con kimono camina en dos patas por un mercado de espíritus iluminado con farolitos, cargando una bolsa de papel, y unos espíritus redonditos le hacen reverencias.",
    stills: [
      "Ilustración en acuarela de una gata con uniforme escolar y paraguas en una parada de autobús bajo la lluvia, junto a un gran espíritu gato peludo.",
      "Ilustración de un gato con overol dormido en una hamaca entre árboles gigantes, con un rayo de sol entre las hojas.",
      "Ilustración de un gato con kimono ofreciendo un dulce a un espíritu negro diminuto y peludo con ojos grandes.",
    ],
  },
  {
    slug: "cyber-kitty-protocol",
    title: "Cyber-Kitty Protocol",
    category: "anime",
    type: "Serie de anime · 1 temporada",
    year: 2026,
    maturity: "TV-MA",
    match: 94,
    tags: ["Anime", "Cyberpunk", "Filosófica"],
    starring: ["Major Mew", "Batou-Paws"],
    tagline: "Carga completa. Protocolo ronroneo activado.",
    synopsis:
      "En el Neo-Tokio de 2099, una gata agente robótica de la Sección 9 persigue a un hacker capaz de reescribir los recuerdos de los gatos, y empieza a dudar de los suyos.",
    clipDescription:
      "Anime cyberpunk: una gata robótica con traje ajustado, sentada frente a una pared de pantallas, teclea rápido con las dos patas mientras sus ojos brillan en azul y pasa código de neón.",
    stills: [
      "Ilustración anime retro de un gato con chamarra roja de motociclista manejando una moto futurista roja por una autopista de neón.",
      "Ilustración anime de una gata con traje táctico en un laboratorio, con cables conectados a la cabeza y un mapa holográfico.",
      "Ilustración anime de un gato con chamarra de combate cargando un arma futurista enorme en el hombro y guiñando un ojo.",
    ],
  },
  {
    slug: "ground-zero",
    title: "Ground Zero",
    category: "prestigio",
    type: "Serie limitada · 5 episodios",
    year: 2024,
    maturity: "TV-MA",
    match: 98,
    tags: ["Histórica", "Desoladora", "Atrapante"],
    starring: ["Comrade Whiskerov", "Dr. Mittens"],
    tagline: "¿Cuánto cuesta una mentira? Siete vidas.",
    synopsis:
      "La recreación de la noche en que el gato de la sala de control de una planta nuclear apretó el botón equivocado, y de los gatos con trajes de protección que se adentraron en el polvo para arreglarlo.",
    clipDescription:
      "Un gato callejero con traje de protección y máscara antigás camina lentamente en dos patas por el pasillo abandonado de un edificio soviético de los ochenta, con un contador Geiger, mientras cae polvo entre rayos de luz.",
    stills: [
      "Gato con uniforme soviético gastado sentado en un escritorio de un salón abandonado con pintura descarapelada y una máscara antigás.",
      "Gato con traje de protección junto a una rueda de la fortuna oxidada en un parque de diversiones abandonado, bajo un cielo gris.",
      "Gato ingeniero con bata sentado frente a un tablero de control lleno de perillas, sudando, apretando un gran botón rojo.",
    ],
  },
  {
    slug: "the-crown-jewels",
    title: "The Crown Jewels",
    category: "prestigio",
    type: "Serie · 6 temporadas",
    year: 2022,
    maturity: "TV-MA",
    match: 96,
    tags: ["Realeza", "Histórica", "De prestigio"],
    starring: ["Queen Elizabeth Purr", "Prince Philip-Paws"],
    tagline: "Pesada es la cabeza que lleva la corona. Más pesada es la siesta.",
    synopsis:
      "La vida privada de la reina con el reinado más largo de la historia felina, desde su coronación hasta los escándalos familiares tras las puertas del palacio.",
    clipDescription:
      "Una gata reina anciana y majestuosa con túnica de terciopelo carmesí, sentada en un trono dorado en una catedral, recibe lentamente una pequeña corona con joyas sobre la cabeza.",
    stills: [
      "Gata vestida de reina Tudor con un enorme cuello de olanes y perlas, frente a un fondo renacentista oscuro.",
      "Dos gatos de la realeza con capas de terciopelo susurrando en un pasillo de castillo iluminado con velas.",
      "Gato rey con casaca del siglo XVIII firmando un tratado con una pluma, con gatos generales de uniforme detrás.",
    ],
  },
  {
    slug: "the-litter",
    title: "The Litter",
    category: "prestigio",
    type: "Serie · 4 temporadas",
    year: 2023,
    maturity: "TV-MA",
    match: 98,
    tags: ["Comedia negra", "Lucha de poder", "De prestigio"],
    starring: ["Logan Roy-Paws", "Kendall", "Shiv", "Roman"],
    tagline: "¿Quién se queda con el imperio? ¿Quién se queda con el lugar soleado?",
    synopsis:
      "Un viejo magnate felino de los medios enfrenta a sus cuatro hijos despiadados en la lucha por heredar el imperio familiar… y el piso más alto del rascador.",
    clipDescription:
      "Cuatro gatos con trajes caros a la medida discuten de pie en el helipuerto de una azotea con mucho viento, con gestos bruscos de las patas, y la cámara sube hacia las aspas de un helicóptero.",
    stills: [
      "Viejo gato patriarca de traje oscuro en la cabecera de una mesa de juntas de caoba, con gatos más jóvenes nerviosos.",
      "Gato de traje frente a los ventanales de un penthouse de Manhattan de noche, sosteniendo un vaso de leche como si fuera whisky.",
      "Dos gatos con trajes a la medida dándose la pata, cada uno escondiendo un contrato distinto en la espalda.",
    ],
  },
];

export const featuredSlug = "neon-claws-2099";

export function getShow(slug: string): Show | undefined {
  return shows.find((show) => show.slug === slug);
}

export function getCategory(id: CategoryId): Category {
  return categories.find((category) => category.id === id)!;
}

export function showsInCategory(id: CategoryId): Show[] {
  return shows.filter((show) => show.category === id);
}

export function clipPath(slug: string): string {
  return `/titulos/${slug}/clip.mp4`;
}

export function stillPath(slug: string, number: 1 | 2 | 3 = 1): string {
  return `/titulos/${slug}/still-${number}.webp`;
}

/** Los clips no tienen audio: un único archivo de subtítulos lo indica. */
export const CLIP_CAPTIONS_PATH = "/titulos/sin-audio.vtt";
