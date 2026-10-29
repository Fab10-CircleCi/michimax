"use client";

import { useState } from "react";
import { formatearContador, getReacciones } from "@/lib/reacciones";
import styles from "./ReactionBar.module.css";

export function ReactionBar({ slug }: { slug: string }) {
  const reacciones = getReacciones(slug);
  const [meEncanta, setMeEncanta] = useState(false);

  async function compartir() {
    await navigator.clipboard?.writeText(`${window.location.origin}/titulos/${slug}`);
  }

  return (
    <div className={styles.bar}>
      <div className={styles.item}>
        <button
          type="button"
          className={`${styles.button} ${meEncanta ? styles.active : ""}`}
          onClick={() => setMeEncanta(!meEncanta)}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="currentColor"
              d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.4h2c.7-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"
            />
          </svg>
        </button>
        <span className={styles.count}>
          {formatearContador(reacciones.meEncanta + (meEncanta ? 1 : 0))}
        </span>
      </div>

      <div className={styles.item}>
        <button type="button" className={styles.button}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M4 4h16v12H8l-4 4V4z" />
          </svg>
        </button>
        <span className={styles.count}>{formatearContador(reacciones.comentarios)}</span>
      </div>

      <div className={styles.item}>
        <button type="button" className={styles.button} onClick={compartir}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M14 4l7 7-7 7v-4c-5 0-8 1.5-10 5 1-5 3.5-9 10-10V4z" />
          </svg>
        </button>
        <span className={styles.count}>{formatearContador(reacciones.compartidos)}</span>
      </div>

      <div className={styles.item}>
        <button type="button" className={styles.button}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M6 3h12v18l-6-4-6 4V3z" />
          </svg>
        </button>
        <span className={styles.count}>{formatearContador(reacciones.guardados)}</span>
      </div>
    </div>
  );
}
