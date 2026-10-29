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
    return <p className={styles.success}>¡Bienvenida al chisme!</p>;
  }

  return (
    <div className={styles.newsletter}>
      <p className={styles.title}>El Chisme Felino</p>
      <form className={styles.form} onSubmit={enviar} noValidate>
        <input
          type="email"
          className={styles.input}
          placeholder="tu@correo.com"
          value={correo}
          onChange={(event) => {
            setCorreo(event.target.value);
            setError(false);
          }}
        />
        <select className={styles.input} defaultValue="">
          <option value="" disabled>
            Título favorito
          </option>
          {shows.map((show) => (
            <option key={show.slug} value={show.slug}>
              {show.title}
            </option>
          ))}
        </select>
        <span className={styles.checkbox}>
          <input type="checkbox" />
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path fill="currentColor" d="M3 5h18v14H3V5zm2 2v.5l7 4.5 7-4.5V7H5zm14 3-7 4.5L5 10v7h14v-7z" />
          </svg>
        </span>
        <button type="submit" className={styles.button}>
          Suscribirme
        </button>
      </form>
      {error && <p className={styles.error}>Ese correo no parece válido.</p>}
      <p className={styles.legal}>
        Al suscribirte aceptas recibir estrenos, chismes y recomendaciones cada viernes. Puedes darte de
        baja cuando quieras.
      </p>
    </div>
  );
}
