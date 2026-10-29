import { CLIP_CAPTIONS_PATH, clipPath, stillPath, type Show } from "@/lib/catalog";
import styles from "./ShowPlayer.module.css";

export function ShowPlayer({ show }: { show: Show }) {
  const descriptionId = `descripcion-${show.slug}`;

  return (
    <figure className={styles.player}>
      <div className={styles.frame}>
        <video
          className={styles.video}
          controls
          playsInline
          preload="metadata"
          poster={stillPath(show.slug)}
          aria-label={`Clip de ${show.title}`}
          aria-describedby={descriptionId}
        >
          <source src={clipPath(show.slug)} type="video/mp4" />
          <track kind="captions" src={CLIP_CAPTIONS_PATH} srcLang="es-MX" label="Español (México)" default />
          Tu navegador no puede reproducir este video.
        </video>
      </div>
      <figcaption id={descriptionId} className={styles.description}>
        <span className={styles.label}>Descripción del clip (sin audio):</span> {show.clipDescription}
      </figcaption>
    </figure>
  );
}
