import Image from "next/image";
import Link from "next/link";
import { getCategory, stillPath, type Show } from "@/lib/catalog";
import { ShowMeta } from "./ShowMeta";
import styles from "./Hero.module.css";

export function Hero({ show }: { show: Show }) {
  return (
    <section className={styles.hero} aria-labelledby="titulo-destacado">
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <p className={styles.kicker}>Ahora en streaming · {getCategory(show.category).name}</p>
          <h2 id="titulo-destacado" className={styles.title}>
            {show.title}
          </h2>
          <ShowMeta show={show} />
          <p className={styles.tagline}>{show.tagline}</p>
          <p className={styles.synopsis}>{show.synopsis}</p>
          <Link href={`/titulos/${show.slug}`} className={styles.cta}>
            Ver ahora<span className="visually-hidden">: {show.title}</span>
          </Link>
        </div>
        <Image
          className={styles.image}
          src={stillPath(show.slug)}
          alt=""
          width={540}
          height={945}
          priority
          sizes="(min-width: 900px) 320px, 70vw"
        />
      </div>
    </section>
  );
}
