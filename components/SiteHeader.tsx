import Link from "next/link";
import { NavLinks } from "./NavLinks";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <span aria-hidden="true">🐾</span> Michimax
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
