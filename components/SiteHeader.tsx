import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "./NavLinks";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <Image src="/brand/michimax-simbolo.png" alt="" width={32} height={32} className={styles.symbol} priority />
          Michimax
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
