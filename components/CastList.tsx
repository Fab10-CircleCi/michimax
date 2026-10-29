"use client";

import { useState, useSyncExternalStore } from "react";
import { stillPath } from "@/lib/catalog";
import styles from "./CastList.module.css";

const STORAGE_KEY = "michimax:siguiendo";

function suscribir(avisar: () => void) {
  window.addEventListener("storage", avisar);
  return () => window.removeEventListener("storage", avisar);
}

function parsear(valor: string): string[] {
  try {
    return JSON.parse(valor);
  } catch {
    return [];
  }
}

type Props = {
  starring: string[];
  slug: string;
  title: string;
};

export function CastList({ starring, slug, title }: Props) {
  const guardado = useSyncExternalStore(
    suscribir,
    () => localStorage.getItem(STORAGE_KEY) ?? "[]",
    () => "[]",
  );
  const seguidos = parsear(guardado);
  const [abiertas, setAbiertas] = useState<string[]>([]);

  function alternarSeguir(nombre: string) {
    const siguiente = seguidos.includes(nombre)
      ? seguidos.filter((seguido) => seguido !== nombre)
      : [...seguidos, nombre];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(siguiente));
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }

  function alternarDetalle(nombre: string) {
    setAbiertas((actuales) =>
      actuales.includes(nombre) ? actuales.filter((actual) => actual !== nombre) : [...actuales, nombre],
    );
  }

  return (
    <div className={styles.gallery}>
      {starring.map((nombre, index) => {
        const abierta = abiertas.includes(nombre);
        const siguiendo = seguidos.includes(nombre);
        const foto = stillPath(slug, ((index % 3) + 1) as 1 | 2 | 3);

        return (
          <div key={nombre} className={styles.card} onClick={() => alternarDetalle(nombre)}>
            <div className={styles.photo} style={{ backgroundImage: `url(${foto})` }}>
              <button
                type="button"
                className={`${styles.follow} ${siguiendo ? styles.following : ""}`}
                onClick={(event) => {
                  event.stopPropagation();
                  alternarSeguir(nombre);
                }}
              >
                {siguiendo ? "Siguiendo" : "Seguir"}
              </button>
            </div>
            <div className={styles.label}>
              <h5 className={styles.name}>{nombre}</h5>
            </div>
            {abierta && <p className={styles.bio}>Estrella de {title}</p>}
          </div>
        );
      })}
    </div>
  );
}
