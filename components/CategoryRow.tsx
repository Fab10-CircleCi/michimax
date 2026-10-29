import type { Show } from "@/lib/catalog";
import { ShowCard } from "./ShowCard";
import styles from "./CategoryRow.module.css";

type Props = {
  id: string;
  title: string;
  shows: Show[];
};

export function CategoryRow({ id, title, shows }: Props) {
  const headingId = `fila-${id}`;

  return (
    <section className={styles.row} aria-labelledby={headingId}>
      <h2 id={headingId} className={styles.title}>
        {title}
      </h2>
      <ul className={styles.list}>
        {shows.map((show) => (
          <li key={show.slug} className={styles.item}>
            <ShowCard show={show} />
          </li>
        ))}
      </ul>
    </section>
  );
}
