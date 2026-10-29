import Link from "next/link";
import { TelenovelaCard } from "@/components/TelenovelaCard";
import { telenovelas } from "@/lib/telenovelas";
import styles from "./page.module.css";

export default function HomePage() {
  const featured = telenovelas[0];

  return (
    <>
      <section className={styles.hero} aria-labelledby="titulo-portada">
        <div className="container">
          <p className={styles.kicker}>Estreno de la semana</p>
          <h1 id="titulo-portada" className={styles.title}>
            Drama de siete vidas, en tu celular
          </h1>
          <p className={styles.lead}>
            Michimax es el streaming de telenovelas felinas en formato vertical. Capítulos cortitos,
            villanas con bigotes y amores imposibles entre croquetas.
          </p>
          <Link href={`/telenovelas/${featured.slug}`} className={styles.cta}>
            Ver {featured.title}
          </Link>
        </div>
      </section>

      <section className="container" aria-labelledby="titulo-catalogo">
        <h2 id="titulo-catalogo" className={styles.sectionTitle}>
          Catálogo
        </h2>
        <ul className={styles.grid}>
          {telenovelas.map((telenovela) => (
            <li key={telenovela.slug}>
              <TelenovelaCard telenovela={telenovela} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
