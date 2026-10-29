import styles from "./CastList.module.css";

export function CastList({ starring }: { starring: string[] }) {
  return (
    <ul className={styles.list}>
      {starring.map((name) => (
        <li key={name} className={styles.member}>
          <span className={styles.avatar} aria-hidden="true">
            {name.charAt(0)}
          </span>
          <span className={styles.name}>{name}</span>
        </li>
      ))}
    </ul>
  );
}
