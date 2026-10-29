import { fallbackCommand, type FeatureRequest } from "@/lib/feature-requests";
import { CopyButton } from "./CopyButton";
import styles from "./FeatureRequestCard.module.css";

export function FeatureRequestCard({ request }: { request: FeatureRequest }) {
  const headingId = `solicitud-${request.id}`;
  const command = fallbackCommand(request);

  return (
    <article className={styles.card} aria-labelledby={headingId}>
      <p className={styles.number}>Solicitud {request.number}</p>
      <h2 id={headingId} className={styles.title}>
        {request.title}
      </h2>
      <p className={styles.summary}>{request.summary}</p>

      <CopyButton text={request.prompt} label="Copiar prompt" context={request.title} />

      <details className={styles.details}>
        <summary>Ver el prompt completo</summary>
        <pre className={styles.prompt}>{request.prompt}</pre>
      </details>

      <div className={styles.fallback}>
        <h3 className={styles.fallbackTitle}>¿Sin tiempo? Usa la rama de respaldo</h3>
        <p className={styles.fallbackText}>
          Trae la versión ya construida a tu fork y súbela como la rama <code>{request.branch}</code>:
        </p>
        <pre className={styles.command}>
          <code>{command}</code>
        </pre>
        <CopyButton
          text={command}
          label="Copiar comando"
          context={`rama de respaldo de ${request.title}`}
          variant="secondary"
        />
      </div>
    </article>
  );
}
