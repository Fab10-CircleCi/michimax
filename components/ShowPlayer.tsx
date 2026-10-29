"use client";

import { useEffect, useRef } from "react";
import { CLIP_CAPTIONS_PATH, clipPath, stillPath, type Show } from "@/lib/catalog";
import { ReactionBar } from "./ReactionBar";
import styles from "./ShowPlayer.module.css";

/** Quien pidió menos movimiento en su sistema no recibe reproducción automática. */
function prefersReducedMotion(): boolean {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export function ShowPlayer({ show }: { show: Show }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const descriptionId = `descripcion-${show.slug}`;

  // Se reproduce una vez al entrar, sin sonido (los navegadores solo permiten así la reproducción automática).
  useEffect(() => {
    const video = videoRef.current;
    if (video && !prefersReducedMotion()) {
      video.play()?.catch(() => undefined);
    }
  }, [show.slug]);

  return (
    <figure className={styles.player}>
      <div className={styles.frame}>
        <video
          ref={videoRef}
          className={styles.video}
          controls
          muted
          playsInline
          preload="auto"
          poster={stillPath(show.slug)}
          aria-label={`Clip de ${show.title}`}
          aria-describedby={descriptionId}
        >
          <source src={clipPath(show.slug)} type="video/mp4" />
          <track kind="captions" src={CLIP_CAPTIONS_PATH} srcLang="es-MX" label="Español (México)" default />
          Tu navegador no puede reproducir este video.
        </video>
        <ReactionBar slug={show.slug} />
      </div>
      <figcaption id={descriptionId} className={styles.description}>
        <span className={styles.label}>Descripción del clip (sin audio):</span> {show.clipDescription}
      </figcaption>
    </figure>
  );
}
