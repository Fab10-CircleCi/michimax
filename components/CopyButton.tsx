"use client";

import { useEffect, useRef, useState } from "react";
import { copyText } from "@/lib/clipboard";
import styles from "./CopyButton.module.css";

type Status = "idle" | "copied" | "failed";

type Props = {
  text: string;
  label: string;
  context: string;
  variant?: "primary" | "secondary";
};

export function CopyButton({ text, label, context, variant = "primary" }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function handleClick() {
    const copied = await copyText(text);
    setStatus(copied ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <div className={styles.wrapper}>
      <button type="button" className={`${styles.button} ${styles[variant]}`} onClick={handleClick}>
        {label}
        <span className="visually-hidden">: {context}</span>
      </button>
      <span role="status" className={styles.status}>
        {status === "copied" && "¡Copiado!"}
        {status === "failed" && "No se pudo copiar. Selecciona el texto y cópialo a mano."}
      </span>
    </div>
  );
}
