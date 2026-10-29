import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CastList } from "@/components/CastList";
import { EpisodePlayer } from "@/components/EpisodePlayer";
import { getTelenovela, telenovelas } from "@/lib/telenovelas";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return telenovelas.map((telenovela) => ({ slug: telenovela.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const telenovela = getTelenovela(slug);
  return telenovela ? { title: telenovela.title, description: telenovela.tagline } : {};
}

export default async function TelenovelaPage({ params }: Props) {
  const { slug } = await params;
  const telenovela = getTelenovela(slug);

  if (!telenovela) {
    notFound();
  }

  return (
    <div className={`container ${styles.layout}`}>
      <section className={styles.playerColumn} aria-label="Reproductor">
        <EpisodePlayer telenovela={telenovela} />
      </section>

      <div className={styles.info}>
        <p className={styles.back}>
          <Link href="/">← Volver al catálogo</Link>
        </p>
        <h1 className={styles.title}>{telenovela.title}</h1>
        <p className={styles.meta}>
          {telenovela.genre} · {telenovela.year} · {telenovela.episodes.length} capítulos
        </p>
        <p className={styles.tagline}>{telenovela.tagline}</p>
        <p>{telenovela.synopsis}</p>

        <section aria-labelledby="titulo-reparto">
          <h2 id="titulo-reparto" className={styles.sectionTitle}>
            Reparto
          </h2>
          <CastList cast={telenovela.cast} />
        </section>
      </div>
    </div>
  );
}
