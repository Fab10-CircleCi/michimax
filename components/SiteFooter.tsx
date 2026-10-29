import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.brand}>Michimax · Streaming felino en formato vertical</p>
        <p className={styles.note}>
          Plataforma ficticia creada para el taller de integración continua con CircleCI. Ningún gato fue
          maltratado durante la producción de estos títulos.
        </p>
      </div>
    </footer>
  );
}
