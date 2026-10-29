import Image from "next/image";
import Link from "next/link";
import { stillPath, type Show } from "@/lib/catalog";
import styles from "./ShowCard.module.css";

export function ShowCard({ show }: { show: Show }) {
  return (
    <article className={styles.card}>
      <Image
        className={styles.poster}
        src={stillPath(show.slug)}
        alt=""
        width={540}
        height={945}
        sizes="(min-width: 960px) 220px, 42vw"
      />
      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link href={`/titulos/${show.slug}`} className={styles.link}>
            {show.title}
          </Link>
        </h3>
        <p className={styles.meta}>
          {show.match} % de coincidencia · {show.year}
        </p>
      </div>
    </article>
  );
}
