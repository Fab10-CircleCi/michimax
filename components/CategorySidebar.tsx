import Link from "next/link";
import { categories, type CategoryId } from "@/lib/catalog";
import styles from "./CategorySidebar.module.css";

export function categoryAnchor(id: CategoryId): string {
  return `fila-${id}`;
}

/** Barra de categorías: lleva a la fila de cada categoría en la portada. */
export function CategorySidebar({ active }: { active?: CategoryId }) {
  return (
    <nav className={styles.sidebar} aria-labelledby="titulo-categorias">
      <p id="titulo-categorias" className={styles.title}>
        Categorías
      </p>
      <ul className={styles.list}>
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/#${categoryAnchor(category.id)}`}
              className={styles.link}
              aria-current={category.id === active ? "true" : undefined}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
