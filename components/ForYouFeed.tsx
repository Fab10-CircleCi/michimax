"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { buildFeed, fakeComments, type FeedItem } from "@/lib/feed";
import { clipPath, getCategory, stillPath } from "@/lib/catalog";
import styles from "./ForYouFeed.module.css";

const feed = buildFeed();

function FeedVideo({ item, onLike, liked }: { item: FeedItem; liked: boolean; onLike: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !("IntersectionObserver" in window)) return;

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
        src={clipPath(item.show.slug)}
        poster={stillPath(item.show.slug)}
        muted
        loop
        playsInline
        preload="metadata"
        onTimeUpdate={(event) => {
          const { currentTime, duration } = event.currentTarget;
          setProgress(duration ? (currentTime / duration) * 100 : 0);
        }}
      />
      {burst && <span className={styles.burst}>❤</span>}
      <div
        className={styles.progress}
        role="progressbar"
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

  function addComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) return;
    setComments((current) => [...current, { author: "Tú", text: draft.trim() }]);
    setDraft("");
  }

  return (
    <div className={styles.wrapper}>
      <div ref={feedRef} className={styles.feed}>
        {feed.map((item) => {
          const liked = likes.includes(item.id);
          return (
            <section key={item.id} className={styles.slide}>
              <FeedVideo item={item} liked={liked} onLike={() => toggleLike(item.id)} />

              <div className={styles.overlay}>
                <h2 className={styles.title}>{item.show.title}</h2>
                <p className={styles.episode}>
                  {getCategory(item.show.category).name} · {item.show.match} % de coincidencia
                </p>
                <Link href={`/titulos/${item.show.slug}`} className={styles.link}>
                  Ver título
                </Link>
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={`${styles.action} ${liked ? styles.liked : ""}`}
                  onClick={() => toggleLike(item.id)}
                >
                  <svg viewBox="0 0 24 24" width="26" height="26">
                    <path
                      fill="currentColor"
                      d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.4h2c.7-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"
                    />
                  </svg>
                </button>
                <button type="button" className={styles.action} onClick={() => setCommentsOpen(true)}>
                  <svg viewBox="0 0 24 24" width="26" height="26">
                    <path fill="currentColor" d="M4 4h16v12H8l-4 4V4z" />
                  </svg>
                </button>
              </div>
            </section>
          );
        })}
      </div>

      <div className={styles.arrows}>
        <button type="button" className={styles.arrow} aria-label="Clip anterior" onClick={() => scrollBy(-1)}>
          ↑
        </button>
        <button type="button" className={styles.arrow} aria-label="Clip siguiente" onClick={() => scrollBy(1)}>
          ↓
        </button>
      </div>

      <div className={`${styles.sheet} ${commentsOpen ? styles.sheetOpen : ""}`}>
        <div className={styles.sheetHeader}>
          <p className={styles.sheetTitle}>Comentarios</p>
          <button type="button" className={styles.close} onClick={() => setCommentsOpen(false)}>
            ✕
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
          <input
            className={styles.commentInput}
            placeholder="Escribe un comentario…"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button type="submit" className={styles.send}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
