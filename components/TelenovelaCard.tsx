import Image from "next/image";
import Link from "next/link";
import { posterPath, type Telenovela } from "@/lib/telenovelas";
import styles from "./TelenovelaCard.module.css";

export function TelenovelaCard({ telenovela }: { telenovela: Telenovela }) {
  return (
    <article className={styles.card}>
      <Image
        className={styles.poster}
        src={posterPath(telenovela.slug)}
        alt=""
        width={360}
        height={640}
        sizes="(min-width: 960px) 260px, 45vw"
      />
      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link href={`/telenovelas/${telenovela.slug}`} className={styles.link}>
            {telenovela.title}
          </Link>
        </h3>
        <p className={styles.meta}>
          {telenovela.genre} · {telenovela.year} · {telenovela.episodes.length} capítulos
        </p>
        <p className={styles.tagline}>{telenovela.tagline}</p>
      </div>
    </article>
  );
}
