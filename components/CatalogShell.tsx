import type { CategoryId } from "@/lib/catalog";
import { CategorySidebar } from "./CategorySidebar";
import styles from "./CatalogShell.module.css";

type Props = {
  active?: CategoryId;
  children: React.ReactNode;
};

/** Diseño de las páginas del catálogo: barra de categorías y contenido. */
export function CatalogShell({ active, children }: Props) {
  return (
    <div className={styles.shell}>
      <CategorySidebar active={active} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
