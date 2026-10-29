import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CastList } from "@/components/CastList";
import { CatalogShell } from "@/components/CatalogShell";
import { CategoryRow } from "@/components/CategoryRow";
import { ShowMeta } from "@/components/ShowMeta";
import { ShowPlayer } from "@/components/ShowPlayer";
import { StillsGallery } from "@/components/StillsGallery";
import { getCategory, getShow, shows, showsInCategory } from "@/lib/catalog";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return shows.map((show) => ({ slug: show.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const show = getShow(slug);
  return show ? { title: show.title, description: show.tagline } : {};
}

export default async function TitlePage({ params }: Props) {
  const { slug } = await params;
  const show = getShow(slug);

  if (!show) {
    notFound();
  }

  const category = getCategory(show.category);
  const related = showsInCategory(show.category).filter((other) => other.slug !== show.slug);

  return (
    <CatalogShell active={show.category}>
      <div className={styles.layout}>
        <header className={styles.header}>
          <p className={styles.back}>
            <Link href="/">← Volver al inicio</Link>
          </p>
          <p className={styles.kicker}>{category.name}</p>
          <h1 className={styles.title}>{show.title}</h1>
          <ShowMeta show={show} />
          <p className={styles.tagline}>{show.tagline}</p>
        </header>

        <section className={styles.playerColumn} aria-label="Reproductor">
          <ShowPlayer show={show} />
        </section>

        <div className={styles.info}>
          <p>{show.synopsis}</p>
          <p className={styles.tags}>
            <span className={styles.tagsLabel}>Este título es:</span> {show.tags.join(" · ")}
          </p>

          <section aria-labelledby="titulo-reparto">
            <h2 id="titulo-reparto" className={styles.sectionTitle}>
              Reparto
            </h2>
            <CastList starring={show.starring} />
          </section>

          <section aria-labelledby="titulo-fotogramas">
            <h2 id="titulo-fotogramas" className={styles.sectionTitle}>
              Fotogramas
            </h2>
            <StillsGallery show={show} />
          </section>
        </div>
      </div>

      <CategoryRow id="relacionados" title={`Más de ${category.name}`} shows={related} />
    </CatalogShell>
  );
}
