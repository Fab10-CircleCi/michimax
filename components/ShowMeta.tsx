import type { Show } from "@/lib/catalog";
import styles from "./ShowMeta.module.css";

export function ShowMeta({ show }: { show: Show }) {
  return (
    <p className={styles.meta}>
      <span className={styles.match}>{show.match} % de coincidencia</span>
      <span>{show.year}</span>
      <span className={styles.maturity}>
        <span className="visually-hidden">Clasificación: </span>
        {show.maturity}
      </span>
      <span>{show.type}</span>
    </p>
  );
}
