"use client";

import { useState, type FormEvent } from "react";
import { shows } from "@/lib/catalog";
import styles from "./NewsletterForm.module.css";

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState(false);
  const [suscrita, setSuscrita] = useState(false);

  function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!CORREO_VALIDO.test(correo)) {
      setError(true);
      return;
    }
    setSuscrita(true);
  }

  if (suscrita) {
    return (
      <p className={styles.success} role="status">
        ¡Bienvenida al chisme!
      </p>
    );
  }

  return (
    <div className={styles.newsletter}>
      <p id="titulo-boletin" className={styles.title}>
        El Chisme Felino
      </p>
      <form className={styles.form} onSubmit={enviar} noValidate aria-labelledby="titulo-boletin">
        <div className={styles.field}>
          <label htmlFor="boletin-correo" className={styles.label}>
            Correo electrónico
          </label>
          <input
            id="boletin-correo"
            type="email"
            autoComplete="email"
            className={styles.input}
            placeholder="tu@correo.com"
            value={correo}
            aria-invalid={error}
            aria-describedby={error ? "boletin-error" : undefined}
            onChange={(event) => {
              setCorreo(event.target.value);
              setError(false);
            }}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="boletin-favorito" className={styles.label}>
            Título favorito
          </label>
          <select id="boletin-favorito" className={styles.input} defaultValue="">
            <option value="" disabled>
              Elige uno
            </option>
            {shows.map((show) => (
              <option key={show.slug} value={show.slug}>
                {show.title}
              </option>
            ))}
          </select>
        </div>
        <label className={styles.checkbox}>
          <input type="checkbox" />
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path fill="currentColor" d="M3 5h18v14H3V5zm2 2v.5l7 4.5 7-4.5V7H5zm14 3-7 4.5L5 10v7h14v-7z" />
          </svg>
          Acepto recibir el boletín
        </label>
        <button type="submit" className={styles.button}>
          Suscribirme
        </button>
      </form>
      {error && (
        <p id="boletin-error" className={styles.error} role="alert">
          Ese correo no parece válido.
        </p>
      )}
      <p className={styles.legal}>
        Al suscribirte aceptas recibir estrenos, chismes y recomendaciones cada viernes. Puedes darte de
        baja cuando quieras.
      </p>
    </div>
  );
}
