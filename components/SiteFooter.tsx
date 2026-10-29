import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.brand}>Michimax · Telenovelas felinas en formato vertical</p>
        <p className={styles.note}>
          Sitio ficticio creado para el taller de integración continua con CircleCI. Ningún gato fue
          maltratado durante la producción de estas telenovelas.
        </p>
      </div>
    </footer>
  );
}
