"use client";

import { useEffect, useRef } from "react";
import styles from "./IntroVideo.module.css";

const DESCRIPTION_ID = "descripcion-intro";
/** Segundo en el que se ve el logo completo, antes del fundido a negro. */
const LOGO_SECOND = 3.6;

/** Quien pidió menos movimiento en su sistema no recibe reproducción automática. */
function prefersReducedMotion(): boolean {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Al cargar se reproduce una vez sin sonido (los navegadores solo permiten así la reproducción automática).
  useEffect(() => {
    const video = videoRef.current;
    if (video && !prefersReducedMotion()) {
      video.play()?.catch(() => undefined);
    }
  }, []);

  // Al hacer clic se repite desde el inicio, ya con sonido (lo pidió la persona) y con subtítulos.
  function replay() {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.muted = false;
    for (const track of Array.from(video.textTracks ?? [])) {
      track.mode = "showing";
    }
    video.play()?.catch(() => undefined);
  }

  // Al terminar se queda en el logo en lugar del último cuadro, que ya está a oscuras.
  function holdOnLogo() {
    const video = videoRef.current;
    if (video) video.currentTime = LOGO_SECOND;
  }

  return (
    <div className={styles.intro}>
      <video
        ref={videoRef}
        className={styles.video}
        muted
        playsInline
        preload="auto"
        poster="/intro/michimax-intro.webp"
        aria-label="Intro de Michimax"
        aria-describedby={DESCRIPTION_ID}
        onClick={replay}
        onEnded={holdOnLogo}
      >
        <source src="/intro/michimax-intro.mp4" type="video/mp4" />
        <track kind="captions" src="/intro/michimax-intro.vtt" srcLang="es-MX" label="Español (México)" />
      </video>
      <p id={DESCRIPTION_ID} className="visually-hidden">
        Montaje rápido de escenas de los títulos de Michimax que termina con el logo y la frase «Ahora en
        streaming».
      </p>
      <button type="button" className={styles.replay} onClick={replay}>
        <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z"
          />
        </svg>
        Repetir intro
      </button>
    </div>
  );
}
