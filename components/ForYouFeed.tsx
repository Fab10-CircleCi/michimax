"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { buildFeed, fakeComments, type FeedItem } from "@/lib/feed";
import { CLIP_CAPTIONS_PATH, clipPath, getCategory, stillPath } from "@/lib/catalog";
import styles from "./ForYouFeed.module.css";

const feed = buildFeed();

/** Quien pidió menos movimiento en su sistema no recibe reproducción automática. */
function prefersReducedMotion(): boolean {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

function Icon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <path fill="currentColor" d={path} />
    </svg>
  );
}

const ICONS = {
  heart:
    "M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.4h2c.7-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z",
  comment: "M4 4h16v12H8l-4 4V4z",
  pause: "M7 5h4v14H7zM13 5h4v14h-4z",
  play: "M8 5v14l11-7z",
  up: "M12 6l-7 7 1.4 1.4L12 8.8l5.6 5.6L19 13z",
  down: "M12 18l7-7-1.4-1.4L12 15.2 6.4 9.6 5 11z",
  close: "M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z",
};

function FeedVideo({ item, onLike, liked }: { item: FeedItem; liked: boolean; onLike: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [burst, setBurst] = useState(false);
  const [paused, setPaused] = useState(true);
  const title = item.show.title;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !("IntersectionObserver" in window) || prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.75 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Los clips se repiten sin fin: hace falta poder pausarlos (WCAG 2.2.2).
  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play()?.catch(() => undefined);
    } else {
      video.pause();
    }
  }

  function handleDoubleClick() {
    if (!liked) onLike();
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
  }

  return (
    <div className={styles.media} onDoubleClick={handleDoubleClick}>
      <video
        ref={videoRef}
        className={styles.video}
        poster={stillPath(item.show.slug)}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`Clip de ${title}`}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onTimeUpdate={(event) => {
          const { currentTime, duration } = event.currentTarget;
          setProgress(duration ? (currentTime / duration) * 100 : 0);
        }}
      >
        <source src={clipPath(item.show.slug)} type="video/mp4" />
        <track kind="captions" src={CLIP_CAPTIONS_PATH} srcLang="es-MX" label="Español (México)" />
      </video>
      {burst && (
        <span className={styles.burst} aria-hidden="true">
          ❤
        </span>
      )}
      <button
        type="button"
        className={styles.playback}
        aria-label={`${paused ? "Reproducir" : "Pausar"} ${title}`}
        onClick={togglePlayback}
      >
        <Icon path={paused ? ICONS.play : ICONS.pause} />
      </button>
      <div
        className={styles.progress}
        role="progressbar"
        aria-label={`Progreso de ${title}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export function ForYouFeed() {
  const feedRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [likes, setLikes] = useState<string[]>([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comments, setComments] = useState(fakeComments);
  const [draft, setDraft] = useState("");

  function toggleLike(id: string) {
    setLikes((current) => (current.includes(id) ? current.filter((like) => like !== id) : [...current, id]));
  }

  function scrollBy(direction: 1 | -1) {
    const container = feedRef.current;
    container?.scrollBy({ top: direction * container.clientHeight, behavior: "smooth" });
  }

  function openComments() {
    setCommentsOpen(true);
    // Al abrir el panel, el foco va al campo para escribir.
    requestAnimationFrame(() => commentInputRef.current?.focus());
  }

  function addComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) return;
    setComments((current) => [...current, { author: "Tú", text: draft.trim() }]);
    setDraft("");
  }

  return (
    <div className={styles.wrapper}>
      <h1 className="visually-hidden">Para ti</h1>
      <div ref={feedRef} className={styles.feed}>
        {feed.map((item) => {
          const liked = likes.includes(item.id);
          const titleId = `para-ti-${item.id}`;
          return (
            <section key={item.id} className={styles.slide} aria-labelledby={titleId}>
              <FeedVideo item={item} liked={liked} onLike={() => toggleLike(item.id)} />

              <div className={styles.overlay}>
                <h2 id={titleId} className={styles.title}>
                  {item.show.title}
                </h2>
                <p className={styles.episode}>
                  {getCategory(item.show.category).name} · {item.show.match} % de coincidencia
                </p>
                <Link href={`/titulos/${item.show.slug}`} className={styles.link}>
                  Ver título<span className="visually-hidden">: {item.show.title}</span>
                </Link>
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={`${styles.action} ${liked ? styles.liked : ""}`}
                  aria-label={`Me encanta ${item.show.title}`}
                  aria-pressed={liked}
                  onClick={() => toggleLike(item.id)}
                >
                  <Icon path={ICONS.heart} />
                </button>
                <button
                  type="button"
                  className={styles.action}
                  aria-label={`Comentarios de ${item.show.title}`}
                  onClick={openComments}
                >
                  <Icon path={ICONS.comment} />
                </button>
              </div>
            </section>
          );
        })}
      </div>

      <div className={styles.arrows}>
        <button type="button" className={styles.arrow} aria-label="Clip anterior" onClick={() => scrollBy(-1)}>
          <Icon path={ICONS.up} />
        </button>
        <button type="button" className={styles.arrow} aria-label="Clip siguiente" onClick={() => scrollBy(1)}>
          <Icon path={ICONS.down} />
        </button>
      </div>

      {/* Cerrado, el panel queda fuera del orden del teclado y de los lectores de pantalla. */}
      <section
        className={`${styles.sheet} ${commentsOpen ? styles.sheetOpen : ""}`}
        aria-labelledby="titulo-comentarios"
        inert={!commentsOpen}
      >
        <div className={styles.sheetHeader}>
          <h2 id="titulo-comentarios" className={styles.sheetTitle}>
            Comentarios
          </h2>
          <button
            type="button"
            className={styles.close}
            aria-label="Cerrar comentarios"
            onClick={() => setCommentsOpen(false)}
          >
            <Icon path={ICONS.close} />
          </button>
        </div>
        <ul className={styles.comments}>
          {comments.map((comment, index) => (
            <li key={`${comment.author}-${index}`}>
              <strong>{comment.author}</strong> {comment.text}
            </li>
          ))}
        </ul>
        <form className={styles.commentForm} onSubmit={addComment}>
          <label htmlFor="nuevo-comentario" className="visually-hidden">
            Escribe un comentario
          </label>
          <input
            ref={commentInputRef}
            id="nuevo-comentario"
            className={styles.commentInput}
            placeholder="Escribe un comentario…"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button type="submit" className={styles.send}>
            Enviar
          </button>
        </form>
      </section>
    </div>
  );
}
