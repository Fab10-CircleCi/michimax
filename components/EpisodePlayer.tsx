"use client";

import { useState } from "react";
import { captionsPath, posterPath, videoPath, type Telenovela } from "@/lib/telenovelas";
import styles from "./EpisodePlayer.module.css";

export function EpisodePlayer({ telenovela }: { telenovela: Telenovela }) {
  const [currentNumber, setCurrentNumber] = useState(telenovela.episodes[0].number);
  const current =
    telenovela.episodes.find((episode) => episode.number === currentNumber) ?? telenovela.episodes[0];

  return (
    <div className={styles.player}>
      <div className={styles.frame}>
        <video
          key={current.number}
          className={styles.video}
          controls
          playsInline
          preload="metadata"
          poster={posterPath(telenovela.slug, current.number)}
          aria-describedby="capitulo-actual"
        >
          <source src={videoPath(telenovela.slug, current.number)} type="video/mp4" />
          <track
            kind="captions"
            src={captionsPath(telenovela.slug, current.number)}
            srcLang="es-MX"
            label="Español (México)"
            default
          />
          Tu navegador no puede reproducir este video.
        </video>
      </div>

      <p id="capitulo-actual" className={styles.now} aria-live="polite">
        Reproduciendo: capítulo {current.number}, «{current.title}»
      </p>

      <h2 className={styles.heading}>Capítulos</h2>
      <ol className={styles.episodes}>
        {telenovela.episodes.map((episode) => (
          <li key={episode.number}>
            <button
              type="button"
              className={styles.episode}
              aria-current={episode.number === current.number ? "true" : undefined}
              onClick={() => setCurrentNumber(episode.number)}
            >
              <span className={styles.episodeNumber}>Cap. {episode.number}</span>
              <span>{episode.title}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
